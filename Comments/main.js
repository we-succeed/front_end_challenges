const container = document.querySelector(".container");

fetch("https://jsonplaceholder.typicode.com/comments")
  .then(res => res.json())
  .then(res => {
    console.log(res)
    const {postId, id, name, email, body} = res[0];
    // const box = document.createElement("div");
    // for (let i = 0; i < 20; i ++) {

    // }
    //   [{
      // "postId": 1,
      // "id": 1,
      // "name": "id labore ex et quam laborum",
      // "email": "Eliseo@gardner.biz",
      // "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    // },....]
  })
  .catch(err => console.error(err));