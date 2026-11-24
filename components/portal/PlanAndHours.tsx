import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { api } from "@/lib/portal/api";
import { fmtDate, hrs } from "@/lib/portal/dates";
import { useApi } from "@/lib/portal/useApi";
import HourBlocks from "./HourBlocks";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import type { PortalShared } from "./types";

type Plan = { id: number; name: string; minutes_per_month: number; price: number };
type LedgerEntry = { id: number; created_at: string; note: string; minutes: number };

export default function PlanAndHours({ version, bump, notify }: PortalShared) {
  const me = useApi(api.getMe, [version]);
  const plans = useApi(api.getPlans, []);
  const balance = useApi(api.getBalance, [version]);
  const ledger = useApi(api.getLedger, [version]);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  if (!me || !plans || !balance || !ledger) return <Loading />;

  const current: Plan = me.subscription.plan;
  const next: Plan | null = me.subscription.next_plan;

  const change = (plan: Plan) => {
    api.changePlan(plan.id).then((res: { effective: string; added_minutes: number }) => {
      notify(
        res.effective === "now"
          ? `Plan changed to ${plan.name}. ${hrs(res.added_minutes)} hours added.`
          : `Plan changes to ${plan.name} on ${fmtDate(balance.period_end)}.`
      );
      setConfirmId(null);
      bump();
    });
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <PageTitle title="Plan and hours">
        {current.name} plan, {hrs(balance.balance_minutes)} of {hrs(balance.granted_minutes)} hours left. Renews{" "}
        {fmtDate(balance.period_end)}.
        {next ? ` Changes to ${next.name} on renewal.` : ""}
      </PageTitle>

      <HourBlocks granted={balance.granted_minutes} used={balance.used_minutes} />

      <Typography variant="h3" component="h2" color="primary" sx={{ mt: 4 }}>
        Plans
      </Typography>
      <List
        dense
        sx={{
          mt: 1.5,
          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          py: 0,
        }}
      >
        {plans.map((p: Plan) => {
          const isCurrent = p.id === current.id;
          const upgrade = p.minutes_per_month > current.minutes_per_month;
          return (
            <ListItem
              key={p.id}
              alignItems="flex-start"
              sx={{
                flexDirection: "column",
                alignItems: "stretch",
                py: 2,
                px: 2,
                bgcolor: isCurrent ? "secondary.main" : "transparent",
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": { borderBottom: 0 },
              }}
            >
              <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
                    {hrs(p.minutes_per_month)} hours a month for ${p.price}, which is $
                    {(p.price / (p.minutes_per_month / 60)).toFixed(2)} an hour
                  </Typography>
                </Box>
                {isCurrent ? (
                  <Typography variant="body2" fontWeight={500} color="primary">
                    Your plan
                  </Typography>
                ) : confirmId !== p.id ? (
                  <Button variant="outlined" size="small" onClick={() => setConfirmId(p.id)}>
                    Switch to {p.name}
                  </Button>
                ) : null}
              </Stack>
              {confirmId === p.id ? (
                <Box sx={{ mt: 1.5, bgcolor: "background.paper", borderRadius: 1, p: 1.5 }}>
                  <Typography variant="body2">
                    {upgrade
                      ? `You get ${hrs(p.minutes_per_month - current.minutes_per_month)} more hours now and pay the difference for this month.`
                      : `Your hours stay as they are this month. The ${p.name} plan starts on ${fmtDate(balance.period_end)}.`}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1.5 }}>
                    <Button variant="contained" size="small" onClick={() => change(p)}>
                      Switch to {p.name}
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => setConfirmId(null)}>
                      Keep {current.name}
                    </Button>
                  </Stack>
                </Box>
              ) : null}
            </ListItem>
          );
        })}
      </List>

      <Typography variant="h3" component="h2" color="primary" sx={{ mt: 4 }}>
        Hour history
      </Typography>
      <Box
        sx={{
          mt: 1.5,
          overflowX: "auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.default",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>What happened</TableCell>
              <TableCell align="right">Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ledger.map((e: LedgerEntry) => (
              <TableRow key={e.id}>
                <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>{fmtDate(e.created_at)}</TableCell>
                <TableCell>{e.note}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                    color: e.minutes > 0 ? "primary.main" : "text.primary",
                  }}
                >
                  {e.minutes > 0 ? "+" : "−"}
                  {hrs(Math.abs(e.minutes))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
