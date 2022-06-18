class TodoManager {
  init () {
    document.getElementById('add-item').addEventListener('click', this.addNewItem.bind(this));
  }

  addNewItem () {
    try {
      let newItemText = this.getNewItemText();
      const listItem = document.createElement('li');

      listItem.className = 'is-size-3 p-2';
      listItem.innerHTML += newItemText + document.getElementById('control-buttons').innerHTML;

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
    
    (new Tooltip(element)).init();
    (new DragAndDrop(element)).init();
  }

  moveUp (element, event) {
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