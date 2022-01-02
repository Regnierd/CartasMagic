/**
 * Funcion para crear el localStorage y guardar
 * el deck del usuario en sesión
 * @param {Deck} deckUsuario 
 */
function guardarLocalStorage(deckUsuario){
    localStorage.setItem("DeckUsuario", JSON.stringify(deckUsuario));
}

/**
 * Funcion para cargar el Local Storage
 * @param {Deck} deckUsuario 
 */
function cargarLocalStorage(){
    var datos = JSON.parse(localStorage.getItem("DeckUsuario"));
    var deck;
    if(datos == null){
        deck = new Deck("DeckUsuario", []);
        guardarLocalStorage(deck);
    }else{
        deck = cambiarAObjetoDeck(datos);     
    }
    return deck;
}

/**
 * Funcion para cambiar los datos del json obtenidos a objetos.
 * @param {json} datos 
 * @returns Deck
 */
function cambiarAObjetoDeck(datos){
    var cartas = datos["cartas"];
    var nuevasCartas = [];
    cartas.forEach(element => {
        var id = element["carta"]["id"];
        var nombre = element["carta"]["nombre"];
        var precio = element["carta"]["precio"];
        var deck = element["carta"]["deck"];
        var color = element["carta"]["color"];
        var tipo = element["carta"]["tipo"];
        var mana = element["carta"]["mana"];
        var fuerza = element["carta"]["fuerza"];
        var resistencia = element["carta"]["resistencia"];
        var cantidad = element["cantidad"];
        var img = element["carta"]["img"];
        var scryfall = element["carta"]["scryfall"];
        var rareza = element["carta"]["rareza"];
        var carta = new Carta(id, nombre, precio, deck, color, tipo, mana, fuerza, resistencia, img, scryfall, rareza);
        var cartaSeleccionada = new CartaSeleccionada(carta, cantidad);
        nuevasCartas.push(cartaSeleccionada);
    });
     
    var deck = new Deck("DeckUsuario", nuevasCartas);
    return deck;
}