export default function decorate(block) {
  // const [quoteWrapper] = block.children;

  // const blockquote = document.createElement('blockquote');
  // blockquote.textContent = quoteWrapper.textContent.trim();
  // quoteWrapper.replaceChildren(blockquote);

  block.innerHTML = `<a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a>`;
}