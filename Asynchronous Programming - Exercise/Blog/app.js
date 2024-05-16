function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostsBtn = document.getElementById('btnViewPost');
    const postsField = document.getElementById('posts');
    const postTitleField = document.getElementById('post-title');
    const postBodyField = document.getElementById('post-body');
    const postCommentsField = document.getElementById('post-comments');
    const postsInfo = [];

    loadPostsBtn.addEventListener('click', loadingPosts);
    viewPostsBtn.addEventListener('click', showPostDetails);

    async function loadingPosts() {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        postsField.replaceChildren();

        const response = await fetch(url);
        const data = await response.json();

        for (const post in data) {
            let id = post;
            let body = data[post].body;
            let title = data[post].title;
            postsInfo.push({
                id,
                body,
                title
            });

            let createOption = document.createElement("option");
            createOption.textContent = title;
            createOption.value = id;
            postsField.appendChild(createOption);
        }
    }

    async function showPostDetails() {
        const url = 'http://localhost:3030/jsonstore/blog/comments';
        postCommentsField.replaceChildren();
        const response = await fetch(url);
        const data = await response.json();
        
        let selectedValue = postsField.value;
        let currentPost = postsInfo.find((post) => post.id == selectedValue);

        postTitleField.textContent = currentPost.title;
        postBodyField.textContent = currentPost.body;

        for (const commentId in data) {
            let postId = data[commentId].postId;

            if (postId == selectedValue) {
                let comment = data[commentId].text;
                let li = document.createElement("li");
                li.id = commentId;
                li.textContent = comment;
                postCommentsField.appendChild(li);
            }
        }
    }
}

attachEvents();