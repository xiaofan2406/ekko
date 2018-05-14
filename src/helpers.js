/* @flow */
export const orderBy = () => {};

export const groupBy = <T>(
  target: { [string]: T },
  iteratee: Iteratee
): { [string]: { [string]: T } } =>
  Object.keys(target).reduce((grouped, next) => {
    const key = iteratee(target[next]);
    const current = grouped[key] || {};

    grouped[key] = { ...current, [next]: target[next] };

    return grouped;
  }, {});

export const GROUP_DEFAULT_KEY = '__all__';
