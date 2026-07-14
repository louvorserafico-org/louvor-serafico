export function formatBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length < 2) {
    return `(${digits}`;
  }

  const area = digits.slice(0, 2);
  const remainder = digits.slice(2);

  let output = `(${area}) `;

  if (remainder.length === 0) {
    return output;
  }

  const single = remainder.slice(0, 1);
  output += single;

  if (remainder.length > 1) {
    output += `-${remainder.slice(1, 5)}`;
  }

  if (remainder.length > 5) {
    output += `-${remainder.slice(5, 9)}`;
  }

  return output;
}
