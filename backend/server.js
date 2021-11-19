var express = require('express');
var app = express();
var bodyParser = require('body-parser');//sirve para que el body de post sea en formato json
const cors = require('cors')

var path = require('path');

var expressStaticGzip = require("express-static-gzip");
const fs = require('fs');


app.use(cors());


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


  const consulta_movilidad = (req, res) => {

    const file = `${__dirname}/movilidad.zip`;
    res.setHeader('Content-disposition', 'attachment; filename=' + "movilidad.zip");
    res.writeHead(200, {
      'Content-Type': 'application/zip',
    });

    var readStream = fs.createReadStream(file);
    readStream.pipe(res);
    

}
  

app
.route('/visor-vulnerabilidad/mov')
  .get(consulta_movilidad)




var DIST_DIR = path.join(__dirname, "../dist/");

app.use("/visor-vulnerabilidad",express.static(DIST_DIR));



/*
var DIST_DIR = path.join(__dirname, "../dist/");


app.use("/",expressStaticGzip(DIST_DIR));


app.get("/llogin.html", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "login.html"));
});
*/


//backend en el puerto 9000
app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});






