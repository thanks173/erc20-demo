export function formatAddress(address) {
  return `${address.slice(0, 8)}…${address.slice(36, 42)}`;
}

export function printNumber(_n, fixed = 3, withoutComma) {
  if (typeof _n === "number") {
    return withoutComma
      ? _n
          .toLocaleString("en-US", {
            maximumFractionDigits: fixed,
          })
          .replace(/,/g, "")
      : _n.toLocaleString("en-US", {
          maximumFractionDigits: fixed,
        });
  }

  const n = parseFloat(_n);
  if (!n) {
    return _n;
  }

  return withoutComma
    ? n
        .toLocaleString("en-US", {
          maximumFractionDigits: fixed,
        })
        .replace(/,/g, "")
    : n.toLocaleString("en-US", {
        maximumFractionDigits: fixed,
      });
}
