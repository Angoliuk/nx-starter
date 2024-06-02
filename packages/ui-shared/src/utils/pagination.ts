export const getPaginationItems = ({
  itemsCount = 3,
  searchParams,
  ...params
}: {
  itemsCount?: number;
  page: number;
  searchParams: Record<string, unknown>;
  totalPages: number;
}) => {
  const totalPages = params.totalPages;
  const page =
    params.page > params.totalPages ? params.totalPages : params.page < 1 ? 1 : params.page;

  if (totalPages <= itemsCount) {
    return Array.from({ length: totalPages }).map((_, i) => {
      return {
        href: { query: { ...searchParams, page: i + 1 } },
        index: i + 1,
        isActive: page === i + 1,
        label: i + 1,
      };
    });
  }

  const sideLength = (itemsCount - 1) / 2;
  let rightSideLength = Math.ceil(sideLength);
  let leftSideLength = Math.floor(sideLength);

  const isRightFits = page + rightSideLength <= totalPages;
  const isLeftFits = page - leftSideLength >= 1;

  if (!isRightFits) {
    const neededToMove = page + rightSideLength - totalPages;
    rightSideLength = rightSideLength - neededToMove;
    leftSideLength += neededToMove;
  }

  if (!isLeftFits) {
    const neededToMove = leftSideLength - page + 1;
    leftSideLength -= neededToMove;
    rightSideLength = rightSideLength + neededToMove;
  }

  const items = [
    {
      href: { query: { ...searchParams, page } },
      index: page,
      isActive: true,
      label: page,
    },
  ];

  for (let i = 1; i < rightSideLength + 1; i++) {
    if (page + i > totalPages) break;

    items.push({
      href: { query: { ...searchParams, page: page + i } },
      index: page + i,
      isActive: false,
      label: page + i,
    });
  }

  for (let i = 1; i < leftSideLength + 1; i++) {
    if (page - i < 1) break;
    items.push({
      href: { query: { ...searchParams, page: page - i } },
      index: page - i,
      isActive: false,
      label: page - i,
    });
  }

  return items.sort((a, b) => a.index - b.index);
};
