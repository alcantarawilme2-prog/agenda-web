const url = "https://www.raydelto.org/agenda.php";

function cargarContactos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById("lista");
            lista.innerHTML = "";

            data.forEach(contacto => {
                const li = document.createElement("li");
                li.textContent = contacto.nombre + " " + contacto.apellido + " - " + contacto.telefono;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error al cargar contactos:", error);
            alert("Error al cargar los contactos.");
        });
}

document.getElementById("formulario").addEventListener("submit", function(e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;

    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoContacto)
    })
    .then(response => response.text())
    .then(data => {
        cargarContactos();
        document.getElementById("formulario").reset();
    })
    .catch(error => {
        console.error("Error al guardar contacto:", error);
        alert("Error al guardar el contacto.");
    });
});

cargarContactos();
