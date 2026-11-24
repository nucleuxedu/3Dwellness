// @ts-nocheck
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import ListPagination, { pageSlice } from "./ListPagination";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import { btnMotionSx, listPanelSx, panelSx, rowDividerSx } from "./ui";
import type { PortalShared } from "./types";

type Plan = { id: number; name: string; minutes_per_month: number; price: number };
type LedgerEntry = { id: number; created_at: string; note: string; minutes: number };

const LEDGER_PAGE_SIZE = 5;

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}

export default function PlanAndHours({ version, bump, notify }: PortalShared) {
  const me = useApi(api.getMe, [version]);
  const plans = useApi(api.getPlans, []);
  const balance = useApi(api.getBalance, [version]);
  const ledger = useApi(api.getLedger, [version]);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [ledgerPage, setLedgerPage] = useState(1);
  if (!me || !plans || !balance || !ledger) return <Loading />;

  const ledgerPaged = pageSlice(ledger as LedgerEntry[], ledgerPage, LEDGER_PAGE_SIZE);

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
    <Box sx={{ maxWidth: 900, width: "100%", minWidth: 0 }}>
      <PageTitle title="Plan and hours">
        {current.name} plan, {hrs(balance.balance_minutes)} of {hrs(balance.granted_minutes)} hours left. Renews{" "}
        {fmtDate(balance.period_end)}.
        {next ? ` Changes to ${next.name} on renewal.` : ""}
      </PageTitle>

      <Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <HourBlocks granted={balance.granted_minutes} used={balance.used_minutes} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <SectionLabel>Plans</SectionLabel>
      </Box>
      <Box component="ul" sx={{ ...listPanelSx, mt: 1.5 }}>
        {plans.map((p: Plan) => {
          const isCurrent = p.id === current.id;
          const upgrade = p.minutes_per_month > current.minutes_per_month;
          return (
            <Box
              component="li"
              key={p.id}
              sx={{
                ...rowDividerSx,
                px: 2.25,
                py: 2,
                bgcolor: isCurrent ? "rgba(181,201,77,0.22)" : "transparent",
                borderLeft: isCurrent ? "3px solid" : "3px solid transparent",
                borderLeftColor: isCurrent ? "secondary.main" : "transparent",
              }}
            >
              <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
                    {hrs(p.minutes_per_month)} hours a month for ${p.price} · $
                    {(p.price / (p.minutes_per_month / 60)).toFixed(2)} an hour
                  </Typography>
                </Box>
                {isCurrent ? (
                  <Typography variant="body2" fontWeight={600} color="primary">
                    Your plan
                  </Typography>
                ) : confirmId !== p.id ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setConfirmId(p.id)}
                    sx={{ ...btnMotionSx, borderRadius: 0,minWidth: 180,maxWidth: 180 }}
                  >
                    Switch to {p.name}
                  </Button>
                ) : null}
              </Stack>
              {confirmId === p.id ? (
                <Box sx={{ mt: 1.5, bgcolor: "background.paper", p: 1.75 }}>
                  <Typography variant="body2">
                    {upgrade
                      ? `You get ${hrs(p.minutes_per_month - current.minutes_per_month)} more hours now and pay the difference for this month.`
                      : `Your hours stay as they are this month. The ${p.name} plan starts on ${fmtDate(balance.period_end)}.`}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1.5 }}>
                    <Button variant="contained" size="small" onClick={() => change(p)} sx={btnMotionSx}>
                      Switch to {p.name}
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => setConfirmId(null)} sx={btnMotionSx}>
                      Keep {current.name}
                    </Button>
                  </Stack>
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: 4 }}>
        <SectionLabel>Hour history</SectionLabel>
      </Box>
      {ledger.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          No hour transactions yet.
        </Typography>
      ) : (
        <>
          <Box component="ul" sx={{ ...listPanelSx, mt: 1.5, display: { xs: "block", md: "none" } }}>
            {ledgerPaged.items.map((e) => (
              <Box component="li" key={e.id} sx={{ ...rowDividerSx, px: 2, py: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" gap={1.5} alignItems="flex-start">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      {fmtDate(e.created_at)}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.25, wordBreak: "break-word" }}>
                      {e.note}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      fontVariantNumeric: "tabular-nums",
                      flex: "none",
                      color: e.minutes > 0 ? "primary.main" : "text.primary",
                    }}
                  >
                    {e.minutes > 0 ? "+" : "−"}
                    {hrs(Math.abs(e.minutes))}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>

          <Box sx={{ ...panelSx, mt: 1.5, overflowX: "auto", display: { xs: "none", md: "block" } }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>What happened</TableCell>
                  <TableCell align="right">Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ledgerPaged.items.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>{fmtDate(e.created_at)}</TableCell>
                    <TableCell>{e.note}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 600,
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

          <ListPagination
            page={ledgerPaged.page}
            pageSize={LEDGER_PAGE_SIZE}
            total={ledger.length}
            onChange={setLedgerPage}
            label="entries"
          />
        </>
      )}
    </Box>
  );
}
