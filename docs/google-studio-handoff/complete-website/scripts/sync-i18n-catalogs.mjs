import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicPages = (await fs.readdir(path.join(root, "src/pages"))).filter((file) => file.endsWith(".html"));
const htmlFiles = [
  ...publicPages.map((file) => path.join(root, "src/pages", file)),
  ...publicPages.map((file) => path.join(root, file)),
  ...["head.html", "header.html", "footer.html"].map((file) => path.join(root, "src/partials", file)),
];
const strings = new Set();

function shouldTranslate(text) {
  if (!/[A-Za-z]/.test(text)) return false;
  if (/^(?:https?:|mailto:|tel:|assets\/)/i.test(text)) return false;
  if (/\.(?:jpg|jpeg|png|webp|svg|pdf)$/i.test(text)) return false;
  if (/^(?:WR(?:-[A-Z0-9-]+)?|TODO.*|\[confirm\].*)$/i.test(text)) return false;
  if (/^[a-z0-9-]+$/.test(text) && text.includes("-")) return false;
  if (/\{\{|\}\}/.test(text) || /^<!--.*-->$/.test(text)) return false;
  if (["website", "summary_large_image", "width=device-width, initial-scale=1.0"].includes(text)) return false;
  return true;
}

function add(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (text && shouldTranslate(text)) strings.add(text);
}

for (const file of htmlFiles) {
  try {
    const html = await fs.readFile(file, "utf8");
    for (const match of html.matchAll(/>([^<>]+)</g)) add(match[1]);
    for (const match of html.matchAll(/\b(?:aria-label|title|placeholder|alt|content)="([^"]+)"/g)) add(match[1]);
  } catch {}
}

["Image viewer", "Close image viewer", "Previous image", "Next image", "Open image", "Image"].forEach(add);

function walk(value) {
  if (typeof value === "string") add(value);
  else if (Array.isArray(value)) value.forEach(walk);
  else if (value && typeof value === "object") Object.values(value).forEach(walk);
}

for (const file of (await fs.readdir(path.join(root, "data"))).filter((file) => file.endsWith(".json") && file !== "image-manifest.json" && file !== "locales.json")) {
  walk(JSON.parse(await fs.readFile(path.join(root, "data", file), "utf8")));
}

const seeds = new Map(Object.entries({
  "Image viewer": "\u56fe\u7247\u67e5\u770b\u5668",
  "Close image viewer": "\u5173\u95ed\u56fe\u7247\u67e5\u770b\u5668",
  "Previous image": "\u4e0a\u4e00\u5f20\u56fe\u7247",
  "Next image": "\u4e0b\u4e00\u5f20\u56fe\u7247",
  "Open image": "\u6253\u5f00\u56fe\u7247",
  "Image": "\u56fe\u7247",
  "Home": "首页",
  "Products": "产品",
  "Colors": "颜色",
  "Materials": "材料",
  "Finishes": "表面处理",
  "Finishes & Edges": "表面处理与边型",
  "Capability": "生产能力",
  "Factory": "工厂",
  "Certifications": "认证",
  "Sustainability": "可持续发展",
  "Sustainability & Safety": "可持续发展与安全",
  "Inspiration": "灵感",
  "Applications": "应用场景",
  "Projects": "项目",
  "Lookbook": "案例图册",
  "Resources": "资料",
  "News": "新闻",
  "FAQ": "常见问题",
  "How to Order": "订购流程",
  "Partners": "合作伙伴",
  "Contact": "联系我们",
  "Company": "公司",
  "About": "关于我们",
  "Request a Quote": "获取报价",
  "Request a quote": "获取报价",
  "Send Inquiry": "提交询盘",
  "Add to inquiry list": "加入询价清单",
  "Inquiry list": "询价清单",
  "Remove": "移除",
  "Open menu": "打开菜单",
  "Close menu": "关闭菜单",
  "Main navigation": "主导航",
  "Mobile navigation": "移动端导航",
  "Breadcrumb": "面包屑导航",
  "Search products": "搜索产品",
  "Search product catalog": "搜索产品目录",
  "Product search": "产品搜索",
  "Product filters": "产品筛选",
  "All": "全部",
  "All materials": "全部材料",
  "All colors": "全部颜色",
  "All finishes": "全部表面处理",
  "Clear filters": "清除筛选",
  "Material": "材料",
  "Color family": "颜色系列",
  "Finish": "表面处理",
  "Sizes": "尺寸",
  "Thicknesses": "厚度",
  "Add to sample kit": "加入样品套装",
  "Add sample": "加入样品",
  "Remove from sample kit": "从样品套装移除",
  "Selected": "已选择",
  "Added ✓": "已加入 ✓",
  "Select up to 4 samples": "最多选择 4 款样品",
  "No colors selected yet.": "尚未选择颜色。",
  "Illustrative render": "示意效果图",
  "Illustrative render — not actual product.": "示意效果图 — 非实际产品照片。",
  "Download PDF": "下载 PDF",
  "Available on request": "可按需提供",
  "Related colors": "相关颜色",
  "Download spec sheet (PDF)": "下载规格书（PDF）",
  "Switch units": "切换单位",
  "Back to top": "返回顶部",
  "Quick contact": "快捷联系",
  "Email us": "发送邮件",
  "Select one": "请选择",
  "No products matched this search. Try another material or category.": "没有匹配的产品，请尝试其他材料或类别。",
  "No colors match all three filters. Clear one filter to broaden the library.": "没有同时符合三个筛选条件的颜色，请清除一个筛选项。",
  "Select one to four colors above before submitting.": "提交前请在上方选择 1 至 4 款颜色。",
  "Name": "姓名",
  "Email": "邮箱",
  "Country / Region": "国家 / 地区",
  "Product Interest": "感兴趣的产品",
  "Project Details": "项目详情",
  "We typically reply within one business day.": "我们通常会在一个工作日内回复。",
  "Natural and engineered stone products for North America and international markets.": "面向北美及国际市场的天然石材与人造石产品。"
}));

async function readExisting(file) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); }
  catch { return { strings: [] }; }
}

const i18nDir = path.join(root, "data/i18n");
await fs.mkdir(i18nDir, { recursive: true });
const zhPath = path.join(i18nDir, "site.zh-Hans.json");
const existingZh = await readExisting(zhPath);
const existingBySource = new Map((existingZh.strings || []).map((item) => [item.source, item]));
for (const source of seeds.keys()) strings.add(source);
const sources = [...strings].sort((a, b) => a.localeCompare(b));
const idFor = (source) => `s_${createHash("sha1").update(source).digest("hex").slice(0, 12)}`;
const english = sources.map((source) => ({ id: idFor(source), source, translation: source, status: "approved" }));
const chinese = sources.map((source) => {
  const existing = existingBySource.get(source);
  const translation = existing?.translation || seeds.get(source) || "";
  return { id: idFor(source), source, translation, status: translation ? (existing?.status || "draft") : "needs-translation" };
});
const translated = chinese.filter((item) => item.translation).length;

const enCatalog = {
  id: "site",
  _meta: { locale: "en", label: "English", reviewStatus: "approved", generated: true, totalStrings: english.length },
  strings: english,
};
const zhCatalog = {
  id: "site",
  _meta: {
    locale: "zh-Hans",
    label: "简体中文",
    reviewStatus: "draft",
    translationMethod: "AI-assisted starter glossary; human review required before production",
    generated: true,
    totalStrings: chinese.length,
    translatedStrings: translated,
  },
  strings: chinese,
};

await fs.writeFile(path.join(i18nDir, "site.en.json"), `${JSON.stringify(enCatalog, null, 2)}\n`);
await fs.writeFile(zhPath, `${JSON.stringify(zhCatalog, null, 2)}\n`);
console.log(`Synchronized ${sources.length} reviewable strings; ${translated} Chinese starter translations are marked draft.`);

const viSeeds = new Map(Object.entries({
  "Image viewer": "Tr\u00ecnh xem \u1ea3nh",
  "Close image viewer": "\u0110\u00f3ng tr\u00ecnh xem \u1ea3nh",
  "Previous image": "\u1ea2nh tr\u01b0\u1edbc",
  "Next image": "\u1ea2nh ti\u1ebfp theo",
  "Open image": "M\u1edf \u1ea3nh",
  "Image": "\u1ea2nh",
  "Home": "Trang chủ",
  "Products": "Sản phẩm",
  "Colors": "Màu sắc",
  "Materials": "Vật liệu",
  "Finishes": "Bề mặt",
  "Finishes & Edges": "Bề mặt & Cạnh",
  "Capability": "Năng lực",
  "Factory": "Nhà máy",
  "Certifications": "Chứng nhận",
  "Sustainability": "Phát triển bền vững",
  "Inspiration": "Cảm hứng",
  "Applications": "Ứng dụng",
  "Projects": "Dự án",
  "Lookbook": "Bộ sưu tập",
  "Resources": "Tài liệu",
  "News": "Tin tức",
  "FAQ": "Câu hỏi thường gặp",
  "How to Order": "Cách đặt hàng",
  "Partners": "Đối tác",
  "Contact": "Liên hệ",
  "Company": "Công ty",
  "About": "Giới thiệu",
  "Request a Quote": "Yêu cầu báo giá",
  "Request a quote": "Yêu cầu báo giá",
  "Send Inquiry": "Gửi yêu cầu",
  "Open menu": "Mở menu",
  "Close menu": "Đóng menu",
  "Main navigation": "Điều hướng chính",
  "Mobile navigation": "Điều hướng di động",
  "Breadcrumb": "Đường dẫn trang",
  "Search products": "Tìm sản phẩm",
  "All": "Tất cả",
  "All materials": "Tất cả vật liệu",
  "All colors": "Tất cả màu sắc",
  "All finishes": "Tất cả bề mặt",
  "Clear filters": "Xóa bộ lọc",
  "Material": "Vật liệu",
  "Color family": "Nhóm màu",
  "Finish": "Bề mặt",
  "Sizes": "Kích thước",
  "Thicknesses": "Độ dày",
  "Name": "Họ tên",
  "Email": "Email",
  "Country / Region": "Quốc gia / Khu vực",
  "Product Interest": "Sản phẩm quan tâm",
  "Project Details": "Chi tiết dự án",
  "Contact Person": "Người liên hệ",
  "Factory Address": "Địa chỉ nhà máy",
  "Tax Code": "Mã số thuế",
  "Tel": "Điện thoại",
  "Primary manufacturing base": "Cơ sở sản xuất chính",
  "Supporting manufacturing base": "Cơ sở sản xuất hỗ trợ",
  "Vietnam factory": "Nhà máy Việt Nam",
  "China factory": "Nhà máy Trung Quốc",
  "We typically reply within one business day.": "Chúng tôi thường phản hồi trong vòng một ngày làm việc.",
  "Natural and engineered stone products for North America and international markets.": "Sản phẩm đá tự nhiên và đá nhân tạo cho thị trường Bắc Mỹ và quốc tế."
}));
const viPath = path.join(i18nDir, "site.vi.json");
const existingVi = await readExisting(viPath);
const existingViBySource = new Map((existingVi.strings || []).map((item) => [item.source, item]));
const vietnamese = sources.map((source) => {
  const existing = existingViBySource.get(source);
  const translation = existing?.translation || viSeeds.get(source) || "";
  return { id: idFor(source), source, translation, status: translation ? (existing?.status || "draft") : "needs-translation" };
});
const viTranslated = vietnamese.filter((item) => item.translation).length;
const viCatalog = {
  id: "site",
  _meta: {
    locale: "vi",
    label: "Tiếng Việt",
    reviewStatus: "draft",
    translationMethod: "AI-assisted starter glossary; professional Vietnamese review required before production",
    generated: true,
    totalStrings: vietnamese.length,
    translatedStrings: viTranslated
  },
  strings: vietnamese
};
await fs.writeFile(viPath, `${JSON.stringify(viCatalog, null, 2)}\n`);
console.log(`Prepared ${viTranslated}/${sources.length} Vietnamese starter translations as a review-only draft.`);
