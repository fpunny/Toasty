import { ACTIONS, EVENTS, CONSTANTS } from './types';

// Events
const notify = async (type, detail) => dispatchEvent(new CustomEvent(type, { detail }));

class Toasty {

  constructor() {
    this._checking = false;
    this._queue = [];
    this._toasts = [];
  }

  alert = async data => this._enqueue(ACTIONS.ADD, data)
  remove = async id => this._enqueue(ACTIONS.REMOVE, id)

  _enqueue = async (type, data) => {
    this._queue.push({ type, data });
    if (!this._checking) {
      this._checkQueue();
    }
  }

  _checkQueue = async () => {
    while (this._queue.length > 0) {
      const { type, data } = this._queue.shift();
      switch(type) {
        case ACTIONS.ADD:
          const payload = { _id: CONSTANTS.ID, data };
          this._toasts.push(payload);
          notify(EVENTS.ADD, payload);
          CONSTANTS.ID++;

        break;
        case ACTIONS.REMOVE:
          let index = -1;
          this._toasts.forEach(({ _id }, i) => _id === data? index = i: null);

          if (index > -1) {
            this._toasts.splice(index, 1);
            notify(EVENTS.REMOVE, index);
          } else console.error('Toast not found');

        break;
        default:
          console.error("Invalid type");
        break;
      }
    }
  }
}

export const toasty = new Toasty();