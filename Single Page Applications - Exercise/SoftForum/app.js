import { createPost, onClose, showHome } from "./home.js";

const homeAnchorElement = document.querySelector("a");
homeAnchorElement.addEventListener('click', showHome);
const buttonElements = document.querySelectorAll("button");
const cancelButtonElement = buttonElements[0];
cancelButtonElement.addEventListener('click', onClose);

const createPostButtonElement = buttonElements[1];
console.log(createPostButtonElement);
createPostButtonElement.addEventListener('click', createPost);