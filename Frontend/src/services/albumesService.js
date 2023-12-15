import axios from "axios";

const API_BASE_URL = 'http://localhost:3000'

async function getAlbumesApi(){
   try{
    const response = await axios.get(`${API_BASE_URL}/albumes`)
    return response.data
   }
   catch(error){
    console.error("Error al realizar la petición HTTP")
   }
   
}

async function postAlbumesApi(datos){
    try{
     const response = await axios.post(`${API_BASE_URL}/albumes`,datos)
     return response.data
    }
    catch(error){
     console.error("Error al realizar la petición HTTP")
    }
    
 }
 
 
 async function GetAlbumesByNombre(nombre){
   try{
    const response = await axios.get(`${API_BASE_URL}/albumes/${nombre}`)
    return response.data
   }
   catch(error){
    console.error("Error al realizar la petición HTTP")
    return false
   }
   
}

async function putAlbumById(item,nuevo){
   try{
      const response = axios.put(`${API_BASE_URL}/albumes/${item}`,nuevo)
      return response.data
   }
   catch(error){
      console.error("Error al realizar la petición HTTP")
   }
}

 async function deleteAlbumesApi(item){
    try{
     const response = await axios.delete(`${API_BASE_URL}/albumes/${item.id}`)
     return response.data
    }
    catch(error){
     console.error("Error al realizar la petición HTTP")
    }
    
 }
 

export {
    getAlbumesApi,
    GetAlbumesByNombre,
    putAlbumById,
    postAlbumesApi,
    deleteAlbumesApi
}