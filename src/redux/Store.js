import { configureStore} from "@reduxjs/toolkit";
import formSlice from "./formDataSlice";

export const Store = configureStore({
    reducer: formSlice
});