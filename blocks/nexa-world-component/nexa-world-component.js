import { moveInstrumentation } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js'
export default function decorate(block) {
  // Function to extract Nexa World content from the block
  function getNexaWorldContent() {
    const [
      pretitleEl,
      titleEl,
      descriptionEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
      ...linkEls // Get the rest of the elements as link elements
    ] = block.children;

    const pretitle = pretitleEl?.textContent?.trim() || '';
    const title = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    title?.classList?.add('title');
    const description = Array.from(descriptionEl.querySelectorAll('p')).map(p => p.textContent.trim()).join('');
    
    const cta = (ctaLinkEl) ? {
      href: ctaLinkEl.querySelector('a')?.href || '#',
      title: ctaLinkEl.querySelector('a')?.title || '',
      target: ctaTargetEl.textContent?.trim() || '_self',
      textContent: ctaTextEl?.textContent?.trim() || ''
    } : null;

    const links = Array.from(linkEls).map(linkEl => {
      const [linkImageEl, linkAltTextEl, linkTextEl, linkAnchorEl, linkTargetEl] = linkEl.children;

      const image = linkImageEl?.querySelector('picture');
      if (image) {
        const img = image?.querySelector('img');
        if (img) {
          img.removeAttribute('width');
          img.removeAttribute('height');
        }
      }

      const linkAltText = linkAltTextEl?.textContent?.trim() || '';
      const linkText = linkTextEl?.textContent?.trim() || '';
      const linkAnchor = linkAnchorEl?.querySelector('a')?.href || '#';
      const linkTarget = linkTargetEl?.querySelector('a')?.target || '_self';
     
     
      return {
        imgSrc: linkImageEl?.querySelector('img')?.src || '',
        imgAlt: linkAltText,
        text: linkText,
        href: linkAnchor,
        target: linkTarget,
        linkEl: linkEl
      };
    });

    return {
      pretitle,
      title,
      description,
      cta,
      links
    };
  }

  // Get Nexa World content from the block
  const nexaWorldContent = getNexaWorldContent();

  // Construct Nexa World HTML structure
  const nexaWorldHtml = `
    <div class="nexa-world__content">
      <div class="nexa-world__title">
        ${nexaWorldContent.pretitle ? `<p class="pre-title">${nexaWorldContent.pretitle}</p>` : ''}
        ${nexaWorldContent.title ? `${nexaWorldContent.title.outerHTML}` : ''}
      </div>
      ${nexaWorldContent.description ? `<p class="description">${nexaWorldContent.description}</p>` : ''}
      <div class="nexa-world__action">
        <a href="${nexaWorldContent.cta?.href || '#'}" title="${nexaWorldContent.cta?.title || ''}" class="button btn-title" target="${nexaWorldContent.cta?.target || '_self'}">
          <p class="cta-text">${nexaWorldContent.cta?.textContent}</p>
        </a>
      </div>
    </div>`;
    

  // Create the links HTML structure
  const ul = document.createElement('ul');
  ul.classList.add('list-container');
  nexaWorldContent.links.forEach(link => {
    console.log(link);
    const listItem = document.createElement('li');
    if(link.imgSrc!=''){
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.text;
    const optimizedPic = createOptimizedPicture(link.imgSrc, link.imgAlt, false, [{ width: '999' }]);
    anchor.appendChild(optimizedPic);
    listItem.appendChild(anchor);
    
    // Add event listener to change main image on hover
    anchor.addEventListener('mouseover', () => {
      document.querySelector('.nexa-world__img img').src = link.imgSrc;
      document.querySelector('.nexa-world__img img').alt = link.imgAlt;
    });
  }
  
  moveInstrumentation(link.linkEl,listItem);
  ul.appendChild(listItem);

  });

  const nexaWorldTeaser = `
    <div class="nexa-world__teaser">
      <div class="nexa-world__links">
        ${ul.outerHTML}
      </div>
    </div>`;

  // Replace the block's HTML with the constructed Nexa World HTML and teaser if present
  block.innerHTML = `
    <div class="nexa-world__container">
      ${nexaWorldHtml}
      ${nexaWorldTeaser}
    </div>`;

  // Function to handle hover effects
  function updateHoverEffects() {
    const links = document.querySelectorAll('.nexa-world__links a');
    const teaser = document.querySelector('.nexa-world__teaser');
    const container = document.querySelector('.nexa-world__container');
    const isMobile = window.matchMedia("(max-width: 999px)").matches;
    const backgroundImage = links[0].querySelector('img');

    if (isMobile) {
      container.style.backgroundImage = 'none';
      teaser.style.backgroundImage = `url(${backgroundImage.src})`;
    } else {
      teaser.style.backgroundImage = 'none';
      container.style.backgroundImage = `url(${backgroundImage.src})`;
    }
    links.forEach(link => {      
      link.addEventListener('mouseover', function() {       
        const imgSrc = this.querySelector('img').src;
        if (isMobile) {
          container.style.backgroundImage = 'none';
          teaser.style.backgroundImage = `url(${imgSrc})`;
        } else {
          teaser.style.backgroundImage = 'none';
          container.style.backgroundImage = `url(${imgSrc})`;
        }
      });

      link.addEventListener('mouseout', function() {
        if (isMobile) {
          teaser.style.backgroundImage = 'none';
        } else {
          container.style.backgroundImage = `url(${backgroundImage.src})`;
        }
      });
    });
  }

  // Initialize hover effects

    updateHoverEffects();
    window.addEventListener('resize', updateHoverEffects);
}