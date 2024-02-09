import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}){
    //obtenemos el id del cliente
    const cliente = await obtenerCliente(params.clienteId)
    //en caso de que no encuentre el cliente solicitado
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'El Cliente no fue encontrado'
        })
    }

    return cliente
}

export async function action({request, params}){
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

    //editarcliente
    await actualizarCliente(params.clienteId ,datos)

    return redirect('/')

}

function EditarCliente(){

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>
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
                    <Formulario 
                        cliente={cliente}
                    />
                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg" value="Guardar cambios"/>
                </Form>
            </div>
        </>
    )
}

export default EditarCliente
