const Retrieve = require('./retrieve') 
const axios = require('axios');


const delete_objects = (objects, url) => {
  objects.forEach((object) => {
    axios.delete(`${url}/${object.id}`);
  });
};

const delete_categories = async () => {
  const categories = await Retrieve.retrieve_categories();
  delete_objects(categories, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category')
}

const delete_diets = async () => {
  const diets = await Retrieve.retrieve_diets();
  delete_objects(diets, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet')
}

const delete_meals = async () => {
  const meals = await Retrieve.retrieve_meals();
  delete_objects(meals, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal')
}

const delete_ingredients = async () => {
  const ingredients = await Retrieve.retrieve_ingredients();
  delete_objects(ingredients, 'http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient')
}

const doStuff = () => {
  delete_categories();
  delete_diets();
  delete_meals();
  delete_ingredients();
}

doStuff();
