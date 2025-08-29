<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <span class="brand-icon">💍</span>
            <span class="brand-text">Wedding Cards</span>
          </div>
          <p class="footer-description">
            Tạo những tấm thiệp cưới đẹp và độc đáo cho ngày trọng đại của bạn
          </p>
        </div>

        <div class="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul class="footer-links">
            <li><router-link to="/templates">Mẫu thiệp</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/about">Giới thiệu</router-link></li>
            <li><router-link to="/contact">Liên hệ</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Hỗ trợ</h4>
          <ul class="footer-links">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#help">Hướng dẫn</a></li>
            <li><a href="#support">Hỗ trợ</a></li>
            <li><a href="#terms">Điều khoản</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <div class="social-links">
            <a href="#" class="social-link">📘 Facebook</a>
            <a href="#" class="social-link">📷 Instagram</a>
            <a href="#" class="social-link">🐦 Twitter</a>
            <a href="#" class="social-link">📌 Pinterest</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 Wedding Cards. Tất cả quyền được bảo lưu.</p>
        <div class="footer-bottom-links">
          <a href="#privacy">Chính sách bảo mật</a>
          <a href="#terms">Điều khoản sử dụng</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    padding: 3rem 0 1rem;
    margin-top: auto;

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      .footer-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: $font-weight-bold;
        margin-bottom: 1rem;

        .brand-icon {
          font-size: 2rem;
        }

        .brand-text {
          background: linear-gradient(135deg, $wedding-rose, $wedding-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .footer-description {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      h4 {
        margin-bottom: 1rem;
        color: $wedding-gold;
        font-size: 1.2rem;
      }

      .footer-links {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: color $transition-base;

            &:hover {
              color: $wedding-gold;
            }
          }
        }
      }

      .social-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .social-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color $transition-base;

          &:hover {
            color: $wedding-gold;
          }
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;

      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.6);
      }

      .footer-bottom-links {
        display: flex;
        gap: 1rem;

        a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color $transition-base;

          &:hover {
            color: $wedding-gold;
          }
        }
      }
    }

    @media (max-width: $breakpoint-md) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .social-links {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      }

      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  }
</style>
