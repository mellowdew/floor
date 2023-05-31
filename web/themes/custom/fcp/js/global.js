/**
 * @file
 * Global utilities.
 *
 */

(function ($, Drupal) {

  function setCookie(cname, cvalue, exdays) {
	  document.cookie = cname + "=" + cvalue + ";" + ";path=/";
	}

	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	}

  Drupal.behaviors.threeLink = {
    attach: function (context, settings) {
      var elemHeight = $('.three-link__wrapper').height();
      var elemTop = $('.three-link').offset();

      $(window).resize(function () {
        elemHeight = $('.three-link__wrapper').height();
        $('.three-link').height(elemHeight);
      });

      $(window).scroll(function () {
        if (elemTop != $('.three-link').offset()) {
          elemTop = $('.three-link').offset();
        }

        var scrollTop = window.pageYOffset;
        $('.three-link').height(elemHeight);

        if( scrollTop > elemTop.top + elemHeight){
          $('.three-link').addClass('topper');
        } else {
          $('.three-link').removeClass('topper');
        }
      });

    }
  }


  $(document).ready(function() {

    var cookie = getCookie('popup-holidays');

		if (cookie !== 'true') {
			setCookie('popup-holidays', 'true', 1);

			$('.popup-holidays').addClass('open');

			$('.popup-holidays .popup-holidays__close').click(function () {
				$('.popup-holidays').removeClass('open');
			});
		}

    // disable attributes select list with single item
    if ($(".path-product").length) {
      $(".field--name-variations .form-select").each(function(){
        if ($(this).find("select option").length == 1) {
          $(this).addClass("disabled");
          $(this).find("input").attr("disabled","disabled");
        }
      });
    }


    /*youtube video About factory*/
      $('.video-aboutfactory-wrapper').on('mouseover', function() {
        $('.text-wrapper', this).addClass('hide-text');
      });
    /*-----------------------*/

  $('.dropdown-hover-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 0,
      belowOrigin: true,
      alignment: 'center',
      stopPropagation: false
    }
  );


  $('.country_wrapper .active_country').text($('.region-hidden .active_country').text());

  // slick slider for product page

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


  });

  $('.view-catalog-variations .card').matchHeight();

  Drupal.behaviors.aviselectronics = {
    attach: function (context, settings) {

      if ($(".field--name-field-media-video video").length) {
        $(window).on('pageshow',function() {
          $(".field--name-field-media-video video")[0].play()
        });
      };
    }
  }


  Drupal.behaviors.amozanGA = {
    attach: function (context, settings) {

      console.log('Hello! I am Avis.');

      $('#block-quicklinkssupportlinksfooter .amazon').once().click(function () {
        ga('send', 'event', 'amazon', 'click');
      });
    }
  }

  Drupal.behaviors.dropdown = {
    attach: function (context, settings) {
      $('.product__expanding--top').on('click', function () {
        $(this).siblings('.product__expanding--content').slideToggle('slow');
        $(this).children('.caret').toggleClass('toggle');
      })
    }
  }

  Drupal.behaviors.faq = {
    attach: function (context, settings) {
      $('.field--name-field-product-faq-heading').on('click', function () {
          $(this).siblings('.field--name-field-product-faq-body').slideToggle(300);
          $(this).toggleClass('open');
      })
    }
  }

  Drupal.behaviors.productDetailsAnchor = {
    attach: function (context, settings) {
      $('.product__details').once().on('click', function () {
        let $details = $('.paragraph--type--table');
        $('html, body').animate({scrollTop: $($details).offset().top}, 1000);
      })
    }
  }

  Drupal.behaviors.features = {
    attach: function (context, settings) {
      if (($('.path-taxonomy').find('.features').length > 0) && ($('.path-taxonomy').find('.features').length < 3)) {
        $('.region-content .views-element-container').once().after($('.features').clone());
      }
    }
  }

  Drupal.behaviors.countryModalSeparate = {
    attach: function (context, settings) {
      let $countries = $('#edit-country-list .row')
      let $btn = $('#country-modal .modal-show-less')

      let $hiding =  function (){
        $($countries).each(function (index) {
          if ((index > 9) && ($(this).find('input').prop("checked") === false)) {
            $(this).hide();
          }
          ++index
        })
      }

      $hiding()

      $btn.once().on('click', function () {
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
          $(this).text('Show Less')
          $($countries).each(function (index) {
            $(this).show();
            ++index
          })
        } else {
          $(this).text('Show More')
          $hiding()
        }
      })
    }
  }


})(jQuery, Drupal);

