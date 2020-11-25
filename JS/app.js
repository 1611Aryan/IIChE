const $ = (element) => {
    return document.querySelector(element);
};
const homeText = $(".home__text");
const warTradeLogo = $('.wtLogo');
const logo = $('.aboutIIChE__logo');
const IIChE_Content = $('.aboutIIChE__content');
window.addEventListener('scroll', e => {
    homeText.style.transform = `translateX(${pageYOffset / 2}px)`;
    warTradeLogo.style.transform = `scaleX(1.2) translateY(-${pageYOffset / 2}px )`;
    if (pageYOffset < 1 * window.innerHeight) {
        let x = Math.abs(pageYOffset - window.innerHeight);
        logo.style.transform = `translateX(${-x}px)`;
        IIChE_Content.style.transform = `translateX(${x}px)`;
    }
    if (pageYOffset > 1.5 * window.innerHeight) {
        $('.plane').style.webkitAnimationPlayState = "running";
    }
});
const canvasAbout = $('.aboutIIChE__canvas');
canvasAbout.width = window.innerWidth;
canvasAbout.height = window.innerHeight;
const aboutC = canvasAbout.getContext('2d');
window.addEventListener('resize', () => {
    canvasAbout.width = window.innerWidth;
    canvasAbout.height = window.innerHeight;
});
const Circle = function (x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = (Math.random() * speed) - speed / 2;
    this.dy = (Math.random() * speed) - speed / 2;
    this.render = () => {
        aboutC.beginPath();
        aboutC.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        aboutC.fillStyle = this.color;
        aboutC.fill();
    };
    this.move = () => {
        if (this.x + this.radius >= canvasAbout.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= canvasAbout.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.render();
    };
    this.render();
};
function randomColor() {
    const colorArray = ['rgba(255,0,0,0.4)',
        'rgba(0,255,0,0.4)',
        'rgba(0,0,0,255,0.4)',
        'rgba(255,255,0,0.4)',
        'rgba(255,0,255,0.4)',
        'rgba(0,255,255,0.4)',
        'rgba(0, 212, 151, 0.4)',
        'rgba(255, 255, 255, 0.4)',
        'rgba(255, 86, 31, 0.4)'
    ];
    let size = colorArray.length;
    const colorPicker = Math.floor(Math.random() * size);
    return colorArray[colorPicker];
}
const circles = [];
let radiusFactor = null;
let speedFactor = null;
if (window.innerWidth >= 700) {
    radiusFactor = window.innerWidth / 20;
    speedFactor = 10;
}
else if (window.innerWidth < 700) {
    radiusFactor = window.innerWidth / 15;
    speedFactor = 8;
}
if (window.innerWidth < 400) {
    radiusFactor = window.innerWidth / 12;
    speedFactor = 6;
}
for (let i = 0; i < 10; i++) {
    let radius = (Math.random() * radiusFactor) + radiusFactor;
    let x = (Math.random() * (window.innerWidth - radius * 2)) + radius;
    let y = (Math.random() * (window.innerHeight - radius * 2)) + radius;
    let color = randomColor();
    const circle = new Circle(x, y, radius, color, speedFactor);
    circles.push(circle);
}
const numOfCircles = circles.length;
function animate() {
    requestAnimationFrame(animate);
    aboutC.clearRect(0, 0, canvasAbout.width, canvasAbout.height);
    for (let i = 0; i < numOfCircles; i++) {
        circles[i].move();
    }
}
animate();
