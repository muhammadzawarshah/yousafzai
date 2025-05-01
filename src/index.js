// Import Swiper JS
import Swiper from 'swiper';

// Import Swiper styles
import 'swiper/css';

// Import additional modules (if needed)
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Swiper
const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
