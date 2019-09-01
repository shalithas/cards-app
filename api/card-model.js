import { getData } from "./api.js";

let {cards} = getData();

export const getCards = (colmunId) => {
    return cards.filter(card => {
        return card.columnId === colmunId;
    });
}

export const createCard = (card) => {
    cards = [...cards, card];
}