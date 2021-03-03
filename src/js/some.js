import $ from 'jquery';

$('.js-intro').on('click', function(){
    $("html, body").animate({ scrollTop: $('.intro').offset().top-100 }, 600);
})

$('.js-header__advantages').on('click', function(){
    $("html, body").animate({ scrollTop: $('.advantages').offset().top-100 }, 600);
})

$('.js-header__stages').on('click', function(){
    $("html, body").animate({ scrollTop: $('.stages').offset().top-100 }, 600);
})

$('.js-header__cost').on('click', function(){
    $("html, body").animate({ scrollTop: $('.cost').offset().top-100 }, 600);
})

$('.js-header__jobs-photo').on('click', function(){
    $("html, body").animate({ scrollTop: $('.jobs-photo').offset().top-100 }, 600);
})

$('.js-header__footer').on('click', function(){
    $("html, body").animate({ scrollTop: $('.footer').offset().top-100 }, 600);
})

$('.js-footer__right').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
});

$('.header__burger').click(function(event){
    $('.header__burger, .header__menu, .header__nav').toggleClass('active');
    $('body').toggleClass('lock');
})

$(window).on('scroll', function(){
    let offset = $(window).scrollTop();
    if(offset > 200){
        $('.header__inner').addClass('header__inner_bcg')
        $('.js-footer__right').addClass('active')
    }
    else{
        $('.header__inner').removeClass('header__inner_bcg')
        $('.js-footer__right').removeClass('active')
    }
})

const animItems = document.querySelectorAll('._anim-items');
if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for(let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active')
            } else {
                if(!animItem.classList.contains('_anim-no-hide')){
                    animItem.classList.remove('_active')
                } 
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    animOnScroll();
}


/***popup_start*****/

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 800;

if(popupLinks.length > 0){
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e){
            const popupName = popupLink.getAttribute('data-popup');
            console.log('popupName = ' + popupName)
            const currentPopup = document.getElementById(popupName);
            
            popupOpen(currentPopup);
            e.preventDefault();
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
    for(let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault()
        })
    }
}

function popupOpen(currentPopup){
    if(currentPopup && unlock){
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive, false);
        } else {
            bodyLock()
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e){
            if(!e.target.closest('.popup__content')){
                popupClose(e.target.closest('popup'))
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true){
    if(unlock){
        popupActive.classList.remove('open');
        if(doUnlock){
            bodyUnlock();
        }
    }
}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if(lockPadding > 0){
        for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function(){
        unlock = true
    }, timeout)
}

function bodyUnlock(){
    setTimeout(function(){
        if(lockPadding.length > 0){
            for (let index = 0; index < lockPadding.length; index++){
                const el = lockPadding[index];
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout);
    
    unlock = false;
    setTimeout(function(){
        unlock = true
    }, timeout)
}

document.addEventListener('keydown', function(e){
    if(e.which === 27){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive)
    }
})

/***popup_end*****/
