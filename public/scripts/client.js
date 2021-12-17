// Create, Render, GET and POST tweet functions
$(document).ready( () => {

  const renderTweets = function(tweets) {
    $("#tweets-container").html("");

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // prevents cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = `<div id="margin-tweet"></div>
    <article class="tweet">
    <div class="main-tweet-container">
    <div class="tweet-header-container">
      <div class="tweet-user-container">
        <img src=${tweet.user.avatars}></img>
        <div class="username">${tweet.user.name}</div>
      </div>
        <div class="userhandler">${tweet.user.handle}</div>
    </div>
    <text name="text" class="new-tweet-text">${escape(tweet.content.text)}</text>
    <footer class="footer-tweet-container">
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="footer-icons">
        <i class="fas fa-poop"></i>
        <i class="fas fa-comment-dots"></i>
        <i class="fas fa-paw"></i>
      </div>
    </footer>
    </div>
    <div id="margin-space"></div>
    </article>`
    return $tweet;
  }

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      data: $("#submitTweet").serialize(),
      dataType: "json",
      success: (data) => {
        renderTweets(data);
      }
    });
  }
  loadTweets();

  $("#submitTweet").on("submit", function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const input = $("textarea");

    if (input.val().length > 140) {
      return $("#error").css({
        "color": "red",
        "font-family": "lemon",
        "font-size": "22px",
        "padding-bottom": "3em",
      }).text("❌ Meow? Please input no more than 140 characters!").fadeIn(100).fadeOut(5000);
    }

    if (input.val().length <= 0) {
      return $("#error").css({
        "color": "red",
        "font-family": "lemon",
        "font-size": "22px",
        "padding-bottom": "3em",
      }).text("❌ Nyaa! Text field cannot be empty!").fadeIn(100).fadeOut(5000);
    }

    this.reset();
    $("output.counter").text(140);

    $.post("/tweets/", serialData, () => {
    loadTweets();
    })
  })
})

