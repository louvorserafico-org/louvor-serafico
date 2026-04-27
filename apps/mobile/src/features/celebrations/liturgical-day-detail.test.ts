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
      cardTitle: "Repertorio em preparacao",
      ctaLabel: "Voltar ao calendario",
      eyebrow: "25 de dezembro",
      helperText:
        "Esta celebracao ja aparece no calendario liturgico, mas o roteiro musical deste dia ainda esta sendo preparado.",
      note:
        "Consulte outros dias marcados para encontrar roteiros ja publicados enquanto este material e concluido.",
      title: "Natal do Senhor",
    });
  });

  it("builds ordinary day detail", () => {
    const result = buildLiturgicalDayDetail(
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.deepEqual(result, {
      cardTitle: "Dia sem roteiro publicado",
      ctaLabel: "Abrir calendario",
      eyebrow: "25 de abril",
      helperText: "Hoje nao ha celebracao com roteiro musical publicado no app.",
      note:
        "Use o calendario para encontrar as proximas datas preparadas e organizar o ministerio com antecedencia.",
      title: "Dia comum",
    });
  });
});
