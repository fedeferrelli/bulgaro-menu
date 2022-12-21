import React from "react";
import { eliminarCategoria } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function DeleteCat({ id, categoria, setShowDeleteCat }) {
  const navigate = useNavigate();
  console.log(id, categoria)

  const handleEliminar = (id) => {
    eliminarCategoria(id);
    setShowDeleteCat(false);
  };

  return (
    <div className="m-auto mt-28 z-10 w-11/12 rounded-md bg-gray-700 text-white text-center text-lg">
      <div className="m-auto  p-4  flex flex-col gap-6 ">
        <h1>
          Deseas eliminar{" "}
          <span className="block font-semibold uppercase">{categoria} ?</span>
        </h1>
        <section className="w-full flex flex-row justify-evenly">
          <div
            onClick={() => handleEliminar(id)}
            className="p-3 rounded-full w-2/5 bg-red-800 "
          >
            Eliminar
          </div>
          <div
            onClick={() => setShowDeleteCat(false)}
            className="p-3 rounded-full w-2/5 bg-gray-800/60"
          >
            Cancelar
          </div>
        </section>
      </div>
    </div>
  );
}

export default DeleteCat;
