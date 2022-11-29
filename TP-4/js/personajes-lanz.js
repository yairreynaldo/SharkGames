const carrusel = document.querySelector(".carrusel-items");
const btnNxt = document.querySelector(".btn-sig");
const btnAtr = document.querySelector(".btn-atr");

btnNxt.addEventListener('click', () => {
    carrusel.scrollLeft += 600;
    let lis = document.querySelectorAll(".carrusel-item")
    lis.forEach(x => {
        x.classList.remove('moveIzq')
        x.classList.remove('moveDer')
        setTimeout(() => {
            x.classList.add('moveDer');
        }, 100)
    })
})
btnAtr.addEventListener('click', () => {
    carrusel.scrollLeft -= 600;
    let lis = document.querySelectorAll(".carrusel-item")
    lis.forEach(x => {
        x.classList.remove('moveDer')
        x.classList.remove('moveIzq')
        setTimeout(() => {
            x.classList.add('moveIzq');
        }, 100)
    })
})



let titulo = document.querySelector("#titulo-personajes");
let tarjetapj = document.querySelectorAll(".carrusel-item");
titulo.style.opacity = 0.1;
let distance = 0;
let movimiento = 30
titulo.style.transform = `translateY(-${movimiento*2}px)`;

tarjetapj.forEach(pj => {
    pj.style.transform = `translateY(${movimiento}px)`;
    pj.style.opacity = 0.1;
});
window.addEventListener("scroll", function() {
    let windowHeight = window.innerHeight;
    let elementTop = titulo.getBoundingClientRect().top;
    let elementVisible = 300;
    let distanceNow = window.scrollY;

    if (elementTop < (windowHeight - elementVisible) && titulo.style.opacity < 1 && distanceNow > distance && movimiento > 0) {
        titulo.style.opacity = titulo.style.opacity * 1.2;
        titulo.style.transform = `translateY(-${movimiento*2}px)`;
        tarjetapj.forEach(pj => {
            pj.style.transform = `translateY(${movimiento}px)`;
            pj.style.opacity = pj.style.opacity * 1.2;
            pj.addEventListener('mouseover', (event) => {
                pj.style.transform = 'scale(1.2)';
            })
            pj.addEventListener('mouseleave', (event) => {
                pj.style.transform = 'scale(1)';
            })
        });

        movimiento = movimiento - 2;
    } else if (elementTop > (windowHeight - elementVisible) && distanceNow < distance && titulo.style.opacity > 0.1) {
        titulo.style.opacity = titulo.style.opacity * 0.9;
        titulo.style.transform = `translateY(-${movimiento*2}px)`;
        tarjetapj.forEach(pj => {
            pj.style.transform = `translateY(${movimiento}px)`;
            pj.style.opacity = pj.style.opacity * 0.9;
            pj.addEventListener('mouseover', (event) => {
                pj.style.transform = 'scale(1.2)';
            })
            pj.addEventListener('mouseleave', (event) => {
                pj.style.transform = 'scale(1)';
            })
        });

        movimiento = movimiento + 2;
    }

    if (movimiento > 30) {
        movimiento = 30;
    }

    distance = distanceNow;

})

let header = document.querySelector("header");
let logoTit = document.querySelector(".logo h3");
let logoCont = document.querySelector(".logo");
let search = document.querySelector(".search");
let logoShark = document.querySelector(".imgLogo");
/* let burguerScroll = document.querySelector(".menu-burguer .burguer-active"); */
window.addEventListener("scroll", function() {
    header.classList.toggle("abajo", this.window.scrollY > 0);
    logoTit.classList.toggle("titleScroll", this.window.scrollY > 0);
    logoCont.classList.toggle("logoScroll", this.window.scrollY > 0);
    search.classList.toggle("searchScroll", this.window.scrollY > 0);
    logoShark.classList.toggle("logoImgScroll", this.window.scrollY > 0);
})



/* let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
    intervalo = setInterval(function() {
        carrusel.scrollLeft = carrusel.scrollLeft + step;
        if (carrusel.scrollLeft === maxScrollLeft) {
            step = step * -1;
        } else if (carrusel.scrollLeft === 0) {
            step = step * -1;
        }
    }, 10);
};

const stop = () => {
    clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
    stop();
});

carrusel.addEventListener("mouseout", () => {
    start();
});

start(); */