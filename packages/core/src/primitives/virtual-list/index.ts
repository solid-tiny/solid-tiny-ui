import { context } from "./context";
import { Item } from "./item";
import { Root } from "./root";

/**
 * Virtual list primitive for efficient rendering of large lists.
 * 
 * Features:
 * - Dynamic item sizing with automatic measurement
 * - Vertical and horizontal scrolling support
 * - Overscan for smooth scrolling
 * - ResizeObserver-based size tracking
 * - Zero configuration for common use cases
 * 
 * @example
 * ```tsx
 * <VirtualList count={10000} estimateSize={50} style={{ height: "500px" }}>
 *   {(index) => (
 *     <VirtualList.Item index={index}>
 *       Item {index}
 *     </VirtualList.Item>
 *   )}
 * </VirtualList>
 * ```
 */
export const VirtualList = Object.assign(Root, {
  Item,
  useContext: context.useContext,
});

export type { VirtualListRootProps } from "./root";
export type { VirtualItemProps } from "./item";
