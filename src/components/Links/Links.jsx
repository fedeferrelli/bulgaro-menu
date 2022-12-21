import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading";
import Search from "./Search";
import Categories from "./Categories";
import ShowItems from "./ShowItems";
import BackToTopButton from "./BackToTopButton";
import AddItemButton from "./AddItemButton";

function Links({ data, categories }) {
  const [categoriesToShow, setCategoriesToShow] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    const setCat = () => {
      const filteredData = data.filter(
        (dish) =>
          dish.plato.toLowerCase().includes(search.toLowerCase()) ||
          dish.descripcion.toLowerCase().includes(search.toLowerCase()) ||
          dish.categoria.toLowerCase().includes(search.toLowerCase()) ||
          dish.tags.toLowerCase().includes(search.toLowerCase())
      );
      const catInData = filteredData.map((dish) => dish.categoria);
      const cat = [];
      categories.map(
        (category) => catInData.includes(category) && cat.push(category)
      );
      setCategoriesToShow(cat);
      setDataToShow(filteredData);
      setShowLoading(false);
    };

    categories && data && setCat();
  }, [data, categories, search]);

  return showLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <div className="py-4 pb-20 flex flex-col gap-4 bg-main max-w-[1200px] m-auto px-1 w-full min-h-screen">
      
      <Link to='/categorias' className="px-3 py-2 border border-white rounded-full text-text w-auto"> ir a Administrar Categorías </Link>
      
      <Search setSearch={setSearch} />

      <Categories categories={categoriesToShow} />

      {categoriesToShow?.map((categoria) => (
        <div key={categoria}>
          <ShowItems categoria={categoria} dataToShow={dataToShow} />
        </div>
      ))}

      <BackToTopButton />
      <AddItemButton />
    </div>
  );
}

export default Links;
