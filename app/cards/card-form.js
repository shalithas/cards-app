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
            background-color: white;
            padding: 0 0 5px 0;
            margin: 10px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            border-radius: 5px
          }

          h3 {
            font-size: 20px;
            padding: 10px 0;
            margin: 0;
            background-color: #039be5;
            font-weight: normal;
            color: white;
          }
            
          form {
            margin: 10px 0 0 0;
          }

          form div {
            margin-top: 10px;
          }

          form .button {
            display: inline-block;
            width: 40%;
            padding: 10px 0;
            cursor: pointer;
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
            background-color: white;
            color: black;;
          }

          form .input {    width: 90%;
            padding: 5px;}

          form .save{border: 2px solid #008CBA;}
          form .cancel{border: 2px solid #f44336;}

          form .button:hover { color: white; }

          form .save:hover{background-color: #008CBA;}
          form .cancel:hover{background-color: #f44336;}

          .button-bar {margin-bottom: 10px;}
        </style>
      <div class="wrapper">
      <h3>${this.title}</h3>
        <form>
          <div><input class="input" name="title" placeholder="Title" value="${this.card.title}" /></div>
          <div><input class="input" name="description" placeholder="Description" value="${this.card.description}" /></div>
          <div class="button-bar">
            <input class="button save" type="submit" value="Save" /> 
            <button class="button cancel" type="button">Cancel</button>
          </div>
        </form>
      </div>
  `;
  }

  setTitle(title) {
    this.title = title;
    this.card = this.card ? this.card : { title: "" };
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
