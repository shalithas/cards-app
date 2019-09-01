import { createColumn, updateColumn } from "../../api/column-model.js";

class ColumnForm extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.render();
  }

  setTitle(title) {
    this.title = title;
    this.activeColumn = this.activeColumn ? this.activeColumn : { title: "" };
    this.render();
  }

  render() {
    // this.activeColumn = this.activeColumn ? this.activeColumn : { title: "" };
    // this.title = "Add Column";

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
          <h2>${this.title}</h2>
          <form>
            <div><input name="title" placeholder="title" value="${
              this.activeColumn ? this.activeColumn.title : ""
            }" /></div>
            <div><input type="submit" value="save" /></div>
          </form>
        </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const ele = this.root.querySelector("div form");

    ele.onsubmit = evt => {
      const form = new FormData(ele);
      evt.preventDefault();
      this.onSave(form);
    };
  }

  onSave(form) {
    const column = {
      title: form.get("title")
    };

    if (this.activeColumn) {
      column.id = this.activeColumn.id;
      updateColumn(column);
    } else {
      createColumn(column);
    }

    this.dispatchEvent(new CustomEvent("save", { detail: column }));
  }

  setColumnData(col) {
    this.activeColumn = col;
    this.title = "Edit Column";
    this.render();
    this.bindEvents();
  }
}

customElements.define("column-form", ColumnForm);
