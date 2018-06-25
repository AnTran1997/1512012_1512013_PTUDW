jQuery(document).ready(function($) {
    function transition(next){
      $('.slider-control .slider-dot').removeClass('active');
      $('.slider-dot').eq(next).addClass('active');
      $('.pirate-intro-slider-item').removeClass('active');
      $('.pirate-intro-slider-item').eq(next).addClass('active');
    }
    function autoSlide(){
      var i = $('.slider-dot').index($('.slider-dot.active'));
      if(i>=$('.slider-dot').length-1){
        i=-1;
      }
      transition(i+1);
    }
    var repeat = setInterval(autoSlide,5000);
    $('.slider-control .slider-dot').click(function(){
      if(!$(this).is($('.slider-dot.active').eq(0)))
      {
        transition($('.slider-dot').index(this));
        clearInterval(repeat);
        setTimeout(()=>{
          repeat = setInterval(autoSlide,5000);
        },5000);
      }
    });
    $('.intro .product-cat-list li').click(function(){
      var i =$('.intro .product-cat-list li').index($(this));
      $('.intro .product-list-content').removeClass('active');
      $('.intro .product-list-content').eq(i).addClass('active');
    });
    $('.product-list-content .product-item').click(function(){
      var i_cat = $(this).parent().parent().find('.product-list-content').index($(this).parent());
      var i_cat_item = $(this).parent().find('.product-item').index($(this));
      if(i_cat_item<($(this).parent().find('.product-item').length-1)){
        $('.view-cat-item').removeClass('active');
        $('.view-cat-item').eq(i_cat).addClass('active');
        $('.view-cat-item').eq(i_cat).find('.view-cat-sub-item').find('input[type=checkbox]').prop('checked', false);
        $('.view-cat-item').eq(i_cat).find('.view-cat-sub-item').eq(i_cat_item).find('input[type=checkbox]').prop('checked', true);
      }
      else{
        $('.view-cat-item').removeClass('active');
        $('.view-cat-item').eq(2).addClass('active');
      }
    });
    var i_best=0;
    $('.best-slider-control .best-prev').click(function(){
      if(!i_best){
        i_best=2;
      }
      else{
        i_best--;
      }
      $('.best-slider').css('transform',`translateX(-${33.333333*i_best}%)`);
    });
    $('.best-slider-control .best-next').click(function(){
      if(i_best==2){
        i_best=0;
      }
      else{
        i_best++;
      }
      $('.best-slider').css('transform',`translateX(-${33.333333*i_best}%)`);
    });
    var i_new=0;
    $('.new-slider-control .new-prev').click(function(){
      if(!i_new){
        i_new=1;
      }
      else{
        i_new--;
      }
      $('.new-slider').css('transform',`translateX(-${50*i_new}%)`);
    });
    $('.new-slider-control .new-next').click(function(){
      if(i_new==1){
        i_new=0;
      }
      else{
        i_new++;
      }
      $('.new-slider').css('transform',`translateX(-${50*i_new}%)`);
    });

    var i_most=0;
    $('.most-slider-control .most-prev').click(function(){
      if(!i_most){
        i_most=1;
      }
      else{
        i_most--;
      }
      $('.most-slider').css('transform',`translateX(-${50*i_most}%)`);
    });
    $('.most-slider-control .most-next').click(function(){
      if(i_most==1){
        i_most=0;
      }
      else{
        i_most++;
      }
      $('.most-slider').css('transform',`translateX(-${50*i_most}%)`);
    });
    $('.view-cat-item').click(function(){
      $('.view-cat-item').removeClass('active');
      $(this).addClass('active');
    });
    var n_item=0;
    $('.add').click(function(){
      n_item++;
      $('.buying-items').css('display','block');
      $('.buying-items').text(n_item);
    });
  });