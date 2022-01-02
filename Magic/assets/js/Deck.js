class Deck{

    /**
     * Constructor del Deck
     * @param {string} nombre 
     * @param {objeto} cartas 
     */
    constructor (nombre, cartas){
        this.nombre = nombre;
        this.cartas = cartas;
    }

    //Getters y Setters
    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getCartas(){
        return this.cartas;
    }

    set setCartas(cartas){
        this.cartas = cartas;
    }

    /**
     * Funcion para buscar una carta por su id
     * @param {string} id 
     * @returns carta
     */
    buscarCarta(id){
        var listaCartas = this.getCartas;
        var carta;
        listaCartas.forEach(element => {
            if(element.getId == id){
                carta = element;
            }
        });
        return carta;
    }

    /**
     * Funcion para buscar una carta seleccionada por su id
     * @param {string} id 
     * @returns carta
     */
    buscarCartaSeleccionada(id){
        var listaCartas = this.getCartas;
        var carta;
        listaCartas.forEach(element => {
            if(element.getCarta.getId == id){
                carta = element;
            }
        });
        return carta;
    }

    /**
     * Funcion para insertar una carta a la lista de cartas
     * @param {Carta} carta 
     */
    insertarCarta(carta){
        var listaCartas = this.getCartas; 
        listaCartas.push(carta);
    }

    /**
     * Funcion para eliminar una carta de la lista de cartas
     * @param {Carta} carta 
     */
    eliminarCarta(carta){
        var listaCartas = this.getCartas; 
        var indice = listaCartas.indexOf(carta);
        listaCartas.splice(indice, 1);
    }

    /**
     * Funcion para contar cuantas cartas hay en el deck del usuario
     * @param {Deck} deckUsuario 
     * @returns numero de cartas
     */
    contarCarta(deckUsuario){
        var maximoCarta = 0;
        for (let i = 0; i < deckUsuario.getCartas.length; i++) {
            maximoCarta += deckUsuario.getCartas[i].getCantidad;
            
        }

        return maximoCarta;
    }

    
}