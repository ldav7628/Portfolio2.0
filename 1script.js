$(function () {

    //init image background
    $('#slider .side-l .img-project').each(function () {
        $(this).css('background-image', "url('" + $(this).data('img') + "')");
    });

    var $slider = new Slider('#slider');
    $slider.start()
});

/**
 * SLIDER OBJECT
 * @param {type} element
 * @returns {Slider}
 */
function Slider(element) {
    this.el = $(element);
    this.slides = new Array();
    this.activeSlide = null;
    this.delaySlide = 4;
    this.delayBetweenSlide = 1.95;
    this.startDelay = 0;
    //init
    this.init();
}

Slider.prototype.init = function () {
    var i = 0;
    var $slides = this.slides;
    var $slider = this;
    var $totalSlide = this.el.children('.slide').length;

    // init Slide Object
    this.el.children('.slide').each(function () {
        $slides[i] = new Slide($(this), $slider, $totalSlide, i);
        i++;
    });
    //set active slide
    $slides[0].active = true;
    $slides[0].el.toggleClass('active');
    this.activeSlide = $slides[0];

};

Slider.prototype.start = function () {
    var $activeSlide = this.activeSlide;
    TweenMax.delayedCall(this.startDelay, function () {
        $activeSlide.entry();
    });
};

Slider.prototype.goto = function (index) {
    var $activeSlide = this.activeSlide;
    var $slides = this.slides;


    //remove active slide status
    $activeSlide.active = false;
    $activeSlide.el.toggleClass('active');

    //new active slide
    $activeSlide = $slides[index];
    $activeSlide.active = true;
    $activeSlide.el.toggleClass('active');
    this.activeSlide = $activeSlide;

    //$activeSlide._entering();
    TweenMax.delayedCall(this.delayBetweenSlide, function () {
        $activeSlide.entry();
    });

};

/**
 * SLIDE
 */
function Slide(element, slider, totSlide, index) {
    this.el = element;
    this.totSlide = totSlide;
    this.slider = slider;
    this.index = index;
    this.animationEnter = new TimelineMax();
    this.animationExit = new TimelineMax();
    this.active = false;

    //prepare Animation
    this.prepareAnimationEnter();
    this.prepareAnimationExit();
}
;

Slide.prototype._entering = function () {
    var $lefts = this.el.find('.side-l');
    TweenMax.to($lefts, .85, {ease: Power4.easeInOut, height: '100%'});
};

Slide.prototype.entry = function () {
    this.animationEnter.restart();
};

Slide.prototype.prepareAnimationEnter = function () {
    var self = this;
    var $slider = this.slider;
    var $imageL = this.el.find('.side-l .img-project');
    var $imageR = this.el.find('.side-r .img-project');
    var $heading = this.el.find('.side-r .heading');
    var $subheading = this.el.find('.side-r .subheading');
    var $subheadingSpan = this.el.find('.side-r .subheading span');
    this.animationEnter
            .add("start", 0)
            .add("enterHeading", 1)
            .add("enterSubHeading", 1.8)
            .add("enterSubHeadingSpan", 2.7)
            .to($imageL, .7, {ease: Power4.easeInOut, opacity: 1}, "start")
            .to($imageR, .7, {ease: Power4.easeInOut, opacity: 1}, "start")
            .to($heading, .85, {ease: Power4.easeInOut, opacity: 1, left: 0}, "enterHeading")
            .to($subheading, .85, {ease: Power4.easeInOut, opacity: 1, y: 10}, "enterSubHeading")
            .to($subheadingSpan, .95, {ease: Power4.easeInOut, opacity: 1, y: 10}, "enterSubHeadingSpan")
            .stop();

    this.animationEnter.eventCallback("onComplete", function () {
        TweenMax.delayedCall(self.slider.delaySlide, function () {
            self.exit();
        });
        TweenMax.delayedCall(self.slider.delayBetweenSlide, function () {
            if (self.index === (self.totSlide - 1)) {
                $slider.goto(0);
            } else {
                $slider.goto(self.index + 1);
            }
        });
    });
};

Slide.prototype.exit = function () {
    this.animationExit.restart();
};

Slide.prototype.prepareAnimationExit = function () {
    var self = this;
    var $slider = this.slider;
    var $imageL = this.el.find('.side-l .img-project');
    var $imageR = this.el.find('.side-r .img-project');
    var $heading = this.el.find('.side-r .heading');
    var $subheading = this.el.find('.side-r .subheading');
    var $subheadingSpan = this.el.find('.side-r .subheading span');
    self.animationExit
            .add("start", 0)
            .to($imageL, .65, {ease: Power1.easeInOut, opacity: 0}, "start")
            .to($imageR, .65, {ease: Power1.easeInOut, opacity: 0}, "start")
            .to($heading, .75, {ease: Power1.easeInOut, opacity: 0, left: 0}, "start")
            .to($subheading, .75, {ease: Power1.easeInOut, opacity: 0, y: 10}, "start")
            .to($subheadingSpan, .85, {ease: Power1.easeInOut, opacity: 0, y: 10}, "start")
            .stop();

    self.animationExit.eventCallback("onComplete", function () {

    });
};
