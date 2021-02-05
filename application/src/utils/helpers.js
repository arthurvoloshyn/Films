export const isNumber = value => typeof value === 'number' && Number.isFinite(value);

export const isObjectOrNull = value => typeof value === 'object' && !Array.isArray(value);

export const isBoolean = value => typeof value === 'boolean';

export const isString = value => typeof value === 'string' || value instanceof String;

export const removeObjPropImmutably = (obj, prop) => {
  const res = { ...obj };
  delete res[prop];
  return res;
};
