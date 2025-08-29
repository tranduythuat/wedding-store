<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Tạo thiệp cưới
              <span class="highlight">đẹp & độc đáo</span>
              cho ngày trọng đại
            </h1>
            <p class="hero-description">
              Với hàng trăm mẫu thiệp được thiết kế chuyên nghiệp, bạn có thể dễ
              dàng tạo ra những tấm thiệp cưới ấn tượng chỉ trong vài phút.
            </p>
            <div class="hero-actions">
              <router-link to="/auth/register" class="btn btn-primary btn-lg">
                Bắt đầu miễn phí
              </router-link>
              <router-link to="/templates" class="btn btn-outline btn-lg">
                Xem mẫu thiệp
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <div class="floating-card card-1">
              <div class="card-preview">
                <div class="card-header"></div>
                <div class="card-content">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
              </div>
            </div>
            <div class="floating-card card-2">
              <div class="card-preview">
                <div class="card-header"></div>
                <div class="card-content">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
              </div>
            </div>
            <div class="floating-card card-3">
              <div class="card-preview">
                <div class="card-header"></div>
                <div class="card-content">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>Tại sao chọn chúng tôi?</h2>
          <p>Những tính năng nổi bật giúp bạn tạo thiệp cưới hoàn hảo</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Thiết kế đa dạng</h3>
            <p>
              Hàng trăm mẫu thiệp từ cổ điển đến hiện đại, phù hợp mọi phong
              cách đám cưới
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Tạo nhanh chóng</h3>
            <p>
              Chỉ cần vài phút để tùy chỉnh thông tin và có ngay thiệp cưới đẹp
              mắt
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Tương thích mọi thiết bị</h3>
            <p>
              Thiệp của bạn hiển thị hoàn hảo trên máy tính, tablet và điện
              thoại
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Miễn phí sử dụng</h3>
            <p>
              Tạo và chia sẻ thiệp cưới hoàn toàn miễn phí, không giới hạn số
              lượng
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Tùy chỉnh linh hoạt</h3>
            <p>Thay đổi màu sắc, font chữ, hình ảnh theo ý muốn của bạn</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📤</div>
            <h3>Chia sẻ dễ dàng</h3>
            <p>
              Gửi thiệp qua email, mạng xã hội hoặc in ra giấy chất lượng cao
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2>Cách thức hoạt động</h2>
          <p>3 bước đơn giản để có thiệp cưới hoàn hảo</p>
        </div>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Chọn mẫu thiệp</h3>
              <p>
                Duyệt qua bộ sưu tập mẫu thiệp đa dạng và chọn mẫu yêu thích
              </p>
            </div>
            <div class="step-image">
              <div class="mock-gallery">
                <div class="gallery-item"></div>
                <div class="gallery-item"></div>
                <div class="gallery-item active"></div>
                <div class="gallery-item"></div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Tùy chỉnh thông tin</h3>
              <p>
                Thêm tên cô dâu chú rể, thời gian, địa điểm và những thông tin
                cá nhân
              </p>
            </div>
            <div class="step-image">
              <div class="mock-form">
                <div class="form-field"></div>
                <div class="form-field"></div>
                <div class="form-field long"></div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Chia sẻ thiệp cưới</h3>
              <p>Gửi thiệp đến bạn bè, người thân qua nhiều kênh khác nhau</p>
            </div>
            <div class="step-image">
              <div class="mock-share">
                <div class="share-icon">📧</div>
                <div class="share-icon">📱</div>
                <div class="share-icon">🖨️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Sẵn sàng tạo thiệp cưới của bạn?</h2>
          <p>
            Tham gia cùng hàng ngàn cặp đôi đã tin tưởng sử dụng dịch vụ của
            chúng tôi
          </p>
          <div class="cta-actions">
            <router-link to="/auth/register" class="btn btn-primary btn-lg">
              Đăng ký ngay
            </router-link>
            <router-link to="/auth/login" class="btn btn-ghost btn-lg">
              Đã có tài khoản? Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  // No specific logic needed for home page
</script>

<style lang="scss" scoped>
  .home {
    overflow-x: hidden;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, $wedding-blush, $wedding-ivory);

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;

      .hero-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
          circle at 2px 2px,
          rgba(255, 255, 255, 0.3) 1px,
          transparent 0
        );
        background-size: 50px 50px;
      }
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;

      .hero-text {
        .hero-title {
          font-size: 3.5rem;
          font-weight: $font-weight-bold;
          color: $text-primary;
          margin-bottom: 1.5rem;
          line-height: 1.2;

          .highlight {
            background: linear-gradient(135deg, $wedding-rose, $wedding-gold);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }

        .hero-description {
          font-size: 1.2rem;
          color: $text-secondary;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
      }

      .hero-image {
        position: relative;
        height: 400px;

        .floating-card {
          position: absolute;
          width: 120px;
          height: 160px;
          background: white;
          border-radius: $radius-lg;
          box-shadow: $shadow-xl;
          animation: float 6s ease-in-out infinite;

          &.card-1 {
            top: 10%;
            left: 20%;
            animation-delay: 0s;
          }

          &.card-2 {
            top: 40%;
            right: 10%;
            animation-delay: 2s;
          }

          &.card-3 {
            bottom: 20%;
            left: 40%;
            animation-delay: 4s;
          }

          .card-preview {
            padding: 1rem;
            height: 100%;
            display: flex;
            flex-direction: column;

            .card-header {
              width: 100%;
              height: 20px;
              background: linear-gradient(45deg, $wedding-rose, $wedding-gold);
              border-radius: 4px;
              margin-bottom: 1rem;
            }

            .card-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;

              .card-line {
                height: 8px;
                background: $border-color;
                border-radius: 4px;

                &.short {
                  width: 60%;
                }
              }
            }
          }
        }
      }
    }

    @media (max-width: $breakpoint-lg) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;

        .hero-image {
          order: -1;
          height: 300px;
        }
      }
    }

    @media (max-width: $breakpoint-md) {
      .hero-text {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-description {
          font-size: 1.1rem;
        }

        .hero-actions {
          justify-content: center;
        }
      }
    }
  }

  .features {
    padding: 6rem 0;
    background: white;

    .section-header {
      text-align: center;
      margin-bottom: 4rem;

      h2 {
        font-size: 2.5rem;
        color: $text-primary;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        color: $text-secondary;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .feature-card {
        text-align: center;
        padding: 2rem;
        border-radius: $radius-lg;
        background: white;
        box-shadow: $shadow;
        transition:
          transform $transition-base,
          box-shadow $transition-base;

        &:hover {
          transform: translateY(-5px);
          box-shadow: $shadow-xl;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        h3 {
          color: $text-primary;
          margin-bottom: 1rem;
        }

        p {
          color: $text-secondary;
          line-height: 1.6;
        }
      }
    }
  }

  .how-it-works {
    padding: 6rem 0;
    background: $bg-secondary;

    .section-header {
      text-align: center;
      margin-bottom: 4rem;

      h2 {
        font-size: 2.5rem;
        color: $text-primary;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        color: $text-secondary;
      }
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 4rem;

      .step {
        display: grid;
        grid-template-columns: 80px 1fr 300px;
        gap: 2rem;
        align-items: center;

        &:nth-child(even) {
          .step-image {
            order: -1;
          }
        }

        .step-number {
          width: 80px;
          height: 80px;
          border-radius: $radius-full;
          background: linear-gradient(135deg, $primary, $primary-light);
          color: white;
          font-size: 2rem;
          font-weight: $font-weight-bold;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: $shadow-lg;
        }

        .step-content {
          h3 {
            color: $text-primary;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          }

          p {
            color: $text-secondary;
            line-height: 1.6;
            font-size: 1.1rem;
          }
        }

        .step-image {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          background: white;
          border-radius: $radius-lg;
          box-shadow: $shadow;

          .mock-gallery {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;

            .gallery-item {
              width: 60px;
              height: 80px;
              background: $border-color;
              border-radius: 6px;

              &.active {
                background: linear-gradient(135deg, $primary, $primary-light);
              }
            }
          }

          .mock-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 200px;

            .form-field {
              height: 20px;
              background: $border-color;
              border-radius: 4px;

              &.long {
                height: 40px;
              }
            }
          }

          .mock-share {
            display: flex;
            gap: 1rem;

            .share-icon {
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, $secondary, $secondary-light);
              border-radius: $radius-full;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
            }
          }
        }
      }

      @media (max-width: $breakpoint-lg) {
        .step {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 1rem;

          &:nth-child(even) {
            .step-image {
              order: 0;
            }
          }

          .step-image {
            height: 150px;
          }
        }
      }
    }
  }

  .cta {
    padding: 6rem 0;
    background: linear-gradient(
      135deg,
      $text-primary,
      lighten($text-primary, 10%)
    );

    .cta-content {
      text-align: center;
      color: white;

      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .cta-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(2deg);
    }
  }

  @media (max-width: $breakpoint-md) {
    .features-grid {
      grid-template-columns: 1fr;
    }

    .cta {
      .cta-content {
        h2 {
          font-size: 2rem;
        }

        .cta-actions {
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
</style>
