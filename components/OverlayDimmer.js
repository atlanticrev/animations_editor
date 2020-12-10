class OverlayDimmer extends HTMLElement {

    constructor() {
        super();
        this.show = false;
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    static get observedAttributes () {
        return ['show'];
    }

    attributeChangedCallback (name, oldVal, newVal) {
        if (name === 'show') {
            if (oldVal !== newVal) {
                this.show = newVal;
            }
        }
    }

    showOverlay () {
        this.classList.add('show');
        // @todo Why we really need here RAF?
        requestAnimationFrame(() => this.style.setProperty('--opacity', '1'));
        // setTimeout(() => this.style.setProperty('--opacity', '1'));
    }

    hideOverlay () {
        this.addEventListener('transitionend', this.onTransitionEnd);
        this.style.setProperty('--opacity', '0');
    }

    onTransitionEnd () {
        this.classList.remove('show');
        this.removeEventListener('transitionend', this.onTransitionEnd);
    }

}

customElements.define('overlay-dimmer', OverlayDimmer);