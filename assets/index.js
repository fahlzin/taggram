var currentUserAvatar = "";

(function (apiUrl) {
  function getMe() {
    return fetch(apiUrl + "/me")
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        const $username = document.getElementById("current-user-username");
        const $avatar = document.getElementById("current-user-avatar");

        $username.innerHTML = user.username;

        if (user.avatar) {
          currentUserAvatar = user.avatar;
          $avatar.style.backgroundImage = "url('" + user.avatar + "')";
        } else {
          $avatar.style.backgroundImage =
            "url('https://i2.wp.com/uberinsta.com/images/default_avatar.jpg')";
        }
      });
  }

  function getPost() {
    return fetch(apiUrl + "/post")
      .then(function (response) {
        return response.json();
      })
      .then(function (post) {
        const $username = document.getElementById("author_name");
        const $avatar = document.getElementById("author_avatar");
        const $location = document.getElementById("author_location");
        const $image = document.getElementById("post-image");

        $username.innerHTML = post.user.username;
        $location.innerHTML = post.location.city + ", " + post.location.country;

        if (post.photo) {
          $image.style.backgroundImage = "url('" + post.photo + "')";
        } else {
          $image.style.backgroundImage =
            "url('https://www.level10martialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg')";
        }

        if (post.user.avatar) {
          $avatar.style.backgroundImage = "url('" + post.user.avatar + "')";
        } else {
          $avatar.style.backgroundImage =
            "url ('https://i2.wp.com/uberinsta.com/images/default_avatar.jpg')";
        }

        const $quantity = document.getElementById("quantity");
        $quantity.innerHTML = post.comments.length + " comments";

        post.comments.forEach(function (comment) {
          const avatar =
            comment.user.avatar ||
            "https://i2.wp.com/uberinsta.com/images/default_avatar.jpg";
          newComment(avatar, comment.user.username, comment.message);
        });
      });
  }

  function initialize() {
    getMe();
    getPost();
  }

  initialize();
})("https://taggram.herokuapp.com");

function newComment(avatar, username, message) {
  const $comments = document.getElementById("comments_container");
  const $newComment = document.createElement("section");
  $newComment.classList.add("user_comment");
  const $comment = `
    <div class="avatar" id="avatar"><img src="${avatar}"/></div>
    <div class="comment_container" id="comment_container">
      <div class="username" id="comment_user">${username}</div>
      <div class="comment" id="comment_content">${message}</div>
      <div class="hour"><span class="time"></span></div>
    </div>
  `;
  $newComment.innerHTML = $comment;
  $comments.appendChild($newComment);
}

function sendMessage() {
  const avatar =
    currentUserAvatar ||
    "https://i2.wp.com/uberinsta.com/images/default_avatar.jpg";
  const username = document.getElementById("current-user-username").innerText;
  var message = document.getElementById("message").value;
  if (message) {
    newComment(avatar, username, message);
  }
  document.getElementById("message").value = "";
}
