# Wedding Frontend

Modern wedding website được xây dựng với Vue 3, Vite, Pinia, Tailwind CSS và triển khai với Docker + Nginx.

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Pinia** - Vue store pattern + library
- **Tailwind CSS** - Utility-first CSS framework
- **Docker** - Containerization platform
- **Nginx** - High-performance web server

## 📁 Project Structure

```
wedding-frontend/
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile.dev             # Development container
├── Dockerfile.prod            # Production container
├── nginx/                     # Nginx configurations
│   ├── nginx.conf            # Main nginx config
│   ├── conf.d/
│   │   └── default.conf      # Production server config
│   └── staging.conf          # Staging config
├── src/                       # Vue.js source code
├── public/                    # Static assets
├── package.json              # Node.js dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
└── Makefile                  # Build commands
```

## 🛠️ Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (cho local development)

### Development Environment

```bash
# Clone repository
git clone <repository-url>
cd wedding-frontend

# Start development server với Docker
make dev

# Hoặc với Docker Compose
docker-compose --profile development up --build

# Access tại: http://localhost:5173
```

### Production Environment

```bash
# Start production server
make prod

# Hoặc
docker-compose --profile production up --build -d

# Access tại: http://localhost
```

### Staging Environment

```bash
# Start staging server (để test production build locally)
make staging

# Access tại: http://localhost:8080
```

## 🐳 Docker Profiles

Dự án sử dụng Docker Compose profiles để quản lý các môi trường khác nhau:

- **development**: Vite dev server với hot reload
- **production**: Nginx serving optimized build
- **staging**: Nginx serving build với detailed logging

## 📦 Available Commands

### Docker Commands
```bash
make dev      # Start development environment
make prod     # Start production environment  
make staging  # Start staging environment
make build    # Build all Docker images
make clean    # Clean up containers and images
make logs     # Show container logs
make stop     # Stop all services
```

### Local Development (without Docker)
```bash
make install  # Install dependencies
make local    # Run development server locally
npm run dev   # Alternative local dev command
npm run build # Build for production
```

## 🎨 Wedding Theme

Dự án được thiết kế với wedding theme sử dụng:

- **Colors**: Gold (#D4AF37), Ghost White, Light Pink
- **Fonts**: Playfair Display (serif), Inter (sans), Dancing Script (script)
- **Components**: Tối ưu cho wedding websites

## 🔧 Configuration

### Environment Variables

Tạo file `.env` cho local development:
```bash
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Our Wedding
```

### Nginx Configuration

- Production: `nginx/conf.d/default.conf`
- Staging: `nginx/staging.conf`
- Main config: `nginx/nginx.conf`

## 🚀 Deployment

### Production Deployment
```bash
# Build và start production
make prod

# Hoặc background mode
docker-compose --profile production up --build -d
```

### SSL/HTTPS Setup
1. Đặt SSL certificates vào `ssl/` directory
2. Uncomment HTTPS server block trong `nginx/conf.d/default.conf`
3. Rebuild và restart

## 📱 Features

- ✅ Responsive design
- ✅ SPA routing với Vue Router
- ✅ State management với Pinia
- ✅ Optimized production build
- ✅ Docker multi-stage builds
- ✅ Nginx performance optimizations
- ✅ Health checks
- ✅ Gzip compression
- ✅ Security headers

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Nếu có vấn đề, tạo issue trong repository hoặc liên hệ team development.

---

Made with ❤️ for your special day