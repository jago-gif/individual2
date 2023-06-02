export class Proveedor {
  constructor(nombre, articulo, precio) {
    this._nombre = nombre;
    this._articulo = articulo||[];
    this._precio = precio;
  }
  // Getter y Setter para el nombre
  get nombre() {
    return this._nombre;
  }
  set nombre(newNombre) {
    this._nombre = newNombre;
  }
  // Getter y Setter para el articulo
  get articulo() {
    return this._articulo;
  }
  set articulo(newArticulo) {
    this._articulo = newArticulo;
  }
  // Getter y Setter para el precio
  get precio() {
    return this._precio;
  }
  set precio(newPrecio) {
    this._precio = newPrecio;
  }
  getInfoProveedor() {
    let articulosInfo = this._articulo.map(articulo => articulo.getInfoArticulo()).join(", ");
    return `Proveedor: ${this._nombre}, Artículos: ${articulosInfo}, Precio: ${this._precio}`;
  }
}

