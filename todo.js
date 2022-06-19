class TodoManager {
  controlButtons = {
    addItem: document.getElementById('add-item'),
    loadItem: document.getElementById('load-item')
  };

  init () {
    this.controlButtons.addItem.addEventListener('click', this.addNewItem.bind(this));
    this.controlButtons.loadItem.addEventListener('click', this.loadRandomItem.bind(this));
  }

  addNewItem () {
    this.addItem(this.getNewItemText());
  }

  async loadRandomItem () {
    this.controlButtons.loadItem.disabled = true;
    const response = await fetch('todo.json');
    const result = await response.json();
    this.controlButtons.loadItem.disabled = false;

    this.addItem(result.data[Math.floor(Math.random() * result.data.length)]);
  }

  addItem (text) {
    try {
      const listItem = document.createElement('li');

      listItem.className = 'p-2';
      listItem.innerHTML += text + document.getElementById('control-buttons').innerHTML;

      document.getElementById('list').append(listItem);
      document.getElementById('new-item-text').value = '';

      this.initNewItem(listItem);
    } catch (e) {
      return this.showError(e);
    }
  }

  initNewItem (element) {
    element.querySelector('.fa-arrow-up').addEventListener('click', this.moveUp.bind(this, element));
    element.querySelector('.fa-arrow-down').addEventListener('click', this.moveDown.bind(this, element));
    element.querySelector('.delete-btn').addEventListener('click', this.delete.bind(this, element));

    (new DragAndDrop(element)).init();
    const tooltip = new Tooltip(element);
    tooltip.init();
    element.addEventListener('remove-item', tooltip.removeTooltip);
  }

  moveUp (element) {
    if (element.previousElementSibling) {
      element.previousElementSibling.before(element);
    }
  }

  moveDown (element) {
    if (element.nextElementSibling) {
      element.nextElementSibling.after(element);
    }
  }

  delete (element) {
    element.remove();
    element.dispatchEvent(new Event('remove-item'));
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
    document.querySelector('.field').before(error);

    setTimeout(() => {
      error.remove();
    }, 1500);
  }
}

const todoList = new TodoManager();
todoList.init();