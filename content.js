// Lời giải thích – tự viết, tiếng Việt đời thường. Nội dung tham khảo, giải trí.
window.NOIDUNG = {
  viec: {
    cuoi: { ten: 'Cưới hỏi', icon: '💍', trucTot: [4, 8, 2, 10], trucXau: [6, 11, 0, 7],
      mo: 'Ngày vui của hai đứa, chọn được ngày đẹp thì cả nhà cũng yên tâm hơn.' },
    khaitruong: { ten: 'Khai trương', icon: '🏪', trucTot: [2, 8, 10, 4], trucXau: [6, 11, 9, 7],
      mo: 'Mở hàng ngày đẹp cho tinh thần phấn chấn, khách vào tấp nập.' },
    chuyennha: { ten: 'Chuyển nhà', icon: '🏠', trucTot: [8, 10, 4, 2, 1], trucXau: [6, 11, 7, 9],
      mo: 'Về nhà mới ngày tốt, ở cho êm ấm, ra vào thuận lợi.' }
  },
  truc: [
    'Ngày khởi đầu, hợp đi xa, gặp người, mở chuyện mới; nhưng chuyện cưới xin, động thổ thì nên né.',
    'Ngày dọn dẹp, bỏ cái cũ: hợp sửa sang, chữa bệnh, giải quyết chuyện tồn đọng.',
    'Ngày đầy đặn, no đủ: hợp mở hàng, cầu tài, nhận đồ, đón khách.',
    'Ngày bằng phẳng, êm êm: làm việc gì cũng tạm ổn, không có gì nổi bật.',
    'Ngày yên ổn, chắc chắn: hợp cưới hỏi, ký kết, dọn về chỗ mới.',
    'Ngày giữ lại: hợp sắm đồ, làm giấy tờ; chuyện dọn đi hay mở rộng thì chưa hợp lắm.',
    'Ngày dễ vỡ, dễ đổ: cưới hỏi, khai trương, chuyển nhà đều nên tránh.',
    'Ngày chông chênh: làm gì cũng nên cẩn thận, không hợp khởi sự việc lớn.',
    'Ngày thành công, mọi việc dễ xuôi: rất hợp cưới hỏi, khai trương, về nhà mới.',
    'Ngày thu về: hợp thu tiền, nhập hàng, gặt hái; còn mở hàng hay dọn đi thì kém.',
    'Ngày mở cửa, thông thoáng: hợp khai trương, nhập trạch, bắt đầu việc mới.',
    'Ngày đóng lại: hợp nghỉ ngơi, sửa chỗ hở; việc vui lớn nên để ngày khác.'
  ],
  than: {
    'Thanh Long': 'Thần Thanh Long trông ngày, việc gì cũng có quý nhân đỡ.',
    'Minh Đường': 'Thần Minh Đường chiếu, dễ gặp người giúp, làm ăn sáng sủa.',
    'Kim Quỹ': 'Thần Kim Quỹ chiếu, hợp chuyện tiền bạc, cưới xin, sinh con.',
    'Kim Đường': 'Thần Kim Đường (Bảo Quang) chiếu, mọi việc dễ thuận, nhà cửa ấm.',
    'Ngọc Đường': 'Thần Ngọc Đường chiếu, hợp làm ăn, mở hàng, cầu danh.',
    'Tư Mệnh': 'Thần Tư Mệnh chiếu, ban ngày làm gì cũng dễ suôn.',
    'Thiên Hình': 'Ngày Thiên Hình, dễ va chạm, lời qua tiếng lại.',
    'Chu Tước': 'Ngày Chu Tước, dễ thị phi, giấy tờ dễ rắc rối.',
    'Bạch Hổ': 'Ngày Bạch Hổ, dễ hao tổn, việc vui lớn nên tránh.',
    'Thiên Lao': 'Ngày Thiên Lao, việc dễ bị vướng, chậm trễ.',
    'Huyền Vũ': 'Ngày Huyền Vũ, dễ mất đồ, dễ bị hiểu lầm.',
    'Câu Trần': 'Ngày Câu Trần, việc dễ dây dưa, kéo dài.'
  },
  ket: {
    tot: ['Ngày này đẹp đó! Có thể chọn được.', 'Ngày sáng sủa, nhiều điều thuận. Đáng cân nhắc.', 'Ngày tốt cho việc của bạn, xem giờ đẹp bên dưới nha.'],
    kha: ['Ngày tạm ổn, không xấu. Nếu kẹt lịch thì vẫn dùng được.', 'Ngày bình bình, có cái tốt có cái chưa tốt.'],
    xau: ['Ngày này nên né cho yên tâm.', 'Ngày không hợp lắm, chọn ngày khác sẽ nhẹ lòng hơn.']
  },
  xung: 'Ngày này xung tuổi {ten} (tuổi {con}). Người tuổi này nên tránh làm việc lớn hôm đó.',
  hop: 'Ngày hợp tuổi {ten}, thêm phần thuận.',
  tamNuong: 'Rơi vào ngày Tam Nương (mùng 3, 7, 13, 18, 22, 27) – ông bà mình thường kiêng làm việc lớn.',
  nguyetKy: 'Rơi vào ngày Nguyệt Kỵ (mùng 5, 14, 23) – "mùng năm mười bốn hăm ba, đi chơi cũng thiệt nữa là đi buôn".',
  thang7: 'Tháng 7 âm lịch nhiều nhà kiêng cưới xin, bạn hỏi thêm ý người lớn nha.',
  kimLau: 'Năm âm lịch này cô dâu {tuoi} tuổi mụ, phạm Kim Lâu theo cách tính dân gian – nhiều nhà sẽ xem kỹ hoặc dời năm.'
};
