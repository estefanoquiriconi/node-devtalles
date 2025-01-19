import { Ticket } from '../../domain/interfaces/ticket.interface';

export class TicketService {
  public readonly tickets: Ticket[] = [
    { id: crypto.randomUUID(), number: 1, createdAt: new Date(), done: false },
    { id: crypto.randomUUID(), number: 2, createdAt: new Date(), done: false },
    { id: crypto.randomUUID(), number: 3, createdAt: new Date(), done: false },
    { id: crypto.randomUUID(), number: 4, createdAt: new Date(), done: false },
    { id: crypto.randomUUID(), number: 5, createdAt: new Date(), done: false },
    { id: crypto.randomUUID(), number: 6, createdAt: new Date(), done: false },
  ];

  constructor() {}

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.handleAtDesk);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public get lastTicketNumber(): number {
    const lastTicket = this.tickets.at(-1);
    return lastTicket?.number ?? 0;
  }

  public createTicket() {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
    };

    this.tickets.push(newTicket);

    //TODO: ws

    return newTicket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find(t => !t.handleAtDesk);
    if (!ticket)
      return { status: 'error', message: 'No hay tickets pendientes' };

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    //TODO: ws

    return { status: 'ok ', ticket };
  }

  public onFinishedTicket(id: string) {
    const ticket = this.tickets.find(ticket => ticket.id === id);
    if (!ticket) return { status: 'error', message: 'Ticket no encontrado' };

    this.tickets.map(ticket => {
      if (ticket.id === id) {
        ticket.done = true;
      }
      return ticket;
    });
    return { status: 'ok' };
  }
}
