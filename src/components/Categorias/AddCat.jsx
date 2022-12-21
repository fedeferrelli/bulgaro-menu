import React, { useState, useEffect, useId } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { setCat, uploadImage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import Loading from "../Loading";

const AddCat = ({ categories }) => {
  // states para las imagenes

  const [cargandoItem, setCargandoItem] = useState(false);
  const [urlimagen, setUrlimagen] = useState("");
  const [errorImg, setErrorImg] = useState(false);
  const [cargandoImagen, setCargandoImagen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const id = uuid();

  // obtener datos de categorias

  useEffect(() => {
    const establecerCategories = () => {
      setCategorias(categories);
    };

    categories && establecerCategories();
  }, [categories]);

  // validacion y leer datos de formulario

  const formik = useFormik({
    initialValues: {
      nueva_categoria: "",
      
      ubicacion: "",
      
    },

    validationSchema: Yup.object({
      nueva_categoria: Yup.string()
        .min(3, "Los nombres deben tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

      ubicacion: Yup.number()
        .min(1, "Debes ingresar un numero")
        .required("La ubicacion es obligatoria"),

      
    }),

    onSubmit: (plato) => {
      try {
       
          
          plato.id = id;
         
          //setCargandoItem(true)
          uploadData(plato);
          formik.resetForm();
       
      } catch (error) {
        console.log(error);
      }
    },
  });

  const uploadData = async (data) => {
    await setCat(data);
   
    navigate("/categorias");
  };

  // Todo sobre las imagenes

/*   const handleUploadImage = async (img, id) => {
    if (!img) return;
    setErrorImg(false);
    setCargandoImagen(true);
    const url = await uploadImage(img, id);
    setUrlimagen(url);
    setCargandoImagen(false);
  }; */

  // hook para redirecionar
  const navigate = useNavigate();

  return (
    <section className="bg-main relative min-h-screen">
      
      {cargandoItem && <Loading text={"Cargando item"} />}
      <h1 className="font-bold px-8 pt-6 w-full text-center text-text tracking-wider text-xl">
        <span className="text-2xl block uppercase text-white">
          {" "}
          nueva categoria
        </span>
      </h1>

      <div className="flex justify-center py-12">
        <div className=" w-full max-w-2xl">
          <form
            className="w-full px-4 flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            {/* PLATO */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="plato"
              >
                Nueva Categoría
              </label>

              <input
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="nueva_categoria"
                type="text"
                placeholder="Nombre"
                value={formik.values.nueva_categoria.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nueva_categoria && formik.errors.nueva_categoria ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.nueva_categoria}</p>
              </div>
            ) : null}

            {/* Posición */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="ubicacion"
              >
                Ubicación de la categoría en el menú
              </label>

              <input
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="ubicacion"
                type="number"
                placeholder="Posición"
                min="0"
                value={formik.values.ubicacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.ubicacion && formik.errors.ubicacion ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.ubicacion}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className=" w-full h-12 rounded-full px-6 py-2 mt-8 bg-green-700 font-bold uppercase text-white hover:bg-green-800 cursor-pointer"
              value="agregar categoría"
            />

            <button
              className=" w-full h-12 rounded-full px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => navigate("/categorias")}
            >
              {" "}
              cancelar{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCat;
