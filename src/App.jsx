import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { fetchData } from "./api";

import Links from "./components/Links/Links";
import ShowTestDetail from "./components/showTestDetail/ShowTestDetail";
import AddItem from "./components/NuevoPlato/AddItem";
import CategoriasAdmin from "./components/Categorias/CategoriasAdmin";
import AddCat from "./components/Categorias/AddCat";

function App() {
  const [data, setData] = useState();
  const [categories, setCategoies] = useState();

  const getData = async () => {
    onSnapshot(collection(db, "platos"), (querySnapshot) => {
      let cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });

      setData(cities);
    });
  };

  const getCategories = async () => {
    const categoriesApi = await fetchData.fetchCategories();
    setCategoies(
      categoriesApi
        .sort((a, b) => {
          return +a.posicion > +b.posicion ? 1 : -1;
        })
        .map((cat) => cat.nueva_categoria)
    );
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <div className="bg-white sm:bg-main min-h-screen flex flex-col">
      <h1 className="bg-main z-10 text-white py-2 text-xl sm:text-4xl font-semibold text-center fixed w-full h-12 sm:h-20">
        BLG. Administrador de Menú
      </h1>
      <section className="mt-12">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Links data={data} categories={categories} />}
            />
            <Route path="/:dish" element={<ShowTestDetail data={data} />} />
            <Route
              path="/add_plato"
              element={<AddItem categories={categories} />}
            />

            <Route
              path="/categorias"
              element={<CategoriasAdmin categories={categories} />}
            />

            <Route
              path="/add_cat"
              element={<AddCat categories={categories} />}
            />
          </Routes>
        </Router>{" "}
      </section>
    </div>
  );
}

export default App;
