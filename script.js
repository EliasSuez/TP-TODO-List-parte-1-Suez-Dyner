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
    // Crear elementos de manera dinámica
    const tareaDiv = document.createElement("div");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkTarea${index}`;
    checkbox.checked = listaChecked[index];

    const label = document.createElement("label");
    label.id = `campo${index}`;
    label.textContent = element;
    label.style.textDecoration = listaChecked[index] ? "line-through" : "none";

    // Evento para actualizar el estado cuando se cambia el checkbox
    checkbox.addEventListener("change", () => {
      listaChecked[index] = checkbox.checked;
      label.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    // Agregar elementos al contenedor
    tareaDiv.appendChild(checkbox);
    tareaDiv.appendChild(label);
    divMostrar.appendChild(tareaDiv);
  });
};
