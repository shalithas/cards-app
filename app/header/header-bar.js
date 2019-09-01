import "./search-bar.js";

class HeaderBar extends HTMLElement {
    constructor() {
      super();
  
      this.root = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.root.innerHTML = `
                  <style>
                      div.wrapper {
                          postion: abosolute;
                          background: rgba(0,0,0,.15);
                          left: 0;
                          top:0;
                          margin: 0;
                          color: white;
                          padding-left: 20px;
                      }

                      h1 {
                          font-size: 18px;
                          display: inline;
                      }
                  </style>
                <div class="wrapper">
                  <h1>Cards App</h1>

                  <search-bar />
                  
                </div>
            `;
    }
  }
  
  customElements.define("header-bar", HeaderBar);
  