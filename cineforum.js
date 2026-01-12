
//no funciona todavia
entradaSelect=document.getElementById("tipoSelec")
entrada=document.getElementById("tipoEntrada")
entrada.addEventListener("change",function(){
    entradaSelect.value=entrada.value
})