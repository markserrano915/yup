import isSchema from './util/isSchema';

class Lazy {
  constructor(mapFn) {
    this._resolve = (...args) => {
      let schema = mapFn(...args);
      if (!isSchema(schema))
        throw new TypeError('lazy() functions must return a valid schema');

      return schema;
    };
  }
  resolve({ value, ...rest }) {
    return this._resolve(value, rest);
  }
  cast(value, options) {
    return this._resolve(value, options).cast(value, options);
  }
  validate(value, options) {
    return this._resolve(value, options).validate(value, options);
  }
  validateSync(value, options) {
    return this._resolve(value, options).validateSync(value, options);
  }
  validateAt(path, value, options) {
    return this._resolve(value, options).validateAt(path, value, options);
  }
  validateSyncAt(path, value, options) {
    return this._resolve(value, options).validateSyncAt(path, value, options);
  }
}

Lazy.prototype.__isYupSchema__ = true;

export default Lazy;
