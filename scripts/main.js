// Update clock and date
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    
    document.getElementById('panel-date').textContent = `${dateStr} ${hours}:${minutes}:${seconds}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Activities Overview
const activitiesBtn = document.getElementById('btn-activities');
const activitiesOverview = document.getElementById('activities-overview');
const activitiesSearch = document.getElementById('activities-search');

activitiesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activitiesOverview.classList.toggle('active');
    if (activitiesOverview.classList.contains('active')) {
        activitiesSearch.focus();
    }
});

// Close activities overview when clicking outside
activitiesOverview.addEventListener('click', (e) => {
    if (e.target === activitiesOverview) {
        activitiesOverview.classList.remove('active');
    }
});

// Close activities with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activitiesOverview.classList.contains('active')) {
        activitiesOverview.classList.remove('active');
    }
    // Super key (Meta/Windows key) to toggle activities
    if (e.key === 'Meta' || e.key === 'Super') {
        e.preventDefault();
        activitiesOverview.classList.toggle('active');
        if (activitiesOverview.classList.contains('active')) {
            activitiesSearch.focus();
        }
    }
});

// Activities grid click handlers
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => {
        const app = card.getAttribute('data-app');
        activitiesOverview.classList.remove('active');
        openApp(app);
    });
});

// Tab switching functionality
document.querySelectorAll('.window-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        document.querySelectorAll('.window-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Global window dragging state
let draggingWindow = null;
let dragOffset = { x: 0, y: 0 };

// Unified window dragging system
function setupWindowDragging(windowElement) {
    const header = windowElement.querySelector('.window-header');
    if (!header) return;
    
    header.addEventListener('mousedown', (e) => {
        // Don't drag if clicking on window controls
        if (e.target.closest('.window-controls')) return;
        
        // Don't drag if maximized
        if (windowElement.classList.contains('maximized')) return;
        
        draggingWindow = windowElement;
        windowElement.classList.add('dragging');
        
        // Get current position
        const rect = windowElement.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        
        // Remove transform to allow fixed positioning
        windowElement.style.transform = 'none';
        
        // Bring window to front
        bringWindowToFront(windowElement);
        
        e.preventDefault();
    });
}

// Global mouse move handler for all windows
document.addEventListener('mousemove', (e) => {
    if (!draggingWindow) return;
    
    const topPanelHeight = 50;
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - draggingWindow.offsetWidth;
    const maxY = window.innerHeight - draggingWindow.offsetHeight - topPanelHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    draggingWindow.style.left = newX + 'px';
    draggingWindow.style.top = (newY + topPanelHeight) + 'px';
    draggingWindow.style.position = 'fixed';
});

// Global mouse up handler
document.addEventListener('mouseup', () => {
    if (draggingWindow) {
        draggingWindow.classList.remove('dragging');
        draggingWindow = null;
    }
});

// Window Management for NIRD window
const nirdWindow = document.getElementById('nird-window');
const minimizeBtn = nirdWindow.querySelector('.window-btn.minimize');
const maximizeBtn = nirdWindow.querySelector('.window-btn.maximize');
const closeBtn = nirdWindow.querySelector('.window-btn.close');

let nirdMaximized = false;

setupWindowDragging(nirdWindow);

// Window controls
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nirdWindow.style.display = 'none';
});

minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const content = nirdWindow.querySelector('.window-content');
    content.style.display = content.style.display === 'none' ? 'flex' : 'none';
});

maximizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nirdMaximized) {
        // Restore
        nirdWindow.classList.remove('maximized');
        nirdWindow.style.left = '';
        nirdWindow.style.top = '';
        nirdWindow.style.position = 'absolute';
        nirdWindow.style.transform = 'translate(-50%, -50%)';
        maximizeBtn.textContent = '□';
        nirdMaximized = false;
    } else {
        // Maximize
        nirdWindow.classList.add('maximized');
        nirdWindow.style.left = '0';
        nirdWindow.style.top = '50px';
        nirdWindow.style.position = 'fixed';
        nirdWindow.style.transform = 'none';
        maximizeBtn.textContent = '❐';
        nirdMaximized = true;
    }
    bringWindowToFront(nirdWindow);
});

// Bring window to front
function bringWindowToFront(window) {
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });
    window.classList.add('active');
}

// Click on window to bring to front
nirdWindow.addEventListener('mousedown', () => {
    bringWindowToFront(nirdWindow);
});

// Dock item click handler
// ... existing code ...

// Dock items - open windows
document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
        const app = item.getAttribute('data-app');
        openWindow(app);
        
        document.querySelectorAll('.dock-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Activity cards - open windows
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => {
        const app = card.getAttribute('data-app');
        openWindow(app);
        activitiesOverview.classList.remove('active');
    });
});

// Open window function
function openWindow(app) {
    const windowMap = {
        'nird': 'nird-window',
        'quiz': 'quiz-window',
        'scenario': 'scenario-window',
        'adblocker': 'adblocker-window'
    };

    const windowId = windowMap[app];
    if (windowId) {
        const windowElement = document.getElementById(windowId);
        if (windowElement) {
            windowElement.style.display = 'flex';
            bringWindowToFront(windowElement);
            
            // Load AdBlocker content if it's the adblocker window
            if (app === 'adblocker') {
                loadAdBlockerContent();
            }
        }
    }
}

// Load AdBlocker popup from external directory
function loadAdBlockerContent() {
    const iframe = document.getElementById('adblocker-iframe');
    const placeholder = document.getElementById('adblocker-placeholder');
    
    // Use relative path based on current directory structure
    const popupPath = '../../../Nettoyez-le-web-comme-VOUS-l-entendez/popup.html';
    
    iframe.src = popupPath;
    
    iframe.onload = function() {
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
    };
    
    iframe.onerror = function() {
        placeholder.innerHTML = '<p>❌ Impossible de charger le contenu AdBlocker. Vérifiez le chemin du fichier.</p>';
    };
}

// ... rest of existing code ...

// Progress Tracking System
let userProgress = {
    score: 0,
    achievements: [],
    completedQuizzes: 0,
    completedScenarios: 0,
    tabsVisited: []
};

function updateProgress() {
    const totalActivities = 3; // quiz, scenarios, tabs
    let completed = 0;
    
    if (userProgress.completedQuizzes > 0) completed++;
    if (userProgress.completedScenarios > 0) completed++;
    if (userProgress.tabsVisited.length >= 4) completed++;
    
    const progressPercent = (completed / totalActivities) * 100;
    document.getElementById('progress-value').textContent = Math.round(progressPercent) + '%';
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    
    // Update achievements
    updateAchievements();
}

function updateAchievements() {
    const preview = document.getElementById('achievements-preview');
    preview.innerHTML = '';
    
    if (userProgress.completedQuizzes > 0) {
        const badge = document.createElement('span');
        badge.className = 'achievement-badge';
        badge.textContent = '🧩 Quiz complété';
        preview.appendChild(badge);
    }
    if (userProgress.completedScenarios > 0) {
        const badge = document.createElement('span');
        badge.className = 'achievement-badge';
        badge.textContent = '🎯 Scénario terminé';
        preview.appendChild(badge);
    }
    if (userProgress.tabsVisited.length >= 4) {
        const badge = document.createElement('span');
        badge.className = 'achievement-badge';
        badge.textContent = '📚 Explorateur';
        preview.appendChild(badge);
    }
}

// Track tab visits
document.querySelectorAll('.window-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        if (!userProgress.tabsVisited.includes(tabName)) {
            userProgress.tabsVisited.push(tabName);
            updateProgress();
        }
    });
});

// Welcome buttons
const startJourneyBtn = document.getElementById('start-journey');
if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', () => {
        const challengeTab = document.querySelector('[data-tab="challenge"]');
        if (challengeTab) challengeTab.click();
    });
}

const openQuizBtn = document.getElementById('open-quiz');
if (openQuizBtn) {
    openQuizBtn.addEventListener('click', () => {
        openApp('quiz');
    });
}

// Quiz System
const quizQuestions = [
    {
        question: "Quel est l'un des principaux avantages de Linux par rapport à Windows pour les établissements scolaires ?",
        answers: [
            "Gratuit et libre",
            "Plus rapide",
            "Plus coloré",
            "Plus difficile à utiliser"
        ],
        correct: 0,
        points: 10
    },
    {
        question: "Qu'est-ce que la sobriété numérique ?",
        answers: [
            "Utiliser moins d'appareils",
            "Réduire l'impact environnemental du numérique",
            "Ne pas utiliser d'ordinateurs",
            "Utiliser uniquement des smartphones"
        ],
        correct: 1,
        points: 10
    },
    {
        question: "Quel est l'un des trois piliers de NIRD ?",
        answers: [
            "Performance",
            "Inclusion",
            "Vitesse",
            "Modernité"
        ],
        correct: 1,
        points: 10
    },
    {
        question: "Pourquoi le réemploi d'équipements est-il important dans l'approche NIRD ?",
        answers: [
            "C'est moins cher",
            "C'est plus écologique et réduit l'obsolescence programmée",
            "C'est plus rapide",
            "C'est plus moderne"
        ],
        correct: 1,
        points: 10
    },
    {
        question: "Où sont stockées les données avec l'approche NIRD ?",
        answers: [
            "Aux États-Unis",
            "En Chine",
            "En Europe, avec souveraineté des données",
            "Dans le cloud privé uniquement"
        ],
        correct: 2,
        points: 10
    }
];

let currentQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;

// Big Tech companies list (GAFAM + others)
const bigTechCompanies = [
    'Microsoft',
    'Google',
    'Apple',
    'Amazon',
    'Meta (Facebook)',
    'Windows',
    'Office 365',
    'Azure',
    'Teams',
    'OneDrive'
];

function initQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizQuestions.length;
    document.getElementById('quiz-question').textContent = question.question;
    document.getElementById('quiz-score').textContent = quizScore;
    
    const answersDiv = document.getElementById('quiz-answers');
    answersDiv.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-answer';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersDiv.appendChild(button);
    });
    
    document.getElementById('quiz-feedback').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('bigtech-hit').classList.remove('show', 'chase-start');
    const bigTechLogo = document.getElementById('bigtech-logo');
    const numbatChaser = document.getElementById('numbat-chaser');
    const catchEffect = document.getElementById('catch-effect');
    if (bigTechLogo) bigTechLogo.classList.remove('running-away', 'caught');
    if (numbatChaser) numbatChaser.classList.remove('chasing', 'caught');
    if (catchEffect) {
        catchEffect.classList.remove('show');
        catchEffect.style.display = 'none';
    }
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('restart-quiz').style.display = 'none';
    
    updateQuizProgress();
}

function selectAnswer(index) {
    selectedAnswer = index;
    document.querySelectorAll('.quiz-answer').forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === index) btn.classList.add('selected');
    });
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = index === question.correct;
    
    document.querySelectorAll('.quiz-answer').forEach((btn, i) => {
        if (i === question.correct) btn.classList.add('correct');
        if (i === index && !isCorrect) btn.classList.add('incorrect');
        btn.disabled = true;
    });
    
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = isCorrect 
        ? '✓ Correct ! +' + question.points + ' points'
        : '✗ Incorrect. La bonne réponse est : ' + question.answers[question.correct];
    
    if (isCorrect) {
        quizScore += question.points;
        document.getElementById('quiz-score').textContent = quizScore;
        // Show Big Tech company hit animation
        showBigTechHit();
    }
    
    document.getElementById('next-question').style.display = 'block';
}

function showBigTechHit() {
    // Get random Big Tech company
    const randomCompany = bigTechCompanies[Math.floor(Math.random() * bigTechCompanies.length)];
    
    const hitContainer = document.getElementById('bigtech-hit');
    const companyName = document.getElementById('bigtech-name');
    const bigTechLogo = document.getElementById('bigtech-logo');
    const numbatChaser = document.getElementById('numbat-chaser');
    const catchEffect = document.getElementById('catch-effect');
    
    if (!hitContainer || !companyName || !bigTechLogo || !numbatChaser) return;
    
    companyName.textContent = randomCompany;
    
    // Remove all animation classes first to reset
    bigTechLogo.classList.remove('running-away', 'caught', 'start-right');
    numbatChaser.classList.remove('chasing', 'caught', 'start-left');
    catchEffect.classList.remove('show');
    catchEffect.style.display = 'none';
    
    // Reset to starting positions using classes
    bigTechLogo.classList.add('start-right');
    numbatChaser.classList.add('start-left');
    
    // Show container
    hitContainer.classList.add('show');
    
    // Force reflow to ensure starting positions are applied
    void hitContainer.offsetHeight;
    
    // Start chase animation - logo runs away, numbat chases
    setTimeout(() => {
        bigTechLogo.classList.remove('start-right');
        numbatChaser.classList.remove('start-left');
        bigTechLogo.classList.add('running-away');
        numbatChaser.classList.add('chasing');
    }, 100);
    
    // Numbat catches the logo
    setTimeout(() => {
        bigTechLogo.classList.add('caught');
        numbatChaser.classList.add('caught');
        catchEffect.style.display = 'block';
        catchEffect.classList.add('show');
    }, 2100);
    
    // Clean up and hide
    setTimeout(() => {
        hitContainer.classList.remove('show');
        bigTechLogo.classList.remove('running-away', 'caught', 'start-right');
        numbatChaser.classList.remove('chasing', 'caught', 'start-left');
        catchEffect.classList.remove('show');
        catchEffect.style.display = 'none';
    }, 4000);
}

const nextQuestionBtn = document.getElementById('next-question');
if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    });
}

function finishQuiz() {
    document.getElementById('quiz-question').textContent = 'Quiz terminé !';
    document.getElementById('quiz-answers').innerHTML = '';
    document.getElementById('quiz-feedback').classList.remove('show');
    
    const resultDiv = document.createElement('div');
    resultDiv.style.padding = '2rem';
    resultDiv.style.textAlign = 'center';
    resultDiv.innerHTML = `
        <h3 style="color: #E95420; margin-bottom: 1rem;">Résultat : ${quizScore} / ${quizQuestions.length * 10} points</h3>
        <p>Vous avez répondu correctement à ${Math.round(quizScore / 10)} questions sur ${quizQuestions.length}.</p>
    `;
    document.getElementById('quiz-answers').appendChild(resultDiv);
    
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('restart-quiz').style.display = 'block';
    
    userProgress.completedQuizzes++;
    userProgress.score += quizScore;
    updateProgress();
}

const restartQuizBtn = document.getElementById('restart-quiz');
if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
        initQuiz();
    });
}

function updateQuizProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = progress + '%';
}

// Scenario System
document.querySelectorAll('.scenario-card').forEach(card => {
    card.querySelector('button').addEventListener('click', () => {
        const scenarioNum = card.getAttribute('data-scenario');
        startScenario(scenarioNum);
    });
});

function startScenario(num) {
    document.querySelector('.scenario-list').style.display = 'none';
    document.getElementById('scenario-content').style.display = 'block';
    
    const scenarios = {
        '1': {
            title: 'Un collège face à Windows 10',
            steps: [
                {
                    text: "Votre collège doit renouveler 50 licences Windows. Le coût annuel est de 5000€. Que proposez-vous ?",
                    choices: [
                        { text: "Renouveler les licences Windows", result: "Coût : 5000€/an. Dépendance continue aux GAFAM." },
                        { text: "Migrer vers Ubuntu (gratuit)", result: "Excellent choix ! Économie de 5000€/an. Autonomie retrouvée. Formation nécessaire mais support disponible." },
                        { text: "Attendre et voir", result: "Les équipements deviennent obsolètes. Risque de sécurité." }
                    ]
                }
            ]
        },
        '2': {
            title: 'Réemploi d\'équipements',
            steps: [
                {
                    text: "Vous avez 30 ordinateurs de 8 ans considérés comme 'obsolètes'. Que faites-vous ?",
                    choices: [
                        { text: "Les jeter et acheter du neuf", result: "Impact environnemental élevé. Coût : ~15000€. Pas durable." },
                        { text: "Installer Linux et les réutiliser", result: "Parfait ! Linux fonctionne bien sur anciens PC. Économie + écologie. C'est l'approche NIRD !" },
                        { text: "Les stocker dans un placard", result: "Gaspillage de ressources. Pas de solution." }
                    ]
                }
            ]
        },
        '3': {
            title: 'Sobriété numérique',
            steps: [
                {
                    text: "Comment réduire l'impact environnemental du numérique dans votre établissement ?",
                    choices: [
                        { text: "Acheter toujours le dernier matériel", result: "Impact environnemental très élevé. Obsolescence programmée." },
                        { text: "Réutiliser, reconditionner, utiliser Linux", result: "Excellent ! Approche NIRD : réemploi + logiciels libres = sobriété numérique." },
                        { text: "Ne rien changer", result: "Impact environnemental continue d'augmenter." }
                    ]
                }
            ]
        }
    };
    
    const scenario = scenarios[num];
    if (!scenario) return;
    
    const step = scenario.steps[0];
    document.getElementById('scenario-step').innerHTML = `<h4>${scenario.title}</h4><p>${step.text}</p>`;
    
    const choicesDiv = document.getElementById('scenario-choices');
    choicesDiv.innerHTML = '';
    
    step.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'scenario-choice';
        button.textContent = choice.text;
        button.addEventListener('click', () => showScenarioResult(choice.result));
        choicesDiv.appendChild(button);
    });
    
    document.getElementById('scenario-result').classList.remove('show');
}

function showScenarioResult(result) {
    const resultDiv = document.getElementById('scenario-result');
    resultDiv.textContent = result;
    resultDiv.className = 'scenario-result show ' + (result.includes('Excellent') || result.includes('Parfait') ? 'success' : 'info');
    
    userProgress.completedScenarios++;
    updateProgress();
}

const scenarioBackBtn = document.getElementById('scenario-back');
if (scenarioBackBtn) {
    scenarioBackBtn.addEventListener('click', () => {
        document.querySelector('.scenario-list').style.display = 'block';
        document.getElementById('scenario-content').style.display = 'none';
    });
}

// Initialize progress on load
updateProgress();

// Window management for quiz and scenario windows
function setupWindowControls(windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;
    
    const minimizeBtn = windowElement.querySelector('.window-btn.minimize');
    const maximizeBtn = windowElement.querySelector('.window-btn.maximize');
    const closeBtn = windowElement.querySelector('.window-btn.close');
    
    let isMaximized = false;
    
    // Setup dragging
    setupWindowDragging(windowElement);
    
    // Window controls
    closeBtn.addEventListener('click', () => {
        windowElement.style.display = 'none';
    });
    
    minimizeBtn.addEventListener('click', () => {
        const content = windowElement.querySelector('.window-content');
        content.style.display = content.style.display === 'none' ? 'flex' : 'none';
    });
    
    maximizeBtn.addEventListener('click', () => {
        if (isMaximized) {
            windowElement.classList.remove('maximized');
            windowElement.style.left = '';
            windowElement.style.top = '';
            windowElement.style.position = 'absolute';
            windowElement.style.transform = 'translate(-50%, -50%)';
            maximizeBtn.textContent = '□';
            isMaximized = false;
        } else {
            windowElement.classList.add('maximized');
            windowElement.style.left = '0';
            windowElement.style.top = '50px';
            windowElement.style.position = 'fixed';
            windowElement.style.transform = 'none';
            maximizeBtn.textContent = '❐';
            isMaximized = true;
        }
        bringWindowToFront(windowElement);
    });
    
    windowElement.addEventListener('mousedown', () => {
        bringWindowToFront(windowElement);
    });
}

setupWindowControls('quiz-window');
setupWindowControls('scenario-window');
setupWindowControls('adblocker-window');
setupWindowDragging(document.getElementById('adblocker-window'));


console.log('NIRD Ubuntu Noble Numbat Desktop - Ready! 🚀');