import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const content = document.getElementById('post-content');
content.innerHTML = marked.parse(content.innerText);

document.getElementById('copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href.toString());
    alert("Copied to clipboard")
})