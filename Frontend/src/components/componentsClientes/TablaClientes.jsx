import React from 'react'

export default function TablaClientes({items, onEliminar, onModificar}) {
  const onDelete = (id) =>{
      const pregunta = window.confirm('Estas seguro de que sea eliminar?')
      if(pregunta){
        onEliminar(id)
      }
      
  }
     
  return (
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Direccion</th>
      <th scope="col">Fecha de Nacimiento</th>
      <th scope="col">Acciones (M/E)</th>
    </tr>
  </thead>
  <tbody>
    {items && items.map((item, index)=>{
        return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.direccion}</td>
                <td>{item.fechaNacimiento}</td>
                <td>
                    <button
                            className='btn btn-primary'
                            onClick={()=>{onModificar(item.ID_cliente)}}
                            >Modificar</button>
                </td>
                <td>
                    <button
                        className='btn btn-primary'
                        onClick={()=>{onDelete(item.ID_cliente)}}>
                            Eliminar
                    </button>
                </td>
            </tr>

        )
    })}
   
  </tbody>
</table>
  )
}
