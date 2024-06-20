let numeroSecreto = 0;
let contadorDeIntentos = 1;
let listaNumerosAleatorios = [];
let numeroMaximo = 10;
let intentosMaximos = 5;

// definición de función >> encapsulamiento de una acción que se quiere hacer
function exhibeMensajeInicial (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento () {
    let numeroDelUsuario = parseInt(
      document.getElementById("valorUsuario").value
    );
    if(numeroDelUsuario === numeroSecreto) {
        exhibeMensajeInicial(
          ".texto__parrafo",
          `¡Has acertado el número en ${contadorDeIntentos} ${(contadorDeIntentos > 1) ? "intentos": "intento"}!`
        );
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        // si el usuario no acertó:
        if(numeroDelUsuario > numeroSecreto) {
            exhibeMensajeInicial(
            ".texto__parrafo",
            "¡Déjame darte una pista! El número secreto es menor"
            );
        } else {
            exhibeMensajeInicial(
            ".texto__parrafo",
            "¡Déjame darte una pista! El número secreto es mayor"
            );
        }
        contadorDeIntentos++;
        if(contadorDeIntentos > intentosMaximos) {
            exhibeMensajeInicial(".texto__parrafo", "Has alcanzado el número de intentos :(");
            document.getElementById("reiniciar").removeAttribute("disabled");
        }
        inputReset();
    }
    return;
}

function inputReset () {
    document.getElementById("valorUsuario").value = "";
}

function generaNumeroSecreto () {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    
    console.log(listaNumerosAleatorios);
    // verifica si ya se han sorteado todos los números posibles
    if (listaNumerosAleatorios.length == numeroMaximo) {
      exhibeMensajeInicial(
        ".texto__parrafo",
        "Se han sorteado todos los números posibles."
      );
    } else {
      // si el número generado se encuentra en la lista
      if (listaNumerosAleatorios.includes(numeroGenerado)) {
        return generaNumeroSecreto();
      } else {
        // si el número generado no está incluído en la lista de números, lo agrega
        listaNumerosAleatorios.push(numeroGenerado);
        return numeroGenerado;
      }
    }
    
    
}

function condicionesIniciales () {
    exhibeMensajeInicial("h1", "¡Adivina el número secreto!");
    exhibeMensajeInicial(
      ".texto__parrafo",
      `Indicame un número del 1 al ${numeroMaximo}`
    );
    numeroSecreto = generaNumeroSecreto();
    contadorDeIntentos = 1;
    
}

function reiniciarJuego () {
    // reestablece el input
    inputReset();
    // reestablece las condiciones del inicio de partida 
    condicionesIniciales();
    // deshabilita el botón de nuevo juego
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
