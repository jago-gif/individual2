export class Articulo {
  constructor(nombre, precio, cantidad) {
    this._nombre = nombre;
    this._precio = precio;
    this._cantidad = cantidad;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get precio() {
    return this._precio;
  }

  set precio(precio) {
    this._precio = precio;
  }

  get cantidad() {
    return this._cantidad;
  }

  set cantidad(cantidad) {
    this._cantidad = cantidad;
  }
}