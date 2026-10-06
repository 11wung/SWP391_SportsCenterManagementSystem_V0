import { 
  Users, Calendar, CreditCard, Dumbbell, Megaphone, 
  Award, Smartphone, Network, Building2, Clock3, Users2, Trophy
} from 'lucide-react';

export const navigationData = {
  products: [
    { name: 'SportCenter Hội viên', desc: 'Quản lý hồ sơ, thẻ thành viên, gói tập và vé lượt', icon: Users, href: '#features' },
    { name: 'SportCenter Lịch sân & PT', desc: 'Đặt sân cầu lông, tennis, bóng đá và lịch HLV theo slot', icon: Calendar, href: '#features' },
    { name: 'SportCenter Thu phí & POS', desc: 'Tự động xuất hóa đơn, tích hợp VietQR, MoMo, VNPay', icon: CreditCard, href: '#features' },
    { name: 'SportCenter Mobile & Zalo App', desc: 'Khách hàng tự đặt sân, nạp tiền và check-in QR tiện lợi', icon: Smartphone, href: '#features' },
  ],
  solutions: [
    { title: 'Trung tâm Thể thao Đa năng', desc: 'Tổ hợp gồm sân bóng, tennis, cầu lông, bơi lội và gym', href: '#ecosystem' },
    { title: 'Chuỗi Phòng Gym & Fitness', desc: 'Quản trị tập trung đa chi nhánh, phân quyền chuẩn hóa', href: '#ecosystem' },
    { title: 'Sân tập & CLB Thể thao', desc: 'Tối ưu lịch đặt sân theo giờ, kiểm soát bật tắt đèn tự động', href: '#ecosystem' },
    { title: 'Bể bơi & Studio Yoga, Pilates', desc: 'Bán vé lượt, vé tháng, tích hợp cổng kiểm soát FaceID', href: '#ecosystem' },
  ]
};

export const statsData = [
  {
    number: '92%',
    label: 'Thị phần phần mềm Quản lý Thể thao',
    desc: 'Được tin dùng hàng đầu tại các trung tâm thể thao & fitness chuyên nghiệp',
    icon: Award,
  },
  {
    number: '2.500+',
    label: 'Cơ sở & Trung tâm thể thao',
    desc: 'Từ câu lạc bộ thể thao độc lập đến chuỗi tổ hợp thể hình đa năng',
    icon: Building2,
  },
  {
    number: '2.0M+',
    label: 'Lượt đặt sân & check-in mỗi tháng',
    desc: 'Xử lý tự động hóa lịch đặt sân, check-in FaceID và giao dịch trực tuyến',
    icon: Users2,
  },
  {
    number: '24/7',
    label: 'Vận hành ổn định & Hỗ trợ kỹ thuật',
    desc: 'Hệ thống Cloud bảo mật cao, sẵn sàng triển khai và chuyển giao trong 24h',
    icon: Clock3,
  },
];

export const partnersData = [
  {
    name: 'Elite Sport Complex',
    category: 'Tổ hợp Thể thao Cao cấp',
    desc: 'Triển khai hệ thống đặt sân thông minh và kiểm soát cửa tự động',
    color: 'from-blue-600/30 to-blue-950/40',
    tag: 'Tổ hợp 5 sao',
  },
  {
    name: 'Aura Fitness & Yoga',
    category: 'Chuỗi Fitness & Yoga',
    desc: 'Số hóa quản lý hội viên và tự động hóa tính lương huấn luyện viên',
    color: 'from-emerald-700/30 to-green-950/40',
    tag: '12 Chi nhánh',
  },
  {
    name: 'Hải Đăng Tennis & Pickleball',
    category: 'CLB Quần vợt & Thể thao',
    desc: 'Tự động hóa 100% lịch đặt sân theo giờ và tích hợp thanh toán VietQR',
    color: 'from-amber-700/30 to-yellow-950/40',
    tag: 'Smart Booking',
  },
  {
    name: 'Green Arena Stadium',
    category: 'Sân cỏ nhân tạo & Futsal',
    desc: 'Quản lý doanh thu sân bãi theo ca và kiểm soát bật tắt đèn sân tự động',
    color: 'from-red-600/30 to-red-950/40',
    tag: 'Smart Lighting',
  },
  {
    name: 'Olympic Swim & Gym Center',
    category: 'Bể bơi bốn mùa & Gym',
    desc: 'Ứng dụng cổng quay FaceID ngăn chặn trốn vé và thất thoát doanh thu',
    color: 'from-teal-600/30 to-teal-950/40',
    tag: 'FaceID Barrier',
  },
];

export const featuresData = [
  {
    id: 'members',
    category: 'members',
    title: 'SportCenter Hội viên',
    icon: Users,
    desc: 'Hợp đồng, thẻ thành viên, gói tập và vòng đời khách hàng trên một màn hình — biết ngay ai sắp hết hạn.',
    tags: ['Hợp đồng & thẻ tập', 'Check-in FaceID / QR', 'Nhắc gia hạn tự động'],
    previewType: 'table',
    mockupData: {
      title: 'Danh sách hội viên đang hoạt động',
      rows: [
        { name: 'Nguyễn Văn An', pack: 'Gói 1 Năm Diamond', exp: 'Còn 5 ngày', status: 'Sắp hết hạn', alert: true },
        { name: 'Trần Thị Mai', pack: 'Vé Tháng Gym & Bơi', exp: 'Còn 120 ngày', status: 'Đang hoạt động', alert: false },
        { name: 'Lê Hoàng Nam', pack: 'Thẻ Bơi Bốn Mùa 6M', exp: 'Còn 45 ngày', status: 'Đang hoạt động', alert: false },
      ]
    }
  },
  {
    id: 'schedule',
    category: 'schedule',
    title: 'SportCenter Lịch sân & Lớp học',
    icon: Calendar,
    desc: 'Lịch sân bóng đá, tennis, cầu lông và lớp học thể thao theo slot — khách hàng tự đặt, hệ thống tự giữ chỗ.',
    tags: ['Đặt sân online theo slot', 'Lịch lớp thể thao tuần', 'Tự động chống trùng sân'],
    previewType: 'calendar',
    mockupData: {
      title: 'Lịch sử dụng sân bãi hôm nay',
      slots: [
        { time: '06:00 - 08:00', title: 'Sân Tennis Số 1 (Sáng)', coach: 'HLV Minh Quang', booked: 'Đã giữ chỗ' },
        { time: '17:30 - 19:30', title: 'Sân Futsal Số 2 (Đỉnh điểm)', coach: 'Trọng tài điều hành', booked: '2/2 Giờ Full' },
        { time: '19:30 - 21:00', title: 'Sân Cầu Lông Số 3', coach: 'Khách cố định', booked: 'Đang thi đấu' },
      ]
    }
  },
  {
    id: 'finance',
    category: 'finance',
    title: 'SportCenter Thu phí & POS',
    icon: CreditCard,
    desc: 'Cổng thanh toán tự động VietQR, MoMo, VNPay — thu tiền thuê sân, bán đồ uống tiện lợi và đối soát chính xác.',
    tags: ['VietQR · MoMo · VNPay', 'Bán hàng POS nước uống', 'Hoá đơn điện tử'],
    previewType: 'payment',
    mockupData: {
      title: 'Doanh thu hôm nay (Sân + Gói tập)',
      amount: '96.800.000 ₫',
      methods: ['VietQR Pro', 'MoMo Auto', 'VNPay POS'],
      recent: 'Đặt sân bóng 18:00 (+800.000 ₫) - Thành công'
    }
  },
  {
    id: 'coaching',
    category: 'schedule',
    title: 'SportCenter HLV & Trọng tài',
    icon: Dumbbell,
    desc: 'Xếp lịch ca dạy kèm, theo dõi số giờ dạy thực tế của từng HLV và tính hoa hồng tự động theo doanh số.',
    tags: ['Lịch dạy HLV cá nhân', 'Theo dõi KPI buổi dạy', 'Tự động tính hoa hồng'],
    previewType: 'pt',
    mockupData: {
      title: 'Bảng theo dõi KPI Huấn Luyện Viên',
      pts: [
        { name: 'HLV Tuấn Kiệt (Tennis)', session: '52 giờ dạy', kpi: '110% KPI', com: '22.5M ₫' },
        { name: 'HLV Thu Hà (Bơi lội)', session: '44 giờ dạy', kpi: '102% KPI', com: '18.8M ₫' },
      ]
    }
  },
  {
    id: 'marketing',
    category: 'marketing',
    title: 'SportCenter Tiếp thị & CSKH',
    icon: Megaphone,
    desc: 'Gửi chiến dịch qua Zalo ZNS, SMS Brandname — nhắc lịch sân, chúc mừng sinh nhật và kích hoạt hội viên cũ.',
    tags: ['Zalo ZNS · SMS', 'Nhắc lịch đặt sân tự động', 'Tái kích hoạt khách cũ'],
    previewType: 'campaign',
    mockupData: {
      title: 'Chiến dịch Zalo ZNS thông báo tự động',
      campaigns: [
        { name: 'Nhắc giờ vào sân trước 30 phút', sent: '1.250 tin', openRate: '98.5%' },
        { name: 'Ưu đãi gia hạn giờ vàng đặt sân', sent: '680 tin', openRate: '92.3%' },
      ]
    }
  },
  {
    id: 'loyalty',
    category: 'marketing',
    title: 'SportCenter Loyalty & Tích điểm',
    icon: Award,
    desc: 'Tích điểm theo giờ chơi, nâng hạng thành viên — đổi giờ sân miễn phí hoặc quà tặng nước uống trên app.',
    tags: ['Tích điểm giờ chơi', 'Kho phần thưởng thể thao', 'Bảng xếp hạng giải đấu'],
    previewType: 'loyalty',
    mockupData: {
      title: 'Hạng thành viên SportCenter',
      tiers: [
        { name: 'Hạng Bạch Kim', perk: 'Giảm 20% tiền sân + Tặng bóng thi đấu', points: '15.000 điểm' },
        { name: 'Hạng Vàng', perk: 'Ưu tiên giữ sân giờ cao điểm', points: '6.000 điểm' },
      ]
    }
  },
  {
    id: 'app',
    category: 'marketing',
    title: 'SportCenter App & Zalo Mini App',
    icon: Smartphone,
    desc: 'Khách hàng tự tìm sân trống, thanh toán giữ chỗ và mở cổng bằng mã QR trực tiếp trong Zalo không cần cài app.',
    tags: ['Zalo Mini App', 'Mã QR mở cổng tự động', 'Đặt sân & chọn giờ online'],
    previewType: 'mobile',
    mockupData: {
      title: 'Tiện ích cho khách hàng SportCenter',
      features: ['Xem sơ đồ sân trống theo thời gian thực', 'Tự quét mã QR vào sân không cần nhân viên', 'Thanh toán tiền sân qua VietQR tích hợp']
    }
  },
  {
    id: 'chains',
    category: 'members',
    title: 'SportCenter Quản lý Chuỗi',
    icon: Network,
    desc: 'Quản trị tập trung nhiều cụm sân và trung tâm thể thao trên một tài khoản — phân quyền và báo cáo realtime.',
    tags: ['Đa chi nhánh / Đa cụm sân', 'Phân quyền ban quản lý', 'So sánh doanh thu cơ sở'],
    previewType: 'chain',
    mockupData: {
      title: 'Báo cáo hợp nhất chuỗi trung tâm',
      branches: [
        { name: 'SportCenter Cầu Giấy', revenue: '480M ₫', members: '1.400 khách' },
        { name: 'SportCenter Thủ Đức (HCM)', revenue: '620M ₫', members: '1.950 khách' },
      ]
    }
  },
];
