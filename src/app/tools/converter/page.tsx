import type { Metadata } from "next";
import { Converter } from "@/components/tools/converter";

export const metadata: Metadata = {
  title: "Canton Coin (CC) Price Converter | cnews.cc",
  description:
    "Convert Canton Coin (CC) to USD, EUR, GBP, BTC, and ETH. Live CC price conversion tool with popular conversion amounts and exchange rate reference.",
  keywords: [
    "CC to USD",
    "Canton Coin to USD",
    "CC price converter",
    "Canton Coin converter",
    "CC to EUR",
    "CC to BTC",
    "CC to ETH",
    "Canton Coin exchange rate",
    "CC crypto converter",
    "Canton Network token price",
  ],
  openGraph: {
    title: "Canton Coin (CC) Price Converter",
    description:
      "Convert CC to USD, EUR, GBP, BTC, and ETH with live exchange rates.",
    type: "website",
    url: "https://cnews.cc/tools/converter",
  },
  alternates: {
    canonical: "https://cnews.cc/tools/converter",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the current price of Canton Coin (CC) in USD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The price of Canton Coin fluctuates based on market conditions. Use our converter tool above for the latest CC to USD exchange rate. Factors affecting CC price include network adoption, transaction volume, and staking demand.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert Canton Coin to Bitcoin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the converter tool above to calculate CC to BTC conversions. Select BTC from the currency dropdown and enter your CC amount. The tool provides real-time conversion rates between Canton Coin and Bitcoin.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy Canton Coin (CC)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canton Coin (CC) can be acquired through participating exchanges and platforms that support the Canton Network. Check the official Canton Network documentation for a list of supported exchanges and on-ramp options.",
      },
    },
    {
      "@type": "Question",
      name: "Is Canton Coin a good investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canton Coin serves as the utility token for the Canton Network, a blockchain designed for institutional financial applications. Its value is driven by network usage and adoption. This converter tool is for informational purposes only and does not constitute financial advice. Always do your own research before investing.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Canton Coin different from other cryptocurrencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canton Coin powers the Canton Network, which uniquely supports privacy-preserving transactions for institutional finance. Unlike public blockchains, Canton enables regulated entities to transact with built-in compliance features while maintaining the benefits of decentralized technology.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Canton Coin Price Converter",
  description:
    "Convert Canton Coin (CC) to USD, EUR, GBP, BTC, and ETH with live exchange rates.",
  url: "https://cnews.cc/tools/converter",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConverterPage() {
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
            Canton Coin (CC) Price Converter
          </h1>
          <p className="mt-3 text-lg text-zinc-400 max-w-2xl">
            Instantly convert Canton Coin to USD, EUR, GBP, Bitcoin, and
            Ethereum. Quick-reference popular conversion amounts and live
            exchange rates.
          </p>
        </div>

        {/* Converter Component */}
        <Converter />

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
