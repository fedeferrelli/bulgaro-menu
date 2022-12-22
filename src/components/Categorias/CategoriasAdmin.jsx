import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loading from "../Loading";
import DeleteCat from "./DeleteCat";
import AddCatButton from "./AddCatButton";
import ShowCat from "./ShowCat";
import ModificarCat from "../Modificar/ModificarCat";

function CategoriasAdmin() {
  const [categories, setCategories] = useState();
  const [showLoading, setShowLoading] = useState(true);
  
  const [showDeleteCat, setShowDeleteCat] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState();
  const [idToDelete, setIdToDelete] = useState();

  const [showModificarCat, setShowModificarCat] = useState(false);
  const [categoriaToModificar, setCategoriaToModificar] = useState();
  const [idToModificar, setIdToModificar] = useState();
  const [ubicacionModificar, setUbicacionToModificar] = useState();

  const getCategorieData = async () => {
    onSnapshot(collection(db, "categorias"), (querySnapshot) => {
      let cats = [];
      querySnapshot.forEach((doc) => {
        cats.push(doc.data());
      });

      setCategories(cats.sort((a, b) => a.ubicacion - b.ubicacion));
      setShowLoading(false);
    });
  };

  useEffect(() => {
    getCategorieData();
  }, []);

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
        <div key={cat.id}>
          <ShowCat
            cat={cat}

            setShowDeleteCat={setShowDeleteCat}
            setCategoriaToDelete={setCategoriaToDelete}
            setIdToDelete={setIdToDelete}

            setShowModificarCat={setShowModificarCat}
            setCategoriaToModificar={setCategoriaToModificar}
            setIdToModificar={setIdToModificar}
            setUbicacionToModificar={setUbicacionToModificar}
          />
        </div>
      ))}

      {showDeleteCat && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 z-20 flex min-h-screen mt-14">
          <DeleteCat
            id={idToDelete}
            categoria={categoriaToDelete}
            setShowDeleteCat={setShowDeleteCat}
          />
        </div>
      )}

{showModificarCat && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-main/80 z-20 flex min-h-screen mt-14">
          <ModificarCat
            id={idToModificar}
            categoria={categoriaToModificar}
            ubicacion={ubicacionModificar}
            setShowModificarCat={setShowModificarCat}
          />
        </div>
      )}

      <AddCatButton />
    </section>
  );
}

export default CategoriasAdmin;
