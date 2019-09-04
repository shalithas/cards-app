import { createColumn, updateColumn } from "./column-model.js";

/**
 * Represents a Column Form that is used for both Creating and Editing columns
 */
class ColumnForm extends HTMLElement {

  /**
   * Creates a new instance of ColumnForm
   */
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.render();

    //Form is only shown after clicking on the show form button
    this.isFormVisible = false;
  }

  /**
   * Sets the title of the form tile
   * @param {string} title 
   */
  setTitle(title) {
    this.title = title;
    this.activeColumn = this.activeColumn ? this.activeColumn : { title: "" };
    this.render();
  }

  /**
   * Renders the HTML structure of the form
   */
  render() {
    this.root.innerHTML = `
      <style>
          div.wrapper {
            float: left;
            width: 100%;
            background-color: white;
            padding: 0;
            margin: 10px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            border-radius: 5px
          }

          .wrapper h3 {
            font-size: 20px;
            padding: 10px 0;
            margin: 0;
            background-color: #039be5;
            font-weight: normal;
            color: white;
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

        #show-form {
          background-color: #white;
          color: #2196f3;
          border: 2px solid #03a9f4;
          display: block;
          width: 100%;
          text-decoration: none;
          padding: 5px 0;
        }

        #show-form:hover {
          background-color: #2196f3;
          color: white;
          border: 2px solid #03a9f4;
          display: block;
          width: 100%;
          text-decoration: none;
          padding: 5px 0;
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

        form .input {    width: 90%;
          padding: 5px;}
      </style>
      ${
        this.isFormVisible === false ? 
        `<div class="wrapper">
          <a id="show-form" href="#">Add Column</a>
        </div>`
          : 
        `<div class="wrapper">
          <h3>${this.title}</h3>
          <form>
            <div><input class="input" name="title" placeholder="Title" value="${
              this.activeColumn ? this.activeColumn.title : ""
            }" /></div>
            <div class="button-bar">
            <input class="button save" type="submit" value="Save" /> 
            <button class="button cancel" type="button">Cancel</button>
          </div>
          </form>
        </div>`
      }
    `;
    this.bindEvents();
  }

  /**
   * Binds the events of the element in the component
   */
  bindEvents() {
    const form = this.root.querySelector("div form");

    // Handling the form submit event
    if(form){
      form.onsubmit = evt => {
        const formData = new FormData(form);
        evt.preventDefault();
        this.onSave(formData);
      };
    }

    // Handling the click on the showForm button
    const showFormButton = this.root.getElementById("show-form");
    if(showFormButton){
      showFormButton.onclick = evt => {
        evt.preventDefault();
        this.toggleForm();
      };
    }

    //handling the cancel button click
    const cancelButton = this.root.querySelector("form div button");
    if(cancelButton){
      cancelButton.onclick = evt => {
        evt.preventDefault();
        this.title = "Add Column";
        this.activeColumn = {
          title: "",
        };
        this.toggleForm();
        this.render();
      };
    }
  }

  /**
   * Showing and Hiding of the Form/ShowFormButton
   */
  toggleForm(){
    this.isFormVisible = !this.isFormVisible;
    this.render();
  }

  /**
   * Handles saving of the column  
   * @param {FormData} form Form data
   */
  async onSave(form) {
    const column = {
      title: form.get("title")
    };

    if (this.activeColumn.id) {
      column.id = this.activeColumn.id;
      await updateColumn(column);
    } else {
      await createColumn(column);
    }

    this.dispatchEvent(new CustomEvent("save", { detail: column }));
  }

  /**
   * Used to set the column for Editing
   * @param {Object} col Column object to be edited
   */
  setColumnData(col) {
    this.activeColumn = col;
    this.title = "Edit Column";
    this.toggleForm();
    this.render();
    this.bindEvents();
  }
}

customElements.define("column-form", ColumnForm);
