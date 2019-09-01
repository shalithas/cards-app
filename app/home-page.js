import { getColumns } from "../api/column-model.js";
import "./column.js";
import "./add-column-block.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  render() {
    let data = getColumns();
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
      wrapper.appendChild(column);
    });
    const addColBlock = document.createElement('add-column-block');
    addColBlock.addEventListener("save", (evt) => {
      this.onCardSave(evt);
    });
    wrapper.appendChild(addColBlock);
  }

  onCardSave(evt){
    this.render();
  }
}

customElements.define("home-page", HomePage);
