import React, { useState, useEffect } from "react";

import { fetchData } from "../../api";

import { useFormik } from "formik";
import * as Yup from "yup";

import { modificarCategoria } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import Loading from "../Loading";

const ModificarCat = ({ id, categoria, ubicacion, setShowModificarCat }) => {
  



  // validacion y leer datos de formulario

  const formik = useFormik({
    initialValues: {
      
      ubicacion: ubicacion,
      
    },

    validationSchema: Yup.object({
    

      ubicacion: Yup.number()
        .min(1, "Debes ingresar un numero")
        .required("La ubicacion es obligatoria"),

    }),

    onSubmit: (plato) => {
      try {
        

          uploadData(id, plato);
          formik.resetForm();
        
      } catch (error) {
        console.log(error);
      }
    },
  });

  const uploadData = async (id, data) => {
    await modificarCategoria(id, data);
    setShowModificarCat(false);
  };

  // Todo sobre las imagenes


  // hook para redirecionar
  const navigate = useNavigate();

  return (
    <section className="bg-main relative">
      
      <h1 className="font-bold px-8 pt-6 w-full text-center text-text tracking-wider text-xl">
        <span className="text-2xl block uppercase text-white">
          {" "}
          Modificar Categoria
        </span>
      </h1>

      <div className="flex justify-center py-12">
        <div className=" w-full max-w-2xl">
          <form
            className="w-full px-4 flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            

            {/* Categoria */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="plato"
              >
                Categoría
              </label>

              <div
                className="w-full bg-gray-100 text-black border border-gray-400 outline-none  focus:border-violet-800 focus:shadow-md ease-in-out duration-300  px-3 py-2 rounded-sm capitalize"
                
              >{categoria}</div>
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

           
            {/* Posición */}
            <div className="mt-6 w-full text-gray-500 focus-within:text-violet-700">
              <label
                className="w-full font-bold ease-in-out duration-300 text-gray-100 tracking-wider"
                htmlFor="ubicacion"
              >
                Ubicación de de la categoría
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
              value="modificar plato"
            />

            <button
              className=" w-full h-12 rounded-full px-6 py-2 mt-4 bg-red-700 font-bold uppercase text-white hover:bg-red-800 cursor-pointer"
              onClick={() => setShowModificarCat(false)}
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

export default ModificarCat;
