"use client";

import { useCallback, useState } from "react";
import { Calculator, RefreshCw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDict } from "@/components/shared/locale-provider";
import { cn } from "@/lib/utils";

type BmiCategory = "underweight" | "normal" | "overweight" | "obese";

interface BmiResult {
  value: number;
  category: BmiCategory;
  color: string;
}

function calculateBmi(weight: number, heightCm: number): BmiResult | null {
  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) return null;

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  if (bmi < 18.5) return { value: bmi, category: "underweight", color: "bg-blue-500" };
  if (bmi < 25) return { value: bmi, category: "normal", color: "bg-emerald-500" };
  if (bmi < 30) return { value: bmi, category: "overweight", color: "bg-amber-500" };
  return { value: bmi, category: "obese", color: "bg-red-500" };
}

export default function BmiCalculatorPage() {
  const dict = useDict();
  const copy = dict.tools.bmiCalculator;

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [result, setResult] = useState<BmiResult | null>(null);

  const handleCalculate = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setResult(null);
      return;
    }
    setResult(calculateBmi(w, h));
  }, [weight, height]);

  const handleReset = useCallback(() => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setResult(null);
  }, []);

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl animate-fade-in-up">
        <Badge>
          <Calculator className="h-3 w-3" />
          {dict.tools.badge}
        </Badge>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-10 space-y-6 animate-fade-in-up delay-100">
        <div className="rounded-2xl border border-border p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{copy.weightLabel}</label>
              <input
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{copy.heightLabel}</label>
              <input
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{copy.ageLabel}</label>
              <input
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{copy.genderLabel}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender("male")}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-2 text-sm transition-colors",
                    gender === "male"
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {copy.male}
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-2 text-sm transition-colors",
                    gender === "female"
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {copy.female}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={handleReset}>{copy.reset}</Button>
            <Button onClick={handleCalculate} className="ml-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              {copy.calculate}
            </Button>
          </div>
        </div>

        {result && (
          <div className="rounded-2xl border border-border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {copy.resultLabel}
              </span>
              <span className="text-3xl font-bold">{result.value.toFixed(1)}</span>
            </div>
            <div
              className={cn("h-2 overflow-hidden rounded-full bg-muted", result.color)}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (result.value / 40) * 100)}%` }}
              />
            </div>
            <div className="mt-4 flex items-center gap-3 justify-center">
              <Badge className={cn("px-3 py-1.5", result.color, "text-foreground font-medium text-sm")}>
                {copy.categoryLabel}:{" "}
                {copy[result.category as keyof typeof copy]}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
