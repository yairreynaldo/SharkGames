"use strict";
document.addEventListener("DOMContentLoaded", () => {

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

});