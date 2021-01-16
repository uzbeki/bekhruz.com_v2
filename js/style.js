let rotate = "";
const swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  initialSlide: 2,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 30,
    stretch: 1,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  mousewheel: {
    invert: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  loop: true,
});


particlesJS.load('particles-js', 'particles/particles.json', function () {
  console.log('particles started moving');
});



const toggle_intro_text = () => {
  const intro_hidden_text = document.querySelector(".card-text.p2")

  intro_hidden_text.classList.toggle("remaining")
  var see_more_text = document.querySelector("small.text-muted")


  if (see_more_text.innerText == "see more") {
    see_more_text.innerText = "see less"
    see_more_text.nextElementSibling.style["transform"] = "rotate(180deg)"
  } else {
    see_more_text.innerText = "see more"
    see_more_text.nextElementSibling.style["transform"] = "rotate(360deg)"
  }
}



class TxtRotate {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 50) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    this.stop = false;
  }
  tick() {
    if (!this.stop) {

      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 100 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

    }
    setTimeout(function () {
      that.tick();
    }, delta);
  }

  stop_rotating() {
    this.toRotate = null;
    this.el = null;
    this.loopNum = null;
    this.period = null;
    this.stop = true;
  }
}

function start_text_rotation() {
  console.log("text rotation started")
  // text animation effect
  const element = document.querySelector('.txt-rotate');
  const toRotate = element.getAttribute("data-rotate");
  const period = element.getAttribute("data-period");
  if (toRotate) {
    rotate = new TxtRotate(element, JSON.parse(toRotate), period);
  }
}

function stop_text_rotation() {
  console.log("text rotation stopped")
  rotate.stop_rotating();
}


