# Browser coordinate system

## Basics
- (0, 0) is at top-left corner of the viewport.
- Positive horizontal number to move element to **right**.
- Positive vertical number to move element to **bottom**.

## Window  
Properties:  
- `innerHeight` → Viewport's height **without** browser's header.
- `innerWidth` → Viewport's width **without** browser's header.
- `outerHeight` → Viewport's height **with** browser's header.
- `outerWidth` → Viewport's width **with** browser's header.
- `scrollY` / `pageYOffset` → The amount of `px` from the topmost side.
- `scrollX` / `pageXOffset` → The amount of `px` from the leftmost side.

Methods:
- `scroll` → Scroll to provided coordinate.
- `scrollBy` → Scroll by a given amount.

## Element
Properties:
- `clientHeight` → The element content's height without overflow.
- `clientWidth` → The element content's width without overflow.
- `scrollHeight` → The element content's height with overflow.
- `scrollWidth` → The element content's width with overflow.
- `scrollLeft` → Get or set the amount of `px` scrolled from left side.
- `scrollTop` → Get or set the amount of `px` scrolled from top side.

Methods:
- `getBoundingClientRect()` → Return an object listing element's position and size.