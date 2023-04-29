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
                      processData: false,
                      contentType: false,
                      cache: false,
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