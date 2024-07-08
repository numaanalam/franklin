import utility from '../../utility/utility.js';
import teaser from '../../utility/teaserUtils.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
  function getImmersiveTeaser() {
    const [
      imageEl,
      altTextEl,
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
    ] = block.children;
    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'image';
      img.setAttribute('alt', alt);
    }

    const pretitle = pretitleEl?.textContent?.trim();
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('immersive__title');
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
    const cta = (ctaLinkEl) ? ctaUtils.getLink(ctaLinkEl, ctaTextEl, ctaTargetEl) : null;

    return {
      image,
      pretitle,
      title,
      description,
      cta,
    };
  }

  const immersiveTeaser = getImmersiveTeaser(block);
  const teaserEl = block.children[8];
  let teaserObj;
  if (teaserEl?.innerHTML) {
    teaserObj = teaser.getTeaser(teaserEl);
    teaserObj.classList.add('teaser-wrapper');
  }
  immersiveTeaser.cta?.classList.add('btn-title');
  const immersiveTeaserHtml = utility.sanitizeHtml(`
        ${(immersiveTeaser.image) ? immersiveTeaser.image.outerHTML : ''}
         <div class="immersive__content">
           ${(immersiveTeaser.pretitle) ? `<p>${immersiveTeaser.pretitle}</p>` : ''}
           ${(immersiveTeaser.title) ? `${immersiveTeaser.title.outerHTML}` : ''}
           ${(immersiveTeaser.description) ? `${immersiveTeaser.description}` : ''}
           ${(immersiveTeaser.cta) ? `<div class="immersive__action">${immersiveTeaser.cta.outerHTML}</div>` : ''}
          </div>
    `);

  block.innerHTML = `
        <div class="immersive__wrapper right-seperator">
            ${immersiveTeaserHtml}
            ${(teaserObj?.innerHTML) ? teaserObj.outerHTML : ''}
        </div>
    `;
}
