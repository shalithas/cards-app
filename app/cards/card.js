import {deleteCard} from './card-model.js';
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
                <a id="delete-link" href="#">Delete</a>
                <h3>${this.cardData.title}</h3>
                <p>${this.cardData.description}</p>
              </div>
          `;
          this.bindEvents();
        
  }

  bindEvents(){
    const editLink = this.root.getElementById('edit-link');
    editLink.onclick = evt => {
      evt.preventDefault();
      this.editCard(this.cardData);
    };

    const deleteLink = this.root.getElementById("delete-link");
    deleteLink.onclick = evt => {
      evt.preventDefault();
      this.deleteCard(this.cardData);
    };
  }

  editCard(id){
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.cardData
    }));
  }

  async deleteCard(id){
    const res = confirm("Do you want to delete?");
    if(res){
      await deleteCard(this.cardData);
      this.dispatchEvent(new CustomEvent('delete', {
        detail: this.cardData
      }));
    }
  }
}

customElements.define("card-block", Card);
