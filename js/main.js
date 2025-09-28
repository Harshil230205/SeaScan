// Hide all pages and show the selected one
function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// Show welcome page
function showWelcome() {
    // Always show welcome page regardless of login status
    hideAllPages();
    document.getElementById('welcomePage').classList.add('active');
}

// Show tutorial page
function showTutorial() {
    hideAllPages();
    document.getElementById('tutorialPage').classList.add('active');
}

// Show dashboard page
function showDashboard() {
    hideAllPages();
    document.getElementById('dashboardPage').classList.add('active');
}

// Show scanner page
function showScanner() {
    hideAllPages();
    document.getElementById('scannerPage').classList.add('active');
    
    // Initialize camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: facingMode 
            } 
        })
            .then(function(stream) {
                currentStream = stream;
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.classList.add('w-full', 'h-full', 'object-cover');
                
                const placeholder = document.getElementById('scannerPlaceholder');
                placeholder.innerHTML = '';
                placeholder.appendChild(video);
            })
            .catch(function(error) {
                console.error("Camera error: ", error);
                alert("કેમેરા ઍક્સેસ કરવામાં સમસ્યા આવી. કૃપા કરીને કેમેરા પરવાનગી ચકાસો.");
            });
    } else {
        alert("તમારા ડિવાઇસ પર કેમેરા સપોર્ટ ઉપલબ્ધ નથી.");
    }
}

// Show about page
function showAbout() {
    hideAllPages();
    document.getElementById('aboutPage').classList.add('active');
}

// Capture photo function
function capturePhoto() {
    if (!currentStream) {
        alert("કેમેરા ઉપલબ્ધ નથી. કૃપા કરીને ફરી પ્રયાસ કરો.");
        return;
    }
    
    const video = document.querySelector('#scannerPlaceholder video');
    if (!video) {
        alert("કેમેરા વીડિયો ઉપલબ્ધ નથી. કૃપા કરીને ફરી પ્રયાસ કરો.");
        return;
    }
    
    // Create a canvas element to capture the photo
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Store the captured image
    capturedImage = canvas.toDataURL('image/jpeg');
    
    // Show "Scan complete" message
    const placeholder = document.getElementById('scannerPlaceholder');
    placeholder.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full">
            <img src="${capturedImage}" class="max-h-64 mb-4 rounded-lg" />
            <p class="text-white font-medium mb-2">Scan complete</p>
            <div class="flex space-x-4">
                <button class="bg-gray-200 p-3 rounded-full" onclick="scanAgain()">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                </button>
                <button class="bg-primary p-3 rounded-full" onclick="analyzePhoto()">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Analyze photo function
function analyzePhoto() {
    if (!capturedImage) {
        alert("કોઈ ફોટો કેપ્ચર કરેલ નથી. કૃપા કરીને પહેલા ફોટો કેપ્ચર કરો.");
        return;
    }
    
    // In a real app, you would send the image to a server for analysis
    // For demo purposes, we'll simulate the analysis with a timeout
    
    // Show loading state
    const placeholder = document.getElementById('scannerPlaceholder');
    placeholder.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <p class="text-white font-medium">Analyzing fish...</p>
        </div>
    `;
    
    // Simulate analysis delay
    setTimeout(() => {
        // Hide scanner placeholder and show results
        document.getElementById('scannerPlaceholder').classList.add('hidden');
        document.getElementById('scanResults').classList.remove('hidden');
    }, 2000);
}

// Save the scan result
function saveResult() {
    // Create a saved notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 left-0 right-0 mx-auto w-64 bg-green-100 text-green-800 p-3 rounded-lg text-center shadow-lg';
    notification.innerHTML = `
        <div class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            રિઝલ્ટ સફળતાપૂર્વક સેવ થયું
        </div>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Add to recent scans in dashboard
    const recentScans = document.querySelector('.recent-scans');
    if (recentScans) {
        const newScan = document.createElement('div');
        newScan.className = 'bg-white p-3 rounded-lg shadow mb-3 flex items-center';
        newScan.innerHTML = `
            <div class="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            </div>
            <div class="flex-1">
                <p class="font-medium text-gray-800">Red Snapper</p>
                <p class="text-gray-500 text-sm">આજે, ${new Date().toLocaleTimeString()}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-800 font-medium">95%</p>
                <p class="text-gray-500 text-xs">ફ્રેશનેસ સ્કોર</p>
            </div>
        `;
        
        // Add to the beginning of the list
        if (recentScans.firstChild) {
            recentScans.insertBefore(newScan, recentScans.firstChild);
        } else {
            recentScans.appendChild(newScan);
        }
    }
    
    // Navigate to dashboard after saving
    setTimeout(() => {
        showDashboard();
    }, 1500);
}

// Scan again function
function scanAgain() {
    // Reset captured image
    capturedImage = null;
    
    // Hide results and show scanner placeholder
    document.getElementById('scanResults').classList.add('hidden');
    document.getElementById('scannerPlaceholder').classList.remove('hidden');
    
    // Stop current stream if it exists
    if (currentStream) {
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
        currentStream = null;
    }
    
    // Initialize camera with fresh stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: facingMode 
            } 
        })
        .then(function(stream) {
            currentStream = stream;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.classList.add('w-full', 'h-full', 'object-cover');
            
            const placeholder = document.getElementById('scannerPlaceholder');
            placeholder.innerHTML = '';
            placeholder.appendChild(video);
        })
        .catch(function(error) {
            console.error("Camera error: ", error);
            alert("કેમેરા ઍક્સેસ કરવામાં સમસ્યા આવી. કૃપા કરીને કેમેરા પરવાનગી ચકાસો.");
        });
    } else {
        alert("તમારા ડિવાઇસ પર કેમેરા સપોર્ટ ઉપલબ્ધ નથી.");
    }
}

// Fisherman Pages Navigation Functions
function showFishermanCatchPhoto() {
    hideAllPages();
    document.getElementById('fishermanCatchPhotoPage').classList.add('active');
}

function closeCatchPhoto() {
    document.getElementById('fishermanCatchPhotoPage').classList.remove('active');
    showFishermanDashboard();
}

function captureMore() {
    // Logic to capture more photos
    console.log("Capturing more photos");
}

function showFishermanCatchResult() {
    hideAllPages();
    document.getElementById('fishermanCatchResultPage').classList.add('active');
}

function goBackFromResult() {
    document.getElementById('fishermanCatchResultPage').classList.remove('active');
    showFishermanCatchPhoto();
}

function discardResult() {
    // Logic to discard result
    console.log("Result discarded");
    showFishermanCatchPhoto();
}

function showFishermanHotspots() {
    hideAllPages();
    document.getElementById('fishermanHotspotMapPage').classList.add('active');
    initMap();
}

function goBackFromHotspots() {
    document.getElementById('fishermanHotspotMapPage').classList.remove('active');
    showFishermanDashboard();
}

function initMap() {
    // Code to initialize map with hotspots
    console.log("Map initialized");
}

function zoomIn() {
    // Logic to zoom in map
    console.log("Zooming in");
}

function zoomOut() {
    // Logic to zoom out map
    console.log("Zooming out");
}

function getCurrentLocation() {
    // Logic to center map on current location
    console.log("Getting current location");
}

function showFishermanHistory() {
    hideAllPages();
    document.getElementById('fishermanHistoryPage').classList.add('active');
}

function goBackFromHistory() {
    document.getElementById('fishermanHistoryPage').classList.remove('active');
    showFishermanDashboard();
}

// Common navigation functions
function showHome() {
    hideAllPages();
    showFishermanDashboard();
}

function showHistory() {
    showFishermanHistory();
}

function showHotspots() {
    showFishermanHotspots();
}

function showProfile() {
    // Navigate to profile page
    console.log("Showing profile page");
}

function showFishermanDashboard() {
    hideAllPages();
    document.getElementById('fishermanDashboardPage').classList.add('active');
}

// Toggle flash function
function toggleFlash() {
    const flashButton = document.getElementById('flashButton');
    if (flashButton.classList.contains('bg-gray-200')) {
        flashButton.classList.remove('bg-gray-200');
        flashButton.classList.add('bg-yellow-400');
    } else {
        flashButton.classList.remove('bg-yellow-400');
        flashButton.classList.add('bg-gray-200');
    }
}

// Global variables for camera
let currentStream = null;
let facingMode = "environment"; // Default to back camera
let capturedImage = null;

// Toggle camera function
function toggleCamera() {
    const cameraButton = document.getElementById('cameraButton');
    
    // Stop current stream
    if (currentStream) {
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
    }
    
    // Toggle facing mode
    facingMode = facingMode === "environment" ? "user" : "environment";
    
    // Update button text
    if (facingMode === "user") {
        cameraButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg> Front Camera';
    } else {
        cameraButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg> Back Camera';
    }
    
    // Start new stream with toggled camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: facingMode
            } 
        })
        .then(function(stream) {
            currentStream = stream;
            const video = document.querySelector('#scannerPlaceholder video') || document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.classList.add('w-full', 'h-full', 'object-cover');
            
            const placeholder = document.getElementById('scannerPlaceholder');
            if (!placeholder.contains(video)) {
                placeholder.innerHTML = '';
                placeholder.appendChild(video);
            }
        })
        .catch(function(error) {
            console.error("Camera toggle error: ", error);
            alert("કેમેરા સ્વિચ કરવામાં સમસ્યા આવી. કૃપા કરીને ફરી પ્રયાસ કરો.");
        });
    }
}