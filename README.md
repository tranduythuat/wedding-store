# Wedding Frontend

Ứng dụng web tạo thiệp cưới trực tuyến với Vue 3, Vite, Pinia và SCSS.

## ✨ Tính năng chính

### 🔐 Authentication
- Đăng ký và đăng nhập người dùng
- Xác thực JWT token
- Bảo vệ route với route guards

### 🎨 Template Management  
- Duyệt bộ sưu tập mẫu thiệp đa dạng
- Xem trước template trước khi chọn
- Phân loại theo danh mục (cổ điển, hiện đại, lãng mạn, tối giản, sang trọng)

### ✏️ Template Editor
- Chỉnh sửa thông tin cơ bản:
  - Tên cô dâu, chú rể
  - Ngày giờ cưới  
  - Địa điểm và địa chỉ
  - Số điện thoại liên hệ
  - Lời cảm ơn cá nhân
- Upload và quản lý album ảnh
- Xem trước real-time trên desktop và mobile
- Tự động lưu thay đổi

### 📱 Responsive Design
- Tương thích mọi thiết bị
- Giao diện thân thiện người dùng
- Hiệu ứng animate mượt mà

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: SCSS với system design variables
- **Router**: Vue Router 4
- **HTTP Client**: Axios
- **Icons**: Unicode Emoji (có thể thay thế bằng icon library)

## 📁 Cấu trúc dự án

```
src/
├── components/           # Reusable components
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── WeddingTemplatePreview.vue
├── layouts/             # Page layouts
│   ├── AuthLayout.vue
│   └── MainLayout.vue  
├── views/               # Page components
│   ├── auth/           # Authentication pages
│   ├── templates/      # Template related pages
│   ├── Dashboard.vue
│   └── Home.vue
├── stores/             # Pinia stores
│   ├── auth.js
│   └── template.js
├── services/           # API services
│   └── api.js
├── router/             # Route configuration
│   └── index.js
├── styles/             # Global styles
│   ├── variables.scss
│   └── main.scss
├── App.vue
└── main.js
```

## 🚀 Cài đặt và chạy

### Prerequisites
- Node.js >= 16
- npm hoặc yarn

### Installation

1. Clone repository:
```bash
git clone <repo-url>
cd wedding-frontend
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo file environment:
```bash
cp .env.example .env
```

4. Cấu hình environment variables trong `.env`

5. Chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```

6. Mở trình duyệt tại `http://localhost:3000`

### Build for production

```bash
npm run build
# hoặc
yarn build
```

##