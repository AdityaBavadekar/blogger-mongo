import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const editorTab = document.getElementById('tab-editor')
const previewTab = document.getElementById('tab-preview')
var currentTabIndex = 0;

const titleInput = document.getElementById('post-title-input')
const contentInput = document.getElementById('post-content-input')

const editorTabButton = document.getElementById('btn-tab-editor')
const previewTabButton = document.getElementById('btn-tab-preview')
// const previewContent = document.getElementById('post-preview')
const previewPostTitle = document.getElementById('post-title');
const previewPostAuthor = document.getElementById('post-author');
const previewPostDate = document.getElementById('post-date');
const previewPostContent = document.getElementById('post-content');
const previewPostThumbnail = document.getElementById('post-thumbnail');
var thumbnailUrl = ''; 

document.getElementById('btn-publish').addEventListener('click', async ()=>{
    const title = titleInput.value;
    const content = contentInput.value;

    if (!title || !content){
        alert('Title and Content are required');
        return;
    }

    fetch('/api/post/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title, content: content, thumbnail: thumbnailUrl})
    })
    .then(response => {
        if (response.status == 200) {
            console.log("Successfully published post");
            document.getElementById('btn-publish').disabled = true;
            alert('Post published successfully');
            window.location.href = '/';
            return;
        }else{
            if (response.status == 401){
                console.log("Unauthorized");
                alert('Unauthorized');
                window.location.href = "/login";
                return;
            }
            alert('Failed to publish post');
        }
    })
    .catch(err => {
        console.error('Error in publishing post', err);
        alert('Failed to publish post');
    })
})

function renderPostPreview(imgUrl, title, content, author, date){
    previewPostTitle.innerText = title;
    // previewPostContent.innerHTML = markdown.toHTML(content);
    previewPostThumbnail.src = imgUrl;
    previewPostContent.innerHTML = marked.parse(content);
    previewPostAuthor.innerText = author;
    previewPostDate.innerText = date;
}

function switchTab(tabIndex){
    if (tabIndex == currentTabIndex) return;
    if (tabIndex == 0) {
        // Editor
        previewTab.classList.add('d-none');
        editorTab.classList.remove('d-none');
    }else{
        // Preview
        renderPostPreview(
            // Title or default will be "[Untitled]"
            thumbnailUrl,
            titleInput.value == '' ? '[Untitled]' :
            titleInput.value ,
            contentInput.value == '' ? '[No content]' : contentInput.value,
            localStorage.getItem('user').name? localStorage.getItem('user').name : 'Author',
            new Date().toDateString()
        );
        editorTab.classList.add('d-none');
        previewTab.classList.remove('d-none');
    }
    currentTabIndex = tabIndex;
}

editorTabButton.addEventListener('click', ()=>{
    editorTabButton.classList.add('active');
    previewTabButton.classList.remove('active');
    switchTab(0);
})

previewTabButton.addEventListener('click', ()=>{
    editorTabButton.classList.remove('active');
    previewTabButton.classList.add('active');
    switchTab(10);
})


document.getElementById('post-thumbnail-url').addEventListener('input', (event)=>{
    thumbnailUrl = event.target.value;
    document.getElementById('thumbnail-img').src = thumbnailUrl;
})