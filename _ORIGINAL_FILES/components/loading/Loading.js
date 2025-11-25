import React, { Component } from 'react';
import LoadingText from 'components/loading-text';

import s from './Loading.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className={s.loading}>
        <div className={s.loading__container}>
          <div className={s.loading__row}>
            <div className={s.loading__col}>

              <header className={s.loading__header}>
                <p className={s.loading__date}><LoadingText /></p>
                <h1 className={s.loading__title}><LoadingText /></h1>
                <p className={s.loading__lead}><LoadingText block lines={4} /></p>
              </header>

            </div>

          </div>
        </div>
      </div>
    );
  }
}
