import React from 'react';
import {modificarStock} from '../../firebase/firebase'

function ChangeStock({id, plato, stock, setShowChangeStock}) {
    return (
        <div className="m-auto mt-28 z-10 w-11/12 rounded-md bg-gray-700 text-white text-center text-lg">
            <div className="m-auto  p-4  flex flex-col gap-6 ">
                <h1>Deseas cambiar el stock de <span className="block font-semibold">{plato} ?</span>{stock ? 'en stock' : 'no hay stock' }</h1>
                <section className="w-full flex flex-row justify-evenly">
                    <div onClick={()=>modificarStock(id, stock)} className="p-3 rounded-md bg-green-800 ">{stock ? 'Sacar' : 'Agregar'}</div>
                    <div onClick={()=>setShowChangeStock(false)} className="p-3 rounded-md bg-gray-800/60">Cancelar</div>
                </section>

            </div>
            
        </div>
    )
}

export default ChangeStock
