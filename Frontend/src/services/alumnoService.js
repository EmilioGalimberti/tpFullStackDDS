import axios from "axios";

const apiUrl = 'http://localhost:3000'



async function getAlumnosApi(filtro) {
    try{
     if(filtro == undefined){
     const response = await axios.get(`${apiUrl}/alumnos`)
     return response.data
      }
      else{
         const queryParams = {
            nombre: filtro,
            // Agrega más parámetros según sea necesario
          };
         const response = await axios.get(`${apiUrl}/alumnos`, {params: queryParams})
         console.log(response.data)
         return response.data
      }
    }
    catch(error){
     console.error("Error al realizar la petición HTTP")
    }
    
 }

 async function postAlumnosApi(datos){
    try{
     const response = await axios.post(`${apiUrl}/alumnos`,datos)
     console.log(response)
     return response.data
    }
    catch(error){
     console.error("Error al realizar la petición HTTP")
    }
 } 

 async function putAlumnoById(idItem,nuevoAlumno){
    try{
       const response = axios.put(`${apiUrl}/alumnos/${idItem}`,nuevoAlumno)
       return response.data
    }
    catch(error){
       console.error("Error al realizar la petición HTTP")
    }
 }

 async function deleteAlumnoApi(idItem){
   try{
    const response = await axios.delete(`${apiUrl}/alumnos/${idItem}`)
    return response.data
   }
   catch(error){
    console.error("Error al realizar la petición HTTP")
   }
   
}
 
 export  {
    getAlumnosApi,
    postAlumnosApi,
    putAlumnoById,
    deleteAlumnoApi
 }