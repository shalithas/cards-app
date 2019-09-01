import { getColumns } from "./columns/column-model.js";
import "./columns/column.js";
import "./columns/column-form.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  async render() {
    let data = await getColumns();
    this.root.innerHTML = `
            <style>
                
            .col:nth-child(3n - 2) {
                background-color: #26bbf0;
            }
            .col:parent:nth-child(3n) {
                background-color: #11a3d7;
            }

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
      column.column = col;
      column.className = 'col';
      column.addEventListener("edit", evt => {
        this.colForm.setColumnData(evt.detail);
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
}

customElements.define("home-page", HomePage);
