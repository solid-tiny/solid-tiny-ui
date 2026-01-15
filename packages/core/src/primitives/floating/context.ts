import type {
  Derivable,
  FlipOptions,
  OffsetOptions,
  Placement,
  ShiftOptions,
  SizeOptions,
} from "@floating-ui/dom";
import { computePosition, flip, offset, shift, size } from "@floating-ui/dom";
import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import type { PresencePhase } from "solid-tiny-utils";

export const context = createComponentState({
  state: () => ({
    x: 0,
    y: 0,
    open: false,
    originalPlacement: "top" as Placement,
    placement: "top" as Placement,
    trigger: "hover" as "hover" | "click" | "manual",
    refContent: null as HTMLDivElement | null,
    refContentInner: null as HTMLDivElement | null,
    refTrigger: null as HTMLElement | null,
    canHoverContent: true,
    timer: undefined as ReturnType<typeof setTimeout> | undefined,
    disabled: false,
    arrow: 0,
    closeDelay: 0,
    openDelay: 0,
    middlewareData: {
      shift: {
        x: 0,
        y: 0,
      },
    },
    initialized: false,
    plugin: {
      shift: true as ShiftOptions | Derivable<ShiftOptions> | boolean,
      flip: true as FlipOptions | Derivable<FlipOptions> | boolean,
      offset: 4 as OffsetOptions,
      size: undefined as undefined | SizeOptions | Derivable<SizeOptions>,
    },
  }),
  methods: {
    /* only for hover */
    setOpen(open: boolean) {
      const { state, actions } = this;

      if (state.disabled) {
        return;
      }

      let duration = open ? state.openDelay : state.closeDelay;

      if (state.canHoverContent && !open && state.trigger === "hover") {
        duration = Math.max(duration, 300);
      }

      clearTimeout(state.timer);

      if (duration <= 0) {
        this.actions._setOpen(open);
      } else {
        actions.setState(
          "timer",
          setTimeout(() => {
            this.actions._setOpen(open);
          }, duration)
        );
      }
    },

    _setOpen(open: boolean) {
      const { state, actions } = this;
      if (open === state.open) {
        return;
      }
      actions.setState("open", open);
    },

    async updatePos() {
      const { state, actions } = this;

      const $content = state.refContent;
      const $reference = state.refTrigger;

      if (
        !($content?.isConnected && $reference?.isConnected) ||
        state.disabled
      ) {
        return;
      }

      const middleware = [offset(state.plugin.offset)];

      if (state.plugin.shift) {
        const conf = state.plugin.shift === true ? {} : state.plugin.shift;
        middleware.push(shift(conf));
      }

      if (state.plugin.flip) {
        const conf = state.plugin.flip === true ? {} : state.plugin.flip;
        middleware.push(flip(conf));
      }

      if (state.plugin.size) {
        middleware.push(size(state.plugin.size));
      }

      const { x, y, placement, middlewareData } = await computePosition(
        $reference,
        $content,
        {
          placement: state.originalPlacement,
          middleware,
          strategy: "fixed",
        }
      );

      batch(() => {
        actions.setState({
          x,
          y,
          placement,
        });
        actions.setState("middlewareData", middlewareData);
        actions.setState("initialized", true);
      });
    },
  },
  nowrapData: () => ({
    presencePhase: () => "idle" as PresencePhase,
  }),
});
