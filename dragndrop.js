class DragAndDrop {
  options = {
    dragTargetClassName: 'dragtarget',
    dropTargetClassName: 'droptarget',
  };

  element = null;

  constructor (options) {
    this.options = { ...this.options, ...options };
    this.init();
  }

  init () {
    this.initTargets();
  }

  initTargets () {
    Array.from(document.getElementsByClassName(this.options.dragTargetClassName)).forEach(dragTarget => {
      dragTarget.addEventListener('dragstart', this.onDragStart.bind(this));
    });

    Array.from(document.getElementsByClassName(this.options.dropTargetClassName)).forEach(dragTarget => {
      dragTarget.addEventListener('dragover', this.onDragOver.bind(this));
      dragTarget.addEventListener('drop', this.onDrop.bind(this));
    });
  }

  onDragStart (event) {
    this.element = event.target;
  }

  onDragOver (event) {
    event.preventDefault();
  }

  onDrop (event) {
    const dropTarget = event.target.closest('.' + this.options.dropTargetClassName);

    if (!dropTarget) {
      throw new Error('Drop target is not found');
    }

    let elemBelow = document.elementFromPoint(event.pageX, event.pageY);

    if (elemBelow.draggable) {
      elemBelow.after(this.element);
    } else {
      dropTarget.append(this.element);
    }
  }
}