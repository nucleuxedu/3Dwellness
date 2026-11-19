import { Box, Typography } from "@mui/material";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: number | string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  maxWidth = 720,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        maxWidth,
        mx: align === "center" ? "auto" : 0,
      }}
    >
      {eyebrow && (
        <Typography
          variant="labelSm"
          sx={{
            color: "text.secondary",
            mb: 2,
            display: "block",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        variant="headlineLg"
        component="h2"
        sx={{
          mb: description ? 2.5 : 0,
          fontSize: { xs: "36px", sm: "48px", md: "65px" },
          lineHeight: { xs: "42px", sm: "56px", md: "78px" },
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="bodyLg"
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            lineHeight: { xs: "24px", md: "30px" },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
