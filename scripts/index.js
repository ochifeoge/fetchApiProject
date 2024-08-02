import { addnewComment } from "./data/backend.js";


    async function loadPage(fun) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
        
        const namesArray = await response.json();
        console.log(namesArray);
      

       await fun(namesArray);
    }
    loadPage(generateNames);

    function generateNames (namesArray) {
        let html = '';
        namesArray.forEach((name) => {

            html += `
                 <div class="each-users">
                <a href="post.html?id=${name.id}"><h3>${name.name}</h3></a>
            </div>
            `

        });
        document.querySelector('.js-top-users').innerHTML = html;
    }



    document.querySelector('.js-post-btn').addEventListener('click', async(e) => {

        e.preventDefault();

    // Get the latest values from the input fields when the button is clicked
        const userName = document.querySelector('.js-comment-name').value;
        const userMail = document.querySelector('.js-comment-email').value;
        const userMessage = document.querySelector('.js-comment-body').value;
        try {
             const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                  id: 101,
                  name: `${userName}`,
                  email: `${userMail}`,
                  body: `${userMessage}`,
                  userId: 1,
                }),
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            const newAddedComment = await response.json();
            addnewComment(newAddedComment);

            document.querySelector('.js-top-users').innerHTML += `
                 <div class="each-users">
                <a href="backend.html?id=${newAddedComment.name}"><h3>${newAddedComment.name}</h3></a>
            </div>
            `;
            // Set the success message and clear it after 2 seconds
        const timeoutMessageElement = document.querySelector('.js-timout-message');
        timeoutMessageElement.innerText = 'Comment added successfully';
        setTimeout(() => {
            timeoutMessageElement.innerText = ''; // Clear the message
        }, 2000);           

              // Clear input fields after successful submission
        document.querySelector('.js-comment-name').value = '';
        document.querySelector('.js-comment-email').value = '';
        document.querySelector('.js-comment-body').value = '';
           
        } catch (error) {
            alert('Try again later');
        }
    })