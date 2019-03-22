import Component from './component';

import './resetButton.css';

export default class ResetButton extends Component {
    constructor(root) {
        super(root);

        this.root.addEventListener('click', () => {
            if(this.handlers['click']) {
                this.fire('click');
            }
        });
    }

    static getRootClass() {
        return '.resetButton';
    }
}
