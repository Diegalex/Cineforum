//Funciones viejas:

/*
entradaSelect = document.getElementById("tipoSelec")
entrada = document.getElementById("tipoEntrada")
entrada.addEventListener("change", function () {
    entradaSelect.value = entrada.value
})
*/

/*
cantidadSelect = document.getElementById("cantidadSelec")
cantidad = document.getElementById("cant")
cantidad.addEventListener("change", function () {
    cantidadSelect.value = cantidad.value
})
*/

//Tipo de entrada para el form
function setTipoEntradas() {
    let entradaSelect = document.getElementById("tipoSelec");
    let entrada = document.getElementById("tipoEntrada");
    entradaSelect.value = entrada.value;
    return entrada.value !== ""; // devuelve true si hay valor para luego comprobar en el submit
}
document.getElementById("tipoEntrada").addEventListener("change", setTipoEntradas);

// Función que setea la cantidad de entradas en el form
function setCantidadEntradas() {
    var cantidadSelect = document.getElementById("cantidadSelec");
    var cantidad = document.getElementById("cant");
    cantidadSelect.value = cantidad.value;
    return cantidad.value !== "" && cantidad.value > 0; 
}

document.getElementById("cant").addEventListener("change", setCantidadEntradas);

formulario = document.getElementById("formCine");
formulario.addEventListener("submit", function (e) {
    //TODO
    //Comprobar que todos los campos son correctos, else:
    e.preventDefault();
    alert("Introduce todas las opciones.")
})

//Tarjeta de sesion funcionalidad de botón.
sesionSeleccionada = null; //para luego form

function seleccionarSesion(card) {

    let tarjetas = document.querySelectorAll('.sesionCard'); //guardado as array todas las tarjetas
    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].classList.remove('active'); //le quita la clase active que es la que da la funcionalidad de como si fuera boton
    }

    card.classList.add('active'); //se añade la clase active a la clickada

    //Closest -> Obtiene el contenedor padre mas cercano de dentro de los parametros
    let peli = card.closest('.peli1, .peli2, .peli3').querySelector('h1').textContent;

    document.getElementById('peliculaSelec').value = peli;
    document.getElementById('sesionSelec').value = card.dataset.sesion;

    //Overwrite variable global
    sesionSeleccionada = {
        pelicula: peli, //peli guardada como string
        sesion: card.dataset.sesion //obtiene data - sesion establecido en el HTML
    };

    return sesionSeleccionada;

}


botonesSesion = document.querySelectorAll('.sesionCard');
for (let i = 0; i < botonesSesion.length; i++) {
    botonesSesion[i].addEventListener('click', function() {
        seleccionarSesion(this);
        console.log(sesionSeleccionada); // siempre contiene la última selección
    });
}


//TODO:

// DOM/DOM -> Resumen Entradas

// Añadir métodos no vistos en clase