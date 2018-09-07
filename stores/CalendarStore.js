
import { AsyncStorage } from 'react-native';
import { observable, toJS } from 'mobx';
import Promise from 'bluebird';

class Store {
  @observable months = new Map();
  _doNotWrite = false;
  _pending = Promise.resolve();

  async ensureMonth (year, month) {
    let state = await AsyncStorage.getItem(`@CalendarStore:${year}-${month}`);
    state = state ? JSON.parse(state) : {};
    console.log('Read AsyncStorage', { year, month, state });
    this.months.set(`${year}-${month}`, observable.map(state));
  }

  setDayState (year, month, day, state) {
    if (arguments.length === 2) {
      state = month;
      day = year.day;
      month = year.month;
      year = year.year;
    }
    assertDate(year, month, day);
    const m = this.months.get(`${year}-${month}`);
    if (!m) {
      this.months.set(`${year}-${month}`,
        observable.map({
          [day]: observable(state),
        })
      );
      this._writeMonth(year, month, {
        [day]: state,
      });
      return;
    }

    const d = m.get(String(day));
    if (d) {
      Object.assign(d, state);
    } else {
      m.set(day, state);
    }
    this._writeMonth(year, month, toJS(m));
  }

  getDayState (year, month, day) {
    if (typeof year == 'object' || arguments.length === 1) {
      day = year.day;
      month = year.month;
      year = year.year;
    }
    assertDate(year, month, day);

    let m = this.months.get(`${year}-${month}`);
    if (!m) {
      m = observable.map({});
      this.months.set(`${year}-${month}`, m);
    }

    let d = m.get(String(day));
    if (!d) {
      d = observable({});
      m.set(day, d);
    }

    return d;
  }

  getMonthState (year, month) {
    if (typeof year == 'object' || arguments.length === 1) {
      month = year.month;
      year = year.year;
    }

    let m = this.months.get(`${year}-${month}`);
    if (!m) {
      m = observable.map({});
      this.months.set(`${year}-${month}`, m);
    }

    return m;
  }

  _writeMonth (year, month, state) {
    console.log('Writing AsyncStorage', { year, month, state });
    const p = AsyncStorage.setItem(`@CalendarStore:${year}-${month}`, JSON.stringify(state));
    this._pending = Promise.all([ this.pending, p ]);
  }

  async clear (write) {
    this.months = new Map();
    if (write) {
      var keys = await AsyncStorage.getAllKeys().filter((k) => k.startsWith('@CalendarStore'));
      await AsyncStorage.multiRemove(keys);
    }
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
