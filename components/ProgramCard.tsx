"use client";

import { Card, CardContent, Chip, Typography } from "@mui/material";
import { BorderBeam } from "@/components/ui/border-beam";
import ScrollReveal from "@/lib/animaster/ScrollReveal";

type ProgramCardProps = {
  title: string;
  description: string;
  tag: string;
  delay?: number;
};

export default function ProgramCard({
  title,
  description,
  tag,
  delay = 0,
}: ProgramCardProps) {
  return (
    <ScrollReveal delay={delay} y={36}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 3,
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <BorderBeam
          size={180}
          duration={12}
          borderWidth={1.5}
          colorFrom="#B5C94D"
          colorTo="#1A1A14"
          delay={delay}
        />
        <CardContent sx={{ p: 0, position: "relative", zIndex: 1, "&:last-child": { pb: 0 } }}>
          <Chip label={tag} sx={{ mb: 3 }} />
          <Typography variant="headlineSm" component="h3" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
}
