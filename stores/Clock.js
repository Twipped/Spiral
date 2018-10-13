
import { action, observable } from 'mobx';
import { dateToData } from '../lib/common';

export default class Clock {
  @observable year;
  @observable month;
  @observable day;
  @observable hour;
  @observable minute;
  @observable second;

  constructor (frequency) {
    this.timeout = setInterval(this.update.bind(this), frequency || 10000);
    this.update();
  }

  stop () {
    if (this.timeout) clearInterval(this.timeout);
    this.timeout = null;
  }

  @action
  update () {
    const data = dateToData(new Date());
    Object.assign(this, data);
  }
}
