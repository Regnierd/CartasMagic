/**
 * Funcion que crea un objeto Ajax determinado
 * @returns objetoAjax
 */
function crearAjax() {
    var objetoAjax = null; // será el objeto a crear 
    try {
        objetoAjax = new XMLHttpRequest(); // navegadores estándar 
    } catch (error1) {
        try {
            objetoAjax = new ActiveXObject("Microsoft.XMLHTTP"); // IE con librería MSXML 2.0 o superior 
        } catch (error2) {
            try {
                objetoAjax = new ActiveXObject("Msxml12.XMLHTTP"); // IE con librería MSXML 1.2 
            } catch (error3) {
                objetoAjax = false; // no hemos logrado crear el objeto, retornamos false 
            }
        }
    }
    return objetoAjax; // devolvemos el objeto 
}


document.getElementById("login").addEventListener("click", crearPeticion);

/**
 * Funcion que crea la peticion usando ajax llamando al servidor
 * @param {*} e 
 * @returns la respuesta
 */
function crearPeticion(e) {
    e.preventDefault();
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    //datos para el envio por POST:
    let misDatos = "usuario=" + usuario + "&password=" + password;
    let objetoAjax = crearAjax();

    objetoAjax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = this.responseText;
            let respuestaJSON = JSON.parse(respuesta);
            //console.log("respuesta: ", respuestaJSON);
            if (respuestaJSON["validacion"]) {
                window.location.href = "";
                //Ponemos true sustituyendo el token que me debería de dar el servidor
                setCookie("userCookie", true, 1000);
            }else{
                var respuestaError = document.getElementById("respuesta");
                respuestaError.className += " alert alert-danger";
                respuestaError.innerHTML = "Error al loguearse, intentelo de nuevo";
            }
        }
    }

    objetoAjax.open("POST", "http://172.19.99.138/PHP/login.php", true);
    objetoAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objetoAjax.setRequestHeader("Content-length", misDatos.length);
    objetoAjax.setRequestHeader("Connection", "close");
    objetoAjax.send(misDatos);

    return respuesta;
}

//Evento para eliminar la cookie y el localStorage
document.getElementById("logout").addEventListener("click", function () {
    deleteCookie("userCookie");
    var existeNombre = localStorage.getItem("DeckUsuario");           
    if(existeNombre){
        localStorage.removeItem("DeckUsuario");
    }
    window.location.href = "index.html";
})

/**
 * Funcion para crear la cookie
 * @param {string} cookieName 
 * @param {boolean} cookieValue 
 */
function setCookie(cookieName, cookieValue, expireDay) {
    var date = new Date();
    //tenemos que sumar a 'date' los MILISEGUNDOS que son los dias que quedemos que caduque
    date.setTime(date.getTime() + (expireDay * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

/**
 * Funcion para borrar la cookie
 * @param {string} nombre 
 */
function deleteCookie(nombre) {
    setCookie(nombre, "", -1);
}

/**
 * Funcion para obtener una cookie
 * @param {string} cookieName 
 * @returns 
 */
function getCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
   
    for (var i = 0; i < allCookieArray.length; i++) {    
        var temp = allCookieArray[i].trim();         
        if (temp.indexOf(name) == 0) {           
            //Devuelve el valor de la cookie si existe
            return temp.substring(name.length, temp.length);
        }

    }
    return "";
}








