// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
}

$(".prev").click(function() {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
});


$(".file").on('change', function(e){
    // alert("file is selected");
    var filename = e.target.files[0].name;
    $(".filename").text(filename);
    $(".upload-counter-hide").addClass("upload-counter-show");
    $(".uploading-number-e").addClass("uploading-number");
});

// change style on change
$(document).on('change', '.selection-field select', function() {
    $(this).addClass("selected")
  });

//   step-5

$(document).ready(function(){
    makeActive();
    $(".hire-field-detail input[type=radio]").on("change",function(){
      makeActive();
    });
  });
  function makeActive(){
    $(".hire-field-detail input[type=radio]").each(function(){
        if($(this).prop("checked")){
          $(this).closest('.hire-field').find(".hire-field-icon").addClass("active");
        }else{
          $(this).closest('.hire-field').find(".hire-field-icon").removeClass("active");
        }
      });
  }




// step 5 range
var slider = document.getElementById("myRange");
var output = document.getElementById("currentrange");
output.innerHTML = slider.value;

slider.onchange = function() {
  output.innerHTML = this.value;
}

    slider.oninput = function() {
  var value = (this.value-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient( 90deg, rgb(244,85,26) 0%, rgb(255,143,55) ' + value + '%, rgb(228, 239, 251) ' + value + '%, rgb(228, 239, 251) 100%)'
  // slider.css({z-index: "999999"});
};











// disable on enter
$('form').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});




 // form validiation
 var inputschecked = false;


 function formvalidate(stepnumber)
 {
   // check if the required fields are empty
   inputvalue = $("#step"+stepnumber+" :input").not("button").map(function()
   {
     if(this.value.length > 0)
     {
       $(this).removeClass('invalid');
       return true;
 
     }
     else
     {
       
       if($(this).prop('required'))
       {
         $(this).addClass('invalid');
         return false
       }
       else
       {
         return true;
       }
       
     }
   }).get();
   
 
   // console.log(inputvalue);
 
   inputschecked = inputvalue.every(Boolean);
 
   // console.log(inputschecked);
  }


$(document).ready(function()
 {
    // check step1
    $("#step1btn").on('click', function()
    {
        formvalidate(1);
        

        if(inputschecked == false)
        {
            formvalidate(1);
        }
        else
        {
            next();
        }
    })
        // check step2
        $("#step2btn").on('click', function()
        {
            formvalidate(2);

            var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var email = $("#mail-email").val();
            var emailFormat = re.test(email);
            
    
            if(inputschecked == false)
            {
                formvalidate(2);
            }

            else if(emailFormat == false)
            {
                (function (el) {
                setTimeout(function () {
                    el.children().remove('.reveal');
                }, 3000);
                }($('#error').append('<div class="reveal alert alert-danger">Email address is invalid!</div>')));
                if(emailFormat == true)
                {
                $("#mail-email").removeClass('invalid');
                }
                else
                {
                $("#mail-email").addClass('invalid');
                }
    
            }
            else
            {
                next();
            }
        })

        // check step3
        $("#step3btn").on('click', function()
        {
            formvalidate(3);
            
    
            if(inputschecked == false)
            {
                formvalidate(3);
            }

            else
            {
                next();
            }
        })

        // check step4
        $("#step4btn").on('click', function()
        {
            formvalidate(4);
            
    
            if(inputschecked == false)
            {
                formvalidate(4);
            }

            else
            {
                next();
            }
        })

        // check last step
     $("#sub").on('click' , function()
     {
      
        formvalidate(5);
            
    
        if(inputschecked == false)
        {
          formvalidate(5);
        }
        else
        {
            $("#sub").html("<img src='assets/images/loading.gif'>");

            

            var dataString = new FormData(document.getElementById("steps"));


            console.log(dataString);

            
            // send form to send.php
            $.ajax({
                      type: "POST",
                      url: "form handling/send.php",
                      data: dataString,
                      processData: true,
                      contentType: true,
                      cache: true,
                      success: function(data,status)
                      {

                        $("#sub").html("Success!");
                        console.log(data);
                        
                        window.location = "thankyou.html";
                        
                      },
                      error: function(data, status)
                      {
                        $("#sub").html("failed!");
                        console.log(data);
                      }
                  });
          }

      });
 }
 );

(function() {
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 4;

  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);

  canvas.addEventListener("mouseup", function(e) {
    drawing = false;
  }, false);

  canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function(e) {

  }, false);

  canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function(e) {
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  clearBtn.addEventListener("click", function(e) {
    clearCanvas();
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
  }, false);
  submitBtn.addEventListener("click", function(e) {
    var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    sigImage.setAttribute("src", dataUrl);
  }, false);

})();
