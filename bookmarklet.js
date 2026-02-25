// Cubicle Cat Bookmarklet
// Add a cat to any webpage!

(function() {
    // Don't add if already present
    if (document.getElementById('cubicle-cat-container')) {
        alert('Cat is already on this page! 🐱');
        return;
    }
    
    // Create cat container
    const container = document.createElement('div');
    container.id = 'cubicle-cat-container';
    container.innerHTML = `
        <style>
            #cubicle-cat-container {
                position: fixed;
                bottom: 0;
                right: 20px;
                z-index: 999999;
                --cat-color: #ff9800;
            }
            #cubicle-cat {
                position: relative;
                width: 60px;
                height: 75px;
                cursor: pointer;
                transition: transform 0.3s;
            }
            #cubicle-cat:hover { transform: scale(1.1); }
            .cc-ear {
                position: absolute;
                width: 0;
                height: 0;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
                border-bottom: 15px solid var(--cat-color);
                top: 0;
            }
            .cc-ear.left { left: 6px; transform: rotate(-15deg); }
            .cc-ear.right { right: 6px; transform: rotate(15deg); }
            .cc-face {
                position: absolute;
                top: 12px;
                left: 4px;
                width: 52px;
                height: 42px;
                background: var(--cat-color);
                border-radius: 50% 50% 45% 45%;
            }
            .cc-eye {
                position: absolute;
                width: 12px;
                height: 14px;
                background: white;
                border-radius: 50%;
                top: 12px;
                overflow: hidden;
            }
            .cc-eye.left { left: 9px; }
            .cc-eye.right { right: 9px; }
            .cc-pupil {
                position: absolute;
                width: 6px;
                height: 9px;
                background: #333;
                border-radius: 50%;
                top: 2px;
                left: 3px;
                transition: all 0.2s;
            }
            .cc-nose {
                position: absolute;
                width: 6px;
                height: 5px;
                background: #ff6f00;
                border-radius: 50% 50% 40% 40%;
                top: 25px;
                left: 50%;
                transform: translateX(-50%);
            }
            .cc-body {
                position: absolute;
                top: 50px;
                left: 8px;
                width: 45px;
                height: 30px;
                background: var(--cat-color);
                border-radius: 25px 25px 0 0;
            }
            .cc-tail {
                position: absolute;
                width: 8px;
                height: 35px;
                background: var(--cat-color);
                border-radius: 4px;
                bottom: 8px;
                right: -10px;
                transform-origin: bottom center;
                animation: cc-wag 2s ease-in-out infinite;
            }
            @keyframes cc-wag {
                0%, 100% { transform: rotate(-30deg); }
                50% { transform: rotate(-50deg); }
            }
            .cc-bubble {
                position: absolute;
                bottom: 85px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 6px 12px;
                border-radius: 15px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.15);
                white-space: nowrap;
                font-size: 12px;
                font-family: system-ui, sans-serif;
                display: none;
            }
            .cc-bubble::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid white;
            }
            .cc-close {
                position: absolute;
                top: -10px;
                right: -10px;
                width: 20px;
                height: 20px;
                background: #ff5252;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 12px;
                line-height: 20px;
                text-align: center;
                display: none;
            }
            #cubicle-cat-container:hover .cc-close {
                display: block;
            }
        </style>
        <div id="cubicle-cat">
            <div class="cc-ear left"></div>
            <div class="cc-ear right"></div>
            <div class="cc-face">
                <div class="cc-eye left"><div class="cc-pupil"></div></div>
                <div class="cc-eye right"><div class="cc-pupil"></div></div>
                <div class="cc-nose"></div>
            </div>
            <div class="cc-body"></div>
            <div class="cc-tail"></div>
        </div>
        <div class="cc-bubble" id="cc-bubble"></div>
        <button class="cc-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(container);
    
    // Cat behaviors
    const bubble = document.getElementById('cc-bubble');
    const cat = document.getElementById('cubicle-cat');
    
    const phrases = [
        'Meow!', '*purr*', '...', '👀', 'Working hard?',
        '*knocks thing over*', '*judges you*', 'Feed me.',
        '*yawn*', 'Nice code!', '🐟?', '*slow blink*'
    ];
    
    function speak(text) {
        bubble.textContent = text;
        bubble.style.display = 'block';
        setTimeout(() => bubble.style.display = 'none', 3000);
    }
    
    cat.addEventListener('click', () => {
        speak(phrases[Math.floor(Math.random() * phrases.length)]);
    });
    
    // Eye tracking
    document.addEventListener('mousemove', (e) => {
        const pupils = document.querySelectorAll('.cc-pupil');
        const rect = cat.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const dist = Math.min(2, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 50);
        
        pupils.forEach(p => {
            p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
        });
    });
    
    // Random actions
    setInterval(() => {
        if (Math.random() < 0.3) {
            speak(phrases[Math.floor(Math.random() * phrases.length)]);
        }
    }, 30000);
    
    speak('Meow! 🐱');
})();
