export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

export const EVENTS = {
  ADD: 'onToastyAdd',
  REMOVE: 'onToastyRemove'
}

export const CONSTANTS = {
  DURATION: 350,
  ID: 0,
  SHIFT: (amount = 0) => `translate3d(0, calc(${100 * amount}% + 6px), 0)`
}