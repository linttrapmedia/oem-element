declare module "element" {
    class OEM_ELEMENT<T extends HTMLElement> {
        #private;
        constructor(tag: string);
        private _applyAttributes;
        private _applyClassNames;
        private _applyStyles;
        private _applyListeners;
        private _applyNodes;
        private _applyInnerText;
        private _applyInnerHTML;
        private _createElement;
        addEventListener<E extends keyof GlobalEventHandlers>(ev: E, cb: (e: Event) => any): this;
        append(...nodes: (string | Node)[]): T;
        attr(name: string, val: string | (() => string), condition?: boolean | (() => boolean)): this;
        className(className: string, condition?: boolean | (() => boolean)): this;
        innerHTML(html: HTMLElement | (() => HTMLElement)): T;
        innerText(text: (string | number) | (() => string | number)): T;
        render(): T;
        subscribe(subscriptionFunction: (cb: () => void) => void, handler?: (el: ThisType<OEM_ELEMENT<T>>) => void): this;
        style(prop: keyof CSSStyleDeclaration, val: string | (() => string), condition?: boolean | (() => boolean) | "hover"): this;
    }
    export const A: OEM_ELEMENT<HTMLAnchorElement>;
    export const AREA: OEM_ELEMENT<HTMLAreaElement>;
    export const ARTICLE: OEM_ELEMENT<HTMLElement>;
    export const ASIDE: OEM_ELEMENT<HTMLElement>;
    export const AUDIO: OEM_ELEMENT<HTMLAudioElement>;
    export const B: OEM_ELEMENT<HTMLElement>;
    export const BASE: OEM_ELEMENT<HTMLBaseElement>;
    export const BDI: OEM_ELEMENT<HTMLElement>;
    export const BDO: OEM_ELEMENT<HTMLElement>;
    export const BLOCKQUOTE: OEM_ELEMENT<HTMLQuoteElement>;
    export const BODY: OEM_ELEMENT<HTMLBodyElement>;
    export const BR: OEM_ELEMENT<HTMLBRElement>;
    export const BUTTON: OEM_ELEMENT<HTMLButtonElement>;
    export const CANVAS: OEM_ELEMENT<HTMLCanvasElement>;
    export const CAPTION: OEM_ELEMENT<HTMLTableCaptionElement>;
    export const CITE: OEM_ELEMENT<HTMLElement>;
    export const CODE: OEM_ELEMENT<HTMLElement>;
    export const COL: OEM_ELEMENT<HTMLTableColElement>;
    export const COLGROUP: OEM_ELEMENT<HTMLTableColElement>;
    export const DATA: OEM_ELEMENT<HTMLDataElement>;
    export const DATALIST: OEM_ELEMENT<HTMLDataListElement>;
    export const DD: OEM_ELEMENT<HTMLElement>;
    export const DEL: OEM_ELEMENT<HTMLModElement>;
    export const DETAILS: OEM_ELEMENT<HTMLDetailsElement>;
    export const DFN: OEM_ELEMENT<HTMLElement>;
    export const DIALOG: OEM_ELEMENT<HTMLDialogElement>;
    export const DIV: OEM_ELEMENT<HTMLDivElement>;
    export const DL: OEM_ELEMENT<HTMLDListElement>;
    export const DT: OEM_ELEMENT<HTMLElement>;
    export const EM: OEM_ELEMENT<HTMLElement>;
    export const EMBED: OEM_ELEMENT<HTMLEmbedElement>;
    export const FIELDSET: OEM_ELEMENT<HTMLFieldSetElement>;
    export const FIGCAPTION: OEM_ELEMENT<HTMLElement>;
    export const FIGURE: OEM_ELEMENT<HTMLElement>;
    export const FOOTER: OEM_ELEMENT<HTMLElement>;
    export const FORM: OEM_ELEMENT<HTMLFormElement>;
    export const H1: OEM_ELEMENT<HTMLHeadElement>;
    export const H2: OEM_ELEMENT<HTMLHeadElement>;
    export const H3: OEM_ELEMENT<HTMLHeadElement>;
    export const H4: OEM_ELEMENT<HTMLHeadElement>;
    export const H5: OEM_ELEMENT<HTMLHeadElement>;
    export const H6: OEM_ELEMENT<HTMLHeadElement>;
    export const HEAD: OEM_ELEMENT<HTMLHeadElement>;
    export const HEADER: OEM_ELEMENT<HTMLElement>;
    export const HGROUP: OEM_ELEMENT<HTMLElement>;
    export const HR: OEM_ELEMENT<HTMLHRElement>;
    export const HTML: OEM_ELEMENT<HTMLElement>;
    export const I: OEM_ELEMENT<HTMLElement>;
    export const IFRAME: OEM_ELEMENT<HTMLElement>;
    export const IMG: OEM_ELEMENT<HTMLElement>;
    export const INPUT: OEM_ELEMENT<HTMLInputElement>;
    export const INS: OEM_ELEMENT<HTMLElement>;
    export const KBD: OEM_ELEMENT<HTMLElement>;
    export const LABEL: OEM_ELEMENT<HTMLElement>;
    export const LEGEND: OEM_ELEMENT<HTMLElement>;
    export const LI: OEM_ELEMENT<HTMLElement>;
    export const LINK: OEM_ELEMENT<HTMLElement>;
    export const MAIN: OEM_ELEMENT<HTMLElement>;
    export const MAP: OEM_ELEMENT<HTMLElement>;
    export const MARK: OEM_ELEMENT<HTMLElement>;
    export const MENU: OEM_ELEMENT<HTMLElement>;
    export const META: OEM_ELEMENT<HTMLElement>;
    export const METER: OEM_ELEMENT<HTMLElement>;
    export const NAV: OEM_ELEMENT<HTMLElement>;
    export const NOSCRIPT: OEM_ELEMENT<HTMLElement>;
    export const OBJECT: OEM_ELEMENT<HTMLElement>;
    export const OL: OEM_ELEMENT<HTMLElement>;
    export const OPTGROUP: OEM_ELEMENT<HTMLElement>;
    export const OPTION: OEM_ELEMENT<HTMLElement>;
    export const OUTPUT: OEM_ELEMENT<HTMLElement>;
    export const P: OEM_ELEMENT<HTMLElement>;
    export const PICTURE: OEM_ELEMENT<HTMLElement>;
    export const PRE: OEM_ELEMENT<HTMLElement>;
    export const PROGRESS: OEM_ELEMENT<HTMLElement>;
    export const Q: OEM_ELEMENT<HTMLElement>;
    export const RP: OEM_ELEMENT<HTMLElement>;
    export const RT: OEM_ELEMENT<HTMLElement>;
    export const RUBY: OEM_ELEMENT<HTMLElement>;
    export const S: OEM_ELEMENT<HTMLElement>;
    export const SAMP: OEM_ELEMENT<HTMLElement>;
    export const SCRIPT: OEM_ELEMENT<HTMLElement>;
    export const SECTION: OEM_ELEMENT<HTMLElement>;
    export const SELECT: OEM_ELEMENT<HTMLElement>;
    export const SLOT: OEM_ELEMENT<HTMLElement>;
    export const SMALL: OEM_ELEMENT<HTMLElement>;
    export const SOURCE: OEM_ELEMENT<HTMLElement>;
    export const SPAN: OEM_ELEMENT<HTMLElement>;
    export const STRONG: OEM_ELEMENT<HTMLElement>;
    export const STYLE: OEM_ELEMENT<HTMLElement>;
    export const SUB: OEM_ELEMENT<HTMLElement>;
    export const SUMMARY: OEM_ELEMENT<HTMLElement>;
    export const SUP: OEM_ELEMENT<HTMLElement>;
    export const TABLE: OEM_ELEMENT<HTMLElement>;
    export const TBODY: OEM_ELEMENT<HTMLElement>;
    export const TD: OEM_ELEMENT<HTMLElement>;
    export const TEMPLATE: OEM_ELEMENT<HTMLElement>;
    export const TEXTAREA: OEM_ELEMENT<HTMLElement>;
    export const TFOOT: OEM_ELEMENT<HTMLElement>;
    export const TH: OEM_ELEMENT<HTMLElement>;
    export const THEAD: OEM_ELEMENT<HTMLElement>;
    export const TIME: OEM_ELEMENT<HTMLElement>;
    export const TITLE: OEM_ELEMENT<HTMLElement>;
    export const TR: OEM_ELEMENT<HTMLElement>;
    export const TRACK: OEM_ELEMENT<HTMLElement>;
    export const U: OEM_ELEMENT<HTMLElement>;
    export const UL: OEM_ELEMENT<HTMLElement>;
    export const VAR: OEM_ELEMENT<HTMLElement>;
    export const VIDEO: OEM_ELEMENT<HTMLElement>;
    export const WBR: OEM_ELEMENT<HTMLElement>;
}