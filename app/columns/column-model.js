import {searchCards} from '../cards/card-model.js';

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

export const searchColumns = async text => {
  let res = await fetch(url);
  let cols = await res.json();
  // const filteredCols = cols.filter(col => {
  //   const titleSearch = col.title.toLowerCase().search(text.toLowerCase());
  //   return titleSearch > -1;
  // });
  let cards = await searchCards(text);
  const filterdCols = cols.filter(col => {
    const filteredCards = cards.filter(card => {
      return card.columnId === col.id

    });
    col.cards = filteredCards;
    return filteredCards.length > 0;
  });
  return filterdCols;
};
