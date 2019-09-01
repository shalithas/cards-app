class Card extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  set card(card) {
    this.cardData = card;
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
                <a id="edit-link" href="#">Edit</a>
                <h3>${this.cardData.title}</h3>
                <p>${this.cardData.description}</p>
              </div>
          `;
          this.bindEvents();
        
  }

  bindEvents(){
    const editLink = this.root.querySelector("div a");
    editLink.onclick = evt => {
      evt.preventDefault();
      this.editCard(this.cardData);
    };
  }

  editCard(id){
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.cardData
    }));
  }
}

customElements.define("card-block", Card);
