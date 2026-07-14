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
      cardTitle: "Roteiro em preparação",
      ctaLabel: "Voltar ao calendário",
      eyebrow: "25 de dezembro",
      helperText: "Esta celebração já aparece no calendário litúrgico, mas o roteiro musical deste dia ainda está sendo preparado.",
      note: "Consulte outros dias marcados para encontrar roteiros já publicados enquanto este material e concluido.",
      title: "Natal do Senhor",
    });
  });

  it("builds ordinary day detail", () => {
    const result = buildLiturgicalDayDetail(
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.deepEqual(result, {
      cardTitle: "Sem roteiro publicado",
      ctaLabel: "Abrir calendário",
      eyebrow: "25 de abril",
      helperText: "Hoje não há celebração com roteiro musical publicado no app.",
      note: "Use o calendário para encontrar as próximas datas preparadas e organizar o ministério com antecedência.",
      title: "Dia comum",
    });
  });
});
