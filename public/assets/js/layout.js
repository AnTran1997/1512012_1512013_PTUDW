jQuery(document).ready(function($) {
    $('.header .product-cat-list li').click(function(){
      var i =$('.header .product-cat-list li').index($(this));
      $('.header .product-list-content').removeClass('active');
      $('.header .product-list-content').eq(i).addClass('active');
    });
    $('.view-cat-item').click(function(){
      $('.view-cat-item').removeClass('active');
      $(this).addClass('active');
    });
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if(height>500){
        $('.header').addClass('header-small');
        $('.main-content').css('margin-top','70px');
      }
      else{
        $('.header').removeClass('header-small');
        $('.main-content').css('margin-top','170px');
      }
    });
    $('#login').click(function(){
      $('.form').addClass('active');
      $('.form >div').removeClass('active');
      $('.form .login').addClass('active');
    });
    $('#signup').click(function(){
      $('.form').addClass('active');
      $('.form >div').removeClass('active');
      $('.form .signup').addClass('active');
    });
    $('.close').click(function(){
      $('.form').removeClass('active');
    });
    $('.done').click(function(){
      $('.sub-menu-none').removeClass('active');
      $('.sub-menu-user').addClass('active');
      $('.form').removeClass('active');
      alert('Chuyển qua chế độ user');
      $('.hello-user span').text('User');
      $('.product-item').addClass('user-add');
    });
    var n_item=0;
  });