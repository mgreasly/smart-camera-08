import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [], loadingResults: false });

const mapToProps = ({ results, loadingResults }) => ({ results, loadingResults });

const actions = ({ setState }) => ({
    getResults(state, value) {
        setState({ loadingResults: true });
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
            var results = [{ image: value, product: result }].concat(state.results);
            return { results: results, loadingResults: false };
        })
        .catch(error => {
            var results = [{ image: value, product: null }].concat(state.results);
            return { results: results, loadingResults: false };
        })
    }
});

export { store, mapToProps, actions };
