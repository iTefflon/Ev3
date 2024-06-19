var g_id_resultado = "";

function agregarResultado() {
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var fechaHoraActual = obtenerFechaHora();
    const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado,
        "fecha_registro": fechaHoraActual
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
    .then((response)=>{
        if(response.status == 200){
            location.href = "listar.html";
        }
        if(response.status == 400){
            mostrarAlerta("No se pudo agregar el resultado");
        }
    })
    .then(result => console.log(result))
    .catch((error) => console.error(error));
}

function listarResultado(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then(response => response.json())
    .then((json) => {
        json.forEach(completarFila);
        $('#tbl_resultado').DataTable();
    })
    .then(result => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
    arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML += 
    `<tr> 
    <td>${element.id_resultado}</td>
    <td>${element.nombre_resultado}</td>
    <td>${element.fecha_registro}</td>
    <td>
    <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
    <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
    </td>
    </tr>`
}

function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosActualizacion(p_id_resultado);
}

function obtenerIdEliminacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosEliminacion(p_id_resultado);
}

function obtenerDatosEliminacion(id_resultado){
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiquetaEliminar(element){
    var nombreResultado = element.nombre_resultado;
    document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este resultado? <b>"+nombreResultado+"</b>";
}

function obtenerDatosActualizacion(id_resultado){
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFormularioActualizar(element){
    var nombre_resultado = element.nombre_resultado;
    document.getElementById('txt_nombre_resultado').value = nombre_resultado;
}

function actualizarResultado(){
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
    });
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
    .then((response)=>{
        if(response.status == 200){
            location.href = "listar.html";
        }
        if(response.status == 400){
            mostrarAlerta("No se pudo actualizar el resultado");
        }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function eliminarResultado(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
    .then((response)=>{
        if(response.status == 200){
            location.href = "listar.html";
        }
        if(response.status == 400){
            mostrarAlerta("No se puede eliminar el resultado")
        }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerFechaHora(){
    var fechaHoraActual = new Date();
    var fechaFormateada = fechaHoraActual.toLocaleDateString('es-ES',{
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
    return fechaFormateada;
}

function mostrarAlerta(mensaje){
    alert(mensaje);
}
