import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  computeEaster,
  findGeneralFeastByMonthDay,
  getGeneralLiturgicalFeasts,
} from "./liturgical-general.ts";

describe("general liturgical calendar (CNBB complement)", () => {
  it("computes gregorian easter", () => {
    assert.deepEqual(computeEaster(2025), { day: 20, month: 4 });
    assert.deepEqual(computeEaster(2026), { day: 5, month: 4 });
    assert.deepEqual(computeEaster(2027), { day: 28, month: 3 });
  });

  it("derives 2026 movable feasts consistent with the legacy markers", () => {
    const feasts = getGeneralLiturgicalFeasts(2026);
    const byTitle = (title: string) => feasts.find((feast) => feast.title === title)?.monthDay;

    assert.equal(byTitle("Quarta-feira de Cinzas"), "02-18");
    assert.equal(byTitle("Domingo de Ramos"), "03-29");
    assert.equal(byTitle("Domingo da Páscoa"), "04-05");
    assert.equal(byTitle("Pentecostes"), "05-24");
    assert.equal(byTitle("Corpus Christi"), "06-04");
  });

  it("keeps fixed solemnities regardless of year", () => {
    for (const year of [2025, 2026, 2027]) {
      const natal = findGeneralFeastByMonthDay(year, "12-25");
      assert.equal(natal?.title, "Natal do Senhor");
      assert.equal(natal?.kind, "fixed");
    }
  });

  it("returns feasts sorted by month-day", () => {
    const monthDays = getGeneralLiturgicalFeasts(2026).map((feast) => feast.monthDay);
    const sorted = [...monthDays].sort((a, b) => a.localeCompare(b));
    assert.deepEqual(monthDays, sorted);
  });

  it("finds a feast by date and returns undefined otherwise", () => {
    assert.equal(findGeneralFeastByMonthDay(2026, "01-01")?.title, "Santa Maria, Mãe de Deus");
    assert.equal(findGeneralFeastByMonthDay(2026, "07-07"), undefined);
  });
});
