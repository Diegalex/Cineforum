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

//comprueba segun se va escribiendo el nombre si son validos te lo pone en verde, en caso contrario pone en rojo
function validarNombre(){
    const nombreValor= nombre.value.trim() //trim del input del usuario 
    
    //^ -> inicio de cadena .+ -> uno o más caracteres Unicode de cualquier tipo
    //  \s -> espacio .+ -> (1,n) Unicode
    // $ -> fin cadena /u -> flag Unicode
    const regexNombre = /^.+\s.+$/u; //https://www.w3schools.com/js/js_regexp.asp

    if(nombreValor.length<4||!regexNombre.test(nombreValor)){
        nombre.classList.add("msg-error");
        nombre.classList.add("campo-error")
        nombre.classList.remove("msg-ok")
        nombre.classList.remove("campo-ok")
        return true;
    } 

    else{
        nombre.classList.add("msg-ok");
        nombre.classList.add("campo-ok");
        nombre.classList.remove("msg-error")
        nombre.classList.remove("campo-error")
    } 

    return false;
}

nombre.addEventListener("input",validarNombre);

//Función que valida el email dividiendolo en un array para realizar las comprobaciones
function validarEmail(){

    let correoValido = false; //init

    const correoValor= correo.value;
    const arrayCorreo = correoValor.split("@"); //Split en array con dos partes tras la @

    let user = "";
    let dominio = "";

    //aseguramos que tenemos dos objetos en el array
    if (arrayCorreo.length === 2){
        user = arrayCorreo[0]; //antes de @ -> user
        dominio = arrayCorreo[1]; //dominio despues de @
    }

    //campo de usuario con al menos un caracter
    //Dominio incluye ".", y hacemos split para comprobar que a cada lado del punto hay al menos un caracter
    //.every realiza comprobaciones, en este caso de longitud, entre cada objeto devuelto al suprimir el punto, comprobando que a ambos lados haya al menos un caracter
    if(user.length > 0 &&  dominio.includes(".") && 
        dominio.split(".").every(d => d.length > 0)){
            correoValido = true;
        }

    if (!correoValido) {
        correo.classList.add("msg-error", "campo-error");
        correo.classList.remove("msg-ok", "campo-ok");
    } else {
        correo.classList.add("msg-ok", "campo-ok");
        correo.classList.remove("msg-error", "campo-error");
    }

    return correoValido;
}

correo.addEventListener("input",validarEmail);

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

    // Extraer funciones definidas en la definicion de los eventos a funciones globales para poder realizar nuevamente las comprobaciones en el submit.
    // DOM/DOM -> Resumen Entradas
    // Añadir métodos no vistos en clase
//

//Comprobar e ir tachando
/*
REQUISITOS 
 FORMULARIO (HTML) debe contener al menos:

Un campo de texto
Un campo numérico
Un campo de tipo email
Un elemento select
Un grupo de checkbox o radio
Un textarea
Un botón de envío
Todos los campos deben tener su id y name
 

INTERACTIVIDAD (JAVASCRIPT)

Usar addEventListener con, al menos, los siguientes eventos:

input
change
click
submit

El envío del formulario debe controlarse con preventDefault.

VALIDACIONES Y EXPERIENCIA DE USUARIO
 

Validar: 

Longitud mínima de un campo de texto
Rango correcto en un campo numérico
Email válido
Select obligatorio
Al menos un checkbox marcado
 
Cuando un campo no sea válido, debe mostrarse un mensaje de error. El campo debe cambiar visualmente (color, borde, etc.)

No se deben usar alert como sistema principal de validación.

CREACIÓN Y ELIMINACIÓN DINÁMICA DE ELEMENTOS (DOM)
 

La aplicación debe  crear elementos dinámicamente (createElement, appendChild), y eliminar elementos del DOM (remove o removeChild)
 

Ejemplos: 

Añadir opciones a un select
Añadir o eliminar bloques o filas
Eliminar elementos incorrectos
 

BOTONES Y USO DEL BOM
 

Incluir al menos dos botones que utilicen funcionalidades del navegador, por ejemplo: 

Guardar datos (localStorage)
Restaurar datos
Recargar la página (location.reload)
Imprimir (window.print)
 
 MINI-COMPONENTES (FUNCIONES PROPIAS)
 Debes crear al menos dos funciones reutilizables propias, por ejemplo:
Una función que valide un campo
Una función que cree un elemento del DOM
Una función que muestre mensaje
Estas funciones deben usarse más de una vez en el código.

MÉTODOS O FUNCIONES NUEVAS
Utilizar al menos tres métodos o propiedades que no se hayan explicado directamente en clase, por ejemplo: 

closest
dataset
classList.toggle
insertAdjacentHTML
localStorage
navigator.onLine
 
No es necesario que sean complicados, pero sí saber para qué sirven.
*/