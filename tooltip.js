class Tooltip {
  constructor (element) {
    this.element = element;
  }

  init () {
    this.element.addEventListener('mouseover', this.hoverTooltip.bind(this));
    this.element.addEventListener('mouseleave', this.removeTooltip.bind(this));
  }

  hoverTooltip (event) {
    this.removeTooltip();
    let tooltipText = event.target.dataset.tooltip;
    if (tooltipText === undefined) {
      return;
    }

    let tooltipElement = document.createElement('span');
    tooltipElement.className = 'p-2 is-size-5 has-background-light tooltip-container';
    let coordinates = event.target.getBoundingClientRect();

    Object.assign(tooltipElement.style, {
      top: coordinates.top - 50,
      left: coordinates.left
    });
    tooltipElement.innerText = tooltipText;
    document.body.append(tooltipElement);
  }

  removeTooltip (event) {
    document.body.querySelectorAll('.tooltip-container').forEach((item) => item.remove());
  }
}