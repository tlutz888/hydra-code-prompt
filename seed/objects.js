module.exports = (faker, userIDs) => {
  const userCount = userIDs.length;
  return [...Array(userCount * 5)].reduce((memo) => {
    memo.push({
      id: faker.random.uuid(),
      owner: userIDs[Math.floor(Math.random() * userCount)],
      item: faker.commerce.product(),
      material: faker.commerce.productMaterial(),
      description: faker.commerce.productAdjective(),
    });
    return memo;
  }, []).sort(
    (a, b) => a.id.localeCompare(b.id),
  );
};
