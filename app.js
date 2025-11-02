class MedicalAssessmentApp {
    constructor() {
        this.currentModule = 0;
        this.modules = ['demographics', 'smoking', 'medical-conditions'];
        this.patientData = {};
        this.init();
    }

    init() {
        this.loadModule(this.currentModule);
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('prev-btn').addEventListener('click', () => this.previousModule());
        document.getElementById('next-btn').addEventListener('click', () => this.nextModule());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitData());
    }

    loadModule(moduleIndex) {
        const moduleContainer = document.getElementById('module-container');
        
        switch(moduleIndex) {
            case 0:
                moduleContainer.innerHTML = this.renderDemographics();
                break;
            case 1:
                moduleContainer.innerHTML = this.renderSmokingStatus();
                this.setupSmokingLogic();
                break;
            case 2:
                moduleContainer.innerHTML = this.renderMedicalConditions();
                this.setupMedicalConditionsLogic();
                break;
        }

        this.updateProgress();
        this.updateNavigation();
    }

    renderDemographics() {
        return `
            <div class="module" id="demographics-module">
                <h2>Patient Demographics</h2>
                <form id="demographics-form">
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="1" max="120" required>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    </div>
                </form>
            </div>
        `;
    }

    renderSmokingStatus() {
        return `
            <div class="module" id="smoking-module">
                <h2>Smoking Status</h2>
                <form id="smoking-form">
                    <div class="form-group">
                        <label>What is your smoking status?</label>
                        <div>
                            <input type="radio" id="non-smoker" name="smokingStatus" value="non-smoker" required>
                            <label for="non-smoker">Non-smoker</label>
                        </div>
                        <div>
                            <input type="radio" id="cigarettes" name="smokingStatus" value="cigarettes">
                            <label for="cigarettes">Cigarettes</label>
                        </div>
                        <div>
                            <input type="radio" id="shisha" name="smokingStatus" value="shisha">
                            <label for="shisha">Shisha</label>
                        </div>
                        <div>
                            <input type="radio" id="vape" name="smokingStatus" value="vape">
                            <label for="vape">Vape or E-cig</label>
                        </div>
                        <div>
                            <input type="radio" id="ex-smoker" name="smokingStatus" value="ex-smoker">
                            <label for="ex-smoker">Ex-smoker</label>
                        </div>
                    </div>
                    
                    <!-- Conditional sections will be inserted here by setupSmokingLogic() -->
                    <div id="smoking-details"></div>
                </form>
            </div>
        `;
    }

    setupSmokingLogic() {
        const smokingRadios = document.querySelectorAll('input[name="smokingStatus"]');
        smokingRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.showSmokingDetails(e.target.value);
            });
        });
    }

    showSmokingDetails(smokingType) {
        const detailsContainer = document.getElementById('smoking-details');
        let html = '';

        switch(smokingType) {
            case 'cigarettes':
                html = `
                    <div class="conditional-section">
                        <h3>Cigarette Smoking Details</h3>
                        <div class="form-group">
                            <label for="cigarettesPerDay">How many cigarettes per day?</label>
                            <input type="number" id="cigarettesPerDay" name="cigarettesPerDay" min="1">
                        </div>
                        <div class="form-group">
                            <label for="yearsSmoking">How many years have you been smoking?</label>
                            <input type="number" id="yearsSmoking" name="yearsSmoking" min="1">
                        </div>
                    </div>
                `;
                break;
            case 'shisha':
                html = `
                    <div class="conditional-section">
                        <h3>Shisha Smoking Details</h3>
                        <div class="form-group">
                            <label for="shishaSessionsPerWeek">How many shisha sessions per week?</label>
                            <input type="number" id="shishaSessionsPerWeek" name="shishaSessionsPerWeek" min="1">
                        </div>
                    </div>
                `;
                break;
            case 'vape':
                html = `
                    <div class="conditional-section">
                        <h3>Vape/E-cig Usage Details</h3>
                        <div class="form-group">
                            <label for="vapeUsage">How often do you vape?</label>
                            <select id="vapeUsage" name="vapeUsage">
                                <option value="">Select frequency</option>
                                <option value="occasional">Occasional</option>
                                <option value="daily">Daily</option>
                                <option value="multiple-times-daily">Multiple times daily</option>
                            </select>
                        </div>
                    </div>
                `;
                break;
            case 'ex-smoker':
                html = `
                    <div class="conditional-section">
                        <h3>Ex-smoker Details</h3>
                        <div class="form-group">
                            <label for="yearsSinceQuit">How many years since you quit?</label>
                            <input type="number" id="yearsSinceQuit" name="yearsSinceQuit" min="1">
                        </div>
                    </div>
                `;
                break;
        }

        detailsContainer.innerHTML = html;
    }

    renderMedicalConditions() {
        return `
            <div class="module" id="medical-conditions-module">
                <h2>Medical Conditions</h2>
                <form id="medical-conditions-form">
                    <div class="form-group">
                        <label>Do you have any of the following conditions?</label>
                        <div>
                            <input type="checkbox" id="htn" name="conditions" value="HTN">
                            <label for="htn">Hypertension (HTN)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="ihd" name="conditions" value="IHD">
                            <label for="ihd">Ischemic Heart Disease (IHD)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="hf" name="conditions" value="HF">
                            <label for="hf">Heart Failure (HF)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="dm" name="conditions" value="DM">
                            <label for="dm">Diabetes Mellitus (DM)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="thyroid" name="conditions" value="Thyroid">
                            <label for="thyroid">Thyroid Disorders</label>
                        </div>
                        <div>
                            <input type="checkbox" id="asthma" name="conditions" value="Asthma">
                            <label for="asthma">Asthma</label>
                        </div>
                        <div>
                            <input type="checkbox" id="copd" name="conditions" value="COPD">
                            <label for="copd">COPD</label>
                        </div>
                    </div>
                    
                    <!-- Condition-specific details will be inserted here -->
                    <div id="condition-details"></div>
                </form>
            </div>
        `;
    }

    setupMedicalConditionsLogic() {
        const conditionCheckboxes = document.querySelectorAll('input[name="conditions"]');
        conditionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleConditionDetails(e.target.value, e.target.checked);
            });
        });
    }

    toggleConditionDetails(condition, isChecked) {
        // This will be implemented in Phase 2
        console.log(`Condition ${condition} ${isChecked ? 'checked' : 'unchecked'}`);
    }

    updateProgress() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentModule);
        });
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        prevBtn.disabled = this.currentModule === 0;
        
        if (this.currentModule === this.modules.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    previousModule() {
        if (this.currentModule > 0) {
            this.currentModule--;
            this.loadModule(this.currentModule);
        }
    }

    nextModule() {
        if (this.validateCurrentModule()) {
            this.saveModuleData();
            if (this.currentModule < this.modules.length - 1) {
                this.currentModule++;
                this.loadModule(this.currentModule);
            }
        }
    }

    validateCurrentModule() {
        // Basic validation - to be enhanced
        const currentForm = document.querySelector('form');
        return currentForm.checkValidity();
    }

    saveModuleData() {
        // Save current module data to patientData object
        const form = document.querySelector('form');
        const formData = new FormData(form);
        
        for (let [key, value] of formData.entries()) {
            if (key === 'conditions') {
                if (!this.patientData.conditions) this.patientData.conditions = [];
                this.patientData.conditions.push(value);
            } else {
                this.patientData[key] = value;
            }
        }
        
        console.log('Saved data:', this.patientData);
    }

    async submitData() {
        if (this.validateCurrentModule()) {
            this.saveModuleData();
            
            // Add patient ID and timestamp
            this.patientData.patientId = this.generatePatientId();
            this.patientData.submittedAt = new Date().toISOString();
            
            try {
                await this.sendToGoogleSheets(this.patientData);
                alert('Data submitted successfully!');
                this.resetApp();
            } catch (error) {
                alert('Error submitting data. Please try again.');
                console.error('Submission error:', error);
            }
        }
    }

    generatePatientId() {
        return 'PAT' + Date.now() + Math.random().toString(36).substr(2, 5);
    }

    async sendToGoogleSheets(data) {
    // Replace with your actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzlXiUAgwvsTve5Ty_BYIf_oKXSy_VWRHwTmn_VUrFfiiFew0br9pDan7AOL2Nksh7/exec';
    
    try {
        console.log('Sending data to backend:', data);
        
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Backend response:', result);
        
        if (result.success) {
            return result;
        } else {
            throw new Error(result.error || 'Unknown error from backend');
        }
        
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        
        // Fallback: Store in browser localStorage if backend fails
        this.storeLocalBackup(data);
        
        throw new Error(`Failed to submit data: ${error.message}`);
    }
}

// Backup method to store data locally if backend is unavailable
storeLocalBackup(data) {
    try {
        const backups = JSON.parse(localStorage.getItem('patientDataBackups') || '[]');
        backups.push({
            ...data,
            backupTimestamp: new Date().toISOString()
        });
        localStorage.setItem('patientDataBackups', JSON.stringify(backups));
        console.log('Data backed up locally. Total backups:', backups.length);
    } catch (error) {
        console.error('Failed to backup locally:', error);
    }
}

// Method to retry failed submissions
async retryFailedSubmissions() {
    try {
        const backups = JSON.parse(localStorage.getItem('patientDataBackups') || '[]');
        const successfulRetries = [];
        
        for (const backup of backups) {
            try {
                await this.sendToGoogleSheets(backup);
                successfulRetries.push(backup);
            } catch (error) {
                console.error('Failed to retry backup:', error);
            }
        }
        
        // Remove successfully retried backups
        const remainingBackups = backups.filter(backup => 
            !successfulRetries.includes(backup)
        );
        localStorage.setItem('patientDataBackups', JSON.stringify(remainingBackups));
        
        console.log(`Retried ${successfulRetries.length} backups. ${remainingBackups.length} remaining.`);
        
    } catch (error) {
        console.error('Error retrying submissions:', error);
    }
}

    resetApp() {
        this.currentModule = 0;
        this.patientData = {};
        this.loadModule(this.currentModule);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MedicalAssessmentApp();
});
