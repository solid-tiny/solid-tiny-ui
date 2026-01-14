# Virtual List Primitive

A virtual list primitive for efficient rendering of large lists in SolidJS applications. This primitive is inspired by virtua's core features and provides zero-configuration virtual scrolling with automatic size measurement.

## Features

- **Dynamic item sizing** with automatic measurement using ResizeObserver
- **Vertical and horizontal scrolling** support
- **Overscan** for smooth scrolling experience
- **Zero configuration** for common use cases
- **No external dependencies** (except SolidJS core)
- **TypeScript support** with full type definitions

## Installation

The VirtualList primitive is included in the solid-tiny-ui core package:

```tsx
import { VirtualList } from 'solid-tiny-ui';
```

## Basic Usage

### Vertical List

```tsx
import { VirtualList } from 'solid-tiny-ui';

function MyComponent() {
  return (
    <VirtualList 
      count={10000} 
      estimateSize={50} 
      style={{ height: "500px" }}
    >
      {(index) => (
        <VirtualList.Item index={index}>
          Item {index}
        </VirtualList.Item>
      )}
    </VirtualList>
  );
}
```

### Horizontal List

```tsx
<VirtualList 
  count={1000} 
  estimateSize={150} 
  horizontal
  style={{ height: "200px", width: "100%" }}
>
  {(index) => (
    <VirtualList.Item index={index}>
      Card {index}
    </VirtualList.Item>
  )}
</VirtualList>
```

### Dynamic Heights

The VirtualList automatically measures and adjusts to dynamic item heights:

```tsx
<VirtualList count={1000} estimateSize={60} style={{ height: "400px" }}>
  {(index) => {
    const heights = [40, 60, 80, 100, 120];
    const height = heights[index % heights.length];
    return (
      <VirtualList.Item 
        index={index} 
        style={{ height: `${height}px` }}
      >
        <div>Item {index}</div>
        <div>Height: {height}px</div>
      </VirtualList.Item>
    );
  }}
</VirtualList>
```

## API Reference

### VirtualList (Root)

The root component that manages the virtual scrolling container.

**Props:**

- `count: number` - Total number of items in the list (required)
- `estimateSize?: number` - Estimated size of each item in pixels (default: 50)
- `horizontal?: boolean` - Enable horizontal scrolling (default: false)
- `overscan?: number` - Number of items to render outside visible area (default: 3)
- `children: (index: number) => JSX.Element` - Render function for each item (required)
- `onScroll?: (offset: number) => void` - Callback when scroll position changes
- `style?: JSX.CSSProperties | string` - CSS styles for the container
- `...others` - All other div props are passed through

### VirtualList.Item

The item component that wraps each list item for proper measurement and positioning.

**Props:**

- `index: number` - The index of the item (required)
- `children: JSX.Element` - The content of the item (required)
- `style?: JSX.CSSProperties | string` - CSS styles for the item
- `...others` - All other div props are passed through

### VirtualList.useContext

Access the virtual list context for advanced use cases:

```tsx
const [state, actions] = VirtualList.useContext();
```

**State:**
- `scrollOffset: number` - Current scroll offset
- `viewportSize: number` - Size of the viewport
- `horizontal: boolean` - Whether horizontal scrolling is enabled
- `overscan: number` - Overscan value
- `itemRects: ItemRect[]` - Array of item measurements
- `totalSize: number` - Total size of all items
- `scrolling: boolean` - Whether currently scrolling

## Implementation Details

### Size Measurement

The VirtualList uses ResizeObserver to automatically measure item sizes. When an item's size changes:

1. The item's rect is updated in the state
2. Subsequent items' offsets are recalculated
3. The total size is updated
4. The visible range is recomputed

This ensures accurate virtualization even with dynamic content.

### Overscan

Overscan renders additional items before and after the visible range to reduce visual artifacts during scrolling. The default overscan of 3 items works well for most use cases.

### Performance Considerations

- Use stable item heights when possible for best performance
- Avoid expensive computations in the render function
- Consider memoizing computed values (see playground example)
- The VirtualList efficiently updates only when necessary using SolidJS reactivity

## Examples

See the playground at `packages/core/playground/src/pages/components/virtual-list/index.tsx` for complete examples including:

- Basic vertical list
- Dynamic size list
- Horizontal list
- Styled items

## Comparison with Virtua

This implementation provides the core features of virtua:

✅ Dynamic item sizing
✅ Vertical scrolling
✅ Horizontal scrolling  
✅ Overscan
✅ ResizeObserver-based measurement
✅ Zero configuration

Not yet implemented:
- Window scroller
- Grid virtualization
- Reverse scrolling
- Imperative scroll methods (scrollTo, scrollBy)

These features can be added in future iterations if needed.
