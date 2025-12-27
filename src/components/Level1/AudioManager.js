class AudioManager {
    constructor() {
        this.currentTrack = null;
        this.audio = new Audio();
        this.audio.loop = true;
        this.volume = 0.5;
    }

    playTrack(src, fadeDuration = 2000) {
        if (this.currentTrack === src) return;

        // Fade out current track if playing
        if (!this.audio.paused) {
            this.fadeOut(fadeDuration).then(() => {
                this.startNewTrack(src, fadeDuration);
            });
        } else {
            this.startNewTrack(src, fadeDuration);
        }
    }

    startNewTrack(src, fadeDuration) {
        this.audio.src = src;
        this.audio.volume = 0;
        this.audio.play().catch(e => console.error("Audio play failed:", e));
        this.currentTrack = src;
        this.fadeIn(fadeDuration);
    }

    fadeOut(duration) {
        return new Promise(resolve => {
            const step = 50;
            const volStep = this.volume / (duration / step);

            const fade = setInterval(() => {
                if (this.audio.volume > volStep) {
                    this.audio.volume -= volStep;
                } else {
                    this.audio.volume = 0;
                    this.audio.pause();
                    clearInterval(fade);
                    resolve();
                }
            }, step);
        });
    }

    fadeIn(duration) {
        const step = 50;
        const volStep = this.volume / (duration / step);

        const fade = setInterval(() => {
            if (this.audio.volume < this.volume - volStep) {
                this.audio.volume += volStep;
            } else {
                this.audio.volume = this.volume;
                clearInterval(fade);
            }
        }, step);
    }

    stop() {
        this.fadeOut(1000);
    }
}

const audioManager = new AudioManager();
export default audioManager;
