import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleEl, ...ctasEl] = block.children;
  const title = titleEl?.textContent?.trim();
  const ctaElements = ctasEl.map((element) => {
    const [imageEl, altTextEl, ctaTextEl, linkEl, targetEl] = element.children;
    const imgSrc = imageEl?.querySelector('img')?.src;
    const altText = altTextEl?.textContent?.trim() || 'icon';
    const ctaText = ctaTextEl?.textContent?.trim() || '';
    const link = linkEl?.querySelector('.button-container a')?.href;
    const target = targetEl?.textContent?.trim() || '_self';

    element.innerHTML = `
      <a href="${link}" target="${target}" class="user__contact--icon" title=${ctaText}>
          <img src="${imgSrc}" alt="${altText}" loading="lazy">
      </a>
    `;
    moveInstrumentation(element, element.firstElementChild);
    return element.innerHTML;
  }).join('');
  block.innerHTML = `
        <div class="user__contact">
            ${(title) ? `<h4>${title}</h4>` : ''}
            <div class="user__contact__icons">
                ${ctaElements}
            </div>
        </div>
    `;
}
