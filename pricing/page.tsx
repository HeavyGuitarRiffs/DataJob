"use client";

import { Chatbox } from "@/components/Chatbox";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(
        "pk_test_51Qwe7dGPESFqZVLrkKIF8ZyoWoVQYzjv8E8HahilHBgxJ5AKyHm9Eg9AaHMgqZJNVpvN4oVatlJZ06YILaDuGXB800DeC7G9b6"
      );
      setStripe(stripeInstance);
    };
    initializeStripe();
  }, []);

  const handleCheckout = async (priceId: string) => {
    if (!stripe) {
      console.error("Stripe not loaded");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const session = await res.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const plans = [
    {
      title: "Freemium",
      desc: "Perfect for job seekers trying out the platform.",
      price: "Free",
      priceId: "price_1R93iQGPESFqZVLryeO1zy82",
      buttonText: "Start Free",
      color: "bg-cyan-600 hover:bg-cyan-700",
      features: [
        "Pomodoro Focus Timer",
        "Top Job Sites Search",
        "Remote Job Boards",
      ],
    },
    {
      title: "Basic",
      desc: "For casual job hunters who need structure and AI support.",
      price: "$10/month",
      priceId: "price_1R8xrJGPESFqZVLruuSRTica",
      buttonText: "Subscribe for $10/month",
      color: "bg-purple-600 hover:bg-purple-700",
      features: [
        "Everything in Free",
        "Job Insight Popups",
        "Job Tracker Dashboard",
        "5 Job Reports",
      ],
    },
    {
      title: "Pro",
      desc: "Ideal for active job seekers who want the full toolkit.",
      price: "$25/month",
      priceId: "price_1R93l2GPESFqZVLrF9fzah0t",
      buttonText: "Subscribe for $25/month",
      color: "bg-pink-600 hover:bg-pink-700",
      features: [
        "Everything in Basic",
        "Weekly Job Reports",
        "AI Career Insights",
        "Unlimited Job Report Access",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 space-y-16">
      <h1 className="text-4xl font-bold text-center text-cyan-300 drop-shadow-[0_0_6px_cyan]">
        Everything You Need To Get Hired Faster
      </h1>

      <Chatbox />

      {/* Pricing Cards */}
      <div>
        <h2 className="text-3xl font-bold text-center text-cyan-200 drop-shadow-[0_0_5px_cyan] mb-10">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map(({ title, desc, price, priceId, buttonText, color, features }) => (
            <Card
              key={priceId}
              className="bg-gray-900 border border-cyan-400 rounded-lg shadow-xl shadow-cyan-500/30 text-white flex flex-col justify-between p-6 transition hover:scale-[1.02]"
            >
              <CardHeader className="space-y-2">
                <CardTitle className="text-center text-2xl text-cyan-300 drop-shadow-[0_0_4px_cyan]">
                  {title}
                </CardTitle>
                <p className="text-center text-sm text-cyan-100">{desc}</p>
              </CardHeader>

              <CardContent className="space-y-6 flex flex-col h-full justify-between">
                <div>
                  <p className="text-center text-3xl font-semibold text-white">
                    {price}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-cyan-100">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        ✅ {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    className={`w-full text-white font-semibold shadow-md shadow-cyan-400/40 ${color}`}
                    onClick={() => handleCheckout(priceId)}
                  >
                    {buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_4px_cyan]">
          Ready to land your next job?
        </h2>
        <p className="text-cyan-100 mb-6">
          Start for free or go pro to accelerate your job hunt.
        </p>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full shadow-md shadow-cyan-400/40"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;
