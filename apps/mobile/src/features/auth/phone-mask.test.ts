import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatBrazilianPhone } from "./phone-mask.ts";

describe("phone mask", () => {
  it("formats progressively as digits are typed", () => {
    assert.equal(formatBrazilianPhone(""), "");
    assert.equal(formatBrazilianPhone("2"), "(2");
    assert.equal(formatBrazilianPhone("24"), "(24) ");
    assert.equal(formatBrazilianPhone("249"), "(24) 9");
    assert.equal(formatBrazilianPhone("2499"), "(24) 9-9");
    assert.equal(formatBrazilianPhone("249999"), "(24) 9-999");
    assert.equal(formatBrazilianPhone("2499999"), "(24) 9-9999");
    assert.equal(formatBrazilianPhone("24999990"), "(24) 9-9999-0");
    assert.equal(formatBrazilianPhone("24999990000"), "(24) 9-9999-0000");
  });

  it("strips non-digit characters and caps at 11 digits", () => {
    assert.equal(formatBrazilianPhone("(24) 99999-0000"), "(24) 9-9999-0000");
    assert.equal(formatBrazilianPhone("24999990000999"), "(24) 9-9999-0000");
  });
});
