/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


   // convert time from millisecond

   const convertTime = function(time) {
    let temp;
    if (time) {
      const timeMin = Math.floor((Date.now() - Number(time)) / 60000);
      if (timeMin < 1) {
        return 'now';
      } else if (timeMin === 1) {
        return '1 minute ago';
      } else if ( timeMin > 1 & timeMin < 60) {
        return `${timeMin} minutes ago`;
      } else if (timeMin >= 60 & timeMin < 1440) {
        temp = Math.floor(timeMin / 60);
        return `${temp} hours ago`;
      } else {
        temp = Math.floor(timeMin / 1440);
        if (temp === 1) {
          return `one day ago`;
        } else if (temp < 30 ) {
          return `${temp} days ago`;
        } else {
          temp = Math.floor(temp / 365);
          if (temp === 1) {
            return `one year ago`;
          } else {
            return `${temp} years ago`;
            }
            
          }
      }
  
    } else {
      return '';
    }
  };
    
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
      <h3>${convertTime(tweetData["created_at"])}</h3>
      <h4>logos</h4>
    </div>
  </div>
  </article>
   `);
    return $tweet;
  };


  // load tweet from the server

  const loadTweets = function () {
    let $tweets;
    $.ajax(" http://localhost:8080/tweets", { method: "GET", dataType: 'JSON'}).then(function (
      tweets
    ) {
      renderTweets(tweets);
    });

    return $tweets;
  };


$(document).ready(function () {
  loadTweets();






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

});
