// form validiation
var inputschecked = false;

function formvalidate(stepnumber) {
  // check if the required fields are empty
  inputvalue = $("#step" + stepnumber + " :input")
    .not("button")
    .map(function () {
      if (this.value.length > 0) {
        $(this).removeClass("invalid");
        return true;
      } else {
        if ($(this).prop("required")) {
          $(this).addClass("invalid");
          return false;
        } else {
          return true;
        }
      }
    })
    .get();

  // console.log(inputvalue);

  inputschecked = inputvalue.every(Boolean);

  // console.log(inputschecked);
}

$(document).ready(function () {
  $("#sub").on("click", function () {
    var value = $("#notifyemail :input")
      .map(function () {
        return this.value;
      })
      .get()
      .join(", ");

    var email = $("#email").val();

    //number validiation
    var numbers = /^[0-9]+$/;

    //email validiation
    var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var emailFormat = re.test(email);

    formvalidate(1);

    if (inputschecked == false) {
      formvalidate(1);
    }

    // check if email is valid
    else if (emailFormat == false) {
      // console.log("enter valid email address");
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Enter Valid email address!</div>'
        )
      );
      if (emailFormat == true) {
        $("#mail-email").removeClass("invalid");
      } else {
        $("#mail-email").addClass("invalid");
      }
    } else {
      $("#sub").html("<img src='assets/images/loading.gif'>");

      var dataString = new FormData(document.getElementById("steps"));

      console.log(dataString);

      // send form to send.php
      $.ajax({
        type: "POST",
        url: "form handling/send.php",
        data: dataString,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data, status) {
          $("#sub").html("Success!");
          window.location = "thankyou.html";
          console.log(data);
        },
        error: function (data, status) {
          $("#sub").html("failed!");
          console.log(data);
        },
      });
    }
  });
});

$(".thankyou .container > *").each(function (e) {
  var delay = e * 100;

  $(this).css("animation-delay", delay++ + "ms");
});
