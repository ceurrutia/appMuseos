const museosList = document.getElementById('museos-list');
const agregarForm = document.getElementById('agregar-form');

// Obtener lista de museos al cargar la página
window.onload = async () => {
    await listarMuseos();
};

// Función para listar museos
async function listarMuseos() {
    try {
        const response = await axios.get('/museos');
        const museos = response.data;
        museosList.innerHTML = '';
        museos.forEach(museo => {
            const li = document.createElement('li');
            li.textContent = museo.nombre;
            museosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al listar museos:', error);
    }
}

// Manejar el envío del formulario de agregar
agregarForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    try {
        await axios.post('/museos', { nombre, ubicacion: { tipo: 'Point', coordinates: [parseFloat(longitud), parseFloat(latitud)] } });
        await listarMuseos();
        // Limpiar el formulario después de agregar
        agregarForm.reset();
    } catch (error) {
        console.error('Error al agregar museo:', error);
    }
});