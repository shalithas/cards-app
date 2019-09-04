import "../cards/card.js";
import "../cards/card-form.js";
import { getCards } from "../cards/card-model.js";
import { deleteColumn } from './column-model.js';

/**
 * Represents a column in the app
 */
class Column extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  /**
   * Renders the Column structure for the given column
   * @param {Object} column Column object to be set 
   * @param {Array} cards optional array of cards to be set 
   */
  setColumn(column, cards) {
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
        }

        

        #column-header {
          margin: 10px;
          position: relative;
          background-color: #white;
          color: #2196f3;
          border: 2px solid #03a9f4;
        }

        #column-header h2 {
          margin: 0;
          font-weight: normal;
        }

        #column-header .button {
          display: block;
          background-color: #03a9f4;
          color: white;
          width: 50px;
          padding: 6px 0;
          position: absolute;
          text-decoration: none;
        }

        #column-header .button:hover {
          width: 80px;
          -webkit-transition: width 0.5s;
          transition: width 0.5s;
        }

        #column-header #edit-link {
          left: 0;
        }

        #column-header #delete-link {
          right: 0;
        }
    </style>
    <div id="wrapper" class="wrapper">
      <div id="column-header">
        <a id="edit-link" class="button" href="#">Edit</a>
        <a id="delete-link" class="button" href="#">Delete</a>
        <h2>${column.title}</h2>
      </div>
      <div class="content" id="content" >
      </div>
    </div>
  `;

    this.renderCards(cards ? cards: null);
    this.bindEvents();
  }

  /**
   * Bindes the events for the elements in the class
   */
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

  /**
   * Renders the set of given cards
   * @param {Array} cardData List of cards to be rendered
   */
  async renderCards(cardData) {
    const cards = cardData ? cardData : await getCards(this.columnData.id);
    const wrapper = this.root.getElementById("content");

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

  /**
   * handles the card save event
   */
  onCardSave() {
    this.renderCards();
  }

  /**
   * Handles the edit button click event
   */
  editColumn(){
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.columnData
    }));
  }

  /**
   * Handles the delete button click event
   */
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
