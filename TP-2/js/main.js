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

     const main = document.querySelector("#main");
     const menu = document.querySelector(".menu-burguer");
     document.querySelector(".burguer").addEventListener("click", (e) => {
         if (!menuPerfil.classList.contains("perfil-active")) {
             menu.classList.toggle("burguer-active");
         }
     });
     document.querySelector(".cruz").addEventListener("click", (e) => {
         if (menu.classList.contains("burguer-active")) {
             menu.classList.remove("burguer-active");
         }
     });

     main.addEventListener("click", (e) => {
         if (menu.classList.contains("burguer-active")) {
             menu.classList.remove("burguer-active");
         }
         if (menuPerfil.classList.contains("perfil-active")) {
             menuPerfil.classList.remove("perfil-active");
         }
     });

     const menuPerfil = document.querySelector(".menu-perfil");
     document.querySelector(".fotoperfil").addEventListener("click", (e) => {
         if (!menu.classList.contains("burguer-active")) {
             menuPerfil.classList.toggle("perfil-active");
         }
     });

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