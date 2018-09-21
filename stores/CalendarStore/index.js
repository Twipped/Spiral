
import { AsyncStorage } from 'react-native';
import { action, observable, reaction } from 'mobx';
import { Month } from './classes';
import Promise from 'bluebird';

class CalendarStore {
  @observable months = new Map();
  reactions = {};
  ensured = {};
  static writeIsPending = Promise.resolve();

  @action
  createMonth (year, month, overwrite) {
    const key = Month.generateKey(year, month);
    if (!overwrite && this.months.has(key)) {
      return this.months.get(key);
    }
    if (!this.ensured[key]) throw new Error('Tried to create a month without ensuring it exists first.');

    const state = new Month(year, month);

    this.startReacting(key, state);

    this.months.set(key, state);
    return state;
  }

  getMonth (year, month, init) {
    const key = Month.generateKey(year, month);
    const state = this.months.get(key);
    if (state || !init) return state;

    return this.createMonth(year, month);
  }

  @action
  async ensureMonthLoaded (year, month) {
    const key = Month.generateKey(year, month);
    if (this.months.has(key) || this.ensured[key]) return;
    this.ensured[key] = true;

    let data = await AsyncStorage.getItem(`@CalendarStore:${key}`);
    data = data ? JSON.parse(data) : {};

    console.log('CalendarStore read', { year, month }, data);

    const state = Month.deserialize(data);
    this.startReacting(key, state);
  }

  getDay (year, month, day, init) {
    const mState = this.getMonth(year, month, init);
    if (!mState) return;

    return mState.getDay(day, init);
  }

  getHour (year, month, day, hour, init) {
    const dState = this.getDay(year, month, day, init);
    if (!dState) return;

    return dState.getHour(hour, init);
  }

  startReacting (key, state) {
    this.reactions[key] = false || reaction(
      () => state.hasData && state.serialize(),
      (raw) => { if (raw) CalendarStore.write(key, raw); },
      { delay: 100 }
    );
  }

  static write (key, raw) {
    console.log('CalendarStore write', key, raw);
    const p = AsyncStorage.setItem(`@CalendarStore:${key}`, JSON.stringify(raw));
    CalendarStore.writeIsPending = Promise.all([ CalendarStore.writeIsPending, p ]);
    return CalendarStore.writeIsPending;
  }

  static async clear (write) {
    this.months.clear();
    if (write) {
      var keys = await AsyncStorage.getAllKeys().filter((k) => k.startsWith('@CalendarStore'));
      await AsyncStorage.multiRemove(keys);
    }
  }
}

export default new CalendarStore;
