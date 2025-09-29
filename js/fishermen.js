// Fishermen flow functions
function showFishermen() {
    hideAllPages();
    document.getElementById('fishermanLoginPage').classList.add('active');
}

function showFishermanRegister() {
    hideAllPages();
    document.getElementById('fishermanRegisterPage').classList.add('active');
}

function registerFisherman(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Set fisherman as logged in
    localStorage.setItem('fishermanLoggedIn', 'true');
    
    // Redirect to fishermen dashboard
    window.location.href = 'dashboard.html';
}

function showFishermanLogin(event) {
    if (event) {
        event.preventDefault();
    }
    hideAllPages();
    document.getElementById('fishermanLoginPage').classList.add('active');
}

function showFishermanWelcome(event) {
    if (event) {
        event.preventDefault();
    }
    hideAllPages();
    document.getElementById('fishermanWelcomePage').classList.add('active');
}

function showFishermanTutorial() {
    hideAllPages();
    document.getElementById('fishermanTutorialPage').classList.add('active');
}

function showFishermanDashboard(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Redirect to the fishermen dashboard page
    window.location.href = './pages/fishermen/dashboard.html';
    
    // Set a flag in localStorage to remember user is logged in
    localStorage.setItem('fishermanLoggedIn', 'true');
}

// Logout function
function logoutFisherman() {
    // Clear the login status
    localStorage.removeItem('fishermanLoggedIn');
    // Redirect to login page
    showFishermanLogin();
}
function goToDashBoard() {
 window.location.href = './dashboard.html';
}