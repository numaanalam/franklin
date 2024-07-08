import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';

export default function decorate(block) {
  function resetFocus(cards) {
    cards.forEach((card) => {
      card.classList.remove('teaser__card--focused');
      card.classList.add('teaser__card--unfocused');
    });
  }

  function resetAnimation(cards) {
    cards.forEach((card) => {
      card.classList.remove('fadeIn');
    });
  }
  function toggleFocusedClass() {
    const isMobile = !window.matchMedia('(min-width: 999px)').matches;
    const cardsContainer = block.querySelector('.teaser__cards');
    const cards = block.querySelectorAll('.teaser__cards .teaser__card');

    // left card will be focused initially
    cards[0].classList.add('teaser__card--focused', 'teaser__left');
    cards[1].classList.add('teaser__card--unfocused', 'teaser__right');

    cardsContainer.style.paddingLeft = isMobile ? '24px' : '64px';

    if (isMobile) {
      cardsContainer.style.left = '0';
    } else {
      cardsContainer.style.paddingLeft = '64px';
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        resetFocus(cards);
        resetAnimation(cards);
        card.classList.add('teaser__card--focused');
        card.classList.add('fadeIn');
        card.classList.remove('teaser__card--unfocused');

        if (card.classList.contains('teaser__left')) {
          cardsContainer.style.paddingLeft = isMobile ? '24px' : '64px';
          cardsContainer.style.paddingRight = '0';

          if (isMobile) {
            cardsContainer.style.left = '0';
            cardsContainer.style.right = 'initial';
            cardsContainer.style.gridTemplateColumns = '1fr 1fr';
          } else {
            cardsContainer.style.gridTemplateColumns = '3fr 1fr';
          }
        }

        if (card.classList.contains('teaser__right')) {
          cardsContainer.style.paddingLeft = '0';
          cardsContainer.style.paddingRight = isMobile ? '24px' : '64px';

          if (isMobile) {
            cardsContainer.style.right = '0';
            cardsContainer.style.left = 'initial';
            cardsContainer.style.gridTemplateColumns = '1fr 1fr';
          } else {
            cardsContainer.style.gridTemplateColumns = '1fr 3fr';
          }
        }

        const focusedTeaserCard = block.querySelector('.teaser__card--focused');
        if (focusedTeaserCard) {
          const container = focusedTeaserCard.closest('.teaser__cards');
          const cardOffsetLeft = focusedTeaserCard.offsetLeft;
          const containerOffsetLeft = container.offsetLeft;
          const scrollLeft = cardOffsetLeft - containerOffsetLeft;
          const containerWidth = container.clientWidth;
          const maxScrollLeft = Math.min(
            scrollLeft,
            container.scrollWidth - containerWidth,
          );
          container.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  const [titleEl, themeEl, themeTypeEl, ...teaserListEl] = block.children;
  const theme = themeEl?.textContent?.trim();
  const themeType = themeTypeEl?.textContent?.trim();
  if (theme) {
    block.classList.add(theme);
  }
  if (themeType) {
    block.classList.add(themeType);
  }
  const commonTitle = titleEl?.querySelector(":is(h1,h2,h3,h4,h5,h6)");
  commonTitle?.classList?.add("text-color");
  const teasers = teaserListEl.map((card) => {
    const teaserObj = teaser.getTeaser(card);
    utility.mobileLazyLoading(teaserObj, '.teaser__image img');
    return teaserObj.outerHTML;
  });

  const newHtml = `
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-sm-8 col-sm-10">
                ${commonTitle ? commonTitle.outerHTML : ''}
            </div>
        </div>
        <div class="row">
            <div class="teaser__cards-container col-lg-12">
                <div class="teaser__cards">
                     ${teasers.join('')}
                </div>
            </div>
        </div>
    </div>
    `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));
  toggleFocusedClass();
}
