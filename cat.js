// Cubicle Cat - Cat Behavior Engine

class CubicleCat {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            autoActions: true,
            frequency: 30,
            name: 'Whiskers',
            color: 'orange',
            ...options
        };
        
        this.stats = {
            meows: 0,
            naps: 0,
            knocked: 0,
            judged: 0
        };
        
        this.state = 'idle';
        this.autoActionTimer = null;
        
        this.actions = [
            'meow', 'sleep', 'play', 'knock', 'judge', 'love',
            'yawn', 'stretch', 'lick', 'stare', 'blink'
        ];
        
        this.loadStats();
        this.init();
    }
    
    init() {
        // Eye tracking
        document.addEventListener('mousemove', (e) => this.trackEyes(e));
        
        // Cat click
        const cat = this.container.querySelector('.cat');
        if (cat) {
            cat.addEventListener('click', () => this.randomAction());
        }
        
        // Start auto actions
        if (this.options.autoActions) {
            this.startAutoActions();
        }
    }
    
    trackEyes(e) {
        const eyeLeft = this.container.querySelector('#eye-left .pupil');
        const eyeRight = this.container.querySelector('#eye-right .pupil');
        
        if (!eyeLeft || !eyeRight || this.state === 'sleeping') return;
        
        const catRect = this.container.querySelector('.cat-face')?.getBoundingClientRect();
        if (!catRect) return;
        
        const catCenterX = catRect.left + catRect.width / 2;
        const catCenterY = catRect.top + catRect.height / 2;
        
        const angle = Math.atan2(e.clientY - catCenterY, e.clientX - catCenterX);
        const distance = Math.min(3, Math.hypot(e.clientX - catCenterX, e.clientY - catCenterY) / 50);
        
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        
        eyeLeft.style.transform = `translate(${moveX}px, ${moveY}px)`;
        eyeRight.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    doAction(action) {
        this.state = action;
        
        switch(action) {
            case 'meow':
                this.meow();
                break;
            case 'sleep':
                this.sleep();
                break;
            case 'play':
                this.play();
                break;
            case 'knock':
                this.knock();
                break;
            case 'judge':
                this.judge();
                break;
            case 'love':
                this.love();
                break;
            case 'yawn':
                this.yawn();
                break;
            case 'stretch':
                this.stretch();
                break;
            case 'lick':
                this.lick();
                break;
            case 'stare':
                this.stare();
                break;
            case 'blink':
                this.blink();
                break;
        }
        
        this.updateStatus(action);
    }
    
    randomAction() {
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        this.doAction(action);
    }
    
    meow() {
        this.stats.meows++;
        this.speak(this.getMeowText());
        this.playMeow();
        this.openMouth();
        setTimeout(() => this.closeMouth(), 500);
        this.saveStats();
    }
    
    getMeowText() {
        const meows = [
            'Meow!', 'Mrrrow!', 'Mew~', '*purr*', 'Meow meow!',
            'Prrrr...', '*chirp*', 'Mraow!', '?', '...meow?'
        ];
        return meows[Math.floor(Math.random() * meows.length)];
    }
    
    playMeow() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);
            
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch(e) {}
    }
    
    sleep() {
        this.stats.naps++;
        this.state = 'sleeping';
        this.speak('💤 zzz...');
        this.closeEyes();
        
        setTimeout(() => {
            this.openEyes();
            this.state = 'idle';
            this.speak('*yawn* 😺');
        }, 5000);
        
        this.saveStats();
    }
    
    play() {
        this.wavePaw();
        this.showEffect('🎾');
        this.speak('*pounce!*');
        
        setTimeout(() => this.stopWave(), 2000);
    }
    
    knock() {
        this.stats.knocked++;
        this.speak(this.getKnockText());
        this.showEffect('📦💥');
        this.wagTail();
        this.saveStats();
    }
    
    getKnockText() {
        const texts = [
            '*pushes thing off desk*',
            'Oops... 😼',
            '*knocks over cup*',
            'Was that important?',
            '*bats at papers*',
            'Mine now. 📦'
        ];
        return texts[Math.floor(Math.random() * texts.length)];
    }
    
    judge() {
        this.stats.judged++;
        this.speak(this.getJudgeText());
        this.narrowEyes();
        
        setTimeout(() => this.normalEyes(), 3000);
        this.saveStats();
    }
    
    getJudgeText() {
        const texts = [
            '*judges silently*',
            '...really?',
            '*disappointed stare*',
            'I expected better.',
            '*sighs in cat*',
            '👀',
            'Hmm.',
            'Are you working or...?'
        ];
        return texts[Math.floor(Math.random() * texts.length)];
    }
    
    love() {
        this.speak(this.getLoveText());
        this.showEffect('❤️');
        this.blink();
    }
    
    getLoveText() {
        const texts = [
            '*headbutt*',
            '*slow blink*',
            'You\'re okay, human.',
            '*purrrr* ❤️',
            '*kneads you*',
            'I love you. Feed me.'
        ];
        return texts[Math.floor(Math.random() * texts.length)];
    }
    
    yawn() {
        this.speak('*yaaawn* 😮');
        this.openMouth();
        setTimeout(() => this.closeMouth(), 1500);
    }
    
    stretch() {
        this.speak('*stretch!*');
        this.showEffect('✨');
    }
    
    lick() {
        this.speak('*lick lick*');
        setTimeout(() => this.speak('*groom groom*'), 1000);
    }
    
    stare() {
        this.speak('...');
        this.wideEyes();
        setTimeout(() => this.normalEyes(), 3000);
    }
    
    blink() {
        this.closeEyes();
        setTimeout(() => this.openEyes(), 200);
    }
    
    // Visual effects
    speak(text) {
        const bubble = this.container.querySelector('#speech-bubble');
        const textEl = this.container.querySelector('#speech-text');
        if (bubble && textEl) {
            textEl.textContent = text;
            bubble.style.display = 'block';
            bubble.style.animation = 'none';
            bubble.offsetHeight; // Reflow
            bubble.style.animation = 'bubblePop 0.3s ease-out';
            
            clearTimeout(this.speechTimeout);
            this.speechTimeout = setTimeout(() => {
                bubble.style.display = 'none';
            }, 3000);
        }
    }
    
    showEffect(emoji) {
        const effect = this.container.querySelector('#action-effect');
        if (effect) {
            effect.textContent = emoji;
            effect.style.display = 'block';
            effect.style.left = (Math.random() * 60 + 20) + '%';
            effect.style.bottom = '120px';
            effect.style.animation = 'none';
            effect.offsetHeight;
            effect.style.animation = 'floatUp 1s ease-out forwards';
            
            setTimeout(() => effect.style.display = 'none', 1000);
        }
    }
    
    openMouth() {
        const mouth = this.container.querySelector('#cat-mouth');
        if (mouth) mouth.classList.add('open');
    }
    
    closeMouth() {
        const mouth = this.container.querySelector('#cat-mouth');
        if (mouth) mouth.classList.remove('open');
    }
    
    closeEyes() {
        const eyes = this.container.querySelectorAll('.cat-eye');
        eyes.forEach(eye => eye.classList.add('closed'));
    }
    
    openEyes() {
        const eyes = this.container.querySelectorAll('.cat-eye');
        eyes.forEach(eye => eye.classList.remove('closed'));
    }
    
    narrowEyes() {
        const eyes = this.container.querySelectorAll('.cat-eye');
        eyes.forEach(eye => eye.style.height = '10px');
    }
    
    wideEyes() {
        const eyes = this.container.querySelectorAll('.cat-eye');
        eyes.forEach(eye => eye.style.height = '22px');
    }
    
    normalEyes() {
        const eyes = this.container.querySelectorAll('.cat-eye');
        eyes.forEach(eye => eye.style.height = '18px');
    }
    
    wavePaw() {
        const paw = this.container.querySelector('#paw-left');
        if (paw) paw.classList.add('wave');
    }
    
    stopWave() {
        const paw = this.container.querySelector('#paw-left');
        if (paw) paw.classList.remove('wave');
    }
    
    wagTail() {
        const tail = this.container.querySelector('#cat-tail');
        if (tail) {
            tail.style.animation = 'none';
            tail.offsetHeight;
            tail.style.animation = 'tailWag 0.3s ease-in-out 5';
        }
    }
    
    setColor(colorName) {
        const colors = {
            orange: '#ff9800',
            gray: '#78909c',
            black: '#37474f',
            white: '#eceff1',
            calico: '#ff9800' // Base color for calico
        };
        
        const color = colors[colorName] || colors.orange;
        this.container.querySelector('.cat-container')?.style.setProperty('--cat-color', color);
    }
    
    updateStatus(action) {
        const statusEl = document.getElementById('cat-status');
        if (!statusEl) return;
        
        const statuses = {
            meow: '😺 Meowing for attention',
            sleep: '😴 Taking a nap...',
            play: '🎾 Feeling playful!',
            knock: '📦 Knocked something over!',
            judge: '👀 Judging you silently',
            love: '❤️ Feeling affectionate',
            yawn: '😮 Getting sleepy',
            stretch: '🐱 Having a stretch',
            lick: '🐱 Grooming time',
            stare: '👀 Staring into your soul',
            blink: '😺 *slow blink*'
        };
        
        statusEl.textContent = statuses[action] || '😺 Watching you work...';
    }
    
    startAutoActions() {
        this.stopAutoActions();
        this.autoActionTimer = setInterval(() => {
            if (this.state !== 'sleeping') {
                this.randomAction();
            }
        }, this.options.frequency * 1000);
    }
    
    stopAutoActions() {
        if (this.autoActionTimer) {
            clearInterval(this.autoActionTimer);
            this.autoActionTimer = null;
        }
    }
    
    setFrequency(seconds) {
        this.options.frequency = seconds;
        if (this.options.autoActions) {
            this.startAutoActions();
        }
    }
    
    saveStats() {
        localStorage.setItem('cubiclecat-stats', JSON.stringify(this.stats));
    }
    
    loadStats() {
        const saved = localStorage.getItem('cubiclecat-stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }
    
    getStats() {
        return this.stats;
    }
}

// Export for use
window.CubicleCat = CubicleCat;
