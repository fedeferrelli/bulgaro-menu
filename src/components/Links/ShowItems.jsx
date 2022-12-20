import React from "react";
import LinkMobile from "./LinkMobile";
import LinkBigScreen from "./LinkBigScreen";

function ShowItems({ categoria, dataToShow }) {
  const viewport_width = window.innerWidth;

  const handlePrice = (string) => {
    return "$" + Number(string).toLocaleString("de-DE");
  };

  return (
    <section
      className="w-full rounded-lg border py-3 px-2 border-gray-400/20 shadow-lg  mx-auto bg-white sm:bg-alt_bg"
      id={`${categoria}`}
    >
      <h1 className="text-4xl text-center sm:text-left capitalize font-bold text-text">
        {categoria}
      </h1>

      <ul className="mt-4 font-bold text-xl sm:w-full sm:flex sm:flex-row sm:flex-wrap sm:gap-10 sm:justify-evenly">
        {dataToShow
          ?.filter((dish) => dish.categoria === categoria).sort((a, b)=>a.ubicacion - b.ubicacion)
          .map((dish, i) => (
            <li key={dish.descripcion} className="mt-2">
              {viewport_width < 650 ? (
                <LinkMobile dish={dish} handlePrice={handlePrice} />
              ) : (
                <LinkBigScreen dish={dish} handlePrice={handlePrice} />
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}

export default ShowItems;
