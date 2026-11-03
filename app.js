(function () {
  const A = window.AmLich, N = window.NOIDUNG, $ = s => document.querySelector(s);
  const pad = n => String(n).padStart(2, '0');
  const THU = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  let viec = 'cuoi';
  function toISO(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  const t = new Date(); $('#tu').value = toISO(t); $('#den').value = toISO(new Date(t.getTime() + 45 * 864e5));
  function setViec(v) {
    viec = v; document.querySelectorAll('.viec button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
    $('#lb1').textContent = v === 'cuoi' ? 'Năm sinh chú rể' : 'Năm sinh chủ nhà / chủ tiệm';
    $('#row2').style.display = v === 'cuoi' ? '' : 'none';
    $('#moTa').textContent = N.viec[v].mo;
  }
  document.querySelectorAll('.viec button').forEach(b => b.onclick = () => setViec(b.dataset.v));
  setViec('cuoi');
  $('#mau').onclick = () => { setViec('cuoi'); $('#y1').value = 1996; $('#y2').value = 1998; xem(); };
  $('#xem').onclick = xem;
  function nguoi() {
    const L = [];
    const y1 = +$('#y1').value; if (y1 > 1900 && y1 < 2030) L.push({ y: y1, ai: viec === 'cuoi' ? 'chú rể' : 'bạn' });
    const y2 = +$('#y2').value; if (viec === 'cuoi' && y2 > 1900 && y2 < 2030) L.push({ y: y2, ai: 'cô dâu' });
    return L.map(p => ({ ...p, chi: A.yearChi(p.y), ten: A.yearCanChi(p.y) }));
  }
  function cham(d, P) {
    const V = N.viec[viec]; let s = 50; const tot = [], xau = [], luu = [];
    if (d.hoangDao) { s += 20; tot.push('Ngày hoàng đạo – ' + N.than[d.thanTen]); } else { s -= 15; xau.push('Ngày hắc đạo – ' + N.than[d.thanTen]); }
    const ti = V.trucTot.indexOf(d.truc);
    if (ti >= 0) { s += 22 - ti * 3; tot.push('Trực ' + d.trucTen + ': ' + N.truc[d.truc]); }
    else if (V.trucXau.includes(d.truc)) { s -= 25; xau.push('Trực ' + d.trucTen + ': ' + N.truc[d.truc]); }
    else luu.push('Trực ' + d.trucTen + ': ' + N.truc[d.truc]);
    const ld = d.lunar.day;
    if ([3, 7, 13, 18, 22, 27].includes(ld)) { s -= 20; xau.push(N.tamNuong); }
    if ([5, 14, 23].includes(ld)) { s -= 15; xau.push(N.nguyetKy); }
    if (viec === 'cuoi' && d.lunar.month === 7) { s -= 10; xau.push(N.thang7); }
    for (const p of P) {
      const r = ((d.chi - p.chi) % 12 + 12) % 12;
      if (r === 6) { s -= 30; xau.push(N.xung.replace('{ten}', p.ten + ' – ' + p.ai).replace('{con}', A.CON[p.chi])); }
      else if ((d.chi + p.chi) % 12 === 1 || (r && d.chi % 4 === p.chi % 4)) { s += 8; tot.push(N.hop.replace('{ten}', p.ten + ' (' + p.ai + ')')); }
    }
    s = Math.max(0, Math.min(100, s));
    const muc = s >= 80 ? 'tot' : s >= 50 ? 'kha' : 'xau';
    return { s, muc, tot, xau, luu, cau: N.ket[muc][d.lunar.jd % N.ket[muc].length] };
  }
  function xem() {
    const P = nguoi(); let a = new Date($('#tu').value), b = new Date($('#den').value);
    if (isNaN(a) || isNaN(b)) return alert('Bạn chọn ngày bắt đầu và kết thúc nha.');
    if (b < a) [a, b] = [b, a];
    if ((b - a) / 864e5 > 120) b = new Date(a.getTime() + 120 * 864e5);
    const R = [];
    for (let d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
      const i = A.dayInfo(d.getDate(), d.getMonth() + 1, d.getFullYear()); i.thu = THU[d.getDay()]; i.k = cham(i, P); R.push(i);
    }
    ve(R, P);
  }
  function the(d, big) {
    const L = d.lunar, k = d.k;
    return `<div class="the ${k.muc}${big ? ' big' : ''}">
      <div class="dau"><div class="so">${pad(d.dd)}<small>/${pad(d.mm)}</small></div>
        <div class="tt"><b>${d.thu}, ${pad(d.dd)}/${pad(d.mm)}/${d.yy}</b><span>Âm lịch ${L.day}/${L.month}${L.leap ? ' (nhuận)' : ''} · ngày ${d.canChi} · năm ${d.namCanChi}</span></div>
        <div class="diem"><i>${k.s}</i><small>điểm</small></div></div>
      <p class="cau">${k.cau}</p>
      ${k.tot.map(x => `<p class="ok">✔ ${x}</p>`).join('')}${k.luu.map(x => `<p class="luu">• ${x}</p>`).join('')}${k.xau.map(x => `<p class="ko">✖ ${x}</p>`).join('')}
      ${k.muc !== 'xau' ? `<p class="gio">🕐 Giờ đẹp: ${d.gioTot.join(', ')}</p>` : ''}</div>`;
  }
  function ve(R, P) {
    const V = N.viec[viec], tot = R.filter(d => d.k.muc === 'tot').sort((x, y) => y.k.s - x.k.s), kha = R.filter(d => d.k.muc === 'kha'), xau = R.filter(d => d.k.muc === 'xau');
    const w = 520, h = 150, bw = w / R.length;
    const bars = R.map((d, i) => { const bh = Math.max(4, d.k.s / 100 * (h - 20)); return `<rect x="${i * bw + 1}" y="${h - bh}" width="${Math.max(1, bw - 2)}" height="${bh}" rx="2" class="b-${d.k.muc}"><title>${d.dd}/${d.mm}: ${d.k.s} điểm</title></rect>`; }).join('');
    $('#kq').innerHTML = `
      <div class="tong"><h2>${V.icon} ${V.ten}: ${R.length} ngày đã xem</h2>
        <p>${P.length ? 'Theo tuổi ' + P.map(p => p.ten + ' (' + p.ai + ')').join(' và ') + '.' : 'Bạn chưa nhập năm sinh nên chưa xét xung tuổi.'}</p>
        <div class="dem"><span class="c-tot">${tot.length} ngày đẹp</span><span class="c-kha">${kha.length} tạm được</span><span class="c-xau">${xau.length} nên tránh</span></div>
        <svg viewBox="0 0 ${w} ${h}" class="bieudo">${bars}</svg>
        <div class="truc"><span>${pad(R[0].dd)}/${pad(R[0].mm)}</span><span>${pad(R[R.length - 1].dd)}/${pad(R[R.length - 1].mm)}</span></div>
        ${P.filter(p => p.ai === 'cô dâu').map(p => { const tm = R[0].lunar.year - p.y + 1; return [1, 3, 6, 8].includes(tm % 9) ? `<p class="ko">⚠ ${N.kimLau.replace('{tuoi}', tm)}</p>` : ''; }).join('')}
      </div>
      <h3 class="h-tot">🌟 Ngày đẹp nhất</h3>${tot.length ? tot.slice(0, 8).map((d, i) => the(d, i === 0)).join('') : '<p class="trong">Khoảng này chưa có ngày thật đẹp. Bạn thử nới rộng thêm vài tuần nha.</p>'}
      <details><summary>🙂 Ngày tạm được (${kha.length})</summary>${kha.map(d => the(d)).join('')}</details>
      <details><summary>⛔ Ngày nên tránh (${xau.length})</summary>${xau.map(d => the(d)).join('')}</details>
      <p class="note">Kết quả tính theo lịch âm truyền thống (hoàng đạo, 12 trực, xung tuổi), chỉ để tham khảo cho vui, không phải lời khẳng định.</p>`;
    $('#kq').scrollIntoView({ behavior: 'smooth' });
  }
})();
