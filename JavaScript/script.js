let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    if (menuIcon.classList.contains("ri-menu-4-fill")) {
        menuIcon.classList.replace("ri-menu-4-fill", "ri-close-fill");
    }
    else {
        menuIcon.classList.replace("ri-close-fill", "ri-menu-4-fill");
    }

    navbar.classList.toggle("active");
}

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });

    if (menuIcon.classList.contains("ri-close-fill")) {
        menuIcon.classList.replace("ri-close-fill", "ri-menu-4-fill");
    }
    navbar.classList.remove("active");
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

const modal = document.getElementById('projectModal')
const titleEl = document.getElementById('modalTitle')
const mediaContainer = document.getElementById('mediaContainer')
const summaryEl = document.getElementById('modalSummary')
const featuresEl = document.getElementById('modalFeatures')
const prevBtn = document.getElementById('mediaPrev')
const nextBtn = document.getElementById('mediaNext')
const counter = document.getElementById('mediaCounter')
const closeBtn = document.getElementById('closeModal')

const fullscreen = document.getElementById('fullscreenMedia')
const fsContent = document.getElementById('fsContent')
const fsPrev = document.getElementById('fsPrev')
const fsNext = document.getElementById('fsNext')
const fsClose = document.getElementById('fsClose')
const fsCounter = document.getElementById('fsCounter')

let mediaList = []
let currentIndex = 0

/* =========================
   OPEN PROJECT MODAL
========================= */

document.querySelectorAll('.see-more').forEach(btn => {
    btn.addEventListener('click', () => {

        titleEl.textContent = btn.dataset.title
        summaryEl.textContent = btn.dataset.summary

        featuresEl.innerHTML = ''
        btn.dataset.features.split(',').forEach(f => {
            const li = document.createElement('li')
            li.textContent = f
            featuresEl.appendChild(li)
        })

        mediaList = []

        if (btn.dataset.video) {
            mediaList.push({ type: 'video', src: btn.dataset.video })
        }

        btn.dataset.images.split(',').forEach(img => {
            mediaList.push({ type: 'image', src: img })
        })

        currentIndex = 0
        renderAll()

        modal.classList.add('active')
    })
})

/* =========================
   CORE STATE NAVIGATION
========================= */

function goTo(index) {
    currentIndex = (index + mediaList.length) % mediaList.length
    renderAll()
}

/* =========================
   RENDER NORMAL MODAL
========================= */

function renderMedia() {
    mediaContainer.innerHTML = ''

    const media = mediaList[currentIndex]
    let el

    if (media.type === 'video') {
        el = document.createElement('video')
        el.src = media.src
        el.controls = true
    } else {
        el = document.createElement('img')
        el.src = media.src
    }

    el.className = 'media-item active'
    el.onclick = openFullscreen

    mediaContainer.appendChild(el)
    counter.textContent = `${currentIndex + 1} / ${mediaList.length}`
}

/* =========================
   RENDER FULLSCREEN
========================= */

function renderFullscreen() {
    if (!fullscreen.classList.contains('active')) return

    fsContent.innerHTML = ''

    const media = mediaList[currentIndex]
    let el

    if (media.type === 'video') {
        el = document.createElement('video')
        el.src = media.src
        el.controls = true
        el.autoplay = true
    } else {
        el = document.createElement('img')
        el.src = media.src
    }

    fsContent.appendChild(el)
    fsCounter.textContent = `${currentIndex + 1} / ${mediaList.length}`
}

/* =========================
   RENDER BOTH
========================= */

function renderAll() {
    renderMedia()
    renderFullscreen()
}

/* =========================
   CONTROLS
========================= */

prevBtn.onclick = () => goTo(currentIndex - 1)
nextBtn.onclick = () => goTo(currentIndex + 1)

fsPrev.onclick = () => goTo(currentIndex - 1)
fsNext.onclick = () => goTo(currentIndex + 1)

/* =========================
   OPEN / CLOSE
========================= */

function openFullscreen() {
    fullscreen.classList.add('active')
    renderFullscreen()
}

fsClose.onclick = () => {
    fullscreen.classList.remove('active')
    fsContent.innerHTML = ''
}

closeBtn.onclick = () => {
    modal.classList.remove('active')
    mediaContainer.innerHTML = ''
    fullscreen.classList.remove('active')
    fsContent.innerHTML = ''
}
