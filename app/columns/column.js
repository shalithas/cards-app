import "../cards/card.js";
import "../cards/card-form.js";
import { getCards } from "../cards/card-model.js";
import { deleteColumn } from './column-model.js';

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
      <a id="delete-link" href="#">Delete</a>
      <h2>${column.title}</h2>
      <div class="content">
      </div>
    </div>
  `;

    this.renderCards();
    this.bindEvents();
  }

  bindEvents(){
    const editLink = this.root.getElementById("edit-link");
    editLink.onclick = evt => {
      evt.preventDefault();
      this.editColumn(this.columnData);
    };

    const deleteLink = this.root.getElementById("delete-link");
    deleteLink.onclick = evt => {
      evt.preventDefault();
      this.deleteCol(this.cardData);
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
        this.cardForm.setCardData(evt.detail);
      });
      cardEle.addEventListener("delete", evt => {
        this.renderCards();
      });
      wrapper.appendChild(cardEle);
    });
    this.cardForm = document.createElement("card-form");
    this.cardForm.setTitle('Add Card');
    this.cardForm.columnId = this.columnData.id;
    this.cardForm.addEventListener("save", evt => {
      this.onCardSave(evt);
    });

    wrapper.appendChild(this.cardForm);
  }

  onCardSave(evt) {
    this.renderCards();
  }

  editColumn(col){
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.columnData
    }));
  }

  async deleteCol() {
    const res = confirm("Do you want to delete?");
    if (res) {
      await deleteColumn(this.columnData);
      this.dispatchEvent(
        new CustomEvent("delete", {
          detail: this.columnData
        })
      );
    }
  }
}

customElements.define("column-block", Column);
