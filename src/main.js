import { Articulo } from './Articulo.js';
import { Proveedor } from './Proveedor.js';

let listaProductos = [];
let listaProveedores = [];
let myModal = new bootstrap.Modal(document.getElementById("myModal"));
let colapso = new bootstrap.Collapse(document.getElementById('productoFormCollapse'));
let bcol = false;


document.getElementById("addProductoColapso").addEventListener("click", function () {
  colapso.toggle();
  if(colapso.show()){
    bcol = false;
  }

});
document.getElementById("agregarProductoBtn").addEventListener("click", agregarProducto);
document.getElementById("guardarProveedorBtn").addEventListener("click", crearProveedor);

document.getElementById("openModalBtn").addEventListener("click", function () {
  if(!bcol){
    colapso.toggle();
  }
  myModal.show();
});

function agregarProducto() {
  if (!document.getElementById("formNameProducto").classList.contains('invalid-feedback')) {
    document.getElementById("formNameProducto").classList.add('invalid-feedback');
  };
  if (!document.getElementById("formEmailProducto").classList.contains('invalid-feedback')) {
    document.getElementById("formEmailProducto").classList.add('invalid-feedback');
  };
  if (!document.getElementById("formPhoneProducto").classList.contains('invalid-feedback')) {
    document.getElementById("formPhoneProducto").classList.add('invalid-feedback');
  };

  let nombre = document.getElementById("nameProducto").value;
  let email = document.getElementById("emailProducto").value;
  let telefono = document.getElementById("phoneProducto").value;
  if (nombre.length === 0 || email.length === 0 || telefono.length === 0) {
    if (nombre.length === 0) {
      document.getElementById("formNameProducto").classList.remove('invalid-feedback');
    }
    if (email.length === 0) {
      document.getElementById("formEmailProducto").classList.remove('invalid-feedback');
    }
    if (telefono.length === 0) {
      document.getElementById("formPhoneProducto").classList.remove('invalid-feedback');
    }
    alert("Debe completar todos los campos de producto")
    return;

  }
  let articulo = new Articulo(nombre, email, telefono);

  listaProductos.push(articulo);

  document.getElementById("nameProducto").value = "";
  document.getElementById("emailProducto").value = "";
  document.getElementById("phoneProducto").value = "";

  alert("Artículo agregado a la lista de productos.");

  actualizarTablaProductos();
  colapso.toggle();
}


function actualizarTablaProductos() {
  let tablaProductos = document.getElementById("tabla-productos");

  // Limpiar la tabla antes de agregar las filas actualizadas
  tablaProductos.innerHTML = "";

  // Recorrer la lista de productos y crear las filas correspondientes
  for (let i = 0; i < listaProductos.length; i++) {
    let producto = listaProductos[i];

    let fila = document.createElement("tr");

    let nombreProducto = document.createElement("td");
    nombreProducto.textContent = producto.name;

    let correoProducto = document.createElement("td");
    correoProducto.textContent = producto.email;

    let telefonoProducto = document.createElement("td");
    telefonoProducto.textContent = producto.telefono;

    let acciones = document.createElement("td");

    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.addEventListener("click", function () {
      borrarProducto(i);
    });

    acciones.appendChild(botonBorrar);

    fila.appendChild(nombreProducto);
    fila.appendChild(correoProducto);
    fila.appendChild(telefonoProducto);
    fila.appendChild(acciones);

    tablaProductos.appendChild(fila);
  }
}

function borrarProducto(index) {
  listaProductos.splice(index, 1);
  actualizarTablaProductos();
}

function crearProveedor() {
  let nombreProveedor = document.getElementById("nombre").value;
  let precioProveedor = document.getElementById("precio").value;

  // Validar que se haya ingresado un nombre y un precio
  if (nombreProveedor.length === 0 || precioProveedor.length === 0) {
    alert("Debe completar todos los campos del proveedor");
    return;
  }
  let proveedor;
  if(listaProductos.length<1){
    let sinArticulo = new Articulo("-","-","-")
    precioProveedor = 0;
    listaProductos.push(sinArticulo);
    alert("Al crear un proveedor sin agregar al menos un artículo el proveedor cambiará el valor agregado a 0")
  }
  // Crear una instancia de Proveedor con el nombre y el precio 
  proveedor = new Proveedor(nombreProveedor, listaProductos, precioProveedor);

  // Limpiar los campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";

  // Agregar el proveedor a alguna lista o realizar otras acciones necesarias

  // Ejemplo: Mostrar la información del proveedor en la consola
  console.log(proveedor.getInfoProveedor());
  listaProveedores.push(proveedor.getInfoProveedor());
  listaProductos = [];

  actualizarTablaProductos();
  tablaProveedores();

      myModal.hide();
}
function tablaProveedores() {
  let tablaProveedores = document.getElementById("proveedorTabla");
  tablaProveedores.innerHTML = "";
  for (let i = 0; i < listaProveedores.length; i++) {
    let proveedorInfo = listaProveedores[i].split(", ");
    proveedorInfo.push("iva");


    // Crear una fila para mostrar los detalles del proveedor
    let fila = document.createElement("tr");
    let contador = 0;
    let datoIva = null;
    // Recorrer los detalles del proveedor y crear las celdas correspondientes
    proveedorInfo.forEach(dato => {
      let celda = document.createElement("td");
      dato = limpiarData(dato);

      celda.textContent = dato;
      contador++;
      if (contador === 5) {
        datoIva = parseInt(dato);
      }
      if(datoIva!=null&&contador===6){
        celda.textContent = calcularIva(datoIva);
      }
      fila.appendChild(celda);

    });

    // Agregar la fila a la tabla
    tablaProveedores.appendChild(fila);
  }
}

function calcularIva(valor) {
let iva = valor*0.19; 
return iva;

}
function  limpiarData(dato){
  dato = dato.replace("Proveedor: ", "");
  dato = dato.replace("Artículos: ", "");
  dato = dato.replace("Nombre: ", "");
  dato = dato.replace("teléfono: ", "");
  dato = dato.replace("Correo: ", "");
  dato = dato.replace("Precio: ", "");
   return dato;
}


