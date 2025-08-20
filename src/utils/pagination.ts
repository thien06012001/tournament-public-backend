export function clampPageSize(size: number, max = 100, def = 20) {
  if (!Number.isFinite(size) || size <= 0) return def;
  return Math.min(size, max);
}

export function buildPageInfo(total: number, page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
