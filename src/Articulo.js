export class Articulo {
  constructor(name, email, telefono) {
    this._name = name;
    this._email = email;
    this._telefono = telefono;
  }
  // Getter y Setter para el nombre
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
  // Getter y Setter para el email
  get email() {
    return this._email;
  }
  set email(newEmail) {
    this._email = newEmail;
  }
  // Getter y Setter para el teléfono
  get telefono() {
    return this._telefono;
  }
  set telefono(newTelefono) {
    this._telefono = newTelefono;
  }
  getInfoProveedor() {
    return `Nombre: ${this._name}, teléfono: ${this._telefono}, Correo:  ${this._email}`
  }
}

