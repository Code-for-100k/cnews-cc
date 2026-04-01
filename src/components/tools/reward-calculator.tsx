"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Coins,
  TrendingUp,
  Info,
  Calculator,
  Zap,
  Shield,
  Server,
} from "lucide-react";

const CC_PRICE_USD = 0.42;
const DEFAULT_DAILY_TXS = 500_000;
const AVG_FEE_PER_TX_CC = 0.001;

type ValidatorType = "super" | "app" | "regular";

interface ValidatorConfig {
  label: string;
  description: string;
  rewardSharePct: number;
  icon: typeof Shield;
  color: string;
}

const VALIDATOR_CONFIGS: Record<ValidatorType, ValidatorConfig> = {
  super: {
    label: "Super Validator",
    description: "Top-tier validators securing the Canton Network backbone",
    rewardSharePct: 20,
    icon: Shield,
    color: "text-[#00D4AA]",
  },
  app: {
    label: "App Validator",
    description:
      "Application validators earning rewards proportional to bandwidth used",
    rewardSharePct: 62,
    icon: Server,
    color: "text-blue-400",
  },
  regular: {
    label: "Regular Validator",
    description: "Canton Foundation receives remaining allocation",
    rewardSharePct: 18,
    icon: Zap,
    color: "text-amber-400",
  },
};

function formatCC(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  if (value >= 1) return value.toFixed(4);
  return value.toFixed(6);
}

function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function RewardCalculator() {
  const [stakeAmount, setStakeAmount] = useState<string>("10000");
  const [validatorType, setValidatorType] = useState<ValidatorType>("super");
  const [dailyTxs, setDailyTxs] = useState<string>(
    DEFAULT_DAILY_TXS.toString()
  );
  const [validatorCount, setValidatorCount] = useState<string>("10");

  const rewards = useMemo(() => {
    const stake = parseFloat(stakeAmount) || 0;
    const txs = parseFloat(dailyTxs) || 0;
    const validators = parseInt(validatorCount) || 1;
    const config = VALIDATOR_CONFIGS[validatorType];

    // Total daily fee pool from network transactions
    const dailyFeePool = txs * AVG_FEE_PER_TX_CC;

    // Validator type's share of the fee pool
    const typeShare = dailyFeePool * (config.rewardSharePct / 100);

    // Per-validator share (split equally among validators of this type)
    const perValidatorShare = typeShare / validators;

    // User's proportional reward based on stake weight
    // Simplified model: assume total staked across all validators is 50M CC
    const totalStakedNetwork = 50_000_000;
    const stakeWeight = stake / (totalStakedNetwork / validators);
    const dailyReward = perValidatorShare * Math.min(stakeWeight, 1);

    return {
      daily: dailyReward,
      weekly: dailyReward * 7,
      monthly: dailyReward * 30,
      annual: dailyReward * 365,
      dailyUsd: dailyReward * CC_PRICE_USD,
      weeklyUsd: dailyReward * 7 * CC_PRICE_USD,
      monthlyUsd: dailyReward * 30 * CC_PRICE_USD,
      annualUsd: dailyReward * 365 * CC_PRICE_USD,
      feePool: dailyFeePool,
      typeShare,
      perValidatorShare,
      apr:
        stake > 0 ? ((dailyReward * 365) / stake) * 100 : 0,
    };
  }, [stakeAmount, validatorType, dailyTxs, validatorCount]);

  const config = VALIDATOR_CONFIGS[validatorType];
  const ValidatorIcon = config.icon;

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs Panel */}
        <Card className="border-[#00D4AA]/20 bg-zinc-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Calculator className="size-5 text-[#00D4AA]" />
              Staking Parameters
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Configure your staking setup to estimate rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stake Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                CC Amount to Stake
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="10000"
                  min={0}
                  className="h-12 bg-zinc-900 border-zinc-800 text-white text-lg pr-12 focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00D4AA]">
                  CC
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1000000}
                step={1000}
                value={parseFloat(stakeAmount) || 0}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-800 accent-[#00D4AA] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D4AA] [&::-webkit-slider-thumb]:appearance-none"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>0 CC</span>
                <span>1,000,000 CC</span>
              </div>
            </div>

            {/* Validator Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Validator Type
              </label>
              <Select
                value={validatorType}
                onValueChange={(val) => { if (val !== null) setValidatorType(val as ValidatorType); }}
              >
                <SelectTrigger className="h-12 w-full bg-zinc-900 border-zinc-800 text-white focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {(
                    Object.entries(VALIDATOR_CONFIGS) as [
                      ValidatorType,
                      ValidatorConfig,
                    ][]
                  ).map(([key, cfg]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="text-white focus:bg-zinc-800 focus:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <cfg.icon className={`size-4 ${cfg.color}`} />
                        {cfg.label}{" "}
                        <span className="text-zinc-500">
                          ({cfg.rewardSharePct}% share)
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500">{config.description}</p>
            </div>

            {/* Daily Transactions */}
            <div className="space-y-2">
              <TooltipProvider>
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                  Est. Daily Network Transactions
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-3.5 text-zinc-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Total daily transactions across the Canton Network.
                        Higher volume means more fees distributed to validators.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </label>
              </TooltipProvider>
              <Input
                type="number"
                value={dailyTxs}
                onChange={(e) => setDailyTxs(e.target.value)}
                placeholder="500000"
                min={0}
                className="h-12 bg-zinc-900 border-zinc-800 text-white text-lg focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30"
              />
            </div>

            {/* Number of Validators */}
            <div className="space-y-2">
              <TooltipProvider>
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                  Validators of This Type
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-3.5 text-zinc-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Number of active validators sharing this pool. Rewards
                        are split equally among them.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </label>
              </TooltipProvider>
              <Input
                type="number"
                value={validatorCount}
                onChange={(e) => setValidatorCount(e.target.value)}
                placeholder="10"
                min={1}
                className="h-12 bg-zinc-900 border-zinc-800 text-white text-lg focus-visible:border-[#00D4AA] focus-visible:ring-[#00D4AA]/30"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* APR Card */}
          <Card className="border-[#00D4AA]/30 bg-gradient-to-br from-[#00D4AA]/10 to-zinc-950">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Estimated APR</p>
                  <p className="text-4xl font-bold text-[#00D4AA] tabular-nums">
                    {rewards.apr.toFixed(2)}%
                  </p>
                </div>
                <div className="size-14 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
                  <TrendingUp className="size-7 text-[#00D4AA]" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-[#00D4AA]/30 text-[#00D4AA] text-xs"
                >
                  <ValidatorIcon className="size-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-zinc-700 text-zinc-400 text-xs"
                >
                  {config.rewardSharePct}% pool share
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Daily",
                cc: rewards.daily,
                usd: rewards.dailyUsd,
              },
              {
                label: "Weekly",
                cc: rewards.weekly,
                usd: rewards.weeklyUsd,
              },
              {
                label: "Monthly",
                cc: rewards.monthly,
                usd: rewards.monthlyUsd,
              },
              {
                label: "Annual",
                cc: rewards.annual,
                usd: rewards.annualUsd,
              },
            ].map((period) => (
              <Card
                key={period.label}
                className="border-zinc-800 bg-zinc-950"
              >
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    {period.label}
                  </p>
                  <p className="text-lg font-semibold text-white mt-1 tabular-nums">
                    {formatCC(period.cc)}{" "}
                    <span className="text-[#00D4AA] text-sm">CC</span>
                  </p>
                  <p className="text-sm text-zinc-400 tabular-nums">
                    {formatUSD(period.usd)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Network Stats */}
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-sm text-zinc-300">
                Network Fee Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Daily Fee Pool</span>
                  <span className="text-white tabular-nums">
                    {formatCC(rewards.feePool)} CC
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">
                    {config.label} Pool ({config.rewardSharePct}%)
                  </span>
                  <span className="text-white tabular-nums">
                    {formatCC(rewards.typeShare)} CC
                  </span>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Per Validator Share</span>
                  <span className="text-[#00D4AA] font-medium tabular-nums">
                    {formatCC(rewards.perValidatorShare)} CC
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reward Breakdown Table */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="size-5 text-[#00D4AA]" />
            Reward Calculation Breakdown
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Step-by-step breakdown of how your estimated rewards are calculated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Step</TableHead>
                <TableHead className="text-zinc-400">Calculation</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Result
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-800">
                <TableCell className="text-zinc-300">
                  1. Daily Fee Pool
                </TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs">
                  {parseInt(dailyTxs).toLocaleString()} txs x{" "}
                  {AVG_FEE_PER_TX_CC} CC/tx
                </TableCell>
                <TableCell className="text-white text-right tabular-nums">
                  {formatCC(rewards.feePool)} CC
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="text-zinc-300">
                  2. {config.label} Share
                </TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs">
                  {formatCC(rewards.feePool)} CC x {config.rewardSharePct}%
                </TableCell>
                <TableCell className="text-white text-right tabular-nums">
                  {formatCC(rewards.typeShare)} CC
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="text-zinc-300">
                  3. Per Validator
                </TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs">
                  {formatCC(rewards.typeShare)} CC / {validatorCount} validators
                </TableCell>
                <TableCell className="text-white text-right tabular-nums">
                  {formatCC(rewards.perValidatorShare)} CC
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="text-zinc-300 font-medium">
                  4. Your Daily Reward
                </TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs">
                  Weighted by your stake proportion
                </TableCell>
                <TableCell className="text-[#00D4AA] text-right font-medium tabular-nums">
                  {formatCC(rewards.daily)} CC
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Educational Content */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-white">
            How Canton Network Staking Rewards Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-400 leading-relaxed">
          <p>
            The Canton Network uses a transaction-fee-based reward model rather
            than inflationary block rewards. This means validators earn CC
            tokens from the fees generated by actual network usage, creating a
            sustainable economic model tied to real demand.
          </p>

          <h3 className="text-base font-semibold text-white mt-6">
            Reward Distribution Model
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div className="rounded-lg border border-[#00D4AA]/20 bg-[#00D4AA]/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="size-4 text-[#00D4AA]" />
                <span className="font-medium text-[#00D4AA]">20%</span>
              </div>
              <p className="text-xs text-zinc-400">
                <span className="text-zinc-200 font-medium">
                  Super Validators
                </span>{" "}
                secure the network backbone and earn 20% of all transaction
                fees.
              </p>
            </div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Server className="size-4 text-blue-400" />
                <span className="font-medium text-blue-400">62%</span>
              </div>
              <p className="text-xs text-zinc-400">
                <span className="text-zinc-200 font-medium">
                  App Validators
                </span>{" "}
                run application-specific nodes and split 62% proportional to
                bandwidth used.
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-4 text-amber-400" />
                <span className="font-medium text-amber-400">18%</span>
              </div>
              <p className="text-xs text-zinc-400">
                <span className="text-zinc-200 font-medium">
                  Canton Foundation
                </span>{" "}
                receives the remaining 18% to fund network development and
                governance.
              </p>
            </div>
          </div>

          <h3 className="text-base font-semibold text-white mt-6">
            Key Factors Affecting Rewards
          </h3>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li>
              <span className="text-zinc-200">Network transaction volume</span>{" "}
              -- higher usage means a larger fee pool
            </li>
            <li>
              <span className="text-zinc-200">
                Number of active validators
              </span>{" "}
              -- fewer validators means a larger individual share
            </li>
            <li>
              <span className="text-zinc-200">Your stake amount</span> --
              larger stakes earn proportionally more from each validator
            </li>
            <li>
              <span className="text-zinc-200">Validator type selection</span>{" "}
              -- app validators receive the largest pool share at 62%
            </li>
            <li>
              <span className="text-zinc-200">Average fee per transaction</span>{" "}
              -- varies based on transaction complexity and type
            </li>
          </ul>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 mt-4">
            <p className="text-xs text-zinc-500">
              <strong className="text-zinc-300">Disclaimer:</strong> This
              calculator provides estimates based on simplified assumptions.
              Actual rewards depend on real-time network conditions, total
              staked amounts, validator performance, and other dynamic factors.
              The CC price used ({formatUSD(CC_PRICE_USD)}) is for illustration
              only and does not constitute financial advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
