function retornaApenasNumerosPares(array) {
    var numeros = new Array();
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 == 0) {
            numeros[i] = array[i];
        }
    }
    return numeros;
}