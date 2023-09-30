// Función para agregar un nuevo tema a la lista
function agregarTema() {
    // Obtener el campo de entrada de texto y su valor
    const nuevoTemaInput = document.getElementById('nuevoTema');
    const nuevoTema = nuevoTemaInput.value.trim();

    // Validar que el campo no esté vacío
    if (nuevoTema === '') {
        alert('Por favor, ingresa un tema válido.');
        return;
    }

    // Obtener una imagen aleatoria de Lorem Picsum
    fetch('https://picsum.photos/200/300')
        .then(response => {
            if (response.ok) {
                return response.url;
            } else {
                throw new Error('Error al obtener la imagen.');
            }
        })
        .then(imagenURL => {
            // Obtener la lista de temas y crear un nuevo elemento de lista
            const listaTemas = document.getElementById('listaTemas');
            const nuevoElemento = document.createElement('li');
            nuevoElemento.classList.add('task-item');
            nuevoElemento.innerHTML = `
                <div class="task-details">
                    <img src="${imagenURL}" alt="${nuevoTema}" class="task-image">
                    <span class="task-name">${nuevoTema}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-complete" onclick="completarTema(this)">Completar</button>
                    <button class="btn btn-delete" onclick="eliminarTema(this)">Eliminar</button>
                </div>
            `;

            // Agregar el nuevo elemento a la lista de temas
            listaTemas.appendChild(nuevoElemento);

            // Limpiar el campo de entrada de texto
            nuevoTemaInput.value = '';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Función para marcar o desmarcar una tarea como completada
function completarTema(button) {
    // Obtener el elemento de lista que contiene la tarea
    const listItem = button.parentElement.parentElement;
    const taskName = listItem.querySelector('.task-name'); // Obtener el nombre de la tarea

    // Cambiar el color del botón "Completar" al hacer clic
    button.classList.toggle('active');

    // Marcar o desmarcar la tarea como completada
    listItem.classList.toggle('completed');

    // Tachar o destachar el nombre de la tarea
    taskName.classList.toggle('completed');
}

// Función para eliminar una tarea
function eliminarTema(button) {
    // Obtener el elemento de lista que contiene la tarea y eliminarlo de la lista
    const listItem = button.parentElement.parentElement;
    listItem.remove();
}
