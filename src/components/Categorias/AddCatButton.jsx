import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import {Link} from 'react-router-dom';


function AddCatButton() {
    return (
        <Link to = '/add_cat'>
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

export default AddCatButton
