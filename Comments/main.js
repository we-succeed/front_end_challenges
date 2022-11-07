

const parentContainer = document.querySelector(".comments_container");

fetch("https://jsonplaceholder.typicode.com/comments")
  .then(res => res.json())
  .then(res => {
    res.forEach((comment, index) => {
      const { postId, id, name, email, body } = comment;
      const commentContainer = document.createElement("div");
      index < 10 ? (
        commentContainer.classList.add("comment_container")  
      ) : (
        commentContainer.classList.add("comment_container","hide")
      )
      // commentContainer.classList.add(index < 10 ? "comment_container hide" : "comment_container");
      const commentId = document.createElement("div");
      commentId.classList.add("postId");
      commentId.innerHTML = `
        <label for="postId">postId:</label>
        ${id}
      `
      commentContainer.appendChild(commentId);
      const commentInfoBox = document.createElement("div");
      commentInfoBox.classList.add("comment_infoBox");

      const user = document.createElement("div");
      user.classList.add("user");
      commentInfoBox.appendChild(user);

      const postedBy = document.createElement("div");
      postedBy.classList.add("posted_by");
      postedBy.textContent = "Post By_"
      user.appendChild(postedBy)

      const username = document.createElement("span");
      username.classList.add("name")
      username.textContent = name
      user.appendChild(username);

      const emailLink = document.createElement("a");
      emailLink.setAttribute("href", `mailto:${email}`);
      emailLink.textContent = email
      postedBy.appendChild(emailLink)

      const commentBox = document.createElement("div");
      commentBox.classList.add("comment")
      commentBox.textContent = body;
      commentInfoBox.appendChild(commentBox)

      commentContainer.appendChild(commentInfoBox);
        parentContainer.appendChild(commentContainer);
    });
  })
  .catch(err => console.error(err));