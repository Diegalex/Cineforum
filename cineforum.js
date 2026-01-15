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
const formulario = document.getElementById("formCine");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const tipoEntrada = document.getElementById("tipoEntrada");
const cantidad = document.getElementById("cant");

let sesionSeleccionada = null; //para luego form

//Tipo de entrada para el form
function setTipoEntradas() {
    let entradaSelect = document.getElementById("tipoSelec");
    entradaSelect.value = entrada.value;
    return entrada.value !== ""; // devuelve true si hay valor para luego comprobar en el submit
}
document.getElementById("tipoEntrada").addEventListener("change", setTipoEntradas);

// Función que setea la cantidad de entradas en el form
function setCantidadEntradas() {
    var cantidadSelect = document.getElementById("cantidadSelec");
    cantidadSelect.value = cantidad.value;
    return cantidad.value !== "" && cantidad.value > 0; 
}

document.getElementById("cant").addEventListener("change", setCantidadEntradas);

//comprueba segun se va escribiendo el nombre e email si son validos te lo pone en verde, en caso contrario pone en rojo
nombre.addEventListener("input", function(){
    const nombreValor= nombre.value
    if(nombreValor.length<4||!nombreValor.includes(" ")){
        nombre.classList.add("msg-error");
        nombre.classList.add("campo-error")
        nombre.classList.remove("msg-ok")
        nombre.classList.remove("campo-ok")
    } 
    else{
        nombre.classList.add("msg-ok");
        nombre.classList.add("campo-ok");
        nombre.classList.remove("msg-error")
        nombre.classList.remove("campo-error")
    } 
})
 
//faltaria añadir alguna condicion mas en el coreo que no se me ocurre
correo.addEventListener("input", function(){
    const correoValor= correo.value
    if(!correoValor.includes("@")){
        correo.classList.add("msg-error");
        correo.classList.add("campo-error");
        correo.classList.remove("msg-ok")
        correo.classList.remove("campo-ok")
    } 
    else{
        correo.classList.add("msg-ok");
        correo.classList.add("campo-ok");
        correo.classList.remove("msg-error")
        correo.classList.remove("campo-error")
    } 
})


formulario.addEventListener("submit", function (e) {
    //TODO
    //Comprobar que todos los campos son correctos, else:

    mensaje=""
    nombreValor=nombre.value
    correoValor=correo.value
    tipoValor = tipoEntrada.value;
    cantidadValor = cantidad.value;
    if(nombreValor.length<4||!nombreValor.includes(" ")) mensaje+="Nombre no valido\n"
    if(!correoValor.includes("@")) mensaje+="correo no valido\n"
    if(sesionSeleccionada==null) mensaje+="sellecione pelicula y sesion\n"
    if (tipoValor === "") mensaje += "Seleccione tipo de entrada.\n";
    if (cantidadValor === "" || cantidadValor <= 0) mensaje += "Seleccione cuántas entradas desea comprar.\n";
    
    //añadir else de que si esta todo bien te cree la entrada
    if(mensaje.trim()!== ""){
        alert(mensaje)
        e.preventDefault();
    }
    
})

//Tarjeta de sesion funcionalidad de botón.

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