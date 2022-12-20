import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../Loading";
import DeleteItem from "./DeleteItem";
import ChangeStock from "./ChangeStock";

function ShowTestDetail({ data }) {
  const { dish } = useParams();
  const [selectedDish, setSelectedDish] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showChangeStock, setShowChangeStock] = useState(false);

  useEffect(() => {
    const setDish = () => {
      setSelectedDish(data.find((plato) => plato.plato === dish));
      setShowLoading(false);
    };
    typeof data !== "undefined" && setDish();
  }, [data]);

  const navigate = useNavigate();

  const handlePrice = (string) => {
    return "$" + Number(string).toLocaleString("de-DE");
  };

  const handleDelete = () => {
    setShowDeleteItem(true);
   
  };

  const handleChangeStock = () => {
    setShowChangeStock(true);
  };

  return showLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <section className="pb-20 bg-white min-h-screen w-full relative">
      {showDeleteItem && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 z-20 flex">
          <DeleteItem
            id={selectedDish.id}
            plato={selectedDish.plato}
            setShowDeleteItem={setShowDeleteItem}
          />
        </div>
      )}

      {showChangeStock && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 z-20 flex">
          <ChangeStock
            id={selectedDish.id}
            stock={selectedDish.existencia}
            plato={selectedDish.plato}
            setShowChangeStock={setShowChangeStock}
            
          />
        </div>
      )}

      <div className="w-full ">
        <div className="relative">
        {!selectedDish?.existencia && <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 flex">
          <h1 className="bg-red-500 capitalize h-auto flex m-auto py-3 px-4 text-center  rounded-full ">sin stock</h1>
          </div>}
          <img
            className=""
            src={selectedDish?.image}
            loading="lazy"
            alt={`imagen para ${selectedDish?.title}`}
          ></img>{" "}
        </div>
        <div className="p-2 w-full">
          <section className="flex flex-row justify-left gap-4">
          <h1 className="text-2xl text-left capitalize font-semibold text-text">
            {" "}
            {selectedDish?.plato} 
          </h1>
          
          </section>
          <div className="flex justify-left">
            <div className="rounded-full bg-gray-200 w-auto text-gray-400 px-2 py-1 text-sm">
              {" "}
              {selectedDish?.categoria}{" "}
            </div>{" "}
          </div>

          <h1 className="text-2xl font-bold text-left capitalize text-text mt-3">
            {" "}
            {handlePrice(selectedDish?.precio)}
          </h1>

          <p className="text-left text-description mt-2 text-md max-w-prose">
            {" "}
            {selectedDish?.descripcion}
          </p>

          <div
            className="mt-10 p-3 border border-green-800 bg-gray-100/50 text-text mx-auto text-center text-lg rounded-full w-1/2"
            onClick={() =>
              handleChangeStock(selectedDish.id, selectedDish.existencia)
            }
          >
            {selectedDish?.existencia ? "Sacar de Stock" : "Agregar a Stock"}
          </div>

          <div
            className="mt-3 p-3 border bg-violet-800 text-white mx-auto text-center text-lg rounded-full w-1/2"
            onClick={() => handleDelete(selectedDish.id)}
          >
            Modificar
          </div>

          <div
            className="mt-3 p-3 bg-red-800 text-white mx-auto text-center text-lg rounded-full w-1/2"
            onClick={() => handleDelete(selectedDish.id)}
          >
            Eliminar item
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-3 rounded-full bg-alt_bg shadow-xl text-center text-text right-3 bottom-3 fixed border border-gray-300/80"
      >
        Volver al Menú
      </button>
    </section>
  );
}

export default ShowTestDetail;
