import { Component } from 'preact';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';

class ListPage extends Component {
	render() {
        return (
            <div class="results">
                <h1>Results...</h1>
                {this.props.loadingResults && <div>loading...</div>}
                {this.props.results.map(function(result, index) {
                    return <div>
                        <img width="300" src={result.image} />
                        {!result.product && <p>Unrecognised</p>}
                        {result.product && 
                        <p>
                            {result.product.name}<br />
                            {result.product.description}<br />
                            {result.product.price}<br />
                        </p>}
                    </div>
                })}
            </div>
		);
   	}
};

export default connect(mapToProps, actions)(ListPage);
