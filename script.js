const lista = JSON.parse(localStorage.getItem("tareas")) || [];
const listaChecked = JSON.parse(localStorage.getItem("tareasChecked")) || [];
const listaTiempos = JSON.parse(localStorage.getItem("tareasTiempos")) || [];
const listaCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

const formulario = document.getElementById("formulario");
const divMostrar = document.getElementById("mostrarTareas");
const filtroSelect = document.getElementById("filtro");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const tareaInput = document.getElementById("tarea");
    const tarea = tareaInput.value.trim();

    if (tarea) {
        const fechaCreacion = new Date().toISOString();
        lista.push(tarea);
        listaChecked.push(false);
        listaTiempos.push(fechaCreacion);
        listaCompletadas.push(null);
        guardarEnLocalStorage();
        MostrarTareas();
        tareaInput.value = "";
    }
});

// Guardar en localStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem("tareas", JSON.stringify(lista));
    localStorage.setItem("tareasChecked", JSON.stringify(listaChecked));
    localStorage.setItem("tareasTiempos", JSON.stringify(listaTiempos));
    localStorage.setItem("tareasCompletadas", JSON.stringify(listaCompletadas));
};

// Mostrar tareas con filtro
const MostrarTareas = () => {
    divMostrar.innerHTML = "";

    lista.forEach((element, index) => {
        const completada = listaChecked[index];
        if ((filtroSelect.value === "completadas" && !completada) || (filtroSelect.value === "pendientes" && completada)) {
            return;
        }

        const fechaCreacion = new Date(listaTiempos[index]).toLocaleString();
        const fechaFinalizacion = listaCompletadas[index] ? new Date(listaCompletadas[index]).toLocaleString() : "No completada";

        const tareaDiv = document.createElement("div");
        tareaDiv.classList.add("tarea");
        tareaDiv.innerHTML = `
            <input type="checkbox" ${completada ? "checked" : ""} data-index="${index}">
            <label style="text-decoration: ${completada ? "line-through" : "none"};">${element}</label>
            <small>📅 Creada: ${fechaCreacion} | ✅ ${fechaFinalizacion}</small>
            <button onclick="eliminarTarea(${index})">❌</button>
        `;

        const checkbox = tareaDiv.querySelector("input");
        checkbox.addEventListener("change", () => {
            listaChecked[index] = checkbox.checked;
            listaCompletadas[index] = checkbox.checked ? new Date().toISOString() : null;
            guardarEnLocalStorage();
            MostrarTareas();
        });

        divMostrar.appendChild(tareaDiv);
    });
};

// Eliminar una tarea
const eliminarTarea = (index) => {
    [lista, listaChecked, listaTiempos, listaCompletadas].forEach(arr => arr.splice(index, 1));
    guardarEnLocalStorage();
    MostrarTareas();
};

// Eliminar todas las tareas
const eliminarTodo = () => {
    [lista, listaChecked, listaTiempos, listaCompletadas].forEach(arr => arr.length = 0);
    guardarEnLocalStorage();
    MostrarTareas();
};

// Tarea más rápida en completarse
const tareaMasRapida = () => {
    let minTiempo = Infinity;
    let tareaRapida = null;

    lista.forEach((tarea, index) => {
        if (listaChecked[index] && listaCompletadas[index]) {
            const tiempoTotal = new Date(listaCompletadas[index]) - new Date(listaTiempos[index]);
            if (tiempoTotal < minTiempo) {
                minTiempo = tiempoTotal;
                tareaRapida = tarea;
            }
        }
    });

    alert(tareaRapida ? `Tarea más rápida: "${tareaRapida}" en ${minTiempo / 1000} segundos.` : "No hay tareas completadas.");
};

filtroSelect.addEventListener("change", MostrarTareas);
MostrarTareas();
