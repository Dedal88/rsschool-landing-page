const slides = [
  {
    image: './src/img/slider/coffee-slider-1.webp',
    alt: "S'mores Frappuccino",
    title: "S'mores Frappuccino",
    description:
      'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
    price: '$5.50',
  },
  {
    image: './src/img/slider/coffee-slider-2.webp',
    alt: 'Caramel Macchiato',
    title: 'Caramel Macchiato',
    description:
      'Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.',
    price: '$5.00',
  },
  {
    image: './src/img/slider/coffee-slider-3.webp',
    alt: 'Ice coffee',
    title: 'Ice coffee',
    description:
      'A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.',
    price: '$4.50',
  },
];

const sliderFrame = document.querySelector('.slider__frame');
const sliderImage = document.querySelector('.slider__image');
const sliderTitle = document.querySelector('.slider__coffee-title');
const sliderDescription = document.querySelector('.slider__coffee-description');
const sliderPrice = document.querySelector('.slider__coffee-price');
const prevButton = document.querySelector('.slider__button_prev');
const nextButton = document.querySelector('.slider__button_next');
const indicators = document.querySelectorAll('.frame-indication__element');

let currentSlideIndex = 0;
let isTransitioning = false;

function initSlider() {
  if (!sliderFrame || indicators.length !== slides.length) {
    return;
  }

  prevButton?.addEventListener('click', () => {
    goToSlide(currentSlideIndex - 1, 'prev');
  });

  nextButton?.addEventListener('click', () => {
    goToSlide(currentSlideIndex + 1, 'next');
  });

  renderSlideContent(currentSlideIndex);
  updateIndicators(currentSlideIndex);
}

function goToSlide(index, direction) {
  if (isTransitioning) {
    return;
  }

  const normalizedIndex =
    ((index % slides.length) + slides.length) % slides.length;

  if (normalizedIndex === currentSlideIndex) {
    return;
  }

  isTransitioning = true;
  resetAllProgressBars();

  sliderFrame.classList.add(
    direction === 'next' ? 'slider__frame_out-left' : 'slider__frame_out-right',
  );

  window.setTimeout(() => {
    currentSlideIndex = normalizedIndex;
    renderSlideContent(currentSlideIndex);
    updateIndicators(currentSlideIndex);

    const enterClass =
      direction === 'next' ? 'slider__frame_in-right' : 'slider__frame_in-left';

    sliderFrame.classList.remove(
      'slider__frame_out-left',
      'slider__frame_out-right',
    );
    sliderFrame.classList.add('slider__frame_no-transition', enterClass);
    sliderFrame.offsetHeight;
    sliderFrame.classList.remove('slider__frame_no-transition');

    requestAnimationFrame(() => {
      sliderFrame.classList.remove(enterClass);
      isTransitioning = false;
    });
  }, 400);
}

function renderSlideContent(index) {
  const slide = slides[index];

  sliderImage.src = slide.image;
  sliderImage.alt = slide.alt;
  sliderTitle.textContent = slide.title;
  sliderDescription.textContent = slide.description;
  sliderPrice.textContent = slide.price;
}

function updateIndicators(activeIndex) {
  indicators.forEach((indicator, index) => {
    const isActive = index === activeIndex;
    indicator.classList.toggle('frame-indication__element_active', isActive);

    const progress = indicator.querySelector('.frame-indication__progress');
    if (progress) {
      progress.style.width = isActive ? '100%' : '0%';
    }
  });
}

function resetAllProgressBars() {
  indicators.forEach((indicator) => {
    const progress = indicator.querySelector('.frame-indication__progress');
    if (progress) {
      progress.style.width = '0%';
    }
  });
}

document.addEventListener('DOMContentLoaded', initSlider);
