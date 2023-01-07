"use strict";

class Ficha extends Figura {

    constructor(player, turn, posX, posY, radio, fill, context, color) {
        super(posX, posY, fill, context);
        this.player = player;
        this.turn = turn;
        this.isClickable = true;
        this.highlighted = false;
        this.highlightedStyle = 'yellow';
        this.radio = radio;
        this.image = fill;
        this.color = color;
    }

    draw() {
        /* super.draw(); */
        /* this.context.save(); */
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.drawImage(this.image, this.posX - 15, this.posY - 15, 30, 30);
        /* this.context.drawImage(this.image, this.posX - 15, this.posY - 15, 30, 30); */
        this.context.closePath();
        /* this.context.clip(); */
        /* this.context.restore(); */
        /* this.context.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, SIZE_FIG / 2, SIZE_FIG / 2); */
        /* this.context.stroke();
        
        this.context.strokeStyle = "Black"; */
        /* this.context.lineWidth = 3; */
        /* this.context.stroke(); */
    }

    getRadio() {
        return this.radio;
    }

    getPlayer() {
        return this.player;
    }

    setIsClickable(param) {
        this.isClickable = param;
    }

    setTurn(param) {
        this.turn = param;
    }

    isPointedInside(x, y) {
        if ((this.isClickable == true) && (this.turn == true)) {
            let _x = this.posX - x;
            let _y = this.posY - y;
            let isInside = Math.sqrt(_x * _x + _y * _y) < this.radio;
            return isInside;
        }
    }

}