////Emilio Galimberti 90747
import { Alumno } from "../models/alumnoModel.js";

async function getAlumnos(nombre){
    console.log(nombre)
    if(nombre != undefined){
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        return await Alumno.findAll({where: {nombre: nombre}})
    }
    else{
        return await Alumno.findAll()
    }
}

async function getByID(id){
    return await Alumno.findOne({where: {id:id}})
}


async function add(nuevo){
    return await Alumno.create(nuevo)
}

export default{
    getByID,
    getAlumnos,
    add,
}