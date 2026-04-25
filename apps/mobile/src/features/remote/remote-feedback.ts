type RemoteFeedbackInput = {
  emptyLabel: string;
  itemCount: number;
  readyLabel: string;
  status: "error" | "not_configured" | "ready";
  statusMessage: string;
};

export type RemoteFeedback = {
  detail: string;
};

export function buildRemoteFeedback(input: RemoteFeedbackInput): RemoteFeedback {
  if (input.status === "ready") {
    return {
      detail: input.itemCount > 0 ? `${input.itemCount} ${input.readyLabel}.` : input.emptyLabel,
    };
  }

  return {
    detail: input.statusMessage,
  };
}
