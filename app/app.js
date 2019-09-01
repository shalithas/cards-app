import "./home-page.js";

window.addEventListener("load", () => {
    console.log("content loaded");

    const app = document.querySelector("App");
    const ele = document.createElement('home-page');
    ele.className = 'wrapper';
    ele.render();
    app.appendChild(ele);
});