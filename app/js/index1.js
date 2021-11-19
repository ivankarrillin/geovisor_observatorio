import $ from 'jquery';
import '../css/styles.scss';
//import 'materialize-css/dist/js/materialize.min.js';

import 'jquery-toast-plugin'
import 'jquery-toast-plugin/dist/jquery.toast.min.css'

import 'bootstrap/js/dist/modal'

const servidor =require('./request.js')
  
var JSZip = require("jszip");
var zip = new JSZip();

var data={"id_consulta":"permisos"}

import json from '../tema/style.json'
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Load from './util'

//import mobility from '../json/movilidad.json'

let initialTime = new Date("2020-06-01Z08:00:00")
   ,endTime     = new Date("2021-02-28Z08:00:00")
   ,arrTime     = []
   ,dayMillisec = 24 * 60 * 60 * 1000
   ;
for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
  arrTime.push(q.toISOString().substring(0, 10));
}

// var loading=ReactDOM.render(<Load visible={true} />, document.getElementById('loader'));

var mov_json=""
      

var calendario = [
"2020-03-02",
"2020-03-09",
"2020-03-16",
"2020-03-23",
"2020-03-30",
"2020-04-06",
"2020-04-13",
"2020-04-20",
"2020-04-27",
"2020-05-04",
"2020-05-11",
"2020-05-18",
"2020-05-25",
"2020-05-31"
]

calendario=calendario.concat(arrTime)

  const changeValores = (dia) => {
    mov_json.forEach((row) => {
        
        if (row['f'] === dia) {
          var movilidad = row['m'];
          var id = row['id'];
          newdata[id] = {
              movilidad: movilidad
          }
        }
      })
}
  
  const setCountiesColor = () => {
    for (let key in newdata) {
      map.setFeatureState({
        source: 'mov',
        sourceLayer: 'sector_u-cctf9n',
        id: key
      }, {
              'color': newdata[key].movilidad < 0 ? blueScale(newdata[key].movilidad) : redScale(newdata[key].movilidad),
            'movilidad':newdata[key].movilidad,
            'hover': true
        
      })
        
    }
  }

  function blueScale(mov) {
    
    var indice = Math.abs(Math.round(mov / 0.01));
    //console.log(indice)
    var color = colorArray_blue[indice];
    

    return color;
}

  function redScale(mov) {
    
    var indice = Math.abs(Math.round(mov / 0.01));
    //console.log(indice)
    var color = colorArray_red[indice];
    

    return color;
  }
  /*
  $( "#transparencia_old" ).change(function() {
    var valor=$(this).val()

  map.setPaintProperty(
      'adultos_mayores',
      'fill-extrusion-opacity',
      parseInt(valor) / 100
      );
  });
*/

function interpolateColor(color1, color2, factor) {
if (arguments.length < 3) { 
  factor = 0.5; 
}
var result = color1.slice();
for (var i = 0; i < 3; i++) {
  result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
}
return result;
};
// My function to interpolate between two colors completely, returning an array
function interpolateColors(color1, color2, steps) {
var stepFactor = 1 / (steps - 1),
  interpolatedColorArray = [];

color1 = color1.match(/\d+/g).map(Number);
color2 = color2.match(/\d+/g).map(Number);

for (var i = 0; i < steps; i++) {

  var array_c=interpolateColor(color1, color2, stepFactor * i)
  var color3 = '#' + int_to_hex(array_c[0]) + int_to_hex(array_c[1]) + int_to_hex(array_c[2]);
  interpolatedColorArray.push(color3);
}

return interpolatedColorArray;
}

function int_to_hex(num)
{
var hex = Math.round(num).toString(16);
if (hex.length == 1)
    hex = '0' + hex;
return hex;
}

const colorArray_blue = interpolateColors("rgb(0, 197, 220)", "rgb(98, 0, 110)", 100);
const colorArray_red = interpolateColors("rgb(255, 255, 29)", "rgb(255, 29, 29)", 100);


if (window!=window.top){

   

}else{
    /*
    servidor.servidorPost('https://geoportal.dane.gov.co/visor_covid/backend',data).then(function(response){
        console.log(response.headers)
        if(response.data.length>0){
          console.log(response)
          
        }
      }).catch((error) => {
          console.log(error)
          window.location.href = './login.html'
      });
      */
}

// Listeners

// $(".container-tool").on("click", function(e){
    
//     let container = $(this).children()[0]
//     $(container).addClass('round-tool-selected');
//     console.log(container)
// })





$.toast({
    heading: 'Información',
    text: 'Mueva el mapa para calcular las estadísticas que aparecen en el diagrama',
    icon: 'info',
    loader: true,        // Change it to false to disable loader
    loaderBg: '#FFFFFF',  // To change the background
    position: {
        right: 50,
        top: 100
    },
    hideAfter:4000,
    bgColor: '#B80150',
    textColor: 'white',
    afterHidden: function () {
        
        $.toast({
            heading: 'Información',
            text: 'Active las capas dando click sobre las mismas',
            icon: 'info',
            loader: true,        // Change it to false to disable loader
            loaderBg: '#FFFFFF',  // To change the background
            position: {
                right: 50,
                top: 100
            },
            hideAfter:4000,
            bgColor: '#B80150',
            textColor: 'white'
        })
        $.toast({
            heading: 'Información',
            text: 'Active el <b>MAPA 3D</b> manipulando la herramienta:  <i class="fas fa-caret-up"></i> en la parte superior derecha del mapa',
            icon: 'info',
            loader: true,        // Change it to false to disable loader
            loaderBg: '#FFFFFF',  // To change the background
            position: {
                right: 50,
                top: 100
            },
            hideAfter:8000,
            bgColor: 'white',
            textColor: '#B80150'
        })

    }
})




//toda esta cheet para los iconos de font-awesome 5
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


import './filtros'

import geometria from '../json/bbox.json'

import casos from '../json/casos.json'




function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

const images = importAll(require.context('../img/', false, /\.(png|jpg|svg)$/));







var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNrbzV5b3J2NDFiNzQybmxybm4xaHNic2EifQ.r3_xlsBMvBLb97b2JbmKAA';
// mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNqc2ZkOTNtMjA0emgzeXQ3N2ppMng4dXAifQ.2k-OLO6Do2AoH5GLOWt-xw';

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $(document).ready(function(){
    $("#acerca").click(function(){
        $("#ayuda").modal();
      });

    $('#logout').click(function(){
    servidor.servidorPost('https://geoportal.dane.gov.co/visor_covid/logout',null).then(function(response){
    
        if(response.data.mensaje=='logout'){
        window.location.href = "../visor_covid/login.html";
    
        }
    });
    });

//$('#check_pobreza,#check_riesgo,#check_ips,#check_covid,#check_old').attr( 'checked', true )
$('#check_pobreza').attr( 'checked', true )
// $('#panel_ipm').click()
$('#chart1,#chart3,#chart4,#chart5,#chart6,#chart7').hide()

$("#check_pobreza").change(function () {
        $('#panel_ipm').click()
    
    if(this.checked) {
        map.setLayoutProperty('ipm_nacional', 'visibility', 'visible');
      $('#chart2').show()
    }else{
        map.setLayoutProperty('ipm_nacional', 'visibility', 'none');
      $('#chart2').hide()
    }
});

$("#check_embarazo").change(function () {
    $('#panel_embarazo').click()

if(this.checked) {
    map.setLayoutProperty('embarazo', 'visibility', 'visible');
  $('#chart6').show()
}else{
    map.setLayoutProperty('embarazo', 'visibility', 'none');
  $('#chart6').hide()
}
});

$("#check_empleo").change(function () {
    $('#panel_empleo').click()

if(this.checked) {
    map.setLayoutProperty('empleo', 'visibility', 'visible');
  $('#chart7').show()
}else{
    map.setLayoutProperty('empleo', 'visibility', 'none');
  $('#chart7').hide()
}
});

      $("#check_riesgo").change(function () {
        $('#panel_riesgo').click()
    
    if(this.checked) {
       map.setLayoutProperty('riesgo', 'visibility', 'visible');
        $('#chart3').show()
    } else {
        map.setLayoutProperty('riesgo', 'visibility', 'none');
        $('#chart3').hide()
    }
});
      $("#check_adulto60").change(function () {
          
    $('#panel_adulto60').click()

    if(this.checked) {

        map.setLayoutProperty('adulto60', 'visibility', 'visible');
        $('#chart4').show()


    }else{
        
        map.setLayoutProperty('adulto60', 'visibility', 'none');
      $('#chart4').hide()

    }
});
      $("#check_adulto70").change(function () {
        $('#panel_adulto70').click()
    
    if(this.checked) {

    map.setLayoutProperty('adulto70', 'visibility', 'visible');
      $('#chart5').show()

    } else {

    map.setLayoutProperty('adulto70', 'visibility', 'none');
      $('#chart5').hide()

    }
});

      
$("#check_app").change(function() {
    if(this.checked) {
        //map.setLayoutProperty('encuestas', 'visibility', 'visible');
        //map.setLayoutProperty('encuestas-heat', 'visibility', 'visible');

    }else{
        //map.setLayoutProperty('encuestas', 'visibility', 'none');
        //map.setLayoutProperty('encuestas-heat', 'visibility', 'none');


    }
});

$("#check_ips").change(function () {
    $('#panel_ips').click()
    if(this.checked) {
        map.setLayoutProperty('clusters', 'visibility', 'visible');
        map.setLayoutProperty('cluster-count', 'visibility', 'visible');
        map.setLayoutProperty('unclustered-point', 'visibility', 'visible');
    }else{
        map.setLayoutProperty('clusters', 'visibility', 'none');
        map.setLayoutProperty('cluster-count', 'visibility', 'none');
        map.setLayoutProperty('unclustered-point', 'visibility', 'none');
    }
});
    $("#check_hotel").change(function () {
        $('#panel_hotel').click()
    if(this.checked) {
        map.setLayoutProperty('clusters_h', 'visibility', 'visible');
        map.setLayoutProperty('cluster-count_h', 'visibility', 'visible');
        map.setLayoutProperty('unclustered-point_h', 'visibility', 'visible');
    }else{
        map.setLayoutProperty('clusters_h', 'visibility', 'none');
        map.setLayoutProperty('cluster-count_h', 'visibility', 'none');
        map.setLayoutProperty('unclustered-point_h', 'visibility', 'none');
    }
});

$("#check_movilidad").change(function () {
if(this.checked) {
    map.setLayoutProperty('movilidad', 'visibility', 'visible');
    $('#info_fecha').show();
}else{
    map.setLayoutProperty('movilidad', 'visibility', 'none');
    $('#info_fecha').hide();

}
});

      

$( "#transparencia_embarazo" ).change(function() {
    var valor = $(this).val()
    

    map.setPaintProperty(
        'embarazo',
        'fill-extrusion-opacity',
        parseInt(valor) / 100
        );
        
    });

    $( "#transparencia_empleo" ).change(function() {
        var valor = $(this).val()
        
    
        map.setPaintProperty(
            'empleo',
            'fill-extrusion-opacity',
            parseInt(valor) / 100
            );
            
        });


  $( "#transparencia_pobreza" ).change(function() {
    var valor = $(this).val()
    

    map.setPaintProperty(
        'ipm_nacional',
        'fill-extrusion-opacity',
        parseInt(valor) / 100
        );
        
    });

    
    $( "#transparencia_movilidad" ).change(function() {
        var valor=$(this).val()
   
      map.setPaintProperty(
          'movilidad',
          'fill-opacity',
          parseInt(valor) / 100
          );
        
      });251020

      $( "#altura_embarazo" ).change(function() {
        var valor=$(this).val()
        map.setPaintProperty('embarazo', 'fill-extrusion-height', [
            "interpolate",
            ["linear"],
            ["get", "categoria"],
            0,
            0,
            1,
            2*valor,
            2,
            5*valor,
            3,
            10*valor,
            4,
            20*valor,
            5,
            40*valor
          ])

      });

      $( "#altura_empleo" ).change(function() {
        var valor=$(this).val()
        map.setPaintProperty('empleo', 'fill-extrusion-height', [
            "interpolate",
            ["linear"],
            ["get", "joven_cat"],
            0,
            0,
            1,
            2*valor,
            2,
            5*valor,
            3,
            10*valor,
            4,
            20*valor,
            5,
            40*valor
          ])

      });

      
    $( "#altura_pobreza" ).change(function() {
        var valor=$(this).val()
        map.setPaintProperty('ipm_nacional', 'fill-extrusion-height', ["*",valor/10, ["get", "ipm"]])

      });
      /*
      $( "#altura_old" ).change(function() {
        var valor=$(this).val()
        map.setPaintProperty('adultos_mayores', 'fill-extrusion-height', ["*",valor/10, ["get", "porc_admay"]])

      });
*/
      
    $( "#altura_riesgo" ).change(function() {
        var valor=parseInt($(this).val())
        map.setPaintProperty('riesgo', 'fill-extrusion-height', [
            "interpolate",
            ["linear"],
            ["get", "cluster"],
            0,
            0,
            1,
            20*valor,
            2,
            10*valor,
            3,
            5*valor,
            4,
            2*valor
          ])

    });

    $( "#transparencia_riesgo" ).change(function() {
        var valor=$(this).val()
        
      map.setPaintProperty(
          'riesgo',
          'fill-extrusion-opacity',
          parseInt(valor) / 100
          );
          
      });


    $( "#altura_adulto60" ).change(function() {
        var valor=$(this).val()/5
        map.setPaintProperty('adulto60', 'fill-extrusion-height', ["*",valor/1, ["get", "porc_60"]])

    });

    $( "#transparencia_adulto60" ).change(function() {
        var valor=$(this).val()


      map.setPaintProperty(
          'adulto60',
          'fill-extrusion-opacity',
          parseInt(valor) / 100
          );
          
      });

    $( "#altura_adulto70" ).change(function() {
        var valor=$(this).val()/5
        map.setPaintProperty('adulto70', 'fill-extrusion-height', ["*",valor/1, ["get", "porc_70"]])

    });


    var input = document.getElementById("fecha_movilidad");
    input.setAttribute("max",calendario.length);

      var play = "";
      var valor = 0;
      $("#play_movilidad").change(function() {
          if (!this.checked) {
                          
              
                play= setInterval(function(){
                    valor = valor + 1;
                    console.log(valor)
                    var dia = calendario[valor];
                    $('.texto_fecha').text(dia);
        
                    var input = document.getElementById("fecha_movilidad");
                    input.value = valor;
        
        
                    changeValores(dia)
            
                    setCountiesColor();

                if (valor <calendario.length) {
                    } else {
                    clearInterval(play);
                  }
                  }, 1000);
              
              
         
          } else {
              
            clearInterval(play);
            

        }
    });


    $( "#fecha_movilidad" ).change(function() {
        valor=parseInt($(this).val())
        console.log(valor)
        var dia = calendario[valor];
        $('.texto_fecha').text(dia);
        changeValores(dia)
        setCountiesColor();
      });


      
    $( "#transparencia_adulto70" ).change(function() {
      var valor = $(this).val()
      map.getPane('adulto70').style.opacity = parseInt(valor) / 100;
      
 
      map.setPaintProperty(
          'adulto70',
          'fill-extrusion-opacity',
          parseInt(valor) / 100
          );
          
      });

      var container = document.getElementsByClassName("container-tool");

      
      var selected;
      for(var i = 0; i < container.length; i++){
        container[i].addEventListener("click", function(){
            cleanTools(i); 
            $(this).addClass("container-tool-active");      
        })

      }

      function cleanTools(i){
        for(var k = 0; k < container.length; k++){
            if(k != i){
                $(container[k]).removeClass("container-tool-active");
            }
        }
      }

 
      var acc = document.getElementsByClassName("accordion");
      var i;
      
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          let icon = $(this).children()[0];
          
          console.log($(this).text())
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            if($(panel).hasClass("leg")){
                $(this).css("background-color","white");
                $(this).css("color","#4B4B4B"); 
            }else{
                $(icon).css("color","#97034C");
                $(this).css("background-color","#F2F2F2");
                $(this).css("color","#2E2E2E"); 
            }
            
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            if($(panel).hasClass("leg")){
                $(this).css("background-color","white");
                $(this).css("color","#4B4B4B"); 
            }else{  
                $(icon).css("color","white");
                $(this).css("background-color","#97034C");
                $(this).css("color","white");
            }
            
          } 
        });
      }
      $( '.active' ).click ();


      $("#ayuda").click(function(){
        $("#modal1").modal();
        // $('#wrapper').toggleClass('wrapper toggled')
 
      });

      $('.modal').on('hidden.bs.modal', function (e) {
        // var iframe = $('#iframe')
        // $('#wrapper').removeClass('wrapper toggled')
        
        // iframe.attr("src", iframe.attr("src"));
      });

      //Listeners secciones

    $("#consultas").on("click",function(){

        $("#filtro-consultas").show();
        $("#filtro-ayuda").hide();
        $("#filtro-descarga").hide();
        $("#filtro-mapas").hide();
    })

    $("#mapas-base").on("click",function(){
        $("#filtro-consultas").hide();
        $("#filtro-mapas").show();
    })

    // Mapas base
    $("input[name='radioBaseMap']").on("change",function(e){
        console.log(e.target.value);
        var mapaSeleccionado = e.target.value;
        if(mapaSeleccionado == "Noche"){
            map.setStyle(json);
        }else if(mapaSeleccionado == "Gris"){
            map.setStyle('mapbox://style/mapbox/light-v10');
        }else if(mapaSeleccionado == "OSM"){
            map.setStyle('mapbox://style/mapbox/streets-v11');
        }else if(mapaSeleccionado == "Satelital"){
            map.setStyle('mapbox://style/mapbox/satellite-streets-v11');
        }
    })

    //Listeners modal ayuda

    var tabs = document.getElementsByClassName("tab");
    var panes = document.getElementsByClassName("tab-pane");

    
    $(".tab").on("click",function(){
        var child = $(this).children()[0];
        var attribute = $(child).attr("aria-controls");
        for(var i = 0; i < tabs.length; i++){
            $(tabs[i]).removeClass("tab-active");
            
            if(attribute == $(panes[i]).attr("id")){
                $(panes[i]).addClass("tab-pane-active");
            }else{
                $(panes[i]).removeClass("tab-pane-active");
            }
        }
        $(this).addClass("tab-active");

    })



  });

  

// $("#consultas").on("click",function(){
//     $("#filtro-consultas").show();
//     $("#filtro-ayuda").hide();
//     $("#filtro-descarga").hide();
//     $("#filtro-mapas").hide();
// })

// $("#consultas").on("click",function(){
//     $("#filtro-consultas").show();
//     $("#filtro-ayuda").hide();
//     $("#filtro-descarga").hide();
//     $("#filtro-mapas").hide();
// })



var coordinate = []
var cod_mpio = '';

var map = new mapboxgl.Map({
    container: 'mapa',
    style: json,
    center: [-74.1083125, 4.663437],
    zoom: 11,
});



map.addControl(new mapboxgl.NavigationControl());

var newdata = new Map();



map.on('load', function () {

    inicializarMapa();



/*
    $.toast({
        heading: 'Información',
        text: 'Capa de movilidad cargada, verifique el panel izquierdo',
        icon: 'info',
        loader: true, // Change it to false to disable loader
        loaderBg: '#FFFFFF', // To change the background
        position: {
            right: 50,
            top: 100
        },
        hideAfter: 4000,
        bgColor: '#B80150',
        textColor: 'white'
    })


    
    

    mov_json.forEach((row) => {
        if (row['fecha'] === '2020-03-02') {
            const movilidad = row['movilidad'];
            const id = row['id'];
            newdata[id] = {
                movilidad: movilidad
            }
        }
    })


    const initLayers = () => {

        map.addSource('mov', {
            'type': 'vector',
            'url': 'mapbox://ivan12345678.2iq3uds4',
            'promoteId': 'id'
        });

        map.addLayer({
            'id': 'movilidad',
            'type': 'fill',
            'source': 'mov',
            'source-layer': 'sector_u-cctf9n',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': ['feature-state', 'color'],
                'fill-outline-color': '#fff',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0
                ]
            }
        }, 'waterway-label');


        const setAfterLoad = (e) => {
            if (e.sourceId === 'mov' && e.isSourceLoaded) {
                
                setCountiesColor();
                map.off('sourcedata', setAfterLoad)
            }
        }

        if (map.isSourceLoaded('mov')) {
        

            setCountiesColor();
        } else {
          

            map.on('sourcedata', setAfterLoad);
        }
    }

    $('#movility').show();

    initLayers();

*/













    /*
    servidor.servidorPost('backend', data).then(function (response) {



        map.addSource('covid', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data:
                //'http://localhost:8080/geoserver/DANE/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DANE:hoteles&outputFormat=application%2Fjson',
                response.data,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            "id": "clusters_c",
            "type": "circle",
            "source": "covid",

            filter: ['has', 'point_count'],
            paint: {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#92ff89',
                    25,
                    '#20c603',
                    100,
                    '#327314',
                    750,
                    '#0b5901'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count_c',
            type: 'symbol',
            source: 'covid',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            },
            paint: {
                "text-color": "#000"
            }
        });
        map.addLayer({
            id: 'unclustered-point_c',
            type: 'circle',
            source: 'covid',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#92ff89',
                'circle-radius': 5,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });


    });

*/
















    /*       
          map.addLayer({
              id: 'encuestas',
              type: 'circle',
              source: 'encuestas',
              "source-layer": "encuestas",
              'layout': {
                  'visibility': 'none'
                  },
              paint: {
              'circle-color': '#00AB48',
              'circle-radius': 3,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
              },
              minzoom:12
              });
                          
           
              map.addLayer({
                  id: 'encuestas-heat',
                  type: 'heatmap',
                  source: 'encuestas',
                  "source-layer": "encuestas",
                  maxzoom: 15,
                  minzoom:1,
                  'layout': {
                      'visibility': 'none'
                      },
                  paint: {
                    // increase weight as diameter breast height increases
  
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                      stops: [
                        [11, 1],
                        [15, 3]
                      ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                      "interpolate",
                      ["exponential", 1.96],
                      ["heatmap-density"],
                      0,
                      "rgba(0, 0, 255, 0)",
                      0.1,
                      "#D1FAFF",
                      0.3,
                      "cyan",
                      0.9,
                      "#7BA8FF",
                      1,
                      "#528EFF"
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                      stops: [
                        [5, 10],
                        [11, 5],
                        [15, 3],
                      ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                      default: 1,
                      stops: [
                        [10, 1],
                        [14, 0.8],
                        [15, 0]
                      ]
                    },
                  }
                }, 'waterway-label');
  */





    /*
              map.addLayer(
                  {
                      "id": "municipios",
                      "type": "line",
                      "source": "osm",
                      "source-layer": "municipios",
                      paint:{
                          'line-color': '#2CE4FB',
                          'line-width': 1
                      },
                      filter: ["==", "mpio_ccdgo", "0"],
                      "maxZoom": 13
                  },
                  'waterway-label'
                  );
                  */




});

map.on('style.load', function(){
    inicializarMapa();
})

function inicializarMapa(){
    map.addSource('ip', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.10cdldso'
    });

    map.addSource('risk', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.9t8jbmu0'
    });

    map.addSource('adulto', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.930f25j6'
    });

    map.addSource('embarazo', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7cyvt140'
    });

    map.addSource('empleo', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.5xultu02'
    });




    map.addSource('hospital', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data:
            //'http://localhost:8080/geoserver/DANE/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DANE:hospitales&outputFormat=application%2Fjson',
            './json/hospitales.json',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addSource('hoteles', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data:
            //'http://localhost:8080/geoserver/DANE/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DANE:hoteles&outputFormat=application%2Fjson',
            './json/hoteles.json',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });




    map.addLayer({
            "id": "ipm_nacional",
            "type": "fill-extrusion",
            "source": "ip",
            "source-layer": "ipm-0lz2gv",
            paint: {

                'fill-extrusion-color': {
                    'property': 'ipm',
                    'stops': [
                        [0, '#FFDFF3'],
                        [1, '#D899C1'],
                        [20, '#C56FA5'],
                        [40, '#CA4D9C'],
                        [60, '#D70289'],
                        [80, '#74004A']
                    ]
                },

                //'fill-opacity': 0.8,

                //'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': ["*", 0, ["get", "ipm"]],
            }
        },
        'waterway-label'
    );






    map.addLayer({
            "id": "riesgo",
            "type": "fill-extrusion",
            "source": "risk",
            "source-layer": "riesgo-7nrtbm",
            'layout': {
                'visibility': 'none'
            },
            paint: {
                'fill-extrusion-color': {
                    'property': 'cluster',
                    'stops': [
                        [0, '#FFD0BE'],
                        [1, '#950000'],
                        [2, '#FF3E35'],
                        [3, '#FF955C'],
                        [4, '#FF6F35']

                    ]


                },


                'fill-extrusion-height': [
                    "interpolate",
                    ["linear"],
                    ["get", "cluster"],
                    0,
                    0,
                    1,
                    0,
                    2,
                    0,
                    3,
                    0,
                    4,
                    0
                ],




                'fill-extrusion-opacity': 0.8
            }
        },
        'waterway-label'
    );

    map.addLayer({
            "id": "adulto60",
            "type": "fill-extrusion",
            "source": "adulto",
            "source-layer": "ADLTMAYORxMZ-dajd93",
            'layout': {
                'visibility': 'none'
            },
            paint: {
                'fill-extrusion-color': {
                    'property': 'porc_60',
                    'stops': [
                        [0, '#EDFFE7'],
                        [10, '#C7F1BA'],
                        [15, '#97DEB2'],
                        [20, '#70CFB6'],
                        [25, '#5FA2C5'],
                        [100, '#1D6BB9']

                    ]


                },
                'fill-extrusion-height': ["*", 10, ["get", "porc_60"]],
                'fill-extrusion-opacity': 0.8
            }
        },
        'waterway-label'
    );

    map.addLayer({
            "id": "adulto70",
            "type": "fill-extrusion",
            "source": "adulto",
            "source-layer": "ADLTMAYORxMZ-dajd93",
            'layout': {
                'visibility': 'none'
            },
            paint: {
                'fill-extrusion-color': {
                    'property': 'porc_70',
                    'stops': [
                        [0, '#F4EAFF'],
                        [5, '#E5D4ED'],
                        [10, '#BECDE6'],
                        [15, '#9ABBF8'],
                        [20, '#209C98'],
                        [100, '#006859']

                    ]


                },
                'fill-extrusion-height': ["*", 10, ["get", "porc_70"]],
                'fill-extrusion-opacity': 0.8
            }
        },
        'waterway-label'
    );



    /*
    map.addLayer(
        {
            "id": "adultos_mayores",
            "type": "fill-extrusion",
            "source": "osm",
            "source-layer": "adultos_mayores",
            'layout': {
                'visibility': 'none'
                },
            paint: {
                'fill-extrusion-color': {
                    'property': 'porc_admay',
                    'stops': [
                        [0, '#F4FFD7'],
                        [1, '#ABE18C'],
                        [25, '#7DDAC8'],
                        [50, '#7DB9DA'],
                        [75, '#0071AF']
                    ]
                  },
                  'fill-extrusion-height': ["*",0, ["get", "porc_admay"]],
                  
              }
        },
        'waterway-label'
        );
        */


    map.addLayer({
        "id": "clusters",
        "type": "circle",
        "source": "hospital",
        'layout': {
            'visibility': 'none'
        },
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#6CC4FE',
                100,
                '#4BB3F8',
                750,
                '#0070BC'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'hospital',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'visibility': 'none'
        }
    });
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'hospital',
        filter: ['!', ['has', 'point_count']],
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
    //hoteles cluster

    map.addLayer({
        "id": "clusters_h",
        "type": "circle",
        "source": "hoteles",
        'layout': {
            'visibility': 'none'
        },
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#FF8EDE',
                100,
                '#CF41A6',
                750,
                '#890061'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count_h',
        type: 'symbol',
        source: 'hoteles',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'visibility': 'none'
        },
        paint: {
            "text-color": "#ffffff"
        }
    });
    map.addLayer({
        id: 'unclustered-point_h',
        type: 'circle',
        source: 'hoteles',
        filter: ['!', ['has', 'point_count']],
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'circle-color': '#FF8EDE',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    map.addLayer({
        "id": "embarazo",
        "type": "fill-extrusion",
        "source": "embarazo",
        "source-layer": "embarazo_Adolescente-bt4d7h",
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'fill-extrusion-color': {
                'property': 'categoria',
                'stops': [
                    [1, '#ffa1ef'],
                    [2, '#f568b5'],
                    [3, '#e5097f'],
                    [4, '#9b0247'],
                    [5, '#560015']

                ]


            },
            'fill-extrusion-height': ["*", 0, ["get", "categoria"]],
            // 'fill-extrusion-opacity': 0.8
        }
    },
    'waterway-label'
);

map.addLayer({
    "id": "empleo",
    "type": "fill-extrusion",
    "source": "empleo",
    "source-layer": "reactivacion-1s5u0s",
    'layout': {
        'visibility': 'none'
    },
    paint: {
        'fill-extrusion-color': {
            'property': 'joven_cat',
            'stops': [
                [1, '#D3FDED'],
                [2, '#8EFAD1'],
                [3, '#17F5A0'],
                [4, '#09CD82'],
                [5, '#068052']

            ]


        },
        'fill-extrusion-height': ["*", 0, ["get", "joven_cat"]],
        // 'fill-extrusion-opacity': 0.8
    }
},
'waterway-label'
);




    servidor.getData('visor-vulnerabilidad/mov').
      then(function (response) {
  
          getMovility(response)
  
      });


    const getMovility=(response)=>{


      console.log(response)
      console.log(response.data)
      
        zip.loadAsync(response.data)
        .then(function(zip) {
            // you now have every files contained in the loaded zip
          console.log(zip)
          
          zip.file("movilidad.json").async("string").then(function (response) { 
    
            response= JSON.parse(response)
              
            $.toast({
                heading: 'Información',
                text: 'Capa de movilidad cargada, verifique el panel izquierdo',
                icon: 'info',
                loader: true, // Change it to false to disable loader
                loaderBg: '#FFFFFF', // To change the background
                position: {
                    right: 50,
                    top: 100
                },
                hideAfter: 4000,
                bgColor: '#B80150',
                textColor: 'white'
            })
            document.getElementById('loader-capa').style.display = "none";
    
            
            mov_json = response;
    
            mov_json.forEach((row) => {
                if (row['f'] === '2020-03-02') {
                    const movilidad = row['m'];
                    const id = row['id'];
                    newdata[id] = {
                        movilidad: movilidad
                    }
                }
            })
     
    
            const initLayers = () => {
    
                map.addSource('mov', {
                    'type': 'vector',
                    'url': 'mapbox://ivan12345678.2iq3uds4',
                    'promoteId': 'id'
                });
    
                map.addLayer({
                    'id': 'movilidad',
                    'type': 'fill',
                    'source': 'mov',
                    'source-layer': 'sector_u-cctf9n',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-color': ['feature-state', 'color'],
                        'fill-outline-color': '#fff',
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                    }
                }, 'waterway-label');
    
    
                const setAfterLoad = (e) => {
                    if (e.sourceId === 'mov' && e.isSourceLoaded) {
                        
                        setCountiesColor();
                        map.off('sourcedata', setAfterLoad)
                    }
                }
    
                if (map.isSourceLoaded('mov')) {
                
    
                    setCountiesColor();
                } else {
                  
    
                    map.on('sourcedata', setAfterLoad);
                }
            }
    
            $('#movility').show();
    
            initLayers();
            
          })
          
    
    
        }); 





    }
}
map.on('click', 'clusters', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
    });

    var clusterId = features[0].properties.cluster_id;
    map.getSource('covid').getClusterExpansionZoom(
        clusterId,
        function (err, zoom) {
            if (err) return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        }
    );
});

map.on('click', 'unclustered-point_h', function (e) {

    //console.log(e.features[0].properties)
    var prop = e.features[0].properties

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<div class="card">' +
            '<div class="row">' +
            '<div class="col">' +
            ' <img class="card-img-top" src="./img/hotel.png" alt="Card image cap">' +
            '</div>' +
            '<div class="col">' +
            '<h6 class="card-title">' + prop.nombre_est + '</h6>' +
            ' </div>' +
            '</div>' +
            '<div class="card-body">' +
            '<p class="card-text">Razón social: ' + prop.razon_soci + '</p>' +
            '<p class="card-text">Correo: ' + prop.correo_ele + '</p>' +
            '<p class="card-text">Teléfono: ' + prop.telefono + '</p>' +
            '<p class="card-text">NIT: ' + prop.nit + '</p>' +
            '<p class="card-text">RNT: ' + prop.rnt + '</p>' +
            ' </div>' +
            '</div>'
        )
        .addTo(map);

});

map.on('click', 'unclustered-point', function (e) {

    // console.log(e.features[0].properties)
    var prop = e.features[0].properties

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<div class="card">' +
            '<div class="row">' +
            '<div class="col">' +
            ' <img class="card-img-top" src="./img/cruz.png" alt="Card image cap">' +
            '</div>' +
            '<div class="col">' +
            '<p>IPS: ' + prop.nombre + '</p>' +
            ' </div>' +
            '</div>' +
            '</div>'
        )
        .addTo(map);

});



map.on('click', 'ipm_nacional', function (e) {
    var mensaje = e.features[0].properties.ipm
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje.toFixed(2);
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("IPM : " + mensaje)
        .addTo(map);
});

map.on('click', 'embarazo', function (e) {
    var mensaje = e.features[0].properties.label
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje;
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(mensaje)
        .addTo(map);
});

map.on('click', 'empleo', function (e) {
    var mensaje = e.features[0].properties.joven_labe
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje;
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(mensaje)
        .addTo(map);
});

map.on('click', 'movilidad', function (e) {
    var mensaje = e.features[0].state.movilidad
    mensaje = parseFloat(mensaje) * 100
    mensaje = mensaje.toFixed(2);
    mensaje = mensaje + '%'
    console.log(e.features[0])
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<div class="card">' +
            '<div class="row">' +
            '<div class="col">' +
            ' <img class="card-img-top" src="./img/coche.png" alt="Card image cap" style="width:50px">' +
            '</div>' +
            '<div class="col">' +
            '<p>Movilidad</p>' +
            '<div class="porcentaje">' + mensaje + '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
        .addTo(map);
});




map.on('click', 'adulto60', function (e) {
    var mensaje = e.features[0].properties.porc_60
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje.toFixed(2);
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("% de adultos mayores de 60 años: " + mensaje)
        .addTo(map);
});
map.on('click', 'adulto70', function (e) {
    var mensaje = e.features[0].properties.porc_70
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje.toFixed(2);
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("% de adultos mayores de 70 años: " + mensaje)
        .addTo(map);
});

map.on('click', 'encuestas', function (e) {
    var mensaje = e.features[0].properties

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<div class="card">' +
            '<div class="row">' +
            '<div class="col">' +
            ' <img class="card-img-top" src="./img/app.png" alt="Card image cap">' +
            '</div>' +
            '<div class="col">' +
            '<p>ID ENCUESTA: ' + mensaje.id_encuest + '</p>' +
            '<p>FECHA CREACIÓN: ' + mensaje.createdat + '</p>' +
            ' </div>' +
            '</div>' +
            '</div>')
        .addTo(map);

});

map.on('click', 'adultos_mayores', function (e) {
    var mensaje = e.features[0].properties.porc_admay
    if (mensaje == undefined) {
        mensaje = "sin información"
    } else {
        mensaje = mensaje.toFixed(2);
    }
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("% Adultos mayores : " + mensaje)
        .addTo(map);

});

map.on('click', 'riesgo', function (e) {
    var mensaje = e.features[0].properties.cluster
    if (mensaje == 1) {
        mensaje = 'Vulnerabilidad alta'
    } else if (mensaje == 2) {
        mensaje = 'Vulnerabilidad media - alta'
    } else if (mensaje == 3) {
        mensaje = 'Vulnerabilidad media - baja'
    } else if (mensaje == 4) {
        mensaje = 'Vulnerabilidad media'
    } else if (mensaje == 0) {
        mensaje = 'Vulnerabilidad baja'
    }

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(mensaje)
        .addTo(map);

});


var flying = false;
map.on('flystart', function () {
    flying = true;
});
map.on('flyend', function () {
    flying = false;
});




map.on('moveend', function () {

    //map.setBearing(0)
    //map.setMinPitch(0)

    var bounds = new mapboxgl.LngLatBounds();
    var lay = map.getLayer('municipios')


    if (flying) {


        var point = map.project(coordinate);
        var v1 = new mapboxgl.LngLatBounds(
            new mapboxgl.LngLat(coordinate[0] + 0.1, coordinate[1] - 0.1),
            new mapboxgl.LngLat(coordinate[0] - 0.1, coordinate[1] + 0.1)
        );

        var features = map.queryRenderedFeatures([map.project(v1.getSouthWest()), map.project(v1.getNorthEast())], {
            layers: ['municipios']
        });

        var uniqueFeatures = getUniqueFeatures(features, 'cod_mun');

        var contrasta = 0;
        var cero = ''
        if (cod_mpio.length == 4) {
            contrasta = cod_mpio.substr(1)
            cero = '0'
        } else {
            contrasta = cod_mpio.substr(2)
        }

        uniqueFeatures.forEach(function (feature) {
            //console.log(feature.properties)
            var valor = String(feature.properties.mpio_ccdgo);

            if (valor == contrasta) {
                //console.log("aqui")
                //console.log(valor)
                //console.log(cod_mpio)

                map.setFilter('municipios', ['==', 'cod_mun', cero + cod_mpio]);
            }

        });


        // console.log(features)


        map.fire('flyend');
    }


    //map.querySourceFeatures('municipios',  { filter:['==', 'mpio_ccdgo', '200' ]} )


    var features = map.queryRenderedFeatures({
        layers: ['ipm_nacional']
    });

    if (features) {
        var uniqueFeatures = getUniqueFeatures(features, 'ipm');
        var data = [0, 0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {

            var valor = feature.properties.ipm;
            if (valor == 0) {
                k = 0;
            } else if (valor > 0 && valor <= 20) {
                k = 1;
            } else if (valor > 20 && valor <= 40) {
                k = 2;
            } else if (valor > 40 && valor <= 60) {
                k = 3;
            } else if (valor > 60 && valor <= 80) {
                k = 4;
            } else if (valor > 80 && valor <= 100) {
                k = 5;
            }
            data[k] = data[k] + 1
        });
        ApexCharts.exec('chart1', "updateSeries", [{
            data: data
        }]);


    }

    

    var features = map.queryRenderedFeatures({
        layers: ['adulto60']
    });

    if (features) {
        var uniqueFeatures = features;
        var data = [0, 0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {

            var valor = feature.properties.porc_60;
            if (valor == 0) {
                k = 0;
            } else if (valor > 0 && valor <= 10) {
                k = 1;
            } else if (valor > 10 && valor <= 15) {
                k = 2;
            } else if (valor > 15 && valor <= 20) {
                k = 3;
            } else if (valor > 20 && valor <= 25) {
                k = 4;
            } else if (valor > 25 && valor <= 100) {
                k = 5;
            }
            data[k] = data[k] + 1
        });
        ApexCharts.exec('chart3', "updateSeries", [{
            data: data
        }]);


    }


    var features = map.queryRenderedFeatures({
        layers: ['adulto70']
    });

    if (features) {
        var uniqueFeatures = features;
        var data = [0, 0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {

            var valor = feature.properties.porc_70;
            if (valor == 0) {
                k = 0;
            } else if (valor > 0 && valor <= 5) {
                k = 1;
            } else if (valor > 5 && valor <= 10) {
                k = 2;
            } else if (valor > 10 && valor <= 15) {
                k = 3;
            } else if (valor > 15 && valor <= 20) {
                k = 4;
            } else if (valor > 20 && valor <= 100) {
                k = 5;
            }
            data[k] = data[k] + 1
        });
        ApexCharts.exec('chart4', "updateSeries", [{
            data: data
        }]);


    }

    var features = map.queryRenderedFeatures({
        layers: ['embarazo']
    });

    

    if (features) {
        var uniqueFeatures = features;
        var data = [0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {
            
            var valor = feature.properties.categoria;
            // console.log(valor);

            if (valor == 1) {
                k = 0;
            } else if (valor == 2) {
                k = 1;
            } else if (valor == 3) {
                k = 2;
            } else if (valor == 4) {
                k = 3;
            } else if (valor == 5) {
                k = 4;
            }

            data[k] = data[k] + 1
        });

        // console.log(data);

        ApexCharts.exec('chart6', "updateSeries", [{
            data: data
        }]);


    }

    var features = map.queryRenderedFeatures({
        layers: ['empleo']
    });

    if (features) {
        var uniqueFeatures = features;
        var data = [0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {
            
            var valor = feature.properties.joven_cat;
            // console.log(valor);

            if (valor == 1) {
                k = 0;
            } else if (valor == 2) {
                k = 1;
            } else if (valor == 3) {
                k = 2;
            } else if (valor == 4) {
                k = 3;
            } else if (valor == 5) {
                k = 4;
            }

            data[k] = data[k] + 1
        });

        // console.log(data);

        ApexCharts.exec('chart7', "updateSeries", [{
            data: data
        }]);


    }
    


    var features = map.queryRenderedFeatures({
        layers: ['riesgo']
    });

    // console.log(features);

    if (features) {
        var uniqueFeatures = features
        var data = [0, 0, 0, 0, 0];
        var k = 0;
        uniqueFeatures.forEach(function (feature) {

            var valor = feature.properties.cluster;

            if (valor == 0) {
                k = 0;
            } else if (valor == 1) {
                k = 4;
            } else if (valor == 2) {
                k = 3;
            } else if (valor == 3) {
                k = 1;
            } else if (valor == 4) {
                k = 2;
            }

            data[k] = data[k] + 1
        });

        ApexCharts.exec('chart2', "updateSeries", [{
            data: data
        }]);


    }



});

function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    var uniqueFeatures = array.filter(function (el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });

    return uniqueFeatures;
}


$('#municipio').on('change', function () {

    var value = $(this).val()
    var lon = parseFloat(value.split(",")[1]);
    var lat = parseFloat(value.split(",")[2]);
    cod_mpio = value.split(",")[0];

    coordinate = [lon, lat];
    map.setFilter('municipios', undefined)

    var boundary = []
    $.each(geometria, function (key, value) {

        if (key == cod_mpio) {
            boundary = value;
        }
    });


    //
    map.flyTo({
        center: coordinate,
        zoom: 10,
        essential: false // this animation is considered essential with respect to prefers-reduced-motion
    });
    //
    map.fitBounds(boundary);

    map.fire('flystart');

});