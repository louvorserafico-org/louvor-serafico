import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Celebration } from "@louvor-serafico/shared";

import { buildCommunityRepertoireOptions } from "./community-repertoire.ts";

describe("community repertoire", () => {
  it("keeps the closest celebrations to today", () => {
    const options = buildCommunityRepertoireOptions(
      buildCelebrations(["01-03", "01-08", "01-15", "01-20", "01-25", "02-02"]),
      new Date("2026-01-18T12:00:00.000Z"),
    );

    assert.deepEqual(
      options.map((item) => item.dateLabel),
      ["20 de janeiro", "15 de janeiro", "25 de janeiro", "08 de janeiro", "02 de fevereiro"],
    );
  });
});

function buildCelebrations(monthDays: string[]): Celebration[] {
  return monthDays.map((monthDay, index) => {
    const [month, day] = monthDay.split("-");

    return {
      dateLabel: `${day} de ${month === "01" ? "janeiro" : "fevereiro"}`,
      dateMonthDay: monthDay,
      id: `celebration-${index}`,
      recommendations: [],
      slug: `celebration-${index}`,
      songs: [],
      title: `Celebração ${monthDay}`,
    };
  });
}
