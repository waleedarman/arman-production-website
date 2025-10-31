
var swiper = new Swiper(".gallerySwiper", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  centeredSlides: false,
  autoplay: { delay: 2500, disableOnInteraction: false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: { 
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1080: { slidesPerView: 3 }
  }
});

const openVimeo = document.getElementById('openVimeo');
const vimeoPopup = document.getElementById('vimeoPopup');
const closeVimeo = document.getElementById('closeVimeo');
const vimeoPlayer = document.getElementById('vimeoPlayer');

openVimeo.addEventListener('click', () => {
  vimeoPopup.classList.add('active');
  vimeoPlayer.src += "&autoplay=1";
});

closeVimeo.addEventListener('click', () => {
  vimeoPopup.classList.remove('active');
  vimeoPlayer.src = vimeoPlayer.src.replace("&autoplay=1", "");
});
