<template>
  <div
    class="wedding-template"
    :class="`template-${template?.style || 'classic'}`"
  >
    <!-- Header Section -->
    <div class="template-section header-section">
      <div class="decorative-element top"></div>
      <h1 class="couple-names">
        <span class="bride-name">{{
          templateData.bride_name || "Tên Cô Dâu"
        }}</span>
        <span class="heart-symbol">♥</span>
        <span class="groom-name">{{
          templateData.groom_name || "Tên Chú Rể"
        }}</span>
      </h1>
      <p class="wedding-title">Trân trọng kính mời</p>
      <div class="decorative-element bottom"></div>
    </div>

    <!-- Date & Time Section -->
    <div class="template-section datetime-section">
      <div class="datetime-card">
        <div class="date-info">
          <h3>Ngày cưới</h3>
          <div class="date-display">
            {{ formatDate(templateData.wedding_date) || "Chọn ngày cưới" }}
          </div>
        </div>
        <div class="time-info">
          <h3>Thời gian</h3>
          <div class="time-display">
            {{ formatTime(templateData.wedding_time) || "Chọn giờ cưới" }}
          </div>
        </div>
      </div>
    </div>

    <!-- Venue Section -->
    <div class="template-section venue-section">
      <h3>Địa điểm tổ chức</h3>
      <div class="venue-card">
        <h4>{{ templateData.venue_name || "Tên địa điểm" }}</h4>
        <p class="venue-address">
          {{
            templateData.venue_address || "Địa chỉ chi tiết sẽ hiển thị ở đây"
          }}
        </p>
        <div class="venue-icon">📍</div>
      </div>
    </div>

    <!-- Photo Gallery Section -->
    <div
      v-if="templateData.photos && templateData.photos.length > 0"
      class="template-section gallery-section"
    >
      <h3>Album ảnh</h3>
      <div class="photo-gallery">
        <div
          v-for="(photo, index) in templateData.photos"
          :key="index"
          class="photo-item"
          :class="`photo-${(index % 4) + 1}`"
        >
          <img :src="photo.url" :alt="`Wedding photo ${index + 1}`" />
        </div>
      </div>
    </div>

    <!-- Message Section -->
    <div v-if="templateData.message" class="template-section message-section">
      <h3>Lời cảm ơn</h3>
      <div class="message-card">
        <p>{{ templateData.message }}</p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="template-section contact-section">
      <h3>Thông tin liên hệ</h3>
      <div class="contact-grid">
        <div class="contact-card">
          <h4>Cô dâu</h4>
          <p class="contact-name">
            {{ templateData.bride_name || "Tên cô dâu" }}
          </p>
          <p class="contact-phone">
            {{ templateData.bride_phone || "Số điện thoại" }}
          </p>
        </div>
        <div class="contact-card">
          <h4>Chú rể</h4>
          <p class="contact-name">
            {{ templateData.groom_name || "Tên chú rể" }}
          </p>
          <p class="contact-phone">
            {{ templateData.groom_phone || "Số điện thoại" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="template-section footer-section">
      <div class="decorative-element top"></div>
      <p class="footer-text">
        Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
      </p>
      <div class="decorative-element bottom"></div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    templateData: {
      type: Object,
      default: () => ({}),
    },
    template: {
      type: Object,
      default: () => ({}),
    },
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("vi-VN", options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
</script>

<style lang="scss" scoped>
  .wedding-template {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    color: #333;
    font-family: "Georgia", serif;
    line-height: 1.6;

    .template-section {
      padding: 2rem;
      text-align: center;
      position: relative;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        position: relative;

        &::after {
          content: "";
          display: block;
          width: 60px;
          height: 2px;
          background: linear-gradient(45deg, #e74c3c, #f39c12);
          margin: 0.5rem auto;
        }
      }
    }

    .decorative-element {
      height: 1px;
      background: linear-gradient(90deg, transparent, #ddd, transparent);
      margin: 1rem auto;
      max-width: 300px;

      &.top::before,
      &.bottom::after {
        content: "❦";
        display: block;
        text-align: center;
        color: #e74c3c;
        font-size: 1.2rem;
        margin: -0.6rem 0;
      }
    }
  }

  .header-section {
    background: linear-gradient(135deg, #ffeaa7, #fab1a0);
    color: #2d3436;

    .couple-names {
      font-size: 3rem;
      margin: 1rem 0;
      font-weight: 300;

      .heart-symbol {
        color: #e84393;
        margin: 0 1rem;
      }

      .bride-name,
      .groom-name {
        display: inline-block;
      }
    }

    .wedding-title {
      font-size: 1.3rem;
      font-style: italic;
      margin: 1rem 0;
    }
  }

  .datetime-section {
    background: #f8f9fa;

    .datetime-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .date-info,
      .time-info {
        h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #6c757d;

          &::after {
            display: none;
          }
        }

        .date-display,
        .time-display {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
      }
    }
  }

  .venue-section {
    .venue-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
      position: relative;

      h4 {
        font-size: 1.5rem;
        color: #2c3e50;
        margin-bottom: 1rem;
      }

      .venue-address {
        color: #6c757d;
        font-size: 1.1rem;
        line-height: 1.6;
      }

      .venue-icon {
        position: absolute;
        top: -15px;
        right: 2rem;
        background: #e74c3c;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }
    }
  }

  .gallery-section {
    background: #f8f9fa;

    .photo-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 2rem;

      .photo-item {
        aspect-ratio: 1;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &.photo-1 {
          transform: rotate(-2deg);
        }

        &.photo-2 {
          transform: rotate(1deg);
        }

        &.photo-3 {
          transform: rotate(-1deg);
        }

        &.photo-4 {
          transform: rotate(2deg);
        }
      }
    }
  }

  .message-section {
    .message-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.8;
      color: #2c3e50;
      position: relative;

      &::before {
        content: '"';
        font-size: 4rem;
        color: #e74c3c;
        position: absolute;
        top: -10px;
        left: 20px;
        opacity: 0.3;
      }
    }
  }

  .contact-section {
    background: #f8f9fa;

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;

      .contact-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

        h4 {
          color: #e74c3c;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .contact-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .contact-phone {
          color: #6c757d;
          font-size: 1.1rem;
        }
      }
    }
  }

  .footer-section {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;

    .footer-text {
      font-size: 1.1rem;
      font-style: italic;
      margin: 1rem 0;
    }
  }

  // Template Styles
  .template-classic {
    .header-section {
      background: linear-gradient(135deg, #ffeaa7, #fab1a0);
    }
    .footer-section {
      background: linear-gradient(135deg, #74b9ff, #0984e3);
    }
  }

  .template-modern {
    font-family: "Arial", sans-serif;

    .header-section {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }
    .footer-section {
      background: linear-gradient(135deg, #f093fb, #f5576c);
    }
  }

  .template-romantic {
    .header-section {
      background: linear-gradient(135deg, #ff9a9e, #fecfef);
    }
    .footer-section {
      background: linear-gradient(135deg, #a8edea, #fed6e3);
    }
  }

  .template-minimal {
    font-family: "Arial", sans-serif;

    .header-section {
      background: linear-gradient(135deg, #f7f7f7, #e8e8e8);
      color: #333;
    }
    .footer-section {
      background: linear-gradient(135deg, #434343, #000000);
      color: white;
    }
  }

  .template-luxury {
    .header-section {
      background: linear-gradient(135deg, #d4af37, #ffd700);
      color: #1a1a1a;
    }
    .footer-section {
      background: linear-gradient(135deg, #1a1a1a, #333333);
      color: #d4af37;
    }
  }

  @media (max-width: 768px) {
    .wedding-template {
      .couple-names {
        font-size: 2rem;

        .bride-name,
        .groom-name {
          display: block;
        }

        .heart-symbol {
          display: block;
          margin: 0.5rem 0;
        }
      }

      .datetime-card {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
