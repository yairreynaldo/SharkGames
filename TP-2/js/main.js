 "use strict";
 document.addEventListener("DOMContentLoaded", () => {

     const menu = document.querySelector(".menu");
     document.querySelector(".burguer").addEventListener("click", (e) => {
         menu.classList.toggle("active");
     });
     document.querySelector(".cruz").addEventListener("click", (e) => {
         if (menu.classList.contains("active")) {
             menu.classList.remove("active");
         }
     });


     /* function despliegue() {
         menu.classList.toggle("menuactive");
     }

     function cerrar() {
         menu.classList.toggle("menu");
     } */



 });