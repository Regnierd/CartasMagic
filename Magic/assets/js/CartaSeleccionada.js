class CartaSeleccionada {

    /**
     * Constructor de Carta Seleccionada
     * @param {Carta} carta 
     * @param {int} cantidad 
     */
    constructor(carta, cantidad){
        this.carta = carta;
        this.cantidad = cantidad;
    
    }
    
    //Getters y Setters
    get getCarta(){
        return this.carta;
    }

    set setCantidad(carta){
        this.carta = carta;
    }
    
    get getCantidad(){
        return this.cantidad;
    }

    set setCantidad(cantidad){
        this.cantidad = cantidad;
    }

    /*
    buscarCartaSeleccionada(id){
        var listaCartas = this.getCartas;
        var carta;
        listaCartas.forEach(element => {
            if(element["carta"]["id"] == id){
                carta = element;
            }
        });
        return carta;
    }*/
}