class ControlButtons {
  options = {
    actionButtonClassName: 'action-button',
    controlItemClassName: 'control-item'
  };

  actions = {
    'move-up': this.moveUp,
    'move-down': this.moveDown,
    'delete': this.delete
  };

  constructor (options) {
    this.options = { ...this.options, ...options };
    this.init();
  }

  init () {
    document.body.addEventListener('click', this.onClick.bind(this));
  }

  onClick (event) {
    if (!event.target.classList.contains(this.options.actionButtonClassName)) {
      return;
    }

    const actionType = event.target.dataset.action;

    if (!actionType || !Object.keys(this.actions).includes(actionType)) {
      throw new Error('Action button type is not defined');
    }

    this.actions[actionType].call(this, event.target);
  }

  moveUp (element) {
    element = this.getElement(element);

    if (element.previousElementSibling) {
      element.previousElementSibling.before(element);
    }
  }

  moveDown (element) {
    element = this.getElement(element);

    if (element.nextElementSibling) {
      element.nextElementSibling.after(element);
    }
  }

  delete (element) {
    element = this.getElement(element);
    element.remove();
    EventObserver.getInstance().fire('remove-item', element, this);
  }

  getElement (element) {
    return element.closest('.' + this.options.controlItemClassName);
  }
}