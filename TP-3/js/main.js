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
         /* let itemsDimensions = item.getBoundingClientRect();
         let itemsWidth = itemsDimensions.width; */
         /* console.log(itemsContenido); */

         /* preBtn[i].classList.toggle('disabled'); */
         nxtBtn[i].addEventListener('click', () => {
             item.scrollLeft += 530;
         })

         preBtn[i].addEventListener('click', () => {
             item.scrollLeft -= 530;
         })
     })

     /*  const itemsContenido = document.querySelectorAll('.itemCarrusel');
      const nxtBtn = document.querySelector('.nxt-btn');
      const preBtn = document.querySelector('.pre-btn');
      console.log(itemsContenido);

      window.addEventListener('load', () => {
          itemsContenido[0].classList.add('active-card');
          itemsContenido[1].classList.add('active-card');
          itemsContenido[2].classList.add('active-card');
          itemsContenido[3].classList.add('active-card');
      })

      nxtBtn.addEventListener('click', () => {
          paginationTwoPagos();
      })

      preBtn.addEventListener('click', () => {
          paginationOnePagos();
      })
      const paginationOnePagos = () => {
          itemsContenido[4].classList.remove('active-card');
          itemsContenido[5].classList.remove('active-card');
          itemsContenido[6].classList.remove('active-card');
          itemsContenido[7].classList.remove('active-card');
          itemsContenido[0].classList.add('active-card');
          itemsContenido[1].classList.add('active-card');
          itemsContenido[2].classList.add('active-card');
          itemsContenido[3].classList.add('active-card');
      }

      const paginationTwoPagos = () => {
          itemsContenido[0].classList.remove('active-card');
          itemsContenido[1].classList.remove('active-card');
          itemsContenido[2].classList.remove('active-card');
          itemsContenido[3].classList.remove('active-card');
          itemsContenido[4].classList.add('active-card');
          itemsContenido[5].classList.add('active-card');
          itemsContenido[6].classList.add('active-card');
          itemsContenido[7].classList.add('active-card');
      } */




     /* function despliegue() {
         menu.classList.toggle("menuactive");
     }

     function cerrar() {
         menu.classList.toggle("menu");
     } */



 });