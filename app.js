const input = document.getElementById("ingresar-tarea");
const boton = document.querySelector("button");
const listaTareas = document.getElementById("lista-tareas");

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
    tarea.remove();
}

