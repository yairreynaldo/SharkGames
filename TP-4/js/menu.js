"use strict";
document.addEventListener("DOMContentLoaded", () => {

    const main = document.querySelector("#main");
    const menu = document.querySelector("#menu-burguer");
    const menuItem = [...menu.querySelectorAll('.menu-item')];
    const iconBurguer = document.querySelector(".icon-burguer")
    console.log(menuItem);
    iconBurguer.addEventListener("click", (e) => {
        if (!menuPerfil.classList.contains("perfil-active")) {
            iconBurguer.classList.toggle("active");
            menu.classList.toggle("burguer-active");
            /* menuItem.forEach(i => {
                i.classList.toggle("burguer-active");
            }); */
            for (let i = 0; i < menuItem.length; i++) {
                let item = menuItem[i];
                let num = i;
                item.classList.toggle("item-active" + num);
                /* console.log(num); */
                /* item.style.transitionDuration = "5s"; */

            }
        }
    });

    main.addEventListener("click", (e) => {
        if (menu.classList.contains("burguer-active")) {
            iconBurguer.classList.remove("active");
            for (let i = 0; i < menuItem.length; i++) {
                let item = menuItem[i];
                /* console.log(item); */
                let num = i;
                item.classList.remove("item-active" + num);
                /* console.log(num); */
                /* item.style.transitionDuration = "5s"; */

            }
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

});