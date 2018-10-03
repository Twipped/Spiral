
import { action, observable, computed } from 'mobx';
import {
  primitive,
  map,
  object,
  serializable,
  serialize,
  deserialize,
  update,
} from 'serializr';
import ObservableSet, { set } from '../../lib/observable-set';
import { some, groupBy, mapValues } from 'lodash';

export class Hour {
  @serializable(primitive()) key = '';
  @serializable(primitive()) year = '';
  @serializable(primitive()) month = '';
  @serializable(primitive()) day = '';
  @serializable(primitive()) hour = '';

  @serializable(set(primitive()))
  @observable
  emotions = new ObservableSet();

  @serializable(map(primitive()))
  @observable
  conditions = new Map();

  constructor (year, month, day, hour) {
    this.year = String(year);
    this.month = String(month);
    this.day = String(day);
    this.hour = String(hour);
    this.key = Hour.generateKey(this.year, this.month, this.day, this.hour);
  }

  static generateKey (year, month, day, hour) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}`;
  }

  @computed
  get hasData () {
    return !!this.emotions.size || !!this.conditions.size;
  }

  @computed
  get hash () {
    const emotions = this.emotions.size && Array.from(this.emotions).join(',') || '';
    const conditions = this.conditions.size && Array.from(this.conditions).flat(1).join(',');
    return emotions + ';' + conditions;
  }

  @computed
  get moodCounts () {
    const moodGroups = groupBy(Array.from(this.emotions), (e) => e.split('/')[0]);
    const moodCounts = mapValues(moodGroups, (m) => m.length);
    moodCounts.Conditions = this.conditions.size;
    return moodCounts;
  }

  @action
  setEmotion (emotionKey, on) {
    if (typeof on === 'undefined') on = !this.emotions.has(emotionKey);
    if (!on) this.emotions.delete(emotionKey);
    if (on) this.emotions.add(emotionKey);
    console.log('setEmotion', emotionKey, on, this.emotions.has(emotionKey));
  }

  @action
  setCondition (conditionKey, value) {
    this.conditions.set(conditionKey, value);
  }
}

export class Day {
  @serializable(primitive()) key = '';
  @serializable(primitive()) year = '';
  @serializable(primitive()) month = '';
  @serializable(primitive()) day = '';

  @serializable(map(object(Hour)))
  @observable
  hours = new Map();

  constructor (year, month, day) {
    this.year = String(year);
    this.month = String(month);
    this.day = String(day);
    this.key = Day.generateKey(this.year, this.month, this.day);
  }

  static generateKey (year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  @computed
  get hasData () {
    return !!this.hours.size && some([ ...this.hours.values() ], (h) => h.hasData);
  }

  getHour (hour, init) {
    hour = String(hour);
    return this.hours.get(hour) || (init && this.createHour(hour)) || undefined;
  }

  @action
  createHour (hour, overwrite) {
    hour = String(hour);
    if (!overwrite && this.hours.has(hour)) return this.hours.get(hour);
    const h = new Hour(this.year, this.month, this.day, hour);
    this.hours.set(hour, h);
    return h;
  }
}

export class Month {
  static version = '0.0.2';

  @serializable(primitive()) version = Month.version;
  @serializable(primitive()) key = '';
  @serializable(primitive()) year = '';
  @serializable(primitive()) month = '';

  @serializable(map(object(Day)))
  @observable
  days = new Map();

  constructor (year, month) {
    this.year = String(year);
    this.month = String(month);
    this.key = Month.generateKey(year, month);
  }

  static generateKey (year, month) {
    return `${year}-${String(month).padStart(2, '0')}`;
  }

  @computed
  get hasData () {
    return !!this.days.size && some([ ...this.days.values() ], (h) => h.hasData);
  }

  getDay (day, init) {
    day = String(day);
    return this.days.get(day) || (init && this.createDay(day)) || undefined;
  }

  @action
  createDay (day, overwrite) {
    day = String(day);
    if (!overwrite && this.days.has(day)) return this.days.get(day);
    const d = new Day(this.year, this.month, day);
    this.days.set(day, d);
    return d;
  }

  serialize () {
    return serialize(this);
  }

  deserializeFrom (data) {
    data = upgradeSerializedVersion(data);
    try {
      return update(Month, this, data);
    } catch (e) {
      console.log('Month could not be deserialized');
      return null;
    }
  }

  static deserialize (data) {
    data = upgradeSerializedVersion(data);
    try {
      return deserialize(Month, data);
    } catch (e) {
      console.log('Month could not be deserialized');
      return null;
    }
  }
}

function upgradeSerializedVersion (data) {
  if (data.version === Month.version) {
    return data;
  }

  if (!data.version) {
    return {};
  }
}

