import { getData } from "../api/api.js";
import "./column.js";

class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  render() {
    let data = getData();
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
    data.columns.forEach(col => {
      const column = document.createElement("column-block");
      column.column = col.title;
      column.className = 'col';
      const wrapper = this.root.querySelector('div');
      wrapper.appendChild(column);
    });
  }
}

customElements.define("home-page", HomePage);
