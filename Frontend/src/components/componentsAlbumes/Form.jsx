import React from 'react'
import {useForm} from 'react-hook-form'

export default function Form({onCancelar,onSubmit,item}) {


  const {register, handleSubmit,formState: {errors}} = useForm()



  return (
  <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" className="form-control" id="nombre" aria-describedby="emailHelp" defaultValue={item == null?'':item.nombre} placeholder={item == null?'Nombre del album':item.nombre} {...register('nombre', {required:'El campo es requerido'})} />
        {errors.nombre && <p>{errors.nombre.message} </p>}
      </div>
      <div className="form-group">
        <label htmlFor="autor">Autor:</label>
        <input type="text" className="form-control" id="autor" aria-describedby="emailHelp" defaultValue={item == null?'':item.autor} placeholder={item == null?"Nombre del autor":item.autor} {...register('autor', {required:'El campo es requerido'})} />
        {errors.autor && <p>{errors.autor.message} </p>}
      </div>
      <div className="form-group">
        <label htmlFor="cant_canciones">Cantidad de canciones:</label>
        <input type="text" className="form-control" id="cant_canciones" aria-describedby="emailHelp" defaultValue={item == null?"":item.cantidad_canciones} placeholder={item == null?"Cantidad de canciones":item.cantidad_canciones} {...register('cantidad_canciones',{required:'El campo es requerido'})} />
        {errors.cantidad_canciones && <p>{errors.cantidad_canciones.message} </p>}
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input type="text" className="form-control" id="stock" defaultValue={item == null?"":item.stock} placeholder={item == null?"Stock":item.stock} {...register('stock',{required:'El campo es requerido'})} />
        {errors.stock && <p>{errors.stock.message} </p>}
      </div>
      <div className="form-group">
        <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
        <input type="date" className="form-control" id="fechaLanzamiento" defaultValue={item == null?"":item.fechaLanzamiento.slice(0,10)} placeholder={item == null?"Fecha Lanzamiento":item.fechaLanzamiento} {...register('fechaLanzamiento',{required:'El campo es requerido'})} />
        {errors.fechaLanzamiento && <p>{errors.fechaLanzamiento.message} </p>}
      </div>
      <button type="button" className="btn btn-secondary" onClick={()=>{onCancelar()}}>Cancelar</button>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  </>
  )
}
