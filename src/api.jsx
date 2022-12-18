import {getDishes, getCategories} from "./firebase/firebase";

export const fetchData = {
    fetchMenuData: async () => {
        const response = await getDishes();
        return response;
      },

      fetchCategories: async () => {
        const response = await getCategories();
        return response;
      }
};


