import Component from './component';

import './canvas.css';

export default class Canvas extends Component {
    constructor(root) {
        super(root);
        this.toPaint = false;
        this.clickX     = [];
        this.clickY     = [];
        this.clickDrag  = [];
        this.context = this.root.getContext('2d');


        this.root.addEventListener('mousedown', this.handleDOMMouseDown.bind(this));
        this.root.addEventListener('mousemove', this.handleDOMMouseMove.bind(this));
        this.root.addEventListener('mouseup', (e) => {
            this.toPaint = false;
            if(this.handlers['mouseup']) {
                this.fire('mouseup', e.pageX-this.root.offsetLeft, e.pageY-this.root.offsetTop);
            }
        });
        this.root.addEventListener('mouseleave', (e) => {
            this.toPaint = false;
            if(this.handlers['mouseleave']) {
                this.fire('mouseleave', e.pageX-this.root.offsetLeft, e.pageY-this.root.offsetTop);
            }
        });

    }

    reset() {
        this.clickX     = [];
        this.clickY     = [];
        this.clickDrag  = [];
        this.redraw();
    }

    redraw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.strokeStyle    = '#df4b26';
        this.context.lineJoin       = 'round';
        this.context.lineWidth      = 5;

        for(let i=0, j=this.clickX.length; i<j; ++i) {
            this.context.beginPath();
            /* if is dragging and not the first one */
            if(this.clickDrag[i] && i) {
                this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
            } else {
                this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    addClick(x, y, isDragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(isDragging);
    }

    handleDOMMouseMove(event) {
        let posX = event.pageX - this.root.offsetLeft;
        let posY = event.pageY - this.root.offsetTop;
        if(this.toPaint) {
            this.addClick(posX, posY, true);
            this.redraw();
        }
        if(this.handlers['mousemove']) {
            this.fire('mousemove', posX, posY);
        }
    }

    handleDOMMouseDown(event) {
        // mouse position in the canvas
        this.mouseX = event.pageX - this.root.offsetLeft;
        this.mouseY = event.pageY - this.root.offsetTop;

        this.toPaint = true;
        this.addClick(this.mouseX, this.mouseY);
        this.redraw();

        if(this.handlers['mousedown']) {
            this.fire('mousedown', this.mouseX, this.mouseY);
        }
    }

    static getRootClass() {
        return '.canvas';
    }
}
