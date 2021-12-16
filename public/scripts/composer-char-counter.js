$(document).ready(function() {

  $("output.counter").on("click", function(event) {
    console.log($(this))
    console.log($(this)[0].outerText);
  });

  $("#tweet-text").on("input", function(event) {
    const charCount = $(this).val().length
    // console.log('$(this).val() :', $(this).val());

    const count = 140 - charCount;

    $("output.counter").text(count);
    
    if (count < 0) {
      $("output.counter").css("color", "red");
    } else if (count >= 0) {
      $("output.counter").css("color", "#545149");
    }

  })

});