"use strict";

class Figura {

    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.param = false;
    }

    //Getters
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    //Setters

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setHighlighted(value) {
        this.highlighted = value;
    }

    setHighlightedStyle(style) {
        this.highlightedStyle = style;
    }

    //Metodos abstractos

    draw() {
        /* this.context.fillStyle = this.fill; */
    }

    setIsClickable(param) {}

    isPointedInside(x, y) {}

    isTokenInsideDroppingZone(figura) {}

    isTokenInside(figura) {}

    alreadyHasCircleInside() {}

    getPlayer() {}

    setTurn(param) {}

}