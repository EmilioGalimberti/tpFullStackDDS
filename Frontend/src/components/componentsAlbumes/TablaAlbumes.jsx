import React from 'react'

export default function TablaAlbumes({items,onBorrar,onEditar}) {
  return (
    <>
    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Autor</th>
      <th scope="col">Canciones</th>
      <th scope="col">Stock</th>
      <th scope='col'>Fecha de Lanzamiento</th>
      <th scope='col'>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item,index) => { return(
        <tr key={index}>
        <td>{item.nombre} </td>
        <td>{item.autor} </td>
        <td>{item.cantidad_canciones} </td>
        <td>{item.stock} </td>
        <td>{item.fechaLanzamiento.slice(0,10)}</td>
        <td><button className='btn btn-danger m-1' onClick={()=>{onBorrar(item)}}>🗑️</button>
        <button className='btn btn-warning' onClick={()=>{onEditar(item)}}>✎</button>
        </td>
      </tr>
        )
    })}
  </tbody>
</table>
    </>
  )
}
