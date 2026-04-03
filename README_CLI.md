# basuicn CLI Documentation

Bộ công cụ dòng lệnh mạnh mẽ để quản lý các component UI. Tương thích hoàn toàn với dự án React + Vite + TypeScript + Tailwind CSS.

## 🚀 Cài đặt & Khởi tạo

Để bắt đầu sử dụng `basuicn` trong dự án của bạn, hãy chạy:

```bash
npx basuicn init
```

Lệnh này sẽ chuẩn bị mọi thứ cần thiết: dependencies, path aliases, Tailwind v4 configuration, và `ThemeProvider` để quản lý giao diện sáng/tối.

## 🛠 Lệnh thông dụng

### Thêm Component
```bash
npx basuicn add <component-name>
```
Ví dụ: `npx basuicn add button input`.

### Quản lý phiên bản
-   **So sánh**: `npx basuicn diff <component-name>` để xem các thay đổi bạn đã sửa so với bản gốc.
-   **Cập nhật**: `npx basuicn update <component-name>` để lấy bản mới nhất từ remote registry.

### Kiểm tra lỗi cấu hình
Nếu component không hiển thị đúng style hoặc lỗi import, hãy dùng:
```bash
npx basuicn doctor
```

## ⚙️ Cơ chế hoạt động

CLI hoạt động dựa trên một file `registry.json` phân phối từ GitHub. Khi bạn thêm một component:
1.  CLI tải Metadata của component đó.
2.  Tự động cài đặt các thư viện `npm` tương ứng.
3.  Kiểm tra và tải các component phụ thuộc nội bộ.
4.  Copy source code trực tiếp vào thư mục dự án của bạn.
5.  (Tùy chọn) Thêm code khởi tạo vào `src/main.tsx` nếu component cần (ví dụ: `Toaster`).

## 🛡 Bảo mật & Tin cậy
-   Không phụ thuộc vào runtime sau khi cài đặt.
-   Mã nguồn mở 100%, bạn có thể thoải mái tùy chỉnh sau khi copy vào dự án.
