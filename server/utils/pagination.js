function parsePagination(page, perPage) {
  const pageToNumber = Number(page ?? 1);
  const perPageToNumber = Number(perPage ?? 10);

  if (
    !Number.isInteger(pageToNumber) ||
    pageToNumber <= 0 ||
    !Number.isInteger(perPageToNumber) ||
    perPageToNumber <= 0 ||
    perPageToNumber > 100
  ) {
    return null;
  }

  return {
    page: pageToNumber,
    perPage: perPageToNumber,
  };
}

export default parsePagination;
