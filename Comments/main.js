const RELOAD_COUNT = 10;

const parentContainer = document.querySelector(".comments_container");
const loading = document.querySelector("#loading");

const showLoading = () => {
  loading.style.visibility = "visible"
}

const hideLoading = () => {
  loading.style.visibility = "hidden"
}

fetch("https://jsonplaceholder.typicode.com/comments")
  .then(res => res.json())
  .then(res => {
    res.forEach((comment, index) => {
      const { id, name, email, body } = comment;
      const commentContainer = document.createElement("div");
      index < 10 ? (
        commentContainer.classList.add("comment_container")
      ) : (
        commentContainer.classList.add("comment_container", "hide")
      );
      const commentId = document.createElement("div");
      commentId.classList.add("postId");
      commentId.innerHTML = `
        <label for="postId">postId:</label>
        ${id}
      `;
      commentContainer.appendChild(commentId);
      const commentInfoBox = document.createElement("div");
      commentInfoBox.classList.add("comment_infoBox");

      const user = document.createElement("div");
      user.classList.add("user");
      commentInfoBox.appendChild(user);

      const postedBy = document.createElement("div");
      postedBy.classList.add("posted_by");
      postedBy.textContent = "Post By_";
      user.appendChild(postedBy);

      const username = document.createElement("span");
      username.classList.add("name");
      username.textContent = name;
      user.appendChild(username);

      const emailLink = document.createElement("a");
      emailLink.setAttribute("href", `mailto:${email}`);
      emailLink.textContent = email;
      postedBy.appendChild(emailLink);

      const commentBox = document.createElement("div");
      commentBox.classList.add("comment");
      commentBox.textContent = body;
      commentInfoBox.appendChild(commentBox);

      commentContainer.appendChild(commentInfoBox);
      parentContainer.appendChild(commentContainer);
    });
  })
  .then(() => {
    /** OBSERVER */
    if ("IntersectionObserver" in window) {
      const comments = document.querySelectorAll(".comment_container");
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          const hiddenComments = document.querySelectorAll(".hide");
          if (target.nextSibling.classList == "comment_container hide") {
            showLoading()
            setTimeout(() => {
              for (let i = 0; i < RELOAD_COUNT; i ++) {
                hiddenComments[i].classList.remove("hide")
              }
              hideLoading()
            }, 1000)
          }
        });
      },
        { threshold: [0.2] }
      );

      comments.forEach(comment => observer.observe(comment));
    }

  })
  .catch(err => console.error(err));
