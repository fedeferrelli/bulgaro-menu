import React from 'react'
import {useNavigate} from 'react-router-dom'


function Menu({showMenu, setShowMenu}) {

    const navigate = useNavigate();

    const handleGoTo = (goTo) => {
        navigate(`${goTo}`);
        setShowMenu(false)

    }

    return (
        <div className="fixed z-30 top-12 left-2 right-2 p-4 py-10 text-white bg-gray-800 rounded-lg shadow-sm shadow-text flex flex-col gap-8 
        justify-start">
       <div className="w-auto ">
         <span className="p-4"  onClick={()=>handleGoTo('/')}>Menu</span>        
      </div>
      <div className="w-auto">
         <span className="p-4"  onClick={()=>handleGoTo('/categorias')}>Categorías</span>        
      </div>
        </div>
    )
}

export default Menu
