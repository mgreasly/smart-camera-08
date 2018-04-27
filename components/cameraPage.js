import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Webcam from 'react-webcam';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';

class CameraPage extends Component {
  capture = () => { 
    const image = this.webcam.getScreenshot(); 
    this.props.getResults(image);
    route("/list");
  } 
  render() {
    return (
      <div id="camera">
        <h1>Take a picture to analyse...</h1>
        <Webcam audio={false} ref={webcam => { this.webcam = webcam; }} screenshotFormat="image/jpeg" />
        <Button unelevated={true} onClick={this.capture}>Take picture</Button>
      </div>
    );
  }
}

export default connect(mapToProps, actions)(CameraPage);