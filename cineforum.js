
entradaSelect = document.getElementById("tipoSelec")
entrada = document.getElementById("tipoEntrada")
entrada.addEventListener("change", function () {
    entradaSelect.value = entrada.value
})

cantidadSelect = document.getElementById("cantidadSelec")
cantidad = document.getElementById("cant")
cantidad.addEventListener("change", function () {
    cantidadSelect.value = cantidad.value
})

formulario = document.getElementById("formCine");
formulario.addEventListener("submit", function (e) {
    //TODO
    //Comprobar que todos los campos son correctos, else:
    e.preventDefault();
    alert("Introduce todas las opciones.")
})

// Para botonera -> Array con elementos de clase perteneciente a una clase de botones (quitar ids unicos)
// Añadir estado (presionado/nopresionado), al presionar liberar todos menos self
// (Por tanto solo permitir una misma sesióm)

// DOM/DOM -> Resumen Entradas

// Añadir metodos no vistos en clase