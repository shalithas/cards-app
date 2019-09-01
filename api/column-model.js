import { getData } from "./api.js";

var { columns } = getData();

export const getColumns = () => {
  return columns;
};

export const createColumn = col => {
  col.id = columns.length + 1;
  columns = [...columns, col];
};

export const updateColumn = col => {
  columns = columns.filter(c => {
    return c.id !== col.id;
  });
  columns = [...columns, col];
};
