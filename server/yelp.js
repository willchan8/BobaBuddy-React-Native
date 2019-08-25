const axios = require('axios');
const API_KEY = require('./API_KEY.js');

const fetchData = (location, callback) => {
  const url = 'https://api.yelp.com/v3/graphql'
  const oauth = {Authorization: `bearer ${API_KEY}`}
  const query = `{
      search(term: "boba",
             latitude: ${location.latitude},
             longitude: ${location.longitude},
            ) {
          business {
              name
              url
              id
              rating
              review_count
              distance
              photos
              coordinates {
                latitude
                longitude
              }
              location {
              city
              address1
              }
          }
      }
  }`

  axios.post(url, {query: query}, {headers: oauth})
  .then(function (response) {
  callback(null, response.data);
  })
  .catch(function (error) {
  callback(error);
  });
}
module.exports = { fetchData };