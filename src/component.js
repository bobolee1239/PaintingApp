
export default class Component {
    constructor(root) {
        this.root       = root;
        this.handlers   = {};
    }

    on(event, handleFcn) {
        this.handlers[event] = handleFcn;
    }

    fire(event, ...args) {
        this.handlers[event](this, ...args);
    }

    /* static method must be overiding */
    static getRootClass() {
        return '.component';
    }
}
