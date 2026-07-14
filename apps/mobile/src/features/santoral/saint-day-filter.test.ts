import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findSaintDaysByMonthDay } from "../../../../../packages/shared/src/santoral.ts";

import { resolveSaintsForDay } from "./saint-day-filter.ts";

describe("saint day filter", () => {
  const saints = findSaintDaysByMonthDay("07-13");

  it("returns all saints when no saintId is given", () => {
    assert.equal(resolveSaintsForDay(saints).length, 2);
  });

  it("returns only the matching saint when saintId is given", () => {
    const target = saints[1];
    const result = resolveSaintsForDay(saints, target?.id);
    assert.equal(result.length, 1);
    assert.equal(result[0]?.id, target?.id);
  });

  it("falls back to all saints when saintId does not match", () => {
    assert.equal(resolveSaintsForDay(saints, "saint-inexistente").length, 2);
  });
});
