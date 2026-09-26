const themeStorageKey = 'coffee-house-theme';
const savedTheme = window.localStorage.getItem(themeStorageKey);

if (savedTheme === 'dark') {
  document.body.classList.add('theme-dark');
}

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

const catalogProducts = {
  coffee: [
    [
      'Espresso',
      'Rich and concentrated coffee with a smooth crema.',
      '$4.50',
      'Espresso.webp',
    ],
    [
      'Latte',
      'Espresso with steamed milk and a light layer of foam.',
      '$5.50',
      'Latte.webp',
    ],
    [
      'Ice cappuccino',
      'A refreshing blend of espresso, milk and ice.',
      '$5.00',
      'Ice-cappuccino.webp',
    ],
    [
      'Kahlua coffee',
      'Espresso with Kahlua liqueur and a creamy finish.',
      '$7.00',
      'Kahlua-coffee.webp',
    ],
    [
      'Irish coffee',
      'Coffee with Irish whiskey, sugar and whipped cream.',
      '$7.00',
      'Irish-coffee.webp',
    ],
    [
      'Latte macchiato',
      'Steamed milk marked with espresso and foam.',
      '$5.50',
      'Latte-macchiato.webp',
    ],
    [
      'Coffee with cognac',
      'A warming coffee finished with cognac and cream.',
      '$6.50',
      'Coffee-with-cognac.webp',
    ],
    [
      'Honey raf',
      'Espresso blended with cream, vanilla and honey.',
      '$5.50',
      'Honey-raf.webp',
    ],
  ],
  tea: [
    [
      'Moroccan',
      'Green tea with mint and a bright, refreshing aroma.',
      '$4.00',
      'Moroccan.webp',
    ],
    [
      'Ginger',
      'A warming tea with ginger and a gentle citrus note.',
      '$4.50',
      'Ginger.webp',
    ],
    [
      'Cranberry',
      'Fragrant black tea with cranberry and a soft sweetness.',
      '$4.00',
      'Cranberry.webp',
    ],
    [
      'Sea buckthorn',
      'A vivid berry tea with a pleasantly tart finish.',
      '$4.50',
      'Sea-buckthorn.webp',
    ],
  ],
  dessert: [
    [
      'Black forest',
      'Chocolate sponge, cherry filling and soft cream.',
      '$4.50',
      'Black-forest.webp',
    ],
    [
      'Cheesecakes',
      'Tender baked cheesecake with a creamy texture.',
      '$4.50',
      'Cheesecakes.webp',
    ],
    [
      'Honey cake',
      'Delicate honey layers with a rich cream filling.',
      '$4.50',
      'Honey-cake.webp',
    ],
    [
      'Creme brulee',
      'Silky vanilla custard beneath a crisp caramel crust.',
      '$4.00',
      'Creme-brulee.webp',
    ],
    [
      'Chocolate cake',
      'Moist chocolate cake with a deep cocoa flavor.',
      '$4.50',
      'Chocolate-cake.webp',
    ],
    [
      'Marble cheesecake',
      'Classic cheesecake with a chocolate marble swirl.',
      '$3.50',
      'Marble-cheesecake.webp',
    ],
    [
      'Pancakes',
      'Fluffy pancakes served with a sweet topping.',
      '$4.50',
      'Pancakes.webp',
    ],
    [
      'Red velvet',
      'Velvety red sponge with a smooth cream topping.',
      '$4.00',
      'Red-velvet.webp',
    ],
  ],
};

const catalogGrid = document.querySelector('.catalog__grid');
const catalogTabs = document.querySelectorAll('.catalog__tab');
const catalogLoadMore = document.querySelector('.catalog__load-more');
let activeCatalogCategory = 'coffee';

function renderCatalog(category) {
  if (!catalogGrid) {
    return;
  }

  catalogGrid.innerHTML = catalogProducts[category]
    .map(
      ([title, description, price, image]) => `
      <article class="catalog__card">
        <img class="catalog__card-image" src="./src/img/catalog/${category}/${image}" alt="${title}" />
        <div class="catalog__card-content">
          <h2 class="catalog__card-title">${title}</h2>
          <p class="catalog__card-description">${description}</p>
          <p class="catalog__card-price">${price}</p>
        </div>
      </article>
    `,
    )
    .join('');
}

function initCatalog() {
  if (!catalogGrid) {
    return;
  }

  renderCatalog(activeCatalogCategory);

  catalogTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCatalogCategory = tab.dataset.category;
      catalogTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('catalog__tab_active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
      renderCatalog(activeCatalogCategory);
    });
  });

  catalogLoadMore?.addEventListener('click', () => {
    catalogGrid.classList.toggle('catalog__grid_expanded');
    catalogGrid
      .querySelectorAll('.catalog__card:nth-child(n + 5)')
      .forEach((card) => {
        card.style.display = catalogGrid.classList.contains(
          'catalog__grid_expanded',
        )
          ? 'flex'
          : '';
      });
    catalogLoadMore.setAttribute(
      'aria-label',
      catalogGrid.classList.contains('catalog__grid_expanded')
        ? 'Show fewer products'
        : 'Load more products',
    );
  });
}

document.addEventListener('DOMContentLoaded', initCatalog);

const themeSwitch = document.querySelector('.theme-switch');
const themeOptions = document.querySelectorAll('.theme-switch__icon-wrapper');

function updateTheme(isDark) {
  document.body.classList.toggle('theme-dark', isDark);
  window.localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');

  themeOptions.forEach((option, index) => {
    const isSelected = isDark ? index === 1 : index === 0;
    option.classList.toggle('theme-switch__icon-wrapper_selected', isSelected);
    option.classList.toggle(
      'theme-switch__icon-wrapper_not-selected',
      !isSelected,
    );
    option.setAttribute('aria-pressed', String(isSelected));
  });
}

function initThemeSwitch() {
  if (!themeSwitch) {
    return;
  }

  const isDark = document.body.classList.contains('theme-dark');
  updateTheme(isDark);

  themeOptions.forEach((option, index) => {
    const selectTheme = () => updateTheme(index === 1);

    option.addEventListener('click', selectTheme);
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectTheme();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initThemeSwitch);
