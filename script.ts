// import $sass from "https://esm.sh/v107/sass@1.58.2/X-aXI/es2022/sass.bundle.js";

const css = String.raw;
const scss = String.raw;
const html = String.raw;

const CTOR_KEY: unique symbol = Symbol("constructor.lock");

const createStyleSheet = (text: string, init?: CSSStyleSheetInit) => {
  return new CSSStyleSheet(init).replaceSync(text);
};

@customElement("v-terminal")
class Terminal extends HTMLElement {
  static features = new Map([["shadow", true]]);

  connected: boolean;
  _shadow!: ShadowRoot;
  _styles!: CSSStyleSheet;

  tabFocus!: number;

  // @query("[role=tablist]")
  tabList!: HTMLElement;

  // @queryAll("[role=tab]")
  tabs!: HTMLElement[];

  // @queryAll("[role=tabpanel]")
  panels!: HTMLElement[];

  constructor() {
    super();
    this.connected = false;
    this.tabFocus = 0;
    this.buttonListener = this.buttonListener.bind(this);
    this.keydownListener = this.buttonListener.bind(this);
    this._shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.connected = true;
    this.render(Terminal.template);
    
    this.tabs = this._shadow.querySelectorAll("[role=tab]");
    this.tabList = this._shadow.querySelector("[role=tablist]");
    this.title = this._shadow.querySelector(".title");
    this.panels = this._shadow.querySelectorAll("[role=tabpanels]");
    
    this.tabs?.forEach(
      (tab) => tab?.addEventListener?.("click", this.buttonListener as any),
    );
    this.tabList?.addEventListener?.("keydown", this.keydownListener as any);
    console.log("TerminalElement connected to DOM.");
  }

  disconnectedCallback() {
    this.connected = false;
    console.log("TerminalElement disconnected from DOM.");
    this.tabs.forEach(
      (tab) => tab.removeEventListener("click", this.buttonListener as any),
    );
    this.tabList.removeEventListener("keydown", this.keydownListener as any);
  }

  adoptedCallback(oldDocument: Document, newDocument: Document) {
    console.log("TerminalElement adopted by new document:");
    console.log(`oldDocument: ${oldDocument}`);
    console.log(`newDocument: ${newDocument}`);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(
      `Terminal attribute changed ("${name}"): "${oldValue}" -> "${newValue}"`,
    );

    if (name === "styles" && this._shadow) {
      adoptStyles(this._shadow, [createStyleSheet(newValue)]);
    }
  }

  buttonListener(event: MouseEvent & { target: Terminal }) {
    var _b, _c, _d;
    if (event.keyCode === 39 || event.keyCode === 37) {
        this.tabs?.[this.tabFocus]?.setAttribute("tabindex", "-1");
        if (event.keyCode === 39) {
            this.tabFocus++;
            if (this.tabFocus >= this.tabs.length) {
                this.tabFocus = 0;
            }
        }
        else if (event.keyCode === 37) {
            this.tabFocus--;
            if (this.tabFocus < 0) {
                this.tabFocus = this.tabs.length - 1;
            }
        }
        this.tabs?.[this.tabFocus]?.setAttribute?.("tabindex", "0");
        this.tabs?.[this.tabFocus]?.focus?.();
    }
  }

  keydownListener(event: KeyboardEvent & { target: Terminal }) {
    var _b, _c;
    let target = event.target;
    let parent = (_b = target.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
    let linked = target.getAttribute("aria-controls");
    // strip any existing aria-selected flags from all tabs
    parent === null || parent === void 0 ? void 0 : parent.querySelectorAll('[aria-selected="true"]').forEach((tab) => {
        if (tab !== target) {
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "-1");
            tab.classList.remove("is-active");
        }
    });
    // then re-select only the active tab
    target.setAttribute("aria-selected", "true");
    target.setAttribute("tabindex", "0");
    target.classList.add("is-active");
    // and finally set any inactive tabs as hidden
    (_c = parent === null || parent === void 0 ? void 0 : parent.parentNode) === null || _c === void 0 ? void 0 : _c.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
        if (panel.id === linked) {
            panel.removeAttribute("hidden");
            panel.setAttribute("tabindex", "-1");
        }
        else {
            panel.setAttribute("hidden", "true");
            panel.setAttribute("tabindex", "0");
        }
    });
  }

  get styles(): CSSStyleSheet {
    return this._styles || (this._styles = createStyleSheet(Terminal.styles));
  }

  set styles(value: any) {
    this._styles = value instanceof CSSStyleSheet ? value : createStyleSheet(value);
  }

  render(payload?: string) {
    if (this._shadow) {
      this._shadow.innerHTML = Terminal.template;
      this._shadow.adoptedStyleSheets = [this.styles];
    }
  }

  static get template() {
    return html`
      <div class="window">
        <div class="header">
          <div class="buttons"></div>
          <span class="title">
            <slot name="title"><span>Terminal Component</span></slot>
          </span>
          <ul class="tabs" role="tablist">
            <slot name="tabs"></slot>
          </ul>
        </div>
        <div class="body">
          <slot>
            <pre class="code-outer line-numbers-bg"><code class="code"><span class="line"><span style="color: #db889a;">is</span><span style="color: #ECEFF4">.</span><span style="color: #88C0D0">string</span><span style="color: #D8DEE9FF">(</span><span style="color: #A3BE8C">value</span><span style="color: #ECEFF499">: unknown</span><span style="color: #D8DEE9FF">)</span> <span style="color: #81A1C1">=&gt;</span> <span style="color: #A3BE8C">value</span> <span style="color: #ECEFF499">is</span> <span style="color: #d4976c">string</span><span style="color:#ECEFF499">;</span></span></code></pre>
          </slot>
        </div>
      </div>
    `;
  }

  static get styles() {
    return `
        :host {
          --bg-1: #111518;
          --bg-2: #111827;
          --bg-3: #20262e;
          --bg-4: #234;
          --bg-alpha-1: #ffffff05;
          --text-1: #fff;
          --text-2: #ddd;
          --text-3: #fffa;
          --text-4: #789;
          --border-1: #000a;
          --border-2: #fff3;
          --shadow-1: #0004;
          --shadow-2: #0003;
          --shadow-3: #0002;
          --shadow-4: #000f;
          --btn-shadow: #fff3;
          --line-numbers-bg: #111;
          --line-numbers-text: #ddd;
          --border-title: #0009;
          
          /* window buttons */
          --btn-size: 12px;
          --btn-close: #d9515d;
          --btn-minimize: #f4c025;
          --btn-zoom: #3ec930;

          /* globals */
          --font-mono: 
            "Operator Mono SSm Lig", "Dank Mono", "Fira Code", "Roboto Mono", monospace;
          --font-sans: system-ui, sans-serif;

          /* main terminal window */
          --terminal-padding: 0.5rem 1rem 0.8rem 0rem;
          --terminal-shadow: 0 0.22rem 0.4rem var(--shadow-1),
            0 1rem 1.6rem 0.2rem var(--shadow-2),
            1.25rem 3.2rem 5rem 0.2rem var(--shadow-3);
          --terminal-w: 30rem;
          --terminal-max-w: 90vw;
          --terminal-min-h: 15rem;
          --terminal-bg: var(--bg-1); /* #20262e */
          --terminal-text: var(--text-1);
          --terminal-font-size: 0.86rem;

          /* top title bar */
          --terminal-title-font-size: var(--btn-size);
          --terminal-title-line-height: 1.2em;
          --terminal-title-padding-x: 0;
          --terminal-title-padding-y: calc(var(--btn-size));
          --terminal-title-border: 2px solid var(--border-title, #0009);
          --terminal-title-bg: var(--bg-2);
          --terminal-title-bg-from: var(--bg-2);
          --terminal-title-bg-to: var(--bg-3);
          --terminal-default-title: "bash";

          /* line numbers in left margin */
          --line-numbers-font-size: 0.8em;
          --line-numbers-line-height: 1.2;
          --line-numbers-padding: 0 0.5rem 0 1rem;
          --line-numbers-margin: 0 1.5rem 0 0;
          --line-numbers-border: 1px solid var(--border-2);
          --line-numbers-min-w: 2.5rem;
          --line-numbers-max-w: 3.5rem;

          /* button shadows */
          --btn-shadow-color: var(--btn-shadow);
          --btn-shadow-offset-x: 0.5px;
          --btn-shadow-offset-y: 1px;

          /* do not edit below here kthx */
          --terminal-border-radius: calc(var(--btn-size, 13px) / 1.333);
          --btn-shadows: 0.33px 1px 0.33px 0.33px var(--btn-shadow),
            calc(var(--btn-offset) + 0.33px) 1px 0.33px 0.33px var(--btn-shadow), 
            calc(var(--btn-offset-2) + 0.33px) 1px 0.33px 0.33px var(--btn-shadow);
          --btn-offset: calc(
            var(--btn-size, 15px) + calc(var(--btn-size, 15px) / 1.65)
          );
          --btn-offset-2: calc(var(--btn-offset) * 2);
          --terminal-box-shadow: var(--terminal-shadow);
        }
        
        @media (prefers-color-scheme: light) {
         :host {
            --bg-1: #f0f0f0;
            --bg-2: #ddddea;
            --bg-3: #ececec;
            --bg-4: #9ab;
            --bg-alpha-1: #fff6;
            --text-1: #000;
            --text-2: #123;
            --text-3: #000a;
            --text-4: #456;
            --border-1: #0004;
            --border-2: #0003;
            --border-title: #0003;
            --shadow-1: #0004;
            --shadow-2: #0003;
            --shadow-3: #0002;
            --shadow-4: #0004;
            --btn-shadow: #fff6;
            --line-numbers-bg: #e0e0e966;
            --line-numbers-text: #444;
          }
        }

        .window {
          min-height: var(--terminal-min-h, auto);
          background-color: var(--terminal-bg);
          color: var(--terminal-text);
          font-size: var(--terminal-font-size, 1rem);
          font-family: var(--font-mono) !important;
          line-height: 1.2;
          display: block;
          border-radius: var(--terminal-border-radius, 6px);
          margin: auto;
          padding: var(--terminal-padding, 1.5rem);
          padding-top: calc(var(--btn-size) * 3.5 + 0.5rem);
          position: relative;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-box-shadow: var(--terminal-box-shadow);
          box-shadow: var(--terminal-box-shadow);
          z-index: 1;
          overflow: hidden;
        }


        .window:focus,
        .window:active,
        .window:target {
          outline: 2px solid var(--terminal-focus-ring, var(--btn-close, #0cf4)) 1px !important;
        }

          /* window buttons */
          .buttons {
            content: "";
            position: absolute;
            top: calc(var(--btn-size, 15px) * 1.625);
            left: var(--btn-size, 15px);
            display: inline-block;
            width: var(--btn-size, 15px);
            height: var(--btn-size, 15px);
            border-radius: 50%;
            transform-origin: 50% 50%;
            transform: translateY(-50%);
            background: var(--btn-close);
            -webkit-box-shadow: var(--btn-offset) 0 0 var(--btn-minimize),
              var(--btn-offset-2) 0 0 var(--btn-zoom);
            box-shadow: var(--btn-offset) 0 0 var(--btn-minimize),
              var(--btn-offset-2) 0 0 var(--btn-zoom), var(--btn-shadows);
            z-index: 120;
          }

        .header {
          --attr-title: attr(data-title);
          --attr-title-2: attr(title);

          content: " ";
          content: var(--terminal-default-title, "bash");
          content: attr(title);
          content: attr(data-title);

          position: absolute;
          font-family: var(--font-sans, sans-serif) !important;
          font-size: var(--terminal-title-font-size, 1.1em) !important;
          color: var(--color-text-subtle);
          text-align: center;

          background-color: var(--terminal-bg);
          background-image: linear-gradient(
            0deg,
            var(--terminal-title-bg-from, var(--terminal-bg)) 0%,
            var(--terminal-title-bg-to, var(--terminal-bg)) 90%
          );
          line-height: var(--terminal-title-line-height, 1.5);
          top: 0;
          left: 0;
          width: 100%;
          margin: 0;
          min-height: calc(var(--terminal-title-font-size, 1em) + 2px);
          padding-top: var(--terminal-title-padding-y, 5px);
          padding-right: var(--terminal-title-padding-x, 0);
          padding-bottom: calc(var(--terminal-title-padding-y, 5px));
          padding-left: var(--terminal-title-padding-x, 0);
          border-bottom: var(--terminal-title-border, 1px solid #fff2);
          z-index: 100;
          border-top-left-radius: var(--terminal-border-radius);
          border-top-right-radius: var(--terminal-border-radius);
          box-shadow: inset 0 0 1px var(--terminal-bg), inset 0 1px 0 #fff3;
        }

        .line-numbers-bg::before {
          width: calc(var(--line-numbers-max-w, 3.5rem) - 0.5rem);
          height: calc(100% + 2rem);
          position: absolute;
          top: -1rem;
          left: -1px;
          bottom: -1rem;
          z-index: 50;
          background-color: var(--line-numbers-bg, #101010);
          content: "";
        }

        /* code content  */
        pre,
        pre > code {
          font-family: var(--font-mono, "Dank Mono", "Fira Code", monospace);
          white-space: pre;
          margin: 0;
          padding: 0;
        }

        pre {
          counter-reset: line;
          display: block;
          height: 100%;
          min-height: 100%;
          z-index: 10;
        }
        pre > code {
          margin: 0;
          padding: 0;
          z-index: 11;
        }
        pre > code span.line {
          display: block;
          white-space: nowrap;
          counter-increment: line;
          z-index: 12;
        }
        pre > code span.line::before {
          content: counter(line);
          font-family: var(--font-mono, monospace);
          font-size: var(--line-numbers-font-size, 0.8em);
          text-align: right;
          min-width: var(--line-numbers-min-w, 2rem);
          max-width: var(--line-numbers-max-w, 4rem);
          margin: var(--line-numbers-margin);
          padding: var(--line-numbers-padding, 0 1rem);
          background-color: transparent;
          color: var(--line-numbers-text, #fff);

          line-height: var(--line-numbers-line-height, 1.5);
          position: sticky;
          left: 0.5rem;
          z-index: 60;
        }

        pre[hidden=""],
        pre[hidden="true"],
        pre[hidden="hidden"] {
          display: none !important;
        }
        
        .dark, [data-theme="dark"] {
          /* backgrounds (dark) */
          --bg-1: #111518;
          --bg-2: #111827;
          --bg-3: #20262e;
          --bg-4: #234;
          --bg-alpha-1: #ffffff05;
          --text-1: #fff;
          --text-2: #ddd;
          --text-3: #fffa;
          --text-4: #789;
          --border-1: #000a;
          --border-2: #fff3;
          --shadow-1: #0004;
          --shadow-2: #0003;
          --shadow-3: #0002;
          --shadow-4: #000f;
          --btn-shadow: #fff3;
          --line-numbers-bg: #111;
          --line-numbers-text: #ddd;
          --border-title: #0009;
        }
        
        .light, [data-theme="light"] {
          --bg-1: #f0f0f0;
          --bg-2: #ddddea;
          --bg-3: #ececec;
          --bg-4: #9ab;
          --bg-alpha-1: #fff6;
          --text-1: #000;
          --text-2: #123;
          --text-3: #000a;
          --text-4: #456;
          --border-1: #0004;
          --border-2: #0003;
          --border-title: #0003;
          --shadow-1: #0004;
          --shadow-2: #0003;
          --shadow-3: #0002;
          --shadow-4: #0004;
          --btn-shadow: #fff6;
          --line-numbers-bg: #e0e0e966;
          --line-numbers-text: #444;
        }
      `;
  }

  static get observedAttributes() {
    return [
      "tabs",
      "tabList",
      "panels",
      "tabFocus",
      "title",
      "dataset",
      "data-title",
      "data-theme",
      "styles",
      "template",
      "properties",
    ];
  }
}

// --------------------------- //
//        decorators.ts        //
// --------------------------- //

/**
 * The default memoization TTL for the {@link query} and {@link queryAll}
 * decorators (in milliseconds). Set to `0` to disable memoization by
 * default. Set to `Infinity` to infinitely cache the query results,
 * effectively making the decorated fields into non-computed properties.
 */
const DEFAULT_QUERY_TTL = 0;

const defaultQueryInit = Object.freeze<ResolvedQueryInit>({
  configurable: true,
  enumerable: false,
  writable: false,
  context: undefined!,
  ttl: DEFAULT_QUERY_TTL,
});


export type Constructor<T = any, A extends any[] = any[]> = new (
  ...args: A
) => T;

export type AbstractConstructor<T = any, A extends any[] = any[]> =
  abstract new (...args: A) => T;

/**
 * Context provided to a class decorator.
 * @template Class The type of the decorated class associated with this context.
 */
interface ClassDecoratorContext<
  Class extends Constructor = Constructor,
> {
  /** The kind of element that was decorated. */
  readonly kind: "class";
  /** The name of the decorated class. */
  readonly name: string | undefined;
  /** Adds a callback to be invoked after the definition is finalized. */
  addInitializer(initializer: (this: Class) => void): void;
}

type CustomElementInitializer = {
  <This extends Constructor = Constructor>(
    target: This,
    context: ClassDecoratorContext<This>,
  ): void;
};

interface CustomElementDecoratorOptions {
  extends?: string;
  initializer?: CustomElementInitializer;
}

type ComponentEventListener<Target extends HTMLElement = HTMLElement> = {
  <T extends Target>(this: T, event: Event): void;
};

type AddOrRemoveEventListenerAction = "on" | "off";

interface QueryInit {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean;
  context?: ParentNode | null | undefined;
  ttl?: number | typeof Infinity;
}

interface ResolvedQueryInit extends Required<QueryInit> {
  /* resolved query initialization options */
}

/**
 * Shorthand decorator to define a custom element from a subclass of
 * the HTMLElement interface. Applied just before a class declaration,
 * this decorator will inject it in the global scope, apply toStringTag
 * values to the prototype and the constructor (if necessary), and then
 * define the component in the customElements registry.
 *
 * Inspired by the `@customElement` decorator from the `lit` library, with
 * several additional features introduced.
 *
 * @param componentName the custom element tagName to register the new web component under. Must be a hyphenated string according to the specification.
 * @returns a ClassDecorator that applies the needed mutations and performs the necessary registration of your new component.
 * @returns a polymorphic class decorator, which supports both Stage 3 and Legacy syntaxes.
 */
function customElement(componentName: string): {
  <T extends typeof HTMLElement>(target: T): void;
  <T extends typeof HTMLElement, C extends ClassDecoratorContext>(
    target: T,
    context: C,
  ): void;
};

/**
 * Initialize a custom web component, defining it in the global registry for the provided
 * component tagName, after running a custom initializer function (if provided). If the
 * component is not an autonomous custom element, but rather extends an existing built-in
 * element, you will need to provide the tagName for the element it extends in the second
 * parameter's `extends` property.
 *
 * @param componentName the desired tagName to register the component with. Must be hyphenated.
 * @param [options] allows extending built-in elements and/or running custom initialization
 * logic during the construction of the custom element.
 * @returns a polymorphic class decorator, which supports both Stage 3 and Legacy syntaxes.
 */
function customElement(
  componentName: string,
  options?: CustomElementDecoratorOptions,
): {
  <T extends typeof HTMLElement>(target: T): T | void;
  <T extends typeof HTMLElement, C extends ClassDecoratorContext<T>>(
    target: T,
    context: C,
  ): void;
};

function customElement(
  tagName: string,
  options: CustomElementDecoratorOptions = {},
) {
  return function <T extends typeof HTMLElement>(
    ...args: [target: T] | [target: T, context: ClassDecoratorContext<T>]
  ): void {
    const [target, context] = args;

    if (
      !(typeof target === "function" &&
        target.prototype instanceof HTMLElement)
    ) {
      throw new TypeError("@customElement can only decorate web components that extend the HTMLElement class.");
    }

    // determine global name for the custom element
    let name = (
      (target as any).displayName || target.name || pascalCase(tagName)
    ).replace(/Element|Constructor/g, "") + "Element";

    Object.defineProperties(target, {
      [Symbol.toStringTag]: {
        get: () => name + "Constructor",
        configurable: true,
      },
    });

    Object.defineProperties(target.prototype, {
      [Symbol.toStringTag]: {
        get: () => name,
        configurable: true,
      },
    });

    Object.assign(globalThis, { [name]: target });

    /**
     * The `extends` and `initializer` options can be provided as the
     * second argument of the @customElement decorator. For example:
     * ```ts
     * @customElement("word-count", {
     *   extends: "p",
     *   initializer()
     * })
     * class WordCount extends HTMLParagraphElement {
     *   constructor() { super() }
     *   // ...
     * }
     * ```
     */
    const { initializer } = options || {};

    if (context == null) {
      // Stage 1 / 2 Decorators (Legacy)
      // @ts-expect-error but why?
      class klass extends target {
        constructor() {
          super();

          if (typeof initializer === "function") {
            initializer?.call?.(this, this as any, context as any);
          }
        }
      }
      Object.defineProperty(klass, "name", { value: name, configurable: true });

      if (options.extends && typeof options.extends === "string") {
        customElements.define(tagName, klass, { extends: options.extends! });
      } else {
        customElements.define(tagName, klass);
      }
    } else if (typeof context === "object") {
      // TC39 Stage 3 Decorator Syntax (TypeScript 5.0+)
      if (
        "kind" in context &&
        context.kind === "class" &&
        "addInitializer" in context &&
        typeof context.addInitializer === "function"
      ) {
        context.addInitializer(function (this: any) {
          if (typeof initializer === "function") {
            initializer?.call?.(this, this, context);
          }

          if (options.extends && typeof options.extends === "string") {
            customElements.define(tagName, this, { extends: options.extends! });
          } else {
            customElements.define(tagName, this);
          }
        });
      } else {
        throw new TypeError(
          "The @customElement decorator can only be applied directly to custom element" +
            "classes that extend the HTMLElement class.",
        );
      }
    } else {
      // should never happen, but...
      throw new TypeError();
    }
  };
}

/**
 * Decorator with decorator similar to lit's `query` decorator. Applied to
 * a property field on a custom element, it will replace the field with
 * a computed property containing the node that matches the given
 * selector. Optional second parameter can be used to customize the query
 * behavior. Providing a `context` value will expand/restrict the query to
 * a different scope of the DOM (default is component instance `this`).
 * Providing a `ttl` value will determine the memoization of the computed
 * property results: Pass `0` to disable memoization entirely, returning a
 * fresh dataset every time the property is accessed. Pass `Infinity` to
 * infinitely cache the results (resulting in the best performance, at the
 * price of potentially stale results). Or, provide a non-negative integer
 * to dictate the caching TTL in milliseconds.
 *
 * @param selector - The selector to query the given context for.
 * @param init - Optional initialization options
 * @param init.context - Custom scope context to run the query in. If `document` is the context, for example, the code run will be `document.querySelector(s)`. Defaults to `this`.
 * @param init.ttl - Custom memoization TTL value (in milliseconds)
 * @returns a PropertyDecorator that is applied at runtime.
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *    @query('> header') header!: HTMLHeaderElement;
 *
 *    constructor() {
 *      super();
 *    }
 *
 *    connectedCallback() {
 *      this.header.textContent = "HELLO WORLD!";
 *    }
 * }
 * ```
 */
function query(
  selector: string,
  init?: QueryInit,
): <T extends HTMLElement>(target: T, key: string | symbol) => void;

function query(
  selector: string,
  init: QueryInit = defaultQueryInit,
) {
  return createQueryDecorator("query", selector, init);
}

/**
 * Decorator similar to lit's `queryAll` in functionality. Applied to
 * a property field on a custom element, it will replace the field with
 * a computed property containing an array of nodes that match the given
 * selector(s). Optional second parameter can be used to customize the query
 * behavior. Providing a `context` value will expand/restrict the query to
 * a different scope of the DOM (default is component instance `this`).
 * Providing a `ttl` value will determine the memoization of the computed
 * property results: Pass `0` to disable memoization entirely, returning a
 * fresh dataset every time the property is accessed. Pass `Infinity` to
 * infinitely cache the results (resulting in the best performance, at the
 * price of potentially stale results). Or, provide a non-negative integer
 * to dictate the caching TTL in milliseconds.
 *
 * @param selector - The selector(s) to query the given context for.
 * @param init - Optional initialization options
 * @param init.context - Custom scope context to run the query in. If `document` is the context, for example, the code run will be `document.querySelector(s)`. Defaults to `this`.
 * @param init.ttl - Custom memoization TTL value (in milliseconds)
 * @returns a PropertyDecorator that is applied at runtime.
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *    @queryAll('> a[href]') links!: HTMLAnchorElement[];
 *
 *    constructor() {
 *      super();
 *    }
 *
 *    connectedCallback() {
 *      this.links.forEach((link: HTMLAnchorElement) => {
 *        // do something with the nodes
 *      });
 *    }
 * }
 * ```
 */
function queryAll(
  selector: string,
  init?: QueryInit,
): <T extends HTMLElement>(target: T, key: string | symbol) => void;

function queryAll(
  selectors: string[],
  init?: QueryInit,
): <T extends HTMLElement>(target: T, key: string | symbol) => void;

function queryAll(
  selector: string | string[],
  init: QueryInit = defaultQueryInit,
) {
  return createQueryDecorator("queryAll", selector, init);
}

/**
 * Add an event listener for a given event name to a custom component or
 * any of the custom element's properties, so long as they are a valid
 * EventTarget that can accept event listeners.
 */
function on<T extends string>(
  eventType: T,
  listener: ComponentEventListener,
) {
  return createEventListenerDecorator("on", eventType, listener);
}

/**
 * Add an event listener for a given event name to a custom component or
 * any of the custom element's properties, so long as they are a valid
 * EventTarget that can accept event listeners.
 */
function off<T extends string>(
  eventType: T,
  listener: ComponentEventListener,
) {
  return createEventListenerDecorator("off", eventType, listener);
}

type QueryType = "query" | "queryAll";

/* @internal */
function createQueryDecorator(
  name: QueryType,
  selector: string | string[],
  init: QueryInit = defaultQueryInit,
) {
  const {
    configurable,
    enumerable,
    writable,
    context,
    ttl,
  } = Object.assign({}, defaultQueryInit, init) as ResolvedQueryInit;

  return {
    [name]: function <T extends HTMLElement>(
      target: T,
      key: string | symbol,
      descriptor?: PropertyDescriptor | undefined,
    ): void {
      const isMethod = descriptor !== undefined;

      if (
        typeof target === "object" && target != null &&
        target instanceof HTMLElement
      ) {
        if (typeof key === "string" || typeof key === "symbol") {
          let res: Node | Node[] | undefined = undefined;
          let lastTime = Date.now();

          descriptor = {
            get() {
              const isFresh = (Date.now() - lastTime) <= ttl;
              if (name === "queryAll") {
                res ||= [];

                if (Array.isArray(res)) {
                  if (res.length && isFresh) return res;
                  res = $([selector].flat().join(","), context || this);
                } else {
                  throw new TypeError(
                    `The @${name} decorator expects an array of resulting Nodes.`,
                  );
                }
              } else if (name === "query") {
                if (res && isFresh) {
                  return res;
                }
                res = $(selector, context || this); //.querySelector(selector);
                if (Array.isArray(res)) res = res[0];
              } else {
                throw new TypeError(
                  `@${name} is not a valid query decorator.`,
                );
              }

              lastTime = Date.now();
              return res;
            },
            set(value) {
              if (writable) {
                if (name === "queryAll") {
                  res = Array.from([value].flat(2));
                } else if (name === "query") {
                  if (typeof Node === "function" && value instanceof Node) {
                    res = value;
                  } else {
                    throw new TypeError(
                      `The property '${String(key)}' expects a Node instance.`,
                    );
                  }
                } else {
                  throw new TypeError(
                    `@${name} is not a valid query decorator.`,
                  );
                }
              } else {
                throw new TypeError(
                  `The field '${String(key)}' is read-only and cannot be set.`,
                );
              }
            },
            configurable,
            enumerable,
          };

          // target[key] = descriptor.get();

          Object.defineProperty(target.constructor.prototype, key, {
            configurable: true,
            get() {
              if (descriptor) Object.defineProperty(this, key, descriptor);
              return this[key];
            },
            set(value) {
              this[key] = value;
            },
          });

          // if (isMethod) return descriptor;
        } else {
          throw new TypeError(
            `@${name} expects a string or symbol for a property key. Received ${
              String(key)
            } (${typeof target}).`,
          );
        }
      } else {
        throw new TypeError(
          `@${name} expects an HTMLElement descendant for its target. Received ${
            String(target)
          } (${typeof target}).`,
        );
      }
    },
  }[name];
}

/**
 * Used to create the {@linkcode on} and {@linkcode off} decorators for adding/removing event listeners.
 * @internal
 */
function createEventListenerDecorator(
  action: AddOrRemoveEventListenerAction,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
) {
  return {
    [action]: function <T extends typeof HTMLElement | HTMLElement>(
      target: T,
      key?: string | symbol,
    ): void {
      if (typeof eventType !== "string" || typeof listener !== "function") {
        throw new TypeError();
      }

      const eventMethod = action === "on"
        ? "addEventListener"
        : "removeEventListener";

      if (key === undefined) {
        if (typeof target === "function") {
          EventTarget.prototype[eventMethod].call(
            target.prototype,
            eventType,
            listener.bind(target.prototype),
          );
        }
      } else {
        if (target != null && typeof target === "object") {
          if ((target as any)[key] instanceof EventTarget) {
            EventTarget.prototype[eventMethod].call(
              (target as any)[key],
              eventType,
              listener.bind((target as any)[key]),
            );
          } else if (
            Array.isArray((target as any)[key]) ||
            (target as any)[key] instanceof NodeList
          ) {
            (target as any)[key].forEach((node: Node) => {
              if (node instanceof EventTarget) {
                EventTarget.prototype[eventMethod].call(
                  node,
                  eventType,
                  listener.bind(node),
                );
              }
            });
          }
        }
      }
    },
  }[action];
}

/* @internal */
function pascalCase(str: string) {
  return String(str).trim().normalize().replace(
    /(?:^|\b| |(?<=[a-z])-)(\w)/g,
    (_, $1) => $1.toUpperCase(),
  );
}

function camelCase(str: string) {
  str = pascalCase(str);
  return str[0].toLowerCase() + str.slice(1);
}

function delimiterCase(str: string, delimiter = "-") {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (s, ofs) => (ofs ? delimiter : "") + s.toLowerCase(),
  );
}

function kebabCase(str: string) {
  return delimiterCase(str, "-");
}

function snakeCase(str: string) {
  return delimiterCase(str, "_");
}

function dotCase(str: string) {
  return delimiterCase(str, ".");
}

/* @internal */
export function $(query: any, $context: any = document) {
  let $nodes: (Element | Node)[] = [];

  if (query instanceof NodeList) {
    $nodes = Array.from(query);
  } else if (Array.isArray(query)) {
    $nodes = query;
  } else if (query instanceof HTMLElement || query instanceof SVGElement) {
    $nodes = [query];
  } else {
    $nodes = Array.from($context.querySelectorAll(query));
  }

  if ($nodes.filter(Boolean).length <= 0) {
    $nodes = [];
  }

  const sugared = Array.from($nodes, ($el) => {
    Object.assign($el, {
      on(this: any, names: string, fn: EventListenerOrEventListenerObject) {
        for (const name of names.split(/\s*[\t ,\|;]\s*/)) {
          this.addEventListener(name, fn);
        }
        return this;
      },
      off(this: any, names: string, fn: EventListenerOrEventListenerObject) {
        for (const name of names.split(/\s*[\t ,\|;]\s*/)) {
          this.removeEventListener(name, fn);
        }
        return this;
      },
      attr(this: any, attr: string, val?: unknown) {
        if (val === undefined) return this.getAttribute(attr);
        if (val === null) this.removeAttribute(attr);
        else this.setAttribute(attr, String(val || ""));

        return this;
      },
    });

    return Object.defineProperties($el, {
      on: { enumerable: false },
      off: { enumerable: false },
      attr: { enumerable: false },
    });
  });

  type sugared = typeof sugared;

  Object.assign(sugared, {
    on(this: sugared, names: string, fn: EventListenerOrEventListenerObject) {
      this.forEach(($el: any) => $el?.on?.call($el, names, fn));
      return this;
    },
    off(this: sugared, names: string, fn: EventListenerOrEventListenerObject) {
      this.forEach(($el: any) => $el?.off?.call($el, names, fn));
      return this;
    },
    attr(this: any, attrs: string | Record<string, string>, val?: any) {
      if (typeof attrs === "string" && val === undefined) {
        return this[0]?.attr?.(attrs);
      } else if (typeof attrs === "object" && attrs !== null) {
        this.forEach(($el: any) =>
          Object.entries(attrs).forEach(([key, val]) => $el.attr(key, val))
        );
      } else if (
        typeof attrs === "string" &&
        (val || val == null || val == "")
      ) {
        this.forEach(($el: any) => $el?.attr?.(attrs, val));
      }

      return this;
    },
  });

  return Object.defineProperties(sugared, {
    on: { enumerable: false },
    off: { enumerable: false },
    attr: { enumerable: false },
  });
}

// export class Hooks<T extends HTMLElement = Terminal> {
//   #target: T;
//   #eventTarget: EventTarget;
//   #invocations: {
//     [K in Hooks.Type]: WeakMap<
//       Hooks.Map<T>[K],
//       Set<{
//         time: string | number | Date;
//         result: unknown;
//       }>
//     >;
//   };

//   adopted = new Set<Hooks.Adopted<T>>();
//   connected = new Set<Hooks.Connected<T>>();
//   disconnected = new Set<Hooks.Disconnected<T>>();
//   attributeChanged = new Set<Hooks.AttributeChanged<T>>();

//   constructor(
//     public readonly target: T,
//   ) {
//     this.#eventTarget = new EventTarget();
//     this.#invocations = {
//       adopted: new WeakMap(),
//       connected: new WeakMap(),
//       disconnected: new WeakMap(),
//       attributeChanged: new WeakMap(),
//     };

//     this.add = this.add.bind(this);
//     this.has = this.has.bind(this);

//     return this;
//   }

//   public has<K extends Hooks.Type>(kind: K): boolean;
//   public has<K extends Hooks.Type>(kind: K, callback: Hooks.Map<T>[K]): boolean;
//   public has<K extends Hooks.Type>(
//     kind: K,
//     callback?: Hooks.Map<T>[K],
//   ): boolean {
//     if (kind in this && Hooks.is.type(kind)) {
//       if (callback === undefined) {
//         return true;
//       } else {
//         Hooks.assert.callback(callback);

//         return (this as any)[kind].has(callback);
//       }
//     } else {
//       return false;
//     }
//   }

//   add<K extends Hooks.Type>(
//     kind: K,
//     callback: Hooks.Map<T>[K],
//     once?: boolean,
//   ): this {
//     Hooks.assert.type(kind);
//     Hooks.assert.callback(callback);

//     if (!this.has(kind, callback as any)) {
//       // proxy the callback to keep track of its invocations
//       callback = new Proxy(callback, {
//         apply: (target, thisArg, args) => {
//           const invocations = this.#invocations?.[kind]?.get(target as any) ?? (
//             this.#invocations?.[kind]?.set(target as any, new Set()).get(
//               target as any,
//             )!
//           );

//           // exit early if this is a one-shot event listener
//           if (once === true) {
//             // remove the event listener
//             if (invocations?.size > 0) {
//               return this.off(kind, callback);
//             }
//           }

//           const result = Reflect.apply(target, thisArg, args);
//           const time = new Date();

//           invocations?.add({ time, result });

//           return result;
//         },
//       });

//       this.#eventTarget.addEventListener(kind, callback as any);
//       (this as any)[kind].add(callback);
//     }

//     return this;
//   }

//   public on<K extends Hooks.Type>(kind: K, callback: Hooks.Map<T>[K]): this {
//     return this.#add(kind, callback, false);
//   }

//   public once<K extends Hooks.Type>(kind: K, callback: Hooks.Map<T>[K]): this {
//     return this.add(kind, callback, true);
//   }

//   public off<K extends Hooks.Type>(kind: K, callback: Hooks.Map<T>[K]): this {
//     Hooks.assert.type(kind);
//     Hooks.assert.callback(callback);

//     if (this.has(kind, callback as any)) {
//       this.#eventTarget.removeEventListener(kind, callback as any);
//       (this as any)[kind].delete(callback);
//     }

//     return this;
//   }

//   public emit<K extends Hooks.Type>(
//     kind: K,
//     ...args: Parameters<Hooks.Map<T>[K]>
//   ): this {
//     Hooks.assert.type(kind);

//     const { error } = console || {
//       error: (..._: any) => {/* noop */},
//     };

//     if (kind in this && this[kind] instanceof Set) {
//       const event = new CustomEvent(
//         kind,
//         {
//           detail: {
//             hook: kind,
//             target: this.target,
//             args,
//           },
//         },
//       );

//       // this.#eventTarget.dispatchEvent(event);
//       this[kind].forEach(async (hook) => {
//         await (hook as Function)?.apply?.(this.target, args);
//       });
//     }

//     return this;
//   }
// }

// export namespace Hooks {
//   export const types = [
//     "adopted",
//     "attributeChanged",
//     "connected",
//     "disconnected",
//   ] as const;
//   interface Assertions {
//     callback(it: unknown): asserts it is Callback;
//     type(it: unknown): asserts it is Type;
//   }
//   const predicates = {
//     callback(it: unknown): it is Callback {
//       return typeof it !== "function";
//     },
//     type(it: unknown): it is Type {
//       return typeof it === "string" && types.includes(it as any);
//     },
//   } as const;
//   const assertions: Assertions = {
//     callback(it: unknown): asserts it is Callback {
//       if (!is.callback(it)) {
//         throw new TypeError(
//           `Expected a hook callback function. Received: ${typeof it}`,
//         );
//       }
//     },
//     type(it: unknown): asserts it is Type {
//       if (!is.type(it)) {
//         throw new TypeError(
//           `Invalid hook type.\n\nExpected one of the following: '${
//             types.join("', '")
//           }'.\nReceived: ${it} (${typeof it})`,
//         );
//       }
//     },
//   } as const;

//   export const is = new Proxy(
//     Object.assign(
//       function is(it: unknown) {
//         return it === null ? "null" : typeof it === "object"
//           ? (
//             it.constructor.name === "Object"
//               ? "object"
//               : it.constructor.name || ({}).toString.call(it).replace(
//                 /^\[object |\]$/g,
//                 "",
//               )
//           )
//           : typeof it;
//       },
//       predicates,
//     ),
//     {
//       get(target, key, receiver) {
//         if (target.hasOwnProperty(key)) {
//           if (typeof key === "string" && typeof target[key] === "function") {
//             return {
//               [key](this: any, ...args: any[]) {
//                 return predicates[key].apply(this, args);
//               },
//             }[key];
//           }

//           return Reflect.get(target, key);
//         }

//         return Reflect.get(target, key, receiver);
//       },
//       getOwnPropertyDescriptor(target, key) {
//         const descriptor = Object.getOwnPropertyDescriptor(target, key);
//         if (!descriptor) return undefined;

//         if (
//           target.hasOwnProperty(key) &&
//           typeof key === "string" &&
//           typeof target[key] === "function"
//         ) descriptor.enumerable = true;

//         return descriptor as any;
//       },
//     },
//   );
//   export const assert: Assertions = new Proxy(
//     Object.assign(
//       function assert(it: unknown, message?: string) {
//         if (!it) {
//           throw new TypeError(message || "Assertion failed.");
//         }
//       },
//       assertions,
//     ),
//     {
//       get(target, key, receiver) {
//         if (target.hasOwnProperty(key)) {
//           if (typeof key === "string" && typeof target[key] === "function") {
//             return {
//               [key](this: any, ...args: any[]) {
//                 return predicates[key].apply(this, args);
//               },
//             }[key];
//           }

//           return Reflect.get(target, key);
//         }

//         return Reflect.get(target, key, receiver);
//       },
//       getOwnPropertyDescriptor(target, key) {
//         const descriptor = Object.getOwnPropertyDescriptor(target, key);
//         if (!descriptor) return undefined;

//         if (
//           target.hasOwnProperty(key) &&
//           typeof key === "string" &&
//           typeof target[key] === "function"
//         ) descriptor.enumerable = true;

//         return descriptor;
//       },
//     },
//   );

//   export type Map<T extends HTMLElement = Terminal> = {
//     adopted: Adopted<T>;
//     connected: Connected<T>;
//     disconnected: Disconnected<T>;
//     attributeChanged: AttributeChanged<T>;
//   };
//   export type Callback<T extends HTMLElement = Terminal> = Map<T>[keyof Map<T>];
//   export type Object<T extends HTMLElement = Terminal> = {
//     [K in keyof Map<T>]: Set<Map<T>[K]>;
//   };
//   export type Type = typeof types[number];
//   export type Adopted<T extends HTMLElement = Terminal> = (
//     this: T,
//     oldDocument: Document,
//     newDocument: Document,
//   ) => void | Promise<void>;
//   export type Connected<T extends HTMLElement = Terminal> = (
//     this: T,
//   ) => void | Promise<void>;
//   export type Disconnected<T extends HTMLElement = Terminal> = (
//     this: T,
//   ) => void | Promise<void>;
//   export type AttributeChanged<T extends HTMLElement = Terminal> = (
//     this: T,
//     name: string,
//     oldValue: string,
//     newValue: string,
//   ) => void | Promise<void>;
// }