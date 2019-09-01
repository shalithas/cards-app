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
                        display: inline;
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
    console.log(evt.target.value);
  }
}

customElements.define("search-bar", HeaderBar);
