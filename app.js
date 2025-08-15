// MindfulSaathi JavaScript Application

class MindfulSaathi {
    constructor() {
        this.currentLanguage = 'en';
        this.currentSection = 'chat';
        this.selectedMood = null;
        this.moodData = [3, 2, 4, 3, 5, 3, 4]; // Sample mood data for the week
        this.moodChart = null;
        this.conversationContext = [];
        
        this.aiResponses = {
            academic: {
                en: [
                    "I understand the pressure of competitive exams can feel overwhelming. Many students in India face this challenge. What specific aspect is causing you the most stress?",
                    "Academic pressure is very real, especially with entrance exams like JEE, NEET, or board exams. Remember, your worth isn't defined by your marks. What subjects are you finding most challenging?",
                    "It's completely normal to feel stressed about studies. In Indian families, there's often high expectations. Have you been able to talk to anyone about how you're feeling?"
                ],
                hi: [
                    "मैं समझ सकता हूं कि प्रतियोगी परीक्षाओं का दबाव बहुत भारी लग सकता है। भारत में कई छात्र इस चुनौती का सामना करते हैं। कौन सा विशेष पहलू आपको सबसे ज्यादा परेशान कर रहा है?",
                    "शैक्षणिक दबाव वास्तविक है, खासकर जेईई, नीट या बोर्ड परीक्षाओं जैसी प्रवेश परीक्षाओं के साथ। याद रखें, आपकी योग्यता आपके अंकों से नहीं आंकी जाती। कौन से विषय आपको सबसे कठिन लग रहे हैं?"
                ]
            },
            family: {
                en: [
                    "Family expectations can create difficult conflicts, especially in Indian households. Your feelings are completely valid. Would you like to share what's happening at home?",
                    "Family dynamics can be complex, particularly with generational differences in values and expectations. It's okay to feel conflicted. What kind of family issues are you dealing with?",
                    "In joint families, it's common to feel overwhelmed by everyone's opinions. Remember, it's okay to have your own dreams and aspirations. What's causing tension in your family?"
                ],
                hi: [
                    "पारिवारिक अपेक्षाएं कठिन संघर्ष पैदा कर सकती हैं, खासकर भारतीय घरों में। आपकी भावनाएं बिल्कुल वैध हैं। क्या आप बताना चाहेंगे कि घर पर क्या हो रहा है?",
                    "पारिवारिक रिश्ते जटिल हो सकते हैं, खासकर जब मूल्यों और अपेक्षाओं में पीढ़ियों का अंतर हो। द्वंद्व महसूस करना सामान्य है। आप किस तरह की पारिवारिक समस्याओं से जूझ रहे हैं?"
                ]
            },
            career: {
                en: [
                    "Career anxiety is very common among Indian youth, especially with intense competition and family expectations. What career path are you considering, and what's worrying you about it?",
                    "Choosing a career in India can feel overwhelming with so many expectations from family and society. Remember, there's no single 'right' path. What are your interests versus what others expect from you?",
                    "It's natural to feel anxious about your future, especially in today's competitive environment. Many successful people have taken unconventional paths. What's your biggest career concern right now?"
                ],
                hi: [
                    "भारतीय युवाओं में करियर की चिंता बहुत आम है, खासकर तीव्र प्रतिस्पर्धा और पारिवारिक अपेक्षाओं के साथ। आप किस करियर पथ पर विचार कर रहे हैं, और इसके बारे में क्या चिंता है?",
                    "भारत में करियर चुनना परिवार और समाज की इतनी अपेक्षाओं के साथ भारी लग सकता है। याद रखें, कोई एक 'सही' रास्ता नहीं है। आपकी रुचियां क्या हैं बनाम दूसरे आपसे क्या उम्मीद करते हैं?"
                ]
            },
            social: {
                en: [
                    "Social pressure can be really challenging, especially with social media and peer comparisons. You're not alone in feeling this way. What kind of social situations make you feel most uncomfortable?",
                    "Peer pressure and social expectations can be overwhelming. It's important to remember that everyone is fighting their own battles, even if they don't show it. What social pressures are affecting you most?",
                    "Social anxiety is more common than you think, especially among young people today. It's okay to feel overwhelmed by social situations. Would you like to talk about what triggers these feelings?"
                ],
                hi: [
                    "सामाजिक दबाव वास्तव में चुनौतीपूर्ण हो सकता है, खासकर सोशल मीडिया और साथियों की तुलना के साथ। इस तरह महसूस करने में आप अकेले नहीं हैं। कौन सी सामाजिक परिस्थितियां आपको सबसे असहज बनाती हैं?",
                    "साथियों का दबाव और सामाजिक अपेक्षाएं भारी हो सकती हैं। यह याद रखना महत्वपूर्ण है कि हर कोई अपनी लड़ाई लड़ रहा है, भले ही वे इसे न दिखाएं। कौन से सामाजिक दबाव आपको सबसे ज्यादा प्रभावित कर रहे हैं?"
                ]
            },
            general: {
                en: [
                    "I'm here to listen without any judgment. Your mental health is important, and seeking support shows strength, not weakness. What's been on your mind lately?",
                    "Thank you for reaching out. It takes courage to talk about your feelings. I'm here to support you in a safe, confidential space. How can I help you today?",
                    "Every feeling you have is valid. Mental health challenges are common, especially among students and young adults in India. What would you like to talk about?"
                ],
                hi: [
                    "मैं यहां बिना किसी जजमेंट के सुनने के लिए हूं। आपका मानसिक स्वास्थ्य महत्वपूर्ण है, और सहायता मांगना कमजोरी नहीं, ताकत दिखाता है। हाल ही में आपके मन में क्या चल रहा है?",
                    "संपर्क करने के लिए धन्यवाद। अपनी भावनाओं के बारे में बात करने में साहस चाहिए। मैं एक सुरक्षित, गोपनीय स्थान में आपका समर्थन करने के लिए यहां हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
                ]
            }
        };
        
        this.init();
    }

    init() {
        console.log('Initializing MindfulSaathi...');
        this.setupEventListeners();
        this.loadSampleMoodData();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Language toggle clicked');
                this.toggleLanguage();
            });
        }

        // Start chat button - main entry point
        const startChatBtn = document.getElementById('startChatBtn');
        if (startChatBtn) {
            startChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Start chat button clicked');
                this.startApp();
            });
        } else {
            console.error('Start chat button not found!');
        }

        // Learn more button
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Learn more button clicked');
                this.scrollToTestimonials();
            });
        }

        // Navigation buttons
        const navBtns = document.querySelectorAll('.nav-btn');
        console.log(`Found ${navBtns.length} navigation buttons`);
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                console.log(`Navigation clicked: ${section}`);
                this.switchSection(section);
            });
        });

        // Chat functionality
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Quick response buttons
        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const response = e.target.dataset.response;
                this.handleQuickResponse(response);
            });
        });

        // Mood buttons
        const moodBtns = document.querySelectorAll('.mood-btn');
        moodBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectMood(e.target);
            });
        });

        // Save mood button
        const saveMoodBtn = document.getElementById('saveMoodBtn');
        if (saveMoodBtn) {
            saveMoodBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveMood();
            });
        }
    }

    toggleLanguage() {
        console.log('Toggling language from', this.currentLanguage);
        this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
        this.updateLanguageContent();
        
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.textContent = this.currentLanguage === 'en' ? 'हिंदी' : 'English';
        }
    }

    updateLanguageContent() {
        const elements = document.querySelectorAll('[data-en], [data-hi]');
        elements.forEach(element => {
            const content = element.dataset[this.currentLanguage];
            if (content) {
                element.textContent = content;
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-hi]');
        placeholderElements.forEach(element => {
            const placeholder = element.dataset[`placeholder${this.currentLanguage === 'en' ? 'En' : 'Hi'}`];
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
    }

    startApp() {
        console.log('Starting app...');
        
        try {
            // Hide landing page sections
            const landingSection = document.getElementById('landing');
            const statsSection = document.querySelector('.stats-section');
            const testimonialsSection = document.getElementById('testimonials');
            
            if (landingSection) {
                landingSection.style.display = 'none';
                console.log('Hidden landing section');
            }
            
            if (statsSection) {
                statsSection.style.display = 'none';
                console.log('Hidden stats section');
            }
            
            if (testimonialsSection) {
                testimonialsSection.style.display = 'none';
                console.log('Hidden testimonials section');
            }
            
            // Show app interface
            const appInterface = document.getElementById('appInterface');
            if (appInterface) {
                appInterface.classList.remove('hidden');
                appInterface.style.display = 'block';
                console.log('Shown app interface');
            } else {
                console.error('App interface element not found!');
                return;
            }
            
            // Initialize mood chart after interface is shown
            setTimeout(() => {
                this.setupMoodChart();
            }, 100);
            
            // Send initial greeting
            setTimeout(() => {
                this.addAIMessage(this.getRandomResponse('general'));
            }, 1000);
            
        } catch (error) {
            console.error('Error starting app:', error);
        }
    }

    scrollToTestimonials() {
        console.log('Scrolling to testimonials...');
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            testimonialsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Testimonials section not found');
        }
    }

    switchSection(section) {
        console.log('Switching to section:', section);
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-section="${section}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Update sections
        document.querySelectorAll('.app-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const activeSection = document.getElementById(section);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        this.currentSection = section;

        // Initialize section-specific functionality
        if (section === 'mood' && !this.moodChart) {
            setTimeout(() => {
                this.setupMoodChart();
            }, 100);
        }
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (message) {
            console.log('Sending message:', message);
            this.addUserMessage(message);
            messageInput.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Generate AI response after delay
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateAIResponse(message);
                this.addAIMessage(response);
            }, 1500 + Math.random() * 1000);
        }
    }

    handleQuickResponse(responseType) {
        const responses = {
            academic: this.currentLanguage === 'en' ? "I'm feeling overwhelmed with exam pressure" : "मैं परीक्षा के दबाव से परेशान हूं",
            family: this.currentLanguage === 'en' ? "I'm having issues with family expectations" : "मुझे पारिवारिक अपेक्षाओं से समस्या हो रही है",
            career: this.currentLanguage === 'en' ? "I'm anxious about my career choices" : "मैं अपने करियर विकल्पों को लेकर चिंतित हूं",
            social: this.currentLanguage === 'en' ? "I'm struggling with social pressure" : "मैं सामाजिक दबाव से जूझ रहा हूं"
        };

        const message = responses[responseType];
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = message;
            this.sendMessage();
        }
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
            chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
            
            // Add to conversation context
            this.conversationContext.push({ type: 'user', message });
        }
    }

    addAIMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message ai-message';
            messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
            chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
            
            // Add to conversation context
            this.conversationContext.push({ type: 'ai', message });
        }
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <span>Saathi is typing</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Determine response category based on keywords
        let category = 'general';
        
        if (message.includes('exam') || message.includes('study') || message.includes('marks') || 
            message.includes('परीक्षा') || message.includes('पढ़ाई') || message.includes('अंक')) {
            category = 'academic';
        } else if (message.includes('family') || message.includes('parents') || message.includes('home') ||
                  message.includes('परिवार') || message.includes('माता-पिता') || message.includes('घर')) {
            category = 'family';
        } else if (message.includes('career') || message.includes('job') || message.includes('future') ||
                  message.includes('करियर') || message.includes('नौकरी') || message.includes('भविष्य')) {
            category = 'career';
        } else if (message.includes('friends') || message.includes('social') || message.includes('peer') ||
                  message.includes('दोस्त') || message.includes('सामाजिक')) {
            category = 'social';
        }
        
        return this.getRandomResponse(category);
    }

    getRandomResponse(category) {
        const responses = this.aiResponses[category][this.currentLanguage];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    selectMood(button) {
        // Remove previous selection
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selection to clicked button
        button.classList.add('selected');
        this.selectedMood = parseInt(button.dataset.mood);
        console.log('Selected mood:', this.selectedMood);
    }

    saveMood() {
        if (this.selectedMood) {
            console.log('Saving mood:', this.selectedMood);
            
            // Add mood to data
            this.moodData.push(this.selectedMood);
            if (this.moodData.length > 7) {
                this.moodData.shift(); // Keep only last 7 days
            }
            
            // Update chart
            this.updateMoodChart();
            
            // Show success message
            const successMessage = this.currentLanguage === 'en' 
                ? 'Mood saved successfully!' 
                : 'मूड सफलतापूर्वक सेव हुआ!';
            
            this.showNotification(successMessage, 'success');
            
            // Reset selection
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.selectedMood = null;
        } else {
            const errorMessage = this.currentLanguage === 'en' 
                ? 'Please select a mood first!' 
                : 'पहले मूड चुनें!';
            this.showNotification(errorMessage, 'warning');
        }
    }

    setupMoodChart() {
        const ctx = document.getElementById('moodChart');
        if (ctx && !this.moodChart && typeof Chart !== 'undefined') {
            console.log('Setting up mood chart...');
            try {
                this.moodChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: this.currentLanguage === 'en' ? 'Mood Level' : 'मूड स्तर',
                            data: this.moodData,
                            borderColor: '#218CA6',
                            backgroundColor: 'rgba(33, 140, 166, 0.1)',
                            borderWidth: 3,
                            pointBackgroundColor: '#218CA6',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6,
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 5,
                                ticks: {
                                    stepSize: 1,
                                    callback: function(value) {
                                        const moods = ['😰', '😔', '😐', '🙂', '😊'];
                                        return moods[value - 1] || '';
                                    }
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            }
                        }
                    }
                });
                console.log('Mood chart created successfully');
            } catch (error) {
                console.error('Error creating mood chart:', error);
            }
        } else {
            console.log('Chart.js not loaded or chart already exists');
        }
    }

    updateMoodChart() {
        if (this.moodChart) {
            this.moodChart.data.datasets[0].data = this.moodData;
            this.moodChart.update();
        }
    }

    loadSampleMoodData() {
        // Generate sample mood data for the past week
        this.moodData = [];
        for (let i = 0; i < 7; i++) {
            this.moodData.push(Math.floor(Math.random() * 3) + 2); // Random mood between 2-5
        }
        console.log('Sample mood data loaded:', this.moodData);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `status status--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            min-width: 250px;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add CSS for slide in animation
        if (!document.getElementById('notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing MindfulSaathi...');
    try {
        const app = new MindfulSaathi();
        // Make app accessible globally for debugging
        window.mindfulSaathi = app;
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Remove the problematic button click handler that was causing issues
// The button functionality is now handled within the class