import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
    const [imageEl, imageClickedEl, imageAltTextEl, ...ctasEl] = block.children;
    const imageSrc = imageEl?.querySelector('img')?.src;
    const imageClickedSrc = imageClickedEl?.querySelector('img')?.src;
    const alt = imageAltTextEl?.querySelector('img')?.alt || 'Widget';
    const ctaElements = ctasEl.map((element) => {
        const [iconEl, iconClickedEl, altTextEl, ctaTextEl, linkEl, targetEl] = element.children;
        const iconSrc = iconEl?.querySelector('img')?.src;
        const iconClickedSrc = iconClickedEl?.querySelector('img')?.src;
        const altText = altTextEl?.textContent?.trim() || 'icon';
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;
        const target = targetEl?.textContent?.trim() || '_self';

        element.innerHTML = `
        <li>
            <a href="${link}" class="user__account--link" target="${target}">
                <span class="widget__link__icon">
                    <img src="${iconSrc}" loading="lazy" alt="${altText}" class="icon"/>
                    <img src="${iconClickedSrc}" loading="lazy" alt="${altText}" class="icon-clicked"/>
                </span>
                <p>${ctaText}</p>
            </a>
        </li>
        `;
        moveInstrumentation(element, element.firstElementChild);
        return element.innerHTML;
    }).join('');

    block.innerHTML = `
    <div class="widget">
        <div class="widget__icon">
            <img src="${imageSrc}" alt="${alt}" class="icon"/>
            <img src="${imageClickedSrc}" alt="${alt}" class="icon-clicked"/>
        </div>
        <div class="widget__links">
            <ul>
                ${ctaElements}
            </ul>
        </div>
    </div>
        `;
    // Add hover logic with JavaScript
    const widgetElement = block.querySelector('.widget');
    const widgetLinksElement = block.querySelector('.widget__links');

    widgetElement.addEventListener('mouseenter', () => {
        widgetLinksElement.style.display = 'block';
    });

    widgetElement.addEventListener('mouseleave', () => {
        widgetLinksElement.style.display = 'none';
    });

    // Initially hide the widget links
    widgetLinksElement.style.display = 'none';
}
