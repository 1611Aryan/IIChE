const $ = (element) => {
    return document.querySelector(element);
};
const homeText = $(".home__text");
const logo = $('.aboutIIChE__logo');
const IIChE_Content = $('.aboutIIChE__content');
window.addEventListener('scroll', e => {
    homeText.style.transform = `translateX(${pageYOffset / 2}px)`;
    if (pageYOffset < 2 * window.innerHeight || pageYOffset > 3 * window.innerHeight) {
        let x = Math.abs(pageYOffset - window.innerHeight * 2);
        console.log(x);
        logo.style.transform = `translateX(${-x}px)`;
        IIChE_Content.style.transform = `translateX(${x}px)`;
    }
});
