import React, { useState, useEffect, useId } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { setItem, uploadImage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
//import FileUploader from "react-firebase-file-uploader";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import Loading from "../Loading";

const AddItem = ({ categories }) => {
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
      plato: "",
      categoria: "",
      ubicacion: "",
      descripcion: "",
      precio: "",
      tags: "",
    },

    validationSchema: Yup.object({
      plato: Yup.string()
        .min(3, "Los nombres deben tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

      precio: Yup.number()
        .min(1, "Debes ingresar un numero")
        .required("El precio es obligatorio"),

      categoria: Yup.string()
        .min(3, "Los nombres deben tener al menos 1 caracter")
        .required("La categoría es obligatoria"),

      ubicacion: Yup.number()
        .min(1, "Debes ingresar un numero")
        .required("La ubicacion es obligatoria"),

      descripcion: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .required("La descripción es obligatoria"),
    }),

    onSubmit: (plato) => {
      try {
        if (urlimagen) {
          plato.existencia = true;
          plato.id = id;
          plato.image = urlimagen;
          //setCargandoItem(true)
          uploadData(plato);
          formik.resetForm();
        } else setErrorImg(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const uploadData = async (data) => {
    
    await setItem(data);
    setCargandoItem(false)
    navigate("/");
  };

  // Todo sobre las imagenes

  const handleUploadImage = async (img, id) => {
    if (!img) return;
    setErrorImg(false);
    setCargandoImagen(true);
    const url = await uploadImage(img, id);
    setUrlimagen(url);
    setCargandoImagen(false);
  };

  // hook para redirecionar
  const navigate = useNavigate();

  return (
    <section className="bg-main relative">
      {cargandoImagen && <Loading text={"Cargando imagen"} />}
      {cargandoItem && <Loading text={"Cargando item"} />}
      <h1 className="font-bold px-8 pt-6 w-full text-center text-text tracking-wider text-xl">
        <span className="text-2xl block uppercase text-white">
          {" "}
          nuevo plato
        </span>
      </h1>

      <div className="flex justify-center py-12">
        <div className=" w-full max-w-2xl">
          <form
            className="w-full px-4 flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            {/* IMAGEN */}
            <div
              className="w-full text-gray-500 focus-within:text-violet-700"
              id="img"
            >
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="imagen"
              >
                Imagen
              </label>

              <input
                className="w-full text-black border bg-gray-100 border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm sm:cursor-pointer"
                type="file"
                onChange={(event) => handleUploadImage(event.target.files[0])}
              />
            </div>

            {urlimagen && (
              <div
                className="w-full mt-1 text-sm bg-green-100 border-l-4 border-green-500 text-green-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Imagen cargada! </p>
              </div>
            )}

            {errorImg && (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold">
                  {" "}
                  Todavía no cargaste ninguna imagen{" "}
                </p>
              </div>
            )}

            {/* PLATO */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="plato"
              >
                Plato
              </label>

              <input
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="plato"
                type="text"
                placeholder="Nombre"
                value={formik.values.plato.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.plato && formik.errors.plato ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.plato}</p>
              </div>
            ) : null}

            {/* DESCRIPCION */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="descripcion"
              >
                Descripción del plato
              </label>

              <textarea
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
                id="descripcion"
                type="text"
                placeholder="Descripción"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}

            {/* CATEGORIA SELECT */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="categoria_select"
              >
                Categoría
              </label>

              <select
                name="categoria"
                id="categoria"
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300 px-3 py-2  rounded-sm "
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" className="bg-slate-200 shadow-none">
                  Seleccione una categoría{" "}
                </option>
                {categorias.map((categoria) => (
                  <option
                    key={Math.random()}
                    value={categoria.nueva_categoria}
                    className="bg-slate-200 text-black capitalize"
                  >
                    {categoria}{" "}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null}

            {/* Posición */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="ubicacion"
              >
                Ubicación dentro de la categoría
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

            {/* PRECIO */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="precio"
              >
                Precio
              </label>

              <input
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm "
                id="precio"
                type="float"
                placeholder="Sin el signo $"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="w-full mt-1 text-sm bg-red-100 border-l-4 border-red-500 text-red-700 p-2"
                role="alert"
              >
                <p className="font-bold"> Hubo un error: </p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            {/* TAGS */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="tags"
              >
                Tags
              </label>

              <textarea
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm"
                id="tags"
                type="text"
                placeholder="palabras clave para facilitar la búsqueda"
                value={formik.values.tags.toLowerCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            <input
              type="submit"
              className=" w-full h-12 rounded-full px-6 py-2 mt-8 bg-green-700 font-bold uppercase text-white hover:bg-green-800 cursor-pointer"
              value="agregar plato"
            />

            <button
              className=" w-full h-12 rounded-full px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => navigate("/")}
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

export default AddItem;
