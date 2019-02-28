
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
import { each, some, groupBy, mapValues } from 'lodash';

export class Hour {
  @serializable(primitive()) key = '';
  @serializable(primitive()) year = '';
  @serializable(primitive()) month = '';
  @serializable(primitive()) day = '';
  @serializable(primitive()) hour = '';

  @serializable(map(primitive()))
  @observable
  values = new Map();

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
    return !!this.values.size;
  }

  @computed
  get hash () {
    return this.values.size && Array.from(this.values).flat(1).join(',');
  }

  @computed
  get tabCounts () {
    const moodGroups = groupBy(Array.from(this.values.keys()), (k) => k.split('/')[0]);
    const moodCounts = mapValues(moodGroups, (m) => m.length);
    return moodCounts;
  }

  @computed
  get keysByClass () {
    return groupBy(Array.from(this.values.keys()), (k) => k.split('/')[0]);
  }

  @action
  setValue (conditionKey, value) {
    if (value === null) {
      this.values.delete(conditionKey);
      return;
    }
    this.values.set(conditionKey, value);
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
  get hoursSorted () {
    var sorted = new Map();
    Array.from(this.hours.keys())
      .sort((a, b) => a - b)
      .forEach((k) => sorted.set(k, this.hours.get(k)));
    return sorted;
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
  static version = '0.0.3';

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

  if (!data.version || !upgrades[data.version]) {
    return {};
  }

  const oldVersion = data.version;
  data = upgrades[data.version](data);
  console.log('Upgraded month from ' + oldVersion, data);
  return data;
}

const upgrades = {
  '0.0.2': function (data) {
    const keyMap = {
      'appetite':            'Mind/appetite',
      'emotional-stability': 'Mind/emotional-stability',
      'sex-crave':           'Mind/sex-crave',
      'sex-drive':           'Mind/sex-drive',
      'gender-dysphoria':    'Mind/gender-dysphoria',
      'vocal-quality':       'Mind/vocal-quality',
      'social-anxiety':      'Mind/social-anxiety',
      'body-confidence':     'Mind/body-confidence',
      'general-mood':        'Mind/general-mood',
      'sleep':               'Body/sleep',
      'energy':              'Body/energy',
      'temperature':         'Body/temperature',
      'weight':              'Body/weight',
    };

    if (!data.days) return data;
    each(data.days, (day) => {
      each(day.hours, (hour) => {
        hour.values = {};
        each(hour._emotions, (emotion) => {
          hour.values[emotion] = true;
        });
        each(hour._conditions, (value, condition) => {
          if (value === null) return;
          const key = keyMap[condition];
          hour.values[key] = value;
        });
        delete hour._emotions;
        delete hour._conditions;
      });
    });
    data.version = '0.0.3';
    return data;
  },
};
