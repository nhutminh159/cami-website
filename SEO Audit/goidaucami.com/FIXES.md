# SEO Fixes — goidaucami.com

Lần audit gần nhất: **2026-10-04** (deep mode, chấm trên file local trước khi deploy) · 11 trang · Điểm site: **100/100**
So với lần trước (2026-07-14 sau khi sửa): **100 → 100**, thêm 3 trang mới đều đạt 100.

## Đã làm trong lần này
- ✅ Thêm 3 bài blog nhắm từ khóa mới, không trùng chủ đề với 6 bài cũ — **chỉ về gội đầu, không nội dung body care** (theo yêu cầu chủ tiệm):
  - `/blog/detox-da-dau-la-gi.html`: detox da đầu, gội đầu trị gàu, da đầu ngứa bết dầu (dẫn về Gội Detox 169K)
  - `/blog/cach-goi-dau-dung-cach.html`: cách gội đầu đúng cách, sai lầm khi gội đầu gây rụng tóc (dẫn về các gói gội)
  - `/blog/goi-dau-duong-sinh-gia-bao-nhieu.html`: giá / bảng giá gội đầu dưỡng sinh (bảng giá 2026 đầy đủ)
- ✅ Mỗi bài có Article + BreadcrumbList + FAQPage schema, OG đầy đủ, `twitter:card`, canonical, ảnh có alt + width/height
- ✅ Thêm 3 bài vào sitemap.xml, trang /blog/ (đầu danh sách + Bài Viết Nổi Bật) và mục Blog trang chủ
- ✅ Sửa giá sai "Thư Giãn Đá Nóng 199K" → "298K" trong khung bảng giá ở cột phải của 3 bài cũ
- ✅ Thay ảnh poster "Ngâm Chân Detox 88K" (dịch vụ đã ngừng) trong 5 trang blog + sitemap bằng ảnh ngâm chân thảo mộc

## Còn mở — cần thao tác thủ công trên Netlify

### [WARN] Netlify "Pretty URLs" tạo URL trùng nội dung
- **Hiện trạng (từ lần audit 2026-07-14, chưa xác nhận đã tắt):** mỗi bài blog có 2 URL cùng trả 200: `/blog/xxx.html` (canonical) và `/blog/xxx`.
- **Cách sửa:** Netlify Dashboard → site CAMI → Site settings → Build & deploy → Post processing → Asset optimization → tắt **"Pretty URLs"**.

## Đề xuất tiếp theo (nội dung)
- Gửi lại sitemap trong Google Search Console sau khi deploy, và dùng "Kiểm tra URL → Yêu cầu lập chỉ mục" cho 3 bài mới.
- Thêm link từ các bài cũ liên quan sang bài mới (vd. head-spa-tphcm → detox-da-dau-la-gi; goi-dau-bao-lau-thi-tot → cach-goi-dau-dung-cach).
- Chủ đề gội đầu tiềm năng cho đợt sau: "hấp dầu phục hồi tóc hư tổn", "phun nano tóc là gì", "gội đầu dưỡng sinh sau sinh".
- Lưu ý định hướng nội dung: blog chỉ viết về gội đầu / chăm sóc tóc – da đầu.

## Đã tốt — không đổi
- HTTPS, viewport, đúng 1 H1/trang, indexable
- Không trùng title/description giữa 11 trang, canonical tự trỏ đúng, mọi link nội bộ đều có trong sitemap
- Ảnh lightbox `<img src="">` ở trang chủ không có width/height: là khung trống JS nạp ảnh khi bấm phóng to, không phải lỗi

## Giới hạn lần audit này
- Chấm trên file local (chưa deploy) — cần chạy lại trên domain thật sau khi upload
- Không đo Core Web Vitals/PageSpeed; không quét broken links hàng loạt
- Nghiên cứu từ khóa dựa trên kết quả tìm kiếm Google hiện tại, không có số liệu lượt tìm kiếm (search volume)
