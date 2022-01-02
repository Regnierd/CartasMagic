class Carta{

    /**
     * Constructor de Carta
     * @param {string} id
     * @param {string} nombre 
     * @param {double} precio 
     * @param {string} deck 
     * @param {array} color 
     * @param {string} tipo 
     * @param {array} mana 
     * @param {int} fuerza 
     * @param {int} resistencia 
     * @param {string} img
     * @param {string} scryfall
     */
    constructor(id, nombre, precio, deck, color, tipo, mana, fuerza, resistencia, img, scryfall, rareza){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.deck = deck;
        this.color = color;
        this.tipo = tipo;
        this.mana = mana;
        this.fuerza = fuerza;
        this.resistencia = resistencia;
        this.img = img;
        this.scryfall = scryfall;
        this.rareza = rareza;
    }

    //Getters y Setters
    get getId(){
        return this.id;
    }

    set setId(id){
        this.id = id;
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }
    get getPrecio(){
        return this.precio;
    }

    set setPrecio(precio){
        this.precio = precio;
    }
    get getDeck(){
        return this.deck;
    }

    set setDeck(deck){
        this.deck = deck;
    }
    get getColor(){
        return this.color;
    }

    set setColor(color){
        this.color = color;
    }
    get getTipo(){
        return this.tipo;
    }

    set setTipo(tipo){
        this.tipo = tipo;
    }

    get getMana(){
        return this.mana;
    }

    set setMana(mana){
        this.mana = mana;
    }
    get getFuerza(){
        return this.fuerza;
    }

    set setFuerza(fuerza){
        this.fuerza = fuerza;
    }
    get getResistencia(){
        return this.resistencia;
    }

    set setResistencia(resistencia){
        this.resistencia = resistencia;
    }

    get getImg(){
        return this.img;
    }

    set setImg(img){
        this.img = img;
    }

    get getScryfall(){
        return this.scryfall;
    }

    set setScryfall(scryfall){
        this.scryfall = scryfall;
    }

    get getRareza(){
        return this.rareza;
    }

    set setRareza(rareza){
        this.rareza = rareza;
    }

}