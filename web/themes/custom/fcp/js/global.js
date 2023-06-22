/**
 * @file
 * Global utilities.
 *
 */

(function ($, Drupal) {

  $(document).ready(function(){
    $('.carousel').slick({
    slidesToShow: 3,
    infinite: true,
    });

    $('.carousel-header').slick({
      slidesToShow: 1,
      infinite: true,
      });

    $('.carousel-line').slick({
    slidesToShow: 8,
    infinite: true,
    prevArrow: false,
    nextArrow: false,
    });
  });



  

  

  if ($(".path-product").length) {
    function productFullSlickSettings() {
      return {
        asNavFor: '.slick-gallery-nav-wrapper > div > div',
        arrows: false,
      }
    }
    function productFullSlickNavSettings() {
      return {
        asNavFor: '.slick-gallery-wrapper > div > div',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<span class="btn-floating btn waves-effect waves-light red"><i class="slick-prev material-icons">keyboard_arrow_left</i></span>',
        nextArrow: '<span class="btn-floating btn waves-effect waves-light red"><i class="slick-next material-icons">keyboard_arrow_right</i></span>',
        appendArrows: $('.slick-gallery-nav-arrows'),
        centerMode: true,
      }
    }
    $(".slick-gallery-nav-wrapper img").unwrap();
    $(".slick-gallery-wrapper > div > div").slick(productFullSlickSettings());
    $(".slick-gallery-nav-wrapper > div > div").slick(productFullSlickNavSettings());

    //  слик удаляет нужный класс, из-за этого галерея не обновляется при переключении атрибутов товаров
      var classAjaxSlick = $(".slick-gallery-wrapper .slick-initialized").parent().attr('class');
      var classAjaxSlickNav = $(".slick-gallery-nav-wrapper .slick-initialized").parent().attr('class');

    $( document ).ajaxStop(function() {
      if ($(".slick-initialized").length == 0) {
        $(".slick-gallery-nav-wrapper img").unwrap();
        $(".slick-gallery-wrapper > div").wrap("<div class='" + classAjaxSlick + "'></div>");
        $(".slick-gallery-nav-wrapper > div").wrap("<div class='" + classAjaxSlickNav + "'></div>");
        $('.slick-gallery-nav-arrows span').remove();
        $(".slick-gallery-wrapper > div > div").slick(productFullSlickSettings());
        $(".slick-gallery-nav-wrapper > div > div").slick(productFullSlickNavSettings());
      }
    });
  }
  // end of slick slider for product page








})(jQuery, Drupal);

