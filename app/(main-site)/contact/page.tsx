import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

// 1. EXPORT METADATA CHUẨN SEO
export const metadata: Metadata = {
  title: 'Liên Hệ Tư Vấn & Báo Giá Thiết Kế Website | Long Web Studio',
  description: 'Liên hệ với Long Web Studio để nhận tư vấn miễn phí giải pháp thiết kế website chuẩn SEO, văn phòng số cho đại lý thu BHXH, BHYT. Hotline/Zalo: 0966.570.913.',
  alternates: {
    canonical: 'https://www.longwebstudio.io.vn/contact',
  },
  openGraph: {
    title: 'Liên Hệ Tư Vấn & Báo Giá Thiết Kế Website | Long Web Studio',
    description: 'Để lại thông tin, Long Web Studio sẽ liên hệ tư vấn giải pháp tối ưu chuyển đổi và phác thảo ý tưởng hoàn toàn miễn phí trong 15 phút.',
    url: 'https://www.longwebstudio.io.vn/contact',
    siteName: 'Long Web Studio',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function ContactPage() {
  // 2. SCHEMA JSON-LD CONTACTPAGE & ORGANIZATION (TĂNG ĐIỂM UY TÍN E-E-A-T TRÊN GOOGLE)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Liên Hệ Long Web Studio',
    'description': 'Trang liên hệ tư vấn và báo giá thiết kế website chuyên nghiệp.',
    'url': 'https://www.longwebstudio.io.vn/contact',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Long Web Studio',
      'url': 'https://www.longwebstudio.io.vn',
      'telephone': '+84966570913',
      'email': 'contact@longwebstudio.io.vn',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Hà Nội',
        'addressCountry': 'VN',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+84966570913',
        'contactType': 'customer service',
        'availableLanguage': ['Vietnamese'],
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Mã Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-950 sm:text-5xl tracking-tight">
          Khởi Động <span className="text-blue-600">Dự Án</span> Của Bạn
        </h1>
        <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Để lại thông tin, Long Web Studio sẽ liên hệ tư vấn giải pháp tối ưu chuyển đổi và phác thảo ý tưởng hoàn toàn miễn phí trong 15 phút.
        </p>
      </div>

      {/* Bố cục 2 cột: Cột trái chứa thông tin liên hệ EEAT (Google rất thích), Cột phải chứa Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cột 1: Thông tin liên hệ trực tiếp */}
        <div className="lg:col-span-5 bg-gray-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 border border-gray-900">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Thông tin liên hệ</h2>
            <p className="mt-2 text-sm text-gray-400">
              Bạn cần trao đổi nhanh? Hãy gọi hoặc nhắn tin trực tiếp qua Zalo để được hỗ trợ tức thì.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                📞
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Hotline / Zalo</p>
                <a href="https://zalo.me/0966570913" target="_blank" rel="nofollow noopener noreferrer" className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                  0966.570.913
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                📧
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Email làm việc</p>
                <a href="mailto:contact@longwebstudio.io.vn" className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                  contact@longwebstudio.io.vn
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                📍
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Khu vực làm việc</p>
                <p className="text-sm font-semibold text-gray-300">
                  TP. Hà Nội, Việt Nam (Hỗ trợ tư vấn &amp; triển khai Remote toàn quốc)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 text-xs text-gray-400 leading-relaxed">
            ⚡ Cam kết bảo mật thông tin khách hàng. Hỗ trợ kỹ thuật và vận hành 24/7.
          </div>
        </div>

        {/* Cột 2: Component Form Client */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}