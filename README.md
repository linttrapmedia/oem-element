# oem-element

_oem-element_ is part of [OEM](https://oem.js.org). OEM is a UI/UX ecosystem of 100% dependency-free ui libraries implemented as light abstraction layers on top of the already existing native browser javascript objects.

## oem-element

`OEM.Element` is a simple "templating engine" that enables you to manage html, styling and behavior in a clean, declarative syntax implemented as a light abstraction on top of the native [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) object.

## Get Started

### Using it as a Typescript dependency

#### Install

```bash
npm i @linttrapmedia/oem-element
```

#### Import and use

```typescript
import { DIV } from "@linttrapmedia/oem-element";
DIV.innerText("Hello World");
```

### Using when loaded from a CDN

#### Load in html head

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/oem-element/1.0.0/oem-element.min.js"></script>
```

#### Destructure and use in plain javascript

```js
const { DIV } = OEM.Element;
DIV.innerText("Hello World");
```

## API

### Tags

There is a single html tag function per html tag. All tag functions exist in the `OEM.Element` object.

`A`,`AREA`,`ARTICLE`,`ASIDE`,`AUDIO`,`B`,`BASE`,`BDI`,`BDO`,`BLOCKQUOTE`,`BODY`,`BR`,`BUTTON`,`CANVAS`,`CAPTION`,`CITE`,`CODE`,`COL`,`COLGROUP`,`DATA`,`DATALIST`,`DD`,`DEL`,`DETAILS`,`DFN`,`DIALOG`,`DIV`,`DL`,`DT`,`EM`,`EMBED`,`FIELDSET`,`FIGCAPTION`,`FIGURE`,`FOOTER`,`FORM`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`HEAD`,`HEADER`,`HGROUP`,`HR`,`HTML`,`I`,`IFRAME`,`IMG`,`INPUT`,`INS`,`KBD`,`LABEL`,`LEGEND`,`LI`,`LINK`,`MAIN`,`MAP`,`MARK`,`MENU`,`META`,`METER`,`NAV`,`NOSCRIPT`,`OBJECT`,`OL`,`OPTGROUP`,`OPTION`,`OUTPUT`,`P`,`PICTURE`,`PRE`,`PROGRESS`,`Q`,`RP`,`RT`,`RUBY`,`S`,`SAMP`,`SCRIPT`,`SECTION`,`SELECT`,`SLOT`,`SMALL`,`SOURCE`,`SPAN`,`STRONG`,`STYLE`,`SUB`,`SUMMARY`,`SUP`,`TABLE`,`TBODY`,`TD`,`TEMPLATE`,`TEXTAREA`,`TFOOT`,`TH`,`THEAD`,`TIME`,`TITLE`,`TR`,`TRACK`,`U`,`UL`,`VAR`,`VIDEO`,`WBR`

### Methods

Each tag function uses the "builder pattern" which allows you to quickly and easily write html in javascript that is every bit as _declarative_ and readable as regular html but with the added benefit of declaring styling and behavior inline a clean and scalable way. There are two types of methods: Non-Rendering (which configure the element) and Rendering (which render the element).

- `addEventListener(ev, cb)` - adds an event listener
- `attr(name, val, condition)` - adds an attribute
- `className(className, condition)` - adds an css class name
- `subscribe(subscriptionFunction, handler)` - subscribes to an event bus
- `style(prop, val, condition)` - adds a style
- `append(...nodes)` - appends nodes to element and renders
- `innerHTML(html)` - sets innerHTML and renders
- `innerText(text)` - sets innerText and renders
- `render()` - renders empty element

_Non Rendering Methods_

#### `addEventListener(ev, cb)` - adds an event listener

```Typescript
ev: keyof GlobalEventHandlers,
cb: (e: Event) => any
```

#### `attr(name, val, condition)` - adds an attribute

```Typescript
name: string // name of attribute
val: string | (() => string) // value of attribute, string or callback
condition?: boolean | (() => boolean) // condition check
```

#### `className(className, condition)` - adds an css class name

```Typescript
className: string // name of class
condition?: boolean | (() => boolean) // condition check
```

#### `subscribe(subscriptionFunction, handler)` - subscribes to an event bus

Subscribing to event buses causes the element rerender each time the event bus broadcasts.

```Typescript
subscriptionFunction: (cb: () => void) => void,
handler?: (el: ThisType<OEM_ELEMENT<T>>) => void
```

#### `style(prop, val, condition)` - adds a style

```Typescript
prop: keyof CSSStyleDeclaration // css property
val: string | (() => string) // css value
condition?: boolean | (() => boolean) | "hover" // condition check
```

_Rendering Methods_ - These must be called last in the chain

#### `append(...nodes)` - appends nodes to element and renders

```Typescript
nodes: (string | Node)[]
```

#### `innerHTML(html)` - sets innerHTML and renders

```Typescript
html: HTMLElement | (() => HTMLElement)
```

#### `innerText(text)` - sets innerText and renders

```Typescript
text: (string | number) | (() => string | number)
```

#### `render()` - renders empty element

```Typescript
// no args
```

## Examples

### Basic Usage

Rendering DOM elements is easy. Configure the object with non-rendering methods and then call one of the rendering methods.

#### Render an empty element

```typescript
DIV.render(); // <div></div>
```

#### Render element with inner text

```typescript
DIV.innerText("example"); // <div>example</div>
// --- or ---
DIV.innerText(() => "example"); // <div>example</div>
```

#### Render element with html

```typescript
DIV.innerHTML(DIV.innerText("example")); // <div><div>example</div></div>
// --- or ---
DIV.innerHTML(() => DIV.innerText("example")); // <div><div>example</div></div>
```

#### Render element with multiple attributes and styles and uses conditions.

Notice how we can define multiples of the same attribute or style and add a condition? This allows us to dynamically declare state inline without having to get fancy about our interactions between our dom, styling, behaviors, etc.

```typescript
UL.attr("id", "example")
  .style("list-style", "none")
  .append(
    LI.style("color", "blue").innerText("A"),
    LI.style("color", "red").innerText("B")
  );
// <ul id="example" style="list-style:none;">
// <li style="color:blue;">A</li>
// <li style="color:red;">A</li>
// </ul>

// --- or ---

UL.attr("id", "example")
  .style("list-style", "square", isSquareTheme()) // let's pretend isSquareTheme() is true
  .style("list-style", "none", !isSquareTheme())
  .append(
    LI.style("color", "blue").innerText("A"),
    LI.style("color", "red").innerText("B")
  );
// <ul id="example" style="list-style:square;">
// <li style="color:blue;">A</li>
// <li style="color:red;">A</li>
// </ul>
```

### Events

Attach events using the `addEventListener` method.

```javascript
BUTTON.addEventListener("click", () => alert("hi")).innerText(
  "Click me to show alert"
);
// <button>Click me to show alert</button>
```

### Reactivity

Reactivity is achieved by using callbacks for the values you provide to `attr`, `style`, `innerText` and `innerHTML` and subscribing to an event bus. You can use your own event bus but we recommend one of [OEM's data type libraries](https://oem.js.org) which map to each data type in javascript (`String`, `Number`, `Array`, etc...) in keeping with OEM's core concept.

#### Basic Concept

```javascript
// using the oem-string lib
// OEM.STRING - creates a String object that is an event bus
const greeting = OEM.STRING("hello");
// greeting.val - returns the current value
// greeting.set - sets the value and broadcasts

// create greeter element
DIV.subscribe(greeting.sub).innerText(greeting.val);
// greeter element is currently: <div>hello</div>
greeting.set("goodbye");
// greeter element has now changed to: <div>goodbye</div>
```

#### Example

```javascript
const greeting = OEM.STRING("hello");
const handleInput = (evt) => greeting.set(evt.target.value);
DIV.subscribe(greeting.sub).innerText(greeting.val);
INPUT.addEventListener("input", handleInput).render();
// Result: The div outputs whatever's typed into the input
```

## DEMO

Visit [oem.js.org](https://oem.js.org) for full tutorials, demos, etc.
