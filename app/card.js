class Card extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  set card(card) {
    this.root.innerHTML = `
                <style>
                  .wrapper {
                    
                    background-color: #ebecf0;
                  }
                    
                  p{
                    font-size: 12px;
                  }
                </style>
              <div class="wrapper">
                <p>
                ${card.description}
                </p>
              </div>
          `;
  }
}

customElements.define("card-block", Card);
