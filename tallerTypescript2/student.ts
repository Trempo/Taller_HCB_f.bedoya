export class Student {
    nombre: string;
    foto: string;
    codigo: number;
    cedula: number;
    edad: number;
    direccion: string;
    telefono: number;

    constructor(nombre: string, foto: string, codigo: number,
        cedula: number, edad: number, direccion: string, telefono: number){
            this.nombre = nombre;
            this.foto = foto;
            this.codigo = codigo;
            this.cedula = cedula;
            this.edad = edad;
            this.direccion = direccion;
            this.telefono = telefono;
        }
}
