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
                    padding: 0 0 5px 0;
                    margin: 10px;
                  }

                  h3 {
                    font-size: 20px;
                    padding: 10px 0;
                    margin: 0;
                    background-color: darkgray;
                  }
                    
                  p{
                    font-size: 12px;
                    margin: 10px 0 0 0;
                  }
                </style>
              <div class="wrapper">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
              </div>
          `;
  }
}

customElements.define("card-block", Card);
