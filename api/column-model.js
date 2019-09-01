import { getData } from "./api.js";

export const getColumns = () => {
    const data = getData();

    return data.columns;
}