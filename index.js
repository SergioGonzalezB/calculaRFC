// Declaracion de variables
const express = require("express"); //Para utilizar express
const express_layout = require("express-ejs-layouts"); //Para establecer una plantilla de las vistas
const body_parser = require("body-parser");
const puerto = process.env.PORT || 3000; //Abrir el puerto donde se aloja el servidor
const app = express(); //

// Motor de vistas se usa ejs
app.set("view engine", "ejs");

app.use(express_layout);
app.use(body_parser.urlencoded({ extended: true }));

// Directorio public estatico las rutas solo necesitan /carpeta en vez de /public/carpeta
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

// Retorna una funcion que existe en routes.js como exports
var router = require("./app/routes");

// Recoje los metodos get y post para tenerlos antes del listen
app.use("/", router);

app.listen(puerto, () => {
  console.log("Servidor activo http://localhost:3000/");
});
