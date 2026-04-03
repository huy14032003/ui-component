# basuicn — UI Component CLI

Bộ sưu tập component React hiện đại, được phân phối trực tiếp vào dự án của bạn thông qua CLI. Không cần cài đặt dependencies cồng kềnh, bạn hoàn toàn kiểm soát mã nguồn của mình (tương tự shadcn/ui).

---

## 🚀 Yêu cầu hệ thống

- **Node.js**: Phiên bản 18 trở lên.
- **Framework**: React + Vite + TypeScript.
- **Styling**: Tailwind CSS v4 (hoặc v3).

---

## 📦 Bắt đầu nhanh

### 1. Khởi tạo dự án

Di chuyển đến thư mục gốc của dự án React và chạy lệnh:

```bash
npx basuicn init
```

Lệnh này sẽ thực hiện một chuỗi các thao tác tự động:
- **Cài đặt thư viện**: `@base-ui/react`, `tailwind-variants`, `clsx`, `tailwind-merge`, `lucide-react`, ...
- **Cấu hình Vite**: Tự động thêm alias `@/`, `@components/`, `@lib/`, ... vào `vite.config.ts`.
- **Cấu hình TypeScript**: Thêm `paths` tương ứng vào `tsconfig.json`.
- **Core Components**: Copy các file tiện ích như `cn.ts`, `ThemeProvider.tsx`, `themes.ts` và biến CSS theme vào dự án.
- **Patching Entry**: Tự động bọc ứng dụng của bạn trong `<ThemeProvider>` tại file `src/main.tsx`.

---

### 2. Thêm Component

Sử dụng lệnh `add` để tải component bạn cần:

```bash
npx basuicn add button
npx basuicn add button input switch  # Thêm nhiều component cùng lúc
npx basuicn add toast                # Tự động thêm <Toaster /> vào main.tsx
```

> **Lưu ý**: CLI sẽ tự động nhận diện và tải về các component phụ thuộc (ví dụ `add select` sẽ tự tải thêm `popover`).

---

### 3. Cập nhật & So sánh (Update & Diff)

Nếu có phiên bản mới của component từ thư viện gốc, bạn có thể kiểm tra và cập nhật:

```bash
npx basuicn diff button    # Xem sự khác biệt giữa code local và bản gốc trên registry
npx basuicn update button  # Ghi đè phiên bản cục bộ bằng bản mới nhất
```

---

### 4. Kiểm tra sức khỏe dự án (Doctor)

Nếu bạn gặp lỗi về import hoặc cấu hình, hãy chạy lệnh sau để CLI kiểm tra và gợi ý cách sửa lỗi:

```bash\nnpx basuicn doctor
```

---

## 🛠 Danh sách các lệnh (Commands)

| Lệnh | Mô tả |
|------|-------|
| `init` | Thiết lập môi trường dự án ban đầu. |
| `add <name>` | Thêm component vào thư mục `src/components/ui/`. |
| `update <name>` | Cập nhật component lên phiên bản mới nhất. |
| `diff <name>` | So sánh code hiện tại với bản gốc. |
| `remove <name>` | Xóa component khỏi dự án. |
| `list` | Xem danh sách tất cả các component có sẵn. |
| `doctor` | Kiểm tra cấu hình và các file core của dự án. |

---

## 📂 Tùy chọn (Options)

- `--force`: Ghi đè các file đã tồn tại nếu có xung đột khi `add` hoặc `init`.
- `--local`: Chỉ dành cho phát triển — Đọc `registry.json` từ thư mục cục bộ thay vì từ GitHub.

---

## 👨‍💻 Dành cho Maintainers

Nếu bạn muốn đóng góp hoặc tự xây dựng registry riêng:

1.  **Biên dịch CLI**: `npm run build:cli`
2.  **Đồng bộ Theme**: `npm run theme:sync` (Tạo file CSS theme từ `themes.ts`).
3.  **Xây dựng Registry**: `npm run registry:build` (Gom toàn bộ code component vào `registry.json`).
4.  **Publish**: `npm publish`
