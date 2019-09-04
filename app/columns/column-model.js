import {searchCards} from '../cards/card-model.js';

const url = "http://localhost:3000/columns";

/**
 * fetch all coulumns
 * @returns {Array} list of collumns
 */
export const getColumns = async () => {
  let res = await fetch(url);
  return await res.json();
};

/**
 * Creates a new column
 * @param {Object} column Column to be created 
 * @returns {boolean} true if suceeded false if failed
 */
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

/**
 * Updates the given column
 * @param {Object} column Column to be updated 
 * @returns {boolean} true if false if failed
 */
export const updateColumn = async column => {
  let res = await fetch(url + `/${column.id}`, {
    method: "PUT",
    body: JSON.stringify(column),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};


/**
 * Deletes the given column
 * @param {Object} column Column to be deleted 
 * @returns {boolean} true if suceeded false if failed
 */
export const deleteColumn = async column => {
  let res = await fetch(url + `/${column.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

/**
 * Searches for a column that includes the given text and combine the cards that includes the same text
 * @param {string} text Search text 
 * @returns {Array} array of filtered Columns and Cards
 */
export const searchColumns = async text => {
  let res = await fetch(url);
  let cols = await res.json();
  const filteredCols = cols.filter(col => {
    const titleSearch = col.title.toLowerCase().search(text.toLowerCase());
    return titleSearch > -1;
  });
  let cards = await searchCards(text);
  let filteredColumnsWithCards = cols.filter(col => {
    const filteredCards = cards.filter(card => {
      return card.columnId === col.id

    });
    col.cards = filteredCards;
    return filteredCards.length > 0;
  });
  return mergeColumns(filteredCols, filteredColumnsWithCards);
};

/**
 * Merging two column arrays
 * @param {Array} colSet1 Column array1 to be merged
 * @param {Array} colSet2 Column array2 to be merged
 * @return {Array} merged column array
 */
export const mergeColumns = (colSet1, colSet2) => {
  let output = {};
  colSet1.forEach(col => {
    output[col.id] = col;
  });
  colSet2.forEach(col => {
    output[col.id] = col;
  });

  return Object.values(output);
}
