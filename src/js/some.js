import $ from 'jquery';
import {vmodal} from './vmodal.js';

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
let flagBurgerOpen = false;
$('.menu-burger').on('click', function(){
    if(!flagBurgerOpen){
        $('.header__nav').css("left","1rem");
        flagBurgerOpen = !flagBurgerOpen
    }
    else{
        $('.header__nav').css("left","-15rem");
        flagBurgerOpen = !flagBurgerOpen
    }
    
})



const modalCalled = vmodal({
    content: `
    <div class="call-form">
    <div class="popup__close" data-close="true"></div>
        <div class="call-form__title">Заполните форму чтобы вызвать замерщика <span>бесплатно</span></div>
        <form action="#">
            <input class="call-form__name" type="text" placeholder="Введите Ваше имя">
            <input class="call-form__phone" type="text" placeholder="Введите Ваш телефон">
            <button class="call-form__btn js-call-form__btn" type="submit">Отправить</button>
        </form>
        <div class="call-form__subtitle">Мы не передаём ваши данные третьим лицам</div>
    </div>
    `
});


const modalRecived = vmodal({
    content: `
    <div class="popup">
        <div class="popup__close" data-close="true"></div>
        <div class="popup__title">Спасибо!</div>
        <div class="popup__subtitle">Ваша заявка принята. Мы свяжемся с вами в ближайшее время</div>
    </div>
    `
});

const btnRecived = document.querySelector('.js-call-form__btn');
btnRecived.addEventListener('click', () =>{
    console.log('btnRecived')
    modalRecived.open();
})

const btnCalled = document.querySelector('.js-header__contacts');
btnCalled.addEventListener('click', () =>{
    console.log('btnCalled')
    modalCalled.open();
})

$(window).scroll(function(){
    let offset = $(window).scrollTop();
    if(offset > 400){
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


