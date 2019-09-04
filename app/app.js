import "./home-page.js";
import "./header/header-bar.js";

window.addEventListener("load", () => {
    console.log("content loaded");

    const app = document.querySelector("App");
    const home = document.createElement('home-page');
    const header = document.createElement("header-bar");
    header.addEventListener('search', evt => {
        home.search(evt.detail);
    });
    home.className = 'wrapper';
    home.render();
    app.appendChild(header);
    app.appendChild(home);
});