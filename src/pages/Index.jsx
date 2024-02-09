import { useLoaderData } from "react-router-dom"
import { Cliente } from "../components/Cliente";
import { obtenerClientes } from "../data/clientes.js";

//loader viene a reemplazar a useEffect en react-router-dom. Es una funcion que se va a ejecutar cuando un componente cargue, es ideal para consultar una API o para cargar un state y obtener un resultado que quieras mostrar en un componente. Siempre tiene que retornar algo.
export function loader(){
    const clientes = obtenerClientes()
    return clientes
    
}

function Index(){

    const clientes = useLoaderData()

    //Error Bounderies (componente de react que obtiene los errores cuando ocurren y tiran una interfaz son ese error)

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>
            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente 
                                cliente={cliente}
                                key={cliente.id}
                            />
                        ))}
                    </tbody>
                    
                </table>
            ) : (
                <p className="text-center mt-10">No hay clientes aún</p>
            )}
        </>
    )
}

export default Index
