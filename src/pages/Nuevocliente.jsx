import { Form, useNavigate, useActionData, redirect } from "react-router-dom" //useNavigate hook para usar navegacion dentro de botones
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes.js"

//Action es similar a loader solo que no con la caracteristica de useEffect, lo que viene a hacer es reemplazar el action tipico que se usa en la etiqueta form. Es decir procesa los datos de un formulario
export async function action({request}){
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    
    //validacion
    const errores = []
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }

    const web = formData.get('web')
    let regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!regex.test(web)){
        errores.push('La web no es válida')
    }

    //retornar datos si hay errores
    if(Object.keys(errores).length){
        return errores
    }

    //uso await para bloquear las siguientes lineas, hasta que finalice la funcion agregarCliente
    await agregarCliente(datos)

    return redirect('/')
}

const Nuevocliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()
    console.log(errores)

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                {/* lo siguiente no se ejecuta bajo "true y false", mas bien es cuando se cumpla la condición se manda a llamar errores.map */}
                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
                <Form
                    method="post"
                    noValidate
                >
                    <Formulario />
                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg" value="Registrar Cliente"/>
                </Form>
            </div>
        </>
    )
}

export default Nuevocliente