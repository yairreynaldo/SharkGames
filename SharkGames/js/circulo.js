class Circulo extends Figura {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        this.urlimage = fill;
        this.image = new Image();
        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        if (this.image.src === "") {
            this.image.src = this.urlimage;
            let loadImg = function() {
                this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            }
            this.image.onload = loadImg.bind(this);

        } else {
            this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        }

    }

    //#region getters
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    //#endregion

    isTokenInside(x, y) {
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        return isInside;
    }

    //celda ya ocupada
    alreadyHasCircleInside() {
        let cellWithFigureInside = false;
        for (let index = 0; index < figures.length; index++) {
            if (figures[index] != this) {
                if ((!(figures[index].getPosX() <= this.posX || figures[index].getPosX() >= this.posX + this.width || figures[index].getPosY() <= this.posY || figures[index].getPosY() >= this.posY + this.height)) == true) {
                    return true;
                }
            }

        }
        return cellWithFigureInside;
    }

    getPlayer() {
        if (this.alreadyHasCircleInside()) {
            //obtengo coordenadas de la ficha de adentro..
            let x = this.getPosX() + (SIZE_FIG / 2);
            let y = this.getPosY() + (SIZE_FIG / 2);

            for (let index = 0; index < figures.length; index++) {
                //busco que ficha es la que tiene esas coordenadas
                if ((figures[index].getPosX() == x) && (figures[index].getPosY() == y)) {
                    return figures[index].getPlayer();

                }
            }

        }
        return 0;
    }

}