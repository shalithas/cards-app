import { createColumn } from "../../api/column-model.js";

class ColumnForm extends HTMLElement {
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
              div.wrapper {
                  float: left;
                  width: 100%;
                  background-color: #ebecf0;
                    padding: 0 0 5px 0;
                    margin: 10px;
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
          <h2>Add Column</h2>
          <form>
            <div><input name="title" placeholder="title" /></div>
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

  async onSave(form) {
    const column = {
      title: form.get("title")
    };
    console.log(column);

    createColumn(column);

    await this.renderComplete;
    this.dispatchEvent(new CustomEvent("save", { detail: column }));
  }
}

customElements.define("column-form", ColumnForm);
