function hideSideMenu() {
    const x = document.getElementById("sideMenu");
    x.classList.add("closed")
    x.classList.remove("opened");


}

function showSideMenu() {
    const x = document.getElementById("sideMenu");
    x.classList.remove("closed");
    x.classList.add("opened")
}


function hideMenu() {
    const x = document.getElementById("menu");
    x.classList.remove("alt_opened");
    x.classList.add("alt_closed");
}

function showMenu() {
    const x = document.getElementById("menu");
    x.classList.remove("alt_closed");
    x.classList.add("alt_opened");
}

function toast(e, message) {
    e.preventDefault()
    var x = document.getElementById("toast");
    x.classList.remove("toast_box__hidden");
    x.classList.add("toast_box__show");
    x.innerHTML = message
    setTimeout(function () {
        x.classList.remove("toast_box__show");
        x.classList.add("toast_box__hidden");
    }, 1500);
}

class Carousel {
    constructor(carElem, prev, next) {
        this.carouselItems = carElem.getElementsByClassName("carousel_item");
        this.nextBtn = next;
        this.prevBtn = prev;
        this.currentIndex = 0;
        this.prevItemIndex = this.carouselItems.length - 1;
        this.nextItemIndex = 1;
        this.isSliding = false;
        this.setEventListeners();
    }

    setEventListeners() {
        this.prevBtn.addEventListener("click", () => {
            this.prev()
        });
        this.nextBtn.addEventListener("click", () => {
            this.next()
        });
    }

    next() {
        if (this.isSliding) return;
        this.isSliding = true;
        this.carouselItems[this.nextItemIndex].classList.add("next_carousel_item")
        setTimeout(() => {
            this.carouselItems[this.currentIndex].classList.add("next_carousel_item_translate")
            this.carouselItems[this.nextItemIndex].classList.add("translate_finish")
            this.carouselItems[this.nextItemIndex].classList.add("active_carousel_item")
        });
        setTimeout(() => {
            this.carouselItems[this.nextItemIndex].classList.remove("next_carousel_item", "translate_finish");
            this.carouselItems[this.currentIndex].classList.remove("next_carousel_item_translate", "active_carousel_item");
            this.isSliding = false;
            this.setIndices("NEXT")
        }, 400);
    }

    prev() {
        if (this.isSliding) return;
        this.isSliding = true;
        this.carouselItems[this.prevItemIndex].classList.add("prev_carousel_item");
        setTimeout(() => {
            this.carouselItems[this.currentIndex].classList.add("prev_carousel_item_translate");
            this.carouselItems[this.prevItemIndex].classList.add("translate_finish");
            this.carouselItems[this.prevItemIndex].classList.add("active_carousel_item");
        }, 20);
        setTimeout(() => {
            this.carouselItems[this.prevItemIndex].classList.remove("prev_carousel_item", "translate_finish");
            this.carouselItems[this.currentIndex].classList.remove("prev_carousel_item_translate", "active_carousel_item");
            this.isSliding = false;
            this.setIndices("PREV")
        }, 400);
    }

    setIndices(direction) {
        let index;
        if (direction === "NEXT") {
            index = this.currentIndex === this.carouselItems.length - 1 ? 0 : this.currentIndex + 1;
        }
        if (direction === "PREV") {
            index = this.currentIndex === 0 ? this.carouselItems.length - 1 : this.currentIndex - 1;
        }
        if (index === 0) {
            this.currentIndex = index;
            this.nextItemIndex = index + 1;
            this.prevItemIndex = this.carouselItems.length - 1;
        } else if (index === this.carouselItems.length - 1) {
            this.currentIndex = this.carouselItems.length - 1;
            this.nextItemIndex = 0;
            this.prevItemIndex = this.currentIndex - 1;
        } else {
            this.currentIndex = index;
            this.nextItemIndex = index + 1;
            this.prevItemIndex = index - 1;
        }
    }
}

const slider = new Carousel(
    document.querySelector(".carousel_image_container"),
    document.querySelector(".carousel_left_button"),
    document.querySelector(".carousel_right_button")
);