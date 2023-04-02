const caseInsensitiveMatch = (a, b) => {
  return a.localeCompare(b, 'en', { sensitivity: 'accent' }) === 0;
};

module.exports = {
  find: (collection, field, query) => {
    return (collection || []).find(
      x => caseInsensitiveMatch(x[field] || '', query),
    );
  },
  getKeys: (obj, keys) => {
    return Object.keys(obj)
      .filter((key) => { return keys.includes(key) && obj[key]; })
      .reduce((memo, key) => {
        memo[key] = obj[key];
        return memo;
      }, {});
  },
};
