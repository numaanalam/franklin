import ctaUtils from '../../utility/ctaUtils.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

async function fetchCar(domain) {
  const car = await fetch(
    `${domain}/graphql/execute.json/msil-platform/arenaBannerList?q=123`,
  );
  return car.json();
}

function convertToLakh(number) {
  if (number) return number / 100000;
  return null;
}

export default async function decorate(block) {
  const { publishDomain } = await fetchPlaceholders();
  const carResponse = await fetchCar(publishDomain);
  const isDesktop = window.innerWidth > 998;
  let currentIndex = 0;
  const cardsPerPage = isDesktop ? 3 : 1;
  let highlightedSidebar = null;
  let timer;

  const carsObject = carResponse?.data?.carModelList?.items?.reduce(
    (acc, car) => {
      acc[car.modelId] = car;
      return acc;
    },
    {},
  );

  const carContainersWrapper = document.createElement('div');

  const [bGImgContainer, ...carList] = block.children;

  const bgImg = bGImgContainer.querySelector('picture');

  carList.forEach((element) => {
    const [
      title,
      modelId,
      type,
      onRoadPrice,
      primaryCtaTextEl,
      primaryCtaLinkEl,
      primaryCtaTargetEl,
      secondaryCtaTextEl,
      secondaryCtaLinkEl,
      secondaryCtaTargetEl,
    ] = element.children;

    const carObjectItem = carsObject[modelId.textContent];

    const [firstLetterTitle, ...rest] = title.textContent.split(' ');
    const restTitle = rest.join(' ');

    const primaryCta = ctaUtils.getLink(
      primaryCtaLinkEl,
      primaryCtaTextEl,
      primaryCtaTargetEl,
      'primary__btn',
    );
    const secondaryCta = ctaUtils.getLink(
      secondaryCtaLinkEl,
      secondaryCtaTextEl,
      secondaryCtaTargetEl,
      'secondary__btn',
    );
    /* eslint no-underscore-dangle: 0 */
    carContainersWrapper.innerHTML += `
      <div class="car-container">
          <img
            src=${carObjectItem?.carImage._publishUrl || ''}
            alt=${carObjectItem?.carName || ''}
            class="sidebar-car--image"
          />
          <div class="sidebar">
            <div class="sidebar_text_container">
              <div class="text-container">
                <span>${firstLetterTitle || ''} ${restTitle || ''}</span>
              </div>
              <img
                src=${carObjectItem?.carLogoImage._publishUrl || ''}
                alt=${carObjectItem?.carName || ''}
                class="sidebar-car--logo"
              />
              <span><strong>${carObjectItem?.bodyType}</strong> | ${
  type?.textContent || ''
}</span>
              <div class="sidebar--hr"></div>
              <div class="sidebar--details">
                <div class="sidebar--details--exshowroom">
                  <span>Ex. showroom:</span>
                  <span><strong>${
  convertToLakh(carObjectItem?.exShowroomPrice) || ''
} Lakhs</strong></span>
                </div>
                <div class="sidebar--details--onroad">
                  <span>Estd. On-road in Gurgaon:</span>
                  <span><strong>${
  onRoadPrice?.textContent || ''
}</strong></span>
                </div>
              </div>
              <div class="buttons">
                ${primaryCta ? primaryCta.outerHTML : ''}
                ${secondaryCta ? secondaryCta.outerHTML : ''}
              </div>
            </div>
          </div>
        </div>
    `;
  });

  const heroBannerWrapper = `
    <div class="hero_banner_container_wrapper">
      ${bgImg.outerHTML}
      <div class="hero_banner_container">
        <button class="pre-btn"></button>
        <button class="nxt-btn"></button>
        ${carContainersWrapper.innerHTML}
      </div>
    </div>
  `;

  block.innerHTML = heroBannerWrapper;

  const nxtBtn = document.querySelector('.nxt-btn');
  const preBtn = document.querySelector('.pre-btn');
  preBtn.disabled = true;

  const cards = document.querySelectorAll('.car-container');
  const cardCount = cards.length;

  if (cardCount - cardsPerPage === 0) {
    nxtBtn.disabled = true;
  }

  function addImgToTitleDesktop(indexSidebar, sideBarItem) {
    const img = document.createElement('img');
    switch (indexSidebar) {
      case 0:
        sideBarItem.classList.add('left_sidebar');
        img.src = '../../icons/title_cover_blue.svg';
        sideBarItem.querySelector('.text-container').prepend(img);
        break;
      case 1:
        sideBarItem.classList.add('mid_sidebar');
        img.src = '../../icons/title_cover_yellow.svg';
        sideBarItem.querySelector('.text-container').prepend(img);
        break;
      case 2:
        sideBarItem.classList.add('right_sidebar');
        img.src = '../../icons/title_cover_yellow.svg';
        sideBarItem.querySelector('.text-container').prepend(img);
        break;
      default:
        break;
    }
  }

  function addImgToTitleMobile(sideBarItem) {
    const img = document.createElement('img');
    img.src = '../../icons/title_cover_yellow.svg';
    sideBarItem.querySelector('.text-container').prepend(img);
  }

  function handleMouseEnter(event) {
    if (highlightedSidebar) {
      highlightedSidebar.classList.remove('highlight');
    }

    highlightedSidebar = event;
    highlightedSidebar.classList.add('highlight');
  }

  function handleMouseLeave() {
    if (highlightedSidebar) {
      highlightedSidebar.classList.remove('highlight');
    }
    const middleIndex = currentIndex + Math.floor(cardsPerPage / 2);
    if (middleIndex < cards.length) {
      highlightedSidebar = cards[middleIndex];
      highlightedSidebar.classList.add('highlight');
    }
  }

  function toggleDisableNxtPrvBtn(isCurrentIndex, totalCount) {
    if (isCurrentIndex === 0) {
      preBtn.disabled = true;
    } else {
      preBtn.disabled = false;
    }
    if (isCurrentIndex === totalCount - cardsPerPage) {
      nxtBtn.disabled = true;
    } else {
      nxtBtn.disabled = false;
    }
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      nxtBtn.click();
    }, 3000);
  }
  

  function showCards(index) {
    cards.forEach((card, i) => {
      const indexSidebar = i - index;
      const sideBarItem = card.querySelector('.sidebar');
      if (isDesktop) {
        addImgToTitleDesktop(indexSidebar, sideBarItem);
      } else {
        addImgToTitleMobile(sideBarItem);
      }
      card.classList.remove('show');
      if (i >= index && i < index + cardsPerPage) {
        card.classList.add('show');
        card
          .querySelector('.sidebar-car--image')
          .addEventListener('mouseenter', () => {
            handleMouseEnter(card);
          });
        card
          .querySelector('.sidebar-car--image')
          .addEventListener('mouseleave', () => {
            handleMouseLeave(card);
          });
      }
    });

    const middleIndex = Math.floor(cardsPerPage / 2);
    if (index + middleIndex < cards.length) {
      cards[index + middleIndex].classList.add('highlight');
      highlightedSidebar = cards[index + middleIndex];
    }
  }

  const bullets = document.createElement('div');
  bullets.classList.add('bullets');
  bullets.id = 'bullets';

  for (let i = 0; i < cardCount; i += cardsPerPage) {
    bullets.innerHTML += `<input id="bullet" type="radio" ${i === 0 ? 'checked' : ''} />`;
  }

  document.querySelector(".hero_banner_container_wrapper").appendChild(bullets);

  nxtBtn.addEventListener('click', () => {
    if (currentIndex + cardsPerPage < cards.length) {
      currentIndex += cardsPerPage;
      const pageCount = Math.floor(currentIndex / cardsPerPage);
      const isBullets = document.querySelector('#bullets').children;
      isBullets[pageCount - 1].checked = false;
      isBullets[pageCount].checked = true;
      toggleDisableNxtPrvBtn(currentIndex, cardCount);
      showCards(currentIndex);
    }
    resetTimer();
  });

  preBtn.addEventListener('click', () => {
    if (currentIndex - cardsPerPage >= 0) {
      currentIndex -= cardsPerPage;
      const pageCount = Math.floor(currentIndex / cardsPerPage);
      const isBullets = document.querySelector('#bullets').children;
      isBullets[pageCount + 1].checked = false;
      isBullets[pageCount].checked = true;
      toggleDisableNxtPrvBtn(currentIndex, cardCount);
      showCards(currentIndex);
    }
    resetTimer();
  });

  showCards(currentIndex);
  resetTimer();
}
