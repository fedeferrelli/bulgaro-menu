import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import {Link, useNavigate} from 'react-router-dom';


function AddItemButton() {
    return (
        <Link to = '/add_plato'>
            <div
        className="rounded-full bg-violet-500 shadow-xl text-center text-white left-3 bottom-3 fixed border border-violet-700/80 flex sm:hover:cursor-pointer"
        >
        <span className="w-full m-auto rounded-full p-4 text-2xl">
          {" "}
          <AiOutlinePlus />{" "}
        </span>
      </div>
            
        </Link>
    )
}

export default AddItemButton
