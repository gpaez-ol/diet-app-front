const axios = require('axios');

// Create categories
const upload_categories = () => {
  const test_categories = [
    {
      "name": "Weight loss",
      "description": "Lose weight with diets especially designed to help you reach your target in a healthy way!"
    },
    {
      "name": "Muscle building",
      "description": "Look your best with the help of diets that will help you build your muscles!"
    },
    {
      "name": "Plant-based",
      "description": "Go green with these delicious diets that are focused on vegetal products!"
    },
    {
      "name": "Low-carb",
      "description": "Reduce your carbohydrates (carbs) with high-protein diets."
    },
    {
      "name": "Low-fat",
      "description": "These diets restrict your fat intake to 30% of your daily calories."
    },
  ];

  test_categories.forEach((category) => {
    axios
      .post('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category', category)
      .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  });
};

// Create ingredients
const upload_ingredients = () => {
  const test_ingredients = [
    { "name": "Tomato" },
    { "name": "Onion" },
    { "name": "Salmon" },
    { "name": "Meat" },
    { "name": "Chicken" },
    { "name": "Eggs" },
    { "name": "Spaghetti" },
    { "name": "Apple" },
    { "name": "Lettuce" }
  ];
  
  test_ingredients.forEach((ingredient) => {
    axios
      .post('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient', ingredient)
      .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  });
};


// Create meals
const upload_meals = () => {
  const test_meals = [
    {
      "name": "Fruit salad",
      "kilocalories": 100,
      "preparation": "Cut a lot of fruit and mix it with lettuce."
    },
    {
      "name": "Pancakes",
      "kilocalories": 300,
      "preparation": "Make some pancakes."
    },
    {
      "name": "Trail mix",
      "kilocalories": 150,
      "preparation": "Mix nuts with almonds and cherry."
    },
    {
      "name": "Yoghurt",
      "kilocalories": 220,
      "preparation": "Mix greek yoghurt with almonds and apple."
    },
    {
      "name": "BBQ",
      "kilocalories": 700,
      "preparation": "Roast the meat."
    }
  ];
};

// Create diets
const upload_diets = () => {
  const test_diets = [
    {
      "name": "Mediterranean",
      "description": "The Mediterranean diet may offer a host of health benefits, including weight loss, heart and brain health, cancer prevention, and diabetes prevention and control. By following the Mediterranean diet, you could also keep that weight off while avoiding chronic disease.",
      "type": 0,
      "categoryIds": [
        "08d99bee-60f5-4429-89cb-935e401a9b93"
      ],
      "dietMeals": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "mealNumber": 0
        }
      ]
    }
  ];
};

// Call the appropriate function to upload the desired items
upload_ingredients()