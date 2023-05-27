$("#infographic article").click(function () {
   $(this).toggleClass("active");
});
$("#infographic article .controls .btn").on("click", function (e) {
   e.preventDefault();
   e.stopPropagation();
   var currentEl = $(this).closest("article");
   var currentI = currentEl.data("step");
   currentEl.removeClass("active");
   var nextI = $(this).is(":first-child") ? currentI - 1 : currentI + 1;
   var nextEl = $("article[data-step='" + nextI + "']");
   nextEl.click();
   var y = document
      .querySelector("article[data-step='" + nextI + "'")
      .getBoundingClientRect().top;
   var supportsNativeSmoothScroll =
      "scrollBehavior" in document.documentElement.style;

   if (supportsNativeSmoothScroll) {
      window.scrollTo({
         top: y + window.pageYOffset - 300,
         behavior: "smooth"
      });
   } else {
      window.scrollTo(0, y + window.pageYOffset - 300);
   }
});
$(document).mouseup(function (e) {
   var tgt = $("#infographic article.active");
   if (!tgt.is(e.target) && tgt.has(e.target).length === 0)
      tgt.removeClass("active");
});
$("body").mouseover(function () {
   $(this).css({ cursor: "none" });
});

$(document).on("mousemove", function (e) {
   $("#cursor").css({
      left: e.pageX,
      top: e.pageY
   });
});

var $detail = $(".triumph-detail"),
   title,
   subtitle,
   icon;

$(".triumph").on("click", function () {
   // turn off a previously selected triumph
   if ($(this).hasClass("selected")) {
      $(".selected").removeClass("selected");
      $detail.removeClass("on");
   }
   // turn on or swap a triumph
   else {
      // turn off any existing triumph
      $(".selected").removeClass("selected");

      // turn off the detail pane if it's currently on
      $detail.removeClass("on");

      // capture the new detail pane values...
      title = $(this).data("title");
      subtitle = $(this).data("subtitle");
      icon = $(this).css("background-image");

      // ...and write them in
      $detail
         .find(".detail-title")
         .html(title)
         .parent()
         .find(".detail-subtitle")
         .html(subtitle)
         .parent()
         .find(".detail-icon")
         .css("background-image", icon);

      // turn on this triumph
      $(this).addClass("selected");

      // show the detail pane
      setTimeout(function () {
         $detail.addClass("on");
      }, 100);
   }
});

// move .triumph-detail above h2
$(window).on("load resize", function () {
   winWidth = window.innerWidth;

   if (winWidth < 1110) {
      $(".triumph-detail").insertBefore("h2");
   } else {
      $(".triumph-detail").insertAfter(".emblem-wrapper");
   }
});