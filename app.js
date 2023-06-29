const traerCategorias = () => {
    let selectCategorias = document.getElementById('categoria');

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=f7640a47d1f02bf4c2e6546720060d84");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://opentdb.com/api_category.php", requestOptions)
        .then(response => response.json()) // devuelve objeto literal con info de la lista de categorias
        .then(
            result => {
                let categorias = result.trivia_categories // arreglo de mis categorias (id, name)
                let listaCategorias = "<option value = '0'>Cualquier opcion</option>";
                for (let i = 0; i < categorias.length; i++) {
                    listaCategorias += `<option value= '${categorias[i].id}'>${categorias[i].name}</option>`
                }

                selectCategorias.innerHTML = listaCategorias

            }
        )
        .catch(error => console.log('error', error));
}
let respuestasGrales;

const crearTrivia = () => {
    let categoria = document.getElementById('categoria').value;
    let tipo_pregunta = document.getElementById('tipo_pregunta').value;
    let dificultad = document.getElementById('dificultad').value;
    let contenedorPreguntas = document.getElementById('preguntas');
    let urlTrivia = "https://opentdb.com/api.php?amount=10"


    //Genero mi URL
    if (categoria !== '0') {
        urlTrivia += '&category=' + categoria
    }
    if (dificultad !== '0') {
        urlTrivia += '&difficulty=' + dificultad
    }
    if (tipo_pregunta !== '0') {
        urlTrivia += '&type=' + tipo_pregunta
    }
    //consultar la API para requerir mis preguntas
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=f7640a47d1f02bf4c2e6546720060d84");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(urlTrivia, requestOptions)
        .then(response => response.json())
        .then(result => { //Recibo ojeto literal
            console.log(result.results)
            let preguntas = result.results//arreglo de las preguntas
            let bloquePregunta = '' //contenedor de mis preguntas y sus respuestas en HTML
            respuestasGrales = preguntas;
            for(let i = 0; i< preguntas.length; i++){
                let respuestas =[] // Arreglo para juntar todas la preguntas
                let listaRespuestas = ''
                let pregunta = '' // contenedor de mis preguntas para HTML

                pregunta += `<p> Q - ${preguntas[i].question}</p>`

                respuestas = [... preguntas[i].incorrect_answers, preguntas[i].correct_answer]
                console.log(respuestas.sort()) // Revuelve las respuestas

                for(let j = 0; j < respuestas.length; j++){
                    //formato de las respuestas en HTML
                    listaRespuestas += `<input type='radio' id='pregunta${i}' name='pregunta${i}' value='${respuestas[j]}' >${respuestas[j]}</input>`;
                };
                bloquePregunta += pregunta + listaRespuestas
            };
            contenedorPreguntas.innerHTML = bloquePregunta;


            
        


            
        })
        .catch(error => console.log('error', error));
   


}

const respCorrecta = 100

const puntaje = () => {
    let puntajeActual = 0;
    
    for(let i = 0; i < respuestasGrales.length; i++){
        if(respuestasGrales[i].correct_answer === document.getElementById('preguntas').elements['pregunta'+i].value){
            puntajeActual=puntajeActual + respCorrecta;
            document.getElementsByName('pregunta'+i)[0].classList.add('respuesta-correcta');
            
        }else{
            document.getElementsByName('pregunta'+i)[0].classList.add('respuesta-error');

        }
        
    }
   

    //alert(puntajeActual);
    document.getElementById('score').innerHTML = puntajeActual

}


traerCategorias();