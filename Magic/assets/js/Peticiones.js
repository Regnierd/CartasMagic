//Asignamos todas las apis en cada id del select del navbar
var ids = document.getElementsByClassName("api");
ids[0].setAttribute("id", "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints");
ids[1].setAttribute("id", "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints");
ids[2].setAttribute("id", "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints");
ids[3].setAttribute("id", "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints");
ids[4].setAttribute("id", "https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints");

//Ocultamos y mostramos elementos en situacion de la cookie
if(getCookie("userCookie")){
    document.getElementById("myDeck").style.display = "block";
    var login = document.getElementById("loginButton");
    login.className += " disabled";
}else{
    document.getElementById("myDeck").style.display = "none"; 
    var logout = document.getElementById("logout");
    logout.className += " disabled";
}

//Evento click para traer el deck pre-hecho pasandole la id de la url de la api
document.getElementById("select").addEventListener("click", function(elemento){
    const id = elemento.target.getAttribute("id");     
    traerDeck(id)
    .then(cartas => {      
        let arrayCartas = Array.from(cartas.data);
        crearCarta(arrayCartas);
        mostrarDeck(arrayCartas);     
    });   
});

/**
 * Funcion para traer el deck y activar el fetch
 * @param {string} url 
 * @returns array de cartas
 */
 async function traerDeck(url){
    const deck = await fetch(url);
    const cartas = await deck.json();

    return cartas;

 }

 //Peticion fetch por defecto
 traerDeck("https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints")
 .then(cartas => { 
    let arrayCartas = Array.from(cartas.data);
    crearCarta(arrayCartas);
    mostrarDeck(arrayCartas);
    
 });
 
var deck; //objeto deck
var carta; //objeto carta
var albumCartas = []; //album de todas las cartas
var albumDecks = []; //album de todos los decks
var deckUsuario = cargarLocalStorage();  //deck creado por el usuario
mostrarMiDeck(deckUsuario);

 /**
  * Funcion para crear el objeto carta
  * @param {array} arrayCartas
  */
function crearCarta(arrayCartas){
    
    arrayCartas.forEach(element => {
        var id = element["id"];
        var nombre = element["name"];
        var precio = element["prices"]["eur"];
        var nombreDeck = element["set_name"];
        var color = element["colors"][0];
        var tipo = element["type_line"];
        var mana = element["cmc"];
        var fuerza = element["power"];
        var resistencia = element["toughness"];
        var img = element["image_uris"]["normal"];
        var scryfall = element["scryfall_uri"];
        var rareza = element["rarity"];
        carta = new Carta(id, nombre, precio, nombreDeck, color, tipo, mana, fuerza, resistencia, img, scryfall, rareza);    
        albumCartas.push(carta);
    })
    
}

 /**
  * Funcion para mostrar cada carta del deck que nos dan pre-definido
  * @param {array} arrayCartas
  */
function mostrarDeck(arrayCartas){
    var carta = document.getElementById("card-container");
    //Limpiamos pantalla (template de cartas) para cada vez que cambiemos de deck 
    carta.innerHTML = "";

    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-carta").content;

    //forEach para obtener algunos datos del array cartas, cartas.data para obtener el array del objeto
    arrayCartas.forEach(element => {
        var imgNormal = element['image_uris']['normal'];
        var nombre = element['name'];
        var precio = element['prices']['eur'];
        template.querySelector("img").setAttribute("src", imgNormal);
        template.querySelector("h5").textContent = nombre;
        template.querySelector("p").textContent = precio;
        //al boton le damos un onclick llamando a la funcion add pasandole el elemento completo
        
        template.querySelector("button").id = element["id"]; 
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
      
    });
    carta.appendChild(fragment);

    var tituloDeck = document.getElementById("tituloDeck");
    var nombreDeck= arrayCartas[0]["set_name"];
    tituloDeck.innerHTML = nombreDeck;
   
    deck = new Deck(nombreDeck, albumCartas);
    albumDecks.push(deck);
}

 /**
  * Evento para agregar una carta a la tabla seleccionados
  * creando un objeto carta con los datos necesarios
  * y agregar cada carta a un array. 
  */
document.getElementById("card-container").addEventListener("click", function(element){
    var etiqueta = element.target;
    var maximoCarta = deck.contarCarta(deckUsuario);
    if(etiqueta.tagName == "BUTTON"){
        let cookie = getCookie("userCookie");
        if(cookie && cookie == "true"){
            var id = etiqueta.id;
            //Buscamos la carta por id y la devolvemos
            var cartaEncontrada = deck.buscarCarta(id);   
            var cartaSeleccionada = deckUsuario.buscarCartaSeleccionada(id);
            if(maximoCarta < 60){
                if(cartaSeleccionada == undefined){
                    cartaSeleccionada = new CartaSeleccionada(cartaEncontrada, 1);
                    deckUsuario.insertarCarta(cartaSeleccionada);
                                  
                }else{
                    sumar(id);
                    
                }
            }
            guardarLocalStorage(deckUsuario);
            mostrarMiDeck(deckUsuario);
            mostrarFooter(deck, deckUsuario, maximoCarta);
        }else{
            //alert("LOGUEATE " + cookie);
            document.getElementById("loginButton").click();
        } 
    }
    
});

/**
 * Funcion para comprobar la cantidad de una carta y sumarle una.
 * @param {Carta} cartaSeleccionada 
 */
function sumar(id){
    var cartaSeleccionada = deckUsuario.buscarCartaSeleccionada(id);
    if(cartaSeleccionada.getCantidad < 4){
        var cantidad = cartaSeleccionada.getCantidad;
        cartaSeleccionada.setCantidad = cantidad + 1;
    }
    guardarLocalStorage(deckUsuario);
    mostrarMiDeck(deckUsuario);
    mostrarFooter(deck, deckUsuario);
}

/**
 * Funcion para comprobar la cantidad de una carta y restarle una.
 * @param {Carta} cartaSeleccionada 
 */
 function restar(id){
    var cartaSeleccionada = deckUsuario.buscarCartaSeleccionada(id);
    if(cartaSeleccionada.getCantidad <= 4 && cartaSeleccionada.getCantidad >= 1){
        var cantidad = cartaSeleccionada.getCantidad;
        cartaSeleccionada.setCantidad = cantidad - 1;
        if(cartaSeleccionada.getCantidad == 0){
            deckUsuario.eliminarCarta(cartaSeleccionada);
        }      
    }
    
    if(deckUsuario.getCartas.length == 0){
        window.location.href = "";
    }
    guardarLocalStorage(deckUsuario);
    mostrarMiDeck(deckUsuario);
    mostrarFooter(deck, deckUsuario);
}

/**
 * Funcion para mostrar mi deck
 * @param {array} deckUsuario 
 */
function mostrarMiDeck(deckUsuario){
    var item = document.getElementById("items");
    item.innerHTML = "";
    //Creamos el fragment
    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-seleccionados").content;

    deckUsuario["cartas"].forEach(element => {
        template.querySelector("th").textContent = element["carta"]["nombre"];
        template.querySelectorAll("td")[0].textContent = element["carta"]["precio"];
        template.querySelectorAll("td")[1].textContent = element["cantidad"];
        template.querySelectorAll("button")[0].id = element["carta"]["id"];
        template.querySelectorAll("button")[1].id = element["carta"]["id"];
        template.querySelector("span").textContent = (element["carta"]["precio"]*element["cantidad"]).toFixed(2);
        
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
     

    item.appendChild(fragment);

   

}

/**
 * Funcion para mostrar el footer
 * @param {Deck} deck 
 * @param {Deck} deckUsuario 
 * @param {int} maximoCarta 
 */
function mostrarFooter(deck, deckUsuario, maximoCarta){
    
    var footer = document.getElementById("footer");
    
    footer.innerHTML = "";
    //Creamos el fragment
    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-inferior").content;
    
    var numCartas = deck.contarCarta(deckUsuario);
    
    template.querySelectorAll("td")[1].innerHTML = "<strong>Total cartas: </strong>" + numCartas;
    template.querySelectorAll("td")[2].innerHTML = "<strong>Total:</strong> €" + obtenerTotalPrecio();
    if(maximoCarta >= 60){
        template.querySelectorAll("td")[0].textContent = "No se puede tener más de 60 cartas en el deck!!";
    }else{
        template.querySelectorAll("td")[0].textContent = "";
    }
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

}

/**
 * Funcion para calcular el total del precio de todo el deck del usuario
 * @returns int
 */
function obtenerTotalPrecio(){
    var items = document.getElementById("items");
    var span = items.getElementsByTagName("span");
    
    let total = 0;
    for (let i = 0; i < span.length; i++) {
        total += parseFloat(span[i].firstChild.data);    
    }  
    
    return total.toFixed(2);
}


    

    

    

