import utility from '../../utility/utility.js';

export default function decorate(block) {
  const [...helpSelectEl] = block.children;
  const teasers = helpSelectEl.map((item) => {
    const currentElement = item?.firstElementChild;
    if (
      currentElement
      && currentElement.childNodes.length > 0
      && currentElement !== undefined
    ) {
      return currentElement;
    }
    return null;
  });

  const filteredTeasers = teasers.filter((teaser) => teaser);
  const [
    title,
    content,
    dummyText,
    actionCtaLabel,
    actionCtaContent,
    targetEl,
    car1LogoImg,
    car1LogoAlt,
    car1Img,
    car1ImgAlt,
    car2LogoImg,
    car2LogoAlt,
    car2Img,
    car2ImgAlt,
    car3LogoImg,
    car3LogoAlt,
    car3Img,
    car3ImgAlt,
  ] = filteredTeasers;

  const titleNode = title.querySelector('p');
  titleNode.classList.add('title');
  const subtitle = content.querySelector('p');
  subtitle.classList.add('subtitle');
  const primaryCta = document.querySelector('.button-container a');
  primaryCta.classList.add('primary__btn');
  primaryCta.innerText = '';

  const newHtml = `
    <div class="helpme-select">
      <div class="content__container">
        <div class="left__content">
          ${title ? title.innerHTML : ''}
          ${content ? content.innerHTML : ''}
          ${actionCtaContent ? actionCtaContent.innerHTML : ''}
        </div>
        <div class="right__content">
          <div class="car__carousel">
            <div class="image-container">
              ${car1LogoImg ? car1LogoImg.innerHTML : ''}
              ${car1Img ? car1Img.innerHTML : ''}
            </div>
            <div class="image-container">
              ${car2LogoImg ? car2LogoImg.innerHTML : ''}
              ${car2Img ? car2Img.innerHTML : ''}
            </div>
            <div class="image-container">
              ${car3LogoImg ? car3LogoImg.innerHTML : ''}
              ${car3Img ? car3Img.innerHTML : ''}
            </div>
          </div>
          <div class="white-vertical__rectangle">
          </div>
          <div class="dummy__text">${dummyText ? dummyText.innerHTML : ''}</div>
        </div>
      </div>
      <div class="vertical__rectangle"></div>
      <div class="rect-box"></div>
      <div class="rect-bar1"></div>
      <div class="rect-bar2"></div>
    </div>
  `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));

  const actionCTA = document.querySelector('.button-container a');
  actionCTA?.setAttribute('target', targetEl.innerText);
  actionCTA?.setAttribute('name', actionCtaLabel?.firstElementChild?.innerText);

  const headings = document.querySelectorAll('.left__content h2');
  if (headings.length > 0) {
    headings.forEach((heading, index) => {
      heading.classList.add(`heading${index + 1}`);
    });
  }

  const carouselItems = document.querySelectorAll(
    '.right__content .car__carousel .image-container',
  );

  // Adding Logo alt text
  const logoAltText = [car1LogoAlt, car2LogoAlt, car3LogoAlt];
  if (logoAltText.length > 0) {
    logoAltText.forEach((logotext, index) => {
      const imageItem = carouselItems.item(index);
      const logoTag = imageItem.querySelector('picture img');
      logoTag?.setAttribute('alt', logotext?.firstElementChild?.innerText);
    });
  }

  // Adding car alt text
  const carAltText = [car1ImgAlt, car2ImgAlt, car3ImgAlt];
  if (carAltText.length > 0) {
    carAltText.forEach((carText, index) => {
      const imageItem = carouselItems.item(index);
      const carTag = imageItem.querySelectorAll('picture img').length > 0
        && imageItem.querySelectorAll('picture img')[1];
      carTag?.setAttribute('alt', carText?.firstElementChild?.innerText);
    });
  }

  if (carouselItems.length > 0) {
    carouselItems.forEach((imageContainer) => {
      const imageTag = imageContainer.querySelectorAll('picture');
      if (imageTag.length > 0) {
        imageTag[0]?.classList.add('carLogo');
        imageTag[1]?.classList.add('carImage');
      }
    });
  }

  let currentIndex = 0;
  const totalItems = carouselItems.length;

  function setActiveItem(index) {
    // Reset all items
    carouselItems.forEach((item) => item.classList.remove('active', 'next', 'prev'));

    // Calculate indices for active, next, and previous items
    const activeIndex = (index + totalItems) % totalItems;
    const nextIndex = (activeIndex + 1) % totalItems;
    const prevIndex = (activeIndex - 1 + totalItems) % totalItems;

    // Apply classes to the active, next, and previous items
    carouselItems[activeIndex].classList.add('active');
    carouselItems[nextIndex].classList.add('next');
    carouselItems[prevIndex].classList.add('prev');

    // Trigger reflow to apply CSS transitions
  }

  function moveCarousel(direction) {
    currentIndex = direction === 'next'
      ? (currentIndex + 1) % totalItems
      : (currentIndex - 1 + totalItems) % totalItems;
    setActiveItem(currentIndex);
  }

  // Initial setup
  setActiveItem(currentIndex);

  setInterval(() => {
    moveCarousel('next');
  }, 3000);
}