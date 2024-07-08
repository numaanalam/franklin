import utility from './utility.js';

const TabsUtils = {

  generateSwitchListHTML: (items, getTabName) => {
    const generateSwitchListItemHTML = (tabName, index) => `
                  <li class="switch-list-item switch-index-${index}">${tabName}</li>
                `;

    const switchListHTML = items.map((item, index) => {
      const tabName = getTabName(item);
      return generateSwitchListItemHTML(tabName, index);
    }).join('');

    return utility.sanitizeHtml(`
            <div class="switch-list-section">
              <ul class="switch-list">
                ${switchListHTML}
              </ul>
            </div>
          `);
  },
  setupTabs: (container) => {
    const switchList = container.querySelector('.switch-list');
    switchList.addEventListener('click', (event) => {
      const switchItem = event.target.closest('.switch-list-item');
      if (!switchItem) return;

      const index = Array.from(switchList.children).indexOf(switchItem);
      const highlightItems = container.querySelectorAll('.highlightItem');
      const switchItems = container.querySelectorAll('.switch-list-item');

      highlightItems.forEach((highlightItem) => {
        highlightItem.style.display = 'none';
      });
      highlightItems[index].style.display = 'block';

      switchItems.forEach((item) => item.classList.remove('active'));
      switchItem.classList.add('active');
    });

    // Initial setup
    const defaultHighlightItem = container.querySelector('.highlightItem.switch-index-0');
    if (defaultHighlightItem) {
      defaultHighlightItem.style.display = 'block';
    }

    const firstSwitchItem = container.querySelector('.switch-list-item');
    if (firstSwitchItem) {
      firstSwitchItem.classList.add('active');
    }
  },

};
export default TabsUtils;
// export function generateSwitchListItemHTML(tabName, index) {
//  return `
//    <li class="switch-list-item switch-index-${index}">${tabName}</li>
//  `;
// }
//
// export function generateSwitchListHTML(items, getTabName) {
//  const switchListHTML = items.map((item, index) => {
//    const tabName = getTabName(item);
//    return generateSwitchListItemHTML(tabName, index);
//  }).join('');
//
//  return utility.sanitizeHtml(`
//    <div class="switch-list-section">
//      <ul class="switch-list">
//        ${switchListHTML}
//      </ul>
//    </div>
//  `);
// }
//
// export function setupTabs(container, items) {
//  const switchList = container.querySelector('.switch-list');
//
//  switchList.addEventListener('click', (event) => {
//    const switchItem = event.target.closest('.switch-list-item');
//    if (!switchItem) return;
//
//    const index = Array.from(switchList.children).indexOf(switchItem);
//    const highlightItems = container.querySelectorAll('.highlightItem');
//    const switchItems = container.querySelectorAll('.switch-list-item');
//
//    highlightItems.forEach((highlightItem) => {
//      highlightItem.style.display = 'none';
//    });
//    highlightItems[index].style.display = 'block';
//
//    switchItems.forEach((item) => item.classList.remove('active'));
//    switchItem.classList.add('active');
//  });
//
//  // Initial setup
//  const defaultHighlightItem = container.querySelector('.highlightItem.switch-index-0');
//  if (defaultHighlightItem) {
//    defaultHighlightItem.style.display = 'block';
//  }
//
//  const firstSwitchItem = container.querySelector('.switch-list-item');
//  if (firstSwitchItem) {
//    firstSwitchItem.classList.add('active');
//  }
