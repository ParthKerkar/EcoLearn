// EcoLearn Platform - JavaScript Logic
// Manages login flow, student dashboard interactions, teacher dashboard, and gamification

// ===== GLOBAL STATE =====
let currentUser = {
    role: null,
    ecoPoints: 750,
    completedLessons: 8,
    totalLessons: 12,
    badges: ['eco-warrior', 'quiz-master']
};

let gameData = {
    pendingSubmissions: [
        {
            id: 1,
            student: "Alex Green",
            challenge: "Recycling Project", 
            description: "Created a compost bin from recycled materials",
            status: "pending",
            date: "2024-01-15"
        },
        {
            id: 2,
            student: "Maya Earth",
            challenge: "Garden Project",
            description: "Started a small herb garden on balcony",
            status: "pending", 
            date: "2024-01-14"
        }
    ]
};

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

function updateEcoPoints(points) {
    currentUser.ecoPoints += points;
    
    // Update all point displays
    const pointsDisplays = ['ecoPointsCounter', 'leaderboardPoints'];
    pointsDisplays.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = currentUser.ecoPoints;
        }
    });
    
    updateVillageProgress();
}

function updateVillageProgress() {
    const points = currentUser.ecoPoints;
    let stage, icon, description, nextMilestone, progress;
    
    if (points >= 1000) {
        stage = "Solar Village";
        icon = "☀️";
        description = "Your village runs on clean energy!";
        nextMilestone = "2000 pts";
        progress = ((points - 1000) / 1000) * 100;
    } else if (points >= 500) {
        stage = "Eco Huts";
        icon = "🏡";
        description = "Sustainable homes are growing!";
        nextMilestone = "1000 pts";
        progress = ((points - 500) / 500) * 100;
    } else if (points >= 100) {
        stage = "Growing Forest";
        icon = "🌳";
        description = "Trees are flourishing!";
        nextMilestone = "500 pts";
        progress = ((points - 100) / 400) * 100;
    } else {
        stage = "Seedling Stage";
        icon = "🌱";
        description = "Your journey begins!";
        nextMilestone = "100 pts";
        progress = (points / 100) * 100;
    }
    
    // Update village display elements
    const villageElements = {
        'villageIcon': icon,
        'villageStage': stage,
        'villageDescription': description,
        'nextMilestone': nextMilestone
    };
    
    Object.entries(villageElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    const villageProgressBar = document.getElementById('villageProgress');
    if (villageProgressBar) {
        villageProgressBar.style.width = Math.min(progress, 100) + '%';
    }
}

// ===== LOGIN PAGE FUNCTIONS =====
function showLoginForm(role) {
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    
    const title = document.getElementById('loginTitle');
    title.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;
    
    // Store selected role
    currentUser.role = role;
}

function showRoleSelection() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('roleSelection').classList.remove('hidden');
    currentUser.role = null;
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login success
    showToast('Login successful!');
    
    // Redirect based on role
    setTimeout(() => {
        if (currentUser.role === 'student') {
            window.location.href = 'student.html';
        } else {
            window.location.href = 'teacher.html';
        }
    }, 1500);
}

// ===== STUDENT DASHBOARD FUNCTIONS =====
function openQuizModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeQuizModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Reset quiz state
    const answers = document.querySelectorAll('#quizModal button[onclick*="selectAnswer"]');
    answers.forEach(btn => {
        btn.classList.remove('border-green-500', 'bg-green-100', 'border-red-500', 'bg-red-100');
        btn.classList.add('border-gray-200');
    });
}

function selectAnswer(button, isCorrect) {
    // Remove previous selections
    const allAnswers = document.querySelectorAll('#quizModal button[onclick*="selectAnswer"]');
    allAnswers.forEach(btn => {
        btn.classList.remove('border-green-500', 'bg-green-100', 'border-red-500', 'bg-red-100');
        btn.classList.add('border-gray-200');
    });
    
    // Style the selected answer
    if (isCorrect) {
        button.classList.remove('border-gray-200');
        button.classList.add('border-green-500', 'bg-green-100');
        
        setTimeout(() => {
            updateEcoPoints(5);
            showToast('+5 eco-points earned! Correct answer!');
            closeQuizModal();
        }, 1000);
    } else {
        button.classList.remove('border-gray-200');
        button.classList.add('border-red-500', 'bg-red-100');
        
        setTimeout(() => {
            showToast('Incorrect answer. Try again!', 'error');
        }, 1000);
    }
}

function openChallengeModal() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeChallengeModal() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Reset form
    document.getElementById('challengeDescription').value = '';
    document.getElementById('photoPreview').classList.add('hidden');
}

function previewPhoto(input) {
    const preview = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            preview.classList.remove('hidden');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

function submitChallenge() {
    const description = document.getElementById('challengeDescription').value;
    const photoInput = document.getElementById('challengePhoto');
    
    if (!description || !photoInput.files[0]) {
        showToast('Please add both a photo and description', 'error');
        return;
    }
    
    // Simulate submission
    showToast('Challenge submitted for teacher review!');
    closeChallengeModal();
    
    // Add to pending submissions (for teacher view simulation)
    gameData.pendingSubmissions.push({
        id: Date.now(),
        student: "You",
        challenge: "Photo Challenge",
        description: description,
        status: "pending",
        date: new Date().toISOString().split('T')[0]
    });
}

// ===== TEACHER DASHBOARD FUNCTIONS =====
function approveSubmission(submissionId) {
    const submission = gameData.pendingSubmissions.find(s => s.id === submissionId);
    if (submission) {
        submission.status = 'approved';
        
        // Update UI
        const submissionElement = document.querySelector(`[data-submission="${submissionId}"]`);
        if (submissionElement) {
            submissionElement.style.backgroundColor = '#f0f9ff';
            submissionElement.style.borderColor = '#16a34a';
            
            const statusBadge = submissionElement.querySelector('.bg-yellow-100');
            if (statusBadge) {
                statusBadge.className = 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium';
                statusBadge.textContent = 'Approved';
            }
            
            // Hide action buttons
            const actionButtons = submissionElement.querySelector('.flex.space-x-3.ml-4');
            if (actionButtons) {
                actionButtons.style.display = 'none';
            }
        }
        
        updatePendingCount();
        showToast(`Submission approved! Student awarded 20 eco-points.`);
    }
}

function rejectSubmission(submissionId) {
    const submission = gameData.pendingSubmissions.find(s => s.id === submissionId);
    if (submission) {
        submission.status = 'rejected';
        
        // Update UI
        const submissionElement = document.querySelector(`[data-submission="${submissionId}"]`);
        if (submissionElement) {
            submissionElement.style.backgroundColor = '#fef2f2';
            submissionElement.style.borderColor = '#ef4444';
            
            const statusBadge = submissionElement.querySelector('.bg-yellow-100');
            if (statusBadge) {
                statusBadge.className = 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium';
                statusBadge.textContent = 'Rejected';
            }
            
            // Hide action buttons
            const actionButtons = submissionElement.querySelector('.flex.space-x-3.ml-4');
            if (actionButtons) {
                actionButtons.style.display = 'none';
            }
        }
        
        updatePendingCount();
        showToast('Submission rejected.');
    }
}

function approveAll() {
    const pendingSubmissions = gameData.pendingSubmissions.filter(s => s.status === 'pending');
    
    pendingSubmissions.forEach(submission => {
        approveSubmission(submission.id);
    });
    
    if (pendingSubmissions.length > 0) {
        showToast(`Approved ${pendingSubmissions.length} submissions!`);
    }
}

function updatePendingCount() {
    const pendingCount = gameData.pendingSubmissions.filter(s => s.status === 'pending').length;
    const countElement = document.getElementById('pendingCount');
    if (countElement) {
        countElement.textContent = pendingCount;
    }
}

function exportData() {
    showToast('CSV report generated successfully!');
    
    // Simulate CSV download
    const csvContent = "Student,Challenge,Status,Date\n" +
        gameData.pendingSubmissions.map(s => 
            `${s.student},${s.challenge},${s.status},${s.date}`
        ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ecolearn_submissions.csv';
    link.click();
    window.URL.revokeObjectURL(url);
}

function generateReport() {
    showToast('Detailed progress report generated!');
    // Implement detailed report generation logic
}

function viewAnalytics() {
    showToast('Analytics dashboard opened!');
    // Implement analytics view logic
}

// ===== GENERAL FUNCTIONS =====
function logout() {
    showToast('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form handler
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Initialize student dashboard
    if (window.location.pathname.includes('student.html')) {
        updateVillageProgress();
    }
    
    // Initialize teacher dashboard
    if (window.location.pathname.includes('teacher.html')) {
        updatePendingCount();
    }
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const modals = ['quizModal', 'challengeModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal && !modal.classList.contains('hidden')) {
                    if (modalId === 'quizModal') closeQuizModal();
                    if (modalId === 'challengeModal') closeChallengeModal();
                }
            });
        }
    });
});

// Add smooth animations for enhanced UX
function addAnimationClass(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    });
}

// Enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover sound effects (subtle feedback)
    const interactiveElements = document.querySelectorAll('button, .cursor-pointer');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'all 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Progressive loading for better performance
window.addEventListener('load', function() {
    // Hide loading states and show content
    document.body.style.opacity = '1';
    
    // Initialize any lazy-loaded content
    const lazyElements = document.querySelectorAll('.lazy');
    lazyElements.forEach(element => {
        element.classList.add('animate-fade-in');
    });
});

console.log('EcoLearn Platform initialized successfully! 🌱');