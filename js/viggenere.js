//Vamos a ocupar parte de cesar
const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ',
 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//key
let key="";

//Bienvenidos a interpretar codigo

//Sale error en la consola con el "$" que no está definido 
$(document).ready(function(){
    //Vamos a hacer una funcion para poder cifrar con viggenere
    $('#ci').click(function(){
        
        //Para cifrar vamos a utilizar una funcion de modulo la cual es y=(x+z)mod27
        //vamos a traer los datos de la llave
        key=document.getElementById('llave').value;
        
        //tenemos que verificar la llave
        /*Expresiones regulares en teams*/
        key= key.replace(/ /g, ''); //Remplazar los espacios por nada globalmente

        //vamos a traer los datos de la mensaje
        let mess=document.getElementById('mess').value;
        
        //tenemos que verificar la llave
        /*Expresiones regulares en teams*/
        mess= mess.replace(/ /g, ''); //Remplazar los espacios por nada globalmente

        let newMess="";
        let keyCompleta="";

        /*Para aplicar el algoritmo debemos crear una funcion que se encargue de revisar
        las condiciones del mismo*/

        if(revision(mess,key)){
            /*vamos primero por aplicar y obtener la posicion de la longitud del mensaje
            y emparejarlo contra la llave*/
            for(var i=0;i<mess.length;i++ ){
                //emparejo conforme a la posicion de caracter obteniendo el numero de dicha posicion
                keyCompleta += key.charAt((i%Number(key.length)));

            }
            //alert(keyCompleta);

            //Tengo que volver a recorrer el mensaje para obtener caracteres y posiciones
            for(var i=0;i< mess.length; i++)
            {
                //obtener la posicion de la letra
                let charr=mess.charAt(i);
                //debemos crear una funcion para obtener la posicion de ese caracter
                let posm=getPosicion(charr);

                //tambien aplicarlo a la llave
                charr=keyCompleta.charAt(i);

                //obtenemos la posicion
                let posk=getPosicion(charr);

                //Tenemos que ejecutar el cifrado
                let newValores= cifrado(posm, posk);

                newMess += abc[newValores];
            }

            //Imprimir el resultado
            document.getElementById('rs').value=newMess;
        }else{
            //no se cumple
            alert("No sirve llevale");
        }        
    });


    //decifrar
      $('#de').click(function(){
        
        //Para cifrar vamos a utilizar una funcion de modulo la cual es y=(x+z)mod27
        //vamos a traer los datos de la llave
        key=document.getElementById('llave').value;
        
        //tenemos que verificar la llave
        /*Expresiones regulares en teams*/
        key= key.replace(/ /g, ''); //Remplazar los espacios por nada globalmente

        //vamos a traer los datos de la mensaje
        let mess=document.getElementById('mess').value;
        
        //tenemos que verificar la llave
        /*Expresiones regulares en teams*/
        mess= mess.replace(/ /g, ''); //Remplazar los espacios por nada globalmente

        let newMess="";
        let keyCompleta="";

        /*Para aplicar el algoritmo debemos crear una funcion que se encargue de revisar
        las condiciones del mismo*/

        if(revision(mess,key)){
            /*vamos primero por aplicar y obtener la posicion de la longitud del mensaje
            y emparejarlo contra la llave*/
            for(var i=0;i<mess.length;i++ ){
                //emparejo conforme a la posicion de caracter obteniendo el numero de dicha posicion
                keyCompleta += key.charAt((i%Number(key.length)));

            }
            //alert(keyCompleta);

            //Tengo que volver a recorrer el mensaje para obtener caracteres y posiciones
            for(var i=0;i< mess.length; i++)
            {
                //obtener la posicion de la letra
                let charr=mess.charAt(i);
                
                //debemos crear una funcion para obtener la posicion de ese caracter
                let posm=getPosicion(charr);

                console.log("posm : " + posm)
                
                //tambien aplicarlo a la llave
                charr=keyCompleta.charAt(i);

                //obtenemos la posicion
                let posk=getPosicion(charr);
                console.log("pos k " + posk);
                //Tenemos que ejecutar el cifrado
                let newValores= descifrado(posm, posk);

                console.log("Nuevos Valores  " + newValores);
                
                
                newMess += abc[newValores];
                console.log("newMess " + newMess);
                
            }

            //Imprimir el resultado
            document.getElementById('rs').value=newMess;
        }else{
            //no se cumple
            alert("No sirve llevale");
        }        
    });    
});

//funcion de cambio o de cifrado

function cifrado(posm, posk){
    //tengo que aplicar la formula
    //Para cifrar vamos a utilizar una funcion de modulo la cual es y=(x+z)mod27
    let y=(posm + posk)%27;
    return y;
}

//funcion de decifrado o descifrar
function descifrado(posm, posk){
    let val=0;
    if((posm - posk) >= 0){
        //Todo está bien
        val = (posm-posk)%27;
    }else{
        val = (posm - posk + 27)%27;
        
    }
    return val;
}

//funcion de la posicion
function getPosicion(letra){
    let posicion=abc.indexOf(letra);
    return posicion;

}

//funcion de la revision
function revision(mess, desp){
    /* primero hay que validar la entrada de los datos a partir de 
    una expresion regular */
    var expresion= /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/;
    var aceptado= true;

    //Evaluar la expresion
    if(!expresion.test(mess)){
        alert("El texto que ingreso no ha sido aceptado, ingrese solo minusculas y evite" +
        " numeros y simbolos");
        aceptado=false;
    }
    if(!expresion.test(desp)){
        alert("La clave ingresada es incorrecta, no cumple con las normas de solo minusculas " + 
        "y no de usar numero y/o simboloes");
        aceptado=false;
    }
    
    if(desp.length> mess.length){
        alert("La clave no puede ser mayor que el mensaje");
        aceptado=false;

    }
    return aceptado;
}
