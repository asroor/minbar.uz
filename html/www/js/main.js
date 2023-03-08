$(document).ready(function () {
  // Block hover link functionality
  $(".clickable-block").click(function () {
    const linkObj = $(this).find("a");

    if (linkObj[0].hasAttribute("target")) {
      window.open(linkObj[0].href);
    } else {
      window.location = linkObj.attr("href");
    }

    return false;
  });

  $("#authors-carousel").slick({
    speed: 1000,
    dots: true,
    arrows: false,
    lazyLoad: "progressive",
    autoplay: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    appendDots: ".authors-dot",
    /* appendArrows: '.authors-nav',
    prevArrow:
      '<button class="authors-control-button authors-prev-button" aria-label="previous slides"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></button>',
    nextArrow:
      '<button class="authors-control-button authors-next-button" aria-label="next slides"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>', */
    cssEase: "cubic-bezier(0.27, 1, 0.27, 1)",
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });
});
