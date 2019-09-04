import { getColumns, searchColumns } from "./columns/column-model.js";
import "./columns/column.js";
import "./columns/column-form.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  async render(columns) {
    let data = columns ? columns : await getColumns();
    this.root.innerHTML = `
      <style>
        .wrapper {
            padding: 5% 10%;
        }
      </style>
      <div class="wrapper"></div>
    `;
    const wrapper = this.root.querySelector('div');
    wrapper.innerHTML = '';
    data.forEach(col => {
      const column = document.createElement("column-block");
      column.setColumn(col, col.cards ? col.cards : null);
      column.className = 'col';
      column.addEventListener("edit", evt => {
        this.colForm.setColumnData(evt.detail);
      });
      column.addEventListener("delete", evt => {
        this.render();
      });
      wrapper.appendChild(column);
    });
    this.colForm = document.createElement('column-form');
    this.colForm.setTitle('Add Column');
    this.colForm.addEventListener("save", (evt) => {
      this.onCardSave(evt);
    });
    wrapper.appendChild(this.colForm);
  }

  onCardSave(evt){
    this.render();
  }

  async search(search){
    console.log(search);
    const columns = await searchColumns(search);
    console.log(columns);
    this.render(columns);
  }
}

customElements.define("home-page", HomePage);
