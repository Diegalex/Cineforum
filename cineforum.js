const formulario = document.getElementById("formCine");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const tipoEntrada = document.getElementById("tipoEntrada");
const cantidad = document.getElementById("cant");
const aceptarCondiciones = document.getElementById("acepto");
const btGuardar=document.getElementById("btnGuardar");
btnRestaurar=document.getElementById("btnRestaurar");

let sesionSeleccionada = null; //para luego form

//Tipo de entrada para el form
function setTipoEntradas() {
    let entradaSelect = document.getElementById("tipoSelec"); //Form tipo entrada
    entradaSelect.value = tipoEntrada.value;
    return entrada.value !== ""; // devuelve true si hay valor para luego comprobar en el submit
}
tipoEntrada.addEventListener("change", setTipoEntradas);

// Función que setea la cantidad de entradas en el form
function setCantidadEntradas() {
    var cantidadSelect = document.getElementById("cantidadSelec");
    cantidadSelect.value = cantidad.value;
    return cantidad.value !== "" && cantidad.value > 0; 
}

cantidad.addEventListener("change", setCantidadEntradas);

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
        return false;
    } 

    else{
        nombre.classList.add("msg-ok");
        nombre.classList.add("campo-ok");
        nombre.classList.remove("msg-error")
        nombre.classList.remove("campo-error")
    } 

    return true;
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

//Terminos y Condiciones validacion

function validarAceptoCondiciones() {
    const aceptoCheckbox = document.getElementById('acepto');
    const msgAcepto = document.getElementById('msgAcepto');

    if (!aceptoCheckbox.checked) {
        msgAcepto.textContent = "Debes aceptar las condiciones para continuar.";
        msgAcepto.classList.add('msg-error');
        msgAcepto.classList.remove('msg-ok');
        return false;
    } else {
        msgAcepto.textContent = "Condiciones aceptadas.";
        msgAcepto.classList.add('msg-ok');
        msgAcepto.classList.remove('msg-error');
        return true;
    }

}

aceptarCondiciones.addEventListener("change",validarAceptoCondiciones);

function validarFormularioEntero(e){
    e.preventDefault();

    mensaje="";

    if (!validarNombre()) mensaje += "Nombre no válido.\n";
    if (!validarEmail()) mensaje += "Correo no válido.\n";
    if (sesionSeleccionada === null) mensaje += "Seleccione película y sesión.\n";
    if (tipoEntrada.value === "") mensaje += "Seleccione tipo de entrada.\n";
    if (cantidad.value === "" || cantidad.value <= 0) mensaje += "Seleccione cuántas entradas desea comprar.\n";
    if (!validarAceptoCondiciones()) mensaje += "Debes de aceptar las condiciones.\n";

    if(mensaje.trim()!== ""){
        alert(mensaje);
    }else{
        mostrarResumen();
    }
}

formulario.addEventListener("submit",validarFormularioEntero);

//Generar tarjeta de resumen

function mostrarResumen() {

    eliminarResumen(); //llamada a funcion que borra del dom el contenido de los spans en el div invisible

    const resumenDiv = document.getElementById('resumenEntradas');
     resumenDiv.style.display = "block"; //cambia de invisible a bloque para que se muestre

    // Sacamos los datos del formulario
    const pelicula = document.getElementById('peliculaSelec').value;
    const sesion = document.getElementById('sesionSelec').value;
    const tipo = document.getElementById('tipoSelec').value;
    const cantidad = parseInt(document.getElementById('cantidadSelec').value);

    // Precio según tipo
    let precioUnitario = 0;
    switch (tipo) {
        case "General": 
            precioUnitario = 9; 
            break;
        case "Senior": 
            precioUnitario = 3; 
            break;
        case "Joven/Numerosa": 
            precioUnitario = 7.5; 
            break;
        default: 
            precioUnitario = 0;
    }

    const total = cantidad * precioUnitario;

    document.getElementById('resumenPelicula').textContent = pelicula;
    document.getElementById('resumenSesion').textContent = sesion;
    document.getElementById('resumenTipo').textContent = tipo;
    document.getElementById('resumenCantidad').textContent = cantidad;
    document.getElementById('resumenTotal').textContent = total.toFixed(2) + '€';

   
}

// Función que elimina el resumen anterior si existe
function eliminarResumen() {
    const resumenDiv = document.getElementById('resumenEntradas');
    
     if (resumenDiv.style.display === "block") {
        document.getElementById('resumenPelicula').textContent = "";
        document.getElementById('resumenSesion').textContent = "";
        document.getElementById('resumenTipo').textContent = "";
        document.getElementById('resumenCantidad').textContent = "";
        document.getElementById('resumenTotal').textContent = "";
        resumenDiv.style.display = "none";
    }
}

function actualizarResumen() {
    eliminarResumen();

    if (validarFormularioEntero()) {
        mostrarResumen();
    }

}

function guardarDatos() {
  localStorage.setItem("nombreGuardado", nombre.value);
  localStorage.setItem("correoGuardado", correo.value);
  alert("Datos guardados correctamente");
}

function restaurarDatos() {
  const nombreGuardado = localStorage.getItem("nombreGuardado");
  const correoGuardado = localStorage.getItem("correoGuardado");

  if (nombreGuardado) nombre.value = nombreGuardado;
  if (correoGuardado) correo.value = correoGuardado;

  // Revalidamos visualmente
  validarNombre();
  validarEmail();
}


// Event listeners de los campos del formulario para que al cambiar cualquier cosa despues de ser generado el resumen, este se borre nuevamente
nombre.addEventListener("input", actualizarResumen);
correo.addEventListener("input", actualizarResumen);
tipoEntrada.addEventListener("change", actualizarResumen);
cantidad.addEventListener("change", actualizarResumen);
aceptarCondiciones.addEventListener("change", actualizarResumen);
btGuardar.addEventListener("click", guardarDatos);
btnRestaurar.addEventListener("click", restaurarDatos);




//Comprobar e ir tachando
/*
REQUISITOS 
FORMULARIO (HTML) debe contener al menos:
Un textarea (POR HACER)
 

VALIDACIONES Y EXPERIENCIA DE USUARIO (KINDA HECHO)
Validar: 
Rango correcto en un campo numérico (kindof), en la funcion validarFormularioEntero crea alerta si la cantidad es de 0 o menor

CREACIÓN Y ELIMINACIÓN DINÁMICA DE ELEMENTOS (DOM) (KINDA HECHO)
(TECNICAMENTE SE EDITAN ELEMENTOS DEL DOM, LO QUE ES SIMILAR)
La aplicación debe  crear elementos dinámicamente (createElement, appendChild), y eliminar elementos del DOM (remove o removeChild)
Ejemplos: 
Añadir opciones a un select
Añadir o eliminar bloques o filas
Eliminar elementos incorrectos
 

BOTONES Y USO DEL BOM  (PENDIENTE)
Incluir al menos dos botones que utilicen funcionalidades del navegador, por ejemplo: 
Guardar datos (localStorage)
Restaurar datos
Recargar la página (location.reload)
Imprimir (window.print)

MÉTODOS O FUNCIONES NUEVAS (HECHO)
Utilizar al menos tres métodos o propiedades que no se hayan explicado directamente en clase, por ejemplo: 

closest (USADO)
dataset (USADO)
classList.toggle (USADO)
insertAdjacentHTML
localStorage
navigator.onLine
 
No es necesario que sean complicados, pero sí saber para qué sirven.
*/