$(document).ready( () => {

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/* takes a tweet obj and returns a tweet article element
   contains full HTML structure of tweet
*/
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function(tweets) {
    // loops through tweets
    $("#tweets-container").html("");

    for (let tweet of tweets) {
      // console.log("twt", tweet);
      const $tweet = createTweetElement(tweet)
      $("#tweets-container").prepend($tweet)
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

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
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </div></article>`
    return $tweet;
  }

  // renderTweets(data);

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
    // console.log('serialData :', $(this));

    const input = $("textarea");
    if (input.val().length > 140) {
      return $("#error").text("Please input no more than 140 characters").fadeIn(100).fadeOut(5000)
    }

    if (input.val().length <= 0) {
      return $("#error").text("Please enter text before submitting").fadeIn(100).fadeOut(5000)
    }

    this.reset();
    $("output.counter").text(140)

    console.log("form submitted")

    $.post("/tweets/", serialData, () => {
    loadTweets();
    })
  })



})

