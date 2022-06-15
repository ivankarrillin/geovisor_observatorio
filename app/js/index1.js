import $ from 'jquery';
import '../css/styles.scss';
//import 'materialize-css/dist/js/materialize.min.js';



import 'jquery-toast-plugin'
import 'jquery-toast-plugin/dist/jquery.toast.min.css'

import 'bootstrap/js/dist/modal'

const servidor =require('./request.js')

import { DualHRangeBar, DualVRangeBar } from 'dual-range-bar'


var JSZip = require("jszip");
var jsZip = new JSZip();

import {ScatterplotLayer} from '@deck.gl/layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import {Deck, MapView, OrthographicView} from '@deck.gl/core';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';


import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Load from './util'
import DoubleSlider from 'double-slider';

let initialTime = new Date("2020-06-01Z08:00:00")
   ,endTime     = new Date("2021-02-28Z08:00:00")
   ,arrTime     = []
   ,dayMillisec = 24 * 60 * 60 * 1000
   ;
for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
  arrTime.push(q.toISOString().substring(0, 10));
}

var mov_json=""
      

var calendario = [
"2019-1",
"2019-2",
"2019-3",
"2019-4",
"2020-1",
"2020-2",
"2020-3",
"2020-4",
"2021-1",
"2021-2",
"2021-3",
"2021-4",
"2022-1"
]



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
        sourceLayer: 'ipm-0lz2gv',
        id: key
      }, {
              'color': newdata[key].movilidad < 10 ? blueScale(newdata[key].movilidad) : redScale(newdata[key].movilidad),
            'movilidad':newdata[key].movilidad,
            'hover': true
        
      })
        
    }
  }

  function blueScale(mov) {
    
      var indice = 10- mov;

      if (mov<0) {
          indice = 0;
      }
    //console.log(indice)
    
    var color = colorArray_blue[indice];
    

    return color;
}

  function redScale(mov) {
    
    var indice = mov;

      if (mov>100) {
          indice = 100;
      }
    //console.log(indice)
    var color = colorArray_red[indice];
    

    return color;
  }

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
    
    const colorArray_blue = interpolateColors("rgb(0, 197, 220)", "rgb(98, 0, 110)", 10);
    const colorArray_red = interpolateColors("rgb(255, 255, 29)", "rgb(255, 29, 29)", 100);

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
                  }, 500);
              
              
         
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
























function binData(data) {

    var hData = new Array(), //the output array
        size = data.length, //how many data points
        bins = Math.round(Math.sqrt(size)); //determine how many bins we need
         bins = bins > 50 ? 50 : bins; //adjust if more than 50 cells
    var max = Math.max.apply(null, data), //lowest data value
        min = Math.min.apply(null, data), //highest data value
        range = max-min, //total range of the data
        width = range/bins, //size of the bins
        bin_bottom, //place holders for the bounds of each bin
        bin_top;
  
    //loop through the number of cells
    for(var i = 0; i < bins; i++) {
  
      //set the upper and lower limits of the current cell
      bin_bottom = min + (i * width) ;
      bin_top = bin_bottom + width;
  
      //check for and set the x value of the bin
      if(!hData[i]) {
            hData[i] = new Array();
              hData[i][0] = bin_bottom + (width / 2);
      }
  
      //loop through the data to see if it fits in this bin
      for(var j = 0; j < size; j++) {
            var x = data[j];
  
            //adjust if it's the first pass
            i == 0 && j == 0 ? bin_bottom -= 1 : bin_bottom = bin_bottom;
  
            //if it fits in the bin, add it
            if(x > bin_bottom && x <= bin_top) {
                  !hData[i][1] ? hData[i][1] = 1 : hData[i][1]++;     	 
            }
      }
    }
    //cleanup
    $.each(hData, function(i, point) {
      if(typeof point[1] == 'undefined') {
        hData[i][1] = null;
      }
    });
    return hData;
  }




var chart =  Highcharts.chart('container', {
        title: {
            text: 'Distribución Valores integrales'
        },
    
        xAxis: [{
            title: { text: 'Data' },
            alignTicks: false
        }, {
            title: { text: 'Histograma' },
            alignTicks: false,
            opposite: true
        }],
    
        yAxis: [{
            title: { text: 'Datos' }
        }, {
            title: { text: 'Histograma' },
            opposite: true
        }],
    
        plotOptions: {
            histogram: {

            }
        },
    
        series: [{
            name: 'Histograma',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            zIndex: -1
        }]
    });
 






//import mobility from '../json/movilidad.json'


var data = [["Apartamento", 6, 990000000, 130, 130, 2, 3, 4, 4.678, -74.042, "Finca_raiz", 7158461.53846154, 7158461.53846154]];

const axios = require('axios');

axios.get('https://nowsoft.app/colectora/externo/files_oin/data.zip',{
    responseType: 'arraybuffer',
}).then(resp => {

    var zip = new JSZip();
    zip.loadAsync(resp.data).then(function(contents) {
        Object.keys(contents.files).forEach(function(filename) {
            zip.file(filename).async('string').then(function (content) {
                

                try {
                    data = JSON.parse(content);
                } catch(e) {
                    console.log(e); // error in the above string (in this case, yes)!
                }

                
                $("#total").text(data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                updateLayers(radio, minimo, maximo, valor,estrato_min,estrato_max)
            });
        });
    });
    
});

var updateLayers = (radio, minimo, maximo, valor,estrato_min,estrato_max) => {
          

    console.log(minimo)
    console.log(maximo)
    console.log("-------")
    console.log(estrato_min)
    console.log(estrato_max)

    var filter=[]

      if (valor=="all") {
        filter = data.filter(function(item) {
     
            if (item[2] >minimo && item[2] <maximo && item[9] >=estrato_min && item[9] <=estrato_max) {
                return item
              }
              
          });   
      } else {
        filter = data.filter(function(item) {
     
            if (item[2] >minimo && item[2] <maximo && item[0] == valor && item[9] >=estrato_min && item[9] <=estrato_max) {
                return item
              }
              
          });   
      }
      
      $("#mini").text(filter.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
      
    
    function getMean(points) {
          
        return points.reduce((sum, p) => sum += p[10], 0) / points.length;
    }

    
    deck.setProps({
        layers: [
            new HexagonLayer({
                data: filter,
                id: 'heatmp-layer',
                pickable: true,
                radius: radio,
                elevationScale: radio*0.3,
                elevationRange: [0, 50],
                extruded: true,
                getPosition: d => [d[7], d[6], 0],
                upperPercentile:94,
                radiusPixels:50,
                intensity: 1,
                getColorValue: getMean,
                getElevationValue: getMean,
                colorRange :  [
                    [1, 152, 189],
                    [73, 227, 206],
                    [216, 254, 181],
                    [254, 237, 177],
                    [254, 173, 84],
                    [209, 55, 78]
                  ],
                threshold: 0.01,
                debounceTimeout:1000
            }),
            new HeatmapLayer({
                data: filter,
                id: 'heatmp',
                pickable: false, 
                getPosition: d => [d[7], d[6], 0],
                getWeight: d => d[10],
                upperPercentile:94,
                radiusPixels:radio*0.1,
                intensity: radio*0.2,
                colorRange :  [
                    [1, 152, 189],
                    [73, 227, 206],
                    [216, 254, 181],
                    [254, 237, 177],
                    [254, 173, 84],
                    [209, 55, 78]
                  ],
                threshold: 0.01,
                debounceTimeout:1000
              })
        ]
    });
      


      var arr = [];
      for (var i = 0; i < filter.length; i++){
        
          var obj = filter[i];
        
            arr.push(obj[10])
          
         
    
      }

    const shuffled = arr.sort(() => 0.5 - Math.random());
    let selected = shuffled;
    if (arr.length > 10000) {
        selected = shuffled.slice(0, 10000);
    }
      
    
      chart.series[0].setData(binData(selected)); 
    chart.redraw();
    









      
  }


  $("#check_ofertas").change(function () {

      
    if(this.checked) {
        map.setLayoutProperty('heatmp-layer', 'visibility', 'visible');
        map.setLayoutProperty('heatmp', 'visibility', 'visible');
        $('#panel-info').show()
    }else{
        map.setLayoutProperty('heatmp-layer', 'visibility', 'none');
        map.setLayoutProperty('heatmp', 'visibility', 'none');
        $('#panel-info').hide()
    }
      
    

  });


  function myFunction(x) {
    if (x.matches) { // If media query matches
        
    } else {
        $('#panel_est').click()
    }
  }
  
  var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes




$("#visual").change(function () {

    const val = $(this).val();
          

    if (val == "tipo1") {
        map.setLayoutProperty('heatmp-layer', 'visibility', 'visible');
        map.setLayoutProperty('heatmp', 'visibility', 'none');
        
    } else {
        map.setLayoutProperty('heatmp-layer', 'visibility', 'none');
        map.setLayoutProperty('heatmp', 'visibility', 'visible');
    }

});

  

$.toast({
    heading: 'Información',
    text: 'Active las capas dando click en el campo activar tema',
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




//toda esta cheet para los iconos de font-awesome 5
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


import './filtros'

import geometria from '../json/bbox.json'




function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

const images = importAll(require.context('../img/', false, /\.(png|jpg|svg)$/));


var radio = 100;
var minimo = 0;
var maximo = 10000000000;
var valor = 'all'

var estrato_min = 0;
var estrato_max = 5000;

var visual = "tipo1";


var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNrbzV5b3J2NDFiNzQybmxybm4xaHNic2EifQ.r3_xlsBMvBLb97b2JbmKAA';
// mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNqc2ZkOTNtMjA0emgzeXQ3N2ppMng4dXAifQ.2k-OLO6Do2AoH5GLOWt-xw';

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

$(document).ready(function () {
      

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
  

    }else{
        
        map.setLayoutProperty('adulto60', 'visibility', 'none');
      

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

$("#check_dif_urbano").change(function () {
    $('#panel_dif').click()

if(this.checked) {

map.setLayoutProperty('dif_urbano', 'visibility', 'visible');

} else {

map.setLayoutProperty('dif_urbano', 'visibility', 'none');

}
});
    
$("#check_dif_rural").change(function () {
    $('#panel_dif').click()

if(this.checked) {

map.setLayoutProperty('dif_rural', 'visibility', 'visible');

} else {

map.setLayoutProperty('dif_rural', 'visibility', 'none');

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
        'circle-opacity',
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
    
  }); 
    
    
    
    
    
    

    $( "#transparencia_empleo" ).change(function() {
        var valor = $(this).val()
        
    
        map.setPaintProperty(
            'empleo',
            'circle-opacity',
            parseInt(valor) / 100
            );
            
        });

      $("#oferta").change(function () {

          
          const val = $(this).val();
          
          valor = val;
     
          updateLayers(radio, minimo, maximo, valor,estrato_min,estrato_max);


      });
    
    

    
    
      const drbar = new DualHRangeBar('my-drbar-container', {
          minimizes: false, // Minimises the container when inactive
          size: 'default',  // Size of the dual range bar
          lowerBound: 0,    // Initial value for "lowerBound"
          upperBound: 3000000000,    // Initial value for "upperBound"
          minSpan: 100,     // Initial value for "minSpan"
          maxSpan: 3000000000,       // Initial value for "maxSpan"
          lower: 0,         // Initial value for "lower"
          upper: 3000000000,         // Initial value for "upper"
      });

      const drbar_est = new DualHRangeBar('my-drbar-container1', {
        minimizes: false, // Minimises the container when inactive
        size: 'default',  // Size of the dual range bar
        lowerBound: 0,    // Initial value for "lowerBound"
        upperBound: 1000,    // Initial value for "upperBound"
        minSpan: 20,     // Initial value for "minSpan"
        maxSpan: 1000,       // Initial value for "maxSpan"
        lower: 0,         // Initial value for "lower"
        upper: 1000,         // Initial value for "upper"
    });
    
      drbar.addEventListener('update', (e) => {

      
          minimo = e.detail.lower;
          maximo = e.detail.upper;

          $("#minval").text(formatter.format(minimo));
          $("#maxval").text(formatter.format(maximo));

          updateLayers(radio, minimo, maximo, valor,estrato_min,estrato_max)
      });

      drbar_est.addEventListener('update', (e) => {

      
        estrato_min = e.detail.lower;
        estrato_max = e.detail.upper;

        $("#minval1").text(Math.round(estrato_min));
        $("#maxval1").text(Math.round(estrato_max));
          
        updateLayers(radio, minimo, maximo, valor,estrato_min,estrato_max)
     
    });


  $( "#transparencia_pobreza" ).change(function() {

      
      
      const val = $(this).val();
      console.log(val)
    

     map.setPaintProperty(
        'ipm_nacional',
        'circle-opacity',
        parseInt(val) / 100
      );
      
      radio = val*10;
      
      console.log(valor)

      updateLayers(radio,minimo,maximo,valor,estrato_min,estrato_max)


      
    });

      
      

      
      
      
      

    $( "#transparencia_riesgo" ).change(function() {
        var valor=$(this).val()
        
      map.setPaintProperty(
          'riesgo',
          'circle-opacity',
          parseInt(valor) / 100
          );
          
      });




    $( "#transparencia_adulto60" ).change(function() {
        var valor=$(this).val()


      map.setPaintProperty(
          'adulto60',
          'raster-opacity',
          parseInt(valor) / 100
          );
          
      });

      
    $( "#transparencia_adulto70" ).change(function() {
        var valor = $(this).val()

      map.setPaintProperty(
          'adulto70',
          'fill-extrusion-opacity',
          parseInt(valor) / 100
          );
          
    });
    
    $( "#transparencia_dif" ).change(function() {
        var valor = $(this).val()

      map.setPaintProperty(
          'dif_urbano',
          'fill-extrusion-opacity',
          parseInt(valor) / 100
        );
        
          map.setPaintProperty(
            'dif_rural',
            'fill-opacity',
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
            map.setStyle('mapbox://styles/mapbox/dark-v10');
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

  



var coordinate = []
var cod_mpio = '';

var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-74.1083125, 4.663437],
    zoom: 11,
    pitch: 60,
    bearing: 60
});


function get_colour( d ) {
    if (d === 'Penthouse') {
        return [19, 150, 77]
    } else if (d === 'Apartamento') {
        return [104, 162, 231]

    } else if (d === 'Proyecto') {
        return [229, 231, 104]

    } else if (d === 'Consultorio') {
        return [231, 196, 104]

    } else if (d === 'Apartaestudio') {
        return [231, 104, 229]

    } else if (d === 'Edificio') {
        return [54, 167, 228]

     } else if (d === 'Finca') {
        return [54, 228, 86]

    } else if (d === 'Hacienda') {
        return [54, 228, 165]

    } else if (d === 'Casalote_lote') {
        return [25, 138, 97]

    } else if (d === 'Local') {
        return [230, 212, 63]

    }
    else if (d === 'N/A') {
        return [140, 139, 132]

    }
    else if (d === 'Casa') {
        return [231, 104, 116]

    }
    else if (d === 'Parqueadero') {
        return [173, 104, 231]

    }
    else if (d === 'Casalote') {
        return [110, 53, 158]

    }
    else if (d === 'Lote') {
        return [72, 22, 195]

    }
    else if (d === 'Oficina') {
        return [93, 195, 22]

    }
    else if (d === 'Bodega') {
        return [116, 22, 159]

    }
}


function getRadius(d) {
    if (d>0 &&d<30) {
        return 10;
    } else if (d >= 30 && d < 50) { return 30 }
    else if (d >= 50 && d < 80) { return 50 }
    else if (d >= 80 && d < 120) { return 70 }
    else if (d >= 120 && d < 200) { return 90 }
    else if (d >= 200 && d < 500) { return 110 }
    else if (d >= 500 && d < 1000) { return 130 }
    else if (d >= 1000 && d < 2500) { return 150 } 
    else {
        return 170
    }
}


function showTooltip(info){
    console.log(info)
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

function meanPoints(arr) {
    
  
    var prom=[]
    for(var i = 0; i < arr.length; i++) {
        var obj = arr[i];
    
        prom.push(obj.source[10]);
    }

    const sum = prom.reduce((a,b) => a + b, 0);
    const avg = sum / prom.length;

    return formatter.format(avg)
}


const deck = new Deck({
    gl: map.painter.context.gl,
    views: [new MapView({id: 'mapbox'}), new OrthographicView({id: 'widget'})],
    layerFilter: ({layer, viewport}) => {
        const shouldDrawInWidget = layer.id.startsWith('widget');
        if (viewport.id === 'widget') return shouldDrawInWidget;
        return !shouldDrawInWidget;
    },

    getTooltip: ({object}) => object && {
        html: `<div>Integral: ${ meanPoints(object.points)}</div>
               `,
        style: {
          backgroundColor: '#ffff',
          fontSize: '1.2em'
        }
      },
    layers: [
        

        
        /*
        new HexagonLayer({
            data: data,
            id: 'heatmp-layer',
            pickable: false,
            radius: 100,
            elevationScale: 250,
            elevationRange: [0, 500],
            extruded: true,

            getPosition: d => [d[9], d[8], 0],
            upperPercentile:99.5,
            radiusPixels:50,
            intensity: 1,
            colorRange :  [
                [1, 152, 189],
                [73, 227, 206],
                [216, 254, 181],
                [254, 237, 177],
                [254, 173, 84],
                [209, 55, 78]
              ],
            threshold: 0.01,
            debounceTimeout:1000
          })
          */
      
    ]
});







map.addControl(new mapboxgl.NavigationControl());

var newdata = new Map();



map.on('load', function () {

    //inicializarMapa();



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
            my-scatterplot      );
                  */




});

map.on('style.load', function(){
    inicializarMapa();
})


function inicializarMapa() {
    
/*
    map.addLayer(new MapboxLayer({id: 'my-scatterplot', deck}));
    */
    map.addLayer(new MapboxLayer({id: 'heatmp-layer', deck}));
    map.addLayer(new MapboxLayer({id: 'heatmp', deck}));
    
    map.setLayoutProperty('heatmp', 'visibility', 'none');


    map.addSource('ip', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7a58jcxg'
    });

    map.addSource('risk', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7a58jcxg'
    });

    map.addSource('adulto', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7a58jcxg'
    });

    map.addSource('raster', {
        'type': 'raster',
        'url': 'mapbox://ivan12345678.1q3gzhlo',
    
    });

    map.addSource('uaecd', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.1rcg8341'
    });

    map.addSource('dif_urbano1', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.27vpc5p8'
    });
    map.addSource('dif_rural1', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.0i1gnmi7'
    });
    map.addSource('embarazo', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7a58jcxg'
    });

    map.addSource('empleo', {
        'type': 'vector',
        'url': 'mapbox://ivan12345678.7a58jcxg'
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
            "type": "circle",
            "source": "ip",
        "source-layer": "puntos-0940op",
        'layout': {
            'visibility': 'none'
        },
            paint: {

                'circle-color':[
                    "match",
                    ["get", "Name"],
                    ["Casa Campestre"],
                    "hsl(232, 17%, 82%)",
                    ["Apartamento"],
                    "hsl(141, 68%, 79%)",
                    ["Proyecto"],
                    "hsl(177, 69%, 55%)",
                    ["Bodega"],
                    "hsl(314, 68%, 44%)",
                    ["Casa Lote"],
                    "hsl(137, 46%, 38%)",
                    ["Finca"],
                    "hsl(33, 73%, 58%)",
                    ["Oficina"],
                    "hsl(252, 78%, 56%)",
                    ["Local"],
                    "hsl(278, 65%, 78%)",
                    ["Casa"],
                    "hsl(265, 66%, 46%)",
                    ["Apartaestudio"],
                    "hsl(360, 87%, 35%)",
                    ["Habitacion"],
                    "hsl(141, 68%, 44%)",
                    ["Lote"],
                    "hsl(43, 98%, 59%)",
                    ["Consultorio"],
                    "hsl(245, 87%, 34%)",
                    ["Edificio"],
                    "hsl(10, 71%, 60%)",
                    "#000000"
                  ],

                'circle-radius':3
            }
        },
        'waterway-label'
    );






    map.addLayer({
            "id": "riesgo",
            "type": "circle",
            "source": "risk",
            "source-layer": "puntos-0940op",
            'layout': {
                'visibility': 'none'
            },
            paint: {

                'circle-radius': 3,
                'circle-color': [
                    "interpolate",
                    ["linear"],
                    ["get", "area_const"],
                    30,
                    "hsl(0, 69%, 69%)",
                    50,
                    "hsl(239, 75%, 56%)",
                    80,
                    "hsl(167, 60%, 57%)",
                    200,
                    "hsl(124, 79%, 75%)",
                    500,
                    "hsl(59, 73%, 51%)"
                  ]




                
        },
            filter:[
                "all",
                [
                  "match",
                  ["get", "Name"],
                  ["Apartamento"],
                  true,
                  false
                ]
              ]    
        },
        'waterway-label'
    );



    map.addLayer({
            "id": "adulto70",
            "type": "fill-extrusion",
            "source": "uaecd",
            "source-layer": "valor_ref_m_2020-cyu8ap",
            'layout': {
                'visibility': 'none'
            },
            paint: {
                'fill-extrusion-color': [
                    "interpolate",
                    ["linear"],
                    ["get", "V_REF"],
                    500000,
                    "hsl(33, 89%, 70%)",
                    1000000,
                    "hsl(69, 87%, 62%)",
                    1500000,
                    "hsl(147, 77%, 57%)",
                    2500000,
                    "hsl(177, 84%, 50%)",
                    3500000,
                    "hsl(206, 91%, 50%)",
                    5500000,
                    "hsl(252, 88%, 44%)",
                    27800000,
                    "hsl(275, 87%, 35%)"
                  ],
                'fill-extrusion-height': [
                    "interpolate",
                    ["linear"],
                    ["get", "V_REF"],
                    0,
                    0,
                    12355556,
                    1500
                  ],
                'fill-extrusion-opacity': 0.8
            }
        },
        'waterway-label'
    );


    map.addLayer({
        "id": "dif_urbano",
        "type": "fill-extrusion",
        "source": "dif_urbano1",
        "source-layer": "urbano-b6gin7",
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'fill-extrusion-color': [
                "interpolate",
                ["linear"],
                ["get", "CAT_AGR"],
                -3,
                "#4575b5",
                -2,
                "#849eb9",
                -1,
                "#c0ccbe",
                0,
                "#f6f7f1",
                1,
                "#fab884",
                2,
                "#ed7552",
                3,
                "#d62f27"
              ],
            'fill-extrusion-height': [
                "interpolate",
                ["linear"],
                ["get", "CAT_AGR"],
                -3,
                50,
                -2,
                100,
                -1,
                150,
                0,
                0,
                1,
                250,
                2,
                300,
                3,
                350
              ],
            'fill-extrusion-opacity': 0.8
        }
    },
    'waterway-label'
);

map.addLayer({
    "id": "dif_rural",
    "type": "fill",
    "source": "dif_rural1",
    "source-layer": "rural-dl9ivh",
    'layout': {
        'visibility': 'none'
    },
    paint: {
        'fill-color': [
            "interpolate",
            ["linear"],
            ["get", "CAT_AGR"],
            -3,
            "#4575b5",
            -2,
            "#849eb9",
            -1,
            "#c0ccbe",
            0,
            "#f6f7f1",
            1,
            "#fab884",
            2,
            "#ed7552",
            3,
            "#d62f27"
          ],
        'fill-opacity': 0.8
    }
},
'waterway-label'
);


    map.addLayer({
        "id": "embarazo",
        "type": "circle",
        "source": "embarazo",
        "source-layer": "puntos-0940op",
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'circle-color': [
                "interpolate",
                ["linear"],
                ["get", "price_M2"],
                500000,
                "hsl(236, 71%, 63%)",
                1000000,
                "hsl(180, 63%, 44%)",
                1500000,
                "hsl(92, 74%, 56%)",
                2500000,
                "hsl(46, 96%, 54%)",
                3500000,
                "hsl(20, 60%, 56%)",
                5000000,
                "hsl(360, 98%, 40%)",
                10000000,
                "hsl(304, 93%, 26%)",
                27777777777.777794,
                "#000000"
              ],
            'circle-radius':3
            // 'fill-extrusion-opacity': 0.8
        }
    },
    'waterway-label'
    );
    




map.addLayer({
    "id": "empleo",
    "type": "circle",
    "source": "empleo",
    "source-layer": "puntos-0940op",
    'layout': {
        'visibility': 'none'
    },
    paint: {
        'circle-color':[
            "interpolate",
            ["linear"],
            ["get", "garages"],
            1,
            "hsl(193, 52%, 54%)",
            2,
            "hsl(209, 73%, 48%)",
            5,
            "hsl(252, 76%, 32%)",
            10,
            "hsl(272, 78%, 40%)",
            11,
            "#000000"
          ],
          'circle-radius':3
    },
    filter:[
        "all",
        [
          "match",
          ["get", "Name"],
          ["Apartamento"],
          true,
          false
        ]
      ]
},
'waterway-label'
);


    map.addLayer({
    id: 'adulto60',
    'type': 'raster',
    'layout': {
        'visibility': 'none'
    },
        "source": "raster",
        "source-layer": "bogota_color-dvc2nz",
        paint: {
            "raster-opacity":0.5,
        
        }
        
    });




    axios.get('https://nowsoft.app/colectora/externo/files_oin/movilidad.zip',{
        responseType: 'arraybuffer',
    }).then(resp => {
        getMovility(resp)
     })


    const getMovility=(response)=>{


        console.log(response)
        console.log(response.data)
        
        var JSZip = require("jszip");
        var zip = new JSZip();

          zip.loadAsync(response.data)
          .then(function(zip) {
              // you now have every files contained in the loaded zip
            console.log(zip)
            
            zip.file("movilidad.json").async("string").then(function (response) { 
      
              response= JSON.parse(response)
                
              $.toast({
                  heading: 'Información',
                  text: 'Capa de censo de edificaciones (CEED) cargada, verifique el panel izquierdo',
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

              
              mov_json = response;
      
              mov_json.forEach((row) => {
                  if (row['f'] === '2019-1') {
                      const movilidad = row['m'];
                      const id = row['id'];
                      newdata[id] = {
                          movilidad: movilidad
                      }
                  }
              })
       
      
              const initLayers = () => {
      
                  console.log("hola")
                  
                  map.addSource('mov', {
                      'type': 'vector',
                      'url': 'mapbox://ivan12345678.10cdldso',
                      'promoteId': 'cod_dane'
                  });
      
                  map.addLayer({
                      'id': 'movilidad',
                      'type': 'fill',
                      'source': 'mov',
                      'source-layer': 'ipm-0lz2gv',
                      'layout': {
                        'visibility': 'none'
                      },
                      'paint': {
                          'fill-color': ['feature-state', 'color'],
                          
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

map.on('click', 'movilidad', function (e) {
    var mensaje = e.features[0].state.movilidad

    mensaje = mensaje 
    console.log(e.features[0])
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<div class="card">' +
            '<div class="row">' +
            '<div class="col">' +
            ' <img class="card-img-top" src="./img/edificio.png" alt="Card image cap" style="width:50px">' +
            '</div>' +
            '<div class="col">' +
            '<p>Cantidad de obras</p>' +
            '<div class="porcentaje">' + mensaje + '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
        .addTo(map);
});


map.on('click', 'dif_urbano', function (e) {
    var mensaje = e.features[0].properties
    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);
});

map.on('click', 'dif_rural', function (e) {
    var mensaje = e.features[0].properties
    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);
});



map.on('click', 'adulto70', function (e) {
    var mensaje = e.features[0].properties
    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";


    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);
});

map.on('click', 'empleo', function (e) {
    var mensaje = e.features[0].properties
    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";




    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);
});





map.on('click', 'encuestas', function (e) {
    var mensaje = e.features[0].properties

    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";




    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);

});

map.on('click', 'adultos_mayores', function (e) {
    var mensaje = e.features[0].properties
    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";




    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);

});

map.on('click', 'riesgo', function (e) {
    var mensaje = e.features[0].properties

    var code = `<table id="table-info"><tr><th>Item</th><th>Descripción</th>`;
    code += "</tr>";

    for (var key in mensaje) {
        var valor = mensaje[key];
    
        code += `<tr><td>${key}</td>`;
        code += `<td>${valor}</td></tr>`;
    }

    code += "</table>";




    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(code)
        .addTo(map);

});







$('#municipio').on('change', function () {

    var value = $(this).val()
    var lon = parseFloat(value.split(",")[1]);
    var lat = parseFloat(value.split(",")[2]);
    cod_mpio = value.split(",")[0];

    coordinate = [lon, lat];


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