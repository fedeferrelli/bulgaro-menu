import { useState, useEffect } from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { fetchData } from "./api";

import Links from "./components/Links/Links";
import ShowTestDetail from "./components/showTestDetail/ShowTestDetail";
import AddItem from './components/NuevoPlato/AddItem'

function App() {
  const [data, setData] = useState();
  const [categories, setCategoies] = useState();

  const getData = async () => {
    const dataApi = await fetchData.fetchMenuData();
    setData(dataApi);
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
              element={<AddItem categories={categories}/>}
            />
          </Routes>
        </Router>{" "}
      </section>
    </div>
  );
}

export default App;