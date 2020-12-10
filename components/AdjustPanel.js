class AdjustPanel extends HTMLElement {

    constructor() {
        super();
        this.show = false;
        this.showPanel = this.showPanel.bind(this);
        this.hidePanel = this.hidePanel.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    static get observedAttributes () {
        return ['show'];
    }

    connectedCallback () {

        this.template = `
            <section>
                <h2>Edit animation</h2>
            </section> 
            <section>
                <button class="start-button">Start</button>
                <button class="stop-button">Stop</button>
            </section> 
            <section>
                <button class="close-button">Close</button>
            </section>
        `.trim();

        this.innerHTML = this.template;

        this.overlay = document.createElement('overlay-dimmer');
        document.body.appendChild(this.overlay);

        this.startBtn = this.querySelector('.start-button');
        this.stopBtn = this.querySelector('.stop-button');
        this.closeBtn = this.querySelector('.close-button');

        this.addEventListener('click', this.onClick);
        document.querySelector('main').addEventListener('click', this.showPanel);

        // @todo Move to the right place
        window.addEventListener('EVENT_START_ANIMATION', () => renderer.startRender());
        window.addEventListener('EVENT_STOP_ANIMATION', () => renderer.stopRender());
    }

    disconnectedCallback () {
        this.removeEventListener('click', this.onClick);
        document.querySelector('main').removeEventListener('click', this.showPanel);

        // @todo Move to the right place
        window.removeEventListener('EVENT_START_ANIMATION', () => renderer.startRender());
        window.removeEventListener('EVENT_STOP_ANIMATION', () => renderer.stopRender());
    }

    attributeChangedCallback (name, oldVal, newVal) {
        if (name === 'show') {
            if (oldVal !== newVal) {
                this.show = newVal;
            }
        }
    }

    showPanel () {
        this.overlay.showOverlay();
        this.style.setProperty('--transform', '0');
    }

    hidePanel () {
        this.overlay.hideOverlay();
        this.style.setProperty('--transform', '100%');
    }

    onClick (e) {
        if (e.target === this.closeBtn) {
            this.hidePanel();
        } else if (e.target === this.startBtn) {
            this.dispatchEvent(new CustomEvent('EVENT_START_ANIMATION', { bubbles: true }));
        } else if (e.target === this.stopBtn) {
            this.dispatchEvent(new CustomEvent('EVENT_STOP_ANIMATION', { bubbles: true }));
        }
    }

}

customElements.define('adjust-panel', AdjustPanel);