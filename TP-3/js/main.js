"use strict";

let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let background = new Image();

//Dimensiones de la matriz del tablero.

let boardCol = 6;
let boardFil = 6;

//Constantes
let NUM_FIG = boardCol*boardFil;
const SIZE_FIG = 50;
const WINNER_NUMBER = 4; //Cantidad de fichas iguales para ganar.

//imagenes
const urlBackground = "./img/background.jpg";
const urlFicha1 = "./img/ficha1.jpg";
const urlFicha2 = "./img/ficha2.jpg";
const urlFicha1Player2 = "./img/player2.webp";
const urlDropArrow = "./img/dropArrow.png";
const urlFicha = "./img/ficha12.jpg";

//coordenadas de las fichas que unicamente muestran turno.
const posXP1 = SIZE_FIG;
const posYP1 = SIZE_FIG*2;
let id_P1 = null;

const posXP2 = SIZE_FIG*2;
const posYP2 = SIZE_FIG*2;
let id_P2 = null;

//calculo de dimensiones de manera proporcional
//coordenadas donde iniciar a dibujar las celdas del tablero.
let boardWidth = (canvasWidth / 2) - (boardCol / 2) * SIZE_FIG - SIZE_FIG; //Centrar el canvas
let boardHeight = canvasHeight - (SIZE_FIG * (boardFil + 1.5));

//dimensiones de la zona donde se van a dibujar las fichas
let circlesWidth = boardWidth;
let circlesHeight = canvasHeight / 2;

//coordenadas de la zona desde donde van a estar habilitadas las fichas para ser ubicadas
let dropWidth = boardWidth;
let dropHeight = boardHeight - SIZE_FIG;

//coordenadas "botones" en canvas
let btnReiniciarX = canvasWidth - 130;
let btnReiniciarY = 30;

let btnTableroX = canvasWidth - 100;
let btnTableroY = 60;

let btnSmallX = canvasWidth - 90;
let btnSmallY = btnTableroY + 30;

let btnMediumX = canvasWidth - 90;
let btnMediumY = btnSmallY + 30;

let btnBigX = canvasWidth - 90;
let btnBigY = btnMediumY + 30;

//Variables generales
let figuras = [];
let tokensPlayed = 0;
let lastClickedFigure = null;
let isMouseDown = false;

//Iniciar juego...
iniciar();

function iniciar(){
    //Reescribo los valores originales del juego.
    NUM_FIG = boardCol * boardFil;
    boardWidth = canvasWidth / 2 - (boardCol / 2) * SIZE_FIG - SIZE_FIG/2;
    boardHeight = canvasHeight / 2 - SIZE_FIG - SIZE_FIG;

    dropWidth = boardWidth;
    dropHeight = boardHeight - SIZE_FIG;

    circlesWidth = boardWidth;
    circlesHeight = canvasHeight / 2;
    
    //Creo las figuras...
    
    //Matriz del tablero
    for(let x = 0; x < boardFil; x++){
        for(let y = 0; y < boardCol; y++){
            boardWidth += SIZE_FIG;
            addCirculo(boardWidth, boardHeight);
        }
        boardWidth -= SIZE_FIG * boardCol;
        boardHeight += SIZE_FIG;
    }

    //Creo arreglo donde seria la "Zona soltar aqui"
    for(let x = 0; x < boardCol; x++){
        dropWidth += SIZE_FIG;
        addZonaSoltar(dropWidth, dropHeight);
    }
    
    //Crear las fichas de cada jugador
    for(let i = 0; i < NUM_FIG / 2; i++){
        let _posX = SIZE_FIG / 2 + Math.round(Math.random() * circlesWidth);
        let _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight);
        let _color = urlFicha2;
        addFicha(_color, true, 1, _posX, _posY);
        
        _posX = canvasWidth - SIZE_FIG / 2 - Math.round(Math.random() * circlesWidth);
        _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight);
        _color = urlFicha1Player2;
        addFicha(_color, true, 2, _posX, _posY);
    }

    //crear las 2 fichas que voy a mostrar en la zona "Turno de:"
    addFicha(urlFicha2, true, 1, posXP1, posYP2);
    id_P1 = getFigureByCoord(posXP1, posYP1);
    figuras[id_P1].setIsClickable(false);
    figuras[id_P1].setHighlighted(true);

    addFicha(urlFicha1Player2, true, 2, posXP2, posYP2);
    id_P2 = getFigureByCoord(posXP2, posYP2);
    figuras[id_P2].setIsClickable(false);
    figuras[id_P2].setHighlighted(true);

    drawFigures();

    //Iniciar eventos...
    canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mousemove", onmousemove, false);
    canvas.addEventListener("mouseup", onmouseup, false);
}

//Mouse events
function onmousedown(event) {
    isMouseDown = true;
    if (lastClickedFigure != null) {
        lastClickedFigure.setHighlighted(false);
        lastClickedFigure = null;
    }

    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        clickedFigure.setHighlighted(true);
        lastClickedFigure = clickedFigure;
    }

    //Hizo click en reiniciar?
    if ((event.layerX >= btnReiniciarX) && (event.layerY <= btnReiniciarY)) {
        figuras = [];
        iniciar();
    }

    //Hizo click en tablero de 6X6?
    if ((event.layerX >= btnSmallX) && ((event.layerY <= btnSmallY) && (event.layerY > btnTableroY))) {
        boardCol = 6;
        boardFil = 6;
        figuras = [];
        iniciar();
    }

    //Hizo click en tablero de 7X7?
    if ((event.layerX >= btnMediumX) && ((event.layerY <= btnMediumY) && (event.layerY > btnSmallY))) {
        boardCol = 7;
        boardFil = 7;
        figuras = [];
        iniciar();
    }

    //Hizo click en tablero de 8X8?
    if ((event.layerX >= btnBigX) && ((event.layerY <= btnBigY) && (event.layerY > btnMediumY))) {
        boardCol = 8;
        boardFil = 8;
        figuras = [];
        iniciar();
    }

    drawFigures();
}

function onmousemove(event) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(event.layerX, event.layerY);
        drawFigures();
        if (lastClickedFigure != null) {
            lastClickedFigure.draw(ctx);
        }
    }
}

function onmouseup(event) {
    isMouseDown = false;
    if (lastClickedFigure != null) {
        if (isInDroppingZone(lastClickedFigure)) {
            if (isGameOver(lastClickedFigure)) {
                //alert("Gano Player: " + lastClickedFigure.getPlayer());
                endGame();
                drawFigures();
                return
            }

        } else if (isInBoardZone(lastClickedFigure)) {
            console.log("figura arriba del tablero");
        }
        lastClickedFigure.setHighlighted(false);
    }
    drawFigures();
}

//Dibujar figuras..
function addCirculo(x, y){
    let color = "white";
    let circulo = new Circulo(x, y, SIZE_FIG, SIZE_FIG, SIZE_FIG/2, color, ctx);
    figuras.push(circulo); 
}

function addFicha(_color, _turn, _player, _posX, _posY){
    let player = _player;
    let posX = _posX;
    let posY = _posY;
    let color = _color;
    let ficha = new Ficha(player, _turn, posX, posY, (SIZE_FIG/2), color, ctx);
    figuras.push(ficha);
}

function addZonaSoltar(x, y){
    let color = urlDropArrow;
    let zona = new zonaSoltar((x-25), (-30), SIZE_FIG, boardHeight - (boardFil * SIZE_FIG), color, ctx);
    figuras.push(zona);
}

//Funciones auxiliares

function drawFigures() {
    clearCanvas();
    addButtonsAndTexts();
    for (let i = 0; i < figuras.length; i++) {
        if (figuras[i] != lastClickedFigure) {
            figuras[i].draw(ctx);
        }
    }
    if (lastClickedFigure != null) {
        lastClickedFigure.draw(ctx);
    }
}

function clearCanvas(){
    if(background.src === ""){
        background.src = urlBackground;
        let cargarImg = function () {
            ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        }
        background.onload = cargarImg.bind(this);
    }
    else{
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
    }
}

function addButtonsAndTexts(){
    ctx.font = "30px Arial";
    ctx.fillText("Turno de: ", 20, 60);

    ctx.font = "25px Arial";
    ctx.fillText("-reiniciar-", btnReiniciarX, btnReiniciarY);

}

//Clickear tablero/imagen para empezar el juego.
function findClickedFigure(x, y) {
    for (let index = 0; index < figuras.length; index++) {
        const element = figuras[index];
        if (element.isPointedInside(x, y)) {
            return element;
        }
    }
}

//Si una ficha fue soltada arriba del tablero la corro para que no estorbe!
function isInBoardZone(token) {
    for (let i = 0; i < figuras.length; i++) {
        const element = figuras[i];
        if (element.isTokenInside(token.getPosX(), token.getPosY())) {
            //quizas mejora: reubicar la ficha en la zona de pilita de fichas original (izq o derecha)
            token.setPosition(
                figuras[i].getPosX() -
                (figuras[i].getPosX() - token.getPosX()),
                boardHeight + SIZE_FIG
            );
            return true;
        }
    }
    return false;
}

//Devuelvo el "id" de una figura en (x, y)
function getFigureByCoord(x, y){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].getPosX() == x && figuras[i].getPosY() == y){
            return i;
        }
    }
    return null;
}

function endGame(){
    for(let i = 0; i < figuras.length; i++){
        figuras[i].setIsClickable(false);
    }
    figuras[id_P1].setHighlighted(false);
    figuras[id_P2].setHighlighted(false);
}

let boton = document.querySelector("#boton4");

//Cada vez que clickeo cambio el tablero..
boton.addEventListener("click", function (){
    
});