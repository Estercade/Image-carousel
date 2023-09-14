import './stylesheet.css';
import galleryArray from './modules/gallery.js';
import arrowLeft from './modules/assets/arrow-left-bold.svg';
import arrowRight from './modules/assets/arrow-right-bold.svg';
import circle from './modules/assets/circle.svg';

function populateGallery() {
    const gallery = document.getElementById('gallery');

    for (let i = 0; i < galleryArray.length; i++) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const image = document.createElement('img');
        image.classList.add('image');
        image.id = `image${i}`;
        image.src = galleryArray[i];

        imageWrapper.appendChild(image);
        gallery.appendChild(imageWrapper);
        gallery.classList.add('position0');
    }
}

function nextImage() {
    const gallery = document.getElementById('gallery');

    for (let i = 0; i < gallery.childElementCount; i++) {
        if (gallery.classList.contains(`position${gallery.childElementCount-1}`)) {
            gallery.classList.remove(...gallery.classList);
            gallery.classList.add(`position0`);
            const currentProgressBtn = document.getElementById('progress-button-icon-0');
            const lastProgressBtn = document.getElementById(`progress-button-icon-${gallery.childElementCount-1}`);
            currentProgressBtn.classList.add('progress-button-icon-selected');
            lastProgressBtn.classList.remove('progress-button-icon-selected');
            return;
        } else if (gallery.classList.contains(`position${i}`)) {
            gallery.classList.remove(...gallery.classList);
            gallery.classList.add(`position${++i}`);
            const currentProgressBtn = document.getElementById(`progress-button-icon-${i}`);
            const lastProgressBtn = document.getElementById(`progress-button-icon-${i-1}`);
            currentProgressBtn.classList.add('progress-button-icon-selected');
            lastProgressBtn.classList.remove('progress-button-icon-selected');
            return;
        }
    }
}

function previousImage() {
    const gallery = document.getElementById('gallery');

    for (let i = 0; i < gallery.childElementCount; i++) {
        if (gallery.classList.contains(`position0`)) {
            gallery.classList.remove(...gallery.classList);
            gallery.classList.add(`position${gallery.childElementCount-1}`);
            const currentProgressBtn = document.getElementById(`progress-button-icon-${gallery.childElementCount - 1}`);
            const lastProgressBtn = document.getElementById('progress-button-icon-0');
            currentProgressBtn.classList.add('progress-button-icon-selected');
            lastProgressBtn.classList.remove('progress-button-icon-selected');
            return;
        } else if (gallery.classList.contains(`position${i}`)) {
            gallery.classList.remove(...gallery.classList);
            gallery.classList.add(`position${--i}`);
            const currentProgressBtn = document.getElementById(`progress-button-icon-${i}`);
            const lastProgressBtn = document.getElementById(`progress-button-icon-${i+1}`);
            currentProgressBtn.classList.add('progress-button-icon-selected');
            lastProgressBtn.classList.remove('progress-button-icon-selected');
            return;
        }
    }
}

function createPreviousBtn() {
    const previousBtn = document.createElement('button');
    previousBtn.type = 'button';
    previousBtn.id = 'previous-button';
    
    const previousBtnIcon = document.createElement('img');
    previousBtnIcon.src = arrowLeft;
    previousBtnIcon.alt = 'previous button icon';
    previousBtn.appendChild(previousBtnIcon);

    previousBtn.addEventListener('click', previousImage);

    const btnWrapper = document.getElementById('button-wrapper');
    btnWrapper.appendChild(previousBtn);
}

function createNextBtn() {
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.id = 'next-button';
    
    const nextBtnIcon = document.createElement('img');
    nextBtnIcon.src = arrowRight;
    nextBtnIcon.alt = 'next button icon';
    nextBtn.appendChild(nextBtnIcon);

    nextBtn.addEventListener('click', nextImage);

    const btnWrapper = document.getElementById('button-wrapper');
    btnWrapper.appendChild(nextBtn);
}

function createProgressBar() {
    const progressBarWrapper = document.getElementById('progress-bar-wrapper');

    for (let i = 0; i < galleryArray.length; i++) {
        const progressBtn = document.createElement('button');
        progressBtn.type = 'button';
        progressBtn.classList.add('progress-button');
        progressBtn.id = `progress-button-${i}`;

        const progressBtnIcon = document.createElement('img');
        progressBtnIcon.src = circle;
        progressBtnIcon.alt = 'progress button icon';
        progressBtnIcon.id = `progress-button-icon-${i}`;
        progressBtnIcon.classList.add('progress-button-icon-unselected');
        progressBtn.appendChild(progressBtnIcon);

        progressBtn.addEventListener('click', navigateGallery);

        progressBarWrapper.appendChild(progressBtn);
    }

    // gallery will start with first image selected
    const progressBtnIcon0 = document.getElementById('progress-button-icon-0');
    progressBtnIcon0.classList.add('progress-button-icon-selected');
}

function navigateGallery(e) {
    let target = e.target;

    // ascend nodes until reaching the button
    while (target.type !== 'button') {
        target = target.parentNode;
    }
    const targetImageId = target.id.substring(16);
    
    for (let i = 0; i < document.getElementById('progress-bar-wrapper').childElementCount; i++) {
        let progressBtn = document.getElementById(`progress-button-icon-${i}`);
        progressBtn.classList.remove('progress-button-icon-selected');
    }

    const gallery = document.getElementById('gallery');
    gallery.classList.remove(...gallery.classList);
    gallery.classList.add(`position${targetImageId}`);

    let targetImageIdProgressBtn = document.getElementById(`progress-button-icon-${targetImageId}`);
    targetImageIdProgressBtn.classList.add('progress-button-icon-selected');
}

let timer;

function advanceSlide() {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.onmousemove = () => {
        clearInterval(timer);
        timer = setInterval(nextImage, 5000);
    }
    timer = setInterval(nextImage, 5000);
};

populateGallery();
createPreviousBtn();
createNextBtn();
createProgressBar();
advanceSlide();