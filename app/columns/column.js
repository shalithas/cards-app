import "../cards/card.js";
import "../cards/card-form.js";
import { getCards } from "../cards/card-model.js";

class Column extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  set column(column) {
    this.columnData = column;
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
                <a id="edit-link" href="#">Edit</a>
                <h2>${column.title}</h2>
                <div class="content">
                </div>
              </div>
          `;

    this.renderCards();
    this.bindEvents();
  }

  bindEvents(){
    const editLink = this.root.querySelector("div a");
    editLink.onclick = evt => {
      evt.preventDefault();
      this.editColumn(this.columnData);
    };
  }

  async renderCards() {
    const cards = await getCards(this.columnData.id);
    const wrapper = this.root.querySelector("div div");
    wrapper.innerHTML = "";
    cards.forEach(card => {
      const cardEle = document.createElement("card-block");
      cardEle.card = card;
      cardEle.addEventListener("edit", evt => {
        this.addCardBlock.setCardData(evt.detail);
      });
      wrapper.appendChild(cardEle);
    });
    this.addCardBlock = document.createElement("card-form");
    this.addCardBlock.columnId = this.columnData.id;
    this.addCardBlock.addEventListener("save", evt => {
      this.onCardSave(evt);
    });

    wrapper.appendChild(this.addCardBlock);
  }

  onCardSave(evt) {
    this.renderCards();
  }

  editColumn(col){
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.columnData
    }));
  }
}

customElements.define("column-block", Column);
