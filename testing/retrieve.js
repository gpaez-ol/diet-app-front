const axios = require('axios');

module.exports = {
  retrieve_categories: () => {
    return axios.get('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/category?Page=1&PageSize=100')
    .then((response) => {
      return response.data.pagination;
    });
  },
  retrieve_ingredients: () => {
    return axios.get('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/ingredient?Page=1&PageSize=100')
    .then((response) => {
      return response.data.pagination;
    });
  },
  retrieve_meals: () => {
    return axios.get('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/meal?Page=1&PageSize=100')
    .then((response) => {
      return response.data.pagination;
    });
  },
  retrieve_diets: () => {
    return axios.get('http://algofit-qa-alb-599938117.us-east-1.elb.amazonaws.com/diet?Page=1&PageSize=100')
    .then((response) => {
      return response.data.pagination;
    });
  }
}
