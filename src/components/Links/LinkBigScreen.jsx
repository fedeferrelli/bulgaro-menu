import React, { useState } from "react";

function LinkBigScreen({ dish, handlePrice }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleOnClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div>
      <div className="sm:w-[250px] sm:h-[420px] sm:bg-gray-100 rounded-md sm:rounded-b-none sm:shadow-xl sm:hover:shadow-gray-900 sm:hover:shadow-lg sm:border sm:border-gray-700/25 ease-in-out duration-500 cursor-pointer overflow-hidden relative flex sm:flex-col">
        <div className="p-1 sm:p-0 w-2/5 min-w-[100px] h-auto sm:w-auto sm:rounded-none order-2 flex relative" onClick={()=>handleOnClick()}>
          {showDescription ? (
            <div className="bg-slate-800/90 w-full absolute top-0 bottom-0 left-0 right-0 p-2 flex">
              <p className="text-center m-auto text-alt_bg text-lg max-w-prose font-normal">
            
                {dish.descripcion}
              </p>
            </div>
          ) : null}
          <img
            className="sm:m-auto w-full h-auto border border-gray-400/20 sm:border-none sm:w-auto rounded-lg sm:rounded-none m-auto"
            loading="lazy"
            src={dish?.image}
            alt={`imagen para ${dish?.title}`}
          ></img>
        </div>
        <div className="p-2 w-full sm:order-2">
          <h1 className="text-2xl text-left capitalize font-semibold text-text">
            {" "}
            {dish.plato}
          </h1>
          <div className="flex justify-left"></div>

          <h1 className="text-xl font-bold text-left capitalize text-text mt-2">
            {" "}
            {handlePrice(dish.precio)}
          </h1>

          <p className="text-left text-description mt-2 text-sm max-w-prose font-normal">
            {" "}
            {dish.descripcion.substring(0, 30)}{dish.descripcion.length > 30 ? '...' : null}
          </p>
          
        </div>
      </div>
      <hr className="my-2 sm:hidden" />
    </div>
  );
}

export default LinkBigScreen;
