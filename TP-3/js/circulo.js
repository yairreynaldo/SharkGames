class Circulo extends Figura{

    constructor(posX, posY, width, height, radio, fill, context){
        super(posX, posY, fill, context);
        this.radio = radio;
        this.width = width;
        this.height = height;
    }

    draw(){
        super.draw();
        this.context.strokeStyle = 'black';
                
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2, 0);
        this.context.fill();
        this.context.stroke();
    }

    //Getters
    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getRadio(){
        return this.radio;
    }

    isTokenInside(x, y){
        let isInside = !(x, this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        return isInside;
    }

    //celda ya ocupada
    alreadyHasCircleInside() {
        let cellWithFigureInside = false;
        for (let index = 0; index < figuras.length; index++) {
            if (figuras[index] != this) {
                if ((!(figuras[index].getPosX() <= this.posX || figures[index].getPosX() >= this.posX + this.width || figures[index].getPosY() <= this.posY || figures[index].getPosY() >= this.posY + this.height)) == true) {
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

            for (let index = 0; index < figuras.length; index++) {
                //busco que ficha es la que tiene esas coordenadas
                if ((figuras[index].getPosX() == x) && (figuras[index].getPosY() == y)) {
                    return figuras[index].getPlayer();

                }
            }

        }
        return 0;
    }

}