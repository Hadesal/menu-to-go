export function vwToPx(vw: number) {
  const viewportWidth = window.innerWidth;
  return (vw / 100) * viewportWidth;
}
export function vhToPx(vh: number) {
  const viewportHeight = window.innerHeight;
  return (vh / 100) * viewportHeight;
}
