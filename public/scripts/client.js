/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // loadTweets();
  
  // read all tweets

  const renderTweets = function (tweets) {
    for (let i = 0; i < tweets.length; i++) {
      $("#view-tweet").append(createTweetElement(tweets[i]));
    }
  };

  // read one tweet

  const createTweetElement = function (tweetData) {
    const $tweet = $(`
    <article id="view-tweet">
    <div class="content">
    <div class="tweet-header">
      <img src="${tweetData["user"]["avatars"]}" />
      <h3>${tweetData["user"]["name"]}</h3>
      <h4 id= "hide">${tweetData["user"]["handle"]}</h4>
    </div>
    <div>
    ${tweetData["content"]["text"]}
    </div>
    <hr />
    <div class="tweet-footer">
      <h3>${tweetData["created_at"]}</h3>
      <h4>logos</h4>
    </div>
  </div>
  </article>
   `);
    return $tweet;
  };

  // send data to server

  $("#postTweet").submit(function (event) {
    event.preventDefault();

    var text = $("#tweet-text").val();

    if (text === null || text === "") {
      $("#error").html("Tweet can not be empty");
    } else if (text.length > 140) {
      $("#error").html("Too long please respect arbitrary character of 140");
    } else {
      var form = $(this);
      var url = form.attr("action");

      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
          loadTweets(data);
        },
      });
    }
  });

  // load tweet from the server

  const loadTweets = function () {
    let $tweets;
    $.ajax(" http://localhost:8080/tweets", { method: "GET" }).then(function (
      tweets
    ) {
      renderTweets(tweets);
    });

    return $tweets;
  };
});
