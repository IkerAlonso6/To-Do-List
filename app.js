const input = document.getElementById("ingresar-tarea");
const boton = document.querySelector("button");
const listaTareas = document.getElementById("lista-tareas");
let tareas = [];
Sortable.create(listaTareas, {
    animation: 150,
    chosenClass: "seleccionado",
    dragClass: "drag",
});

cargarPagina();

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

        //Crear Objeto para guardar en LocalStorage
        let tarea = {
            nombre: input.value,
            estado : "pendiente"
        };
        //Añadimos la tarea al array
        tareas.push(tarea);
        //Guardamos el array en localStorage
        guardarLocalStorage(tareas);


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
    let textoTarea = tarea.innerText;
    tareas = tareas.filter(t => t.nombre !== textoTarea);
    guardarLocalStorage(tareas);
    tarea.classList.add("eliminar");
    tarea.addEventListener("transitionend", () => {
    tarea.remove();
    });
    
}

function guardarLocalStorage(listadoTareas)
{
    localStorage.setItem("tareas", JSON.stringify(listadoTareas));
}

function cargarPagina()
{
    if(localStorage.getItem("tareas"))
    {
        cargarTareas();
    }
}

function cargarTareas()
{
    //Array de localStorage
    let arrayTareasLs = JSON.parse(localStorage.getItem("tareas"));
    tareas = arrayTareasLs;
    //forEach elemento en Array de localStorage, crear una tarea
    arrayTareasLs.forEach(e => {
    //Crear Tarea
        let tareaNueva = document.createElement("div");
        tareaNueva.classList.add("tarea"); 
        tareaNueva.setAttribute("draggable", true);

        //texto agregado por el usuario
        let texto = document.createElement("p");
        texto.innerText = e.nombre;
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
        });
}