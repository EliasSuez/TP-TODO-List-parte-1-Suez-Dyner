let lista = JSON.parse(localStorage.getItem("tareas")) || [];
let listaChecked = JSON.parse(localStorage.getItem("tareasChecked")) || [];

const formulario = document.getElementById("formulario");
const divMostrar = document.getElementById("mostrarTareas");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const tareaInput = document.getElementById("tarea");
  const tarea = tareaInput.value.trim(); // Evita espacios vacíos

  if (tarea) {
    lista.push(tarea);
    listaChecked.push(false);
    guardarEnLocalStorage();
    MostrarTareas();
    tareaInput.value = '';
  }
});

// Función para guardar en localStorage
const guardarEnLocalStorage = () => {
  localStorage.setItem("tareas", JSON.stringify(lista));
  localStorage.setItem("tareasChecked", JSON.stringify(listaChecked));
};

// Función para mostrar tareas
const MostrarTareas = () => {
  divMostrar.innerHTML = '';

  lista.forEach((element, index) => {
    const tareaDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = listaChecked[index];

    const label = document.createElement("label");
    label.textContent = element;
    label.style.textDecoration = listaChecked[index] ? "line-through" : "none";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => eliminarTarea(index);

    checkbox.addEventListener("change", () => {
      listaChecked[index] = checkbox.checked;
      label.style.textDecoration = checkbox.checked ? "line-through" : "none";
      guardarEnLocalStorage();
    });

    tareaDiv.appendChild(checkbox);
    tareaDiv.appendChild(label);
    tareaDiv.appendChild(btnEliminar);
    divMostrar.appendChild(tareaDiv);
  });
};

// Función para eliminar tareas
const eliminarTarea = (index) => {
  lista.splice(index, 1);
  listaChecked.splice(index, 1);
  guardarEnLocalStorage();
  MostrarTareas();
};

// Mostrar tareas al cargar la página
MostrarTareas();
