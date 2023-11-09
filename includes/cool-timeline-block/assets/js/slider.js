

jQuery(document).ready(function(){
  var swiper_el=jQuery(".swiper-outer")
  var child_swiper_el=jQuery(".child-swiper-outer")
  jQuery.each(swiper_el,function(){
      var swiper_id=jQuery(this).attr("id")
      var slides=jQuery(this).attr("data-slide")

      const navSwiper= new Swiper('.cool-timeline-block-'+swiper_id+' .ctlb-nav-swiper-outer .swiper',{
          slidesPerView: slides,
          centeredSlides: true,
          allowTouchMove: false,
          breakpoints: {
            // when window width is >= 320px
            280: {
              slidesPerView: 1,
          
            },
            // when window width is >= 480px
            480: {
              slidesPerView: slides < 2 ? slides : 2,
          
            },
            // when window width is >= 640px
            640: {
              slidesPerView: slides,
        
            }
          }
      });

      const swiper =new Swiper('.cool-timeline-block-'+swiper_id+' .swiper-outer .swiper', {
          // Default parameters
          slidesPerView: 1,
          thumbs: {
            swiper: navSwiper
          },
          navigation: {
            nextEl: '.cool-timeline-block-'+swiper_id+' .swiper-button-next',
            prevEl: '.cool-timeline-block-'+swiper_id+' .swiper-button-prev',
          },
          centeredSlides: true,
  
          breakpoints: {
            // when window width is >= 320px
            280: {
              slidesPerView: 1,
           
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
           
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
         
            }
          }
    })

      // navSwiper.controller.control = swiper;
      swiper.controller.control = navSwiper;

      const post_swiper =new Swiper('.cool-post-timeline-block-'+swiper_id+' .swiper', {
          // Default parameters
          slidesPerView: slides,
          // Navigation arrows
          navigation: {
              nextEl: '.cool-post-timeline-block-'+swiper_id+' .swiper-button-next',
              prevEl: '.cool-post-timeline-block-'+swiper_id+' .swiper-button-prev',
          },
  
          breakpoints: {
            // when window width is >= 320px
            280: {
              slidesPerView: 1,
           
            },
            // when window width is >= 480px
            480: {
              slidesPerView: slides < 2 ? slides : 2,
           
            },
            // when window width is >= 640px
            640: {
              slidesPerView: slides,
         
            }
          }
    })
  })
  jQuery.each(child_swiper_el,function(){
    var swiper_id=jQuery(this).attr("id")
    const media_swiper =new Swiper('.timeline-child-swiper-outer-'+swiper_id+' .child-swiper', {
        // Default parameters
        slidesPerView: 1  ,
        // Navigation arrows
        navigation: {
            nextEl: '.timeline-child-swiper-outer-'+swiper_id+' .swiper-child-button-next',
            prevEl: '.timeline-child-swiper-outer-'+swiper_id+' .swiper-child-button-prev',
        },
  })
  })
})