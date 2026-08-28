import type { LocaleConfig } from './types';

const copy = {
  en: {
    home: 'Home', collections: 'Collections', products: 'Products', colors: 'Colors', finishes: 'Finishes & Edges',
    company: 'Company', about: 'About', factory: 'Factory', inspiration: 'Inspiration', applications: 'Applications',
    partners: 'Trade Program', resources: 'Resources', contact: 'Contact', search: 'Search', rfq: 'RFQ',
    heroEyebrow: 'Marble & Granite • Binh Phuoc, Vietnam',
    heroTitle: 'Stone made with experience. Built for serious projects.',
    heroBody: 'Natural and engineered stone manufacturing for distributors, builders, hospitality teams, and project buyers worldwide.',
    exploreProducts: 'Explore products', viewFactory: 'View the factory', requestQuote: 'Request a quotation',
    experience: 'Stone industry experience', plantArea: 'Vietnam plant area', annualCapacity: 'Published annual capacity',
    productCatalog: 'Product catalog', productIntro: 'Build a clear shortlist from product programs prepared for B2B quotation.',
    colorLibrary: 'Color library', colorIntro: 'Review digital swatches, then confirm material selection with physical samples.',
    compare: 'Compare', compared: 'Selected', addRfq: 'Add to RFQ', fullSpecs: 'Full specs', sample: 'Request sample',
    all: 'All', material: 'Material', dimensions: 'Dimensions', thickness: 'Thickness', finish: 'Finish', application: 'Application',
    searchPlaceholder: 'Search products, colors, or materials', noResults: 'No matching results', clear: 'Clear', review: 'Review',
    details: 'Details', submit: 'Submit', back: 'Back', continue: 'Continue', remove: 'Remove', quantity: 'Quantity'
  },
  vi: {
    home: 'Trang chủ', collections: 'Bộ sưu tập', products: 'Sản phẩm', colors: 'Màu đá', finishes: 'Bề mặt & cạnh',
    company: 'Công ty', about: 'Giới thiệu', factory: 'Nhà máy', inspiration: 'Ứng dụng', applications: 'Không gian',
    partners: 'Đối tác', resources: 'Tài liệu', contact: 'Liên hệ', search: 'Tìm kiếm', rfq: 'Báo giá',
    heroEyebrow: 'Đá cẩm thạch & granite • Bình Phước, Việt Nam',
    heroTitle: 'Kinh nghiệm trong từng bề mặt đá.',
    heroBody: 'Sản xuất đá tự nhiên và đá nhân tạo cho nhà phân phối, nhà thầu, khách sạn và dự án quốc tế.',
    exploreProducts: 'Xem sản phẩm', viewFactory: 'Xem nhà máy', requestQuote: 'Yêu cầu báo giá',
    experience: 'Kinh nghiệm ngành đá', plantArea: 'Diện tích nhà máy', annualCapacity: 'Công suất công bố',
    productCatalog: 'Danh mục sản phẩm', productIntro: 'Lập danh sách sản phẩm rõ ràng để nhận báo giá B2B.',
    colorLibrary: 'Thư viện màu', colorIntro: 'Xem mẫu số và xác nhận lựa chọn bằng mẫu vật lý.',
    compare: 'So sánh', compared: 'Đã chọn', addRfq: 'Thêm báo giá', fullSpecs: 'Thông số', sample: 'Yêu cầu mẫu',
    all: 'Tất cả', material: 'Vật liệu', dimensions: 'Kích thước', thickness: 'Độ dày', finish: 'Bề mặt', application: 'Ứng dụng',
    searchPlaceholder: 'Tìm sản phẩm, màu hoặc vật liệu', noResults: 'Không tìm thấy kết quả', clear: 'Xóa', review: 'Kiểm tra',
    details: 'Thông tin', submit: 'Gửi', back: 'Quay lại', continue: 'Tiếp tục', remove: 'Xóa', quantity: 'Số lượng'
  }
} as const;

export type UiKey = keyof typeof copy.en;

export function t(locale: LocaleConfig | string, key: UiKey): string {
  const id = typeof locale === 'string' ? locale : locale.id;
  const dictionary = copy[id as keyof typeof copy] || copy.en;
  return dictionary[key] || copy.en[key];
}
