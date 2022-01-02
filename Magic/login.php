<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    $recibido = file_get_contents("php://input");
    $datos = preg_split("/([&=])/", $recibido);
    $datosAuxiliares = [];
    //Construimos el array asociativo
    for ($i=0; $i < count($datos); $i+=2) { 
        $datosAuxiliares[$datos[$i]] = $datos[$i+1];
    }

    if($datosAuxiliares['usuario'] == 'usuario' && $datosAuxiliares['password'] == '1234'){
        $devuelve = '{"validacion":true}';
    }else{
        $devuelve = '{"validacion": false}';
    }

    echo $devuelve;
?>