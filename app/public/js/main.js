
$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;


  $(".fullscreen").css("height", window_height)
  $(".fitscreen").css("height", fitscreen);

  //------- Active Nice Select --------//

  $('select').niceSelect();


  $('.navbar-nav li.dropdown').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });

  $('.img-pop-up').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // Search Toggle
  $("#search_input_box").hide();
  $("#search").on("click", function () {
    $("#search_input_box").slideToggle();
    $("#search_input").focus();
  });
  $("#close_search").on("click", function () {
    $('#search_input_box').slideUp(500);
  });

  /*==========================
  javaScript for sticky header
  ============================*/
  $(".sticky-header").sticky();

  /*=================================
  Javascript for banner area carousel
  ==================================*/
  $(".active-banner-slider").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: ["<img src='img/banner/prev.png'>", "<img src='img/banner/next.png'>"],
    dots: false
  });

  /*=================================
  Javascript for product area carousel
  ==================================*/
  $(".active-product-area").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: ["<img src='img/product/prev.png'>", "<img src='img/product/next.png'>"],
    dots: false
  });

  /*=================================
  Javascript for single product area carousel
  ==================================*/
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: true
  });

  /*=================================
  Javascript for exclusive area carousel
  ==================================*/
  $(".active-exclusive-product-slider").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: ["<img src='img/product/prev.png'>", "<img src='img/product/next.png'>"],
    dots: false
  });

  //--------- Accordion Icon Change ---------//

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".lnr-arrow-right").removeClass("lnr-arrow-right").addClass("lnr-arrow-left");
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".lnr-arrow-left").removeClass("lnr-arrow-left").addClass("lnr-arrow-right");
  });

  // Select all links with hashes
  $('.main-menubar a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 70
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });



  // -------   Mail Send ajax

  $(document).ready(function () {
    var form = $('#booking'); // contact form
    var submit = $('.submit-btn'); // submit button
    var alert = $('.alert-msg'); // alert div for show alert message

    // form submit event
    form.on('submit', function (e) {
      e.preventDefault(); // prevent default form submit

      $.ajax({
        url: 'booking.php', // form action url
        type: 'POST', // form submit method get/post
        dataType: 'html', // request type html/json/xml
        data: form.serialize(), // serialize form data
        beforeSend: function () {
          alert.fadeOut();
          submit.html('Sending....'); // change submit button text
        },
        success: function (data) {
          alert.html(data).fadeIn(); // fade in response data
          form.trigger('reset'); // reset form
          submit.attr("style", "display: none !important");; // reset submit button text
        },
        error: function (e) {
          console.log(e)
        }
      });
    });
  });




  $(document).ready(function () {
    $('#mc_embed_signup').find('form').ajaxChimp();
  });



  if (document.getElementById("js-countdown")) {

    var countdown = new Date("October 17, 2018");

    function getRemainingTime(endtime) {
      var milliseconds = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor(milliseconds / 1000 % 60);
      var minutes = Math.floor(milliseconds / 1000 / 60 % 60);
      var hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24);
      var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

      return {
        'total': milliseconds,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
      };
    }

    function initClock(id, endtime) {
      var counter = document.getElementById(id);
      var daysItem = counter.querySelector('.js-countdown-days');
      var hoursItem = counter.querySelector('.js-countdown-hours');
      var minutesItem = counter.querySelector('.js-countdown-minutes');
      var secondsItem = counter.querySelector('.js-countdown-seconds');

      function updateClock() {
        var time = getRemainingTime(endtime);

        daysItem.innerHTML = time.days;
        hoursItem.innerHTML = ('0' + time.hours).slice(-2);
        minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
        secondsItem.innerHTML = ('0' + time.seconds).slice(-2);

        if (time.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    initClock('js-countdown', countdown);

  };



  $('.quick-view-carousel-details').owlCarousel({
    loop: true,
    dots: true,
    items: 1,
  })



  //----- Active No ui slider --------//



  $(function () {

    if (document.getElementById("price-range")) {

      var nonLinearSlider = document.getElementById('price-range');

      noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',
        start: [500, 4000],
        range: {
          // Starting at 500, step the value by 500,
          // until 4000 is reached. From there, step by 1000.
          'min': [0],
          '10%': [500, 500],
          '50%': [4000, 1000],
          'max': [10000]
        }
      });


      var nodes = [
        document.getElementById('lower-value'), // 0
        document.getElementById('upper-value')  // 1
      ];

      // Display the slider value and how far the handle moved
      // from the left edge of the slider.
      nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
        nodes[handle].innerHTML = values[handle];
      });

    }

  });


  //-------- Have Cupon Button Text Toggle Change -------//

  $('.have-btn').on('click', function (e) {
    e.preventDefault();
    $('.have-btn span').text(function (i, text) {
      return text === "Have a Coupon?" ? "Close Coupon" : "Have a Coupon?";
    })
    $('.cupon-code').fadeToggle("slow");
  });

  $('.load-more-btn').on('click', function (e) {
    e.preventDefault();
    $('.load-product').fadeIn('slow');
    $(this).fadeOut();
  });





  //------- Start Quantity Increase & Decrease Value --------//




  var value,
    quantity = document.getElementsByClassName('quantity-container');

  function createBindings(quantityContainer) {
    var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
    var increase = quantityContainer.getElementsByClassName('increase')[0];
    var decrease = quantityContainer.getElementsByClassName('decrease')[0];
    increase.addEventListener('click', function () { increaseValue(quantityAmount); });
    decrease.addEventListener('click', function () { decreaseValue(quantityAmount); });
  }

  function init() {
    for (var i = 0; i < quantity.length; i++) {
      createBindings(quantity[i]);
    }
  };

  function increaseValue(quantityAmount) {
    value = parseInt(quantityAmount.value, 10);

    console.log(quantityAmount, quantityAmount.value);

    value = isNaN(value) ? 0 : value;
    value++;
    quantityAmount.value = value;
  }

  function decreaseValue(quantityAmount) {
    value = parseInt(quantityAmount.value, 10);

    value = isNaN(value) ? 0 : value;
    if (value > 0) value--;

    quantityAmount.value = value;
  }

  init();

  //------- End Quantity Increase & Decrease Value --------//

  /*----------------------------------------------------*/
  /*  Google map js
    /*----------------------------------------------------*/

  if ($("#mapBox").length) {
    var $lat = $("#mapBox").data("lat");
    var $lon = $("#mapBox").data("lon");
    var $zoom = $("#mapBox").data("zoom");
    var $marker = $("#mapBox").data("marker");
    var $info = $("#mapBox").data("info");
    var $markerLat = $("#mapBox").data("mlat");
    var $markerLon = $("#mapBox").data("mlon");
    var map = new GMaps({
      el: "#mapBox",
      lat: $lat,
      lng: $lon,
      scrollwheel: false,
      scaleControl: true,
      streetViewControl: false,
      panControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoom: $zoom,
      styles: [
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#dcdfe6"
            }
          ]
        },
        {
          featureType: "transit",
          stylers: [
            {
              color: "#808080"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#dcdfe6"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#ffffff"
            },
            {
              weight: 1.8
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#d7d7d7"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#ebebeb"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              color: "#a7a7a7"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#efefef"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#696969"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#737373"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#d6d6d6"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {},
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#dadada"
            }
          ]
        }
      ]
    });
  }




});
const listItemElements = document.querySelectorAll('li.nav-item');
const currentUrl = window.location.href;//lấy url
const startIndex = currentUrl.lastIndexOf("/") + 1;// lấy chuỗi sau dấu / của url 
const url = currentUrl.substring(startIndex);
var arUrl = {
  'home': '',
  'Category': 'product',
  'login': 'login'
};
var number = 0;
for (let key in arUrl) {
  if (arUrl[key] === url) {
    listItemElements[number].classList.add('active');
  }
  number++;
}
function addToCart(id) {
  // Lấy kích cỡ đã chọn
  const selectedSizeElement = document.querySelector('.size-item.selected');
  if (!selectedSizeElement) {
    alert('Vui lòng chọn kích cỡ sản phẩm trước khi thêm vào giỏ hàng.');
    return;
  }

  const selectedSize = selectedSizeElement.getAttribute('data-size');

  // Gửi yêu cầu thêm sản phẩm vào giỏ hàng kèm kích cỡ
  fetch('/addToCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, size: selectedSize }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.success);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Thêm sự kiện chọn kích cỡ
document.querySelectorAll('.size-item').forEach(item => {
  item.addEventListener('click', () => {
    // Loại bỏ lớp `selected` khỏi các phần tử khác
    document.querySelectorAll('.size-item').forEach(el => el.classList.remove('selected'));

    // Thêm lớp `selected` vào phần tử được chọn
    item.classList.add('selected');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let selectedStars = 0;
  let idPrd = '<%= prd.IDPrd %>';
  // Xử lý sự kiện hover và click cho ngôi sao
  document.querySelectorAll('.star-transparent').forEach((star, index, stars) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('hover', i <= index); // Áp dụng lớp hover cho các sao từ đầu đến sao hiện tại
      });
    });

    star.addEventListener('mouseout', () => {
      stars.forEach((s) => {
        s.classList.remove('hover'); // Xóa lớp hover khi chuột rời khỏi ngôi sao
      });
    });

    star.addEventListener('click', () => {
      selectedStars = index + 1; // Lưu số sao đã chọn
      stars.forEach((s, i) => {
        s.classList.toggle('selected', i < selectedStars); // Áp dụng lớp selected cho các sao từ đầu đến sao đã chọn
      });
    });
  });


  // Xử lý sự kiện submit form
  document.getElementById('reviewForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn không cho form gửi theo cách truyền thống

    // Lấy dữ liệu số sao và bình luận
    const comment = document.getElementById('message').value;

    // Gửi dữ liệu đến server
    fetch('/product/review', { // Đảm bảo URL đúng với router trên server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stars: selectedStars, comment: comment, idPrd: idPrd })
    })
      .then(response => response.json())
      .then(data => {
        // Tạo phần tử HTML mới cho review
        const reviewList = document.querySelector('.review_list'); // Phần tử chứa danh sách review
        const newReview = document.createElement('div');
        newReview.classList.add('review_item');

        // Tạo HTML từ dữ liệu trong form
        newReview.innerHTML = `
              <div class="media">
                <div class="d-flex">
                  <img src="img/product/review.jpg" alt="" style="width: 60px;">
                </div>
                <div class="media-body">
                  <h4>Bạn</h4> <!-- Thay thế bằng tên người dùng thực tế nếu cần -->
                  ${Array.from({ length: 5 }, (_, i) => i < selectedStars ?
          '<i class="fa fa-star"></i>' : '<i class="fa fa-star-o"></i>'
        ).join('')}
                </div>
              </div>
              <p>${comment}</p>
            `;

        // Thêm review mới vào danh sách
        reviewList.prepend(newReview); // Thêm review vào đầu danh sách

        // Xóa nội dung trong trường bình luận và reset selectedStars
        document.getElementById('message').value = '';
        selectedStars = 0;
      })
      .catch(error => console.error('Lỗi:', error));

  });

});
// Lấy tất cả các phần tử có class 'size-item'
const sizeItems = document.querySelectorAll('.size-item');

// Lặp qua từng phần tử và gắn sự kiện click
sizeItems.forEach(item => {
  item.addEventListener('click', function () {
    // Xóa class 'active' khỏi tất cả các ô
    sizeItems.forEach(i => i.classList.remove('active'));

    // Thêm class 'active' vào ô được bấm
    this.classList.add('active');

    // In ra kích thước được chọn (nếu cần)
    const selectedSize = this.getAttribute('data-size');
    console.log("Selected size:", selectedSize);
  });
});

// Chức năng tìm kiếm
// Bắt sự kiện submit
// document.querySelector('.search_input form').addEventListener('submit', function (e) {
//   e.preventDefault(); // Ngăn trình duyệt reload trang

//   const searchKeyword = document.getElementById('search_input').value.trim();

//   if (searchKeyword) {
//     console.log('Tìm kiếm:', searchKeyword);

//     // Gửi từ khóa tới server bằng GET
//     fetch(`/search?keyword=${searchKeyword}`, {
//       method: 'GET',
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Kết quả:', data);
//         renderProducts(data.data, data.dataSale);
//         // Hiển thị kết quả (hàm tự định nghĩa)
//       })
//       .catch(error => console.error('Lỗi:', error));
//   } else {
//     alert('Vui lòng nhập từ khóa!');
//   }
// });

// function renderProducts(products, dataSale) {
//   // Xóa nội dung cũ
//   const productContainer = document.querySelector('.row.list-product');
//   productContainer.innerHTML = '';

//   // Kiểm tra nếu không có sản phẩm
//   if (products.length === 0) {
//     productContainer.innerHTML = '<p>Không có sản phẩm nào được tìm thấy.</p>';
//     return;
//   }

//   // Lặp qua từng sản phẩm và tạo HTML
//   products.forEach(value => {
//     let onSale = false;
//     let salePrice = 0;

//     dataSale.forEach(saleItem => {
//       if (value.NamePrd === saleItem.NamePrd) {
//         onSale = true;
//         salePrice = saleItem.SaleOff;
//       }
//     });
//     const formatCurrency = (amount) => {
//       return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
//     };

//     const productPrice = onSale ? formatCurrency(value.PricePrd - salePrice) : formatCurrency(value.PricePrd);
//     const originalPrice = onSale ? formatCurrency(value.PricePrd) : "";

//     const truncatedText =
//       value.NamePrd.length > 25 ? value.NamePrd.substring(0, 20) + "..." : value.NamePrd;

//     const productHTML = `
//       <div class="col-lg-4 col-md-6">
//         <div class="single-product">
//           <a href="http://localhost:3000/product/${value.MetaPrd}">
//             <img class="img-fluid" src="${value.ImgPrd}" alt="">
//             <div class="product-details">
//               <h6>${truncatedText}</h6>
//               <div class="price">
//                 <h6 class="productPrice">${productPrice}</h6>
//                 ${onSale ? `<h6 class="l-through productPrice">${originalPrice}</h6>` : ""}
//               </div>
            
//           </a>
//           <div class="prd-bottom">
//             <button class="social-info" type="button" onclick="addToCart('${value.IDPrd}')">
//               <span class="ti-bag"></span>
//               <p class="hover-text">Thêm vào giỏ hàng</p>
//             </button>
//             <button class="social-info" type="button">
//               <span class="lnr lnr-heart"></span>
//               <p class="hover-text">Wishlist</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     `;

//     // Thêm HTML vào container
//     productContainer.insertAdjacentHTML('beforeend', productHTML);
//   });
// }





