class Tooltip {
  tooltip = null;

  constructor () {
    this.init();
  }

  init () {
    this.createElement();
    document.body.addEventListener('mouseover', this.hoverTooltip.bind(this));
    document.body.addEventListener('mouseover', this.removeTooltip.bind(this));
    EventObserver.getInstance().subscribe('remove-item', this.removeTooltip);
  }

  createElement () {
    this.tooltip = document.createElement('span');
    this.tooltip.className = 'p-2 has-background-light tooltip-container';
    document.body.append(this.tooltip);
  }

  hoverTooltip (event) {
    let tooltipText = this.getTooltipText(event);

    if (!tooltipText) {
      return;
    }

    let coordinates = event.target.getBoundingClientRect();

    Object.assign(this.tooltip.style, {
      top: coordinates.top - 50,
      left: coordinates.left
    });
    this.tooltip.innerText = tooltipText;
    this.tooltip.hidden = false;
  }

  removeTooltip (event) {
    if (this.getTooltipText(event)) {
      return;
    }

    this.tooltip.hidden = true;
  }

  getTooltipText (event) {
    return event.target.dataset.tooltip;
  }
}