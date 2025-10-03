document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const dietForm = document.getElementById('dietForm');
    const dietPlanContainer = document.getElementById('dietPlanContainer');
    const errorMessage = document.getElementById('error-message');

    // Diet data structure
    // This is a simplified database of meal options
    const dietData = {
        'weight-loss': {
            breakfast: ['Oatmeal 🍳 with berries 🍇 and a sprinkle of nuts 🥜.', 'Scrambled eggs🥚(2) with spinach and a slice of whole-wheat toast🍞.', 'Greek yogurt with chia seeds and fruit🍎.'],
            midSnack: ['An apple🍏 with a handful of almonds🥜.', 'Cucumber🥒 slices with hummus.', 'A small protein shake🥛.'],
            lunch: ['Grilled chicken🍗 salad🥗 with mixed greens and vinaigrette.', 'Quinoa bowl with black beans🫘, corn🌽, and avocado🥑.', 'Lentil soup🥣 with a side salad🥗.'],
            afternoonSnack: ['Carrot sticks🥕 with guacamole.', 'A hard-boiled egg🥚.', 'A pear🍐.'],
            dinner: ['Baked salmon🐟 with roasted asparagus and sweet potato🍠.', 'Tofu stir-fry with broccoli🥦 and brown rice🍚.', 'Turkey meatballs with zucchini noodles🍝.']
        },
        'weight-gain': {
            breakfast: ['Oatmeal 🍳 with peanut butter🧈, banana 🍌, and nuts 🥜.', 'Three scrambled eggs🥚 with cheese 🧀, avocado 🥑, and whole-wheat toast🍞.', 'Full-fat Greek yogurt🍦with granola and honey 🍯.'],
            midSnack: ['Protein shake🥛 with milk 🥛 and a banana🍌.', 'A large handful of mixed nuts🥜 and dried fruit.', 'Cottage cheese🥛 with pineapple🍍.'],
            lunch: ['Chicken breast🍗 with a large portion of quinoa and roasted vegetables 🥬.', 'Beef stir-fry🍖 with rice🍚 and mixed peppers.', 'Salmon fillet🐟 with mashed potatoes and green beans.'],
            afternoonSnack: ['Avocado toast🥑 on whole-wheat bread 🍞.', 'A glass of whole milk🥛.', 'Trail mix.'],
            dinner: ['Steak🥩 with a baked potato 🥔 and creamed spinach 🥬.', 'Pasta🍝 with meatballs in marinara sauce and a side of garlic bread.', 'Large chicken burrito🌯 with rice 🍚, beans 🫛, and cheese 🧀.']
        },
        'maintain': {
            breakfast: ['Whole-wheat toast 🍞 with avocado 🥑 and a poached egg 🍳.', 'Smoothie with spinach, banana 🍌, protein powder, and almond milk 🥛.', 'Oatmeal with walnuts and apple slices 🍏.'],
            midSnack: ['A handful of walnuts.', 'An orange 🍊.', 'Yogurt.'],
            lunch: ['Turkey sandwich 🍗 on whole-wheat bread with a side salad.', 'Sushi 🍱 rolls (6-8 pieces).', 'Chicken 🍗 and vegetable skewers with couscous.'],
            afternoonSnack: ['Rice cakes 🍚 with almond butter 🧈.', 'A small bowl 🥣of berries.', 'A cheese 🧀stick.'],
            dinner: ['Grilled fish 🐟 tacos 🌮 with cabbage 🥬slaw.', 'Chicken 🍗stir-fry with a variety of colorful vegetables.', 'Vegetable 🥬lasagna with a side of mixed greens.']
        },
        'healthy-lifestyle': {
            breakfast: ['A smoothie 🥛 with mixed berries 🍇, spinach, and Greek yogurt 🍦.', 'Avocado 🥑toast topped with a sprinkle of red pepper 🌶️flakes.', 'Chia seed 🌱 pudding 🍮prepared overnight with almond milk and fruit 🍋‍🟩.'],
            midSnack: ['A mix of seeds and nuts 🥜.', 'Edamame.', 'A kiwi 🥝.'],
            lunch: ['Large salad 🥗 with a lean protein source (chickpeas or grilled chicken).', 'Buddha bowl with quinoa, roasted veggies, and a tahini dressing.', 'Whole-wheat wrap with hummus, turkey, and lots of vegetables.'],
            afternoonSnack: ['Bell pepper strips with tzatziki.', 'A small bowl of olives.', 'Dark chocolate (2 squares).'],
            dinner: ['Baked cod with a lemon 🍋-dill sauce, served with quinoa and steamed broccoli 🥦.', 'Black bean 🫘 burgers 🍔 on a whole-wheat 🌾 bun 🌭 with a side of sweet potato 🍠fries 🍟.', 'Vegetable curry🍛with coconut 🥥milk 🥛and brown rice 🍚.']
        }
    };
    
    // Color mapping for meal labels
    const mealColors = {
        breakfast: 'bg-orange-400 text-black-900',
        midSnack: 'bg-green-400 text-black-900',
        lunch: 'bg-red-400 text-black-900',
        afternoonSnack: 'bg-purple-400 text-black-900',
        dinner: 'bg-blue-400 text-black-900',
    };

    // Function to get a random item from an array
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Event listener for form submission
    dietForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        // Get user input
        const weight = document.getElementById('weight').value;
        const goal = document.getElementById('goal').value;

        // Simple validation
        if (!weight || weight <= 0) {
            errorMessage.textContent = 'Please enter a valid weight.';
            dietPlanContainer.innerHTML = ''; // Clear previous results
            dietPlanContainer.classList.add('hidden');
            return;
        }

        // Clear any previous error messages
        errorMessage.textContent = '';
        
        // Generate the diet plan
        const plan = generateDietPlan(goal);
        
        // Display the diet plan
        displayDietPlan(plan);
    });
    
    /**
     * Generates a diet plan based on the selected goal.
     * @param {string} goal - The user's health goal.
     * @returns {object} - An object containing a meal for each part of the day.
     */
    function generateDietPlan(goal) {
        const goalData = dietData[goal];
        const plan = {
            breakfast: getRandomItem(goalData.breakfast),
            midSnack: getRandomItem(goalData.midSnack),
            lunch: getRandomItem(goalData.lunch),
            afternoonSnack: getRandomItem(goalData.afternoonSnack),
            dinner: getRandomItem(goalData.dinner),
        };
        return plan;
    }

    /**
     * Renders the generated diet plan to the page with colorful labels.
     * @param {object} plan - The diet plan object.
     */
    function displayDietPlan(plan) {
        // Clear previous plan and make container visible
        dietPlanContainer.innerHTML = '';
        dietPlanContainer.classList.remove('hidden');

        const planHtml = `
            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 fade-in">
                <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Your Personalized Plan</h2>
                <div class="space-y-6">
                    <!-- Breakfast -->
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-32">
                            <span class="px-3 py-1 text-sm font-semibold rounded-full ${mealColors.breakfast}">
                                Breakfast
                            </span>
                        </div>
                        <p class="ml-4 text-gray-700">${plan.breakfast}</p>
                    </div>
                    
                    <!-- Mid-Morning Snack -->
                    <div class="flex items-start">
                         <div class="flex-shrink-0 w-32">
                            <span class="px-3 py-1 text-sm font-semibold rounded-full ${mealColors.midSnack}">
                                Mid-Snack
                            </span>
                        </div>
                        <p class="ml-4 text-gray-700">${plan.midSnack}</p>
                    </div>

                    <!-- Lunch -->
                    <div class="flex items-start">
                         <div class="flex-shrink-0 w-32">
                            <span class="px-3 py-1 text-sm font-semibold rounded-full ${mealColors.lunch}">
                                Lunch
                            </span>
                        </div>
                        <p class="ml-4 text-gray-700">${plan.lunch}</p>
                    </div>

                    <!-- Afternoon Snack -->
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-32">
                            <span class="px-3 py-1 text-sm font-semibold rounded-full ${mealColors.afternoonSnack}">
                                Afternoon Snack
                            </span>
                        </div>
                        <p class="ml-4 text-gray-700">${plan.afternoonSnack}</p>
                    </div>

                    <!-- Dinner -->
                    <div class="flex items-start">
                        <div class="flex-shrink-0 w-32">
                            <span class="px-3 py-1 text-sm font-semibold rounded-full ${mealColors.dinner}">
                                Dinner
                            </span>
                        </div>
                        <p class="ml-4 text-gray-700">${plan.dinner}</p>
                    </div>
                </div>
                <p class="text-xs text-gray-500 mt-8 text-center">
                    Disclaimer: This is a sample diet plan. Consult with a nutritionist or doctor for personalized advice. Remember to drink plenty of water throughout the day.
                </p>
            </div>
        `;

        dietPlanContainer.innerHTML = planHtml;
    }
});