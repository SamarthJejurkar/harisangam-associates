// Fixed repeating pattern of tile shapes for the uneven gallery grid.
// Position-based (not stored per-image) so the admin's arrangement and the
// public gallery always render identically - what you drag into a slot is
// exactly what shape it becomes, no surprises between admin and live site.
// "" = normal square tile, "wide" = spans 2 columns, "tall" = spans 2 rows.
const SIZE_PATTERN = ["", "", "tall", "", "wide", "", "", "tall", "wide", "", "", "wide", "tall", ""];

export function tileSizeClasses(index) {
  const size = SIZE_PATTERN[index % SIZE_PATTERN.length];
  if (size === "wide") return "col-span-2 row-span-1";
  if (size === "tall") return "col-span-1 row-span-2";
  return "col-span-1 row-span-1";
}