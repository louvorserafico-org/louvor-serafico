import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildRemoteFeedback } from "./remote-feedback.ts";

describe("remote feedback", () => {
  it("builds ready feedback with items", () => {
    assert.deepEqual(
      buildRemoteFeedback({
        emptyLabel: "Nenhum item remoto encontrado.",
        itemCount: 3,
        readyLabel: "itens remotos prontos",
        status: "ready",
        statusMessage: "ok",
      }),
      {
        detail: "3 itens remotos prontos.",
      },
    );
  });

  it("builds ready feedback with empty state", () => {
    assert.deepEqual(
      buildRemoteFeedback({
        emptyLabel: "Nenhum item remoto encontrado.",
        itemCount: 0,
        readyLabel: "itens remotos prontos",
        status: "ready",
        statusMessage: "ok",
      }),
      {
        detail: "Nenhum item remoto encontrado.",
      },
    );
  });

  it("keeps remote error message", () => {
    assert.deepEqual(
      buildRemoteFeedback({
        emptyLabel: "Nenhum item remoto encontrado.",
        itemCount: 0,
        readyLabel: "itens remotos prontos",
        status: "error",
        statusMessage: "Falha remota.",
      }),
      {
        detail: "Falha remota.",
      },
    );
  });
});
