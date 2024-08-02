
const newBackendComment = JSON.parse(localStorage.getItem('comments')) || [];

export function addnewComment (newAddedComment) {
    newBackendComment.unshift(newAddedComment);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('comments', JSON.stringify(newBackendComment));
}




     // post from localstorage

     function loadPage() {
        
     const url = new URL(window.location.href);
     const postId = url.searchParams.get('id');
 
    
     let matchingBackendPost = newBackendComment.find(post => post.name === postId);
         let html;
     
             if (matchingBackendPost) {
                 html = `
                     <h3>Comment by ${matchingBackendPost.name}</h3>
                     <p>${matchingBackendPost.body}</p>
                     <h4>Reachout to user at: ${matchingBackendPost.email}</h4>
                 `;
             
             }
             else {
                 html = "<p>Post not found.</p>"; 
             }
             document.querySelector('.js-back-post-card').innerHTML = html;

    }

            document.addEventListener('DOMContentLoaded', async () =>{
               loadPage();
            })