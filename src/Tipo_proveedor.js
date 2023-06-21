import { Proveedor } from "./Proveedor";

export class Tipo_proveedor extends Proveedor{
    constructor(nombre,telefono,email,internacional, pais){
        super(nombre, telefono, email);
        this._internacional = internacional;
        this._pais = pais;
    }
    get internacional(){
        return this._internacional;
    }
    set internacional(internacional){
        this._internacional = internacional;
    }
    get pais(){
        return this._pais;
    }
    set pais(pais){
        this._pais = pais;
    }
    getInfoProveedor() {
    return `${super.getInfoProveedor()} Tipo de proveedor: ${
      this.internacional == true ? "Internacional" : "Nacional"
    }, Pais: ${this.pais}`;
}







}
