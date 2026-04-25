import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

import { buildLiturgicalDayDetail } from "./liturgical-day-detail.ts";

describe("liturgical day detail", () => {
  it("builds empty repertoire detail for liturgical day", () => {
    const result = buildLiturgicalDayDetail(
      getLiturgicalDayForDate(new Date("2026-12-25T12:00:00.000Z")),
    );

    assert.deepEqual(result, {
      ctaLabel: "Ver calendario",
      eyebrow: "25 de dezembro",
      helperText: "Esta data litúrgica já está registrada no calendário, mas o repertório musical ainda será preparado.",
      title: "Natal do Senhor",
    });
  });

  it("builds ordinary day detail", () => {
    const result = buildLiturgicalDayDetail(
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.deepEqual(result, {
      ctaLabel: "Ver calendario",
      eyebrow: "25 de abril",
      helperText: "Hoje não há celebração com roteiro publicado. Consulte os próximos dias preparados no calendário.",
      title: "Dia comum",
    });
  });
});
