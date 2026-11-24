import Box from "@mui/material/Box";
import { brand, ink } from "@/theme/theme";

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
      sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
    >
      {Array.from({ length: total }, (_, i) => {
        const state = i < spent ? "spent" : i < spent + hold ? "pending" : "available";
        return (
          <Box
            key={i}
            sx={{
              width: 18,
              height: 18,
              borderRadius: "3px",
              border: state === "spent" ? `1.5px solid ${ink}` : "none",
              opacity: state === "spent" ? 0.28 : 1,
              bgcolor: state === "spent" ? "transparent" : state === "pending" ? "#c4a35a" : brand,
              transition: "transform 180ms ease",
              "@media (hover: hover)": {
                "&:hover": { transform: "scale(1.08)" },
              },
            }}
          />
        );
      })}
    </Box>
  );
}
