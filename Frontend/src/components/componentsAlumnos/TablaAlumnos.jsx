import React from 'react'

export default function TablaAlumnos({items, onEdit,onDelete}) {
  return (
    <>
    <table className='table table-striped table-dark'>
        <thead>
            <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Edad</th>
                <th scope='col'>Ingreso</th>
                <th scope='col'>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item,index) => { 
                return(
                    <tr key={index}>
                        <td>{item.nombre} </td>
                        <td>{item.edad} </td>
                        <td>{item.createdAt} </td>
                        <td >
                            <button className="btn btn-warning" onClick={() =>{onEdit(item)}}>Edit</button>
                            <button className='btn btn-danger' onClick={()=> onDelete(item)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </>
  )
}
