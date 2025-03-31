let lista = JSON.parse(localStorage.getItem("tareas")) || [];
let listaChecked = JSON.parse(localStorage.getItem("tareasChecked")) || [];

const formulario = document.getElementById("formulario");
const divMostrar = document.getElementById("mostrarTareas");
const filtroSelect = document.getElementById("filtro");

// Agregar nueva tarea
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const tareaInput = document.getElementById("tarea");
  const tarea = tareaInput.value.trim();

  if (tarea) {
    lista.push(tarea);
    listaChecked.push(false);
    guardarEnLocalStorage();
    MostrarTareas();
    tareaInput.value = ''; // Limpiar input
  }
});

// Guardar en localStorage
const guardarEnLocalStorage = () => {
  localStorage.setItem("tareas", JSON.stringify(lista));
  localStorage.setItem("tareasChecked", JSON.stringify(listaChecked));
};

// Mostrar tareas con filtro
const MostrarTareas = () => {
  divMostrar.innerHTML = ''; // Limpiar antes de mostrar

  let filtro = filtroSelect.value; // Obtener opción del filtro

  lista.forEach((element, index) => {
    let completada = listaChecked[index];

    // Filtrar según opción seleccionada
    if (
      (filtro === "completadas" && !completada) ||
      (filtro === "pendientes" && completada)
    ) {
      return; // No mostrar si no coincide con el filtro
    }

    // Crear elementos HTML dinámicamente
    const tareaDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completada;

    const label = document.createElement("label");
    label.textContent = element;
    label.style.textDecoration = completada ? "line-through" : "none";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => eliminarTarea(index);

    // Marcar como completada o no
    checkbox.addEventListener("change", () => {
      listaChecked[index] = checkbox.checked;
      guardarEnLocalStorage();
      MostrarTareas();
    });

    // Agregar elementos al div
    tareaDiv.appendChild(checkbox);
    tareaDiv.appendChild(label);
    tareaDiv.appendChild(btnEliminar);
    divMostrar.appendChild(tareaDiv);
  });
};

// Eliminar una tarea específica
const eliminarTarea = (index) => {
  lista.splice(index, 1);
  listaChecked.splice(index, 1);
  guardarEnLocalStorage();
  MostrarTareas();
};

// Eliminar todas las tareas
const eliminarTodo = () => {
  lista.length = 0;
  listaChecked.length = 0;
  guardarEnLocalStorage();
  MostrarTareas();
};

// Actualizar la vista al cambiar el filtro
filtroSelect.addEventListener("change", MostrarTareas);

// Mostrar tareas al cargar la página
MostrarTareas();
