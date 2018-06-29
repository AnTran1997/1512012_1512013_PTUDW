jQuery(document).ready(function($) {
  $('input[name="search-submit"]').click(()=>{
   var formKey = $('input[name="search-field"]').val();
   window.location.href='/search/'+formKey+'/all/all/-1/1';
 });
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
  // $('.done').click(function(){
  //   $('.sub-menu-none').removeClass('active');
  //   $('.sub-menu-user').addClass('active');
  //   $('.form').removeClass('active');
  //   $('.hello-user span').text('User');
  //   $('.product-item').addClass('user-add');
  // });
  var n_item=0;
  
});


function validateSignUp(){
  if($('input[name="re-password"]').val()!=$('input[name="password"]').val()){
    alert("Mật khẩu không khớp!");
    return false;
  }
  else{
    if($('form#sign-up input[name="username"]').val()==""
      || $('form#sign-up input[name="fullname"]').val()==""
      || $('form#sign-up input[name="password"]').val()==""
      || $('form#sign-up input[name="re-password"]').val()==""
      || $('form#sign-up input[name="dob"]').val()==""
      || $('form#sign-up input[name="email"]').val()=="")
    {
      alert("Chưa điền đủ thông tin");
      return false;
    }
    return true;
  }
}