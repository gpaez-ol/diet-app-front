const axios = require('axios');

// Create categories
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

const url = 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category';
test_categories.forEach((category) => {
  axios
    .post(url, category)
    .then(res => {
      console.log(`statusCode: ${res.status}`)
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
});
