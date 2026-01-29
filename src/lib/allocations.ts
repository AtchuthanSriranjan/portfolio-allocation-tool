import data from "@/data/vanguard-return-ranges.json";
import type {
  HorizonData,
  ReturnRange,
  VanguardReturnRanges,
} from "@/types/finance";

const vanguard = data as VanguardReturnRanges;

export const HORIZONS = vanguard.horizons.map((h) => h.years);

export const ALLOCATION_PRESETS: ReturnRange[] =
  vanguard.horizons[0]?.allocations ?? [];

export function formatAllocationLabel(equity: number, bond: number): string {
  return `${Math.round(equity * 100)}/${Math.round(bond * 100)}`;
}

export function getHorizon(years: number): HorizonData {
  const found = vanguard.horizons.find((h) => h.years === years);
  if (!found) throw new Error(`Horizon ${years} not found in dataset`);
  return found;
}

export function getReturnRange(years: number, equity: number): ReturnRange {
  const horizon = getHorizon(years);
  const found = horizon.allocations.find(
    (a) => Math.abs(a.equity - equity) < 1e-9,
  );
  if (!found)
    throw new Error(
      `Allocation equity=${equity} not found for horizon ${years}`,
    );
  return found;
}

export function formatPercent(x: number): string {
  const pct = x * 100;
  return `${pct.toFixed(1)}%`;
}
