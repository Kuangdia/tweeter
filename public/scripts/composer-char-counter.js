// Counts the number of characters typed in and changes their color
$(document).ready(function() {

  $("#tweet-text").on("input", function(event) {
    const charCount = $(this).val().length;
    const count = 140 - charCount;

    $("output.counter").text(count);
    
    if (count < 0) {
      $("output.counter").css("color", "red");
    } else if (count >= 0) {
      $("output.counter").css("color", "#545149");
    }
    
  });

});