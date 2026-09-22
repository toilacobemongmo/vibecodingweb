import { describe, it, expect } from "vitest";
import {
  getBmiClassification,
  getBloodPressureClassification,
  getGlucoseClassification,
} from "./utils";

describe("Medical Classification Utilities", () => {
  it("correctly classifies BMI categories", () => {
    expect(getBmiClassification(17.5).category).toContain("Thiếu cân");
    expect(getBmiClassification(22.0).category).toContain("chuẩn");
    expect(getBmiClassification(24.5).category).toContain("Tiền béo phì");
    expect(getBmiClassification(28.0).category).toContain("Béo phì");
  });

  it("correctly classifies Blood Pressure stages", () => {
    expect(getBloodPressureClassification(115, 75).variant).toBe("optimal");
    expect(getBloodPressureClassification(125, 78).variant).toBe("normal");
    expect(getBloodPressureClassification(135, 85).variant).toBe("warning");
    expect(getBloodPressureClassification(160, 100).variant).toBe("critical");
  });

  it("correctly classifies Blood Glucose fasting and post-meal", () => {
    expect(getGlucoseClassification(90, "FASTING").variant).toBe("optimal");
    expect(getGlucoseClassification(115, "FASTING").variant).toBe("warning");
    expect(getGlucoseClassification(160, "FASTING").variant).toBe("critical");

    expect(getGlucoseClassification(120, "AFTER_MEAL").variant).toBe("optimal");
    expect(getGlucoseClassification(170, "AFTER_MEAL").variant).toBe("warning");
    expect(getGlucoseClassification(220, "AFTER_MEAL").variant).toBe("critical");
  });
});
