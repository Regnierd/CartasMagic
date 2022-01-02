//Cargamos el localStorage nada mas cambiar de página a myDeck
var deckUsuario = cargarLocalStorage();
mostrarDeck(deckUsuario);

//Ocultamos y mostramos elementos en situacion de la cookie
if(getCookie("userCookie")){ 
    var login = document.getElementById("loginButton");
    login.className += " disabled";
}else{
    var logout = document.getElementById("logout");
    logout.className += " disabled";   
}

/**
 * Funcion para mostrar cada carta del deck del usuario
 * @param {array} arrayCartas
 */
function mostrarDeck(deckUsuario){
    var carta = document.getElementById("card-container");
    //Limpiamos pantalla (template de cartas) para cada vez que cambiemos de deck 
    carta.innerHTML = "";

    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-carta").content;
    

    //forEach para obtener algunos datos del array cartas, cartas.data para obtener el array del objeto
    deckUsuario.getCartas.forEach(element => {
        var imgNormal = element.getCarta.getImg;
        var tipo = element.getCarta.getTipo
        var cantidad = element.getCantidad;
        var scryfall = element.getCarta.getScryfall;
        for (let i = 0; i < cantidad; i++) {
            template.querySelector("img").setAttribute("src", imgNormal);
            template.querySelector("a").setAttribute("href", scryfall);
            template.querySelector("h5").textContent = tipo;
                      
            const clone = template.cloneNode(true);
            fragment.appendChild(clone);        
        }
                
    });
    carta.appendChild(fragment);
}

/**
 * Funcion para mostrar cada carta del deck del usuario
 * @param {array} arrayCartas
 */
 function mostrarCartasPorColor(deckUsuario){
    var carta = document.getElementById("card-container");
    //Limpiamos pantalla (template de cartas) para cada vez que cambiemos de deck 
    carta.innerHTML = "";

    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-carta").content;
    

    //forEach para obtener algunos datos del array cartas, cartas.data para obtener el array del objeto
    deckUsuario.forEach(element => {
        var imgNormal = element["carta"]["img"];
        var tipo = element["carta"]["tipo"];   
        var cantidad = element["cantidad"];

        for (let i = 0; i < cantidad; i++) {
            template.querySelector("img").setAttribute("src", imgNormal);
            template.querySelector("h5").textContent = tipo;
                           
            const clone = template.cloneNode(true);
            fragment.appendChild(clone);        
        }
                
    });
    carta.appendChild(fragment);
}

/**
 * Funcion para mostrar cada carta del deck del usuario
 * @param {array} arrayCartas
 */
 function mostrarCartasPorRareza(deckUsuario){
    var carta = document.getElementById("card-container");
    //Limpiamos pantalla (template de cartas) para cada vez que cambiemos de deck 
    carta.innerHTML = "";

    const fragment = document.createDocumentFragment(); 
    //Creamos el template a partir del id plantilla-carta
    const template = document.querySelector("#plantilla-carta").content;
    

    //forEach para obtener algunos datos del array cartas, cartas.data para obtener el array del objeto
    deckUsuario.forEach(element => {
        var imgNormal = element["carta"]["img"];
        var tipo = element["carta"]["tipo"];   
        var cantidad = element["cantidad"];

        for (let i = 0; i < cantidad; i++) {
            template.querySelector("img").setAttribute("src", imgNormal);
            template.querySelector("h5").textContent = tipo;
                           
            const clone = template.cloneNode(true);
            fragment.appendChild(clone);        
        }
                
    });
    carta.appendChild(fragment);
}



/**
 * Funcion para filtrar por color y mostrar las cartas de ese color
 * @param {char} valor
 */
function mostrarPorColor(valor){
    var arrayColor = [];
    deckUsuario.getCartas.forEach(element =>{
        var color = element.getCarta.getColor;
        if(color == valor){
            arrayColor.push(element);
            mostrarCartasPorColor(arrayColor);
        }
        if(valor == "all"){
            mostrarDeck(deckUsuario);
        }
        if(valor == "" && color == undefined){
            arrayColor.push(element);
            mostrarCartasPorColor(arrayColor);
        }
        
    });  
}

/**
 * Funcion para filtrar por rareza y mostrar las cartas de ese rareza
 * @param {char} valor
 */
 function mostrarPorRareza(valor){
    var arrayRareza = [];
    deckUsuario.getCartas.forEach(element =>{
        var rareza = element.getCarta.getRareza;
        if(rareza == valor){
            arrayRareza.push(element);
            mostrarCartasPorRareza(arrayRareza);
        }
    
        
    });  
}

/**
 * Funcion para cambiar el valor de los options y mostrar las cartas por color
 */
function cambioColor(){
    var valor = document.getElementById("selectColor").value;
    mostrarPorColor(valor);
}

/**
 * Funcion para cambiar el valor de los options y mostrar las cartas por rareza
 */
 function cambioRareza(){
    var valor = document.getElementById("selectRareza").value;
    mostrarPorRareza(valor);
}


