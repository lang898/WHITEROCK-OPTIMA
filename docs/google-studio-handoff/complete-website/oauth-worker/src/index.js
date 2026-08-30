const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "wr_oauth_state";

function randomState() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readCookie(request, name) {
  const cookies = request.headers.get("Cookie") || "";
  for (const part of cookies.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

function callbackUrl(url) {
  return `${url.origin}/callback?provider=github`;
}

function callbackPage(status, payload, env) {
  const targetOrigin = env.SITE_URL || "*";
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const scriptTarget = JSON.stringify(targetOrigin);
  const scriptMessage = JSON.stringify(message);
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>WHITEROCK CMS authorization</title></head>
<body><p>Completing GitHub authorization...</p><script>
(() => {
  const targetOrigin = ${scriptTarget};
  const responseMessage = ${scriptMessage};
  if (!window.opener) return;
  const receiveMessage = (event) => {
    if (targetOrigin !== "*" && event.origin !== targetOrigin) return;
    window.opener.postMessage(responseMessage, targetOrigin);
    window.removeEventListener("message", receiveMessage, false);
  };
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", targetOrigin);
})();
</script></body></html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "Set-Cookie": `${STATE_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function handleAuth(request, url, env) {
  if (url.searchParams.get("provider") !== "github") return new Response("Invalid provider", { status: 400 });
  if (!env.OAUTH_CLIENT_ID || !env.OAUTH_CLIENT_SECRET) return new Response("OAuth secrets are not configured", { status: 500 });

  const state = randomState();
  const scope = env.GITHUB_REPO_PRIVATE === "1" ? "repo,user" : "public_repo,user";
  const authorize = new URL(GITHUB_AUTHORIZE_URL);
  authorize.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", callbackUrl(url));
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Cache-Control": "no-store",
      "Set-Cookie": `${STATE_COOKIE}=${encodeURIComponent(state)}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function handleCallback(request, url, env) {
  if (url.searchParams.get("provider") !== "github") return new Response("Invalid provider", { status: 400 });
  if (url.searchParams.get("error")) return callbackPage("error", { message: "GitHub authorization was cancelled." }, env);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, STATE_COOKIE);
  if (!code || !state || !expectedState || state !== expectedState) {
    return callbackPage("error", { message: "The OAuth state could not be verified. Please try again." }, env);
  }

  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: callbackUrl(url),
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) {
    return callbackPage("error", { message: "GitHub did not return an access token. Please try again." }, env);
  }
  return callbackPage("success", { token: result.access_token, provider: "github" }, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request, url, env);
    if (url.pathname === "/callback") return handleCallback(request, url, env);
    return new Response("WHITEROCK Decap OAuth worker is ready.", {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  },
};
