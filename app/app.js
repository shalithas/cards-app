import "./home-page.js";
import "./header/header-bar.js";

window.addEventListener("load", () => {
    console.log("content loaded");

    const app = document.querySelector("App");
    const ele = document.createElement('home-page');
    const header = document.createElement("header-bar");
    ele.className = 'wrapper';
    ele.render();
    app.appendChild(header);
    app.appendChild(ele);
});