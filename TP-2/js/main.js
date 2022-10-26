 "use strict";
 document.addEventListener("DOMContentLoaded", () => {


     loader();

     const numero = document.querySelector(".numero-carga");
     let contador = 0;

     function loader() {
         /* setTimeout(function () {
             document.getElementById('spinner').style.visibility = "hidden";
             document.getElementById('main').style.visibility = "visible";
         }, 5000); */
         setInterval(() => {
             if (contador == 100) {
                 document.getElementById('spinner').style.visibility = "hidden";
                 document.querySelector('.contenido').style.visibility = "visible";
                 clearInterval();
             } else {
                 contador += 1;
                 numero.textContent = contador + "%";
             }
         }, 50);
     }


     const itemsContenido = [...document.querySelectorAll('.itemCarrusel')];
     const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
     const preBtn = [...document.querySelectorAll('.pre-btn')];

     itemsContenido.forEach((item, i) => {
         let itemsDimensions = item.getBoundingClientRect();
         let itemsWidth = itemsDimensions.width;

         nxtBtn[i].addEventListener('click', () => {
             item.scrollLeft += itemsWidth;
         })

         preBtn[i].addEventListener('click', () => {
             item.scrollLeft -= itemsWidth;
         })
     })




     /* function despliegue() {
         menu.classList.toggle("menuactive");
     }

     function cerrar() {
         menu.classList.toggle("menu");
     } */



 });