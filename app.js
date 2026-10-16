const pages = [...document.querySelectorAll('.page')];
const nav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-toggle');

function showPage(id, updateHistory = true) {
  const target = pages.find((page) => page.id === id) || document.querySelector('#home');
  pages.forEach((page) => page.classList.toggle('active', page === target));
  document.querySelectorAll('[data-page]').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === target.id);
  });
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (updateHistory && window.location.hash !== `#${target.id}`) {
    window.history.pushState({ page: target.id }, '', `#${target.id}`);
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const pageId = link.dataset.page || link.getAttribute('href').slice(1);
    if (pages.some((page) => page.id === pageId)) {
      event.preventDefault();
      showPage(pageId);
    }
  });
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

window.addEventListener('popstate', () => showPage(window.location.hash.slice(1) || 'home', false));
showPage(window.location.hash.slice(1) || 'home', false);

const dots = [...document.querySelectorAll('.hero-dot')];
const titles = ['Příběhy ze současnosti', 'Temná Muhehe', 'Blízká budoucnost'];
const heroTitle = document.querySelector('.hero h1');
let currentSlide = 1;
let carouselTimer;
let titleTimer;

function selectSlide(index) {
  currentSlide = index;
  dots.forEach((item, itemIndex) => {
    item.classList.toggle('selected', itemIndex === index);
    item.setAttribute('aria-pressed', String(itemIndex === index));
  });
  heroTitle.classList.add('is-changing');
  window.clearTimeout(titleTimer);
  titleTimer = window.setTimeout(() => {
    heroTitle.innerHTML = `<span class="marker">${titles[index]}</span>`;
    heroTitle.classList.remove('is-changing');
  }, 220);
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => {
    selectSlide((currentSlide + 1) % dots.length);
  }, 3500);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    selectSlide(index);
    restartCarousel();
  });
});

restartCarousel();
