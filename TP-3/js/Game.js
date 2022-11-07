"use strict";

document.addEventListener("DOMContentLoaded", initPage);

let canvas = document.querySelector('#myCanvas');
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let background = new Image();

//Dimensiones de la matriz del tablero.

let boardCol;
let boardFil;

//Constantes
const TIEMPO_JUEGO = 300;
let timer = TIEMPO_JUEGO;
let timerId;
let NUM_FIG = boardCol * boardFil;
const SIZE_FIG = 50;
/* const SIZE_FICHA = 75; */
let WINNER_NUMBER = 4; //Cantidad de fichas iguales para ganar.
const colorAgua = "lightblue";
const colorFuego = "orange";

//imagenes
const urlBackground = "./img/background.jpg";
let imgf1 = new Image();
let imgf2 = new Image();
let ficha1;
let ficha2;
let urlFichaFuego; //"./img/fuego1.png";
/* const urlFicha2 = "./img/ficha2.jpg"; */
let urlFichaAgua; //"./img/agua2.png";
/* const urlDropArrow = "./img/dropppp.png"; */
/* const urlFicha = "./img/ficha12.jpg"; */
const urlTab = "./img/poke.png";

//coordenadas de inicio de fichas.
const posXP1 = SIZE_FIG;
const posYP1 = SIZE_FIG
let id_P1 = null;

const posXP2 = canvasWidth - SIZE_FIG;
const posYP2 = SIZE_FIG
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


let btnReiniciar = document.querySelector("#btn-reiniciar");


let result = document.querySelector(".resultado-canvas");
let turnoAgua = document.querySelector("#turno-agua");
let turnoFuego = document.querySelector("#turno-fuego");


//Variables generales
let figures = [];
let tokensPlayed;
let lastClickedFigure = null;
let isMouseDown = false;

function initPage() {


    //Controla que no se pueda seleccionar la misma ficha
    let ff11 = document.getElementsByName('targetgroup1');
    ff11.forEach(f => f.addEventListener("click", () => {
        let ff22 = document.getElementsByName('targetgroup2');
        for (let f22 of ff22) {
            f22.disabled = false;
            if (f22.value === f.value) {
                f22.disabled = true;
            }
        }
    }));

    let ff22 = document.getElementsByName('targetgroup2');
    ff22.forEach(f => f.addEventListener("click", () => {
        let ff11 = document.getElementsByName('targetgroup1');
        for (let f11 of ff11) {
            f11.disabled = false;
            if (f11.value === f.value) {
                f11.disabled = true;
            }
        }
    }));

    let contentCanvas = document.querySelector(".canvas-container");
    contentCanvas.style.display = 'none';
    canvas.style.display = 'none';

    let heroTitleJugarOpciones = document.querySelector("#hero-title-jugar-opciones");
    heroTitleJugarOpciones.style.display = 'block';

    //Se inicia el juego. Boton jugar.
    let btnPlayStart = document.querySelector("#btn-play-start");
    btnPlayStart.addEventListener("click", function() {
        //Display solo canvas
        heroTitleJugarOpciones.style.display = 'none';
        contentCanvas.style.display = 'block';
        canvas.style.display = 'block';

        /* canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT; */

        //Ayuda para ver por donde esta el mouse
        //Descomentar para ver coordenadas actaules del mouse
        /*
        var output = document.getElementById("output");
        canvas.addEventListener("mousemove", function (evt) {
            var mousePos = getMousePos(evt);
            marcarCoords(output, mousePos.x, mousePos.y)
        }, false);
        canvas.addEventListener("mouseout", function (evt) {
            limpiarCoords(output);
        }, false);
        */

        //Opciones seleccionadas
        //Dificultad
        let dificultades = document.getElementsByName('dificultad');
        for (let d of dificultades) {
            if (d.checked) {
                WINNER_NUMBER = Number(d.value);
                boardFil = WINNER_NUMBER + 2;
                boardCol = WINNER_NUMBER + 2;
            }
        }

        //Fuego

        //Ficha
        let fichas1 = document.getElementsByName('targetgroup1');
        for (let ficha of fichas1) {
            if (ficha.checked) {
                ficha1 = ficha.value;
            }
        }

        urlFichaAgua = "./img/" + ficha1 + ".png";

        //Agua
        //Ficha
        let fichas2 = document.getElementsByName('targetgroup2');
        for (let ficha of fichas2) {
            if (ficha.checked) {
                ficha2 = ficha.value;
            }
        }

        urlFichaFuego = "./img/" + ficha2 + ".png";


        iniciar();
    });

    let btnGameOut = document.querySelector("#btn-volver");
    btnGameOut.addEventListener("click", function(event) {
        heroTitleJugarOpciones.style.display = 'block';
        contentCanvas.style.display = 'none';
        canvas.style.display = 'none';
        figures = [];
    });



    //Iniciar juego...
    /* iniciar(); */

    function iniciar() {

        timer = TIEMPO_JUEGO;
        //Reescribo los valores originales del juego.
        tokensPlayed = 0;
        turnoAgua.innerHTML = "";
        turnoFuego.innerHTML = "";
        NUM_FIG = boardCol * boardFil;
        boardWidth = (canvasWidth / 2) - (boardCol / 2) * SIZE_FIG - SIZE_FIG;
        boardHeight = canvasHeight / 2 - SIZE_FIG * 4;

        dropWidth = boardWidth;
        dropHeight = boardHeight - SIZE_FIG;

        circlesWidth = boardWidth;
        circlesHeight = canvasHeight / 2;

        imgf1.src = urlFichaAgua;
        imgf2.src = urlFichaFuego;

        //Creo las figures...

        /*   switch (WINNER_NUMBER) {
              case 4:
                  boardFil = 6;
                  boardCol = 6;
                  break;
              case 5:
                  boardFil = 7;
                  boardCol = 7;
                  break;
              case 6:
                  boardFil = 8;
                  boardCol = 8;
                  break;
              case 7:
                  boardFil = 9;
                  boardCol = 9;
                  break;
          } */

        //Matriz del tablero
        for (let x = 0; x < boardFil; x++) {
            for (let y = 0; y < boardCol; y++) {
                boardWidth += SIZE_FIG;
                addCirculo(boardWidth, boardHeight);
            }
            boardWidth -= SIZE_FIG * boardCol;
            boardHeight += SIZE_FIG;
        }

        //Creo arreglo donde seria la "Zona soltar aqui"
        for (let x = 0; x < boardCol; x++) {
            dropWidth += SIZE_FIG;
            addZonaSoltar(dropWidth, dropHeight);
        }

        /* let posA = posYP1;
        let posF = posYP2; */
        //Crear las fichas de cada jugador
        for (let i = 0; i < NUM_FIG / 2; i++) {
            /*  let _posX = SIZE_FIG / 2 + Math.round(Math.random() * circlesWidth);
             let _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight); */
            let _color = imgf1;
            addFicha(_color, true, "Agua", posXP1, posYP1, colorAgua);
            /* posA = posA + 5; */

            /* _posX = canvasWidth - SIZE_FIG / 2 - Math.round(Math.random() * circlesWidth);
            _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight); */
            _color = imgf2;
            addFicha(_color, true, "Fuego", posXP2, posYP2, colorFuego);
            /* posF = posF + 5; */
        }

        //crear las 2 fichas que voy a mostrar en la zona "Turno de:"
        /* addFicha(imgf1, true, 1, posXP1, posYP2); */
        id_P1 = getFigureByCoord(posXP1, posYP1);
        /* figures[id_P1].setIsClickable(false);
        figures[id_P1].setHighlighted(true); */

        /* addFicha(imgf2, true, 2, posXP2, posYP2); */
        id_P2 = getFigureByCoord(posXP2, posYP2);
        /* figures[id_P2].setIsClickable(false);
        figures[id_P2].setHighlighted(true); */

        drawFigures();

        //Iniciar eventos...
        btnReiniciar.addEventListener("click", reiniciar);
        canvas.addEventListener("mousedown", onmousedown, false);
        canvas.addEventListener("mousemove", onmousemove, false);
        canvas.addEventListener("mouseup", onmouseup, false);
        console.log(figures);

        clearTimeout(timerId);
        timeControl();
    }

    //Mouse events
    function onmousedown(event) {
        isMouseDown = true;
        let mousePos = getMousePos(event);
        let x = mousePos.x;
        let y = mousePos.y;
        if (lastClickedFigure != null) {
            lastClickedFigure.setHighlighted(false);
            lastClickedFigure = null;
        }

        let clickedFigure = findClickedFigure(x, y);
        console.log(x);
        if (clickedFigure != null) {
            clickedFigure.setHighlighted(true);
            lastClickedFigure = clickedFigure;
        }

        /* //Hizo click en reiniciar?
        if ((event.layerX >= btnReiniciarX) && (event.layerY <= btnReiniciarY)) {
            figures = [];
            iniciar();
        }
    
        //Hizo click en tablero de 6X6?
        if ((event.layerX >= btnSmallX) && ((event.layerY <= btnSmallY) && (event.layerY > btnTableroY))) {
            boardCol = 6;
            boardFil = 6;
            figures = [];
            iniciar();
        }
    
        //Hizo click en tablero de 7X7?
        if ((event.layerX >= btnMediumX) && ((event.layerY <= btnMediumY) && (event.layerY > btnSmallY))) {
            boardCol = 7;
            boardFil = 7;
            figures = [];
            iniciar();
        }
    
        //Hizo click en tablero de 8X8?
        if ((event.layerX >= btnBigX) && ((event.layerY <= btnBigY) && (event.layerY > btnMediumY))) {
            boardCol = 8;
            boardFil = 8;
            figures = [];
            iniciar();
        } */

        drawFigures();
    }

    function onmousemove(event) {
        let mousePos = getMousePos(event);
        let x = mousePos.x;
        let y = mousePos.y;
        if (isMouseDown && lastClickedFigure != null) {
            lastClickedFigure.setPosition(x, y);
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

    function getMousePos(event) {
        let ClientRect = canvas.getBoundingClientRect();
        return { //objeto
            x: Math.round(event.clientX - ClientRect.left), //canvas.offsetLeft
            y: Math.round(event.clientY - ClientRect.top) //canvas.offsetTop
        }
    }

    /* function isTokenInsideDroppingZone(figura) {
        let x = figura.getPosX();
        let y = figura.getPosY();
        for (let px = 0; px < boardFil; px++) {
            for (let py = 0; py < boardCol; py++) {
                dropWidth += SIZE_FIG;
    
                let isInside = !(x < px || x > px + SIZE_FIG || y < py || y > py + SIZE_FIG);
                //Ubica la ficha en el centro de la columna de la "Zona Soltar";
                if (isInside == true) {
                    figura.setPosition(px, py);
                }
                return isInside;
            }
        }
    } */

    //Funcion encargada de controlar el tiempo de partida
    function timeControl() {
        if (timer > 0) {
            timerId = setTimeout(timeControl, 1000);
            timer--;
            let minutes = Math.floor(timer / 60);
            let segundos = timer % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            document.querySelector(".timer").innerHTML = minutes + ' : ' + segundos;
        }

        if (timer === 0) {
            clearTimeout(timerId);
            endGameEmpate();
        }
    }

    //Dibujar figures..
    function addCirculo(x, y) {
        let color = urlTab;
        let circulo = new Circulo(x, y, SIZE_FIG, SIZE_FIG, color, ctx);
        figures.push(circulo);
    }

    function addFicha(_color, _turn, _player, _posX, _posY, colorFondo) {
        let ficha = new Ficha(_player, _turn, _posX, _posY, SIZE_FIG / 2, _color, ctx, colorFondo);
        figures.push(ficha);
    }

    function addZonaSoltar(x, y) {
        let zona = new ZonaSoltar(x, y, SIZE_FIG, SIZE_FIG /* boardHeight - (boardFil * SIZE_FIG) */ , 0, ctx);
        figures.push(zona);
    }

    //Funciones auxiliares

    function drawFigures() {
        clearCanvas();
        /* addButtonsAndTexts(); */
        for (let i = 0; i < figures.length; i++) {
            if (figures[i] != lastClickedFigure) {
                figures[i].draw(ctx);
            }
        }
        if (lastClickedFigure != null) {
            lastClickedFigure.draw(ctx);
        }
    }

    function clearCanvas() {
        if (background.src === "") {
            background.src = urlBackground;
            let cargarImg = function() {
                ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
            }
            background.onload = cargarImg.bind(this);
        } else {
            ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        }
    }

    /* function addButtonsAndTexts() {
        ctx.font = "30px Arial";
        ctx.fillText("Turno de: ", 20, 60);
    
        ctx.font = "25px Arial";
        ctx.fillText("-reiniciar-", btnReiniciarX, btnReiniciarY);
    
    } */

    //Clickear tablero/imagen para empezar el juego.
    function findClickedFigure(x, y) {
        for (let index = 0; index < figures.length; index++) {
            const element = figures[index];
            if (element.isPointedInside(x, y)) {
                return element;
            }
        }
    }

    //Si una ficha fue soltada arriba del tablero la corro para que no estorbe!
    function isInBoardZone(token) {
        for (let i = 0; i < figures.length; i++) {
            const element = figures[i];
            if (element.isTokenInside(token.getPosX(), token.getPosY())) {
                //quizas mejora: reubicar la ficha en la zona de pilita de fichas original (izq o derecha)
                token.setPosition(
                    figures[i].getPosX() -
                    (figures[i].getPosX() - token.getPosX()),
                    boardHeight + SIZE_FIG
                );
                return true;
            }
        }
        return false;
    }

    //Devuelvo el "id" de una figura en (x, y)
    function getFigureByCoord(x, y) {
        for (let i = 0; i < figures.length; i++) {
            if (figures[i].getPosX() == x && figures[i].getPosY() == y) {
                return i;
            }
        }
        return null;
    }

    function endGame() {
        for (let i = 0; i < figures.length; i++) {
            figures[i].setIsClickable(false);
        }
        figures[id_P1].setHighlighted(false);
        figures[id_P2].setHighlighted(false);
        let win = lastClickedFigure;
        clearTimeout(timerId);
        result.style.display = 'flex';
        result.innerHTML = 'Ganó ' + win.getPlayer();
    }

    function endGameEmpate() {
        for (let i = 0; i < figures.length; i++) {
            figures[i].setIsClickable(false);
        }
        figures[id_P1].setHighlighted(false);
        figures[id_P2].setHighlighted(false);
        result.style.display = 'flex';
        result.innerHTML = 'Juego Empatado ';
    }

    function reiniciar() {
        figures = [];
        result.style.display = 'none';
        iniciar();
    }





    //LOGICA

    //Checkeos de donde ubicar ficha
    //Checkeo si una ficha fue soltada en la zona habilitada para realizar la jugada.
    function isInDroppingZone(lastDroppedFigure) {
        for (let index = 0; index < figures.length; index++) {
            let token = figures[index];
            if (token.isTokenInsideDroppingZone(lastDroppedFigure)) {
                if (placeDroppedToken(lastDroppedFigure)) {
                    switchPlayerTurns(lastDroppedFigure)
                    return true;
                }
            }
        }
        return false;
    }

    //Ubico la ficha depositada en la dropping zone donde corresponda!
    function placeDroppedToken(lastDroppedFigure) {
        let dropped = false;
        //itero de atras para adelante para checkear de abajo hacia arriba si hay fichas en el tablero
        for (let index = figures.length - 1; index >= 0; index--) {
            //me aseguro de estar checkeando unicamente celdas del tablero y no una ficha random en la misma altura por ejemplo
            if (
                figures[index].getPosX() == lastDroppedFigure.getPosX() && // (figura en la misma columna que la ficha)
                figures[index].getPosY() > lastDroppedFigure.getPosY() && // (figura no tiene que estar arriba del tablero) 
                figures[index].getPosY() < boardHeight + boardFil * (SIZE_FIG + 1) //(la figura no puede estar abajo del tablero)
            ) {
                //celda vacia? -> si: ubico la ficha en esa nueva pos 
                if (!figures[index].alreadyHasCircleInside()) {
                    dropped = true;
                    lastDroppedFigure.setIsClickable(false);
                    lastDroppedFigure.setPosition(
                        figures[index].getPosX() + SIZE_FIG / 2,
                        figures[index].getPosY() + SIZE_FIG / 2
                    );
                    tokensPlayed++;
                    return true;
                }
            }
        }
        //La columna donde intente depositar la ficha estaba llena
        if (dropped == false) {
            lastDroppedFigure.setIsClickable(true);
            lastDroppedFigure.setPosition(lastDroppedFigure.getPosX() + SIZE_FIG / 2, boardHeight + SIZE_FIG);
            return false;
        }
    }


    function switchPlayerTurns(lastDroppedFigure) {
        let player = lastDroppedFigure.getPlayer();
        for (let i = 0; i < figures.length; i++) {
            if (figures[i].getPlayer() == player) {
                figures[i].setTurn(false);
                figures[id_P1].setHighlighted(true);
                figures[id_P2].setHighlighted(false);
                if (player == "Fuego") {
                    turnoAgua.innerHTML = "Turno Agua";
                    turnoFuego.innerHTML = "";
                } else {
                    turnoFuego.innerHTML = "Turno Fuego";
                    turnoAgua.innerHTML = "";
                }

            } else {
                figures[i].setTurn(true);
                figures[id_P1].setHighlighted(false);
                figures[id_P2].setHighlighted(true);
            }
        }
    }

    //#endregion

    //#region checkeos de game-over
    //Checkear despues de cada ficha colocada si se terminó el juego
    function isGameOver(lastFigureInserted) {
        if (
            isWinnerByFil(lastFigureInserted) ||
            isWinnerByCol(lastFigureInserted) ||
            isWinnerByDiagonal(lastFigureInserted)
        ) {
            return true;
        }
        if (isTieGame()) {
            /* alert("Juego Empatado!"); */
            endGameEmpate();
        }
        return false;
    }


    function isTieGame() {
        if (tokensPlayed == NUM_FIG) {
            return true;
        }
    }

    function isWinnerByCol(lastFigureInserted) {
        let x = lastFigureInserted.getPosX();
        let y = lastFigureInserted.getPosY();
        let player = lastFigureInserted.getPlayer();
        let paintWinner = false;

        if (recuCol(x, y, player, lastFigureInserted, paintWinner) >= WINNER_NUMBER) {
            paintWinner = true;
            let aux = recuCol(x, y, player, lastFigureInserted, paintWinner);
            return true;
        }
    }

    function isWinnerByFil(lastFigureInserted) {
        let x = lastClickedFigure.getPosX() - SIZE_FIG / 2; //posX de la celda que contiene la ultima ficha insertada!
        let y = lastFigureInserted.getPosY() - SIZE_FIG / 2; //posY de la celda que contiene la ultima ficha insertada!
        let player = lastFigureInserted.getPlayer();
        let paintWinner = false;

        let leftRowCount = recuRowLeft(x, y, player, lastFigureInserted, paintWinner);
        let rightRowCount = recuRowRight(x, y, player, lastFigureInserted, paintWinner);

        if ((leftRowCount + rightRowCount - 1) >= WINNER_NUMBER) {
            paintWinner = true;
            leftRowCount = recuRowLeft(x, y, player, lastFigureInserted, paintWinner);
            rightRowCount = recuRowRight(x, y, player, lastFigureInserted, paintWinner);
            return true;
        }
    }


    function isWinnerByDiagonal(lastFigureInserted) {
        let x = lastClickedFigure.getPosX() - SIZE_FIG / 2; //posX de la celda que contiene la ultima ficha insertada!
        let y = lastFigureInserted.getPosY() - SIZE_FIG / 2; //posY de la celda que contiene la ultima ficha insertada!
        let player = lastFigureInserted.getPlayer();
        let paintWinner = false;

        let leftUpDiag = recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner);
        let rightDownDiag = recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner);

        let rightUpDiag = recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner);
        let leftDownDiag = recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner);

        if ((leftUpDiag + rightDownDiag - 1) >= WINNER_NUMBER) {
            paintWinner = true;
            leftUpDiag = recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner);
            rightDownDiag = recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner);
            return true;
        }

        if ((rightUpDiag + leftDownDiag - 1) >= WINNER_NUMBER) {
            paintWinner = true;
            rightUpDiag = recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner);
            leftDownDiag = recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner);
            return true;
        }
    }

    //#endregion

    //#region funciones recursivas de los 7 posibles casos ganadores

    function recuCol(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if (y < boardHeight) {
            let indexCell = getFigureByCoord(x, y);
            //checkeo si es el mismo jug
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x, y);
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuCol(x, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }

    function recuRowLeft(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if (x > boardWidth) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuRowLeft(x - SIZE_FIG, y, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }

    function recuRowRight(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if (x <= boardWidth + (SIZE_FIG * boardCol)) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuRowRight(x + SIZE_FIG, y, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }


    function recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if ((y >= boardHeight - (boardFil * SIZE_FIG)) && (x <= (boardWidth + (boardCol * SIZE_FIG)))) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuDiagRightUp(x + SIZE_FIG, y - SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }

    function recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if ((y < boardHeight) && (x <= (boardWidth + (boardCol * SIZE_FIG)))) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuDiagRightDown(x + SIZE_FIG, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }

    function recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if ((y < boardHeight) && (x > boardWidth)) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuDiagLeftDown(x - SIZE_FIG, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }

    function recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner) {
        //Estoy dentro del tablero?
        if ((y >= boardHeight - (boardFil * SIZE_FIG) && (x > boardWidth))) {
            //checkeo si es el mismo jug
            let indexCell = getFigureByCoord(x, y);
            if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
                if (paintWinner == true) {
                    indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                    figures[indexCell].setHighlighted(true);
                    figures[indexCell].setHighlightedStyle("green");
                }
                return recuDiagLeftUp(x - SIZE_FIG, y - SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
            }
            return 0;
        }
        return 0;
    }
}