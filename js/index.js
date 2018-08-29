/**
 * Created by Administrator on 2018/8/14
 */

/*=============================原生JS s===========================*/
window.onload = function () {
    banner();

};
var banner = function () {
    var timer = null;
    var imgBox = document.querySelector('.img-box');
    var points = document.querySelectorAll('.point-box li');
    var index = 1;  //设置索引值
    var bannerWidth = document.querySelector('.banner').offsetWidth //获取容器的宽度
    var addTransition = function () {
        imgBox.style.transition = 'all, 0.3s';
        imgBox.style.webkitTransition = 'all, 0.3s';
    };
    var clearTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * bannerWidth);
    }, 2000);
    imgBox.addEventListener('transitionend', function () {
        if (index > 8) {
            index = 1;
            clearTransition();
            setTranslateX(-index * bannerWidth)
        } else if (index < 1) {
            index = 8;
            clearTransition();
            setTranslateX(-index * bannerWidth)
        }
        setPoint();
    });
    
    //下方的点
    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now')
        }
        points[index - 1].classList.add('now')
    }

    //添加滑动时间
    var isMove = false;
    var startX = 0;  //定义触摸开始位置
    var distanceX = 0;  //定义滑动距离
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer)
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function (e) {
       distanceX =  e.touches[0].clientX - startX;
        var translateX = -index * bannerWidth + distanceX;
        clearTransition();
        setTranslateX(translateX);
       isMove = true;
    })
    imgBox.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) > bannerWidth / 3){
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * bannerWidth)
            } else {
                addTransition();
                setTranslateX(-index * bannerWidth)
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * bannerWidth);
        }, 2000);
    })
};
/*=============================原生JS e===========================*/


/*============================zepto的使用============================*/
/*
$(function () {
    var $banner = $('.banner')
    var bWidth = $banner.width();
    var $imgBox = $banner.find('ul');
    var $potinBox = $banner.find('ol');
    var $points = $potinBox.find('li');

    var index = 1;
    var animateFn = function () {
        $imgBox.animate(
            {transform: 'translateX('+ (-index * bWidth) +'px)'},
            200,
            function () {
                if (index > 8) {
                    index = 1;
                    $imgBox.css({transform: 'translateX('+(-index * bWidth)+'px)'})
                }else if(index < 1){
                    index = 8;
                    $imgBox.css({transform: 'translateX('+(-index * bWidth)+'px)'})
                }
                /!*点的变化*!/
                $points.removeClass('now').eq(index - 1).addClass('now')
            }
        );
    }
    var timer = setInterval(function () {
        index ++;
        animateFn();

    },5000);

    /!*手势切换*!/
    $imgBox.on('swipeLeft', function () {
        index ++;
        animateFn();
    });
    $imgBox.on('swipeRight', function () {
        index --;
        animateFn();
    })
});*/
