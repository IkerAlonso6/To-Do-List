const input = document.getElementById("ingresar-tarea");
const boton = document.querySelector("button");
const listaTareas = document.getElementById("lista-tareas");
Sortable.create(listaTareas, {
    animation: 150,
    chosenClass: "seleccionado",
    dragClass: "drag",
    // onEnd : () => {
    //     console.log("Se movio un elemento");
    // },
    group : "lista-tareas",
    store : {
        //Guardamos el orden de la lista de tareas
        //Revisar Data-id para poder identificar mejor las tareas
        set : (listaTareas) => 
        {
            const orden = listaTareas.toArray();
            localStorage.setItem(listaTareas.options.group.name, orden.join("|"));
        },
        get : (listaTareas) => {
            const orden = localStorage.getItem(listaTareas.options.group.name)
            return orden ? orden.split("|") : [];
        }
    }
});

boton.addEventListener("click", agregarTarea);  
input.addEventListener("keydown", (e)=>{
    if(e.key==="Enter") {
        agregarTarea();
    }
});

function agregarTarea() {
    if(input.value) {
        //Crear Tarea
        let tareaNueva = document.createElement("div");
        tareaNueva.classList.add("tarea"); 
        tareaNueva.setAttribute("draggable", true);

        //texto agregado por el usuario
        let texto = document.createElement("p");
        texto.innerText = input.value;
        tareaNueva.appendChild(texto);

        //Crear iconos 
        let iconos = document.createElement("div");
        iconos.classList.add("iconos");
        tareaNueva.appendChild(iconos); 
        
        //Iconos
        let completar = document.createElement("i"); 
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener("click", completarTarea)

        let eliminar = document.createElement("i");
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener("click", eliminarTarea)

        iconos.append(completar, eliminar); 


        //Agregar tarea a la lista
        listaTareas.appendChild(tareaNueva);

        tareaNueva.getBoundingClientRect();
        tareaNueva.classList.add("agregar");

        //Limpiar input
        input.value = "";
    }
    else {
        alert("Por favor ingresa una tarea");
    }
}

function completarTarea(e)
{
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle("completada");
}

function eliminarTarea(e)
{
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.add("eliminar");
    tarea.addEventListener("transitionend", () => {
    tarea.remove();
    });
}

