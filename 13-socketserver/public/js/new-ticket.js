const currentTicketLabel = document.querySelector('span');
const createTicketButton = document.querySelector('button');

async function getLastTicket() {
  const response = await fetch('/api/ticket/last');
  const lastTicket = await response.json();

  currentTicketLabel.innerHTML = lastTicket;
}

getLastTicket();

async function createTicket() {
  const response = await fetch('/api/ticket', {
    method: 'POST',
  });
  const newTicket = await response.json();

  currentTicketLabel.innerHTML = newTicket.number;
}

createTicketButton.addEventListener('click', createTicket);
