import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
    const signIn = block.querySelector('.sign-in > div:first-child > div');
    const link = signIn.querySelector('p.button-container a');
    if (signIn.querySelector('h4') || link)
        signIn.querySelector('p.button-container')?.remove();
    signIn.classList.add('sign-in-teaser__desc-content');

    const ctaText = link?.textContent?.trim() || '';
    const href = link?.href || '#';
    const desktopSrc = block.querySelector('.sign-in div:nth-of-type(2) > div > picture > img')?.src;
    const desktopAltText = block.querySelector('.sign-in div:nth-of-type(4) > div > p')?.textContent?.trim() || 'desktopImage';
    const mobileSrc = block.querySelector('.sign-in div:nth-of-type(3) > div > picture > img')?.src;
    const mobileAltText = block.querySelector('.sign-in div:nth-of-type(5) > div > p')?.textContent?.trim() || 'mobileImage';
    const signInTarget = block.querySelector('.sign-in div:nth-of-type(6) > div > p')?.textContent?.trim() || '_self';

    const mobileSignInHtml = `
        <div class="sign-in-teaser">
            <div class="sign-in-teaser__desc">
                ${signIn.outerHTML}
                ${(link) ? `<a href="${href}" class="sign-in-teaser--link" target="${signInTarget}">
                    ${ctaText} <span class="sign-in-teaser--arrow"></span>
                </a>` : ''}
            </div>
            <div class="sign-in-teaser__image">
                <img src="${mobileSrc}" loading="lazy" alt="${mobileAltText}"/>
            </div>
        </div>
    `;

    const ctaElements = Array.from(block.querySelectorAll('.sign-in > div:nth-last-child(-n+2)')).map(element => {
        const [imageEl, altTextEl, ctaTextEl, linkEl, targetEl] = element.children;
        const imgSrc = imageEl?.querySelector('img')?.src;
        const altText = altTextEl?.textContent?.trim() || 'icon';
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;
        const target = targetEl?.textContent?.trim() || '_self';

        element.innerHTML = `
            <a href="${link}" class="user__account--link" target="${target}">
                <span class="user__account__list-icon">
                    <img src="${imgSrc}" loading="lazy" alt="${altText}"/>
                </span>
                ${ctaText}
            </a>
        `;
        moveInstrumentation(element, element.firstElementChild);
        return element.innerHTML;
    }).join('');


    const desktopSignInHtml = `
        <div class="user__account">
            ${(link) ? `<a href="${href}" class="user__account--link hide-sm" target="${signInTarget}">
                <span class="user__account__list-icon">
                    <img src="${desktopSrc}" loading="lazy" alt="${desktopAltText}"/>
                </span>
                ${ctaText}
            </a>`: ''}
            ${ctaElements}
        </div>
    `;

    block.innerHTML = `
        <div class="user__dropdown">
            ${mobileSignInHtml}
            ${desktopSignInHtml}
        </div>
    `;
}
