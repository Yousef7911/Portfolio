let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links .classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate')
        }
        else {
            sec.classList.remove('show-animate')
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const mediaItems = document.querySelectorAll(".media-item");
    let currentIndex = 0;

    function showMediaItem(index) {
        mediaItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    prevButton.addEventListener("click", function() {
        currentIndex = (currentIndex === 0) ? mediaItems.length - 1 : currentIndex - 1;
        showMediaItem(currentIndex);
    });

    nextButton.addEventListener("click", function() {
        currentIndex = (currentIndex === mediaItems.length - 1) ? 0 : currentIndex + 1;
        showMediaItem(currentIndex);
    });
});

window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
}