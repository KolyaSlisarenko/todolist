class DragAndDrop {
  constructor (element) {
    this.element = element;
  }

  init () {
    this.element.addEventListener('mousedown', this.onDragInit.bind(this));
    this.element.addEventListener('dragstart', () => {return false;});
  }

  onDragInit (event) {
    if (event.target.tagName.toLowerCase() !== 'li') {
      return false;
    }

    this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

    this.setStyles();
    const onDragStart = (event) => {
      this.onDragStart(event);
    };

    document.addEventListener('mousemove', onDragStart);

    document.addEventListener('mouseup', (event) => {
      document.removeEventListener('mousemove', onDragStart);
      this.onDragFinish(event);
    });
  }

  setStyles () {
    const styles = getComputedStyle(this.element);

    this.element.style.width = styles.width;
    this.element.style.height = styles.height;
    this.element.style.cursor = 'grabbing';
    this.element.style.position = 'fixed';
  }

  onDragStart (event) {
    const left = event.clientX - this.shiftX + 'px';
    const top = event.clientY - this.shiftY + 'px';

    this.element.style.left = left;
    this.element.style.top = top;
  }

  onDragFinish (event) {
    this.element.hidden = true;
    this.element.style.left = null;
    this.element.style.top = null;
    this.element.style.position = null;
    this.element.style.cursor = null;

    let elemBelow = document.elementFromPoint(event.pageX, event.pageY);
    const tagName = elemBelow.tagName.toLowerCase();

    if (['ul', 'li'].includes(tagName)) {
      if (tagName === 'ul') {
        elemBelow.append(this.element);
      } else {
        elemBelow.after(this.element);
      }
    }
    this.element.hidden = false;
  }
}