import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function ShowCat({cat, setShowDeleteCat, setIdToDelete, setCategoriaToDelete, setIdToModificar, setCategoriaToModificar, setShowModificarCat, setUbicacionToModificar}) {

    const handleEliminar = (id, cat) =>{
        setIdToDelete(id);
        setCategoriaToDelete(cat);
        setShowDeleteCat(true)
    }

    const handleModificar = (id, nueva_categoria, ubicacion) =>{
        setIdToModificar(id);
        setCategoriaToModificar(nueva_categoria);
        setUbicacionToModificar(ubicacion)
        setShowModificarCat(true)
    }

    return (
        <div>
           
        <div
          key={cat.nueva_categoria + cat.ubicacion}
          className="flex flex-row justify-between w-full px-2 py-3 rounded-md bg-gray-200"
        >
          <div className=" font-semibold capitalize">
            {cat.ubicacion} {cat.nueva_categoria}
          </div>

          <section className="flex flex-row gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/70 flex"
            onClick={()=>handleModificar(cat.id, cat.nueva_categoria, cat.ubicacion)}>
              <div className="m-auto font-bold">
                <BiDotsHorizontalRounded />
              </div>
            </div>

            <div
              className="w-8 h-8 rounded-full bg-gray-500/70 flex"
              onClick={()=>handleEliminar(cat.id, cat.nueva_categoria)}
            >
              <div className="m-auto font-bold">
                <AiOutlineDelete />
              </div>
            </div>
          </section>
        </div>
     
            
        </div>
    )
}

export default ShowCat
