import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Nuevocliente, {action as nuevoClienteAction} from './pages/Nuevocliente'
import Index, {loader as clientesLoader} from './pages/Index'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index:true, //no defines acá un path, estás indicando que sea el index cuando visites la pagina principal del proyecto
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <Nuevocliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
