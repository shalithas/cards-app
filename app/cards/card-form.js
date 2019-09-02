import { createCard, updateCard } from "./card-model.js";

class CardForm extends HTMLElement {

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.render();
    this.bindEvents();
  }
  render() {
    this.card = this.card
      ? this.card
      : {
          title: "",
          description: ""
        };
    this.root.innerHTML = `
        <style>
          .wrapper {
            background-color: #ebecf0;
            padding: 0 0 5px 0;
            margin: 10px;
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
        </style>
      <div class="wrapper">
      <h2>${this.title}</h2>
        <form>
          <div><input name="title" placeholder="title" value="${this.card.title}" /></div>
          <div><input name="description" placeholder="description" value="${this.card.description}" /></div>
          <div><input type="submit" value="save" /> <button type="button">Cancel</button></div>
        </form>
      </div>
  `;
  }

  setTitle(title) {
    this.title = title;
    this.activeColumn = this.activeColumn ? this.activeColumn : { title: "" };
    this.render();
  }

  setCardData(card) {
    this.card = card;
    this.title = "Edit Card";
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const form = this.root.querySelector("div form");

    form.onsubmit = evt => {
      evt.preventDefault();
      const form = new FormData(this.root.querySelector("div form"));
      this.onSave(form);
    };

    const cancelButton = form.querySelector("div button");
    cancelButton.onclick = evt => {
      evt.preventDefault();
      this.title = "Add Card";
      this.card = {
        title: "",
        description: ""
      };
      this.render();
    };
  }

  set columnId(id) {
    this.colId = id;
  }

  async onSave(form) {
    const card = {
      title: form.get("title"),
      description: form.get("description"),
      columnId: this.colId
    };

    if (this.card.id) {
      card.id = this.card.id;
      await updateCard(card);
    } else {
      await createCard(card);
    }

    this.dispatchEvent(new CustomEvent("save", { detail: card }));
  }
}

customElements.define("card-form", CardForm);
