function panelFunc(panelNumber) {
  if (!Number.isInteger(panelNumber)) {
    throw new Error('Argument is not a integer');
  }
  const panels = document.getElementsByClassName('panel_content');
  let i;
  for (i = 0; i < panels.length; i += 1) {
    if (i + 1 === panelNumber) {
      if (panels[i].className.indexOf('show') === -1) {
        panels[i].previousSibling.className += ' highlight_panel';
        panels[i].className = panels[i].className.replace('hide', 'show');
      } else {
        panels[i].className = panels[i].className.replace('show', 'hide');
        panels[i].previousSibling.className = panels[
          i
        ].previousSibling.className.replace(' highlight_panel', '');
      }
    }
  }
}

export default panelFunc;
