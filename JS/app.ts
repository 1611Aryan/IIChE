const $ = (element) => {
    return document.querySelector(element);
}

const homeText = $(".home__text");
const warTradeLogo = $('.wtLogo');
const warTradeLogoText = $('#warTradeText');
const logo = $('.aboutIIChE__logo');
const IIChE_Content = $('.aboutIIChE__content')

window.addEventListener('scroll', e => {
    //?Home Text slides right
    homeText.style.transform = `translateX(${pageYOffset / 2}px)`
        ;
    //?Logo slides Up
    if (innerWidth > 600) {
        warTradeLogo.style.transform = `scaleX(1.2) translateY(-${pageYOffset / 2}px )`;
    }
    if (pageYOffset < 1 * innerHeight) {
        IIChE_Content.style.transition = "none";
        logo.style.transition = "none";
        let x = Math.abs(pageYOffset - innerHeight);
        //?IIChE logo slides in or out
        logo.style.transform = `translateX(${-x}px)`;
        //?About Text slides in or out
        IIChE_Content.style.transform = `translateX(${x}px)`;
    }
    if (pageYOffset > 1.5 * innerHeight) {
        $('.plane').style.webkitAnimationPlayState = "running";
    }
    if (pageYOffset > 2 * innerHeight) {
        logo.style.transform = `translateX(0px)`;
        logo.style.transition = " translateX 0.3s";
        IIChE_Content.style.transform = `translateX(0px)`;
        IIChE_Content.style.transition = " translateX 0.3s";

    }
})

const menuButton = $('#menu__toggle');
const menu = $('.menu');
const menuContent = $('.menu__content');
menuButton.addEventListener('click', () => {
    menu.classList.toggle('expand');
    document.body.classList.toggle('enableScrolling');
    menuButton.classList.toggle('fa-times');
    menuContent.classList.toggle('linkIt');
})




const canvasAbout = $('.aboutIIChE__canvas');
canvasAbout.width = innerWidth;
canvasAbout.height = innerHeight;
const aboutC = canvasAbout.getContext('2d');


class Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    dx: number;
    dy: number;
    constructor(x: number, y: number, radius: number, color: string, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() * speed) - speed / 2;
        this.dy = (Math.random() * speed) - speed / 2;
    }

    render = () => {
        aboutC.beginPath();
        aboutC.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        aboutC.fillStyle = this.color;
        aboutC.fill();
    }
    move = () => {
        if (this.x + this.radius >= canvasAbout.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= canvasAbout.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.render();
    }

}


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
    ]
    let size = colorArray.length;
    const colorPicker = Math.floor(Math.random() * size);
    return colorArray[colorPicker];
}

const circles = [];
let radiusFactor = null;
let speedFactor = null;
//?speed and radius is decided based on the width of device
if (innerWidth >= 700) {
    radiusFactor = innerWidth / 20;
    speedFactor = 10
}
else if (innerWidth < 700) {
    radiusFactor = innerWidth / 15;
    speedFactor = 8;
}
if (innerWidth < 400) {
    radiusFactor = innerWidth / 12;
    speedFactor = 6;
}
window.addEventListener('resize', () => {
    canvasAbout.width = innerWidth;
    canvasAbout.height = innerHeight;
})

for (let i = 0; i < 10; i++) {
    let radius = (Math.random() * radiusFactor) + radiusFactor;
    let x = (Math.random() * (innerWidth - radius * 2)) + radius;
    let y = (Math.random() * (innerHeight - radius * 2)) + radius;
    let color = randomColor();
    //?Speed factor and radius is used from the if statements present above
    const circle = new Circle(x, y, radius, color, speedFactor);
    circles.push(circle);
}

function animate() {
    requestAnimationFrame(animate);
    aboutC.clearRect(0, 0, canvasAbout.width, canvasAbout.height);
    circles.forEach(circle => {
        circle.move();
    })

}

animate();