# WHITEROCK 网站上线操作单（手把手 · 中文）

本单按项目里 Codex 实际做的配置来写，字段名一一对应，照着做即可。

**登录后台用 GitHub 账号**（零服务器方案下这是最干净的方式）。整条链路：
在 `/admin` 用 GitHub 登录 → 改内容提交到 GitHub 仓库 → GitHub Actions 自动构建 → 通过 FTP 部署到 GoDaddy `/public_html`。Cloudflare Worker 只负责替后台完成 GitHub 登录握手（免费、无需运维）。

---

## 0. 先准备三样（都免费/已有）

1. **GitHub 账号**（就是你后台的登录账号）。
2. **Cloudflare 账号**（用来部署那个登录小程序 Worker）。
3. **GoDaddy 主机**：必须是 **带 cPanel 的 Linux 虚拟主机（有 FTP）**。⚠️ 不能用 GoDaddy 的“建站神器 / Website Builder”，那个放不进我们的文件。

本地电脑装好 **Node.js 20+**（用于可选的命令行操作）。

> 说明：如果你只想“先让网站能打开”，可跳到最后【方式二：手动秒上线】，5 分钟即可；后台登录等有空再配。

---

## 1. 把源码放到 GitHub

1. 在 GitHub 点 **New repository** 新建一个仓库，例如 `whiterock-site`（**Private 私有**即可，Worker 已按私有仓库配置）。
2. 把 `WHITEROCK-github-source-final.zip` 解压，把里面所有文件推到该仓库的 `main` 分支。
   - 不熟命令行的话，可用 **GitHub Desktop** 图形工具：Add → 选解压后的文件夹 → Publish 到刚建的仓库。
3. 记下你的仓库全名：`你的GitHub用户名/whiterock-site`（下面要用，记作 `OWNER/REPO`）。

---

## 2. 建 GitHub OAuth App（后台登录用）

1. GitHub 右上头像 → **Settings → Developer settings → OAuth Apps → New OAuth App**。
2. 填写：
   - **Application name**：`WHITEROCK CMS`（随意）
   - **Homepage URL**：`https://www.whiterockstone.com`（你的正式域名）
   - **Authorization callback URL**：先随便填 `https://example.com/callback`，**等第 3 步拿到 Worker 地址后再回来改成** `https://<你的Worker地址>/callback`
3. 创建后，页面会给你 **Client ID**；再点 **Generate a new client secret** 得到 **Client Secret**。
   - 把这两个值先复制保存好（第 3 步要用）。**Client Secret 只显示一次**。

---

## 3. 部署 Cloudflare Worker（登录握手小程序）

Worker 源码在源码包的 `oauth-worker/` 里，名字是 `whiterock-decap-oauth`，端点 `/auth` 和 `/callback`。

**命令行方式（推荐）：**

```bash
cd oauth-worker
npm install
npx wrangler login                     # 浏览器登录你的 Cloudflare
npx wrangler secret put OAUTH_CLIENT_ID       # 粘贴第2步的 Client ID
npx wrangler secret put OAUTH_CLIENT_SECRET   # 粘贴第2步的 Client Secret
npx wrangler deploy
```

部署成功后，命令行会输出 Worker 地址，形如：
`https://whiterock-decap-oauth.你的子域.workers.dev`
**把这个地址完整记下来（结尾不要带斜杠 /）。**

**如果你的正式域名不是 whiterockstone.com**：打开 `oauth-worker/wrangler.toml`，把 `SITE_URL` 改成你的正式域名后再 `deploy`。

**回到第 2 步**：把 GitHub OAuth App 的 **Authorization callback URL** 改成
`https://whiterock-decap-oauth.你的子域.workers.dev/callback`
（即 Worker 地址后面加 `/callback`），保存。

> 不想用命令行也可以在 Cloudflare 面板：Workers & Pages → Create → 导入 `oauth-worker` 代码 → 在 Settings → Variables 里添加两个 **加密变量** `OAUTH_CLIENT_ID`、`OAUTH_CLIENT_SECRET`。

---

## 4. 填 `admin/config.yml` 两处

打开仓库里的 `admin/config.yml`，改这两行后提交：

```yaml
backend:
  name: github
  repo: OWNER/REPO                                   # ← 改成第1步的仓库全名
  branch: main
  base_url: https://whiterock-decap-oauth.你的子域.workers.dev   # ← 改成第3步的 Worker 地址（不带结尾斜杠）
  auth_endpoint: auth
```

---

## 5. 配 GitHub 部署密钥（连 GoDaddy FTP）

先从 **GoDaddy cPanel** 拿 FTP 信息：cPanel → **FTP Accounts**，创建或查看一个 FTP 账号，记下：
- 服务器地址（形如 `ftp.你的域名.com` 或主机 IP）
- FTP 用户名、密码
- 网站根目录（通常是 `/public_html`）

再到 **GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret**，添加 **4 个**：

| 名称 | 值 |
|---|---|
| `FTP_SERVER` | 你的 FTP 服务器地址 |
| `FTP_USERNAME` | FTP 用户名 |
| `FTP_PASSWORD` | FTP 密码 |
| `FTP_TARGET_DIR` | `/public_html/`（网站根目录，末尾带斜杠） |

---

## 6. 触发部署

任意改动 push 到 `main`，或在 GitHub 仓库 **Actions → “Build and deploy to GoDaddy” → Run workflow** 手动触发。
流程会自动：装依赖 → `npm run build:deploy`（构建到 `./dist/`）→ FTP 上传到 `/public_html`。
在 Actions 页面看到绿色对勾即部署成功。

---

## 7. 域名与验证

1. **域名指向 GoDaddy 主机**：若域名就在 GoDaddy 且用它的 Linux 主机，通常已自动绑定；否则在 DNS 把 A 记录指到主机 IP。
2. 打开 `https://你的域名/` 看公开站。
3. 打开 `https://你的域名/admin/`，点 **Login with GitHub** → 授权 → 进入后台，即可改文字、换图片、加内容。保存会自动提交并触发第 6 步重新部署。

---

## 方式二：手动秒上线（先让网站能打开，后台登录以后再配）

不想马上折腾 GitHub/Worker，可先让公开站上线：

1. 解压 `WHITEROCK-godaddy-public_html-final.zip`。
2. GoDaddy cPanel → **File Manager** → 进入 `/public_html`。
3. 把解压出来的**全部文件与文件夹**上传进去（`index.html`、`assets/`、`admin/` 等都要）。
4. 打开 `https://你的域名/` 即可访问。
   - 此时 `/admin` 登录还不能用（要等第 2~4 步的 Worker+OAuth 配好），但公开站已经上线。

---

## 常见坑

- **GoDaddy 选错套餐**：必须 cPanel/Linux 主机，不能是 Website Builder。
- **Worker 地址带了结尾斜杠**：`base_url` 结尾不要 `/`。
- **回调地址不匹配**：GitHub OAuth App 的 callback 必须是 `Worker地址/callback`，少了 `/callback` 会登录失败。
- **国内访问 GitHub 不稳**：仅影响你在后台保存（走 GitHub），不影响访客看网站；若长期不稳可改用 GitLab（需重配后端，来找我）。
- **改了正式域名**：同时更新 `wrangler.toml` 的 `SITE_URL`、`admin/config.yml` 的 `site_url`，以及各页 `canonical/og:url`（可让我或 Codex 批量替换）。

---

## 上线后慢慢补的真实资料

在后台或源码里搜 `[confirm]`，逐项填你的真实数据：工厂面积/人数/月产能/出口国、实际持有的认证、Incoterms/FOB 港/付款条款/装柜量、成立年份、WhatsApp/社媒等；产品与工厂**真照片**拍到后在后台上传替换现有渲染图（上传真图后“示意渲染”标注会自动消失）。
