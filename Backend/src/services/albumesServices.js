import { Album } from "../models/albumes.js";

async function getAll(){
    return await Album.findAll()
}

async function getAlbumById(Id_buscar){
    return await Album.findOne({where: {id:Id_buscar}})
}

async function getAlbumes(nombre){
    if(nombre != undefined){
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        return await Album.findAll({where: {nombre: nombre}})
    }
    else{
        return await Alumno.findAll()
    }
}

async function addAlbum(nuevoAlbum){
    return await Album.create(nuevoAlbum)
}

async function revomeAlbumById(Id){
    const album = await getAlbumById(Id)
    if (album){
        const deleted = await album.destroy()
        return deleted
    }
    return null
}

async function updateAlbumById(id,data ){
    const album = await getAlbumById(id)
    if(album){
        album.nombre = data.nombre
        album.autor = data.autor
        album.cantidad_canciones = data.cantidad_canciones
        album.stock = data.stock
        album.fechaLanzamiento =  data.fechaLanzamiento
        return album.save()
    }
    return null
}

export default{
    getAll,getAlbumById,getAlbumes, addAlbum, revomeAlbumById, updateAlbumById
}