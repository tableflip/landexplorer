export default function round (number, dps) {
  const factor = Math.pow(10, dps)
  return Math.round(number * factor) / factor
}
