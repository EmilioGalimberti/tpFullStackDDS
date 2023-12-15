import React, { useState } from 'react'

export default function ConsultarAlbumes({onConsultar,onNuevo}) {
  const [filtro,setNombre] = useState('')
  return (
    <>
    <label>Buscar por Nombre:</label>
    <input type="text" className='col-4'  onChange={(event)=>{setNombre(event.target.value)}}/>
    <button onClick={()=>onConsultar(filtro)}>Consultar</button>
    <button onClick={()=>onNuevo()}>Nuevo</button>
    </>
  )
}
