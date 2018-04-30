import createStore from 'redux-zero';
import axios from 'axios';

const store = createStore({ results: [] });

const mapToProps = ({ results }) => ({ results });

const actions = ({ setState }) => ({
    getResults(state, value) {
        return axios.post(
            'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCTVMHDJUxUdkd9_0NhrKGC-86PObf9QYM',
            {
                "requests":[{
                    "image":{ "content": value.replace("data:image/jpeg;base64,", "") },
                    "features":[ { "type":"LOGO_DETECTION", "maxResults": 1 } ]
                }]
            }
        )
        .then(response => {
            var product = {
                name: response.data.responses[0].logoAnnotations[0].description,
                description: '',
                price: ''
            };
            var results = state.results.concat([{
                image: value,
                product: product
            }]);
            return { results: results }
        })
        .catch(error => {
            var results = state.results.concat([{
                image: value,
                product: { name: 'unidentified', description: '', price: '' }
            }]);
            return { results: results }
        })
    }
});

export { store, mapToProps, actions };
