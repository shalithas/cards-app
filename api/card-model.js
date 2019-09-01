import { getData } from "./api.js";

export const getCards = (colmunId) => {
    const data = getData();

    return data.cards.filter(card => {
        return card.columnId === colmunId;
    });
}