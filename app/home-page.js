
class HomePage extends HTMLElement {
    render(){
        console.log("test");
        this.innerHTML = `
            <h1>Home</h1>
        `;
    }
}

customElements.define('home-page', HomePage);