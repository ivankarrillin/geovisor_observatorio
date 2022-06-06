const axios = require('axios');

//http://visor01.dane.gov.co/

var direccion="https://visor01.dane.gov.co/"

// var direccion = "http://localhost:9000/"



function servidorPost(uri,datos){

    return axios({
        method: 'post',
        url: direccion+uri,
        data: datos,
        withCredentials: false
        })

}

function servidorGet(uri) {
        
        return axios.get(direccion+uri).then(resp => {
        return(resp.data);
    });
}


function getData(uri) {
    
    return axios.get(uri,
        
        {
            responseType: 'arraybuffer'
        }
    ).then(resp => {

        return (resp);
        
    });
    
}

function redireccionar(error){
    if(error.response.status==403){
        window.location.href = './login.html';
    }
}


exports.servidorPost=servidorPost;
exports.servidorGet=servidorGet;
exports.redireccionar=redireccionar;

exports.getData = getData;