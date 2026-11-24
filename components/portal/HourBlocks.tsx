import Box from "@mui/material/Box";

type Props = {
  granted: number;
  used: number;
  pending?: number;
};

export default function HourBlocks({ granted, used, pending = 0 }: Props) {
  const total = Math.round(granted / 60);
  const spent = Math.round(used / 60);
  const hold = Math.round(pending / 60);
  const left = Math.max(total - spent - hold, 0);

  return (
    <Box
      role="img"
      aria-label={`${left} of ${total} hours left${hold ? `, ${hold} about to be used` : ""}`}
      sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
    >
      {Array.from({ length: total }, (_, i) => {
        const state = i < spent ? "spent" : i < spent + hold ? "pending" : "available";
        return (
          <Box
            key={i}
            sx={{
              width: 20,
              height: 20,
              borderRadius: 0.5,
              border: state === "spent" ? "1px solid" : "none",
              borderColor: "divider",
              bgcolor:
                state === "spent"
                  ? "transparent"
                  : state === "pending"
                    ? "warning.main"
                    : "primary.main",
            }}
          />
        );
      })}
    </Box>
  );
}
