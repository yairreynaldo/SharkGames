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
        alert("Juego Empatado!");
        return true;
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