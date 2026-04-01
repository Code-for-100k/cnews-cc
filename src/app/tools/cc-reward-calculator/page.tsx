import type { Metadata } from "next";
import { RewardCalculator } from "@/components/tools/reward-calculator";

export const metadata: Metadata = {
  title: "Canton Coin (CC) Staking Reward Calculator | cnews.cc",
  description:
    "Calculate your estimated Canton Coin (CC) staking rewards based on validator type, stake amount, and network activity. Compare Super Validator, App Validator, and Regular Validator returns.",
  keywords: [
    "Canton Coin staking calculator",
    "CC staking rewards",
    "Canton Network validator rewards",
    "CC APR calculator",
    "Canton staking yield",
    "Super Validator rewards",
    "App Validator rewards",
    "CC crypto staking",
  ],
  openGraph: {
    title: "Canton Coin (CC) Staking Reward Calculator",
    description:
      "Estimate your CC staking rewards by validator type and stake amount.",
    type: "website",
    url: "https://cnews.cc/tools/cc-reward-calculator",
  },
  alternates: {
    canonical: "https://cnews.cc/tools/cc-reward-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are Canton Coin (CC) staking rewards calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CC staking rewards come from transaction fees on the Canton Network. The total daily fee pool is distributed among validator types: Super Validators receive 20%, App Validators receive 62%, and the Canton Foundation receives 18%. Your individual reward depends on your stake proportion relative to other delegators on your chosen validator.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Super Validators and App Validators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Super Validators secure the Canton Network backbone and receive 20% of all transaction fees. App Validators run application-specific nodes and share 62% of fees proportional to bandwidth used. App Validators typically have a larger reward pool but may be split among more participants.",
      },
    },
    {
      "@type": "Question",
      name: "What APR can I expect from staking Canton Coin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CC staking APR varies based on network transaction volume, number of active validators, and total staked amount. Unlike inflationary tokens, Canton rewards come from real transaction fees, so APR is directly tied to network usage rather than a fixed emission schedule.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a minimum amount of CC required to stake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum staking amount depends on the validator you delegate to. Super Validators may have higher minimum requirements due to their critical role in network security. Check with individual validator operators for their specific minimum delegation amounts.",
      },
    },
    {
      "@type": "Question",
      name: "How often are CC staking rewards distributed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canton Network staking rewards are calculated and distributed based on transaction fee accrual. Rewards accumulate as transactions are processed on the network and can be claimed according to the validator's distribution schedule.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Canton Coin Staking Reward Calculator",
  description:
    "Calculate estimated CC staking rewards based on validator type, stake amount, and network parameters.",
  url: "https://cnews.cc/tools/cc-reward-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CCRewardCalculatorPage() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-[#00D4AA] uppercase tracking-wider mb-2">
            Free Tool
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Canton Coin (CC) Staking Reward Calculator
          </h1>
          <p className="mt-3 text-lg text-zinc-400 max-w-2xl">
            Estimate your CC staking rewards based on validator type, stake
            amount, and network activity. Compare returns across Super
            Validators, App Validators, and more.
          </p>
        </div>

        {/* Calculator Component */}
        <RewardCalculator />

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {(faqSchema.mainEntity as Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }>).map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-6"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
