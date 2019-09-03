import { deleteCard } from "./card-model.js";
class Card extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  set card(card) {
    this.cardData = card;
    this.root.innerHTML = `
      <style>
        .wrapper {
          background-color: #ebecf0;
          padding: 0 0 5px 0;
          margin: 10px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          border-radius: 5px
        }

        h3 {
          font-size: 20px;
          padding: 10px 0;
          margin: 0;
          background-color: darkgray;
        }
          
        p{
          font-size: 12px;
          margin: 10px 0 0 0;
        }

        .button-bar {
          padding-top: 10px;
        }

        .button-bar a {
          display: inline-block;
          width: 40%;
          background-color: #555555;
          color: white;
          padding: 3px 0;
          text-decoration: none;
        }

        .button {
          border: none;
          color: white;
          padding: 16px 32px;
          text-align: center;
          font-size: 16px;
          margin: 4px 2px;
          opacity: 0.6;
          transition: 0.3s;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
        }

        .button:hover {opacity: 1}
      </style>
      <div class="wrapper">
        <h3>${this.cardData.title}</h3>
        <p>${this.cardData.description}</p>
        <div class="button-bar">
          <a class="button" id="edit-link" href="#">Edit</a>
          <a class="button" id="delete-link" href="#">Delete</a>
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const editLink = this.root.getElementById("edit-link");
    editLink.onclick = evt => {
      evt.preventDefault();
      this.editCard(this.cardData);
    };

    const deleteLink = this.root.getElementById("delete-link");
    deleteLink.onclick = evt => {
      evt.preventDefault();
      this.deleteCard(this.cardData);
    };
  }

  editCard(id) {
    this.dispatchEvent(
      new CustomEvent("edit", {
        detail: this.cardData
      })
    );
  }

  async deleteCard(id) {
    const res = confirm("Do you want to delete?");
    if (res) {
      await deleteCard(this.cardData);
      this.dispatchEvent(
        new CustomEvent("delete", {
          detail: this.cardData
        })
      );
    }
  }
}

customElements.define("card-block", Card);
