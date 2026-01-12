
entradaSelect=document.getElementById("tipoSelec")
entrada=document.getElementById("tipoEntrada")
entrada.addEventListener("change",function(){
    entradaSelect.value=entrada.value
})

cantidadSelect=document.getElementById("cantidadSelec")
cantidad=document.getElementById("cant")
cantidad.addEventListener("change",function(){
    cantidadSelect.value=cantidad.value
})