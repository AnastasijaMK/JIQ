// Настройка кружочка, следующего за курсором
function cursorMoveFunc() {
    var es = document.querySelector(".mouse-follow");

    $('body').on("mousemove", function (e) {
        es.style.display = 'block';
        es.style.position = 'fixed';
        es.style.left = e.clientX + -20 + 'px';
        es.style.top = e.clientY + -20 + 'px';
    });

    $(".blur-effect" ).mouseenter(function() {
        es.classList.add('over-button');
    });

    $(".blur-effect" ).mouseleave(function() {
        es.classList.remove('over-button');
    });
}
cursorMoveFunc();


// Настройка эффекта "магнита" при наведении курсором
let mm = new MagnetMouse({
    magnet: {
        element: '.magnetize',
        position: 'center',
        distance: 15
    }
});
mm.init();


$(document).ready(function() {

    // Корректировка отображения всплывающих окон в мобильных браузерах
    function calcVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    calcVH();

    
    // Маски
    var listCountries = $.masksSort($.masksLoad("https://cdn.rawgit.com/andr-04/inputmask-multi/master/data/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
    var maskOpts = {
        inputmask: {
            definitions: {
                '#': {
                    validator: "[0-9]",
                    cardinality: 1
                }
            },
            showMaskOnHover: false,
            autoUnmask: true,
            clearMaskOnLostFocus: true
        },
        match: /[0-9]/,
        replace: '#',
        listKey: "mask"
    };
    $('input[type="tel"]').inputmasks($.extend(true, {}, maskOpts, {
        list: listCountries
    }));
    function changeInputColor() {
        $('input[type="tel"]').each(function() {
            if ($(this).val().length == 0) {
                $(this).addClass('empty');
            } else {
                $(this).removeClass('empty');
            }
        });
    }
    changeInputColor();
    $('input[type="tel"]').focus(function(){
        $(this).removeClass('empty');
    });
    $('input[type="tel"]').blur(function(){
        changeInputColor();
    });



    // Активация анимации
    if ($(window).width() > 1199) {
        var wow = new WOW(
            {
                scrollContainer: "main" // запускаем анимацию именно при прокрутке main
            }
        );
    } else {
        // Отменяем анимацию копирайта на маленьких экранах
        $('footer').removeClass('wow fadeInUp');
        var wow = new WOW(
            {
                scrollContainer: null // запускаем анимацию именно при прокрутке window
            }
        );
    }
    wow.init();
    // // Отменяем анимацию копирайта на маленьких экранах
    // if ($(window).width() < 1200) {
    //     setTimeout(()=>{
    //         $('footer').removeClass('wow fadeInUp');
    //     }, 300);
    // }


    // Подсчет количества экранов
    if($(window).width() > 1199) {
        let countSlides = $('section').length;
        countSlides = countSlides < 10 ? "0"+countSlides : countSlides;
        $('.footer__section').append('/ ' + countSlides);
    }

    // Определение номера текущего экрана
    findCurrentSlide();
    $('main').scroll(function(){
        if($(window).width() > 1199) {
            findCurrentSlide();
        }
    });
    function findCurrentSlide() {
        $('section').each(function(){
            let sectionTop = Math.round($(this).offset().top);
            if (sectionTop == 0) {
                $('section.current').removeClass('current');
                $(this).addClass('current');
                if($(window).width() > 1199) {
                    if ($(this).index() == $('section').length) {
                        $('.page__scroller--wrap').hide();
                        $('.footer__copyright').show();
                    } else {
                        $('.page__scroller--wrap').show();
                        $('.footer__copyright').hide();
                    }
                }
            }
        });
        let currentSlide = $('section.current').index();
        currentSlide = currentSlide < 10 ? "0"+currentSlide : currentSlide;
        $('.footer__section .section--current').text(currentSlide);
    };


    // Прокрутка экранов по клику на кнопку
    $('.page__scroller').click(function(){
        if ($(window).width() > 1199) {
            let elem = document.querySelector('section.current').nextElementSibling;
            elem.scrollIntoView(top);
        } else {
            var fixed_offset = $('header').outerHeight(true);
            $('html, body').animate({ scrollTop: $('section.current').next().offset().top - fixed_offset }, 1000);
        }
    });


    // Слайдер преимуществ на моб версии
    if($(window).width() < 768) {
        $('section .advantages__wrap').each(function() {
            $(this).find('h2').prependTo($(this).parent());
            $(this).find('.cloud').appendTo($(this).parent());
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                dots: true,
                arrows: false,
                infinite: true,
                swipeToSlide: true
            });
        });
        $('section[data-section="business_advantages"] .advantages__list').each(function() {
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                dots: true,
                arrows: false,
                infinite: true,
                swipeToSlide: true
            });
        });
        $('section[data-section="news"] .news__slider').each(function() {
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                dots: true,
                arrows: false,
                infinite: true,
                swipeToSlide: true
            });
        });
    }


    // Перенос кнопки скролла страницы в первый раздел
    if ($(window).width() < 768) {
        $('.page__scroller--wrap').appendTo('section[data-section="intro"]');
    }


    // Плавная прокрутка к якорю
    if ($(window).width() > 1199) {
        const smoothLinks = document.querySelectorAll('a[href^="#"]');
        for (let smoothLink of smoothLinks) {
            smoothLink.addEventListener('click', function (e) {
                e.preventDefault();
                const id = smoothLink.getAttribute('href');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        };
    } else {
        $("body").on('click', '[href*="#"]', function(e){
            e.preventDefault();
            var fixed_offset = $('header').outerHeight(true);
            $('html, body').animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
        });
    }


    // Оставить заявку
    $('button[type="submit"]').click(function(e){
        e.preventDefault();
        /*запрещаем второй раз отправлять форму*/
        if (!$(this).hasClass('active')) {
            let nameValue = $(this).closest('form').find('input[name="NAME"]').val();
            let phoneValue = $(this).closest('form').find('input[name="PHONE"]').val();
            let buttonActive = true;
            $(this).closest('form').find('.warning').removeClass('warning');
            if ($(this).closest('form').find('input[name="NAME"]').length > 0) {
                if (nameValue.trim() == "") {
                    $(this).closest('form').find('input[name="NAME"]').closest('label').addClass('warning');
                    $(this).closest('form').find('.warning .input--error').show();
                    buttonActive = false;
                }
            }
            if (phoneValue.trim() == "") {
                $(this).closest('form').find('input[name="PHONE"]').closest('label').addClass('warning');
                $(this).closest('form').find('.warning .input--error').show();
                buttonActive = false;
            }
            if ($(this).closest('form').find('input[name="EMAIL"]').length > 0) {
                let mailValue = $(this).closest('form').find('input[name="EMAIL"]').val();
                let patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
                if (mailValue.trim() == "") {
                    $(this).closest('form').find('input[name="EMAIL"]').closest('label').addClass('warning');
                    if ($('html').attr('lang') == 'en') {
                        $(this).closest('form').find('.warning .input--error').text('Fill in this field');
                    } else {
                        $(this).closest('form').find('.warning .input--error').text('Заполните это поле');
                    }
                    buttonActive = false;
                    $(this).closest('form').find('.warning .input--error').show();
                } else if(mailValue.search(patternMail) !== 0) {
                    $(this).closest('form').find('input[name="EMAIL"]').closest('label').addClass('warning');
                    if ($('html').attr('lang') == 'en') {
                        $(this).closest('form').find('input[name="EMAIL"]').next('.input--error').text('Please enter a valid email');
                    } else {
                        $(this).closest('form').find('input[name="EMAIL"]').next('.input--error').text('Укажите корректный email');
                    }
                    buttonActive = false;
                    $(this).closest('form').find('.warning .input--error').show();
                }
            }

            if (buttonActive) {
                $(this).addClass('active');
                if ($('html').attr('lang') == 'en') {
                    $(this).find('span').not('.btn-hover').text('Sent');
                } else {
                    $(this).find('span').not('.btn-hover').text('Заявка отправлена');
                }

                /*отправляем форму*/
                $.ajax({
                    url: '/local/ajax/sendForm.php',
                    type: 'POST',
                    data: $(this).closest('form').serializeArray(),
                    dataType: 'json',
                    success: function(result)
                    {},
                });

                if($(this).closest('.popup').length > 0) {
                    setTimeout(()=>{
                        popupClose();
                    }, 3000);
                }
            }
        }
    });


    // Снятие предупреждения о заполнении поля
    $('form input').on('click', function(){
        $(this).next('.input--error').hide();
        $(this).closest('label').removeClass('warning');
    });


    // Анимация кнопок
    $('.shadow-effect').mouseenter(function(){
        if(!$(this).hasClass('active')) {
            $(this).find('.btn-hover').css('transform', 'translate3d(0,0,0) scale(1.1,2)');
        }
    });

    $('.shadow-effect').mouseleave(function(){
        if(!$(this).hasClass('active')) {
            $(this).find('.btn-hover').css('transform', 'translate3d(0,-160%,0) scale(1.1,2)');
            setTimeout(() => {
                $(this).find('.btn-hover').css('transition', 'transform 0s ease-out');
                $(this).find('.btn-hover').css('transform', 'translate3d(0,160%,0) scale(1.1,2)');
                setTimeout(() => {
                    $(this).find('.btn-hover').css('transition', '');
                }, 100);
            }, 300);
        }
    });


    // Анимация цифр в блоке "Почему стоит внедрить JIQ сейчас"
    animateCount();
    if ($(window).width() > 1199) {
        $('main').scroll(function() {
            animateCount();
        });
    } else {
        $(window).scroll(function() {
            animateCount();
        });
    }
    function animateCount() {
        $('section[data-section="statistics"] .statisticks__block .counter').each(function(index){
            var targetBlock = $(this);
            var targetBlockValue = +$(this).attr('data-counter');
            if ($(window).width() > 1199) {
                var scrollEvent = (targetBlock.offset().top < $('main').height() && targetBlock.offset().top > 0);
            } else {
                var scrollEvent = ($(window).scrollTop() > (targetBlock.offset().top - $(window).height()));
            }
            if(scrollEvent && !$(this).hasClass('counted')) {
                setTimeout(()=>{
                    $(this).closest('.title').css('visibility', 'visible');
                }, 200);
                $({numberValue: 1}).stop(true, true).delay(1000).animate({numberValue: targetBlockValue}, {
                    duration: 2000,
                    easing: "linear",
                    step: function(val) {
                        $('section[data-section="statistics"] .statisticks__block .counter').eq(index).html(Math.ceil(val));
                    }
                });
                $(this).addClass('counted');
            }
        });
    }

    // Смена фона шапки при прокрутке страницы
    function headerChange() {
        if ($(window).width() < 1200) {
            let windowScrollTol = $(window).scrollTop();
            if (windowScrollTol > 5) {
                $('header').addClass('scrolling');
            } else {
                $('header').removeClass('scrolling');
            }
        }
    }
    headerChange();
    $(window).scroll(function(){
        headerChange();
    });

    // Оставить заявку
    $('.j-leave-request').click(function(){
        $('.wrapper--shadow').addClass('active');
        if ($(window).width() < 768) {
            $('body').css('position','fixed');
        }
        $('.popup[data-popup="presentation"]').addClass('active');
    });


    // Закрыть всплывающие окна
    $('.popup__close, .wrapper--shadow').click(function(){
        popupClose();
    });

    // Закрыть всплывающие окна
    function popupClose() {
        $('.popup.active form .input--error').hide();
        $('.popup.active form label').removeClass('warning');
        $('.popup.active').removeClass('active');
        $('.wrapper--shadow').removeClass('active');
        if ($(window).width() < 768) {
            $('body').css('position','');
        }
    }


    // Виртуальный колл-центр с готовыми сценариями. Расчет размера фото на первом экране
    // function calcImgSize() {
    //     if($(window).width() < 768) {
    //         var contentPart1 = +(($('main section:first-of-type').css('padding-top')).replace('px',''));
    //         var contentPart2 = $('main section:first-of-type .intro__text').outerHeight(true);
    //         var imgHeight = contentPart1 + contentPart2 + 10;
    //         $('main section:first-of-type .intro__picture').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
    //         if($('main').attr('data-main') == 'call-center') {
    //             var contentPart3 = +(($('main section:first-of-type .intro__picture').css('bottom')).replace('px',''));
    //             imgHeight += contentPart3;
    //             $('main section:first-of-type .intro__picture picture').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
    //             $('main section:first-of-type .intro__picture img').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
    //         }
    //         if($('main').attr('data-main') == 'promotion') {
    //             $('main section:first-of-type .intro__picture video').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
    //         }
    //     }
    // }
    // if($('main').attr('data-main') == 'call-center' || $('main').attr('data-main') == 'promotion') {
    //     calcImgSize();
    // }
    // $(window).resize(function(){
    //     if($('main').attr('data-main') == 'call-center' || $('main').attr('data-main') == 'promotion') {
    //         calcImgSize();
    //     }
    // });
    function calcImgSize() {
        if($(window).width() < 768) {
            var contentPart1 = +(($('main section:first-of-type').css('padding-top')).replace('px',''));
            var contentPart2 = $('main section:first-of-type .intro__text').outerHeight(true);
            var contentPart3 = +(($('main section:first-of-type .intro__picture').css('bottom')).replace('px',''));
            var imgHeight = contentPart1 + contentPart2 + contentPart3 + 10;
            $('main section:first-of-type .intro__picture').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
            $('main section:first-of-type .intro__picture picture').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
            $('main section:first-of-type .intro__picture img').css('max-height', 'calc(100vh - ' + imgHeight + 'px)');
        }
    }
    if($('main').attr('data-main') == 'call-center') {
        calcImgSize();
    }
    $(window).resize(function(){
        if($('main').attr('data-main') == 'call-center') {
            calcImgSize();
        }
    });
});
