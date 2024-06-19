//Función para calcular el peso ideal
function calcularPesoIdeal(){
    //Obtenemos la edad
    var edad = document.getElementById("txt_edad").value;
    //Calculamos el peso ideal
    var pesoIdeal = edad * 2 + 8 ;
    //Mostramos el peso ideal
    document.getElementById("cnt_peso_ideal").innerHTML ="Peso ideal es "+pesoIdeal+" kilos."
    //Invocamos función para calcular estado
    calcularEstadoPeso(pesoIdeal);

}
function calcularEstadoPeso(pesoIdeal){
    var pesoActual = document.getElementById("txt_peso_actual").value;
    //Comparamos pesoIdeal y pesoActual
    var estado = "";
    var imagen ="";
    var estilo="";
    if(pesoActual == pesoIdeal){
        estado = "Peso ideal";
        imagen ="pesoideal128x128.png";
        estilo="success";
    }else{
        if(pesoActual > pesoIdeal){
            estado = "Sobrepeso";
            imagen="sobrepeso128x128.png";
            estilo="danger";

        }else{
            estado = "Bajo peso";
            imagen="bajopeso128x128.png";
            estilo="warning";
        }
    }
    document.getElementById("cnt_estado").innerHTML ="Estado "+estado+" ."
    document.getElementById("cnt_imagen").innerHTML ="<img src=img/"+imagen + ">";
    document.getElementById("cnt_estado").className ="alert alert-"+estilo;

    //Invocamos función para determinar diferencia de peso
    calcularDiferenciaPeso(pesoActual,pesoIdeal,estilo);

}
//Función para calcular diferencia de peso
function calcularDiferenciaPeso(pesoActual,pesoIdeal,estilo){
    var diferenciaPeso = pesoActual - pesoIdeal;

    var contenedorDiferencia = document.getElementById("cnt_diferencia");
    contenedorDiferencia.innerHTML = "Diferencia de peso : " + diferenciaPeso+ " kilos.";
    //Aplicamos estilo al contenedor mediante badge
    contenedorDiferencia.className ="badge text-bg-"+estilo;

}