
import { AsyncStorage } from 'react-native';
import { observable } from 'mobx';
import Promise from 'bluebird';

class Store {
  @observable months = new Map();
  _doNotWrite = false;
  _pending = Promise.resolve();

  async ensureMonth (year, month) {
    const data = await AsyncStorage.getItem(`@CalendarStore:${year}-${month}`);
    this.months.set(`${year}-${month}`, observable.map(data));
  }

  setDayState (year, month, day, state) {
    assertDate(year, month, day);
    const m = this.months.get(`${year}-${month}`);
    if (!m) {
      this.months.set(`${year}-${month}`,
        observable.map({
          [day]: state,
        })
      );
      this._writeMonth(year, month, {
        [day]: state,
      });
      return;
    }

    const d = m.get(day);
    if (d) {
      Object.assign(d, state);
    } else {
      m.set(day, state);
    }
    this._writeMonth(year, month, m.toJSON());
  }

  getDayState (year, month, day) {
    assertDate(year, month, day);
    return this.months.get(`${year}-${month}`)[day];
  }

  _writeMonth (year, month, state) {
    const p = AsyncStorage.setItem(`@CalendarStore:${year}-${month}`, state);
    this._pending = Promise.all([ this.pending, p ]);
  }
}

const CalendarStore = new Store();

export default CalendarStore;

function assertDate (year, month, day) {
  const d = new Date(year, month - 1, day);
  const valid = (
    d.getFullYear() === Number(year)
    && (d.getMonth() + 1) === Number(month)
    && d.getDate() === Number(day)
  );

  if (!valid) throw new Error(`${year}-${month}-${day} is not a valid date: found ${d}.`);
}
