import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Celebration } from "@louvor-serafico/shared";

import { resolveCelebrationCatalogSource } from "./celebration-catalog-source.ts";

const localCelebrations: Celebration[] = [
  {
    dateLabel: "03 de janeiro",
    dateMonthDay: "01-03",
    id: "local-celebration",
    recommendations: [],
    slug: "local-celebration",
    songs: [],
    title: "Local Celebration",
  },
];

describe("celebration catalog source", () => {
  it("prefers remote celebrations when available", () => {
    const source = resolveCelebrationCatalogSource(
      {
        celebrations: [
          {
            dateLabel: "03 de janeiro",
            dateMonthDay: "01-03",
            id: "remote-celebration",
            recommendations: [],
            slug: "remote-celebration",
            songs: [],
            title: "Remote Celebration",
          },
        ],
        message: "Calendário remoto carregado.",
        status: "ready",
      },
      localCelebrations,
    );

    assert.deepEqual(source, {
      celebrations: [
        {
          dateLabel: "03 de janeiro",
          dateMonthDay: "01-03",
          id: "remote-celebration",
          recommendations: [],
          slug: "remote-celebration",
          songs: [],
          title: "Remote Celebration",
        },
      ],
      message: "Fonte remota ativa.",
      mode: "remote",
    });
  });

  it("falls back to local when remote is empty", () => {
    const source = resolveCelebrationCatalogSource(
      {
        celebrations: [],
        message: "Calendário remoto carregado.",
        status: "ready",
      },
      localCelebrations,
    );

    assert.deepEqual(source, {
      celebrations: localCelebrations,
      message: "Calendário remoto vazio. Mantendo fonte local.",
      mode: "local",
    });
  });

  it("falls back to local when remote fails", () => {
    const source = resolveCelebrationCatalogSource(
      {
        celebrations: [],
        message: "Tabela remota celebrations ainda não existe no projeto.",
        status: "error",
      },
      localCelebrations,
    );

    assert.deepEqual(source, {
      celebrations: localCelebrations,
      message: "Tabela remota celebrations ainda não existe no projeto.",
      mode: "local",
    });
  });
});
