let lista = []
let i = 0
let listaChecked = []
const formulario = document.getElementById('formulario')
const divMostrar = document.getElementById('mostrarTareas')

 



formulario.addEventListener("submit", addTarea = () => {
    const tareaInput = document.getElementById('tarea')
    const tarea = tareaInput.value
    lista.push(tarea)
    MostrarTareas(lista)
    
})


MostrarTareas = (lista) => {
    const element = lista[i]
    divMostrar.innerHTML += `<input type="checkbox" id="checkTarea${i}">${element}</br>`
    listaChecked.push(false)
    
    const tareaChech = document.getElementById(`checkTarea${i}`)
    tareaChech.addEventListener("change", recorrerArray = () => {
        listaChecked[i] = tareaChech.checked
        console.log(listaChecked)
        listaChecked.forEach(element => {
            if(element == true){
                console.log("IF TRUE")
                const InputCambiar = document.getElementById(`${element}`)
                InputCambiar.style.textDecoration = "line-through";
            }
        });

    })
    i++
}



