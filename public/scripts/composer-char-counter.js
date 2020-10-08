$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    var textlength = $(this).val().length;
    if (textlength > 140) {
      $("output").html(140 - textlength).css('color', 'red');
    } else {
      $("output").html(140 - textlength);
    }
  });
});
