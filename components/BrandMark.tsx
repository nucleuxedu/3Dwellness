import Box from "@mui/material/Box";

export default function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <Box component="svg" viewBox="0 0 40 40" width={size} height={size} aria-hidden sx={{ display: "block" }}>
      <path d="M20 6 33 13.5v15L20 36 7 28.5v-15L20 6Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 6v14.5M20 20.5 7 13.5M20 20.5 33 13.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="20" cy="20.5" r="2.4" fill="currentColor" />
    </Box>
  );
}
