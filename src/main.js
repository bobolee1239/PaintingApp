import Component from './component';
import Canvas from './canvas.js';
import ResetButton from './resetButton.js';

import './main.css';


export default class Main extends Component {
    constructor(root) {
        super(root);
        this.canvas = new Canvas(document.querySelector('#myCanvas'));
        this.resetButton = new ResetButton(document.querySelector(ResetButton.getRootClass()));


        this.resetButton.on('click', this.handleReset.bind(this));
    }

    handleReset() {
        this.canvas.reset();
    }

    static getRootClass() {
        return '.main';
    }
}


window.onload = function() {
    new Main(document.body);
};
