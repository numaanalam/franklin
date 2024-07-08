export default function decorate(block) {
    let temp = 0;
    for(let i=0; i<50000000; i++) {
        temp = i;
    }
    const el = document.createElement('p');
    el.innerHTML = temp + "";
    block.append(el)
}