import React, { useState } from 'react'

export default function ConsultarAlumnos({onConsultar,onNuevo}) {
  const [filtroID, setId] = useState('')

  return (
    <>
    <label>Filtrar por Nombre:</label>
    <input placeholder="Lucas" type="text" className='col-4' onChange={(event)=>{setId(event.target.value)}}/>
    <button onClick={()=>onConsultar(filtroID)}>Consultar</button>
    <button onClick={() => onNuevo()}>Nuevo</button>
    </>
  ) 
}