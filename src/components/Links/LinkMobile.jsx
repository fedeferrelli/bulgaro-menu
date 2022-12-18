import React from "react";
import { Link } from "react-router-dom";

function LinkMobile({ dish, handlePrice }) {

  return (
    <div className={dish.existencia ? 'bg-transparent' : 'bg-gray-200'}>
      <Link
        className="hover:text-secondary/80 duration-300 "
        to={`/${dish.plato}`}
      >
        <div className="w-full rounded-md overflow-hidden relative flex">
          <div className="p-1 sm:p-0  w-2/5 min-w-[100px] h-auto sm:w-auto sm:rounded-none order-2 flex relative">
            <img
              className="w-full  h-auto border border-gray-400/20 rounded-lg m-auto"
              loading="lazy"
              src={dish?.image}
              alt={`imagen para ${dish?.title}`}
            ></img>
          </div>
          <div className="p-2 w-full ">
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
              {dish.descripcion.substring(0, 30)}{" "}
              {dish.descripcion.length > 30 ? "..." : null}
            </p>

            {!dish.existencia ? <div className="mt-2 rounded-full px-3 py-2 bg-gray-800 text-gray-200 text-center font-normal w-[120px] flex justify-center items-center">
              <span className="">sin stock</span></div> : null}
            
          </div>
        </div>
        <hr className="my-2" />
      </Link>
    </div>
  );
}

export default LinkMobile;
