class AudioManager {
    constructor() {
        this.bgm = null;
        this.sfx = {};
        this.isMuted = false;
    }

    playAmbience(theme) {
        if (this.isMuted) return;
        // console.log(`Playing ambience for theme: ${theme}`);
        // In real impl: Fade out current, Fade in new
        // this.bgm = new Audio(theme === 'theme-horror' ? '/audio/horror_ambience.mp3' : '/audio/happy_bgm.mp3');
        // this.bgm.loop = true;
        // this.bgm.play();
    }

    playTrack(src, fadeDuration = 2000) {
        if (this.isMuted) return;
        console.log(`Playing track: ${src}`);
        // Simulating track play. In a real scenario, this would create an Audio object:
        // const audio = new Audio(src);
        // audio.play();
    }

    playSfx(name) {
        if (this.isMuted) return;
        // console.log(`Playing SFX: ${name}`);
        // const audio = new Audio(\`/audio/\${name}.mp3\`);
        // audio.play();
    }

    typewriterTick() {
        this.playSfx('key_press_dry');
    }

    stopAll() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
        }
    }
}

const audioManager = new AudioManager();
export default audioManager;
