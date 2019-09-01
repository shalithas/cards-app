import { createCard } from "../api/card-model.js";

class Card extends HTMLElement {
  title = "";
  description = "";

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.render();
    this.bindEvents();
  }
  render() {
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
      <h2>Add Card</h2>
        <form>
          <div><input name="title" placeholder="title" /></div>
          <div><input name="description" placeholder="description" /></div>
          <div><input type="submit" value="save" /></div>
        </form>
      </div>
  `;
  }

  bindEvents() {
    const ele = this.root.querySelector("div form");

    ele.onsubmit = evt => {
      const form = new FormData(ele);
      evt.preventDefault();
      this.onSave(form);
    };
  }

  set columnId(id){
    this.colId = id;
  }

  async onSave(form) {
    const card = {
      title: form.get("title"),
      description: form.get("description"),
      columnId: this.colId
    };
    console.log(card);

    createCard(card);

    await this.renderComplete;
    this.dispatchEvent(new CustomEvent("save", { detail: card }));
  }
}

customElements.define("add-card-block", Card);
