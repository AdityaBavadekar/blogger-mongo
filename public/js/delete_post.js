const deleteButton = document.getElementsByClassName('delete-post-btn')

Array.from(deleteButton).forEach(b => {
    b.addEventListener('click', () => {
        const id = b.getAttribute('name');
        console.log(id);
        fetch(`/api/post/${id}`, {
            method: 'DELETE'
        })
        .then(res=>{
            if (res.status == 200){
                alert("Post deleted");
                window.location.href = "/";
            }else{
                alert("Failed to delete the post!");
            }
        })
    })
})