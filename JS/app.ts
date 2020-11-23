const $ = (element) => {
    return document.querySelector(element);
}

const homeText = $(".home__text");

window.addEventListener('scroll', e => {
    homeText.style.transform = `translateX(${pageYOffset / 2}px)`;
    console.log(pageYOffset / 2)
})