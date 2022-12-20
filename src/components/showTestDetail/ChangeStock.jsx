import React from 'react';
import {modificarStock} from '../../firebase/firebase'


function ChangeStock({id, plato, stock, setShowChangeStock, setShowLoading}) {

    const handleModificarStock = (id, stock) =>{
        setShowLoading(true)
        modificarStock(id, stock);
        setShowChangeStock(false)
        
    }

    return (
        <div className="m-auto mt-28 z-10 w-11/12 rounded-md bg-gray-700 text-white text-center text-lg">
            <div className="m-auto  p-4  flex flex-col gap-6 ">
                <h1>Deseas cambiar el stock de <span className="block font-semibold uppercase">{plato} ?</span></h1>
                <section className="w-full flex flex-row justify-evenly">
                    <div onClick={()=>handleModificarStock(id, stock)} className="p-3 rounded-full bg-green-800 w-2/5">{stock ? 'Sacar' : 'Agregar'}</div>
                    <div onClick={()=>setShowChangeStock(false)} className="p-3 rounded-full w-2/5 bg-gray-800/60">Cancelar</div>
                </section>

            </div>
            
        </div>
    )
}

export default ChangeStock
