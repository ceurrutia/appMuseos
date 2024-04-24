

fetch('https://app-museos-3.vercel.app/museos')
    .then(response => {
        if (!response.ok) {
            throw new Error('No hay respuesta de network');
        }
        return response.json();
    })
    .then(data => displayMuseos(data))
    .catch(error => console.error('Error fetching museums:', error));


function displayMuseos(museos) {
    const tbody = document.getElementById('museos-list');
    tbody.innerHTML = ''; // Limpiar la tabla antes de rellenarla
    museos.forEach(museo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${museo.name || ''}</td>
            <td>${museo.address || ''}</td>
            <td>${museo.city || ''}</td>
            <td>${museo.country || ''}</td>
            <td>${museo.location.coordinates.join(", ")}</td>
            <td>${museo.day || ''}</td>
            <td>${museo.hours || ''}</td>
        `;
        tbody.appendChild(tr);
    });
}


//agregar nuevo museo

document.getElementById('agregar-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const latitud = parseFloat(document.getElementById('latitud').value);
    const longitud = parseFloat(document.getElementById('longitud').value);
    const dia = document.getElementById('dia').value;
    const horas = document.getElementById('horas').value;

    const data = {
        name: nombre,
        address: direccion,
        city: ciudad,
        country: pais,
        location: {
            type: "Point",
            coordinates: [longitud, latitud]
        },
        day: dia,
        hours: horas
    };

    fetch('https://app-museos-3.vercel.app/museos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Museo agregado con éxito!');
        document.getElementById('agregar-form').reset(); // Optional: clear form after submission
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//btn limpiar form
document.getElementById('limpiar-form').addEventListener('click', function() {
    document.getElementById('agregar-form').reset();
});


