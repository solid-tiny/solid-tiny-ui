import { context } from "./context";
import { Item } from "./item";
import { Listbox } from "./listbox";
import { Root } from "./root";

/**
 * create a fake scroll list component
 *
 * @example
 * ```tsx
 * <FakeScrollListCore
 *   items={items}
 *   visibleItemsCount={5}
 *   itemHeight={30}
 *   inViewIndex={inViewIndex}
 *   onInViewIndexChange={(index) => setInViewIndex(index)}
 * >
 *   <FakeScrollListCore.Listbox>
 *     {(label, index) => (
 *       <FakeScrollListCore.Item index={index()}>
 *         {label}
 *       </FakeScrollListCore.Item>
 *     )}
 *   </FakeScrollListCore.Listbox>
 * </FakeScrollListCore>
 * ```
 */
export const FakeScrollListCore = Object.assign(Root, {
  Item,
  Listbox,
  useContext: context.useContext,
});
