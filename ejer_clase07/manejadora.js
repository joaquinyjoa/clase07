document.addEventListener("DOMContentLoaded", () => {

    listarUsuarios();

});

async function listarUsuarios() {

    try {
        
        const opciones = {
            method: "GET",
            headers: { "x-api-key": "reqres-free-v1" },
        };

        let res = await manejadorFetch(API_URL + `users`, opciones);

        let resJSON = await res.json();
        
        console.log(resJSON);


        document.querySelector("#listado").innerHTML = "";
        document.querySelector("#listado").appendChild(armarListadoHTML(resJSON.data));

        const id = document.getElementById("botones");
        id.innerHTML = ""; // Evitar duplicar botones

        const avanzar = document.createElement("button");
        avanzar.textContent = "Avanzar";
        avanzar.id = "avanzar";

        const retroceder = document.createElement("button");
        retroceder.textContent = "Retroceder";
        retroceder.id = "retroceder";

        id.appendChild(retroceder);
        id.appendChild(avanzar);

        // Lógica para avanzar y retroceder
        avanzar.addEventListener("click", () => {
            if (paginaActual < resJSON.total_pages) {
                paginaActual++;
                listarUsuarios();
            }
        });

        retroceder.addEventListener("click", () => {
            if (paginaActual > 1) {
                paginaActual--;
                listarUsuarios();
            }
        });


    } catch (err) {

        alert(err);
    }    

}

function armarListadoHTML(params) {
    
    //generar el listado dinámico
    //params.data[{id, email, first_name, last_name, avatar}]
    //Encabezado
    //ID - CORREO - NOMBRE - APELLIDO - AVATAR
    const tabla = document.createElement("table");
    tabla.border = 1;
    
    const encabezado = tabla.insertRow();
    encabezado.innerHTML = `
    <th>ID<th>
    <th>NOMBRE<th>
    <th>APELLIDO<th>
    <th>EMAIL<th>
    <th>AVATAR<th>
    `;

    params.forEach(usuario => {
        const fila = tabla.insertRow();
        fila.innerHTML = `
        <td>${usuario.id}<td>
        <td>${usuario.first_name}<td>
        <td>${usuario.last_name}<td>
        <td>${usuario.email}<td>
        <td><img src="${usuario.avatar}"><td>
        `;
    });

    return tabla;
}