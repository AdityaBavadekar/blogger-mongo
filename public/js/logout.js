document.getElementById('btn-logout').addEventListener('click', ()=>{
    fetch('/api/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status == 200){
            localStorage.clear();
            console.log("Successfully logged out");
            alert('Successfully logged out');
            window.location.href = '/login';
            return;
        }else{
            console.log("Failed to logout");
            alert('Failed to logout');
        }
    })
    .catch(err => {
        console.error('Error in logging out', err);
        alert('Failed to logout');
    })
})