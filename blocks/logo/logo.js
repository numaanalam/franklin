export default function decorate(block) {
    const link =  block.querySelector('div a')?.getAttribute('href') || (new URL(window.location.href)).origin;
    const altText =  block.querySelector('div:nth-child(2) div')?.textContent?.trim() || 'logo';
    const picture =  block.querySelector('div picture');

    picture?.querySelector('img')?.setAttribute('alt',altText);

    const htmlLiteral = `
            <span>
                <a class="logo" href="${link}">
                    ${picture?.outerHTML || ''}
                </a>
            </span>
        `;
        block.innerHTML = htmlLiteral;
}

