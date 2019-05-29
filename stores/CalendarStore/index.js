
import AsyncStorage from '@react-native-community/async-storage';
import { action, observable, reaction, computed } from 'mobx';
import { Month } from './classes';
import Promise from 'bluebird';
import deepAssign from 'deep-assign';

export class CalendarStore {
  @observable months = new Map();
  reactions = {};
  ensured = {};
  static writeIsPending = Promise.resolve();

  @computed
  get markings () {
    var results = {};
    this.months.forEach(({ days }) => days.forEach((d) => {
      if (!d.hasData) return;

      const { year, month, day } = d;
      const dayKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      results[dayKey] = {
        marked: true,
      };
    }));
    return results;
  }

  @action
  createMonth (year, month, overwrite) {
    const key = Month.generateKey(year, month);
    if (!overwrite && this.months.has(key)) {
      return this.months.get(key);
    }
    if (!this.ensured[key]) throw new Error(`Tried to create a month without ensuring it exists first: ${year}-${month}`);

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
  async ensureMonthLoaded (year, month, overwrite) {
    const key = Month.generateKey(year, month);
    if (!overwrite && this.ensured[key]) return;
    this.ensured[key] = [ year, month ];

    let data = await AsyncStorage.getItem(`@CalendarStore:${key}`);
    try {
      data = data && JSON.parse(data);
    } catch (e) {
      data = null;
    }

    if (overwrite) {
      data = deepAssign(data || {}, overwrite);
    }

    if (!data) return;

    let state = this.getMonth(year, month);
    if (state) {
      console.log('CalendarStore update', { year, month }, data);
      state.deserializeFrom(data);
      return;
    }

    console.log('CalendarStore read', { year, month }, data);
    state = Month.deserialize(data);
    this.startReacting(key, state);
    this.months.set(key, state);

    if (overwrite) {
      // trigger a write if we've updated with new data
      await CalendarStore.write(key, state.hasData ? JSON.stringify(state.serialize()) : '');
    }
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
    this.reactions[key] = reaction(
      () => (state.hasData ? JSON.stringify(state.serialize()) : ''),
      (json) => { CalendarStore.write(key, json); },
      { delay: 100 }
    );
  }

  static write (key, json) {
    console.log('CalendarStore write', key, json);
    const p = AsyncStorage.setItem(`@CalendarStore:${key}`, json);
    CalendarStore.writeIsPending = Promise.all([ CalendarStore.writeIsPending, p ]);
    return CalendarStore.writeIsPending;
  }

  async clear (write) {
    this.months.clear();
    if (write) {
      var keys = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith('@CalendarStore'));
      await AsyncStorage.multiRemove(keys);
    }
  }

  async export () {
    var keys = (await AsyncStorage.getAllKeys()).filter((k) => k.startsWith('@CalendarStore'));
    var collection = await Promise.map(keys, async (key) => [ key, await AsyncStorage.getItem(key) ]);
    return JSON.stringify(collection);
  }

  async import (collection) {
    try {
      collection = JSON.parse(collection);
    } catch (e) {
      return false;
    }
    var failed = await Promise.map(collection, async ([ key, data ]) => {
      try {
        data = data && JSON.parse(data) || null;
        if (!data || !data.year || !data.month) return `Data for ${key} was blank`;
      } catch (e) {
        return `Encountered an error loading for ${key}`;
      }
      await this.ensureMonthLoaded(data.year, data.month, data);
      return false;
    });
    failed = failed.filter(Boolean);
    if (failed.length) {
      console.error(failed);
      return false;
    }
    return true;
  }
}

export default new CalendarStore();
