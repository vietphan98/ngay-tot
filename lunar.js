// Âm lịch Việt Nam (thuật toán thiên văn của Hồ Ngọc Đức, múi giờ +7) + can chi, tiết khí, trực, hoàng đạo.
(function (root) {
  'use strict';
  const PI = Math.PI, TZ = 7;
  const INT = Math.floor;
  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    return jd;
  }
  function getNewMoonDay(k, tz) {
    const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    else deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + tz / 24);
  }
  function getSunLongitude(jdn, tz) {
    const T = (jdn - 2451545.5 - tz / 24) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = (L0 + DL) * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return INT(L / PI * 6);
  }
  function getLunarMonth11(yy, tz) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, tz);
    if (getSunLongitude(nm, tz) >= 9) nm = getNewMoonDay(k - 1, tz);
    return nm;
  }
  function getLeapMonthOffset(a11, tz) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last, i = 1, arc = getSunLongitude(getNewMoonDay(k + i, tz), tz);
    do { last = arc; i++; arc = getSunLongitude(getNewMoonDay(k + i, tz), tz); } while (arc !== last && i < 14);
    return i - 1;
  }
  function solar2lunar(dd, mm, yy, tz = TZ) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, tz);
    if (monthStart > dayNumber) monthStart = getNewMoonDay(k, tz);
    let a11 = getLunarMonth11(yy, tz), b11 = a11, lunarYear;
    if (a11 >= monthStart) { lunarYear = yy; a11 = getLunarMonth11(yy - 1, tz); }
    else { lunarYear = yy + 1; b11 = getLunarMonth11(yy + 1, tz); }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = false, lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, tz);
      if (diff >= leapMonthDiff) { lunarMonth = diff + 10; if (diff === leapMonthDiff) lunarLeap = true; }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap, jd: dayNumber };
  }
  function sunDeg(jd, tz) { // kinh độ mặt trời (độ) lúc 12h trưa giờ VN
    const T = (jd - 2451545.0 - tz / 24) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    const DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M) + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL; L = ((L % 360) + 360) % 360; return L;
  }
  const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  const CON = ['Chuột','Trâu','Hổ','Mèo','Rồng','Rắn','Ngựa','Dê','Khỉ','Gà','Chó','Lợn'];
  const TRUC = ['Kiến','Trừ','Mãn','Bình','Định','Chấp','Phá','Nguy','Thành','Thu','Khai','Bế'];
  const THAN = ['Thanh Long','Minh Đường','Thiên Hình','Chu Tước','Kim Quỹ','Kim Đường','Bạch Hổ','Ngọc Đường','Thiên Lao','Huyền Vũ','Tư Mệnh','Câu Trần'];
  const THAN_TOT = [1,1,0,0,1,1,0,1,0,0,1,0];
  const TIET = ['Lập xuân','Vũ thủy','Kinh trập','Xuân phân','Thanh minh','Cốc vũ','Lập hạ','Tiểu mãn','Mang chủng','Hạ chí','Tiểu thử','Đại thử','Lập thu','Xử thử','Bạch lộ','Thu phân','Hàn lộ','Sương giáng','Lập đông','Tiểu tuyết','Đại tuyết','Đông chí','Tiểu hàn','Đại hàn'];
  const m12 = n => ((n % 12) + 12) % 12;
  // ngày Thanh Long theo tháng âm: tháng 1,7 -> Tý; 2,8 -> Dần; 3,9 -> Thìn; 4,10 -> Ngọ; 5,11 -> Thân; 6,12 -> Tuất
  const thanhLongDay = lm => ((lm - 1) % 6) * 2;
  // giờ Thanh Long theo chi ngày: Tý/Ngọ -> Thân; Sửu/Mùi -> Tuất; Dần/Thân -> Tý; Mão/Dậu -> Dần; Thìn/Tuất -> Thìn; Tỵ/Hợi -> Ngọ
  const thanhLongHour = dc => m12(8 + (dc % 6) * 2);
  const GIO = ['23h–1h','1h–3h','3h–5h','5h–7h','7h–9h','9h–11h','11h–13h','13h–15h','15h–17h','17h–19h','19h–21h','21h–23h'];
  function dayInfo(dd, mm, yy) {
    const L = solar2lunar(dd, mm, yy), jd = L.jd;
    const can = (jd + 9) % 10, chi = (jd + 1) % 12;
    const deg = sunDeg(jd + 0.5 - 0.5, TZ); // ~12h trưa
    const tietIdx = Math.floor((((deg - 315) % 360) + 360) % 360 / 15); // 0 = Lập xuân
    const thangTiet = Math.floor(tietIdx / 2); // 0 = tháng Dần
    const chiThang = m12(2 + thangTiet);
    const truc = m12(chi - chiThang);
    const than = m12(chi - thanhLongDay(L.month));
    const tl = thanhLongHour(chi), gioTot = [];
    for (let h = 0; h < 12; h++) if (THAN_TOT[m12(h - tl)]) gioTot.push(CHI[h] + ' (' + GIO[h] + ')');
    const yCan = (L.year + 6) % 10, yChi = (L.year + 8) % 12;
    return { dd, mm, yy, lunar: L, can, chi, canChi: CAN[can] + ' ' + CHI[chi], namCanChi: CAN[yCan] + ' ' + CHI[yChi],
      tiet: TIET[tietIdx], truc, trucTen: TRUC[truc], than, thanTen: THAN[than], hoangDao: !!THAN_TOT[than], gioTot };
  }
  const yearChi = y => m12(y + 8), yearCanChi = y => CAN[(y + 6) % 10] + ' ' + CHI[m12(y + 8)];
  root.AmLich = { solar2lunar, dayInfo, jdFromDate, CAN, CHI, CON, TRUC, THAN, yearChi, yearCanChi };
})(typeof window !== 'undefined' ? window : globalThis);
