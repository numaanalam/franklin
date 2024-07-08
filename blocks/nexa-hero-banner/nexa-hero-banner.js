import { fetchPlaceholders } from '../../scripts/aem.js';
import carouselUtils from '../../utility/carouselUtils.js';

export default async function decorate(block) {
  const [showCtaEl, ctaTextEl, ctaLinkEl, ...bannerItemsEl] = block.children;
  const ctaVisibility = showCtaEl?.textContent?.trim();
  const ctaText = ctaTextEl?.textContent?.trim();
  const ctaLink = ctaLinkEl?.querySelector('a');
  let ctaHtml = '';
  if (ctaVisibility === 'true' && ctaLink) {
    const href = ctaLink?.href;
    ctaHtml = `
    <div class="hero-banner__cta-container">
      ${(ctaText) ? `<p>${ctaText}</p>` : ''}
      <a href="${href}" class="hero-banner__primary-btn"></a>
    </div>
    `;
  }
  const { publishDomain } = await fetchPlaceholders();

  const getVideoUrl = (el) => {
    const url = el?.querySelector('a')?.textContent?.trim();
    if (url) {
      return publishDomain + url;
    } else {
      return '';
    }
  }

  const getImage = (el, altText) => {
    const image = el?.querySelector('picture');
    const img = image?.querySelector('img');
    img?.setAttribute('width', '100%');
    img?.removeAttribute('height');
    img?.setAttribute('alt', altText);
    return image;
  }

  const getVideoHtml = (videoUrl) => {
    return `
      <div class="hero-banner__asset hero-banner__video-container">
        <video src="${videoUrl}" muted="muted" width="100%" autoplay loop></video>
      </div>
    `;
  }

  const getImageHtml = (image) => {
    return `
      <div class="hero-banner__asset hero-banner__image-container">
        ${image.outerHTML}
      </div>
    `;
  }

  const getAssetHtml = (videoUrl, image) => {
    if(videoUrl) {
      return getVideoHtml(videoUrl);
    } else if(image) {
      return getImageHtml(image);
    } else {
      return '';
    }
  }

  const bannerItems = bannerItemsEl?.map((itemEl, index) => {
    const [
      videoEl,
      allowMobileVideoEl,
      mobileVideoEl,
      imageEl,
      allowMobileImageEl,
      mobileImageEl,
      altTextEl,
      titleEl,
      subTitleEl,
      subTextEl
    ] = itemEl.children;
    const altText = altTextEl?.textContent?.trim() || 'Image';
    const desktopVideoUrl = getVideoUrl(videoEl);
    const desktopImage = getImage(imageEl, altText);
    const isAllowMobileVideo = allowMobileVideoEl?.textContent?.trim() || "false";
    const isAllowMobileImage = allowMobileImageEl?.textContent?.trim() || "false";
    const mobileVideoUrl = (isAllowMobileVideo === "true") ? (getVideoUrl(mobileVideoEl) || desktopVideoUrl) : desktopVideoUrl;
    const mobileImage = (isAllowMobileImage === "true") ? (getImage(mobileImageEl, altText) || desktopImage) : desktopImage;
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('hero-banner__title');
    const subTitle = subTitleEl?.textContent?.trim();
    const subText = Array.from(subTextEl?.querySelectorAll('p'))?.map((el) => el.outerHTML)?.join('');
    let assetHtml = '';
    if (window.matchMedia('(min-width: 999px)').matches) {
      assetHtml = getAssetHtml(desktopVideoUrl, desktopImage);
    } else {
      assetHtml = getAssetHtml(mobileVideoUrl, mobileImage);
    }
    itemEl.innerHTML = `
      <div class="hero-banner__content">
        ${assetHtml}
        <div class="hero-banner__info">
          <div class="hero-banner__top-section">
              ${(title) ? title.outerHTML : ''}
              ${(subTitle) ? `<p class="hero-banner__subtitle">${subTitle}</p>` : ''}
          </div>
          <div class="hero-banner__bottom-section">
            ${(desktopVideoUrl || mobileVideoUrl) ? `<div class="hero-banner__mute-btn hero-banner__mute-btn--muted"></div>` : ''}
            ${(subText) ? `<div class="hero-banner__subtext">${subText}</div>` : ''}
          </div>
        </div>
      </div>
    `;
    return itemEl.outerHTML;
  });

  block.innerHTML = `
    <div class="hero-banner__container">
      <div class="hero-banner__carousel">
        <div class="hero-banner__slides">
          ${bannerItems.join('')}
        </div>
      </div>
      ${ctaHtml}
    </div>
  `;

  carouselUtils.init(
    block.querySelector('.hero-banner__carousel'), 'hero-banner__slides', 'fade', (currentSlide, targetSlide, direction) => {
      currentSlide.querySelector('video')?.pause();
      targetSlide.querySelector('video')?.play();
    }
  );

  block.querySelectorAll('.hero-banner__mute-btn').forEach((el) => {
    const video = el.closest('.hero-banner__content')?.querySelector('video');
    el.addEventListener('click', (e) => {
      const targetStatus = !video.muted
      video.muted = targetStatus
      if(targetStatus) {
        e.target?.classList?.add('hero-banner__mute-btn--muted');
      } else {
        e.target?.classList?.remove('hero-banner__mute-btn--muted');
      }
    });
  });
}
