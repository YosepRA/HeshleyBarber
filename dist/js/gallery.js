class SlideShow {
  constructor(panel) {
    this.panel = panel;
    this.panelWidth = this.panel.clientWidth;
    this.controls = this.panel.querySelectorAll('.slide-control');
    this.controls.forEach(control =>
      control.addEventListener('click', event => this.slideControl(event))
    );
    this.images = this.panel.querySelectorAll('img');
    this.currentImageIndex = 0;
    this.controlToggleHide();
  }

  slideControl(event) {
    let control = event.target;
    let currentImage = this.images[this.currentImageIndex];

    if (control.className.includes('left')) {
      let nextImage = this.images[this.currentImageIndex - 1];
      this.currentImageIndex--;

      // Toggle image active state.
      currentImage.classList.remove('active');
      nextImage.classList.add('active');

      // Scroll
      // If next image's horizontal position is on the left side of panel's mid point.
      if (nextImage.x < this.panelWidth / 2) {
        let imageMidPos = this.panelWidth / 2 - nextImage.offsetWidth / 2;

        this.panel.scrollLeft -= currentImage.offsetWidth;
        // Adjusting slide's position to the center.
        this.panel.scrollLeft += nextImage.x - imageMidPos;
      }
    } else if (control.className.includes('right')) {
      let nextImage = this.images[this.currentImageIndex + 1];
      this.currentImageIndex++;

      // Toggle image active state.
      currentImage.classList.remove('active');
      nextImage.classList.add('active');

      // Scroll
      // If next image's horizontal position is on the right side of panel's mid point.
      if (nextImage.x > this.panelWidth / 2) {
        let imageMidPos = this.panelWidth / 2 - nextImage.offsetWidth / 2;

        this.panel.scrollLeft += currentImage.offsetWidth;
        // Adjusting slide's position to the center.
        this.panel.scrollLeft += nextImage.x - imageMidPos;
      }
    }

    this.controlToggleHide();
  }

  controlToggleHide() {
    for (const control of this.controls) {
      if (control.className.includes('left')) {
        if (this.currentImageIndex === 0) {
          control.style.display = 'none';
        } else {
          control.style.display = '';
        }
      } else if (control.className.includes('right')) {
        if (this.currentImageIndex === this.images.length - 1) {
          control.style.display = 'none';
        } else {
          control.style.display = '';
        }
      }
    }
  }
}

window.addEventListener('load', () => {
  let gallery = new SlideShow(document.querySelector('.slide-panel'));
});
