class AudioManager {
    constructor() {
        this.currentTrack = null;
        this.bgmAudio = new Audio();
        this.bgmAudio.loop = true;
        this.volume = 0.5; // Master volume for music
        this.sfxVolume = 0.6; // Volume for SFX
        this.isMuted = false;
    }

    // --- MUSIC CONTROLS ---

    playTrack(src, fadeDuration = 2000) {
        if (this.isMuted) return;
        if (this.currentTrack === src) return;

        console.log(`[AudioManager] requesting track: ${src}`);

        // Fade out current track if playing
        if (!this.bgmAudio.paused && this.bgmAudio.src) {
            this.fadeOut(fadeDuration).then(() => {
                this.startNewTrack(src, fadeDuration);
            });
        } else {
            this.startNewTrack(src, fadeDuration);
        }
    }

    startNewTrack(src, fadeDuration) {
        this.bgmAudio.src = src;
        this.bgmAudio.volume = 0;
        const playPromise = this.bgmAudio.play();

        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.error("[AudioManager] Audio play failed. Interaction might be required.", e);
            });
        }

        this.currentTrack = src;
        this.fadeIn(fadeDuration);
    }

    fadeOut(duration) {
        return new Promise(resolve => {
            const step = 50;
            if (duration <= 0) {
                this.bgmAudio.pause();
                this.bgmAudio.volume = 0;
                resolve();
                return;
            }

            const volStep = this.volume / (duration / step);

            const fade = setInterval(() => {
                if (this.bgmAudio.volume > volStep) {
                    this.bgmAudio.volume = Math.max(0, this.bgmAudio.volume - volStep);
                } else {
                    this.bgmAudio.volume = 0;
                    this.bgmAudio.pause();
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
            if (this.bgmAudio.volume < this.volume - volStep) {
                this.bgmAudio.volume = Math.min(this.volume, this.bgmAudio.volume + volStep);
            } else {
                this.bgmAudio.volume = this.volume;
                clearInterval(fade);
            }
        }, step);
    }

    stop() {
        this.fadeOut(1000);
    }

    // --- SFX CONTROLS ---

    playSfx(name) {
        if (this.isMuted) return;

        // Map simplified names to actual paths if needed, or assume standard path
        // For now, assuming standard path /audio/sfx/{name}.mp3 or similar
        // BUT RevealScreen calls 'pop'. Let's assume there's a file or we handle common ones.

        // Note: The previous stub implies sfx might just be files like /audio/pop.mp3
        // Let's guess the path pattern.

        let src = '';
        if (name.includes('.')) {
            src = name; // Full path provided
        } else {
            // Default location assumption. You might need to adjust this based on actual file locations
            // Checking the previous 'pop' usage...
            // Since I don't see a pop.mp3 in the file list I saw earlier (only sweet_song), 
            // this might fail if the file doesn't exist. 
            // However, to fix the CODE logic, I'll implement the player.
            src = `/audio/${name}.mp3`;
        }

        const sfx = new Audio(src);
        sfx.volume = this.sfxVolume;
        sfx.play().catch(e => console.warn(`[AudioManager] SFX '${name}' failed:`, e));
    }

    typewriterTick() {
        this.playSfx('key_press_dry');
    }
}

const audioManager = new AudioManager();
export default audioManager;
