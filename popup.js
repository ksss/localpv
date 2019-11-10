document.addEventListener('DOMContentLoaded', () => {
  const bgwindow = chrome.extension.getBackgroundPage();
  const tableNode = document.getElementById('table');
  const table = {};
  for (let i = 0; i < bgwindow.visitItems.length; i++) {
    const transition = bgwindow.visitItems[i].transition;
    if (!table[transition]) table[transition] = 0;
    table[transition]++;
  }
  for (let transition in table) {
    const trNode = document.createElement('tr');
    const tdTransitionNode = document.createElement('td');
    const tdCountNode = document.createElement('td');
    tdTransitionNode.innerHTML = transition;
    tdCountNode.innerHTML = table[transition];
    trNode.appendChild(tdTransitionNode);
    trNode.appendChild(tdCountNode);
    tableNode.appendChild(trNode);
  }
});
