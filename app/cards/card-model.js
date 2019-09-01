const url = "http://localhost:3000/cards";

export const getCards = async colmunId => {
  let res = await fetch(url);
  let cards = await res.json();
  return cards.filter(card => {
    return card.columnId === colmunId;
  });
};

export const createCard = async card => {
  let res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(card), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (res.status >= 201 && res.status < 300) {
    return true;
  } else {
    return false;
  }
};

export const updateCard = async card => {
  let res = await fetch(url + `/${card.id}`, {
    method: "PUT",
    body: JSON.stringify(card), // string or object
    headers: {
      "Content-Type": "application/json"
    }
  });
  let jsonRes = await res.json();
  console.log(res);
};

export const deleteCard = async card => {
  let res = await fetch(url + `/${card.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  let jsonRes = await res.json();
  console.log(res);
};
