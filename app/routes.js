// Declaracion de variables y exportacion de los metodos que utiliza routerx`
var express = require("express");
var router = express.Router();
//Exportacion de metodos utilizados en routes.js para guardar gets y posts
module.exports = router;

//Se llama al archivo rfc.js para poder utilizar las funciones que calculen el rfc
var tools = require("./rfc");


//Ruta para home
router.get("/", (req, res) => {
  res.render("pages/home", { title: "Practica RFC" });
});

//Ruta para about
router.get("/about", (req, res) => {
  res.render("pages/about", { title: "Acerca de mi" });
});

//Ruta de thanks (no es parte de la pagina normal y solo se llama al terminar un registro)
router.get("/thanks", (req, res) => {
  res.render("pages/thanks", { title: "Gracias" });
});

//Ruta para registro donde esta la forma para calcular rfc
router.get("/registro", (req, res) => {
  res.render("pages/registro", { title: "Registro" });
});

//Metodo utilizado por la forma que sera llamado al activar el boton submit, capturando los datos de los input
router.post("/registro", (req, res) => {
  
  //Guarda la fecha de nacimiento para usarla como arreglo
  var fecha = req.body.dateBrt;

  //Los 2 ultimos digitos del año
  var year = fecha[2].concat(fecha[3]);
  //Dos digitos del mes
  var month = fecha[5].concat(fecha[6]);
  //Dos digitos del dia
  var day = fecha[8].concat(fecha[9]);

  //Se obtienen los datos de la forma usando el atributo name de cada input
  var ap_paterno = req.body.name;
  var ap_materno = req.body.lname1;
  var nombre = req.body.lname2;
  var date = year.concat(month.concat(day));
  var sexo = req.body.sexo;
  var estado = req.body.estado;

  //Se utiliza la funcion calcula() del archivo rfc.js
  var calculado = tools.calcula(
    ap_paterno,
    ap_materno,
    nombre,
    date,
    sexo,
    estado
  );
  //Recibir el RFC calculado
  console.log(calculado);

  //Para verificar que se concateno la fecha bien para la funcion
  console.log(date);
  res.render("pages/thanks", { title: "Gracias", calculado });
});
