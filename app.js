// Cubicle Cat App Controller

let cat;

function init() {
    const container = document.getElementById('cat-container');
    
    // Load saved settings
    const savedSettings = localStorage.getItem('cubiclecat-settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    
    cat = new CubicleCat(container, {
        autoActions: settings.autoActions !== false,
        frequency: settings.frequency || 30,
        name: settings.name || 'Whiskers',
        color: settings.color || 'orange'
    });
    
    // Apply saved color
    if (settings.color) {
        cat.setColor(settings.color);
        document.querySelector(`.color-btn[data-color="${settings.color}"]`)?.classList.add('active');
    }
    
    // Apply saved settings to UI
    document.getElementById('auto-actions').checked = settings.autoActions !== false;
    document.getElementById('frequency').value = settings.frequency || 30;
    document.getElementById('frequency-value').textContent = (settings.frequency || 30) + 's';
    document.getElementById('cat-name').value = settings.name || 'Whiskers';
    
    // Update stats display
    updateStatsDisplay();
    
    // Event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Auto actions toggle
    document.getElementById('auto-actions').addEventListener('change', (e) => {
        cat.options.autoActions = e.target.checked;
        if (e.target.checked) {
            cat.startAutoActions();
        } else {
            cat.stopAutoActions();
        }
        saveSettings();
    });
    
    // Frequency slider
    document.getElementById('frequency').addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('frequency-value').textContent = val + 's';
        cat.setFrequency(val);
        saveSettings();
    });
    
    // Cat name
    document.getElementById('cat-name').addEventListener('change', (e) => {
        cat.options.name = e.target.value;
        saveSettings();
    });
    
    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const color = btn.dataset.color;
            cat.setColor(color);
            cat.options.color = color;
            saveSettings();
        });
    });
}

// Global action function for button clicks
function catAction(action) {
    cat.doAction(action);
    updateStatsDisplay();
}
window.catAction = catAction;

function updateStatsDisplay() {
    const stats = cat.getStats();
    document.getElementById('stat-meows').textContent = stats.meows;
    document.getElementById('stat-naps').textContent = stats.naps;
    document.getElementById('stat-knocked').textContent = stats.knocked;
    document.getElementById('stat-judged').textContent = stats.judged;
}

function saveSettings() {
    const settings = {
        autoActions: cat.options.autoActions,
        frequency: cat.options.frequency,
        name: cat.options.name,
        color: cat.options.color
    };
    localStorage.setItem('cubiclecat-settings', JSON.stringify(settings));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Update stats periodically
setInterval(updateStatsDisplay, 5000);
