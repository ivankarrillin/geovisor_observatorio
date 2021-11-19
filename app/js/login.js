
import $ from 'jquery';

const servidor =require('./request.js')

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../img/', false, /\.(png|jpg|svg)$/));



$( "#btn_login" ).click(function() {

  var usuario=$('#email').val();
  var pwd=$('#password').val();
  
  var data={"usuario":usuario, "clave":pwd,"id_consulta":"get_usuario"}

    servidor.servidorPost('https://visor01.dane.gov.co/login',data).then(function(response){
      
      if(response.data.length>0){
        document.location.href = 'index.html';
      }
    });


});




console.log("bien ok")