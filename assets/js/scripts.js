// funcion mostrar con ES6
const mostrar =(algo)=>{
    console.log('funciona mostrar')
    document.getElementById('aqui').innerHTML = algo;
};

const actualizaBarra = (incremento)=>{
    let laBarra = document.getElementById('barraProgreso');
    if(incremento==25){
        laBarra.setAttribute('style', 'width: 25%');
        laBarra.setAttribute('aria-valuenow', '25');
    }
    else if(incremento==50){
        laBarra.setAttribute('style', 'width: 50%');
        laBarra.setAttribute('aria-valuenow', '50');
    }
    else if(incremento==75){
        laBarra.setAttribute('style', 'width: 75%');
        laBarra.setAttribute('aria-valuenow', '75');
    }
    else if(incremento==100){
        laBarra.setAttribute('style', 'width: 100%');
        laBarra.setAttribute('aria-valuenow', '100');
    }
    
};



// funcion consumir archivo
const consumirArchivo = (myCallback)=>{
    console.log('funciona consumir archivo');
    let request = new XMLHttpRequest();
    request.open('GET','referencia.html' );

    request.onload = ()=>{
        let barra = `
        <hr>
        <div class="progress">
            <div id="barraProgreso" class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <hr>
        `;
        document.getElementById('aqui').innerHTML = barra;
        if(request.status == 200){
            setTimeout(()=>{
                myCallback(request.responseText);
            }, 10000);

            setTimeout(()=>{
                actualizaBarra(25);
            },1500);
            
            setTimeout(()=>{
                actualizaBarra(50);
            },5000);

            setTimeout(()=>{
                actualizaBarra(75);
            },7500);

            setTimeout(()=>{
                actualizaBarra(100);
            },9000);
            
        }
        else{
            myCallback(`<p>Error : ${request.status}</p>`);
        }
    };

    request.send();
};

// funcion empezar
const empezar=()=>{
    console.log('funciona empezar');
    consumirArchivo(mostrar);
}





const empezarPromesa = ()=>{

console.log('inicio empezarPromesa ')
let elParrafoEstado = document.getElementById('estadoFuncion');
elParrafoEstado.innerText = 'Comienza empezarPromesa';

//buscamos en el DOM el parrafo de resultado promesa
let elParrafoResultado = document.getElementById('resultadoPromesa');
elParrafoResultado.innerText = 'Esperando respuesta de la promesa. Espere 10 seg...';

//producing code-El codigo que le lleva tiempo para obtener un resultado
let miPromesa = new Promise((resuelve, rechaza)=>{
    let x=5;
    // producing code
    setTimeout( ()=>{
        if(x==0){
            resuelve('Terminó la promesa');
        }
        else{
            let elerror = {
                tipo: 'rechazo',
                descripcion: 'Se rechazo la promesa porque x no es igual a cero',
                fecha: '022-06-2023'
            };
            rechaza(elerror);
        }
    } ,10000);
});


    //consuming code -El código que espera por la resolución de la promesa
    miPromesa.then(
        // funcion si se resuelve la promesa

        (valor)=>{
            //buscamos en el DOM el parrafo de resultado promesa
            let elParrafoResultado = document.getElementById('resultadoPromesa');
            elParrafoResultado.innerText = valor;
        }, 
        // funcion si se rechaza la promesa
        (objerror)=>{
            // muestro en consola el objeto de error
            console.log(objerror);
            //buscamos en el DOM el parrafo de resultado promesa
            let elParrafoResultado = document.getElementById('resultadoPromesa');
            elParrafoResultado.innerText = objerror.descripcion;

        });


    console.log('finaliza empezarPromesa ')
    elParrafoEstado.innerText = 'finaliza empezarPromesa';
};


const consumirApi = ()=>{

    //producing code
    let promesaApi = new Promise((resuelve, rechaza)=>{
        // producing code - El codigo que toma tiempo
        let endpoint = 'https://mindicador.cl/api';

        fetch(endpoint)
        .then(respuesta => respuesta.json())
        .then(json => {
            console.log(json);
            resuelve(json);
         })
        .catch(error=>{
            console.log('fallo consumiendo la promesa', error)
            rechaza(error);
        });
    });

// consuming code
promesaApi.then(
    (respuesta)=>{
        let elParrafoNombreResultado = document.getElementById('nombreResultado');
        elParrafoNombreResultado.innerText = respuesta.dolar.nombre;

        let elParrafoValorResultado = document.getElementById('valorResultado');
        elParrafoValorResultado.innerText = respuesta.dolar.valor;
    })
    .catch(
    (objetoError)=>{
        console.log('No se resuelve la promesa', objetoError);
        let elParrafoNombreResultado = document.getElementById('nombreResultado');
        elParrafoNombreResultado.innerText = 'Error consumiendo API - Nombre';

        let elParrafoValorResultado = document.getElementById('valorResultado');
        elParrafoValorResultado.innerText = 'Error consumiendo API - Valor';
    }
);





} ;


const asignarEventos = ()=>{
    let elBoton = document.getElementById('btnCarga');
    elBoton.addEventListener('click', empezar);

    let elBotonPromesa = document.getElementById('btnPromesa');
    elBotonPromesa.addEventListener('click', empezarPromesa);

    let elBotonApi = document.getElementById('btnApi');
    elBotonApi.addEventListener('click', consumirApi);
};







