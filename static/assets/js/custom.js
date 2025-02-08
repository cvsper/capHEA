// next prev

//show active step
function showActiveStep() {
  if ($("#step1").is(":visible")) {
    $(".bar .fill").css("width", "0");
    $(".bar .fill").eq(0).css("width", "100%");
  } else if ($("#step2").is(":visible")) {
    $(".bar .fill").css("width", "100%");
  } else {
    console.log("error");
  }
}

// next prev
var divs = $(".show-section fieldset");
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next() {
  divs.eq(now).addClass("fadeup");
  divs.eq(now).removeClass("fadedown");

  setTimeout(function () {
    divs.eq(now).hide();
    now = now + 1 < divs.length ? now + 1 : 0;
    divs.eq(now).removeClass("fadeup");
    divs.eq(now).addClass("fadedown");

    divs.eq(now).show(); // show next
    showActiveStep();
    console.log(now);
  }, 200);
}

$(".prev").click(function () {
  divs.eq(now).removeClass("fadedown");
  divs.eq(now).addClass("fadeup");

  setTimeout(function () {
    divs.eq(now).hide();
    now = now > 0 ? now - 1 : divs.length - 1;
    divs.eq(now).removeClass("fadeup");
    divs.eq(now).addClass(" fadedown");

    divs.eq(now).show(); // show previous
    showActiveStep();
    console.log(now);
  }, 200);
});

$("#step1 .radio-field input").on("click", function () {
  $("#step1 .radio-field").removeClass("active");
  $(this).parent(".radio-field").addClass("active");
});

$("#step2 .radio-field input").on("click", function () {
  $("#step2 .radio-field").removeClass("active");
  $(this).parent(".radio-field").addClass("active");
});

// quiz validation
var checkedradio = false;

function radiovalidate(stepnumber) {
  var checkradio = $("#step" + stepnumber + " input")
    .map(function () {
      if ($(this).is(":checked")) {
        return true;
      } else {
        return false;
      }
    })
    .get();

  checkedradio = checkradio.some(Boolean);
}

// form validiation

$(document).ready(function () {
  $("#step1btn").on("click", function () {
    radiovalidate(1);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(1);
    } else {
      next();
    }
  });

  // check step1
  $("#sub").on("click", function () {
    radiovalidate(2);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(1);
    } else {
      var dataString = $(".step").serialize();

      $("#sub").html("<img src='assets/images/loading.gif'>");

      // send form to send.php
    
     
    }
  });
});
