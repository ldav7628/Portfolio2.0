


   

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

    
