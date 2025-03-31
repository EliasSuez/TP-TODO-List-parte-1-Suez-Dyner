let lista = [];
let listaChecked = [];
const formulario = document.getElementById("formulario");
const divMostrar = document.getElementById("mostrarTareas");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const tareaInput = document.getElementById("tarea");
  const tarea = tareaInput.value;

  if (tarea) {
    lista.push(tarea);
    listaChecked.push(false);
    MostrarTareas();
    tareaInput.value = '';
  }
});

const MostrarTareas = () => {
  divMostrar.innerHTML = '';

  lista.forEach((element, index) => {
    const tareaDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkTarea${index}`;
    checkbox.checked = listaChecked[index];

    const label = document.createElement("label");
    label.id = `campo${index}`;
    label.textContent = element;
    label.style.textDecoration = listaChecked[index] ? "line-through" : "none";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => eliminarTarea(index);

    checkbox.addEventListener("change", () => {
      listaChecked[index] = checkbox.checked;
      label.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    tareaDiv.appendChild(checkbox);
    tareaDiv.appendChild(label);
    tareaDiv.appendChild(btnEliminar);
    divMostrar.appendChild(tareaDiv);
  });
};

const eliminarTarea = (index) => {
  lista.splice(index, 1);
  listaChecked.splice(index, 1);
  MostrarTareas();
};

const eliminarTodo = () =>{
    console.log("aoijnsdaisdiasdiahsbdibu")
    console.log(lista)
    lista.forEach(element => {
        lista.splice(element, 1)
        listaChecked.splice(element, 1)
    });
    divMostrar.innerHTML = '';
}
