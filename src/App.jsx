import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { fetchData } from "./api";

import { AiOutlineCoffee } from "react-icons/ai";
import { Link } from "react-router-dom";

import Links from "./components/Links/Links";
import ShowTestDetail from "./components/showTestDetail/ShowTestDetail";
import AddItem from "./components/NuevoPlato/AddItem";
import CategoriasAdmin from "./components/Categorias/CategoriasAdmin";
import AddCat from "./components/Categorias/AddCat";
import Menu from "./components/Menu";

function App() {
  const [data, setData] = useState();
  const [categories, setCategories] = useState();
  const [showMenu, setShowMenu] = useState(false);

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
    onSnapshot(collection(db, "categorias"), (querySnapshot) => {
      let cats = [];
      querySnapshot.forEach((doc) => {
        cats.push(doc.data());
      });

      setCategories(
        cats
          .sort((a, b) => {
            return +a.ubicacion > +b.ubicacion ? 1 : -1;
          })
          .map((cat) => cat.nueva_categoria)
      );
    });
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <div className="bg-white sm:bg-main min-h-screen flex flex-col relative">
      <section className="bg-main fixed z-10 w-full flex flex-row justify-between px-3">
        <div
          className="m-auto text-white text-2xl"
          onClick={() => setShowMenu(!showMenu)}
        >
          <AiOutlineCoffee />
        </div>

        <h1 className="z-10 text-white py-2 text-xl sm:text-4xl font-semibold text-right w-full h-12 sm:h-20">
          BULGARO Admin
        </h1>
      </section>
      <section className="mt-12">
        <Router>
          {showMenu && <Menu showMenu={showMenu} setShowMenu={setShowMenu} />}
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
