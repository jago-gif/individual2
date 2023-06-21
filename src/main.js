import { Articulo } from "./Articulo.js"
import { Proveedor } from "./Proveedor.js"
import { Tipo_proveedor } from "./Tipo_proveedor.js";


const btnEmpresa = document.getElementById("btnEmpresa");
const guardarEmpresa = document.getElementById("guardarEmpresa");
const formularioEmpresa = document.getElementById("formularioEmpresa");
const formularioArticulos = document.getElementById("formularioArticulos");
const btnArticulos = document.getElementById("btnArticulos");
const guardarArticulo = document.getElementById("guardarArticulo");
const selectorEmpresa = document.getElementById("empresa");
const productosProveedor = document.getElementById("productosProveedor");

let proveedor;
let Proveedores = [];
let modalEmpresa = new bootstrap.Modal(document.getElementById("modalEmpresa"));
let modalArticulos = new bootstrap.Modal(
  document.getElementById("modalArticulos")
);



btnEmpresa.addEventListener("click", () => {
    modalEmpresa.show();
})
btnArticulos.addEventListener("click", () => {
    if(Proveedores.length>0){
    selectorEmpresa.innerHTML = "";
    Proveedores.forEach((proveedor) => {
        selectorEmpresa.innerHTML += `<option value="${proveedor.nombre}">${proveedor.nombre}</option>`;
    })
    modalArticulos.show();
    }else{
        alert("primero debe guardar una empresa")
    }
})

guardarEmpresa.addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let internacional = document.getElementById("internacional").checked;
    let pais = document.getElementById("pais").value;
    proveedor = new Tipo_proveedor(nombre, telefono, email,internacional, pais);
    Proveedores.push(proveedor);
    formularioEmpresa.reset();

    modalEmpresa.hide();
    console.log("empresa guardada");
    console.log(Proveedores);
    cargarDatosProveedor();
})
guardarArticulo.addEventListener("click", () => {
    let nombre = document.getElementById("nombreArticulo").value;
    let cantidad = document.getElementById("cantidad").value;
    cantidad = parseInt(cantidad);
    let precio = document.getElementById("precio").value;
    precio = parseInt(precio);
    let proveedordesdeSelec = Proveedores.find((proveedor) => proveedor.nombre === selectorEmpresa.value);
    let articulo = new Articulo(nombre, precio, cantidad);

    proveedordesdeSelec.articulos = articulo;
    formularioArticulos.reset();
    mostrarArticulos(proveedordesdeSelec);
    cargarDatosProveedor();
})

function mostrarArticulos(proveedor){
    productosProveedor.innerHTML = "";
    proveedor.articulos.forEach((articulo, index) => {
      productosProveedor.innerHTML += `<tr>
        <td>${index}</td>
        <td>${articulo.nombre}</td>
        <td>${articulo.cantidad}</td>
        <td>${articulo.precio}</td>
        </tr>`;
    });
}


selectorEmpresa.addEventListener("change", () => {
    let proveedor = Proveedores.find(
      (proveedor) => proveedor.nombre === selectorEmpresa.value
    );
    mostrarArticulos(proveedor);
})




/* function calcularTotal(proveedor){
    let total = 0;
    let proveedor = Proveedores.find(
      (proveedor) => proveedor.nombre === selectorEmpresa.value
    );
        proveedor.articulos.forEach((articulo) => {
            total += articulo.precio;
        })
    return total;
} */
function cargarDatosProveedor() {
  let datosProv = document.getElementById("datosProveedor");
  datosProv.innerHTML = "";
  Proveedores.forEach((proveedor) => {
    datosProv.innerHTML += `
      <p class="col-10">${proveedor.getInfoProveedor()}</p> ${
        proveedor.articulos.length > 0
          ? `<button class="btn btn-primary col-2 totalImp" value="${proveedor.nombre}">
              Mostrar Total Impuestos
            </button>`
          : ""
      }
    `;
  });

  let totalImp = document.querySelectorAll(".totalImp"); 


  totalImp.forEach((button) => {
    button.addEventListener("click", () => {
      const btnvalor = button.value;
      let proveedor = Proveedores.find(
        (proveedor) => proveedor.nombre === btnvalor
      );
      let total = 0;
      let cantidad = 0;
      proveedor.articulos.forEach((articulo) => {
        cantidad = articulo.cantidad;
        total += (cantidad * articulo.precio);
      });
      total = total * 0.19;
      alert("El proveedor "+proveedor.nombre+" tiene un total de impuestos de: "+total);
    
    });
  });
}


 



