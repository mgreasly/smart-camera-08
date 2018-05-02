import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [] });

const mapToProps = ({ results }) => ({ results });

const actions = ({ setState }) => ({
    getResults(state, value) {
        return axios.post(
            'http://workshop-ava.azurewebsites.net/api/Camera/RecognizeImage', 
            value
        )
        .then(response => {
            var data = JSON.parse(response.data);
            var product = data.Products[0];
            var result = {
                name: product.Name,
                description: product.Products[0].FullDescription,
                price: product.Products[0].Price
            };
            var results = state.results.concat([{
                image: value,
                product: result
            }]);
            return { results: results }
        })
        .catch(error => {
            var results = state.results.concat([{
                image: value,
                product: null
            }]);
            return { results: results }
        })
    }
});

export { store, mapToProps, actions };
