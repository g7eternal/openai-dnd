import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/svg-arrow.css";
import { createTippy } from "svelte-tippy";
import { roundArrow } from "tippy.js";

export default createTippy({
  animation: "shift-away",
  arrow: roundArrow,
  appendTo: "parent",
  duration: [100, 0],
  theme: "custom", // app.css
  allowHTML: true,
});
