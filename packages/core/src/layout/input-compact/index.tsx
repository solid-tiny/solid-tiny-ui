import css from "sass:./input-compact.scss";
import { Refs } from "@solid-primitives/refs";
import { createSignal, type JSX } from "solid-js";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";

/**
 * Make a bunch of input components appear visually connected.
 */
export function InputCompact(props: {
  children: JSX.Element;
  block?: boolean;
}) {
  mountStyle(css, "tiny-input-compact");

  const [refs, setRefs] = createSignal<Element[]>([]);

  const clearClass = (el: Element) => {
    el.classList.remove("tiny-input-compact__first");
    el.classList.remove("tiny-input-compact__item");
    el.classList.remove("tiny-input-compact__last");
  };

  createWatch(
    () => refs(),
    (els) => {
      els.forEach((el, i) => {
        clearClass(el);
        if (i === 0) {
          el.classList.add("tiny-input-compact__first");
        } else if (i === els.length - 1) {
          el.classList.add("tiny-input-compact__last");
        } else {
          el.classList.add("tiny-input-compact__item");
        }
      });
    }
  );

  return (
    <div class="tiny-input-compact" data-block={dataIf(props.block ?? false)}>
      <Refs ref={setRefs}>{props.children}</Refs>
    </div>
  );
}
