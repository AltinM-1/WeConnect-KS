const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

if (slides.length) {
  function showSlide(index) {
    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  }

  function changeSlide(direction) {
    showSlide(currentSlide + direction);
  }
  window.changeSlide = changeSlide;

  setInterval(() => changeSlide(1), 5000);
}