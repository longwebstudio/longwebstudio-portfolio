import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import BHYTCalculatorWidget from '@/components/BHYTCalculatorWidget'; // Trải nghiệm tính phí thực tế

// 1. TỐI ƯU HOÁ DYNAMIC METADATA & OPEN GRAPH CHO LANDING PAGE (CẬP NHẬT ẢNH ĐỘNG)
export async function generateMetadata() {
  const title = 'Vì Sao Nhân Viên Thu BHXH, BHYT Nên Có Website Riêng? | Long Web Studio';
  const description = 'Giải pháp website trợ lý số tối ưu hiệu suất cho đại lý và nhân viên thu bảo hiểm BHYT hộ gia đình, BHXH tự nguyện. Tự động tính phí, gửi tin nhắc Zalo 1-click.';
  const url = 'https://blog.longwebstudio.io.vn/vi-sao-nhan-vien-thu-bhxh-bhyt-nen-co-website-rieng';
  
  // Trỏ trực tiếp tới đường dẫn của tệp opengraph-image.tsx tự sinh trong cùng thư mục
  const ogImage = 'https://blog.longwebstudio.io.vn/vi-sao-nhan-vien-thu-bhxh-bhyt-nen-co-website-rieng/opengraph-image';

  return {
    title,
    description,
    alternates: {
      canonical: url, // Thẻ liên kết chuẩn ngăn ngừa trùng lặp nội dung
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Long Web Studio Blog',
      images: [
        {
          url: ogImage, // Trỏ tới ảnh động chuẩn hóa kích thước 1200x630
          width: 1200,
          height: 630,
        },
      ],
      locale: 'vi_VN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function InsuranceLandingPage() {
  const slug = 'vi-sao-nhan-vien-thu-bhxh-bhyt-nen-co-website-rieng';
  
  // 2. KHAI BÁO DỮ LIỆU CẤU TRÚC JSON-LD (ARTICLE SCHEMA) CHO GOOGLE INDEX
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Vì Sao Nhân Viên Thu BHXH, BHYT Nên Có Website Riêng?',
    'image': 'https://blog.longwebstudio.io.vn/vi-sao-nhan-vien-thu-bhxh-bhyt-nen-co-website-rieng/opengraph-image', // Trỏ trực tiếp tới ảnh động
    'datePublished': '2026-07-23',
    'description': 'Đánh giá thực trạng và giải pháp chuyển đổi số, tối ưu năng suất cho đại lý và nhân viên thu BHYT/BHXH bằng hệ thống website trợ lý số.',
    'author': {
      '@type': 'Person',
      'name': 'Long Web Studio',
      'url': 'https://longwebstudio.io.vn',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Long Web Studio',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://blog.longwebstudio.io.vn/logo.png',
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-grow space-y-16">
      {/* Nhúng đoạn mã Schema JSON-LD tối ưu SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <FadeIn delay={0.1}>
        <nav className="text-xs text-slate-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <span>&rsaquo;</span>
          <span className="text-slate-900 font-medium">Bảo hiểm</span>
        </nav>
      </FadeIn>

      {/* 3. HERO TITLE */}
      <FadeIn delay={0.15}>
        <header className="space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Góc nhìn chuyển đổi số
          </span>
          <h1 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Vì sao nhân viên thu BHXH, BHYT <br /> nên có website riêng?
          </h1>
        </header>
      </FadeIn>

      {/* 4. PHẦN MỞ ĐẦU: THỰC TRẠNG & NỖI ĐAU */}
      <FadeIn delay={0.2}>
        <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>Có thể bạn đang nghĩ:</p>
          
          <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-xl italic text-slate-600 font-medium my-6">
            &ldquo;Tôi đã có Facebook và Zalo, cần gì thêm website?&rdquo;
          </blockquote>

          <p>Đó là câu hỏi rất nhiều người đặt ra.</p>
          <p>Nhưng hãy thử nhìn vào một ngày làm việc thực tế của bạn:</p>

          <ul className="space-y-3.5 pl-2 my-6">
            <li className="flex items-start gap-2.5">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>Mỗi ngày có người hỏi đi hỏi lại những câu hỏi chính sách giống nhau.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>Mỗi tháng phải rà soát sổ sách để nhắc hàng chục khách hàng đến hạn đóng phí gia hạn.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>Muốn chia sẻ thông tin chính sách hữu ích mới nhưng bài viết nhanh chóng bị trôi đi mất trên trang cá nhân Facebook.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>Khi có người được giới thiệu, bạn lại phải lặp đi lặp lại việc gửi từng ảnh bảng phí, từng tin nhắn để giải thích thủ tục đóng.</span>
            </li>
          </ul>

          <p>Nếu những việc này đang lặp đi lặp lại mỗi ngày, bạn đang dành phần lớn thời gian quý báu của mình cho những công việc thủ công mà công nghệ hoàn toàn có thể hỗ trợ tự động.</p>
          
          <p className="font-extrabold text-slate-900 border-b border-slate-100 pb-4">
            Website sẽ không thay bạn tư vấn hoàn toàn. <br />
            Website giúp bạn chuẩn bị chu đáo nhất trước khi bước vào cuộc tư vấn.
          </p>
        </section>
      </FadeIn>

      {/* 5. PHẦN THÂN BÀI: MỘT WEBSITE CÓ THỂ LÀM GÌ CHO BẠN? */}
      <section className="space-y-8">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Giải quyết bài toán</span>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">Một Website Có Thể Làm Gì Cho Bạn?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl block mb-2">⏰</span>
            <h3 className="font-extrabold text-slate-900 text-sm">1. Làm việc liên tục 24/7</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ngay cả khi bạn đang nghỉ ngơi, người dân vẫn có thể tự lên trang web của bạn để tìm hiểu về BHXH tự nguyện, tìm hiểu về BHYT hộ gia đình, đọc các câu hỏi thường gặp và đăng ký thông tin tư vấn. Bạn sẽ không còn bỏ lỡ bất kỳ ai đang tìm hiểu ngoài giờ làm việc.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl block mb-2">🤝</span>
            <h3 className="font-extrabold text-slate-900 text-sm">2. Xây dựng niềm tin trước khi gặp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Một website chuyên nghiệp hiển thị rõ ràng thông tin đại lý ủy quyền của bạn, quy trình tư vấn và phản hồi tích cực từ những người đã được bạn hỗ trợ. Khi niềm tin được xây dựng từ trước, cuộc trò chuyện thực tế sẽ diễn ra thuận lợi hơn rất nhiều.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl block mb-2">⚡</span>
            <h3 className="font-extrabold text-slate-900 text-sm">3. Tiết kiệm tối đa thời gian</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Thay vì giải thích cùng một thủ tục hàng chục lần, bạn chỉ cần gửi một đường dẫn chứa bài viết hướng dẫn trực quan trên website. Khách hàng sẽ có thêm thời gian nghiên cứu chi tiết, còn bạn có thêm thời gian để tập trung vào các trường hợp cần tư vấn chuyên sâu.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-2xl block mb-2">📱</span>
            <h3 className="font-extrabold text-slate-900 text-sm">4. Chăm sóc khách hàng lâu dài</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Công việc của bạn không kết thúc sau khi người dân tham gia đóng. Hệ thống website trợ lý số sẽ hỗ trợ bạn theo dõi thời hạn, nhắc lịch đóng tiền gia hạn đúng lúc, tiếp nhận yêu cầu hỗ trợ và cập nhật chính sách mới nhanh nhất cho người dân.
            </p>
          </div>
        </div>
      </section>

      {/* 6. EMBED TRỰC TIẾP MÁY TÍNH BHYT ĐỂ ĐẠI LÝ TRẢI NGHIỆM THỰC TẾ */}
      <FadeIn delay={0.3}>
        <section className="py-6 border-y border-slate-100">
          <div className="text-center mb-6">
            <h2 className="text-lg font-black text-slate-950">Trải Nghiệm Trợ Lý Tính Phí BHYT Thực Tế</h2>
            <p className="text-xs text-slate-500 mt-1">Dưới đây là một phần tính năng tính toán tự động sẽ được cài đặt trực tiếp trên website cá nhân của bạn:</p>
          </div>
          <BHYTCalculatorWidget />
        </section>
      </FadeIn>

      {/* 7. QUY TRÌNH LÀM VIỆC CỦA LONG WEB STUDIO */}
      <section className="space-y-8">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Phương châm dịch vụ</span>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">Long Web Studio Không Chỉ Bàn Giao Website</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Tôi luôn đồng hành cùng bạn trong việc chuyển đổi số và xây dựng một hệ thống làm việc tối ưu hiệu quả hơn mỗi ngày. Quy trình thiết kế chuyên biệt bao gồm:
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
            <span className="text-xs font-black text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">01</span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-950 mb-1">Tìm hiểu quy trình làm việc</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Long sẽ lắng nghe chi tiết cách bạn đang tìm kiếm người dân tham gia đóng, cách bạn tư vấn và quy trình chăm sóc người tham gia hàng ngày của bạn tại địa bàn.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
            <span className="text-xs font-black text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">02</span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-950 mb-1">Thiết kế giải pháp phù hợp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Nói không với các mẫu website có sẵn đại trà. Mỗi hệ thống website trợ lý số sẽ được lập trình chuyên biệt dựa trên mục tiêu, đặc thù khu vực và cách làm việc riêng của bạn.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
            <span className="text-xs font-black text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">03</span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-950 mb-1">Triển khai kỹ thuật tối ưu</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Ứng dụng được thiết kế trên hệ thống Next.js hiện đại, tải trang tức thì dưới 1 giây, tối ưu hóa giao diện hoàn hảo trên điện thoại di động để bạn dễ dàng mang đi tư vấn thực tế tại nhà dân.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
            <span className="text-xs font-black text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">04</span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-950 mb-1">Đồng hành sau khi bàn giao</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Bạn sẽ được hướng dẫn chi tiết cách cập nhật các chính sách mới, quản lý danh sách người tham gia và cách khai thác tối đa website để phát triển công việc thu hộ lâu dài.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GIÁ TRỊ NHẬN ĐƯỢC */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-slate-950">Giá Trị Bạn Nhận Được</h2>
        <p className="text-sm text-slate-600 leading-relaxed">Bạn không chỉ sở hữu đơn thuần một trang web. Bạn đang đầu tư nghiêm túc vào:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
            <span className="text-lg">💎</span>
            <span className="font-semibold">Một kênh xây dựng thương hiệu cá nhân uy tín</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
            <span className="text-lg">🎯</span>
            <span className="font-semibold">Một công cụ tự động tiếp nhận khách hàng tiềm năng</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
            <span className="text-lg">🤖</span>
            <span className="font-semibold">Một hệ thống thông minh hỗ trợ chăm sóc người dân</span>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
            <span className="text-lg">📈</span>
            <span className="font-semibold">Một tài sản số bền vững đồng hành cùng sự nghiệp</span>
          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERTING CALL TO ACTION (CTA) */}
      <FadeIn delay={0.6}>
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 sm:p-10 rounded-2xl text-center space-y-6 shadow-md">
          <span className="text-xs font-bold bg-blue-900/30 text-white px-3 py-1 rounded-full uppercase tracking-widest inline-block">
            Long Web Studio
          </span>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug">
            Biến Website Thành Trợ Lý Số <br /> Của Nhân Viên Thu BHXH, BHYT
          </h3>
          <p className="text-xs text-blue-100 max-sm mx-auto leading-relaxed">
            Để bạn có thêm thời gian chăm sóc người dân, phát triển mạng lưới, gia tăng doanh số thu và xây dựng uy tín lâu dài.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://zalo.me/0966570913" 
              target="_blank" 
              rel="nofollow" 
              className="bg-white text-blue-600 hover:bg-slate-50 font-bold py-3 px-8 rounded-lg text-xs shadow-sm transition-all"
            >
              💬 Trao đổi trực tiếp qua Zalo (0966.570.913)
            </a>
            <Link 
              href="/contact" 
              className="bg-blue-950/20 hover:bg-blue-950/30 text-white font-bold py-3 px-8 rounded-lg text-xs transition-all border border-white/20"
            >
              Yêu cầu tư vấn miễn phí &rarr;
            </Link>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}