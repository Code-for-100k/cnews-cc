import type { Metadata } from "next"
import { VALIDATORS } from "@/lib/data/mock"
import { ValidatorTable } from "@/components/validators/validator-table"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Validators | Canton Network Validator Leaderboard | cnews.cc",
  description:
    "Explore Canton Network validators ranked by stake, uptime, commission, and delegators. Find the best validator for staking your CC tokens.",
  openGraph: {
    title: "Validators | Canton Network Validator Leaderboard | cnews.cc",
    description:
      "Explore Canton Network validators ranked by stake, uptime, commission, and delegators.",
    type: "website",
  },
}

export default function ValidatorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Validator Leaderboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Canton Network validators ranked by total stake. Click any validator
            to see detailed stats and delegation info.
          </p>
        </div>

        <Separator className="mb-8" />

        <ValidatorTable validators={VALIDATORS} />
      </div>
    </div>
  )
}
