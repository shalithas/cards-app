const url = "http://localhost:3000/columns";

export const getColumns = async () => {
  let res = await fetch(url);
  return await res.json();
};

export const createColumn = async column => {
  let res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(column), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

export const updateColumn = async column => {
  let res = await fetch(url + `/${column.id}`, {
    method: "PUT",
    body: JSON.stringify(column), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

export const deleteColumn = async column => {
  let res = await fetch(url + `/${column.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};
