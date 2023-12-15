import React, {useEffect ,useState } from 'react'
import TablaAlumnos from './TablaAlumnos'
import ConsultarAlumnos from "./ConsultarAlumnos"
import {getAlumnosApi, postAlumnosApi, putAlumnoById, deleteAlumnoApi} from "../../services/alumnoService"
import AltaAlumnoForm from './AltaAlumnoForm'
import EditAlumnoForm from './EditAlumnoForm'


export default function Alumnos() {
    const[rows, setRows] = useState([])  
    const[accion, setAccion] = useState("consultar")
    const[item, setItem] = useState()

    //Get a la api alumnos
    const getAlumnos = async(filtro) =>{
       
        if(filtro != undefined){
            console.log(filtro)
            const alumnos = await getAlumnosApi(filtro)
            if(alumnos == undefined){
                setRows([])
                alert("Alumno no encontrado")
            } else{
                setRows(alumnos)
            }
        }
        else{
            const alumnos = await getAlumnosApi(filtro)
            setRows(alumnos)
        }
    }

    //Para hacer la consulta apenas se renderiza y cargar la informacion
    useEffect(()=>{
        getAlumnos()
    }, [])

    //no sirve para escuchar al hijo y pasarnos el filtro
    const onConsultar = async(filtro) =>{
        if(filtro == ''){
             getAlumnos()
        }else{
            getAlumnos(filtro)
        }
    }
    //Solo me sirve para setear la accion y para que renderice otro componente
    const onNuevo = () =>{
        setAccion("nuevo")
    }
   
    const onCancelar = () =>{
        setAccion('consultar')
    }
    //Cambia la accion y ademas me sirve para comunicar con el hijo y rescatar un item especifico
    const onEdit = (item) =>{
        setItem(item)
        setAccion("edit")
    }
    
    //Post Alumno
    const onSubmit = async (dataForm) => {
        alert('Formulario cargado')
        await postAlumnosApi(dataForm)
        await getAlumnos()
        setAccion('consultar')
    }
    
    //Put alumno
    const onSubmitEdit = async(dataForm) =>{
        alert('Alumno Editado')
        console.log(dataForm)
        await putAlumnoById(item.id,dataForm)
        setAccion('consultar')
        await getAlumnos()
    }

    //Delete alumno
    const handleDelete  = async (item) =>{
        const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar esto?');
        if(confirmDelete){
            alert("Alumno eliminado")
            await deleteAlumnoApi(item.id)
        }else{
            alert("delete cancelado")
        }
        
        await getAlumnos()
      }

    return (
        <>
        {accion == "consultar" && (
            <div>
                <div>
                    <ConsultarAlumnos onConsultar={onConsultar} onNuevo={onNuevo}></ConsultarAlumnos>
                </div>  
                <div>
                    <TablaAlumnos items={rows} onEdit={onEdit} onDelete={handleDelete}></TablaAlumnos>
                </div>
            </div>
        )}
        {accion == "nuevo" && (
            <AltaAlumnoForm onCancelar={onCancelar} onSubmit={onSubmit}></AltaAlumnoForm>
        )}
        {accion == "edit" && (
            <EditAlumnoForm onCancelar={onCancelar} onSubmit={onSubmitEdit} item={item}></EditAlumnoForm>
        )}
        </>
    )
}
