import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loading from "../Loading";
import DeleteCat from "./DeleteCat";
import AddCatButton from "./AddCatButton";
import ShowCat from "./ShowCat";

function CategoriasAdmin() {
    
  const [categories, setCategories] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [showDeleteCat, setShowDeleteCat] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState();
  const [idToDelete, setIdToDelete] = useState()

  const getCategorieData = async () => {
    onSnapshot(collection(db, "categorias"), (querySnapshot) => {
      let cats = [];
      querySnapshot.forEach((doc) => {
        cats.push(doc.data());
      });

      setCategories(cats.sort((a, b) => a.posicion - b.posicion));
      setShowLoading(false);
    });
  };

  useEffect(() => {
    getCategorieData();
  }, []);

  console.log(categories);

  return showLoading ? (
    <>
      <Loading text={"Cargando Categorías"} />
    </>
  ) : (
    <section className="py-4 pb-20 flex flex-col gap-4 bg-main max-w-[1200px] m-auto px-1 w-full min-h-screen">
      <h1 className="text-xl font-bold text-center text-white uppercase">
        categorias
      </h1>

      {categories?.map((cat) => (
          <div key={cat.nueva_categoria}>
          <ShowCat cat={cat} setShowDeleteCat={setShowDeleteCat}
          setCategoriaToDelete={setCategoriaToDelete}
          setIdToDelete={setIdToDelete}/>
          </div>
      ))}
      {/* /*   <div
          key={cat.nueva_categoria + cat.ubicacion}
          className="flex flex-row justify-between w-full px-2 py-3 mt-2 rounded-md bg-gray-200"
        >
          <div className=" font-semibold capitalize">
            {cat.ubicacion} {cat.nueva_categoria}
          </div>

          <section className="flex flex-row gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/70 flex">
              <div className="m-auto font-bold">
                <BiDotsHorizontalRounded />
              </div>
            </div>

            <div
              className="w-8 h-8 rounded-full bg-gray-500/70 flex"
              onClick={() => setShowDeleteCat(true)}
            >
              <div className="m-auto font-bold">
                <AiOutlineDelete />
              </div>
            </div>
          </section>
        </div>
      */}
    

      {showDeleteCat && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 z-20 flex">
          <DeleteCat
            id={idToDelete}
            categoria={categoriaToDelete}
            setShowDeleteCat={setShowDeleteCat}
          />
          fede
        </div>
      )}

      <AddCatButton />
    </section>
  );
}

export default CategoriasAdmin;
