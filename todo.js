class TodoManager {
  controlButtons = {
    addItem: document.getElementById('add-item'),
    loadItem: document.getElementById('load-item')
  };

  init () {
    this.initControls();
    this.initServices();
  }

  initControls () {
    this.controlButtons.addItem.addEventListener('click', this.addNewItem.bind(this));
    this.controlButtons.loadItem.addEventListener('click', this.loadRandomItem.bind(this));
  }

  initServices () {
    new EventObserver();
    new DragAndDrop();
    new ControlButtons();
    new Tooltip();
  }

  addNewItem () {
    try {
      this.addItem(this.getNewItemText());
    } catch (e) {
      return this.showError(e);
    }
  }

  async loadRandomItem () {
    this.controlButtons.loadItem.disabled = true;

    try {
      const response = await fetch('todo.json');
      const result = await response.json();
      this.addItem(result.data[Math.floor(Math.random() * result.data.length)]);
    } catch (e) {
      this.showError(e);
    }

    this.controlButtons.loadItem.disabled = false;
  }

  addItem (text) {
    const listItem = document.createElement('li');

    listItem.className = 'p-2 control-item';
    listItem.innerHTML += text + document.getElementById('control-buttons').innerHTML;
    listItem.draggable = true;

    document.getElementById('list').append(listItem);
    document.getElementById('new-item-text').value = '';
  }

  getNewItemText () {
    const newItemText = document.getElementById('new-item-text').value.trim();

    if (!newItemText) {
      throw new Error('Todo list item name is required!');
    }

    return newItemText;
  }

  showError (message) {
    const error = Object.assign(document.createElement('div'), {
      className: 'notification is-danger',
      innerText: message
    });
    document.getElementById('messages').append(error);

    setTimeout(() => {
      error.remove();
    }, 1500);
  }
}

const todoList = new TodoManager();
todoList.init();