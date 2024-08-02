
async function loadPage(fun) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
    
    const namesArray = await response.json();
     
    await fun(namesArray);
}

function generateComment(namesArray) {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get('id');
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');


    // posts from jsonplaceholder
    let matchingPost;
    namesArray.forEach((post) =>{
        if(+(postId) === post.id){
            matchingPost = post;
        }
       
    });
    let html;
        if (matchingPost) {
            html = `
                <h3 class="pb-2">Comment by ${matchingPost.name} <div class="d-flex"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div></h3>
                <h1 class="pb-1">${matchingPost.body}</h1>
                <h4>Reachout to user at: ${matchingPost.email}</h4>
            `;
           
        }
        else {
            html = "<p>Post not found.</p>"; 
        }
        document.querySelector('.js-post-card').innerHTML = html;
  
    ;
 
}
loadPage(generateComment);




