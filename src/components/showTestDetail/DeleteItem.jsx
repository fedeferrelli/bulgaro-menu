import React from 'react';
import {eliminarPlato} from '../../firebase/firebase'

function DeleteItem({id, plato, setShowDeleteItem}) {
    return (
        <div className="m-auto mt-28 z-10 w-11/12 rounded-md bg-gray-700 text-white text-center text-lg">
            <div className="m-auto  p-4  flex flex-col gap-6 ">
                <h1>Deseas eliminar <span className="block font-semibold">{plato} ?</span></h1>
                <section className="w-full flex flex-row justify-evenly">
                    <div onClick={()=>eliminarPlato(id)} className="p-3 rounded-md bg-red-800 ">Eliminar</div>
                    <div onClick={()=>setShowDeleteItem(false)} className="p-3 rounded-md bg-gray-800/60">Cancelar</div>
                </section>

            </div>
            
        </div>
    )
}

export default DeleteItem
