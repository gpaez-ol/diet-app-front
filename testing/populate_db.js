const Retrieve = require('./retrieve') 
const axios = require('axios');

const post_objects = (objects, url) => {
  objects.forEach(async (object) => {
    await axios
      .post(url, object)
      .then(res => {
        console.log(`statusCode: ${res.status}`)
      })
      .catch(error => {
        console.error(error)
      })
  });
}
;
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

  post_objects(test_categories, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category');
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
  
  post_objects(test_ingredients, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient');
};

// Create meals
const upload_meals = (ingredients) => {
  const get_random_ingredients = () => {
    const shuffled = [...ingredients].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * ingredients.length)).map((ingredient) => ({ 
        "ingredientId": ingredient.id,
        "amount": Math.floor(Math.random() * 10),
        "notes": "No notes"
    }));
  };

  const test_meals = [
    {
      "name": "Fruit salad",
      "kilocalories": 100,
      "preparation": "Cut a lot of fruit and mix it with lettuce.",
      "mealIngredients": get_random_ingredients()
    },
    {
      "name": "Pancakes",
      "kilocalories": 300,
      "preparation": "Make some pancakes.",
      "mealIngredients": get_random_ingredients()
    },
    {
      "name": "Trail mix",
      "kilocalories": 150,
      "preparation": "Mix nuts with almonds and cherry.",
      "mealIngredients": get_random_ingredients()
    },
    {
      "name": "Yoghurt",
      "kilocalories": 220,
      "preparation": "Mix greek yoghurt with almonds and apple.",
      "mealIngredients": get_random_ingredients()
    },
    {
      "name": "BBQ",
      "kilocalories": 700,
      "preparation": "Roast the meat.",
      "mealIngredients": get_random_ingredients()
    }
  ];

  post_objects(test_meals, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal');
};

// Create diets
const upload_diets = (categories, meals) => {
  const get_random_categories = () => {
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * categories.length)).map((category) => category.id);
  };

  const get_random_meals = () => {
    let random_meals = [];

    for (let i = 0; i < 10; i++) {
      random_meals.push({
        "id": meals[Math.floor(Math.random() * meals.length)].id,
        "mealNumber": i
      });
    }
    return random_meals;
  };

  const test_diets = [
    {
      "name": "Mediterranean",
      "description": "The Mediterranean diet may offer a host of health benefits, including weight loss, heart and brain health, cancer prevention, and diabetes prevention and control. By following the Mediterranean diet, you could also keep that weight off while avoiding chronic disease.",
      "type": 0,
      "categoryIds": get_random_categories(),
      "dietMeals": get_random_meals()
    },
    {
      "name": "Italian",
      "description": "Lots of pasta",
      "type": 0,
      "categoryIds": get_random_categories(),
      "dietMeals": get_random_meals()
    },
    {
      "name": "Mexican",
      "description": "Viva Mexico",
      "type": 0,
      "categoryIds": get_random_categories(),
      "dietMeals": get_random_meals()
    },
    {
      "name": "Ketto",
      "description": "Low fat.",
      "type": 0,
      "categoryIds": get_random_categories(),
      "dietMeals": get_random_meals()
    },
    {
      "name": "Dash",
      "description": "Eat like ancestors.",
      "type": 0,
      "categoryIds": get_random_categories(),
      "dietMeals": get_random_meals()
    }
  ];
  //console.log(test_diets);
  post_objects(test_diets, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet');
};

const doStuff = async () => {
  upload_categories();
  const categories = await Retrieve.retrieve_categories(); 
  upload_ingredients();
  const ingredients = await Retrieve.retrieve_ingredients();
  upload_meals(ingredients);
  const meals = await Retrieve.retrieve_meals();
  upload_diets(categories, meals);
}

doStuff();
