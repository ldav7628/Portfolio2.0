"use strict"

$(window).on("load", function() {
    // Animation using ScrollReveal
    // Selecting objects to be animated
    var animatedList1 = '.extra-lg-text, .extra-lg-text span, .lg-text, .lg-text span, .boxy .title, .post-box .title, .post-header .title, .boxy .slg-text';

    var animatedList2 = '.boxy .text li, .boxy .bottom-text .link, .boxy .bottom-text .text';

    var animatedList3 = '.normal-text p, .normal-lg-text p, .clients-logos .logo-holder, .text-box .title, .text-box p, .team-photos, .post-box, .post-header, .post-content';

    var animatedList4 = '.clients-logos .logo-holder, .cr-btn, .footer .contact-info-holder, .few-contact .contact-info-holder, .job-box .title, .job-box .subtitle, .people-box .title, .people-box .subtitle, .post-box .text, .post-header .text, .post-content h1, .post-content p, .social-row .social-link-holder, .project-info h2, .project-imgs .img-holder';

    // Every list will have different animation
    

   

    // Menu Toggle and animate the link using AnimeJS
    $('.menu-toggle').on('click',function(e){
        $('body').toggleClass('menu-open');
        $('.main-menu').toggleClass('opened');
        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            anime({
                targets: '.main-menu .menu-links ul li a',
                translateY: ['470px', '0'],
                rotate: ['20deg', '0deg'],
                easing: 'cubicBezier(1.000, -0.020, 0.250, 0.750)',
                duration: 300,
                delay: anime.stagger(50)
            });
        }
    });

    // Animate the team photos using AnimeJS
    var photosList = $('.team-photos-holder .photo-holder', '.team-photos');
    photosList.clone().appendTo('.team-photos .team-photos-holder');

    var itemNum = $('.team-photos-holder .photo-holder').length;
    var teamPhotosWidth = $('.team-photos-holder .photo-holder').outerWidth(true) * itemNum;

    anime({
        targets: '.team-photos-holder',
        translateX: ['0', '-'+(teamPhotosWidth/2)-18+'px'],
        duration: 50000,
        easing: 'linear',
        loop: true
    });
});