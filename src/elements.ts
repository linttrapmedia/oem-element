class OEM_ELEMENT<T extends HTMLElement> {
  #attrs: [string, string | (() => string), (boolean | (() => boolean))?][] =
    [];
  #el: T;
  #innerHTML: HTMLElement | (() => HTMLElement);
  #innerText: (string | number) | (() => string | number);
  #listeners: [string, (...args: any[]) => any][] = [];
  #nodes: (string | Node)[] = [];
  #styles: [
    string,
    string | (() => string),
    (boolean | (() => boolean) | "hover")?
  ][] = [];
  #tag: string = "div";
  #subscriptions: {
    subscriptionFunction: (cb: () => void) => void;
    handler?: (el: ThisType<OEM_ELEMENT<T>>) => void;
  }[] = [];
  constructor(tag: string) {
    this.#tag = tag;
    this._applyAttributes = this._applyAttributes.bind(this);
    this._applyInnerHTML = this._applyInnerHTML.bind(this);
    this._applyInnerText = this._applyInnerText.bind(this);
    this._applyListeners = this._applyListeners.bind(this);
    this._applyNodes = this._applyNodes.bind(this);
    this._applyStyles = this._applyStyles.bind(this);
    this._createElement = this._createElement.bind(this);
    this.append = this.append.bind(this);
    this.attr = this.attr.bind(this);
    this.innerHTML = this.innerHTML.bind(this);
    this.innerText = this.innerText.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.render = this.render.bind(this);
    this.style = this.style.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  private _applyAttributes() {
    this.#attrs.forEach(([prop, val, condition = true]) => {
      const apply = () => {
        const _oldVal = (<any>this.#el)[prop];
        const _val = (typeof val === "function" ? val() : val) as string;
        if (_oldVal !== _val) (<any>this.#el)[prop] = _val;
      };
      if (typeof condition === "boolean") return condition ? apply() : null;
      if (typeof condition === "function") return condition() ? apply() : null;
      apply();
    });
  }
  private _applyStyles() {
    this.#styles.forEach(([prop, val, condition = true]) => {
      const resetVal = (<any>this.#el).style[prop as any];
      const reset = () => ((<any>this.#el).style[prop as any] = resetVal);
      const apply = () => {
        const _oldVal = (<any>this.#el).style[prop as any];
        const _val = (typeof val === "function" ? val() : val) as string;
        if (_oldVal !== _val) (<any>this.#el).style[prop as any] = _val;
      };
      if (typeof condition === "boolean") return condition ? apply() : null;
      if (typeof condition === "function") return condition() ? apply() : null;
      if (condition === "hover") {
        this.#el.addEventListener("mouseenter", apply);
        this.#el.addEventListener("mouseleave", reset);
        return;
      }
      if (typeof condition === "string")
        return this.#el.addEventListener(condition, apply);
      apply();
    });
  }
  private _applyListeners() {
    this.#listeners.forEach(([event, func]) => (this.#el[event] = func));
  }
  private _applyNodes() {
    if (this.#nodes.length > 0) {
      this.#el.innerHTML = "";
      this.#el.append(...this.#nodes);
    }
  }
  private _applyInnerText() {
    if (this.#innerText) {
      this.#el.innerHTML = "";
      const apply = () => {
        const _val = (
          typeof this.#innerText === "function"
            ? this.#innerText()
            : this.#innerText
        ) as string;
        this.#el.innerText = _val;
      };
      apply();
    }
  }
  private _applyInnerHTML() {
    if (this.#innerHTML) {
      this.#el.innerHTML = "";
      const apply = () => {
        const _val = (
          typeof this.#innerHTML === "function"
            ? this.#innerHTML()
            : this.#innerHTML
        ) as HTMLElement;
        this.#el.innerHTML = _val.outerHTML;
      };
      apply();
    }
  }
  private _createElement() {
    this.#el = document.createElement(this.#tag) as T;
    const run = () => {
      this._applyAttributes();
      this._applyStyles();
      this._applyListeners();
      this._applyNodes();
      this._applyInnerText();
      this._applyInnerHTML();
    };
    run();
    this.#subscriptions.forEach(({ subscriptionFunction, handler }) => {
      if (handler) {
        const wrapper = () => {
          handler(this as ThisType<OEM_ELEMENT<T>>);
          run();
        };
        subscriptionFunction(wrapper.bind(this));
      } else {
        subscriptionFunction(run);
      }
    });
  }
  append(...nodes: (string | Node)[]) {
    this.#nodes = nodes;
    this._createElement();
    return this.#el;
  }
  attr(
    name: string,
    val: string | (() => string),
    condition?: boolean | (() => boolean)
  ) {
    this.#attrs.push([name, val, condition]);
    return this;
  }
  innerHTML(node: HTMLElement | (() => HTMLElement)) {
    this.#innerHTML = node;
    this._createElement();
    return this.#el;
  }
  innerText(text: (string | number) | (() => string | number)) {
    this.#innerText = text;
    this._createElement();
    return this.#el;
  }
  addEventListener<E extends keyof GlobalEventHandlers>(
    ev: E,
    cb: (e: Event) => any
  ) {
    this.#listeners.push([ev, cb]);
    return this;
  }
  render(): T {
    this._createElement();
    return this.#el;
  }
  subscribe(
    subscriptionFunction: (cb: () => void) => void,
    handler?: (el: ThisType<OEM_ELEMENT<T>>) => void
  ) {
    this.#subscriptions.push({ subscriptionFunction, handler });
    return this;
  }
  style(
    prop: keyof CSSStyleDeclaration,
    val: string | (() => string),
    condition?: boolean | (() => boolean) | "hover"
  ) {
    this.#styles.push([prop as any, val, condition]);
    return this;
  }
}

const createElement = <T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap
) =>
  new Proxy({} as OEM_ELEMENT<T>, {
    get: (_, key) => {
      return Reflect.get(new OEM_ELEMENT<T>(tag), key);
    },
  });

export const A = createElement<HTMLAnchorElement>("a");
export const AREA = createElement<HTMLAreaElement>("area");
export const ARTICLE = createElement<HTMLElement>("article");
export const ASIDE = createElement<HTMLElement>("aside");
export const AUDIO = createElement<HTMLAudioElement>("audio");
export const B = createElement<HTMLElement>("b");
export const BASE = createElement<HTMLBaseElement>("base");
export const BDI = createElement<HTMLElement>("bdi");
export const BDO = createElement<HTMLElement>("bdo");
export const BLOCKQUOTE = createElement<HTMLQuoteElement>("blockquote");
export const BODY = createElement<HTMLBodyElement>("body");
export const BR = createElement<HTMLBRElement>("br");
export const BUTTON = createElement<HTMLButtonElement>("button");
export const CANVAS = createElement<HTMLCanvasElement>("canvas");
export const CAPTION = createElement<HTMLTableCaptionElement>("caption");
export const CITE = createElement<HTMLElement>("cite");
export const CODE = createElement<HTMLElement>("code");
export const COL = createElement<HTMLTableColElement>("col");
export const COLGROUP = createElement<HTMLTableColElement>("colgroup");
export const DATA = createElement<HTMLDataElement>("data");
export const DATALIST = createElement<HTMLDataListElement>("datalist");
export const DD = createElement<HTMLElement>("dd");
export const DEL = createElement<HTMLModElement>("del");
export const DETAILS = createElement<HTMLDetailsElement>("details");
export const DFN = createElement<HTMLElement>("dfn");
export const DIALOG = createElement<HTMLDialogElement>("dialog");
export const DIV = createElement<HTMLDivElement>("div");
export const DL = createElement<HTMLDListElement>("dl");
export const DT = createElement<HTMLElement>("dt");
export const EM = createElement<HTMLElement>("em");
export const EMBED = createElement<HTMLEmbedElement>("embed");
export const FIELDSET = createElement<HTMLFieldSetElement>("fieldset");
export const FIGCAPTION = createElement<HTMLElement>("figcaption");
export const FIGURE = createElement<HTMLElement>("figure");
export const FOOTER = createElement<HTMLElement>("footer");
export const FORM = createElement<HTMLFormElement>("form");
export const H1 = createElement<HTMLHeadElement>("h1");
export const H2 = createElement<HTMLHeadElement>("h2");
export const H3 = createElement<HTMLHeadElement>("h3");
export const H4 = createElement<HTMLHeadElement>("h4");
export const H5 = createElement<HTMLHeadElement>("h5");
export const H6 = createElement<HTMLHeadElement>("h6");
export const HEAD = createElement<HTMLHeadElement>("head");
export const HEADER = createElement<HTMLElement>("header");
export const HGROUP = createElement<HTMLElement>("hgroup");
export const HR = createElement<HTMLHRElement>("hr");
export const HTML = createElement<HTMLElement>("html");
export const I = createElement<HTMLElement>("i");
export const IFRAME = createElement<HTMLElement>("iframe");
export const IMG = createElement<HTMLElement>("img");
export const INPUT = createElement<HTMLInputElement>("input");
export const INS = createElement<HTMLElement>("ins");
export const KBD = createElement<HTMLElement>("kbd");
export const LABEL = createElement<HTMLElement>("label");
export const LEGEND = createElement<HTMLElement>("legend");
export const LI = createElement<HTMLElement>("li");
export const LINK = createElement<HTMLElement>("link");
export const MAIN = createElement<HTMLElement>("main");
export const MAP = createElement<HTMLElement>("map");
export const MARK = createElement<HTMLElement>("mark");
export const MENU = createElement<HTMLElement>("menu");
export const META = createElement<HTMLElement>("meta");
export const METER = createElement<HTMLElement>("meter");
export const NAV = createElement<HTMLElement>("nav");
export const NOSCRIPT = createElement<HTMLElement>("noscript");
export const OBJECT = createElement<HTMLElement>("object");
export const OL = createElement<HTMLElement>("ol");
export const OPTGROUP = createElement<HTMLElement>("optgroup");
export const OPTION = createElement<HTMLElement>("option");
export const OUTPUT = createElement<HTMLElement>("output");
export const P = createElement<HTMLElement>("p");
export const PICTURE = createElement<HTMLElement>("picture");
export const PRE = createElement<HTMLElement>("pre");
export const PROGRESS = createElement<HTMLElement>("progress");
export const Q = createElement<HTMLElement>("q");
export const RP = createElement<HTMLElement>("rp");
export const RT = createElement<HTMLElement>("rt");
export const RUBY = createElement<HTMLElement>("ruby");
export const S = createElement<HTMLElement>("s");
export const SAMP = createElement<HTMLElement>("samp");
export const SCRIPT = createElement<HTMLElement>("script");
export const SECTION = createElement<HTMLElement>("section");
export const SELECT = createElement<HTMLElement>("select");
export const SLOT = createElement<HTMLElement>("slot");
export const SMALL = createElement<HTMLElement>("small");
export const SOURCE = createElement<HTMLElement>("source");
export const SPAN = createElement<HTMLElement>("span");
export const STRONG = createElement<HTMLElement>("strong");
export const STYLE = createElement<HTMLElement>("style");
export const SUB = createElement<HTMLElement>("sub");
export const SUMMARY = createElement<HTMLElement>("summary");
export const SUP = createElement<HTMLElement>("sup");
export const TABLE = createElement<HTMLElement>("table");
export const TBODY = createElement<HTMLElement>("tbody");
export const TD = createElement<HTMLElement>("td");
export const TEMPLATE = createElement<HTMLElement>("template");
export const TEXTAREA = createElement<HTMLElement>("textarea");
export const TFOOT = createElement<HTMLElement>("tfoot");
export const TH = createElement<HTMLElement>("th");
export const THEAD = createElement<HTMLElement>("thead");
export const TIME = createElement<HTMLElement>("time");
export const TITLE = createElement<HTMLElement>("title");
export const TR = createElement<HTMLElement>("tr");
export const TRACK = createElement<HTMLElement>("track");
export const U = createElement<HTMLElement>("u");
export const UL = createElement<HTMLElement>("ul");
export const VAR = createElement<HTMLElement>("var");
export const VIDEO = createElement<HTMLElement>("video");
export const WBR = createElement<HTMLElement>("wbr");
