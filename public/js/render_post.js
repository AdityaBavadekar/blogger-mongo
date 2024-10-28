import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const content = document.getElementById('post-content');
content.innerHTML = marked.parse(content.innerText);