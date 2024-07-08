export default function decorate(block) {
    const icons = block.querySelectorAll('.icontitle picture');
    const titleElement = block.querySelector('div:nth-child(1) :is(h1,h2,h3,h4,h5,h6)');
    
    if (!titleElement) {
        console.error('Title element not found. Cannot proceed.');
        return;
    }
    
    const title = titleElement.textContent.trim();
    const iconImages = block.querySelectorAll('.icontitle img');
    
    iconImages.forEach((img) => {
        img.removeAttribute('width');
        img.removeAttribute('height');
        img.setAttribute('alt', title);
    });
    
    const icon = icons[0] ? icons[0].outerHTML : '';
    const iconClicked = icons[1] ? icons[1].outerHTML : '';
    
    block.innerHTML = `
        ${titleElement.outerHTML}
        <div class='icon'>${icon}</div>
        <div class='iconClicked'>${iconClicked}</div>
    `;
}
