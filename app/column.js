import "./card.js";
import { getCards } from "../api/card-model.js";

class Column extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  set column(column) {
    console.log(column);
    this.root.innerHTML = `
                <style>
                    div.wrapper {
                        float: left;
                        width: 100%;
                    }
                  
                    /* Responsive column widths */
                    @media (min-width: 700px) {
                  
                    /* 3 */
                    div.wrapper {
                      width: 24.5%;
                    }

                    /* coloring/sizing */
                    div.wrapper {
                        box-sizing: border-box;
                        moz-box-sizing: border-box;
                        text-align: center;
                    }

                    div.content {
                        margin-left: 10px;

                    }
                  }
                </style>
              <div class="wrapper">
                <div class="content">
                    ${column.title}
                </div>
              </div>
          `;
    const cards = getCards(column.id);
    cards.forEach(card => {
      const cardEle = document.createElement("card-block");
      cardEle.card = card;
      this.root.querySelector("div div").appendChild(cardEle);
    });
  }
}

customElements.define("column-block", Column);
