import {searchColumns} from '../columns/column-model.js';

class HeaderBar extends HTMLElement {
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
                display: inline-block;
            }

            input{
              margin: 0 auto;
              width: 100%;
              height: 35px;
              padding: 0 20px;
              font-size: 1rem;
              border: 1px solid #D0CFCE;
              outline: none;
              &:focus{
                border: 1px solid #008ABF;
                transition: 0.35s ease;
                color: #008ABF;
                &::-webkit-input-placeholder{
                  transition: opacity 0.45s ease; 
                  opacity: 0;
                 }
                &::-moz-placeholder {
                  transition: opacity 0.45s ease; 
                  opacity: 0;
                 }
                &:-ms-placeholder {
                 transition: opacity 0.45s ease; 
                 opacity: 0;
                 }    
               }
             }
          </style>
        <div class="wrapper">
          <input type="search" name="search" value="" placeholder="Search..."/>                  
        </div>
    `;
  }

  bindEvents() {
    const ele = this.root.querySelector("input");

    ele.onchange = this.onSearchChange;
  }

  onSearchChange(evt) {
    this.dispatchEvent(new CustomEvent('search', {
      detail: evt.target.value,
      bubbles: true,
      cancelable: false,
      composed: true
    }));
    // const cards = await searchColumns(evt.target.value);
    // console.log(cards);
  }
}

customElements.define("search-bar", HeaderBar);
