"use strict";

class ZonaSoltar extends Figura {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        /* this.urlimage = fill;
        this.image = new Image(); */
        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        /*  if (this.image.src === "") {
             this.image.src = this.urlimage;
             let loadImg = function() {
                 this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
             }
             this.image.onload = loadImg.bind(this);
         } else {
             this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
         } */
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isTokenInsideDroppingZone(figura) {
        let x = figura.getPosX();
        let y = figura.getPosY();
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        //Ubica la ficha en el centro de la columna de la "Zona Soltar";
        if (isInside == true) {
            figura.setPosition(this.posX, this.posY);
        }
        return isInside;
    }

}