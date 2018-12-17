import React, { Component } from 'react';
import { toasty } from './toasty';
import { EVENTS, CONSTANTS } from './types';
import './scss/toasty.scss';

export class Toasty extends Component {

  state = {
    toasts: [],
    remove: -1
  }

  componentDidMount() {
    window.addEventListener(EVENTS.ADD, this.update);
    window.addEventListener(EVENTS.REMOVE, this.remove);
  }

  componentWillUnmount() {
    window.removeEventListener(EVENTS.ADD, this.update);
    window.removeEventListener(EVENTS.REMOVE, this.remove);
  }

  update = async ({ detail }) => {
    const { toasts } = this.state;
    toasts.push(detail);
    this.setState({ toasts });
  };

  remove = async ({ detail }) => {
    const { toasts } = this.state;
    this.setState({ remove: detail });
    window.setTimeout(
      () => {
        toasts.splice(detail, 1);
        this.setState({ toasts, remove: -1 });
      }, CONSTANTS.DURATION
    )
  }
  onClick = async ({ target }) => toasty.remove(
    parseInt(
      target.getAttribute("data-key")
    )
  );

  render() {
    const { toasts, remove } = this.state;
    return <ul className='toasty'>
      {
        toasts.map(({ _id, data }, index) => {
          const modifier = `${index === remove? ' toasty__item--exit': ''}${remove !== -1? ' toasty__item--shift': ''}`;
          const style = remove !== -1 && index > remove? { transform: CONSTANTS.SHIFT(1) }: null;
          return <li
            key={ _id }
            style={ style }
            data-key={ _id }
            onClick={ this.onClick }
            className={ `toasty__item${modifier}` }
          >
            { data }
          </li>
        })
      }
    </ul>
  }
}