import { Articulo } from "./Articulo.js";

export class Proveedor {
  constructor(nombre, telefono, email) {
    this._nombre = nombre;
    this._telefono = telefono;
    this._email = email;
    this._articulos = [];
  }
  get nombre() {
    return this._nombre;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  get telefono() {
    return this._telefono;
  }
  set telefono(telefono) {
    this._telefono = telefono;
  }
  get email() {
    return this._email;
  }
  set email(email) {
    this._email = email;
  }
  get articulos() {
    return this._articulos;
  }
  set articulos(articulos) {
   if(articulos instanceof Articulo){
    this._articulos.push(articulos);
   } 
  else if (articulos instanceof Array) {
       this.articulos = this._articulos.concat(articulos);
    }
  }

  getInfoProveedor() {
    return `Nombre: ${this.nombre}, Telefono: ${this.telefono}, Email: ${this.email}`;
  }
}
