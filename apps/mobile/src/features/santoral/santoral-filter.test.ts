import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getSaintDayCatalog } from "../../../../../packages/shared/src/santoral.ts";

import { applySaintFilter, buildAvailableQualifiers } from "./santoral-filter.ts";

describe("santoral filter", () => {
  it("returns all days when filter is all", () => {
    const catalog = getSaintDayCatalog();
    assert.deepEqual(applySaintFilter(catalog, "all"), catalog);
  });

  it("filters by qualifier martir", () => {
    const result = applySaintFilter(getSaintDayCatalog(), "martir");
    assert.ok(result.length > 0);
    assert.ok(result.every((day) => day.qualifiers.includes("martir")));
  });

  it("returns empty for a qualifier with no matches", () => {
    const result = applySaintFilter(getSaintDayCatalog(), "pastor");
    assert.deepEqual(result, []);
  });

  it("builds distinct available qualifiers from catalog", () => {
    const qualifiers = buildAvailableQualifiers(getSaintDayCatalog());
    assert.ok(qualifiers.includes("martir"));
    assert.ok(qualifiers.includes("virgem"));
    assert.equal(qualifiers.length, new Set(qualifiers).size);
  });
});
