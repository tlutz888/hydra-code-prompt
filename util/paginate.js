module.exports = (collection, options = {}) => {
  const page = +options.page || 1;
  const count = +options.count || 10;
  if (count <= 0 || count > process.env.MAX_PAGE_SIZE)
    throw new Error(`Page size out of range (max: ${process.env.MAX_PAGE_SIZE}).`);

  const totalCount = collection.length;
  if (!totalCount) {
    return {
      page: [],
      page_start: 0,
      page_end: 0,
      total_count: 0,
    };
  }

  const lastPage = Math.ceil(totalCount / count);
  if (page <= 0 || page > lastPage)
    throw new Error(`Page number out of range (max: ${lastPage}).`);

  const offset = (page - 1) * count;
  const pageItems = collection.slice(offset, offset + count);
  return {
    page: pageItems,
    page_start: offset + 1,
    page_end: offset + Math.max(1, pageItems.length),
    total_count: totalCount,
  };
};
