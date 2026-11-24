import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  label?: string;
};

export default function ListPagination({ page, pageSize, total, onChange, label = "items" }: Props) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const current = Math.min(page, Math.max(1, totalPages));
  const from = (current - 1) * pageSize + 1;
  const to = Math.min(current * pageSize, total);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1.5,
        px: 0.5,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Showing {from}–{to} of {total} {label}
      </Typography>
      <Pagination
        count={totalPages}
        page={current}
        onChange={(_, val) => onChange(val)}
        size="small"
        color="primary"
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
      />
    </Box>
  );
}

export function pageSlice<T>(items: T[], page: number, pageSize: number): { page: number; items: T[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  return {
    page: safePage,
    totalPages,
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
  };
}
