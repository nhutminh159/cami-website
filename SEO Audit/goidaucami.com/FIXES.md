# SEO Fixes — goidaucami.com

Lần audit gần nhất: **2026-07-14 (sau khi sửa)** · Điểm site: **100/100** · 0 fail, 1 warn, 132 pass
So với lần trước (2026-07-14, trước khi sửa): **91 → 100** (+9 điểm)

## Đã sửa trong lần này
- ✅ Rút gọn title + meta description trang chủ (73→48 ký tự, 192→140 ký tự)
- ✅ Rút gọn title 6 bài blog (64-67 ký tự → 42-54 ký tự)
- ✅ Rút gọn meta description 4 bài blog (161-171 ký tự → 133-147 ký tự)
- ✅ Thêm `width`/`height` cho toàn bộ ảnh trên 8 trang (index, blog/index, 6 bài viết) — dùng kích thước thật đọc từ file gốc
- ✅ Sửa heading order nhảy cấp (h2→h4) ở 4 vị trí: trang chủ (About + Tuyển Dụng), head-spa-tphcm (bảng so sánh), ngam-chan-thao-moc (3 tác dụng)
- ✅ Thêm Open Graph đầy đủ (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`) cho `/blog/`
- ✅ Sửa 1 ảnh vỡ (404) trong related-posts của bài "Gội Đầu Dưỡng Sinh Là Gì" — thay bằng link + ảnh thật đến bài "Ngâm Chân Thảo Mộc"

## Còn lại — cần thao tác thủ công trên Netlify (không sửa được bằng code)

### [WARN] Netlify "Pretty URLs" tạo URL trùng nội dung (duplicate content)
- **Hiện trạng:** Mỗi bài blog tồn tại ở 2 URL cùng trả 200 OK, không redirect: `/blog/xxx.html` (đúng canonical + sitemap) và `/blog/xxx` (Netlify tự cắt đuôi khi build, ghi đè href trong HTML lúc deploy).
- **Cách sửa:** Netlify Dashboard → chọn site CAMI → Site settings → Build & deploy → Post processing → Asset optimization → tắt **"Pretty URLs"**. Không cần sửa code, tự động khớp lại với canonical/sitemap sau khi tắt.
- Đây là setting duy nhất tôi không thể tự bấm giúp vì cần đăng nhập tài khoản Netlify của bạn.

## Đã tốt — không đổi
- HTTPS, viewport, đúng 1 H1/trang, indexable — PASS tuyệt đối
- Structured data đầy đủ: HairSalon + FAQPage (trang chủ), Article + BreadcrumbList + FAQPage (mọi bài blog)
- Không trùng title/description, canonical đúng, nội dung đủ dày (482–2105 từ/trang)
- Ảnh còn 1 chỗ "thiếu" width/height duy nhất trên toàn site: ảnh lightbox `<img src="">` — không phải lỗi, đây là placeholder rỗng được JS nạp ảnh động khi người dùng click phóng to, không có kích thước cố định để khai báo trước.

## Giới hạn lần audit này
- Không đo Core Web Vitals/PageSpeed thực tế (cần PAGESPEED_API_KEY)
- Không quét broken links hàng loạt (đã phát hiện + sửa 1 ảnh vỡ tình cờ khi rà soát)
- Không có keyword research/rank tracking/backlink analysis
