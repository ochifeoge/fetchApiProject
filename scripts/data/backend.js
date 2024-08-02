
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
     const loader = document.getElementById('loader');
     loader.classList.add('hidden');
 
    
     let matchingBackendPost = newBackendComment.find(post => post.name === postId);
         let html;
     
             if (matchingBackendPost) {
                 html = `
                     <h3 class="pb-2">Comment by ${matchingBackendPost.name} <div class="d-flex"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div></h3>
                <h1 class="pb-1">${matchingBackendPost.body}</h1>
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