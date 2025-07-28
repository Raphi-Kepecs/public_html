class AICookap {
    constructor() {
        this.apiKey = localStorage.getItem('geminiApiKey') || '';
        this.initializeElements();
        this.bindEvents();
        this.LoadApiKey();
    }

    initializeElements() {
        this.apiKeyinput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');

        this.ingredientsInput = document.getElementById('ingredients');
        this.dietarySelect = document.getElementById('dietary');
        this.cuisineSelect = document.getElementById('cuisine')

        this.generateBtn = document.getElementById('generateRecipe');
        this.loading = document.getElementById('loading');
        this.recipeSection = document.getElementById('recipeSection');
        this.recipeContent = document.getElementById('recipeContent');
    }

    bindEvents() {
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.generateBtn.addEventListener('click', () => this.generateRecipe());

        this.apiKeyinput.addEventListener('keypress', (e) => {
            if (e.key == 'Enter') this.saveApiKey
        });

        this.ingredientsInput.addEventListener('keypress', (e) => {
            if ((e.key == 'Enter' || e.key == '\n') && e.ctrlKey)
                this.generateRecipe();
        });
    }

    LoadApiKey() {
        if (this.apiKey) {
            this.apiKeyinput.value = this.apiKey;
            this.updateApiKeyStatus(true);
        }

    }

    updateApiKeyStatus(isValid) {
        constant = this.saveApiKeyBtn;
        if (isValid) {
            btn.textContent = 'save'
            btn.style.background = '#28a745';
        } else {
            btn.textContent = 'save'
            btn.style.background = '#dc2545';
        }
    }


    saveApiKey() {
        const apiKey = this.apiKeyinput.value.trim();
        if (!apiKey) {
            this.showError('Please enter your Gemini Api Key');;
            return;
        }
        this.apiKey = apiKey;
        localStorage.setItem('geminiApiKey', apiKey);
        this.updateApiKeyStatus(true);

    }

    async generateRecipe() {
        if (!this.apikey) {
            this.showError('Please save your Gemini Api Key');
            return;

        }

        const ingredients = this.ingredientsInput.value.trim();
        if (!this.ingredients) {
            this.showError('Please enter some ingredients');
            return;

        }

        this.showLoading(true);
        this.hideRecipe();

        try {
            const recipe = await this.callGeminiAPI(ingredients)
            this.displayRecipe(recipe);
        }
        catch (error) {
            console.log('Error generating recipe:', error);
            this.showError('failed to generate recipe. Please check your API key and try again')
        } finally {
            this.showLoading(false);
        }
    }

    async callGeminiAPI(ingredients) {
        const dietary = this.dietarySelect.value;
        const cuisine = this.cuisineSelect.value;
        let prompt = `Create a detailed recipe using these ingredients: ${ingredients}`;
        if (dietary) {
            prompt += ` Make it ${dietary}.`;
        }
        if (cuisine) {
            prompt += `the cusine style should be ${cuisine}.`
        }

        prompt += `

    Please format your response as follows:
    -recipe name
    -prep time
    -cookc time
    -servings
    -ingredients (with quantities)
    -instructions (numbered steps)
    -tips (optional)

    Make sure the recipe is practical and delicious!`;


    }

    displayRecipe(recipe) { }

    showError(message) {

    }

    hideRecipe() {

    }

    showRecipe(recipe) {

    }


    showLoading(isLoading) {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AICookap();
});