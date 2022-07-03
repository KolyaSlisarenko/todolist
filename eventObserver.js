class EventObserver {
  _instance = null;
  handlers = {};

  constructor () {
    if (EventObserver._instance) {
      throw new Error('Singleton classes can\'t be instantiated more than once.');
    }

    EventObserver._instance = this;
  }

  subscribe (type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  }

  unsubscribe (type, fn) {
    this.handlers = this.handlers[type].filter(item => item !== fn);
  }

  fire (type, arg, context) {
    context = context || window;

    this.handlers[type].forEach(item => item.call(context, arg));
  }

  static getInstance () {
    return EventObserver._instance;
  }
}