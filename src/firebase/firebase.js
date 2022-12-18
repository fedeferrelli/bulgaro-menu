import { app } from "./firebaseInitialize";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(app);
export const storage = getStorage(app);

// Get a list of platos from the database
export async function getDishes() {
  const dishes = collection(db, "platos");
  const dishesSnapshot = await getDocs(dishes);
  const dishesList = dishesSnapshot.docs.map((doc) => doc.data());
  return dishesList;
}

export async function getCategories() {
  const categories = collection(db, "categorias");
  const categoriesSnapshot = await getDocs(categories);
  const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());
  return categoriesList;
}

export async function setItem(item) {
  await setDoc(doc(db, "platos", item.id), item);
}

export async function uploadImage(img, id) {
  const imageRef = ref(storage, `newImages/${img.name + id}`);
  const snapshot = await uploadBytes(imageRef, img);
  const URL = await getDownloadURL(snapshot.ref);

  return URL;
}

// funcion para eliminar plato
export async function eliminarPlato(id) {
  await deleteDoc(doc(db, "platos", id));
}

// funcion para modificar stock
export async function modificarStock(id, newValue) {
  const itemRef = doc(db, "platos", id);
  console.log(newValue)

  await updateDoc(itemRef, {
    existencia: !newValue,
  });
}
