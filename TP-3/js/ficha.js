"use strict";

class Ficha extends Figura{

    constructor(player, turn, posX, posY, radio, fill, context){
        super(posX, posY, fill, context);
        this.player = player;
        this.turn = turn;
        this.isClickable = true;
        this.highlighted = false;
        this.highlightedStyle = 'yellow';
        this.radio = radio;
        this.urlimage = fill;
        this.image = new Image();
    }

    draw(){
        super.draw();

        if(this.image.src === ""){
            this.image.src = this.urlimage;
            let loadImg = function (){
                this.context.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, SIZE_FIG, SIZE_FIG / 2);
            }
            this.image.onload = loadImg.bind(this);
        }
        else{
            this.context.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, SIZE_FIG / 2, SIZE_FIG / 2);
        }

        if (this.highlighted === true) {
            this.context.strokeStyle = this.highlightedStyle;
            this.context.stroke();
        }

        this.context.strokeStyle = "Black";
        this.context.stroke();
        this.context.closePath();
    }

    getRadio(){
        return this.radio;
    }

    getPlayer(){
        return this.player;
    }

    setIsClickable(param){
        this.isClickable = param;
    }

    setTurn(param){
        this.turn = param;
    }

    isPointedInside(x, y){
        if((this.isClickable == true) && (this.turn == true)){
            let _x = this.posX - x;
            let _y = this.posY - y;
            let isInside = Math.sqrt(_x * _x + _y * _y) < this.radio;
            return isInside;
        }
    }

}