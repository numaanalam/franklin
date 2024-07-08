import TabUtils from '../../utility/tabsUtils.js';
import utility from '../../utility/utility.js';

export default function decorate(block) {
  const highlightItemButtons = {};
  function generateHighlightItemHTML(highlightItem, index) {
    const [
      imageEl,
      altTextEl,,
      titleEl,
      subtitleEl,
      descriptionEl,
      expandDescriptionEl,
      collapseDescriptionEL,
    ] = highlightItem.children;

    const image = imageEl?.querySelector('picture');
    if (image) {
      const img = image.querySelector('img');
      img.classList.add('highlightItem-img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'Image Description';
      img.setAttribute('alt', alt);
    }

    const title = titleEl?.textContent?.trim() || '';
    const subtitle = subtitleEl?.textContent?.trim() || '';
    const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.textContent.trim()).join('');
    const expandDescription = expandDescriptionEl?.textContent?.trim() || '';
    const collapseDescription = collapseDescriptionEL?.textContent?.trim() || '';
    highlightItemButtons[index] = {
      expandBtn: expandDescription,
      collapseBtn: collapseDescription,
    };
    const newHTML = utility.sanitizeHtml(`
        <div class="text-section">
          <div class="top-left">
            <h1>${title}</h1>
          </div>
          <div class="top-right">
            <p>${subtitle}</p>
          </div>
        </div>
        ${(image) ? image.outerHTML : ''}
        <div class="highlightItem-content">
          <p class="more-content">
            ${description}
          </p>
          <a href="#" class="read-more">${expandDescription}</a>
        </div>
    `);

    highlightItem.classList.add('highlightItem', `switch-index-${index}`);
    highlightItem.innerHTML = newHTML;
    return highlightItem.outerHTML;
  }

  function initializeHighlightItems(highlightItems) {
    highlightItems.forEach((highlightItem, index) => {
      const readMoreButton = highlightItem.querySelector('.read-more');
      if (readMoreButton) {
        readMoreButton.addEventListener('click', (event) => {
          event.preventDefault();
          const moreContent = highlightItem.querySelector('.more-content');
          moreContent.classList.toggle('expanded');
          const { expandBtn, collapseBtn } = highlightItemButtons[index];
          readMoreButton.textContent = moreContent.classList.contains('expanded') ? collapseBtn : expandBtn;
        });
      }
    });
  }

  const blockClone = block.cloneNode(true);
  const highlightItemListElements = Array.from(block.children);
  const highlightItemListElementsClone = Array.from(blockClone.children);
  const highlightItemsHTML = highlightItemListElements
    .map((highlightItem, index) => generateHighlightItemHTML(highlightItem, index)).join('');
  const switchListHTML = TabUtils
    .generateSwitchListHTML(highlightItemListElementsClone, (highlightItem) => {
      const [, , tabNameEl] = highlightItem.children;
      return tabNameEl?.textContent?.trim() || '';
    });

  block.innerHTML = `
    <div class="highlightItems-container">${highlightItemsHTML}</div>
    ${switchListHTML}
  `;

  initializeHighlightItems(block.querySelectorAll('.highlightItem'));
  TabUtils.setupTabs(block, highlightItemListElements);

  return block;
}
