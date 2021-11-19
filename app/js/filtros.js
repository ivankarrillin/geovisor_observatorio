import municipios from '../json/municipios.json'
import departamentos from '../json/departamentos.json'


$.each(departamentos, function(key, value) {   
    
    $('#departamento')
        .append($("<option></option>")
                   .addClass(value.cod_dpto.toString())
                   .attr("value",value.cod_dpto)
                   .text(value.nombre)); 
});


$.each(municipios, function(key, value) {   
    
  $('#municipio')
      .append($("<option></option>").addClass(value.cod_dpto.toString())
                 .attr("value",value.cod_mpio+","+value.bbox)
                 .text(value.nombre)); 
});

$('#ver_mun').hide();


var allOptions = $('#municipio option')

$('#departamento').change(function () {

  var valor=$(this).val();


  if(valor==""){
    $('#ver_mun').hide();
    return
  }else{
    $('#ver_mun').show();
  }


  $('#municipio option').remove()
  var classN = $('#departamento option:selected').prop('class');
  var opts = allOptions.filter('.' + classN);
  
  $('#municipio')
  .append($("<option></option>")
  .text("Seleccione..")); 

  $.each(opts, function (i, j) {
      $(j).appendTo('#municipio');
  })
  $("#municipio").val($("#municipio option:first").val());

})
/*
var my_json = JSON.stringify(municipios)

$('#departamento').on('change', function() {
    
    var cod_dpto=$(this).val()
       
    $('#municipio')
    .find('option')
    .remove()
    .end()
    .append($("<option></option>")
    .text("Seleccione..")); 

    var filtered_json = find_in_object(JSON.parse(my_json), {cod_dpto: cod_dpto});
    
    $.each(filtered_json, function(key, value) {   
    
        $('#municipio')
            .append($("<option></option>")
                       .attr("value",value.cod_mpio+","+value.bbox)
                       .text(value.nombre)); 
    });

  });

  function find_in_object(my_object, my_criteria){
    
    return my_object.filter(function(obj) {
      return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
      });
    });
  
  }
*/