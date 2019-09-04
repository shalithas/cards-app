const url = "http://localhost:3000/cards";

/**
 * Fetch all the cards with the given columnId
 * @param int colmunId 
 * @returns {Array} List of cards
 */
export const getCards = async colmunId => {
  let res = await fetch(url);
  let cards = await res.json();
  return cards.filter(card => {
    return card.columnId === colmunId;
  });
};

/**
 * Creates a new card
 * @param {Object} card 
 * @returns {boolean} true if saved suceeded false if failed
 */
export const createCard = async card => {
  let res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(card), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

/**
 * Updates a given card
 * @param {Object} card 
 * @returns {boolean} true if saved suceeded false if failed
 */
export const updateCard = async card => {
  let res = await fetch(url + `/${card.id}`, {
    method: "PUT",
    body: JSON.stringify(card), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

/**
 * Deletes a given card
 * @param {Object} card 
 * @returns {boolean} true if saved suceeded false if failed
 */
export const deleteCard = async card => {
  let res = await fetch(url + `/${card.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.status >= 201 && res.status < 300;
};

/**
 * Searches for a card that includes the given text
 * @param {string} text Search text 
 * @returns {Array} array of filtered cards
 */
export const searchCards = async text => {
  let res = await fetch(url);
  let cards = await res.json();
  return cards.filter(card => {
    const titleSearch = card.title.toLowerCase().search(text.toLowerCase());
    const descriptionSearch = card.description ? card.description.toLowerCase().search(text.toLowerCase()) : -1;
    return titleSearch > -1 || descriptionSearch > -1;
  });
};
