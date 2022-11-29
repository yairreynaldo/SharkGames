//FUNCION CARDS

const card1 = document.getElementById('j-1');
const card2 = document.getElementById('j-2');
const card3 = document.getElementById('j-3');
const card4 = document.getElementById('j-4');
const titulo1 = document.getElementById('tituloJuego');

let cargarImagen = (entradas, observador) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            entrada.target.classList.add('visible');
        }
        else{
            entrada.target.classList.remove('visible');
        }
    });
}

const observador = new IntersectionObserver(cargarImagen, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: .6
});

observador.observe(card1);
observador.observe(card2);
observador.observe(card3);
observador.observe(card4);
observador.observe(titulo1);

/* FUNCION HISTORIA */

let faders = document.querySelectorAll('.fade-in');
let sliders = document.querySelectorAll('.slide-in');
let slidersUp = document.querySelectorAll('.slide-up');

let text1 = document.querySelector('#text-1');
let text2 = document.querySelector('#text-2'); //DIV CON PARRAFOS
let text3 = document.querySelector('#text-3');

let heroCard1 = document.querySelector('#hero-card-1'); 
let heroCard2 = document.querySelector('#hero-card-2'); //CARD CON IMAGENES
let heroCard3 = document.querySelector('#hero-card-3');

let cardText1 = document.querySelector('#card-parrafo-1'); //PARRAFO
let cardText3 = document.querySelector('#card-parrafo-3');

let img1 = document.querySelector('#img-1');  
let img2 = document.querySelector('#img-2'); //IMAGENES
let img3 = document.querySelector('#img-3');

let galery = document.querySelector('#galery');

window.addEventListener('scroll', scrollHistory);

function scrollHistory(){
    
    faders.forEach(fader =>{
        let top = fader.getBoundingClientRect().top;
        let bottom = fader.getBoundingClientRect().bottom;  
        let scroll = window.innerHeight - window.innerHeight/2;
        if(top < scroll){
            fader.classList.add('appear')
        }else{
            fader.classList.remove('appear')
        }
    })
    
    sliders.forEach(slider => {
        let top = slider.getBoundingClientRect().top;
        let bottom = slider.getBoundingClientRect().bottom;
        let scroll = window.innerHeight;
        if(top >= 0 && bottom <= scroll){
            slider.classList.add('appear');
        }
    });

    let position = window.innerHeight - window.innerHeight/2;
    let topPosition = text1.getBoundingClientRect().top;
    let topPosition1 = text2.getBoundingClientRect().top;
    let topPosition2 = text3.getBoundingClientRect().top;
    let topGalery = galery.getBoundingClientRect().top;

    if(topPosition < position){
        heroCard1.classList.add('showContent');
        text1.classList.remove('fade-in')
        if(heroCard2.classList.contains('showContent')){
            heroCard2.classList.remove('showContent');
            text2.classList.add('fade-in')
        }
    }
    else{
        img1.classList.remove('appear');
        cardText1.classList.remove('appear');    
    }

    if(topPosition1 < position){ 
        heroCard1.classList.remove('showContent');
        text1.classList.add('fade-in')
        heroCard2.classList.add('showContent');
        text2.classList.remove('fade-in')
        if(heroCard3.classList.contains('showContent')){
            heroCard3.classList.remove('showContent');
            text3.classList.add('fade-in');
        }
    }

    if(topPosition2 < position){
        heroCard2.classList.remove('showContent');
        text2.classList.add('fade-in')
        heroCard3.classList.add('showContent');
        text3.classList.remove('fade-in')
    }

    if(topGalery < position){
        img1.classList.remove('appear');
        img2.classList.remove('appear');
        img3.classList.remove('appear');
        cardText3.classList.remove('appear');
    }

    slidersUp.forEach(slider =>{
        let top = slider.getBoundingClientRect().top;
        let scroll = window.innerHeight;
        if(top < scroll){
            slider.classList.add('appear');
        }
    })

};
