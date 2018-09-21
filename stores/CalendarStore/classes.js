
import { action, observable, computed } from 'mobx';
import {
  primitive,
  list,
  map,
  object,
  serializable,
  serialize,
  deserialize,
} from 'serializr';
import ObservableSet, { set } from '../../lib/observable-set';
import { some } from 'lodash';

export class Hour {
  @serializable(primitive()) year = 0;
  @serializable(primitive()) month = 0;
  @serializable(primitive()) day = 0;
  @serializable(primitive()) hour = 0;

  @serializable(set(primitive()))
  @observable
  emotions = new ObservableSet();

  @serializable(map(primitive()))
  @observable
  symptoms = new Map();

  constructor (year, month, day, hour) {
    this.year = Number(year);
    this.month = Number(month);
    this.day = Number(day);
    this.hour = Number(hour);
  }

  static generateKey (year, month, day, hour) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')} `;
  }
  get key () {
    return Hour.generateKey(this.year, this.month, this.day, this.hour);
  }

  @computed
  get hasData () {
    return !!this.emotions.size && !!this.symptoms.size;
  }

  @action
  setEmotion (emotionKey, on) {
    if (typeof on === 'undefined') on = !this.emotions.has(emotionKey);
    if (!on) this.emotions.remove(emotionKey);
    if (on) this.emotions.add(emotionKey);
    console.log('setEmotion', emotionKey, on, this.emotions.has(emotionKey));
  }

  @action
  setSymptom (symptomKey, value) {
    this.symptoms.set(symptomKey, value);
  }
}

export class Day {
  @serializable(primitive()) year = 0;
  @serializable(primitive()) month = 0;
  @serializable(primitive()) day = 0;

  @serializable(map(object(Hour)))
  @observable
  hours = new Map();

  constructor (year, month, day) {
    this.year = Number(year);
    this.month = Number(month);
    this.day = Number(day);
  }

  static generateKey (year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  get key () {
    return Day.generateKey(this.year, this.month, this.day);
  }

  @computed
  get hasData () {
    return this.hours.size && some({ ...this.hours.values() }, (h) => h.hasData);
  }

  getHour (hour, init) {
    hour = Number(hour);
    return this.hours.get(hour) || (init && this.createHour(hour)) || undefined;
  }

  @action
  createHour (hour, overwrite) {
    hour = Number(hour);
    if (!overwrite && this.hours.has(hour)) return this.hours.get(hour);
    console.log('created hour');
    const h = new Hour(this.year, this.month, this.day, hour);
    this.hours.set(hour, h);
    return h;
  }
}

export class Month {
  @serializable(primitive()) year = 0;
  @serializable(primitive()) month = 0;

  @serializable(map(object(Day)))
  @observable
  days = new Map();

  constructor (year, month) {
    this.year = Number(year);
    this.month = Number(month);
  }

  static generateKey (year, month) {
    return `${year}-${String(month).padStart(2, '0')}`;
  }
  get key () {
    return Month.generateKey(this.year, this.month);
  }

  @computed
  get hasData () {
    return this.days.size && some({ ...this.days.values() }, (h) => h.hasData);
  }

  getDay (day, init) {
    day = Number(day);
    return this.days.get(day) || (init && this.createDay(day)) || undefined;
  }

  @action
  createDay (day, overwrite) {
    day = Number(day);
    if (!overwrite && this.days.has(day)) return this.days.get(day);
    console.log('created day');
    const d = new Day(this.year, this.month, day);
    this.days.set(day, d);
    return d;
  }

  serialize () {
    return serialize(this);
  }

  static deserialize (data) {
    return deserialize(Month, data);
  }
}
