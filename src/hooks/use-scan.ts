import { useCallback, useState } from "react";

export interface ScanResult {
  condition: "DRY EYE" | "WET EYE" | "NORMAL";
  severity: "Mild" | "Moderate" | "Severe" | "Healthy";
  confidence: number;
  movement: string;
  llmSummary: string;
}

const RESULTS: ScanResult[] = [
  {
    condition: "DRY EYE",
    severity: "Moderate",
    confidence: 94.2,
    movement: "Normal saccadic movement detected.",
    llmSummary:
      "Reduced tear film stability detected on the corneal surface. Recommend hydration and the 20-20-20 rule. Re-scan in 14 days.",
  },
  {
    condition: "WET EYE",
    severity: "Mild",
    confidence: 91.8,
    movement: "Slight horizontal drift detected.",
    llmSummary:
      "Excess tear pooling near the inner canthus suggests possible allergic response. Identify environmental triggers.",
  },
  {
    condition: "NORMAL",
    severity: "Healthy",
    confidence: 98.4,
    movement: "All ocular motility within normal range.",
    llmSummary:
      "Tear film integrity and surface hydration are within healthy ranges. Continue regular eye-care habits.",
  },
];

export function useScan() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const start = useCallback(() => {
    setScanning(true);
    setResult(null);
    return new Promise<ScanResult>((resolve) => {
      setTimeout(() => {
        const r = RESULTS[Math.floor(Math.random() * RESULTS.length)];
        setResult(r);
        setScanning(false);
        resolve(r);
      }, 3000);
    });
  }, []);

  const reset = useCallback(() => setResult(null), []);

  return { scanning, result, start, reset };
}
