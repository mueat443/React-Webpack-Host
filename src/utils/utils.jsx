export function setVerticalScreen(containerRef) {
  if (containerRef.current) {
    containerRef.current.style.width = "450px";
    containerRef.current.style.height = "800px";
  }
}
export function setHorizontalScreen(containerRef) {
  if (containerRef.current) {
    containerRef.current.style.width = "1000px";
    containerRef.current.style.height = "450px";
  }
}
