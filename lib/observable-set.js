import { observable, action } from 'mobx';
import { list } from 'serializr';

export default class ObservableSet {
  constructor (values) {
    this.map = values ? observable.map(values.map((v) => [ v, true ])) : observable.map();
  }

  add (value) {
    this.map.set(value, true);
    return this;
  }

  delete (value) {
    return this.map.delete(value);
  }

  has (value) {
    return this.map.has(value);
  }

  @action.bound
  set (values) {
    this.clear();
    for (const v of values) {
      this.add(v);
    }
  }

  clear () {
    this.map.clear();
  }

  get size () {
    return this.map.size;
  }

  [Symbol.iterator] () {
    return this.map.keys();
  }
}

export const set = (propSchema) => {
  var l = list(propSchema);

  return {
    serializer: (s) => l.serializer(Array.from(s)),
    deserializer: (jsonValue, done, context, oldValue) => {
      l.deserializer(jsonValue, (err, result) => {
        if (err) done(err);
        done(null, new ObservableSet(result));
      }, context, oldValue);
    },
  };
};
