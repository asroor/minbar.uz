(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  (function () {
    const select = HTMLSelectElement.prototype;
    if (select.hasOwnProperty("selectedOptions")) return;

    Object.defineProperty(select, "selectedOptions", {
      get() {
        return this.querySelectorAll(":checked");
      },
      enumerable: true,
      configurable: true,
    });
  })();

  const commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  (function () {
    function n() {
      function v() {
        return null;
      }
      function l(a) {
        return a ? typeof a === "object" || typeof a === "function" : !1;
      }
      function p(a) {
        if (a !== null && !l(a))
          throw new TypeError(
            "Object prototype may only be an Object or null: " + a
          );
      }
      let q = null;
      const e = Object;
      const w = !!e.create || !({ __proto__: null } instanceof e);
      const A =
        e.create ||
        (w
          ? function (a) {
              p(a);
              return { __proto__: a };
            }
          : function (a) {
              function c() {}
              p(a);
              if (a === null)
                throw new SyntaxError(
                  "Native Object.create is required to create objects with null prototype"
                );
              c.prototype = a;
              return new c();
            });
      const B =
        e.getPrototypeOf ||
        ([].__proto__ === Array.prototype
          ? function (a) {
              a = a.__proto__;
              return l(a) ? a : null;
            }
          : v);
      var m = function (a, c) {
        function k() {}
        if (void 0 === (this && this instanceof m ? this.constructor : void 0))
          throw new TypeError("Constructor Proxy requires 'new'");
        if (!l(a) || !l(c))
          throw new TypeError(
            "Cannot create proxy with a non-object as target or handler"
          );
        q = function () {
          a = null;
          k = function (b) {
            throw new TypeError(
              "Cannot perform '" + b + "' on a proxy that has been revoked"
            );
          };
        };
        setTimeout(function () {
          q = null;
        }, 0);
        let g = c;
        c = { get: null, set: null, apply: null, construct: null };
        for (var h in g) {
          if (!(h in c))
            throw new TypeError(
              "Proxy polyfill does not support trap '" + h + "'"
            );
          c[h] = g[h];
        }
        typeof g === "function" && (c.apply = g.apply.bind(g));
        g = B(a);
        let r = !1;
        let t = !1;
        if (typeof a === "function") {
          var f = function () {
            const b = this && this.constructor === f;
            const d = Array.prototype.slice.call(arguments);
            k(b ? "construct" : "apply");
            return b && c.construct
              ? c.construct.call(this, a, d)
              : !b && c.apply
              ? c.apply(a, this, d)
              : b
              ? (d.unshift(a), new (a.bind.apply(a, d))())
              : a.apply(this, d);
          };
          r = !0;
        } else
          Array.isArray(a)
            ? ((f = []), (t = !0))
            : (f = w || g !== null ? A(g) : {});
        const x = c.get
          ? function (b) {
              k("get");
              return c.get(this, b, f);
            }
          : function (b) {
              k("get");
              return this[b];
            };
        const C = c.set
          ? function (b, d) {
              k("set");
              c.set(this, b, d, f);
            }
          : function (b, d) {
              k("set");
              this[b] = d;
            };
        const y = {};
        e.getOwnPropertyNames(a).forEach(function (b) {
          if (!((r || t) && b in f)) {
            const d = e.getOwnPropertyDescriptor(a, b);
            e.defineProperty(f, b, {
              enumerable: !!d.enumerable,
              get: x.bind(a, b),
              set: C.bind(a, b),
            });
            y[b] = !0;
          }
        });
        h = !0;
        if (r || t) {
          const D =
            e.setPrototypeOf ||
            ([].__proto__ === Array.prototype
              ? function (b, d) {
                  p(d);
                  b.__proto__ = d;
                  return b;
                }
              : v);
          (g && D(f, g)) || (h = !1);
        }
        if (c.get || !h)
          for (const u in a)
            y[u] || e.defineProperty(f, u, { get: x.bind(a, u) });
        e.seal(a);
        e.seal(f);
        return f;
      };
      m.revocable = function (a, c) {
        return { proxy: new m(a, c), revoke: q };
      };
      return m;
    }
    const z =
      (typeof process !== "undefined" &&
        {}.toString.call(process) === "[object process]") ||
      (typeof navigator !== "undefined" && navigator.product === "ReactNative")
        ? commonjsGlobal
        : self;
    z.Proxy || ((z.Proxy = n()), (z.Proxy.revocable = z.Proxy.revocable));
  })();

  !(function (e) {
    const t = e.Element.prototype;
    typeof t.matches !== "function" &&
      (t.matches =
        t.msMatchesSelector ||
        t.mozMatchesSelector ||
        t.webkitMatchesSelector ||
        function (e) {
          for (
            var t = (this.document || this.ownerDocument).querySelectorAll(e),
              o = 0;
            t[o] && t[o] !== this;

          )
            ++o;
          return Boolean(t[o]);
        }),
      typeof t.closest !== "function" &&
        (t.closest = function (e) {
          for (let t = this; t && t.nodeType === 1; ) {
            if (t.matches(e)) return t;
            t = t.parentNode;
          }
          return null;
        });
  })(window);

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty("remove")) {
        return;
      }
      Object.defineProperty(item, "remove", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode && this.parentNode.removeChild(this);
        },
      });
    });
  })(
    [Element.prototype, CharacterData.prototype, DocumentType.prototype].filter(
      Boolean
    )
  );

  /*
   * classList.js: Cross-browser full element.classList implementation.
   * 1.1.20170427
   *
   * By Eli Grey, http://eligrey.com
   * License: Dedicated to the public domain.
   *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
   */

  /* global self, document, DOMException */

  /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

  if ("document" in window.self) {
    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (
      !("classList" in document.createElement("_")) ||
      (document.createElementNS &&
        !(
          "classList" in
          document.createElementNS("http://www.w3.org/2000/svg", "g")
        ))
    ) {
      (function (view) {
        if (!("Element" in view)) return;

        const classListProp = "classList";
        const protoProp = "prototype";
        const elemCtrProto = view.Element[protoProp];
        const objCtr = Object;
        const strTrim =
          String[protoProp].trim ||
          function () {
            return this.replace(/^\s+|\s+$/g, "");
          };
        const arrIndexOf =
          Array[protoProp].indexOf ||
          function (item) {
            let i = 0;
            const len = this.length;
            for (; i < len; i++) {
              if (i in this && this[i] === item) {
                return i;
              }
            }
            return -1;
          };
        // Vendors: please allow content code to instantiate DOMExceptions
        const DOMEx = function (type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        };
        const checkTokenAndGetIndex = function (classList, token) {
          if (token === "") {
            throw new DOMEx(
              "SYNTAX_ERR",
              "An invalid or illegal string was specified"
            );
          }
          if (/\s/.test(token)) {
            throw new DOMEx(
              "INVALID_CHARACTER_ERR",
              "String contains an invalid character"
            );
          }
          return arrIndexOf.call(classList, token);
        };
        const ClassList = function (elem) {
          const trimmedClasses = strTrim.call(elem.getAttribute("class") || "");
          const classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
          let i = 0;
          const len = classes.length;
          for (; i < len; i++) {
            this.push(classes[i]);
          }
          this._updateClassName = function () {
            elem.setAttribute("class", this.toString());
          };
        };
        const classListProto = (ClassList[protoProp] = []);
        const classListGetter = function () {
          return new ClassList(this);
        };
        // Most DOMException implementations don't allow calling DOMException's toString()
        // on non-DOMExceptions. Error's toString() is sufficient here.
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function (i) {
          return this[i] || null;
        };
        classListProto.contains = function (token) {
          token += "";
          return checkTokenAndGetIndex(this, token) !== -1;
        };
        classListProto.add = function () {
          const tokens = arguments;
          let i = 0;
          const l = tokens.length;
          let token;
          let updated = false;
          do {
            token = tokens[i] + "";
            if (checkTokenAndGetIndex(this, token) === -1) {
              this.push(token);
              updated = true;
            }
          } while (++i < l);

          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.remove = function () {
          const tokens = arguments;
          let i = 0;
          const l = tokens.length;
          let token;
          let updated = false;
          let index;
          do {
            token = tokens[i] + "";
            index = checkTokenAndGetIndex(this, token);
            while (index !== -1) {
              this.splice(index, 1);
              updated = true;
              index = checkTokenAndGetIndex(this, token);
            }
          } while (++i < l);

          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.toggle = function (token, force) {
          token += "";

          const result = this.contains(token);
          const method = result
            ? force !== true && "remove"
            : force !== false && "add";
          if (method) {
            this[method](token);
          }

          if (force === true || force === false) {
            return force;
          } else {
            return !result;
          }
        };
        classListProto.toString = function () {
          return this.join(" ");
        };

        if (objCtr.defineProperty) {
          const classListPropDesc = {
            get: classListGetter,
            enumerable: true,
            configurable: true,
          };
          try {
            objCtr.defineProperty(
              elemCtrProto,
              classListProp,
              classListPropDesc
            );
          } catch (ex) {
            // IE 8 doesn't support enumerable:true
            // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
            // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
            if (ex.number === undefined || ex.number === -0x7ff5ec54) {
              classListPropDesc.enumerable = false;
              objCtr.defineProperty(
                elemCtrProto,
                classListProp,
                classListPropDesc
              );
            }
          }
        } else if (objCtr[protoProp].__defineGetter__) {
          elemCtrProto.__defineGetter__(classListProp, classListGetter);
        }
      })(window.self);
    }

    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
      let testElement = document.createElement("_");

      testElement.classList.add("c1", "c2");

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.
      if (!testElement.classList.contains("c2")) {
        const createMethod = function (method) {
          const original = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function (token) {
            let i;
            const len = arguments.length;

            for (i = 0; i < len; i++) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod("add");
        createMethod("remove");
      }

      testElement.classList.toggle("c3", false);

      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
      // support the second argument.
      if (testElement.classList.contains("c3")) {
        const _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function (token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };
      }

      testElement = null;
    })();
  }

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */

  // minimal template polyfill
  (function () {
    const needsTemplate = typeof HTMLTemplateElement === "undefined";
    const brokenDocFragment = !(
      document.createDocumentFragment().cloneNode() instanceof DocumentFragment
    );
    let needsDocFrag = false;

    // NOTE: Replace DocumentFragment to work around IE11 bug that
    // causes children of a document fragment modified while
    // there is a mutation observer to not have a parentNode, or
    // have a broken parentNode (!?!)
    if (/Trident/.test(navigator.userAgent)) {
      (function () {
        needsDocFrag = true;

        const origCloneNode = Node.prototype.cloneNode;
        Node.prototype.cloneNode = function cloneNode(deep) {
          const newDom = origCloneNode.call(this, deep);
          if (this instanceof DocumentFragment) {
            newDom.__proto__ = DocumentFragment.prototype;
          }
          return newDom;
        };

        // IE's DocumentFragment querySelector code doesn't work when
        // called on an element instance
        DocumentFragment.prototype.querySelectorAll =
          HTMLElement.prototype.querySelectorAll;
        DocumentFragment.prototype.querySelector =
          HTMLElement.prototype.querySelector;

        Object.defineProperties(DocumentFragment.prototype, {
          nodeType: {
            get() {
              return Node.DOCUMENT_FRAGMENT_NODE;
            },
            configurable: true,
          },

          localName: {
            get() {
              return undefined;
            },
            configurable: true,
          },

          nodeName: {
            get() {
              return "#document-fragment";
            },
            configurable: true,
          },
        });

        const origInsertBefore = Node.prototype.insertBefore;
        function insertBefore(newNode, refNode) {
          if (newNode instanceof DocumentFragment) {
            let child;
            while ((child = newNode.firstChild)) {
              origInsertBefore.call(this, child, refNode);
            }
          } else {
            origInsertBefore.call(this, newNode, refNode);
          }
          return newNode;
        }
        Node.prototype.insertBefore = insertBefore;

        const origAppendChild = Node.prototype.appendChild;
        Node.prototype.appendChild = function appendChild(child) {
          if (child instanceof DocumentFragment) {
            insertBefore.call(this, child, null);
          } else {
            origAppendChild.call(this, child);
          }
          return child;
        };

        const origRemoveChild = Node.prototype.removeChild;
        const origReplaceChild = Node.prototype.replaceChild;
        Node.prototype.replaceChild = function replaceChild(
          newChild,
          oldChild
        ) {
          if (newChild instanceof DocumentFragment) {
            insertBefore.call(this, newChild, oldChild);
            origRemoveChild.call(this, oldChild);
          } else {
            origReplaceChild.call(this, newChild, oldChild);
          }
          return oldChild;
        };

        Document.prototype.createDocumentFragment =
          function createDocumentFragment() {
            const frag = this.createElement("df");
            frag.__proto__ = DocumentFragment.prototype;
            return frag;
          };

        const origImportNode = Document.prototype.importNode;
        Document.prototype.importNode = function importNode(impNode, deep) {
          deep = deep || false;
          const newNode = origImportNode.call(this, impNode, deep);
          if (impNode instanceof DocumentFragment) {
            newNode.__proto__ = DocumentFragment.prototype;
          }
          return newNode;
        };
      })();
    }

    // NOTE: we rely on this cloneNode not causing element upgrade.
    // This means this polyfill must load before the CE polyfill and
    // this would need to be re-worked if a browser supports native CE
    // but not <template>.
    const capturedCloneNode = Node.prototype.cloneNode;
    const capturedCreateElement = Document.prototype.createElement;
    const capturedImportNode = Document.prototype.importNode;
    const capturedRemoveChild = Node.prototype.removeChild;
    const capturedAppendChild = Node.prototype.appendChild;
    const capturedReplaceChild = Node.prototype.replaceChild;
    const capturedParseFromString = DOMParser.prototype.parseFromString;
    const capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML"
    ) || {
      /**
       * @this {!HTMLElement}
       * @return {string}
       */
      get() {
        return this.innerHTML;
      },
      /**
       * @this {!HTMLElement}
       * @param {string}
       */
      set(text) {
        this.innerHTML = text;
      },
    };
    const capturedChildNodes = Object.getOwnPropertyDescriptor(
      window.Node.prototype,
      "childNodes"
    ) || {
      /**
       * @this {!Node}
       * @return {!NodeList}
       */
      get() {
        return this.childNodes;
      },
    };

    const elementQuerySelectorAll = Element.prototype.querySelectorAll;
    const docQuerySelectorAll = Document.prototype.querySelectorAll;
    const fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;

    const scriptSelector =
      'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

    function QSA(node, selector) {
      // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
      if (!node.childNodes.length) {
        return [];
      }
      switch (node.nodeType) {
        case Node.DOCUMENT_NODE:
          return docQuerySelectorAll.call(node, selector);
        case Node.DOCUMENT_FRAGMENT_NODE:
          return fragQuerySelectorAll.call(node, selector);
        default:
          return elementQuerySelectorAll.call(node, selector);
      }
    }

    // returns true if nested templates cannot be cloned (they cannot be on
    // some impl's like Safari 8 and Edge)
    // OR if cloning a document fragment does not result in a document fragment
    const needsCloning = (function () {
      if (!needsTemplate) {
        const t = document.createElement("template");
        const t2 = document.createElement("template");
        t2.content.appendChild(document.createElement("div"));
        t.content.appendChild(t2);
        const clone = t.cloneNode(true);
        return (
          clone.content.childNodes.length === 0 ||
          clone.content.firstChild.content.childNodes.length === 0 ||
          brokenDocFragment
        );
      }
    })();

    const TEMPLATE_TAG = "template";
    const PolyfilledHTMLTemplateElement = function () {};

    if (needsTemplate) {
      const contentDoc = document.implementation.createHTMLDocument("template");
      let canDecorate = true;

      const templateStyle = document.createElement("style");
      templateStyle.textContent = TEMPLATE_TAG + "{display:none;}";

      const head = document.head;
      head.insertBefore(templateStyle, head.firstElementChild);

      /**
        Provides a minimal shim for the <template> element.
      */
      PolyfilledHTMLTemplateElement.prototype = Object.create(
        HTMLElement.prototype
      );

      // if elements do not have `innerHTML` on instances, then
      // templates can be patched by swizzling their prototypes.
      const canProtoPatch = !document
        .createElement("div")
        .hasOwnProperty("innerHTML");

      /**
        The `decorate` method moves element children to the template's `content`.
        NOTE: there is no support for dynamically adding elements to templates.
      */
      PolyfilledHTMLTemplateElement.decorate = function (template) {
        // if the template is decorated or not in HTML namespace, return fast
        if (
          template.content ||
          template.namespaceURI !== document.documentElement.namespaceURI
        ) {
          return;
        }
        template.content = contentDoc.createDocumentFragment();
        let child;
        while ((child = template.firstChild)) {
          capturedAppendChild.call(template.content, child);
        }
        // NOTE: prefer prototype patching for performance and
        // because on some browsers (IE11), re-defining `innerHTML`
        // can result in intermittent errors.
        if (canProtoPatch) {
          template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
        } else {
          template.cloneNode = function (deep) {
            return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
          };
          // add innerHTML to template, if possible
          // Note: this throws on Safari 7
          if (canDecorate) {
            try {
              defineInnerHTML(template);
              defineOuterHTML(template);
            } catch (err) {
              canDecorate = false;
            }
          }
        }
        // bootstrap recursively
        PolyfilledHTMLTemplateElement.bootstrap(template.content);
      };

      // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js
      const topLevelWrappingMap = {
        option: ["select"],
        thead: ["table"],
        col: ["colgroup", "table"],
        tr: ["tbody", "table"],
        th: ["tr", "tbody", "table"],
        td: ["tr", "tbody", "table"],
      };

      const getTagName = function (text) {
        // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
        return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || [
          "",
          "",
        ])[1].toLowerCase();
      };

      var defineInnerHTML = function defineInnerHTML(obj) {
        Object.defineProperty(obj, "innerHTML", {
          get() {
            return getInnerHTML(this);
          },
          set(text) {
            // For IE11, wrap the text in the correct (table) context
            const wrap = topLevelWrappingMap[getTagName(text)];
            if (wrap) {
              for (let i = 0; i < wrap.length; i++) {
                text = "<" + wrap[i] + ">" + text + "</" + wrap[i] + ">";
              }
            }
            contentDoc.body.innerHTML = text;
            PolyfilledHTMLTemplateElement.bootstrap(contentDoc);
            while (this.content.firstChild) {
              capturedRemoveChild.call(this.content, this.content.firstChild);
            }
            let body = contentDoc.body;
            // If we had wrapped, get back to the original node
            if (wrap) {
              for (let j = 0; j < wrap.length; j++) {
                body = body.lastChild;
              }
            }
            while (body.firstChild) {
              capturedAppendChild.call(this.content, body.firstChild);
            }
          },
          configurable: true,
        });
      };

      var defineOuterHTML = function defineOuterHTML(obj) {
        Object.defineProperty(obj, "outerHTML", {
          get() {
            return (
              "<" +
              TEMPLATE_TAG +
              ">" +
              this.innerHTML +
              "</" +
              TEMPLATE_TAG +
              ">"
            );
          },
          set(innerHTML) {
            if (this.parentNode) {
              contentDoc.body.innerHTML = innerHTML;
              const docFrag = this.ownerDocument.createDocumentFragment();
              while (contentDoc.body.firstChild) {
                capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
              }
              capturedReplaceChild.call(this.parentNode, docFrag, this);
            } else {
              throw new Error(
                "Failed to set the 'outerHTML' property on 'Element': This element has no parent node."
              );
            }
          },
          configurable: true,
        });
      };

      defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
      defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);

      /**
        The `bootstrap` method is called automatically and "fixes" all
        <template> elements in the document referenced by the `doc` argument.
      */
      PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
        const templates = QSA(doc, TEMPLATE_TAG);
        for (
          var i = 0, l = templates.length, t;
          i < l && (t = templates[i]);
          i++
        ) {
          PolyfilledHTMLTemplateElement.decorate(t);
        }
      };

      // auto-bootstrapping for main document
      document.addEventListener("DOMContentLoaded", function () {
        PolyfilledHTMLTemplateElement.bootstrap(document);
      });

      // Patch document.createElement to ensure newly created templates have content
      Document.prototype.createElement = function createElement() {
        const el = capturedCreateElement.apply(this, arguments);
        if (el.localName === "template") {
          PolyfilledHTMLTemplateElement.decorate(el);
        }
        return el;
      };

      DOMParser.prototype.parseFromString = function () {
        const el = capturedParseFromString.apply(this, arguments);
        PolyfilledHTMLTemplateElement.bootstrap(el);
        return el;
      };

      Object.defineProperty(HTMLElement.prototype, "innerHTML", {
        get() {
          return getInnerHTML(this);
        },
        set(text) {
          capturedHTMLElementInnerHTML.set.call(this, text);
          PolyfilledHTMLTemplateElement.bootstrap(this);
        },
        configurable: true,
        enumerable: true,
      });

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
      const escapeAttrRegExp = /[&\u00A0"]/g;
      const escapeDataRegExp = /[&\u00A0<>]/g;

      const escapeReplace = function (c) {
        switch (c) {
          case "&":
            return "&amp;";
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case '"':
            return "&quot;";
          case "\u00A0":
            return "&nbsp;";
        }
      };

      const escapeAttr = function (s) {
        return s.replace(escapeAttrRegExp, escapeReplace);
      };

      const escapeData = function (s) {
        return s.replace(escapeDataRegExp, escapeReplace);
      };

      const makeSet = function (arr) {
        const set = {};
        for (let i = 0; i < arr.length; i++) {
          set[arr[i]] = true;
        }
        return set;
      };

      // http://www.whatwg.org/specs/web-apps/current-work/#void-elements
      const voidElements = makeSet([
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ]);

      const plaintextParents = makeSet([
        "style",
        "script",
        "xmp",
        "iframe",
        "noembed",
        "noframes",
        "plaintext",
        "noscript",
      ]);

      /**
       * @param {Node} node
       * @param {Node} parentNode
       * @param {Function=} callback
       */
      const getOuterHTML = function (node, parentNode, callback) {
        switch (node.nodeType) {
          case Node.ELEMENT_NODE: {
            const tagName = node.localName;
            let s = "<" + tagName;
            const attrs = node.attributes;
            for (var i = 0, attr; (attr = attrs[i]); i++) {
              s += " " + attr.name + '="' + escapeAttr(attr.value) + '"';
            }
            s += ">";
            if (voidElements[tagName]) {
              return s;
            }
            return s + getInnerHTML(node, callback) + "</" + tagName + ">";
          }
          case Node.TEXT_NODE: {
            const data = /** @type {Text} */ (node).data;
            if (parentNode && plaintextParents[parentNode.localName]) {
              return data;
            }
            return escapeData(data);
          }
          case Node.COMMENT_NODE: {
            return "<!--" + /** @type {Comment} */ (node).data + "-->";
          }
          default: {
            window.console.error(node);
            throw new Error("not implemented");
          }
        }
      };

      /**
       * @param {Node} node
       * @param {Function=} callback
       */
      var getInnerHTML = function (node, callback) {
        if (node.localName === "template") {
          node = /** @type {HTMLTemplateElement} */ (node).content;
        }
        let s = "";
        const c$ = callback
          ? callback(node)
          : capturedChildNodes.get.call(node);
        for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
          s += getOuterHTML(child, node, callback);
        }
        return s;
      };
    }

    // make cloning/importing work!
    if (needsTemplate || needsCloning) {
      PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(
        template,
        deep
      ) {
        const clone = capturedCloneNode.call(template, false);
        // NOTE: decorate doesn't auto-fix children because they are already
        // decorated so they need special clone fixup.
        if (this.decorate) {
          this.decorate(clone);
        }
        if (deep) {
          // NOTE: use native clone node to make sure CE's wrapped
          // cloneNode does not cause elements to upgrade.
          capturedAppendChild.call(
            clone.content,
            capturedCloneNode.call(template.content, true)
          );
          // now ensure nested templates are cloned correctly.
          fixClonedDom(clone.content, template.content);
        }
        return clone;
      };

      // Given a source and cloned subtree, find <template>'s in the cloned
      // subtree and replace them with cloned <template>'s from source.
      // We must do this because only the source templates have proper .content.
      var fixClonedDom = function fixClonedDom(clone, source) {
        // do nothing if cloned node is not an element
        if (!source.querySelectorAll) return;
        // these two lists should be coincident
        const s$ = QSA(source, TEMPLATE_TAG);
        if (s$.length === 0) {
          return;
        }
        const t$ = QSA(clone, TEMPLATE_TAG);
        for (var i = 0, l = t$.length, t, s; i < l; i++) {
          s = s$[i];
          t = t$[i];
          if (
            PolyfilledHTMLTemplateElement &&
            PolyfilledHTMLTemplateElement.decorate
          ) {
            PolyfilledHTMLTemplateElement.decorate(s);
          }
          capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
        }
      };

      // make sure scripts inside of a cloned template are executable
      const fixClonedScripts = function fixClonedScripts(fragment) {
        const scripts = QSA(fragment, scriptSelector);
        for (var ns, s, i = 0; i < scripts.length; i++) {
          s = scripts[i];
          ns = capturedCreateElement.call(document, "script");
          ns.textContent = s.textContent;
          const attrs = s.attributes;
          for (var ai = 0, a; ai < attrs.length; ai++) {
            a = attrs[ai];
            ns.setAttribute(a.name, a.value);
          }
          capturedReplaceChild.call(s.parentNode, ns, s);
        }
      };

      // override all cloning to fix the cloned subtree to contain properly
      // cloned templates.
      var cloneNode = (Node.prototype.cloneNode = function cloneNode(deep) {
        let dom;
        // workaround for Edge bug cloning documentFragments
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/
        if (
          !needsDocFrag &&
          brokenDocFragment &&
          this instanceof DocumentFragment
        ) {
          if (!deep) {
            return this.ownerDocument.createDocumentFragment();
          } else {
            dom = importNode.call(this.ownerDocument, this, true);
          }
        } else if (
          this.nodeType === Node.ELEMENT_NODE &&
          this.localName === TEMPLATE_TAG &&
          this.namespaceURI == document.documentElement.namespaceURI
        ) {
          dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        } else {
          dom = capturedCloneNode.call(this, deep);
        }
        // template.content is cloned iff `deep`.
        if (deep) {
          fixClonedDom(dom, this);
        }
        return dom;
      });

      // NOTE: we are cloning instead of importing <template>'s.
      // However, the ownerDocument of the cloned template will be correct!
      // This is because the native import node creates the right document owned
      // subtree and `fixClonedDom` inserts cloned templates into this subtree,
      // thus updating the owner doc.
      var importNode = (Document.prototype.importNode = function importNode(
        element,
        deep
      ) {
        deep = deep || false;
        if (element.localName === TEMPLATE_TAG) {
          return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
        } else {
          const dom = capturedImportNode.call(this, element, deep);
          if (deep) {
            fixClonedDom(dom, element);
            fixClonedScripts(dom);
          }
          return dom;
        }
      });
    }

    if (needsTemplate) {
      window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
    }
  })();

  const ApplyThisPrototype = (function () {
    return function ApplyThisPrototype(event, target) {
      if (typeof target === "object" && target !== null) {
        const proto = Object.getPrototypeOf(target);
        let property;

        for (property in proto) {
          if (!(property in event)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, property);
            if (descriptor) {
              Object.defineProperty(event, property, descriptor);
            }
          }
        }

        for (property in target) {
          if (!(property in event)) {
            event[property] = target[property];
          }
        }
      }
    };
  })();

  (function (ApplyThisPrototype) {
    /**
     * Polyfill CustomEvent
     */
    try {
      const event = new window.CustomEvent("event", {
        bubbles: true,
        cancelable: true,
      });
    } catch (error) {
      const CustomEventOriginal = window.CustomEvent || window.Event;
      const CustomEvent = function (eventName, params) {
        params = params || {};
        const event = document.createEvent("CustomEvent");
        event.initCustomEvent(
          eventName,
          params.bubbles === void 0 ? false : params.bubbles,
          params.cancelable === void 0 ? false : params.cancelable,
          params.detail === void 0 ? {} : params.detail
        );
        ApplyThisPrototype(event, this);
        return event;
      };
      CustomEvent.prototype = CustomEventOriginal.prototype;
      window.CustomEvent = CustomEvent;
    }
  })(ApplyThisPrototype);

  const EventListenerInterceptor = (function () {
    if (typeof EventTarget === "undefined") {
      window.EventTarget = Node;
    }

    /**
     * Event listener interceptor
     */

    const EventListenerInterceptor = {
      interceptors: [], // { target: EventTarget, interceptors: [{ add: Function, remove: Function }, ...] }
    };

    /**
     * Returns if exists a previously registered listener from a target and the normalized arguments
     * @param target
     * @param normalizedArguments
     * @return {*}
     */
    EventListenerInterceptor.getRegisteredEventListener = function (
      target,
      normalizedArguments
    ) {
      const key =
        normalizedArguments.type +
        "-" +
        (normalizedArguments.options.capture ? "1" : "0");
      if (
        target.__eventListeners !== void 0 &&
        target.__eventListeners[key] !== void 0
      ) {
        const map = target.__eventListeners[key];
        for (let i = 0; i < map.length; i++) {
          if (map[i].listener === normalizedArguments.listener) {
            return map[i];
          }
        }
      }
      return null;
    };

    /**
     * Registers a listener on a target with some options
     * @param target
     * @param normalizedArguments
     */
    EventListenerInterceptor.registerEventListener = function (
      target,
      normalizedArguments
    ) {
      const key =
        normalizedArguments.type +
        "-" +
        (normalizedArguments.options.capture ? "1" : "0");

      if (target.__eventListeners === void 0) {
        target.__eventListeners = {};
      }

      if (target.__eventListeners[key] === void 0) {
        target.__eventListeners[key] = [];
      }

      target.__eventListeners[key].push(normalizedArguments);
    };

    /**
     * Unregisters a listener on a target with some options
     * @param target
     * @param normalizedArguments
     */
    EventListenerInterceptor.unregisterEventListener = function (
      target,
      normalizedArguments
    ) {
      const key =
        normalizedArguments.type +
        "-" +
        (normalizedArguments.options.capture ? "1" : "0");
      if (
        target.__eventListeners !== void 0 &&
        target.__eventListeners[key] !== void 0
      ) {
        const map = target.__eventListeners[key];
        for (let i = 0; i < map.length; i++) {
          if (map[i].listener === normalizedArguments.listener) {
            map.splice(i, 1);
          }
        }

        if (map.length === 0) {
          delete target.__eventListeners[key];
        }
      }
    };

    EventListenerInterceptor.normalizeListenerCallback = function (listener) {
      if (
        typeof listener === "function" ||
        listener === null ||
        listener === void 0
      ) {
        return listener;
      } else if (
        typeof listener === "object" &&
        typeof listener.handleEvent === "function"
      ) {
        return listener.handleEvent;
      } else {
        // to support Symbol
        return function (event) {
          listener(event);
        };
      }
    };

    EventListenerInterceptor.normalizeListenerOptions = function (options) {
      switch (typeof options) {
        case "boolean":
          options = { capture: options };
          break;
        case "undefined":
          options = { capture: false };
          break;
        case "object":
          if (options === null) {
            options = { capture: false };
          }
          break;
        default:
          throw new Error("Unsupported options type for addEventListener");
      }

      options.once = Boolean(options.once);
      options.passive = Boolean(options.passive);
      options.capture = Boolean(options.capture);

      return options;
    };

    EventListenerInterceptor.normalizeListenerArguments = function (
      type,
      listener,
      options
    ) {
      return {
        type,
        listener: this.normalizeListenerCallback(listener),
        options: this.normalizeListenerOptions(options),
      };
    };

    EventListenerInterceptor.intercept = function (target, interceptors) {
      // get an interceptor with this target or null
      let interceptor = null;
      for (let i = 0; i < this.interceptors.length; i++) {
        if (this.interceptors[i].target === target) {
          interceptor = this.interceptors[i];
        }
      }

      // if no interceptor already set
      if (interceptor === null) {
        interceptor = { target, interceptors: [interceptors] };
        this.interceptors.push(interceptor);

        this.interceptAddEventListener(target, interceptor);
        this.interceptRemoveEventListener(target, interceptor);
      } else {
        // if an interceptor already set, simply add interceptors to the list
        interceptor.interceptors.push(interceptors);
      }

      // var release = function() {
      //   target.prototype.addEventListener = addEventListener;
      //   target.prototype.removeEventListener = removeEventListener;
      // };
      // this.interceptors.push(release);
      // return release;
    };

    EventListenerInterceptor.interceptAddEventListener = function (
      target,
      interceptor
    ) {
      const _this = this;

      const addEventListener = target.prototype.addEventListener;
      target.prototype.addEventListener = function (type, listener, options) {
        const normalizedArguments = _this.normalizeListenerArguments(
          type,
          listener,
          options
        );
        const registeredEventListener = _this.getRegisteredEventListener(
          this,
          normalizedArguments
        );

        if (!registeredEventListener) {
          normalizedArguments.polyfilled = {
            type: normalizedArguments.type,
            listener: normalizedArguments.listener,
            options: {
              capture: normalizedArguments.options.capture,
              once: normalizedArguments.options.once,
              passive: normalizedArguments.options.passive,
            },
          };

          for (let i = 0; i < interceptor.interceptors.length; i++) {
            const interceptors = interceptor.interceptors[i];
            if (typeof interceptors.add === "function") {
              interceptors.add(normalizedArguments);
            }
          }

          // console.log('normalizedArguments', normalizedArguments.polyfilled);

          _this.registerEventListener(this, normalizedArguments);

          addEventListener.call(
            this,
            normalizedArguments.polyfilled.type,
            normalizedArguments.polyfilled.listener,
            normalizedArguments.polyfilled.options
          );
        }
      };

      return function () {
        target.prototype.addEventListener = addEventListener;
      };
    };

    EventListenerInterceptor.interceptRemoveEventListener = function (
      target,
      interceptor
    ) {
      const _this = this;

      const removeEventListener = target.prototype.removeEventListener;
      target.prototype.removeEventListener = function (
        type,
        listener,
        options
      ) {
        const normalizedArguments = _this.normalizeListenerArguments(
          type,
          listener,
          options
        );
        const registeredEventListener = _this.getRegisteredEventListener(
          this,
          normalizedArguments
        );

        if (registeredEventListener) {
          _this.unregisterEventListener(this, normalizedArguments);
          removeEventListener.call(
            this,
            registeredEventListener.polyfilled.type,
            registeredEventListener.polyfilled.listener,
            registeredEventListener.polyfilled.options
          );
        } else {
          removeEventListener.call(this, type, listener, options);
        }
      };

      return function () {
        target.prototype.removeEventListener = removeEventListener;
      };
    };

    EventListenerInterceptor.interceptAll = function (interceptors) {
      this.intercept(EventTarget, interceptors);
      if (!(window instanceof EventTarget)) {
        this.intercept(Window, interceptors);
      }
    };

    EventListenerInterceptor.releaseAll = function () {
      for (let i = 0, l = this.interceptors.length; i < l; i++) {
        this.interceptors();
      }
    };

    EventListenerInterceptor.error = function (error) {
      // throw error;
      console.error(error);
    };

    return EventListenerInterceptor;
  })();

  (function (EventListenerInterceptor) {
    /**
     * Event listener options support
     */

    EventListenerInterceptor.detectSupportedOptions = function () {
      const _this = this;

      this.supportedOptions = {
        once: false,
        passive: false,
        capture: false,

        all: false,
        some: false,
      };

      document
        .createDocumentFragment()
        .addEventListener("test", function () {}, {
          get once() {
            _this.supportedOptions.once = true;
            return false;
          },
          get passive() {
            _this.supportedOptions.passive = true;
            return false;
          },
          get capture() {
            _this.supportedOptions.capture = true;
            return false;
          },
        });

      // useful shortcuts to detect if options are all/some supported
      this.supportedOptions.all =
        this.supportedOptions.once &&
        this.supportedOptions.passive &&
        this.supportedOptions.capture;
      this.supportedOptions.some =
        this.supportedOptions.once ||
        this.supportedOptions.passive ||
        this.supportedOptions.capture;
    };

    EventListenerInterceptor.polyfillListenerOptions = function () {
      this.detectSupportedOptions();
      if (!this.supportedOptions.all) {
        const _this = this;

        this.interceptAll({
          add(normalizedArguments) {
            // console.log('intercepted', normalizedArguments);

            const once =
              normalizedArguments.options.once && !_this.supportedOptions.once;
            const passive =
              normalizedArguments.options.passive &&
              !_this.supportedOptions.passive;

            if (once || passive) {
              const listener = normalizedArguments.polyfilled.listener;

              normalizedArguments.polyfilled.listener = function (event) {
                if (once) {
                  this.removeEventListener(
                    normalizedArguments.type,
                    normalizedArguments.listener,
                    normalizedArguments.options
                  );
                }

                if (passive) {
                  event.preventDefault = function () {
                    throw new Error(
                      "Unable to preventDefault inside passive event listener invocation."
                    );
                  };
                }

                return listener.call(this, event);
              };
            }

            if (!_this.supportedOptions.some) {
              normalizedArguments.polyfilled.options =
                normalizedArguments.options.capture;
            }
          },
        });
      }
    };

    EventListenerInterceptor.polyfillListenerOptions();

    // var onclick = function() {
    //   console.log('click');
    // };

    // document.body.addEventListener('click', onclick, false);
    // document.body.addEventListener('click', onclick, { once: true });
    // document.body.addEventListener('click', onclick, { once: true });
    // document.body.addEventListener('click', onclick, false);
    // document.body.addEventListener('click', onclick, false);
  })(EventListenerInterceptor);

  // For the IE11 build.
  SVGElement.prototype.contains =
    SVGElement.prototype.contains || HTMLElement.prototype.contains; // .childElementCount polyfill
  // from https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/childElementCount#Polyfill_for_IE8_IE9_Safari

  (function (constructor) {
    if (
      constructor &&
      constructor.prototype &&
      constructor.prototype.childElementCount == null
    ) {
      Object.defineProperty(constructor.prototype, "childElementCount", {
        get: function get() {
          let i = 0;
          let count = 0;
          let node;
          const nodes = this.childNodes;

          while ((node = nodes[i++])) {
            if (node.nodeType === 1) count++;
          }

          return count;
        },
      });
    }
  })(window.Node || window.Element);

  const check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  const global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis === "object" && globalThis) ||
    check(typeof window === "object" && window) ||
    check(typeof self === "object" && self) ||
    check(typeof commonjsGlobal === "object" && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    (function () {
      return this;
    })() ||
    Function("return this")();

  const fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  const descriptors = !fails(function () {
    return (
      Object.defineProperty({}, 1, {
        get() {
          return 7;
        },
      })[1] != 7
    );
  });

  const nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  const NASHORN_BUG =
    getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  const f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        const descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : nativePropertyIsEnumerable;

  const objectPropertyIsEnumerable = {
    f,
  };

  const createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value,
    };
  };

  const toString = {}.toString;

  const classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  const split = "".split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  const indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object("z").propertyIsEnumerable(0);
  })
    ? function (it) {
        return classofRaw(it) == "String" ? split.call(it, "") : Object(it);
      }
    : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  const requireObjectCoercible = function (it) {
    if (it == undefined) throw new TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings

  const toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  const isObject = function (it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  const toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    let fn, val;
    if (
      PREFERRED_STRING &&
      typeof (fn = input.toString) === "function" &&
      !isObject((val = fn.call(input)))
    )
      return val;
    if (
      typeof (fn = input.valueOf) === "function" &&
      !isObject((val = fn.call(input)))
    )
      return val;
    if (
      !PREFERRED_STRING &&
      typeof (fn = input.toString) === "function" &&
      !isObject((val = fn.call(input)))
    )
      return val;
    throw new TypeError("Can't convert object to primitive value");
  };

  const hasOwnProperty = {}.hasOwnProperty;

  const has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  const document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  const EXISTS = isObject(document$1) && isObject(document$1.createElement);

  const documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  const ie8DomDefine =
    !descriptors &&
    !fails(function () {
      return (
        Object.defineProperty(documentCreateElement("div"), "a", {
          get() {
            return 7;
          },
        }).a != 7
      );
    });

  const nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  const f$1 = descriptors
    ? nativeGetOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPrimitive(P, true);
        if (ie8DomDefine)
          try {
            return nativeGetOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (has(O, P))
          return createPropertyDescriptor(
            !objectPropertyIsEnumerable.f.call(O, P),
            O[P]
          );
      };

  const objectGetOwnPropertyDescriptor = {
    f: f$1,
  };

  const anObject = function (it) {
    if (!isObject(it)) {
      throw new TypeError(String(it) + " is not an object");
    }
    return it;
  };

  const nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  const f$2 = descriptors
    ? nativeDefineProperty
    : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (ie8DomDefine)
          try {
            return nativeDefineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw new TypeError("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  const objectDefineProperty = {
    f: f$2,
  };

  const createNonEnumerableProperty = descriptors
    ? function (object, key, value) {
        return objectDefineProperty.f(
          object,
          key,
          createPropertyDescriptor(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };

  const setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }
    return value;
  };

  const SHARED = "__core-js_shared__";
  const store = global_1[SHARED] || setGlobal(SHARED, {});

  const sharedStore = store;

  const functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource !== "function") {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  const inspectSource = sharedStore.inspectSource;

  const WeakMap = global_1.WeakMap;

  const nativeWeakMap =
    typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));

  const shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return (
        sharedStore[key] ||
        (sharedStore[key] = value !== undefined ? value : {})
      );
    })("versions", []).push({
      version: "3.8.3",
      mode: "global",
      copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
    });
  });

  let id = 0;
  const postfix = Math.random();

  const uid = function (key) {
    return (
      "Symbol(" +
      String(key === undefined ? "" : key) +
      ")_" +
      (++id + postfix).toString(36)
    );
  };

  const keys = shared("keys");

  const sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  const hiddenKeys = {};

  const WeakMap$1 = global_1.WeakMap;
  let set, get, has$1;

  const enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  const getterFor = function (TYPE) {
    return function (it) {
      let state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError("Incompatible receiver, " + TYPE + " required");
      }
      return state;
    };
  };

  if (nativeWeakMap) {
    const store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
    const wmget = store$1.get;
    const wmhas = store$1.has;
    const wmset = store$1.set;
    set = function (it, metadata) {
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    const STATE = sharedKey("state");
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  const internalState = {
    set,
    get,
    has: has$1,
    enforce,
    getterFor,
  };

  const redefine = createCommonjsModule(function (module) {
    const getInternalState = internalState.get;
    const enforceInternalState = internalState.enforce;
    const TEMPLATE = String(String).split("String");

    (module.exports = function (O, key, value, options) {
      const unsafe = options ? !!options.unsafe : false;
      let simple = options ? !!options.enumerable : false;
      const noTargetGet = options ? !!options.noTargetGet : false;
      let state;
      if (typeof value === "function") {
        if (typeof key === "string" && !has(value, "name")) {
          createNonEnumerableProperty(value, "name", key);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof key === "string" ? key : "");
        }
      }
      if (O === global_1) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty(O, key, value);
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, "toString", function toString() {
      return (
        (typeof this === "function" && getInternalState(this).source) ||
        inspectSource(this)
      );
    });
  });

  const path = global_1;

  const aFunction = function (variable) {
    return typeof variable === "function" ? variable : undefined;
  };

  const getBuiltIn = function (namespace, method) {
    return arguments.length < 2
      ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : (path[namespace] && path[namespace][method]) ||
          (global_1[namespace] && global_1[namespace][method]);
  };

  const ceil = Math.ceil;
  const floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  const toInteger = function (argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor : ceil)(argument);
  };

  const min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  const toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  const max = Math.max;
  const min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  const toAbsoluteIndex = function (index, length) {
    const integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  const createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      const O = toIndexedObject($this);
      const length = toLength(O.length);
      let index = toAbsoluteIndex(fromIndex, length);
      let value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  const arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false),
  };

  const indexOf = arrayIncludes.indexOf;

  const objectKeysInternal = function (object, names) {
    const O = toIndexedObject(object);
    let i = 0;
    const result = [];
    let key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (has(O, (key = names[i++]))) {
        ~indexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE8- don't enum bug keys
  const enumBugKeys = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ];

  const hiddenKeys$1 = enumBugKeys.concat("length", "prototype");

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  const f$3 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

  const objectGetOwnPropertyNames = {
    f: f$3,
  };

  const f$4 = Object.getOwnPropertySymbols;

  const objectGetOwnPropertySymbols = {
    f: f$4,
  };

  // all object keys, includes non-enumerable and symbols
  const ownKeys =
    getBuiltIn("Reflect", "ownKeys") ||
    function ownKeys(it) {
      const keys = objectGetOwnPropertyNames.f(anObject(it));
      const getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols
        ? keys.concat(getOwnPropertySymbols(it))
        : keys;
    };

  const copyConstructorProperties = function (target, source) {
    const keys = ownKeys(source);
    const defineProperty = objectDefineProperty.f;
    const getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!has(target, key))
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  const replacement = /#|\.prototype\./;

  const isForced = function (feature, detection) {
    const value = data[normalize(feature)];
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : typeof detection === "function"
      ? fails(detection)
      : !!detection;
  };

  var normalize = (isForced.normalize = function (string) {
    return String(string).replace(replacement, ".").toLowerCase();
  });

  var data = (isForced.data = {});
  var NATIVE = (isForced.NATIVE = "N");
  var POLYFILL = (isForced.POLYFILL = "P");

  const isForced_1 = isForced;

  const getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  const _export = function (options, source) {
    const TARGET = options.target;
    const GLOBAL = options.global;
    const STATIC = options.stat;
    let FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced_1(
          GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
          options.forced
        );
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, "sham", true);
        }
        // extend global
        redefine(target, key, sourceProperty, options);
      }
  };

  const aFunction$1 = function (it) {
    if (typeof it !== "function") {
      throw new TypeError(String(it) + " is not a function");
    }
    return it;
  };

  // optional / simple context binding
  const functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  const toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  const isArray =
    Array.isArray ||
    function isArray(arg) {
      return classofRaw(arg) == "Array";
    };

  const nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol());
    });

  const useSymbolAsUid =
    nativeSymbol &&
    // eslint-disable-next-line no-undef
    !Symbol.sham &&
    // eslint-disable-next-line no-undef
    typeof Symbol.iterator === "symbol";

  const WellKnownSymbolsStore = shared("wks");
  const Symbol$1 = global_1.Symbol;
  const createWellKnownSymbol = useSymbolAsUid
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid;

  const wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name))
        WellKnownSymbolsStore[name] = Symbol$1[name];
      else
        WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
    }
    return WellKnownSymbolsStore[name];
  };

  const SPECIES = wellKnownSymbol("species");

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  const arraySpeciesCreate = function (originalArray, length) {
    let C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C === "function" && (C === Array || isArray(C.prototype)))
        C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  const push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  const createMethod$1 = function (TYPE) {
    const IS_MAP = TYPE == 1;
    const IS_FILTER = TYPE == 2;
    const IS_SOME = TYPE == 3;
    const IS_EVERY = TYPE == 4;
    const IS_FIND_INDEX = TYPE == 6;
    const IS_FILTER_OUT = TYPE == 7;
    const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      const O = toObject($this);
      const self = indexedObject(O);
      const boundFunction = functionBindContext(callbackfn, that, 3);
      const length = toLength(self.length);
      let index = 0;
      const create = specificCreate || arraySpeciesCreate;
      const target = IS_MAP
        ? create($this, length)
        : IS_FILTER || IS_FILTER_OUT
        ? create($this, 0)
        : undefined;
      let value, result;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return value; // find
                case 6:
                  return index; // findIndex
                case 2:
                  push.call(target, value); // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false; // every
                case 7:
                  push.call(target, value); // filterOut
              }
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  const arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$1(7),
  };

  const engineUserAgent = getBuiltIn("navigator", "userAgent") || "";

  const process$1 = global_1.process;
  const versions = process$1 && process$1.versions;
  const v8 = versions && versions.v8;
  let match, version;

  if (v8) {
    match = v8.split(".");
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  const engineV8Version = version && +version;

  const SPECIES$1 = wellKnownSymbol("species");

  const arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      engineV8Version >= 51 ||
      !fails(function () {
        const array = [];
        const constructor = (array.constructor = {});
        constructor[SPECIES$1] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      })
    );
  };

  const defineProperty = Object.defineProperty;
  const cache = {};

  const thrower = function (it) {
    throw it;
  };

  const arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    const method = [][METHOD_NAME];
    const ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
    const argument0 = has(options, 0) ? options[0] : thrower;
    const argument1 = has(options, 1) ? options[1] : undefined;

    return (cache[METHOD_NAME] =
      !!method &&
      !fails(function () {
        if (ACCESSORS && !descriptors) return true;
        const O = { length: -1 };

        if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
        else O[1] = 1;

        method.call(O, argument0, argument1);
      }));
  };

  const $filter = arrayIteration.filter;

  const HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
  // Edge 14- issue
  const USES_TO_LENGTH = arrayMethodUsesToLength("filter");

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export(
    {
      target: "Array",
      proto: true,
      forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH,
    },
    {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  const arrayMethodIsStrict = function (METHOD_NAME, argument) {
    const method = [][METHOD_NAME];
    return (
      !!method &&
      fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal
        method.call(
          null,
          argument ||
            function () {
              throw 1;
            },
          1
        );
      })
    );
  };

  const $forEach = arrayIteration.forEach;

  const STRICT_METHOD = arrayMethodIsStrict("forEach");
  const USES_TO_LENGTH$1 = arrayMethodUsesToLength("forEach");

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  const arrayForEach =
    !STRICT_METHOD || !USES_TO_LENGTH$1
      ? function forEach(callbackfn /* , thisArg */) {
          return $forEach(
            this,
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined
          );
        }
      : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  _export(
    { target: "Array", proto: true, forced: [].forEach != arrayForEach },
    {
      forEach: arrayForEach,
    }
  );

  const iteratorClose = function (iterator) {
    const returnMethod = iterator.return;
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  // call something on iterator step with safe closing on error
  const callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };

  const iterators = {};

  const ITERATOR = wellKnownSymbol("iterator");
  const ArrayPrototype = Array.prototype;

  // check on default Array iterator
  const isArrayIteratorMethod = function (it) {
    return (
      it !== undefined &&
      (iterators.Array === it || ArrayPrototype[ITERATOR] === it)
    );
  };

  const createProperty = function (object, key, value) {
    const propertyKey = toPrimitive(key);
    if (propertyKey in object)
      objectDefineProperty.f(
        object,
        propertyKey,
        createPropertyDescriptor(0, value)
      );
    else object[propertyKey] = value;
  };

  const TO_STRING_TAG = wellKnownSymbol("toStringTag");
  const test = {};

  test[TO_STRING_TAG] = "z";

  const toStringTagSupport = String(test) === "[object z]";

  const TO_STRING_TAG$1 = wellKnownSymbol("toStringTag");
  // ES3 wrong here
  const CORRECT_ARGUMENTS =
    classofRaw(
      (function () {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  const tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  const classof = toStringTagSupport
    ? classofRaw
    : function (it) {
        let O, tag, result;
        return it === undefined
          ? "Undefined"
          : it === null
          ? "Null"
          : // @@toStringTag case
          typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$1)) === "string"
          ? tag
          : // builtinTag case
          CORRECT_ARGUMENTS
          ? classofRaw(O)
          : // ES3 arguments fallback
          (result = classofRaw(O)) == "Object" && typeof O.callee === "function"
          ? "Arguments"
          : result;
      };

  const ITERATOR$1 = wellKnownSymbol("iterator");

  const getIteratorMethod = function (it) {
    if (it != undefined)
      return it[ITERATOR$1] || it["@@iterator"] || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  const arrayFrom = function from(
    arrayLike /* , mapfn = undefined, thisArg = undefined */
  ) {
    const O = toObject(arrayLike);
    const C = typeof this === "function" ? this : Array;
    const argumentsLength = arguments.length;
    let mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    const mapping = mapfn !== undefined;
    const iteratorMethod = getIteratorMethod(O);
    let index = 0;
    let length, result, step, iterator, next, value;
    if (mapping)
      mapfn = functionBindContext(
        mapfn,
        argumentsLength > 2 ? arguments[2] : undefined,
        2
      );
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (
      iteratorMethod != undefined &&
      !(C == Array && isArrayIteratorMethod(iteratorMethod))
    ) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping
          ? callWithSafeIterationClosing(
              iterator,
              mapfn,
              [step.value, index],
              true
            )
          : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  const ITERATOR$2 = wellKnownSymbol("iterator");
  let SAFE_CLOSING = false;

  try {
    let called = 0;
    const iteratorWithReturn = {
      next() {
        return { done: !!called++ };
      },
      return() {
        SAFE_CLOSING = true;
      },
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  const checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    let ITERATION_SUPPORT = false;
    try {
      const object = {};
      object[ITERATOR$2] = function () {
        return {
          next() {
            return { done: (ITERATION_SUPPORT = true) };
          },
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };

  const INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export(
    { target: "Array", stat: true, forced: INCORRECT_ITERATION },
    {
      from: arrayFrom,
    }
  );

  // `String.prototype.{ codePointAt, at }` methods implementation
  const createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      const S = String(requireObjectCoercible($this));
      const position = toInteger(pos);
      const size = S.length;
      let first, second;
      if (position < 0 || position >= size)
        return CONVERT_TO_STRING ? "" : undefined;
      first = S.charCodeAt(position);
      return first < 0xd800 ||
        first > 0xdbff ||
        position + 1 === size ||
        (second = S.charCodeAt(position + 1)) < 0xdc00 ||
        second > 0xdfff
        ? CONVERT_TO_STRING
          ? S.charAt(position)
          : first
        : CONVERT_TO_STRING
        ? S.slice(position, position + 2)
        : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  const stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true),
  };

  const correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  const IE_PROTO = sharedKey("IE_PROTO");
  const ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  const objectGetPrototypeOf = correctPrototypeGetter
    ? Object.getPrototypeOf
    : function (O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor === "function" && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype : null;
      };

  const ITERATOR$3 = wellKnownSymbol("iterator");
  let BUGGY_SAFARI_ITERATORS = false;

  const returnThis = function () {
    return this;
  };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  let IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(
        objectGetPrototypeOf(arrayIterator)
      );
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  const NEW_ITERATOR_PROTOTYPE =
    IteratorPrototype == undefined ||
    fails(function () {
      const test = {};
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR$3].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if (!has(IteratorPrototype, ITERATOR$3)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
  }

  const iteratorsCore = {
    IteratorPrototype,
    BUGGY_SAFARI_ITERATORS,
  };

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  const objectKeys =
    Object.keys ||
    function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  const objectDefineProperties = descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject(O);
        const keys = objectKeys(Properties);
        const length = keys.length;
        let index = 0;
        let key;
        while (length > index)
          objectDefineProperty.f(O, (key = keys[index++]), Properties[key]);
        return O;
      };

  const html = getBuiltIn("document", "documentElement");

  const GT = ">";
  const LT = "<";
  const PROTOTYPE = "prototype";
  const SCRIPT = "script";
  const IE_PROTO$1 = sharedKey("IE_PROTO");

  const EmptyConstructor = function () {
    /* empty */
  };

  const scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  const NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(""));
    activeXDocument.close();
    const temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  const NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    const iframe = documentCreateElement("iframe");
    const JS = "java" + SCRIPT + ":";
    let iframeDocument;
    iframe.style.display = "none";
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag("document.F=Object"));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  let activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject("htmlfile");
    } catch (error) {
      /* ignore */
    }
    NullProtoObject = activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument)
      : NullProtoObjectViaIFrame();
    let length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  const objectCreate =
    Object.create ||
    function create(O, Properties) {
      let result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined
        ? result
        : objectDefineProperties(result, Properties);
    };

  const defineProperty$1 = objectDefineProperty.f;

  const TO_STRING_TAG$2 = wellKnownSymbol("toStringTag");

  const setToStringTag = function (it, TAG, STATIC) {
    if (it && !has((it = STATIC ? it : it.prototype), TO_STRING_TAG$2)) {
      defineProperty$1(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  const IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  const returnThis$1 = function () {
    return this;
  };

  const createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    const TO_STRING_TAG = NAME + " Iterator";
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next),
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  const aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw new TypeError("Can't set " + String(it) + " as a prototype");
    }
    return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  const objectSetPrototypeOf =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          let CORRECT_SETTER = false;
          const test = {};
          let setter;
          try {
            setter = Object.getOwnPropertyDescriptor(
              Object.prototype,
              "__proto__"
            ).set;
            setter.call(test, []);
            CORRECT_SETTER = Array.isArray(test);
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);

  const IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  const BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  const ITERATOR$4 = wellKnownSymbol("iterator");
  const KEYS = "keys";
  const VALUES = "values";
  const ENTRIES = "entries";

  const returnThis$2 = function () {
    return this;
  };

  const defineIterator = function (
    Iterable,
    NAME,
    IteratorConstructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    const getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype)
        return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };

    const TO_STRING_TAG = NAME + " Iterator";
    let INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    const nativeIterator =
      IterablePrototype[ITERATOR$4] ||
      IterablePrototype["@@iterator"] ||
      (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator =
      (!BUGGY_SAFARI_ITERATORS$1 && nativeIterator) ||
      getIterationMethod(DEFAULT);
    const anyNativeIterator =
      NAME == "Array"
        ? IterablePrototype.entries || nativeIterator
        : nativeIterator;
    let CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(
        anyNativeIterator.call(new Iterable())
      );
      if (
        IteratorPrototype$2 !== Object.prototype &&
        CurrentIteratorPrototype.next
      ) {
        if (
          objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2
        ) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (
            typeof CurrentIteratorPrototype[ITERATOR$4] !== "function"
          ) {
            createNonEnumerableProperty(
              CurrentIteratorPrototype,
              ITERATOR$4,
              returnThis$2
            );
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty(
        IterablePrototype,
        ITERATOR$4,
        defaultIterator
      );
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES),
      };
      if (FORCED)
        for (KEY in methods) {
          if (
            BUGGY_SAFARI_ITERATORS$1 ||
            INCORRECT_VALUES_NAME ||
            !(KEY in IterablePrototype)
          ) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        _export(
          {
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME,
          },
          methods
        );
    }

    return methods;
  };

  const charAt = stringMultibyte.charAt;

  const STRING_ITERATOR = "String Iterator";
  const setInternalState = internalState.set;
  const getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(
    String,
    "String",
    function (iterated) {
      setInternalState(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0,
      });
      // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    },
    function next() {
      const state = getInternalState(this);
      const string = state.string;
      const index = state.index;
      let point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    }
  );

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  const domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };

  for (const COLLECTION_NAME in domIterables) {
    const Collection = global_1[COLLECTION_NAME];
    const CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach)
      try {
        createNonEnumerableProperty(
          CollectionPrototype,
          "forEach",
          arrayForEach
        );
      } catch (error) {
        CollectionPrototype.forEach = arrayForEach;
      }
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      const self = this;
      const args = arguments;
      return new Promise(function (resolve, reject) {
        const gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            "next",
            value
          );
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys$1(object, enumerableOnly) {
    const keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (let i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        );
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }

    return target;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) ||
      _iterableToArrayLimit(arr, i) ||
      _unsupportedIterableToArray(arr, i) ||
      _nonIterableRest()
    );
  }

  function _toConsumableArray(arr) {
    return (
      _arrayWithoutHoles(arr) ||
      _iterableToArray(arr) ||
      _unsupportedIterableToArray(arr) ||
      _nonIterableSpread()
    );
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    const _arr = [];
    let _n = true;
    let _d = false;
    let _e;

    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i.return != null) _i.return();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }

  function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }

  const runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    const runtime = (function (exports) {
      const Op = Object.prototype;
      const hasOwn = Op.hasOwnProperty;
      let undefined$1; // More compressible than void 0.
      const $Symbol = typeof Symbol === "function" ? Symbol : {};
      const iteratorSymbol = $Symbol.iterator || "@@iterator";
      const asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      const toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        const protoGenerator =
          outerFn && outerFn.prototype instanceof Generator
            ? outerFn
            : Generator;
        const generator = Object.create(protoGenerator.prototype);
        const context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }

      const GenStateSuspendedStart = "suspendedStart";
      const GenStateSuspendedYield = "suspendedYield";
      const GenStateExecuting = "executing";
      const GenStateCompleted = "completed";

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      const ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      let IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      const getProto = Object.getPrototypeOf;
      const NativeIteratorPrototype =
        getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      const Gp =
        (GeneratorFunctionPrototype.prototype =
        Generator.prototype =
          Object.create(IteratorPrototype));
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] =
        GeneratorFunction.displayName = "GeneratorFunction";

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        const ctor = typeof genFun === "function" && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function (arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          const record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            const result = record.arg;
            const value = result.value;
            if (
              value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")
            ) {
              return PromiseImpl.resolve(value.__await).then(
                function (value) {
                  invoke("next", value, resolve, reject);
                },
                function (err) {
                  invoke("throw", err, resolve, reject);
                }
              );
            }

            return PromiseImpl.resolve(value).then(
              function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              },
              function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke("throw", error, resolve, reject);
              }
            );
          }
        }

        let previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return (previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise
              ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                )
              : callInvokeWithMethodAndArg());
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function (
        innerFn,
        outerFn,
        self,
        tryLocsList,
        PromiseImpl
      ) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        const iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        let state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            const delegate = context.delegate;
            if (delegate) {
              const delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;

            const record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done,
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        const method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator.return) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method"
            );
          }

          return ContinueSentinel;
        }

        const record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        const info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      Gp[toStringTagSymbol] = "Generator";

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        const entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        const record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        const keys = [];
        for (const key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            const key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          const iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            let i = -1;
            const next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;

              return next;
            };

            return (next.next = next);
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      exports.values = values;

      function doneResult() {
        return { value: undefined$1, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = "next";
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (const name in this) {
              // Not sure about the optimal order of these conditions:
              if (
                name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))
              ) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop() {
          this.done = true;

          const rootEntry = this.tryEntries[0];
          const rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          const context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              const hasCatch = hasOwn.call(entry, "catchLoc");
              const hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },

        abrupt(type, arg) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === "break" || type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          const record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish(finallyLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch(tryLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              const record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error("illegal catch attempt");
        },

        delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc,
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        },
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  const UNSCOPABLES = wellKnownSymbol("unscopables");
  const ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null),
    });
  }

  // add a key to Array.prototype[@@unscopables]
  const addToUnscopables = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  const $includes = arrayIncludes.includes;

  const USES_TO_LENGTH$2 = arrayMethodUsesToLength("indexOf", {
    ACCESSORS: true,
    1: 0,
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  _export(
    { target: "Array", proto: true, forced: !USES_TO_LENGTH$2 },
    {
      includes: function includes(el /* , fromIndex = 0 */) {
        return $includes(
          this,
          el,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables("includes");

  const $map = arrayIteration.map;

  const HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport("map");
  // FF49- issue
  const USES_TO_LENGTH$3 = arrayMethodUsesToLength("map");

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export(
    {
      target: "Array",
      proto: true,
      forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3,
    },
    {
      map: function map(callbackfn /* , thisArg */) {
        return $map(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  const createMethod$3 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      const O = toObject(that);
      const self = indexedObject(O);
      const length = toLength(O.length);
      let index = IS_RIGHT ? length - 1 : 0;
      const i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2)
        while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw new TypeError("Reduce of empty array with no initial value");
          }
        }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i)
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      return memo;
    };
  };

  const arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$3(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$3(true),
  };

  const engineIsNode = classofRaw(global_1.process) == "process";

  const $reduce = arrayReduce.left;

  const STRICT_METHOD$1 = arrayMethodIsStrict("reduce");
  const USES_TO_LENGTH$4 = arrayMethodUsesToLength("reduce", { 1: 0 });
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  const CHROME_BUG =
    !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  _export(
    {
      target: "Array",
      proto: true,
      forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$4 || CHROME_BUG,
    },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(
          this,
          callbackfn,
          arguments.length,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  const $some = arrayIteration.some;

  const STRICT_METHOD$2 = arrayMethodIsStrict("some");
  const USES_TO_LENGTH$5 = arrayMethodUsesToLength("some");

  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  _export(
    {
      target: "Array",
      proto: true,
      forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$5,
    },
    {
      some: function some(callbackfn /* , thisArg */) {
        return $some(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  const propertyIsEnumerable = objectPropertyIsEnumerable.f;

  // `Object.{ entries, values }` methods implementation
  const createMethod$4 = function (TO_ENTRIES) {
    return function (it) {
      const O = toIndexedObject(it);
      const keys = objectKeys(O);
      const length = keys.length;
      let i = 0;
      const result = [];
      let key;
      while (length > i) {
        key = keys[i++];
        if (!descriptors || propertyIsEnumerable.call(O, key)) {
          result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  const objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod$4(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod$4(false),
  };

  const $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  _export(
    { target: "Object", stat: true },
    {
      entries: function entries(O) {
        return $entries(O);
      },
    }
  );

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  const sameValue =
    Object.is ||
    function is(x, y) {
      // eslint-disable-next-line no-self-compare
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };

  // `Object.is` method
  // https://tc39.es/ecma262/#sec-object.is
  _export(
    { target: "Object", stat: true },
    {
      is: sameValue,
    }
  );

  const FAILS_ON_PRIMITIVES = fails(function () {
    objectKeys(1);
  });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export(
    { target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES },
    {
      keys: function keys(it) {
        return objectKeys(toObject(it));
      },
    }
  );

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  const objectToString = toStringTagSupport
    ? {}.toString
    : function toString() {
        return "[object " + classof(this) + "]";
      };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, "toString", objectToString, { unsafe: true });
  }

  const nativePromiseConstructor = global_1.Promise;

  const redefineAll = function (target, src, options) {
    for (const key in src) redefine(target, key, src[key], options);
    return target;
  };

  const SPECIES$2 = wellKnownSymbol("species");

  const setSpecies = function (CONSTRUCTOR_NAME) {
    const Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    const defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get() {
          return this;
        },
      });
    }
  };

  const anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw new TypeError(
        "Incorrect " + (name ? name + " " : "") + "invocation"
      );
    }
    return it;
  };

  const Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  const iterate = function (iterable, unboundFunction, options) {
    const that = options && options.that;
    const AS_ENTRIES = !!(options && options.AS_ENTRIES);
    const IS_ITERATOR = !!(options && options.IS_ITERATOR);
    const INTERRUPTED = !!(options && options.INTERRUPTED);
    const fn = functionBindContext(
      unboundFunction,
      that,
      1 + AS_ENTRIES + INTERRUPTED
    );
    let iterator, iterFn, index, length, result, next, step;

    const stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    const callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED
          ? fn(value[0], value[1], stop)
          : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn !== "function")
        throw new TypeError("Target is not iterable");
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (
          index = 0, length = toLength(iterable.length);
          length > index;
          index++
        ) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }
        return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result === "object" && result && result instanceof Result)
        return result;
    }
    return new Result(false);
  };

  const SPECIES$3 = wellKnownSymbol("species");

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  const speciesConstructor = function (O, defaultConstructor) {
    const C = anObject(O).constructor;
    let S;
    return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined
      ? defaultConstructor
      : aFunction$1(S);
  };

  const engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

  const location = global_1.location;
  let set$1 = global_1.setImmediate;
  let clear = global_1.clearImmediate;
  const process$2 = global_1.process;
  const MessageChannel = global_1.MessageChannel;
  const Dispatch = global_1.Dispatch;
  let counter = 0;
  const queue = {};
  const ONREADYSTATECHANGE = "onreadystatechange";
  let defer, channel, port;

  const run = function (id) {
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      const fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  const runner = function (id) {
    return function () {
      run(id);
    };
  };

  const listener = function (event) {
    run(event.data);
  };

  const post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(id + "", location.protocol + "//" + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      const args = [];
      let i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        (typeof fn === "function" ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (engineIsNode) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global_1.addEventListener &&
      typeof postMessage === "function" &&
      !global_1.importScripts &&
      location &&
      location.protocol !== "file:" &&
      !fails(post)
    ) {
      defer = post;
      global_1.addEventListener("message", listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement("script")) {
      defer = function (id) {
        html.appendChild(documentCreateElement("script"))[ONREADYSTATECHANGE] =
          function () {
            html.removeChild(this);
            run(id);
          };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  const task = {
    set: set$1,
    clear,
  };

  const engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

  const getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  const macrotask = task.set;

  const MutationObserver$1 =
    global_1.MutationObserver || global_1.WebKitMutationObserver;
  const document$2 = global_1.document;
  const process$3 = global_1.process;
  const Promise$1 = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  const queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(
    global_1,
    "queueMicrotask"
  );
  const queueMicrotask =
    queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  let flush, head, last, notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      let parent, fn;
      if (engineIsNode && (parent = process$3.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify();
          else last = undefined;
          throw error;
        }
      }
      last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (
      !engineIsIos &&
      !engineIsNode &&
      !engineIsWebosWebkit &&
      MutationObserver$1 &&
      document$2
    ) {
      toggle = true;
      node = document$2.createTextNode("");
      new MutationObserver$1(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      then = promise.then;
      notify = function () {
        then.call(promise, flush);
      };
      // Node.js without promises
    } else if (engineIsNode) {
      notify = function () {
        process$3.nextTick(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global_1, flush);
      };
    }
  }

  const microtask =
    queueMicrotask ||
    function (fn) {
      const task = { fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };

  const PromiseCapability = function (C) {
    let resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined)
        throw new TypeError("Bad Promise constructor");
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // 25.4.1.5 NewPromiseCapability(C)
  const f$5 = function (C) {
    return new PromiseCapability(C);
  };

  const newPromiseCapability = {
    f: f$5,
  };

  const promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    const promiseCapability = newPromiseCapability.f(C);
    const resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  const hostReportErrors = function (a, b) {
    const console = global_1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  const perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  const task$1 = task.set;

  const SPECIES$4 = wellKnownSymbol("species");
  const PROMISE = "Promise";
  const getInternalState$1 = internalState.get;
  const setInternalState$1 = internalState.set;
  const getInternalPromiseState = internalState.getterFor(PROMISE);
  let PromiseConstructor = nativePromiseConstructor;
  const TypeError$1 = global_1.TypeError;
  const document$3 = global_1.document;
  const process$4 = global_1.process;
  const $fetch = getBuiltIn("fetch");
  let newPromiseCapability$1 = newPromiseCapability.f;
  const newGenericPromiseCapability = newPromiseCapability$1;
  const DISPATCH_EVENT = !!(
    document$3 &&
    document$3.createEvent &&
    global_1.dispatchEvent
  );
  const NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent === "function";
  const UNHANDLED_REJECTION = "unhandledrejection";
  const REJECTION_HANDLED = "rejectionhandled";
  const PENDING = 0;
  const FULFILLED = 1;
  const REJECTED = 2;
  const HANDLED = 1;
  const UNHANDLED = 2;
  let Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  const FORCED = isForced_1(PROMISE, function () {
    const GLOBAL_CORE_JS_PROMISE =
      inspectSource(PromiseConstructor) !== String(PromiseConstructor);
    if (!GLOBAL_CORE_JS_PROMISE) {
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (engineV8Version === 66) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
    }
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (engineV8Version >= 51 && /native code/.test(PromiseConstructor))
      return false;
    // Detect correctness of subclassing with @@species support
    const promise = PromiseConstructor.resolve(1);
    const FakePromise = function (exec) {
      exec(
        function () {
          /* empty */
        },
        function () {
          /* empty */
        }
      );
    };
    const constructor = (promise.constructor = {});
    constructor[SPECIES$4] = FakePromise;
    return !(
      promise.then(function () {
        /* empty */
      }) instanceof FakePromise
    );
  });

  const INCORRECT_ITERATION$1 =
    FORCED ||
    !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable).catch(function () {
        /* empty */
      });
    });

  // helpers
  const isThenable = function (it) {
    let then;
    return isObject(it) && typeof (then = it.then) === "function"
      ? then
      : false;
  };

  const notify$1 = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    const chain = state.reactions;
    microtask(function () {
      const value = state.value;
      const ok = state.state == FULFILLED;
      let index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        const reaction = chain[index++];
        const handler = ok ? reaction.ok : reaction.fail;
        const resolve = reaction.resolve;
        const reject = reaction.reject;
        const domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1("Promise-chain cycle"));
            } else if ((then = isThenable(result))) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  const dispatchEvent = function (name, promise, reason) {
    let event, handler;
    if (DISPATCH_EVENT) {
      event = document$3.createEvent("Event");
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise, reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global_1["on" + name]))
      handler(event);
    else if (name === UNHANDLED_REJECTION)
      hostReportErrors("Unhandled promise rejection", reason);
  };

  var onUnhandled = function (state) {
    task$1.call(global_1, function () {
      const promise = state.facade;
      const value = state.value;
      const IS_UNHANDLED = isUnhandled(state);
      let result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (engineIsNode) {
            process$4.emit("unhandledRejection", value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection =
          engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task$1.call(global_1, function () {
      const promise = state.facade;
      if (engineIsNode) {
        process$4.emit("rejectionHandled", promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  const bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  const internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value)
        throw TypeError$1("Promise can't be resolved itself");
      const then = isThenable(value);
      if (then) {
        microtask(function () {
          const wrapper = { done: false };
          try {
            then.call(
              value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      const state = getInternalState$1(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      setInternalState$1(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined,
      });
    };
    Internal.prototype = redefineAll(PromiseConstructor.prototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        const state = getInternalPromiseState(this);
        const reaction = newPromiseCapability$1(
          speciesConstructor(this, PromiseConstructor)
        );
        reaction.ok = typeof onFulfilled === "function" ? onFulfilled : true;
        reaction.fail = typeof onRejected === "function" && onRejected;
        reaction.domain = engineIsNode ? process$4.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify$1(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      catch(onRejected) {
        return this.then(undefined, onRejected);
      },
    });
    OwnPromiseCapability = function () {
      const promise = new Internal();
      const state = getInternalState$1(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (typeof nativePromiseConstructor === "function") {
      nativeThen = nativePromiseConstructor.prototype.then;

      // wrap native Promise#then for native async functions
      redefine(
        nativePromiseConstructor.prototype,
        "then",
        function then(onFulfilled, onRejected) {
          const that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
        },
        { unsafe: true }
      );

      // wrap fetch result
      if (typeof $fetch === "function")
        _export(
          { global: true, enumerable: true, forced: true },
          {
            // eslint-disable-next-line no-unused-vars
            fetch: function fetch(input /* , init */) {
              return promiseResolve(
                PromiseConstructor,
                $fetch.apply(global_1, arguments)
              );
            },
          }
        );
    }
  }

  _export(
    { global: true, wrap: true, forced: FORCED },
    {
      Promise: PromiseConstructor,
    }
  );

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  _export(
    { target: PROMISE, stat: true, forced: FORCED },
    {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        const capability = newPromiseCapability$1(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      },
    }
  );

  _export(
    { target: PROMISE, stat: true, forced: FORCED },
    {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve(this, x);
      },
    }
  );

  _export(
    { target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 },
    {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        const C = this;
        const capability = newPromiseCapability$1(C);
        const resolve = capability.resolve;
        const reject = capability.reject;
        const result = perform(function () {
          const $promiseResolve = aFunction$1(C.resolve);
          const values = [];
          let counter = 0;
          let remaining = 1;
          iterate(iterable, function (promise) {
            const index = counter++;
            let alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        const C = this;
        const capability = newPromiseCapability$1(C);
        const reject = capability.reject;
        const result = perform(function () {
          const $promiseResolve = aFunction$1(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
    }
  );

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  const regexpFlags = function () {
    const that = anObject(this);
    let result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.dotAll) result += "s";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  const UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    const re = RE("a", "y");
    re.lastIndex = 2;
    return re.exec("abcd") != null;
  });

  const BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    const re = RE("^r", "gy");
    re.lastIndex = 2;
    return re.exec("str") != null;
  });

  const regexpStickyHelpers = {
    UNSUPPORTED_Y,
    BROKEN_CARET,
  };

  const nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  const nativeReplace = String.prototype.replace;

  let patchedExec = nativeExec;

  const UPDATES_LAST_INDEX_WRONG = (function () {
    const re1 = /a/;
    const re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  const UNSUPPORTED_Y$1 =
    regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  const NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

  const PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

  if (PATCH) {
    patchedExec = function exec(str) {
      const re = this;
      let lastIndex, reCopy, match, i;
      const sticky = UNSUPPORTED_Y$1 && re.sticky;
      let flags = regexpFlags.call(re);
      let source = re.source;
      let charsAdded = 0;
      let strCopy = str;

      if (sticky) {
        flags = flags.replace("y", "");
        if (!flags.includes("g")) {
          flags += "g";
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (
          re.lastIndex > 0 &&
          (!re.multiline || (re.multiline && str[re.lastIndex - 1] !== "\n"))
        ) {
          source = "(?: " + source + ")";
          strCopy = " " + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp("^(?:" + source + ")", flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  const regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export(
    { target: "RegExp", proto: true, forced: /./.exec !== regexpExec },
    {
      exec: regexpExec,
    }
  );

  const MATCH = wellKnownSymbol("match");

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  const isRegexp = function (it) {
    let isRegExp;
    return (
      isObject(it) &&
      ((isRegExp = it[MATCH]) !== undefined
        ? !!isRegExp
        : classofRaw(it) == "RegExp")
    );
  };

  const notARegexp = function (it) {
    if (isRegexp(it)) {
      throw new TypeError("The method doesn't accept regular expressions");
    }
    return it;
  };

  const MATCH$1 = wellKnownSymbol("match");

  const correctIsRegexpLogic = function (METHOD_NAME) {
    const regexp = /./;
    try {
      "/./"[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return "/./"[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }
    return false;
  };

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  _export(
    {
      target: "String",
      proto: true,
      forced: !correctIsRegexpLogic("includes"),
    },
    {
      includes: function includes(searchString /* , position = 0 */) {
        return !!~String(requireObjectCoercible(this)).indexOf(
          notARegexp(searchString),
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  // TODO: Remove from `core-js@4` since it's moved to entry points

  const SPECIES$5 = wellKnownSymbol("species");

  const REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    const re = /./;
    re.exec = function () {
      const result = [];
      result.groups = { a: "7" };
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  const REPLACE_KEEPS_$0 = (function () {
    return "a".replace(/./, "$0") === "$0";
  })();

  const REPLACE = wellKnownSymbol("replace");
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  const REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]("a", "$0") === "";
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  const SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    const re = /(?:)/;
    const originalExec = re.exec;
    re.exec = function () {
      return originalExec.apply(this, arguments);
    };
    const result = "ab".split(re);
    return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
  });

  const fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    const SYMBOL = wellKnownSymbol(KEY);

    const DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      const O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ""[KEY](O) != 7;
    });

    const DELEGATES_TO_EXEC =
      DELEGATES_TO_SYMBOL &&
      !fails(function () {
        // Symbol-named RegExp methods call .exec
        let execCalled = false;
        let re = /a/;

        if (KEY === "split") {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES$5] = function () {
            return re;
          };
          re.flags = "";
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () {
          execCalled = true;
          return null;
        };

        re[SYMBOL]("");
        return !execCalled;
      });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" &&
        !(
          REPLACE_SUPPORTS_NAMED_GROUPS &&
          REPLACE_KEEPS_$0 &&
          !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        )) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      const nativeRegExpMethod = /./[SYMBOL];
      const methods = exec(
        SYMBOL,
        ""[KEY],
        function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2),
              };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        },
        {
          REPLACE_KEEPS_$0,
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
        }
      );
      const stringMethod = methods[0];
      const regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function (string, arg) {
              return regexMethod.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function (string) {
              return regexMethod.call(string, this);
            }
      );
    }

    if (sham)
      createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
  };

  const charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  const advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  const regexpExecAbstract = function (R, S) {
    const exec = R.exec;
    if (typeof exec === "function") {
      const result = exec.call(R, S);
      if (typeof result !== "object") {
        throw new TypeError(
          "RegExp exec method returned something other than an Object or null"
        );
      }
      return result;
    }

    if (classofRaw(R) !== "RegExp") {
      throw new TypeError("RegExp#exec called on incompatible receiver");
    }

    return regexpExec.call(R, S);
  };

  const arrayPush = [].push;
  const min$2 = Math.min;
  const MAX_UINT32 = 0xffffffff;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  const SUPPORTS_Y = !fails(function () {
    return !RegExp(MAX_UINT32, "y");
  });

  // @@split logic
  fixRegexpWellKnownSymbolLogic(
    "split",
    2,
    function (SPLIT, nativeSplit, maybeCallNative) {
      let internalSplit;
      if (
        "abbc".split(/(b)*/)[1] == "c" ||
        "test".split(/(?:)/, -1).length != 4 ||
        "ab".split(/(?:ab)*/).length != 2 ||
        ".".split(/(.?)(.?)/).length != 4 ||
        ".".split(/()()/).length > 1 ||
        "".split(/.?/).length
      ) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          const string = String(requireObjectCoercible(this));
          const lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (separator === undefined) return [string];
          // If `separator` is not a regex, use native split
          if (!isRegexp(separator)) {
            return nativeSplit.call(string, separator, lim);
          }
          const output = [];
          const flags =
            (separator.ignoreCase ? "i" : "") +
            (separator.multiline ? "m" : "") +
            (separator.unicode ? "u" : "") +
            (separator.sticky ? "y" : "");
          let lastLastIndex = 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          const separatorCopy = new RegExp(separator.source, flags + "g");
          let match, lastIndex, lastLength;
          while ((match = regexpExec.call(separatorCopy, string))) {
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match.length > 1 && match.index < string.length)
                arrayPush.apply(output, match.slice(1));
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index)
              separatorCopy.lastIndex++; // Avoid an infinite loop
          }
          if (lastLastIndex === string.length) {
            if (lastLength || !separatorCopy.test("")) output.push("");
          } else output.push(string.slice(lastLastIndex));
          return output.length > lim ? output.slice(0, lim) : output;
        };
        // Chakra, V8
      } else if ("0".split(undefined, 0).length) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0
            ? []
            : nativeSplit.call(this, separator, limit);
        };
      } else internalSplit = nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          const O = requireObjectCoercible(this);
          const splitter =
            separator == undefined ? undefined : separator[SPLIT];
          return splitter !== undefined
            ? splitter.call(separator, O, limit)
            : internalSplit.call(String(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (regexp, limit) {
          const res = maybeCallNative(
            internalSplit,
            regexp,
            this,
            limit,
            internalSplit !== nativeSplit
          );
          if (res.done) return res.value;

          const rx = anObject(regexp);
          const S = String(this);
          const C = speciesConstructor(rx, RegExp);

          const unicodeMatching = rx.unicode;
          const flags =
            (rx.ignoreCase ? "i" : "") +
            (rx.multiline ? "m" : "") +
            (rx.unicode ? "u" : "") +
            (SUPPORTS_Y ? "y" : "g");

          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          const splitter = new C(
            SUPPORTS_Y ? rx : "^(?:" + rx.source + ")",
            flags
          );
          const lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0)
            return regexpExecAbstract(splitter, S) === null ? [S] : [];
          let p = 0;
          let q = 0;
          const A = [];
          while (q < S.length) {
            splitter.lastIndex = SUPPORTS_Y ? q : 0;
            const z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
            var e;
            if (
              z === null ||
              (e = min$2(
                toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)),
                S.length
              )) === p
            ) {
              q = advanceStringIndex(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;
              for (let i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          A.push(S.slice(p));
          return A;
        },
      ];
    },
    !SUPPORTS_Y
  );

  const IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
  const MAX_SAFE_INTEGER = 0x1fffffffffffff;
  const MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  const IS_CONCAT_SPREADABLE_SUPPORT =
    engineV8Version >= 51 ||
    !fails(function () {
      const array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

  const SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");

  const isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    const spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  const FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export(
    { target: "Array", proto: true, forced: FORCED$1 },
    {
      concat: function concat(arg) {
        // eslint-disable-line no-unused-vars
        const O = toObject(this);
        const A = arraySpeciesCreate(O, 0);
        let n = 0;
        let i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = toLength(E.length);
            if (n + len > MAX_SAFE_INTEGER)
              throw new TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            for (k = 0; k < len; k++, n++)
              if (k in E) createProperty(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER)
              throw new TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      },
    }
  );

  const $find = arrayIteration.find;

  const FIND = "find";
  let SKIPS_HOLES = true;

  const USES_TO_LENGTH$6 = arrayMethodUsesToLength(FIND);

  // Shouldn't skip holes
  if (FIND in [])
    Array(1)[FIND](function () {
      SKIPS_HOLES = false;
    });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  _export(
    { target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$6 },
    {
      find: function find(callbackfn /* , that = undefined */) {
        return $find(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  const $indexOf = arrayIncludes.indexOf;

  const nativeIndexOf = [].indexOf;

  const NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  const STRICT_METHOD$3 = arrayMethodIsStrict("indexOf");
  const USES_TO_LENGTH$7 = arrayMethodUsesToLength("indexOf", {
    ACCESSORS: true,
    1: 0,
  });

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  _export(
    {
      target: "Array",
      proto: true,
      forced: NEGATIVE_ZERO || !STRICT_METHOD$3 || !USES_TO_LENGTH$7,
    },
    {
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        return NEGATIVE_ZERO
          ? // convert -0 to +0
            nativeIndexOf.apply(this, arguments) || 0
          : $indexOf(
              this,
              searchElement,
              arguments.length > 1 ? arguments[1] : undefined
            );
      },
    }
  );

  const ARRAY_ITERATOR = "Array Iterator";
  const setInternalState$2 = internalState.set;
  const getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  const es_array_iterator = defineIterator(
    Array,
    "Array",
    function (iterated, kind) {
      setInternalState$2(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind, // kind
      });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      const state = getInternalState$2(this);
      const target = state.target;
      const kind = state.kind;
      const index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == "keys") return { value: index, done: false };
      if (kind == "values") return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables("keys");
  addToUnscopables("values");
  addToUnscopables("entries");

  const nativeJoin = [].join;

  const ES3_STRINGS = indexedObject != Object;
  const STRICT_METHOD$4 = arrayMethodIsStrict("join", ",");

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  _export(
    { target: "Array", proto: true, forced: ES3_STRINGS || !STRICT_METHOD$4 },
    {
      join: function join(separator) {
        return nativeJoin.call(
          toIndexedObject(this),
          separator === undefined ? "," : separator
        );
      },
    }
  );

  const defineProperty$2 = objectDefineProperty.f;

  const FunctionPrototype = Function.prototype;
  const FunctionPrototypeToString = FunctionPrototype.toString;
  const nameRE = /^\s*function ([^ (]*)/;
  const NAME = "name";

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty$2(FunctionPrototype, NAME, {
      configurable: true,
      get() {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return "";
        }
      },
    });
  }

  // makes subclassing work correct for wrapped built-ins
  const inheritIfRequired = function ($this, dummy, Wrapper) {
    let NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) === "function" &&
      NewTarget !== Wrapper &&
      isObject((NewTargetPrototype = NewTarget.prototype)) &&
      NewTargetPrototype !== Wrapper.prototype
    )
      objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  const whitespaces =
    "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  const whitespace = "[" + whitespaces + "]";
  const ltrim = RegExp("^" + whitespace + whitespace + "*");
  const rtrim = RegExp(whitespace + whitespace + "*$");

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  const createMethod$5 = function (TYPE) {
    return function ($this) {
      let string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, "");
      if (TYPE & 2) string = string.replace(rtrim, "");
      return string;
    };
  };

  const stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$5(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$5(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$5(3),
  };

  const getOwnPropertyNames = objectGetOwnPropertyNames.f;
  const getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  const defineProperty$3 = objectDefineProperty.f;
  const trim = stringTrim.trim;

  const NUMBER = "Number";
  const NativeNumber = global_1[NUMBER];
  const NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  const BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  const toNumber = function (argument) {
    let it = toPrimitive(argument, false);
    let first, third, radix, maxCode, digits, length, index, code;
    if (typeof it === "string" && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break; // fast equal of /^0b[01]+$/i
          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break; // fast equal of /^0o[0-7]+$/i
          default:
            return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        }
        return parseInt(digits, radix);
      }
    }
    return +it;
  };

  // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  if (
    isForced_1(
      NUMBER,
      !NativeNumber(" 0o1") || !NativeNumber("0b1") || NativeNumber("+0x1")
    )
  ) {
    var NumberWrapper = function Number(value) {
      const it = arguments.length < 1 ? 0 : value;
      const dummy = this;
      return dummy instanceof NumberWrapper &&
        // check on 1..constructor(foo) case
        (BROKEN_CLASSOF
          ? fails(function () {
              NumberPrototype.valueOf.call(dummy);
            })
          : classofRaw(dummy) != NUMBER)
        ? inheritIfRequired(
            new NativeNumber(toNumber(it)),
            dummy,
            NumberWrapper
          )
        : toNumber(it);
    };
    for (
      var keys$1 = descriptors
          ? getOwnPropertyNames(NativeNumber)
          : // ES3:
            (
              "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY," +
              // ES2015 (in case, if modules with ES2015 Number statics required before):
              "EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER," +
              "MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger," +
              // ESNext
              "fromString,range"
            ).split(","),
        j = 0,
        key;
      keys$1.length > j;
      j++
    ) {
      if (has(NativeNumber, (key = keys$1[j])) && !has(NumberWrapper, key)) {
        defineProperty$3(
          NumberWrapper,
          key,
          getOwnPropertyDescriptor$3(NativeNumber, key)
        );
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

  const nativeAssign = Object.assign;
  const defineProperty$4 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  const objectAssign =
    !nativeAssign ||
    fails(function () {
      // should have correct order of operations (Edge bug)
      if (
        descriptors &&
        nativeAssign(
          { b: 1 },
          nativeAssign(
            defineProperty$4({}, "a", {
              enumerable: true,
              get() {
                defineProperty$4(this, "b", {
                  value: 3,
                  enumerable: false,
                });
              },
            }),
            { b: 2 }
          )
        ).b !== 1
      )
        return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      const A = {};
      const B = {};
      // eslint-disable-next-line no-undef
      const symbol = Symbol();
      const alphabet = "abcdefghijklmnopqrst";
      A[symbol] = 7;
      alphabet.split("").forEach(function (chr) {
        B[chr] = chr;
      });
      return (
        nativeAssign({}, A)[symbol] != 7 ||
        objectKeys(nativeAssign({}, B)).join("") != alphabet
      );
    })
      ? function assign(target, source) {
          // eslint-disable-line no-unused-vars
          const T = toObject(target);
          const argumentsLength = arguments.length;
          let index = 1;
          const getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
          const propertyIsEnumerable = objectPropertyIsEnumerable.f;
          while (argumentsLength > index) {
            const S = indexedObject(arguments[index++]);
            const keys = getOwnPropertySymbols
              ? objectKeys(S).concat(getOwnPropertySymbols(S))
              : objectKeys(S);
            const length = keys.length;
            let j = 0;
            var key;
            while (length > j) {
              key = keys[j++];
              if (!descriptors || propertyIsEnumerable.call(S, key))
                T[key] = S[key];
            }
          }
          return T;
        }
      : nativeAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  _export(
    { target: "Object", stat: true, forced: Object.assign !== objectAssign },
    {
      assign: objectAssign,
    }
  );

  const $values = objectToArray.values;

  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  _export(
    { target: "Object", stat: true },
    {
      values: function values(O) {
        return $values(O);
      },
    }
  );

  const freezing = !fails(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  const internalMetadata = createCommonjsModule(function (module) {
    const defineProperty = objectDefineProperty.f;

    const METADATA = uid("meta");
    let id = 0;

    const isExtensible =
      Object.isExtensible ||
      function () {
        return true;
      };

    const setMetadata = function (it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: "O" + ++id, // object ID
          weakData: {}, // weak collections IDs
        },
      });
    };

    const fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it))
        return typeof it === "symbol"
          ? it
          : (typeof it === "string" ? "S" : "P") + it;
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return "F";
        // not necessary to add metadata
        if (!create) return "E";
        // add missing metadata
        setMetadata(it);
        // return object ID
      }
      return it[METADATA].objectID;
    };

    const getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
        // return the store of weak collections IDs
      }
      return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    const onFreeze = function (it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
        setMetadata(it);
      return it;
    };

    var meta = (module.exports = {
      REQUIRED: false,
      fastKey,
      getWeakData,
      onFreeze,
    });

    hiddenKeys[METADATA] = true;
  });
  const internalMetadata_1 = internalMetadata.REQUIRED;
  const internalMetadata_2 = internalMetadata.fastKey;
  const internalMetadata_3 = internalMetadata.getWeakData;
  const internalMetadata_4 = internalMetadata.onFreeze;

  const collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    const IS_MAP = CONSTRUCTOR_NAME.includes("Map");
    const IS_WEAK = CONSTRUCTOR_NAME.includes("Weak");
    const ADDER = IS_MAP ? "set" : "add";
    const NativeConstructor = global_1[CONSTRUCTOR_NAME];
    const NativePrototype = NativeConstructor && NativeConstructor.prototype;
    let Constructor = NativeConstructor;
    const exported = {};

    const fixMethod = function (KEY) {
      const nativeMethod = NativePrototype[KEY];
      redefine(
        NativePrototype,
        KEY,
        KEY == "add"
          ? function add(value) {
              nativeMethod.call(this, value === 0 ? 0 : value);
              return this;
            }
          : KEY == "delete"
          ? function (key) {
              return IS_WEAK && !isObject(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == "get"
          ? function get(key) {
              return IS_WEAK && !isObject(key)
                ? undefined
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == "has"
          ? function has(key) {
              return IS_WEAK && !isObject(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : function set(key, value) {
              nativeMethod.call(this, key === 0 ? 0 : key, value);
              return this;
            }
      );
    };

    // eslint-disable-next-line max-len
    if (
      isForced_1(
        CONSTRUCTOR_NAME,
        typeof NativeConstructor !== "function" ||
          !(
            IS_WEAK ||
            (NativePrototype.forEach &&
              !fails(function () {
                new NativeConstructor().entries().next();
              }))
          )
      )
    ) {
      // create collection constructor
      Constructor = common.getConstructor(
        wrapper,
        CONSTRUCTOR_NAME,
        IS_MAP,
        ADDER
      );
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      const instance = new Constructor();
      // early implementations not supports chaining
      const HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      const THROWS_ON_PRIMITIVES = fails(function () {
        instance.has(1);
      });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new
      const ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      });
      // for early implementations -0 and +0 not the same
      const BUGGY_ZERO =
        !IS_WEAK &&
        fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          const $instance = new NativeConstructor();
          let index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          const that = inheritIfRequired(
            new NativeConstructor(),
            dummy,
            Constructor
          );
          if (iterable != undefined)
            iterate(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod("delete");
        fixMethod("has");
        IS_MAP && fixMethod("get");
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export(
      { global: true, forced: Constructor != NativeConstructor },
      exported
    );

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  const defineProperty$5 = objectDefineProperty.f;

  const fastKey = internalMetadata.fastKey;

  const setInternalState$3 = internalState.set;
  const internalStateGetterFor = internalState.getterFor;

  const collectionStrong = {
    getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$3(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0,
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined)
          iterate(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
      });

      const getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      const define = function (that, key, value) {
        const state = getInternalState(that);
        let entry = getEntry(that, key);
        let previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
          // create new entry
        } else {
          state.last = entry = {
            index: (index = fastKey(key, true)),
            key,
            value,
            previous: (previous = state.last),
            next: undefined,
            removed: false,
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== "F") state.index[index] = entry;
        }
        return that;
      };

      var getEntry = function (that, key) {
        const state = getInternalState(that);
        // fast case
        const index = fastKey(key);
        let entry;
        if (index !== "F") return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          const that = this;
          const state = getInternalState(that);
          const data = state.index;
          let entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous)
              entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        delete(key) {
          const that = this;
          const state = getInternalState(that);
          const entry = getEntry(that, key);
          if (entry) {
            const next = entry.next;
            const prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          }
          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          const state = getInternalState(this);
          const boundFunction = functionBindContext(
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined,
            3
          );
          let entry;
          while ((entry = entry ? entry.next : state.first)) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        },
      });

      redefineAll(
        C.prototype,
        IS_MAP
          ? {
              // 23.1.3.6 Map.prototype.get(key)
              get: function get(key) {
                const entry = getEntry(this, key);
                return entry && entry.value;
              },
              // 23.1.3.9 Map.prototype.set(key, value)
              set: function set(key, value) {
                return define(this, key === 0 ? 0 : key, value);
              },
            }
          : {
              // 23.2.3.1 Set.prototype.add(value)
              add: function add(value) {
                return define(this, (value = value === 0 ? 0 : value), value);
              },
            }
      );
      if (descriptors)
        defineProperty$5(C.prototype, "size", {
          get() {
            return getInternalState(this).size;
          },
        });
      return C;
    },
    setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
      const ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
      const getInternalCollectionState =
        internalStateGetterFor(CONSTRUCTOR_NAME);
      const getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(
        C,
        CONSTRUCTOR_NAME,
        function (iterated, kind) {
          setInternalState$3(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind,
            last: undefined,
          });
        },
        function () {
          const state = getInternalIteratorState(this);
          const kind = state.kind;
          let entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (
            !state.target ||
            !(state.last = entry = entry ? entry.next : state.state.first)
          ) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == "keys") return { value: entry.key, done: false };
          if (kind == "values") return { value: entry.value, done: false };
          return { value: [entry.key, entry.value], done: false };
        },
        IS_MAP ? "entries" : "values",
        !IS_MAP,
        true
      );

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies(CONSTRUCTOR_NAME);
    },
  };

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  const es_set = collection(
    "Set",
    function (init) {
      return function Set() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    },
    collectionStrong
  );

  // @@match logic
  fixRegexpWellKnownSymbolLogic(
    "match",
    1,
    function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          const O = requireObjectCoercible(this);
          const matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined
            ? matcher.call(regexp, O)
            : new RegExp(regexp)[MATCH](String(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (regexp) {
          const res = maybeCallNative(nativeMatch, regexp, this);
          if (res.done) return res.value;

          const rx = anObject(regexp);
          const S = String(this);

          if (!rx.global) return regexpExecAbstract(rx, S);

          const fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          const A = [];
          let n = 0;
          let result;
          while ((result = regexpExecAbstract(rx, S)) !== null) {
            const matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === "")
              rx.lastIndex = advanceStringIndex(
                S,
                toLength(rx.lastIndex),
                fullUnicode
              );
            n++;
          }
          return n === 0 ? null : A;
        },
      ];
    }
  );

  const floor$1 = Math.floor;
  const replace = "".replace;
  const SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
  const SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

  // https://tc39.es/ecma262/#sec-getsubstitution
  const getSubstitution = function (
    matched,
    str,
    position,
    captures,
    namedCaptures,
    replacement
  ) {
    const tailPos = position + matched.length;
    const m = captures.length;
    let symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      let capture;
      switch (ch.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return matched;
        case "`":
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case "<":
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            const f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m)
              return captures[f - 1] === undefined
                ? ch.charAt(1)
                : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? "" : capture;
    });
  };

  const max$1 = Math.max;
  const min$3 = Math.min;

  const maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic(
    "replace",
    2,
    function (REPLACE, nativeReplace, maybeCallNative, reason) {
      const REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE =
        reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
      const REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
      const UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        ? "$"
        : "$0";

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          const O = requireObjectCoercible(this);
          const replacer =
            searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          if (
            (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE &&
              REPLACE_KEEPS_$0) ||
            (typeof replaceValue === "string" &&
              !replaceValue.includes(UNSAFE_SUBSTITUTE))
          ) {
            const res = maybeCallNative(
              nativeReplace,
              regexp,
              this,
              replaceValue
            );
            if (res.done) return res.value;
          }

          const rx = anObject(regexp);
          const S = String(this);

          const functionalReplace = typeof replaceValue === "function";
          if (!functionalReplace) replaceValue = String(replaceValue);

          const global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          const results = [];
          while (true) {
            var result = regexpExecAbstract(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            const matchStr = String(result[0]);
            if (matchStr === "")
              rx.lastIndex = advanceStringIndex(
                S,
                toLength(rx.lastIndex),
                fullUnicode
              );
          }

          let accumulatedResult = "";
          let nextSourcePosition = 0;
          for (let i = 0; i < results.length; i++) {
            result = results[i];

            const matched = String(result[0]);
            const position = max$1(min$3(toInteger(result.index), S.length), 0);
            const captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (let j = 1; j < result.length; j++)
              captures.push(maybeToString(result[j]));
            const namedCaptures = result.groups;
            if (functionalReplace) {
              const replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(
                replaceValue.apply(undefined, replacerArgs)
              );
            } else {
              replacement = getSubstitution(
                matched,
                S,
                position,
                captures,
                namedCaptures,
                replaceValue
              );
            }
            if (position >= nextSourcePosition) {
              accumulatedResult +=
                S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        },
      ];
    }
  );

  const getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;

  const nativeStartsWith = "".startsWith;
  const min$4 = Math.min;

  const CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic("startsWith");
  // https://github.com/zloirock/core-js/pull/702
  const MDN_POLYFILL_BUG =
    !CORRECT_IS_REGEXP_LOGIC &&
    !!(function () {
      const descriptor = getOwnPropertyDescriptor$4(
        String.prototype,
        "startsWith"
      );
      return descriptor && !descriptor.writable;
    })();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  _export(
    {
      target: "String",
      proto: true,
      forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC,
    },
    {
      startsWith: function startsWith(searchString /* , position = 0 */) {
        const that = String(requireObjectCoercible(this));
        notARegexp(searchString);
        const index = toLength(
          min$4(arguments.length > 1 ? arguments[1] : undefined, that.length)
        );
        const search = String(searchString);
        return nativeStartsWith
          ? nativeStartsWith.call(that, search, index)
          : that.slice(index, index + search.length) === search;
      },
    }
  );

  const non = "\u200B\u0085\u180E";

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  const stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return (
        !!whitespaces[METHOD_NAME]() ||
        non[METHOD_NAME]() != non ||
        whitespaces[METHOD_NAME].name !== METHOD_NAME
      );
    });
  };

  const $trim = stringTrim.trim;

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  _export(
    { target: "String", proto: true, forced: stringTrimForced("trim") },
    {
      trim: function trim() {
        return $trim(this);
      },
    }
  );

  const ITERATOR$5 = wellKnownSymbol("iterator");
  const TO_STRING_TAG$3 = wellKnownSymbol("toStringTag");
  const ArrayValues = es_array_iterator.values;

  for (const COLLECTION_NAME$1 in domIterables) {
    const Collection$1 = global_1[COLLECTION_NAME$1];
    const CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues)
        try {
          createNonEnumerableProperty(
            CollectionPrototype$1,
            ITERATOR$5,
            ArrayValues
          );
        } catch (error) {
          CollectionPrototype$1[ITERATOR$5] = ArrayValues;
        }
      if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(
          CollectionPrototype$1,
          TO_STRING_TAG$3,
          COLLECTION_NAME$1
        );
      }
      if (domIterables[COLLECTION_NAME$1])
        for (const METHOD_NAME in es_array_iterator) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (
            CollectionPrototype$1[METHOD_NAME] !==
            es_array_iterator[METHOD_NAME]
          )
            try {
              createNonEnumerableProperty(
                CollectionPrototype$1,
                METHOD_NAME,
                es_array_iterator[METHOD_NAME]
              );
            } catch (error) {
              CollectionPrototype$1[METHOD_NAME] =
                es_array_iterator[METHOD_NAME];
            }
        }
    }
  }

  const _this3 = undefined;

  // Thanks @stimulus:
  // https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
  function domReady() {
    const _this = this;

    return new Promise(
      function (resolve) {
        _newArrowCheck(this, _this);

        if (document.readyState == "loading") {
          document.addEventListener("DOMContentLoaded", resolve);
        } else {
          resolve();
        }
      }.bind(this)
    );
  }
  function arrayUnique(array) {
    return Array.from(new Set(array));
  }
  function isTesting() {
    return (
      navigator.userAgent.includes("Node.js") ||
      navigator.userAgent.includes("jsdom")
    );
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function warnIfMalformedTemplate(el, directive) {
    if (el.tagName.toLowerCase() !== "template") {
      console.warn(
        "Alpine: ["
          .concat(
            directive,
            "] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#"
          )
          .concat(directive)
      );
    } else if (el.content.childElementCount !== 1) {
      console.warn(
        "Alpine: <template> tag with [".concat(
          directive,
          "] encountered with an unexpected number of root elements. Make sure <template> has a single root element. "
        )
      );
    }
  }
  function kebabCase(subject) {
    return subject
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
  }
  function camelCase(subject) {
    const _this2 = this;

    return subject.toLowerCase().replace(
      /-(\w)/g,
      function (match, _char) {
        _newArrowCheck(this, _this2);

        return _char.toUpperCase();
      }.bind(this)
    );
  }
  function walk(el, callback) {
    if (callback(el) === false) return;
    let node = el.firstElementChild;

    while (node) {
      walk(node, callback);
      node = node.nextElementSibling;
    }
  }
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;

      const later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleError = function handleError(el, expression, error) {
    _newArrowCheck(this, _this3);

    console.warn(
      'Alpine Error: "'
        .concat(error, '"\n\nExpression: "')
        .concat(expression, '"\nElement:'),
      el
    );

    if (!isTesting()) {
      Object.assign(error, {
        el,
        expression,
      });
      throw error;
    }
  }.bind(undefined);

  function tryCatch(cb, _ref) {
    const _this4 = this;

    const el = _ref.el;
    const expression = _ref.expression;

    try {
      const value = cb();
      return value instanceof Promise
        ? value.catch(
            function (e) {
              _newArrowCheck(this, _this4);

              return handleError(el, expression, e);
            }.bind(this)
          )
        : value;
    } catch (e) {
      handleError(el, expression, e);
    }
  }

  function saferEval(el, expression, dataContext) {
    const _this5 = this;

    const additionalHelperVariables =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return tryCatch(
      function () {
        _newArrowCheck(this, _this5);

        if (typeof expression === "function") {
          return expression.call(dataContext);
        }

        return new Function(
          ["$data"].concat(
            _toConsumableArray(Object.keys(additionalHelperVariables))
          ),
          "var __alpine_result; with($data) { __alpine_result = ".concat(
            expression,
            " }; return __alpine_result"
          )
        ).apply(
          void 0,
          [dataContext].concat(
            _toConsumableArray(Object.values(additionalHelperVariables))
          )
        );
      }.bind(this),
      {
        el,
        expression,
      }
    );
  }
  function saferEvalNoReturn(el, expression, dataContext) {
    const _this6 = this;

    const additionalHelperVariables =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return tryCatch(
      function () {
        _newArrowCheck(this, _this6);

        if (typeof expression === "function") {
          return Promise.resolve(
            expression.call(dataContext, additionalHelperVariables.$event)
          );
        }

        const AsyncFunction = Function; // For the cases when users pass only a function reference to the caller: `x-on:click="foo"`
        // Where "foo" is a function. Also, we'll pass the function the event instance when we call it.

        if (Object.keys(dataContext).includes(expression)) {
          const methodReference = new Function(
            ["dataContext"].concat(
              _toConsumableArray(Object.keys(additionalHelperVariables))
            ),
            "with(dataContext) { return ".concat(expression, " }")
          ).apply(
            void 0,
            [dataContext].concat(
              _toConsumableArray(Object.values(additionalHelperVariables))
            )
          );

          if (typeof methodReference === "function") {
            return Promise.resolve(
              methodReference.call(
                dataContext,
                additionalHelperVariables.$event
              )
            );
          } else {
            return Promise.resolve();
          }
        }

        return Promise.resolve(
          new AsyncFunction(
            ["dataContext"].concat(
              _toConsumableArray(Object.keys(additionalHelperVariables))
            ),
            "with(dataContext) { ".concat(expression, " }")
          ).apply(
            void 0,
            [dataContext].concat(
              _toConsumableArray(Object.values(additionalHelperVariables))
            )
          )
        );
      }.bind(this),
      {
        el,
        expression,
      }
    );
  }
  const xAttrRE =
    /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
  function isXAttr(attr) {
    const name = replaceAtAndColonWithStandardSyntax(attr.name);
    return xAttrRE.test(name);
  }
  function getXAttrs(el, component, type) {
    const _this7 = this;

    let directives = Array.from(el.attributes)
      .filter(isXAttr)
      .map(parseHtmlAttribute); // Get an object of directives from x-spread.

    const spreadDirective = directives.filter(
      function (directive) {
        _newArrowCheck(this, _this7);

        return directive.type === "spread";
      }.bind(this)
    )[0];

    if (spreadDirective) {
      const spreadObject = saferEval(
        el,
        spreadDirective.expression,
        component.$data
      ); // Add x-spread directives to the pile of existing directives.

      directives = directives.concat(
        Object.entries(spreadObject).map(
          function (_ref2) {
            _newArrowCheck(this, _this7);

            const _ref3 = _slicedToArray(_ref2, 2);
            const name = _ref3[0];
            const value = _ref3[1];

            return parseHtmlAttribute({
              name,
              value,
            });
          }.bind(this)
        )
      );
    }

    if (type)
      return directives.filter(
        function (i) {
          _newArrowCheck(this, _this7);

          return i.type === type;
        }.bind(this)
      );
    return sortDirectives(directives);
  }

  function sortDirectives(directives) {
    const _this8 = this;

    const directiveOrder = ["bind", "model", "show", "catch-all"];
    return directives.sort(
      function (a, b) {
        _newArrowCheck(this, _this8);

        const typeA = !directiveOrder.includes(a.type) ? "catch-all" : a.type;
        const typeB = !directiveOrder.includes(b.type) ? "catch-all" : b.type;
        return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
      }.bind(this)
    );
  }

  function parseHtmlAttribute(_ref4) {
    const _this9 = this;

    const name = _ref4.name;
    const value = _ref4.value;
    const normalizedName = replaceAtAndColonWithStandardSyntax(name);
    const typeMatch = normalizedName.match(xAttrRE);
    const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
    const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map(
        function (i) {
          _newArrowCheck(this, _this9);

          return i.replace(".", "");
        }.bind(this)
      ),
      expression: value,
    };
  }
  function isBooleanAttr(attrName) {
    // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
    // Array roughly ordered by estimated usage
    const booleanAttributes = [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ];
    return booleanAttributes.includes(attrName);
  }
  function replaceAtAndColonWithStandardSyntax(name) {
    if (name.startsWith("@")) {
      return name.replace("@", "x-on:");
    } else if (name.startsWith(":")) {
      return name.replace(":", "x-bind:");
    }

    return name;
  }
  function convertClassStringToArray(classList) {
    const filterFn =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : Boolean;
    return classList.split(" ").filter(filterFn);
  }
  const TRANSITION_TYPE_IN = "in";
  const TRANSITION_TYPE_OUT = "out";
  const TRANSITION_CANCELLED = "cancelled";
  function transitionIn(el, show, reject, component) {
    const _this10 = this;

    const forceSkip =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    // We don't want to transition on the initial page load.
    if (forceSkip) return show();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, "transition");
    const showAttr = getXAttrs(el, component, "show")[0]; // If this is triggered by a x-show.transition.

    if (showAttr && showAttr.modifiers.includes("transition")) {
      let modifiers = showAttr.modifiers; // If x-show.transition.out, we'll skip the "in" transition.

      if (modifiers.includes("out") && !modifiers.includes("in")) return show();
      const settingBothSidesOfTransition =
        modifiers.includes("in") && modifiers.includes("out"); // If x-show.transition.in...out... only use "in" related modifiers for this transition.

      modifiers = settingBothSidesOfTransition
        ? modifiers.filter(
            function (i, index) {
              _newArrowCheck(this, _this10);

              return index < modifiers.indexOf("out");
            }.bind(this)
          )
        : modifiers;
      transitionHelperIn(el, modifiers, show, reject); // Otherwise, we can assume x-transition:enter.
    } else if (
      attrs.some(
        function (attr) {
          _newArrowCheck(this, _this10);

          return ["enter", "enter-start", "enter-end"].includes(attr.value);
        }.bind(this)
      )
    ) {
      transitionClassesIn(el, component, attrs, show, reject);
    } else {
      // If neither, just show that damn thing.
      show();
    }
  }
  function transitionOut(el, hide, reject, component) {
    const _this11 = this;

    const forceSkip =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    // We don't want to transition on the initial page load.
    if (forceSkip) return hide();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, "transition");
    const showAttr = getXAttrs(el, component, "show")[0];

    if (showAttr && showAttr.modifiers.includes("transition")) {
      let modifiers = showAttr.modifiers;
      if (modifiers.includes("in") && !modifiers.includes("out")) return hide();
      const settingBothSidesOfTransition =
        modifiers.includes("in") && modifiers.includes("out");
      modifiers = settingBothSidesOfTransition
        ? modifiers.filter(
            function (i, index) {
              _newArrowCheck(this, _this11);

              return index > modifiers.indexOf("out");
            }.bind(this)
          )
        : modifiers;
      transitionHelperOut(
        el,
        modifiers,
        settingBothSidesOfTransition,
        hide,
        reject
      );
    } else if (
      attrs.some(
        function (attr) {
          _newArrowCheck(this, _this11);

          return ["leave", "leave-start", "leave-end"].includes(attr.value);
        }.bind(this)
      )
    ) {
      transitionClassesOut(el, component, attrs, hide, reject);
    } else {
      hide();
    }
  }
  function transitionHelperIn(el, modifiers, showCallback, reject) {
    const _this12 = this;

    // Default values inspired by: https://material.io/design/motion/speed.html#duration
    const styleValues = {
      duration: modifierValue(modifiers, "duration", 150),
      origin: modifierValue(modifiers, "origin", "center"),
      first: {
        opacity: 0,
        scale: modifierValue(modifiers, "scale", 95),
      },
      second: {
        opacity: 1,
        scale: 100,
      },
    };
    transitionHelper(
      el,
      modifiers,
      showCallback,
      function () {
        _newArrowCheck(this, _this12);
      }.bind(this),
      reject,
      styleValues,
      TRANSITION_TYPE_IN
    );
  }
  function transitionHelperOut(
    el,
    modifiers,
    settingBothSidesOfTransition,
    hideCallback,
    reject
  ) {
    const _this13 = this;

    // Make the "out" transition .5x slower than the "in". (Visually better)
    // HOWEVER, if they explicitly set a duration for the "out" transition,
    // use that.
    const duration = settingBothSidesOfTransition
      ? modifierValue(modifiers, "duration", 150)
      : modifierValue(modifiers, "duration", 150) / 2;
    const styleValues = {
      duration,
      origin: modifierValue(modifiers, "origin", "center"),
      first: {
        opacity: 1,
        scale: 100,
      },
      second: {
        opacity: 0,
        scale: modifierValue(modifiers, "scale", 95),
      },
    };
    transitionHelper(
      el,
      modifiers,
      function () {
        _newArrowCheck(this, _this13);
      }.bind(this),
      hideCallback,
      reject,
      styleValues,
      TRANSITION_TYPE_OUT
    );
  }

  function modifierValue(modifiers, key, fallback) {
    // If the modifier isn't present, use the default.
    if (!modifiers.includes(key)) return fallback; // If it IS present, grab the value after it: x-show.transition.duration.500ms

    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;

    if (key === "scale") {
      // Check if the very next value is NOT a number and return the fallback.
      // If x-show.transition.scale, we'll use the default scale value.
      // That is how a user opts out of the opacity transition.
      if (!isNumeric(rawValue)) return fallback;
    }

    if (key === "duration") {
      // Support x-show.transition.duration.500ms && duration.500
      const match = rawValue.match(/([0-9]+)ms/);
      if (match) return match[1];
    }

    if (key === "origin") {
      // Support chaining origin directions: x-show.transition.top.right
      if (
        ["top", "right", "left", "center", "bottom"].includes(
          modifiers[modifiers.indexOf(key) + 2]
        )
      ) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }

    return rawValue;
  }

  function transitionHelper(
    el,
    modifiers,
    hook1,
    hook2,
    reject,
    styleValues,
    type
  ) {
    // clear the previous transition if exists to avoid caching the wrong styles
    if (el.__x_transition) {
      el.__x_transition.cancel && el.__x_transition.cancel();
    } // If the user set these style values, we'll put them back when we're done with them.

    const opacityCache = el.style.opacity;
    const transformCache = el.style.transform;
    const transformOriginCache = el.style.transformOrigin; // If no modifiers are present: x-show.transition, we'll default to both opacity and scale.

    const noModifiers =
      !modifiers.includes("opacity") && !modifiers.includes("scale");
    const transitionOpacity = noModifiers || modifiers.includes("opacity");
    const transitionScale = noModifiers || modifiers.includes("scale"); // These are the explicit stages of a transition (same stages for in and for out).
    // This way you can get a birds eye view of the hooks, and the differences
    // between them.

    const stages = {
      start: function start() {
        if (transitionOpacity) el.style.opacity = styleValues.first.opacity;
        if (transitionScale)
          el.style.transform = "scale(".concat(
            styleValues.first.scale / 100,
            ")"
          );
      },
      during: function during() {
        if (transitionScale) el.style.transformOrigin = styleValues.origin;
        el.style.transitionProperty = [
          transitionOpacity ? "opacity" : "",
          transitionScale ? "transform" : "",
        ]
          .join(" ")
          .trim();
        el.style.transitionDuration = "".concat(
          styleValues.duration / 1000,
          "s"
        );
        el.style.transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)";
      },
      show: function show() {
        hook1();
      },
      end: function end() {
        if (transitionOpacity) el.style.opacity = styleValues.second.opacity;
        if (transitionScale)
          el.style.transform = "scale(".concat(
            styleValues.second.scale / 100,
            ")"
          );
      },
      hide: function hide() {
        hook2();
      },
      cleanup: function cleanup() {
        if (transitionOpacity) el.style.opacity = opacityCache;
        if (transitionScale) el.style.transform = transformCache;
        if (transitionScale) el.style.transformOrigin = transformOriginCache;
        el.style.transitionProperty = null;
        el.style.transitionDuration = null;
        el.style.transitionTimingFunction = null;
      },
    };
    transition(el, stages, type, reject);
  }

  const ensureStringExpression = function ensureStringExpression(
    expression,
    el,
    component
  ) {
    _newArrowCheck(this, _this3);

    return typeof expression === "function"
      ? component.evaluateReturnExpression(el, expression)
      : expression;
  }.bind(undefined);

  function transitionClassesIn(
    el,
    component,
    directives,
    showCallback,
    reject
  ) {
    const _this14 = this;

    const enter = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this14);

              return i.value === "enter";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    const enterStart = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this14);

              return i.value === "enter-start";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    const enterEnd = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this14);

              return i.value === "enter-end";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    transitionClasses(
      el,
      enter,
      enterStart,
      enterEnd,
      showCallback,
      function () {
        _newArrowCheck(this, _this14);
      }.bind(this),
      TRANSITION_TYPE_IN,
      reject
    );
  }
  function transitionClassesOut(
    el,
    component,
    directives,
    hideCallback,
    reject
  ) {
    const _this15 = this;

    const leave = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this15);

              return i.value === "leave";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    const leaveStart = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this15);

              return i.value === "leave-start";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    const leaveEnd = convertClassStringToArray(
      ensureStringExpression(
        (
          directives.find(
            function (i) {
              _newArrowCheck(this, _this15);

              return i.value === "leave-end";
            }.bind(this)
          ) || {
            expression: "",
          }
        ).expression,
        el,
        component
      )
    );
    transitionClasses(
      el,
      leave,
      leaveStart,
      leaveEnd,
      function () {
        _newArrowCheck(this, _this15);
      }.bind(this),
      hideCallback,
      TRANSITION_TYPE_OUT,
      reject
    );
  }
  function transitionClasses(
    el,
    classesDuring,
    classesStart,
    classesEnd,
    hook1,
    hook2,
    type,
    reject
  ) {
    // clear the previous transition if exists to avoid caching the wrong classes
    if (el.__x_transition) {
      el.__x_transition.cancel && el.__x_transition.cancel();
    }

    const originalClasses = el.__x_original_classes || [];
    const stages = {
      start: function start() {
        let _el$classList;

        (_el$classList = el.classList).add.apply(
          _el$classList,
          _toConsumableArray(classesStart)
        );
      },
      during: function during() {
        let _el$classList2;

        (_el$classList2 = el.classList).add.apply(
          _el$classList2,
          _toConsumableArray(classesDuring)
        );
      },
      show: function show() {
        hook1();
      },
      end: function end() {
        let _el$classList3;
        const _this16 = this;
        let _el$classList4;

        // Don't remove classes that were in the original class attribute.
        (_el$classList3 = el.classList).remove.apply(
          _el$classList3,
          _toConsumableArray(
            classesStart.filter(
              function (i) {
                _newArrowCheck(this, _this16);

                return !originalClasses.includes(i);
              }.bind(this)
            )
          )
        );

        (_el$classList4 = el.classList).add.apply(
          _el$classList4,
          _toConsumableArray(classesEnd)
        );
      },
      hide: function hide() {
        hook2();
      },
      cleanup: function cleanup() {
        let _el$classList5;
        const _this17 = this;
        let _el$classList6;

        (_el$classList5 = el.classList).remove.apply(
          _el$classList5,
          _toConsumableArray(
            classesDuring.filter(
              function (i) {
                _newArrowCheck(this, _this17);

                return !originalClasses.includes(i);
              }.bind(this)
            )
          )
        );

        (_el$classList6 = el.classList).remove.apply(
          _el$classList6,
          _toConsumableArray(
            classesEnd.filter(
              function (i) {
                _newArrowCheck(this, _this17);

                return !originalClasses.includes(i);
              }.bind(this)
            )
          )
        );
      },
    };
    transition(el, stages, type, reject);
  }
  function transition(el, stages, type, reject) {
    const _this18 = this;

    const finish = once(
      function () {
        _newArrowCheck(this, _this18);

        stages.hide(); // Adding an "isConnected" check, in case the callback
        // removed the element from the DOM.

        if (el.isConnected) {
          stages.cleanup();
        }

        delete el.__x_transition;
      }.bind(this)
    );
    el.__x_transition = {
      // Set transition type so we can avoid clearing transition if the direction is the same
      type,
      // create a callback for the last stages of the transition so we can call it
      // from different point and early terminate it. Once will ensure that function
      // is only called one time.
      cancel: once(
        function () {
          _newArrowCheck(this, _this18);

          reject(TRANSITION_CANCELLED);
          finish();
        }.bind(this)
      ),
      finish,
      // This store the next animation frame so we can cancel it
      nextFrame: null,
    };
    stages.start();
    stages.during();
    el.__x_transition.nextFrame = requestAnimationFrame(
      function () {
        const _this19 = this;

        _newArrowCheck(this, _this18);

        // Note: Safari's transitionDuration property will list out comma separated transition durations
        // for every single transition property. Let's grab the first one and call it a day.
        let duration =
          Number(
            getComputedStyle(el)
              .transitionDuration.replace(/,.*/, "")
              .replace("s", "")
          ) * 1000;

        if (duration === 0) {
          duration =
            Number(getComputedStyle(el).animationDuration.replace("s", "")) *
            1000;
        }

        stages.show();
        el.__x_transition.nextFrame = requestAnimationFrame(
          function () {
            _newArrowCheck(this, _this19);

            stages.end();
            setTimeout(el.__x_transition.finish, duration);
          }.bind(this)
        );
      }.bind(this)
    );
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  } // Thanks @vuejs
  // https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js

  function once(callback) {
    let called = false;
    return function () {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      }
    };
  }

  function handleForDirective(
    component,
    templateEl,
    expression,
    initialUpdate,
    extraVars
  ) {
    const _this = this;

    warnIfMalformedTemplate(templateEl, "x-for");
    const iteratorNames =
      typeof expression === "function"
        ? parseForExpression(
            component.evaluateReturnExpression(templateEl, expression)
          )
        : parseForExpression(expression);
    const items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(
      component,
      templateEl,
      iteratorNames,
      extraVars
    ); // As we walk the array, we'll also walk the DOM (updating/creating as we go).

    let currentEl = templateEl;
    items.forEach(
      function (item, index) {
        const _this2 = this;

        _newArrowCheck(this, _this);

        const iterationScopeVariables = getIterationScopeVariables(
          iteratorNames,
          item,
          index,
          items,
          extraVars()
        );
        const currentKey = generateKeyForIteration(
          component,
          templateEl,
          index,
          iterationScopeVariables
        );
        let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(
          currentEl.nextElementSibling,
          currentKey
        ); // If we haven't found a matching key, insert the element at the current position.

        if (!nextEl) {
          nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl); // And transition it in if it's not the first page load.

          transitionIn(
            nextEl,
            function () {
              _newArrowCheck(this, _this2);
            }.bind(this),
            function () {
              _newArrowCheck(this, _this2);
            }.bind(this),
            component,
            initialUpdate
          );
          nextEl.__x_for = iterationScopeVariables;
          component.initializeElements(
            nextEl,
            function () {
              _newArrowCheck(this, _this2);

              return nextEl.__x_for;
            }.bind(this)
          ); // Otherwise update the element we found.
        } else {
          // Temporarily remove the key indicator to allow the normal "updateElements" to work.
          delete nextEl.__x_for_key;
          nextEl.__x_for = iterationScopeVariables;
          component.updateElements(
            nextEl,
            function () {
              _newArrowCheck(this, _this2);

              return nextEl.__x_for;
            }.bind(this)
          );
        }

        currentEl = nextEl;
        currentEl.__x_for_key = currentKey;
      }.bind(this)
    );
    removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
  } // This was taken from VueJS 2.* core. Thanks Vue!

  function parseForExpression(expression) {
    const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    const stripParensRE = /^\(|\)$/g;
    const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    const inMatch = String(expression).match(forAliasRE);
    if (!inMatch) return;
    const res = {};
    res.items = inMatch[2].trim();
    const item = inMatch[1].trim().replace(stripParensRE, "");
    const iteratorMatch = item.match(forIteratorRE);

    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();

      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }

    return res;
  }

  function getIterationScopeVariables(
    iteratorNames,
    item,
    index,
    items,
    extraVars
  ) {
    // We must create a new object, so each iteration has a new scope
    const scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
    scopeVariables[iteratorNames.item] = item;
    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }

  function generateKeyForIteration(
    component,
    el,
    index,
    iterationScopeVariables
  ) {
    const _this3 = this;

    const bindKeyAttribute = getXAttrs(el, component, "bind").filter(
      function (attr) {
        _newArrowCheck(this, _this3);

        return attr.value === "key";
      }.bind(this)
    )[0]; // If the dev hasn't specified a key, just return the index of the iteration.

    if (!bindKeyAttribute) return index;
    return component.evaluateReturnExpression(
      el,
      bindKeyAttribute.expression,
      function () {
        _newArrowCheck(this, _this3);

        return iterationScopeVariables;
      }.bind(this)
    );
  }

  function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(
    component,
    el,
    iteratorNames,
    extraVars
  ) {
    const _this4 = this;

    const ifAttribute = getXAttrs(el, component, "if")[0];

    if (
      ifAttribute &&
      !component.evaluateReturnExpression(el, ifAttribute.expression)
    ) {
      return [];
    }

    let items = component.evaluateReturnExpression(
      el,
      iteratorNames.items,
      extraVars
    ); // This adds support for the `i in n` syntax.

    if (isNumeric(items) && items >= 0) {
      items = Array.from(
        Array(items).keys(),
        function (i) {
          _newArrowCheck(this, _this4);

          return i + 1;
        }.bind(this)
      );
    }

    return items;
  }

  function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
    const clone = document.importNode(templateEl.content, true);
    currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
    return currentEl.nextElementSibling;
  }

  function lookAheadForMatchingKeyedElementAndMoveItIfFound(
    nextEl,
    currentKey
  ) {
    if (!nextEl) return; // If we are already past the x-for generated elements, we don't need to look ahead.

    if (nextEl.__x_for_key === undefined) return; // If the the key's DO match, no need to look ahead.

    if (nextEl.__x_for_key === currentKey) return nextEl; // If they don't, we'll look ahead for a match.
    // If we find it, we'll move it to the current position in the loop.

    let tmpNextEl = nextEl;

    while (tmpNextEl) {
      if (tmpNextEl.__x_for_key === currentKey) {
        return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
      }

      tmpNextEl =
        tmpNextEl.nextElementSibling &&
        tmpNextEl.nextElementSibling.__x_for_key !== undefined
          ? tmpNextEl.nextElementSibling
          : false;
    }
  }

  function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
    let nextElementFromOldLoop =
      currentEl.nextElementSibling &&
      currentEl.nextElementSibling.__x_for_key !== undefined
        ? currentEl.nextElementSibling
        : false;

    const _loop = function _loop() {
      const _this5 = this;

      const nextElementFromOldLoopImmutable = nextElementFromOldLoop;
      const nextSibling = nextElementFromOldLoop.nextElementSibling;
      transitionOut(
        nextElementFromOldLoop,
        function () {
          _newArrowCheck(this, _this5);

          nextElementFromOldLoopImmutable.remove();
        }.bind(this),
        function () {
          _newArrowCheck(this, _this5);
        }.bind(this),
        component
      );
      nextElementFromOldLoop =
        nextSibling && nextSibling.__x_for_key !== undefined
          ? nextSibling
          : false;
    };

    while (nextElementFromOldLoop) {
      _loop();
    }
  }

  function handleAttributeBindingDirective(
    component,
    el,
    attrName,
    expression,
    extraVars,
    attrType,
    modifiers
  ) {
    const _this = this;

    let value = component.evaluateReturnExpression(el, expression, extraVars);

    if (attrName === "value") {
      if (
        Alpine.ignoreFocusedForValueBinding &&
        document.activeElement.isSameNode(el)
      )
        return; // If nested model key is undefined, set the default value to empty string.

      if (value === undefined && String(expression).match(/\./)) {
        value = "";
      }

      if (el.type === "radio") {
        // Set radio value from x-bind:value, if no "value" attribute exists.
        // If there are any initial state values, radio will have a correct
        // "checked" value since x-bind:value is processed before x-model.
        if (el.attributes.value === undefined && attrType === "bind") {
          el.value = value;
        } else if (attrType !== "bind") {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      } else if (el.type === "checkbox") {
        // If we are explicitly binding a string to the :value, set the string,
        // If the value is a boolean, leave it alone, it will be set to "on"
        // automatically.
        if (
          typeof value !== "boolean" &&
          ![null, undefined].includes(value) &&
          attrType === "bind"
        ) {
          el.value = String(value);
        } else if (attrType !== "bind") {
          if (Array.isArray(value)) {
            // I'm purposely not using Array.includes here because it's
            // strict, and because of Numeric/String mis-casting, I
            // want the "includes" to be "fuzzy".
            el.checked = value.some(
              function (val) {
                _newArrowCheck(this, _this);

                return checkedAttrLooseCompare(val, el.value);
              }.bind(this)
            );
          } else {
            el.checked = !!value;
          }
        }
      } else if (el.tagName === "SELECT") {
        updateSelect(el, value);
      } else {
        if (el.value === value) return;
        el.value = value;
      }
    } else if (attrName === "class") {
      if (Array.isArray(value)) {
        const originalClasses = el.__x_original_classes || [];
        el.setAttribute(
          "class",
          arrayUnique(originalClasses.concat(value)).join(" ")
        );
      } else if (_typeof(value) === "object") {
        // Sorting the keys / class names by their boolean value will ensure that
        // anything that evaluates to `false` and needs to remove classes is run first.
        const keysSortedByBooleanValue = Object.keys(value).sort(
          function (a, b) {
            _newArrowCheck(this, _this);

            return value[a] - value[b];
          }.bind(this)
        );
        keysSortedByBooleanValue.forEach(
          function (classNames) {
            const _this2 = this;

            _newArrowCheck(this, _this);

            if (value[classNames]) {
              convertClassStringToArray(classNames).forEach(
                function (className) {
                  _newArrowCheck(this, _this2);

                  return el.classList.add(className);
                }.bind(this)
              );
            } else {
              convertClassStringToArray(classNames).forEach(
                function (className) {
                  _newArrowCheck(this, _this2);

                  return el.classList.remove(className);
                }.bind(this)
              );
            }
          }.bind(this)
        );
      } else {
        const _originalClasses = el.__x_original_classes || [];

        const newClasses = value ? convertClassStringToArray(value) : [];
        el.setAttribute(
          "class",
          arrayUnique(_originalClasses.concat(newClasses)).join(" ")
        );
      }
    } else {
      attrName = modifiers.includes("camel") ? camelCase(attrName) : attrName; // If an attribute's bound value is null, undefined or false, remove the attribute

      if ([null, undefined, false].includes(value)) {
        el.removeAttribute(attrName);
      } else {
        isBooleanAttr(attrName)
          ? setIfChanged(el, attrName, attrName)
          : setIfChanged(el, attrName, value);
      }
    }
  }

  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }

  function updateSelect(el, value) {
    const _this3 = this;

    const arrayWrappedValue = [].concat(value).map(
      function (value) {
        _newArrowCheck(this, _this3);

        return value + "";
      }.bind(this)
    );
    Array.from(el.options).forEach(
      function (option) {
        _newArrowCheck(this, _this3);

        option.selected = arrayWrappedValue.includes(
          option.value || option.text
        );
      }.bind(this)
    );
  }

  function handleTextDirective(el, output, expression) {
    // If nested model key is undefined, set the default value to empty string.
    if (output === undefined && String(expression).match(/\./)) {
      output = "";
    }

    el.textContent = output;
  }

  function handleHtmlDirective(component, el, expression, extraVars) {
    el.innerHTML = component.evaluateReturnExpression(
      el,
      expression,
      extraVars
    );
  }

  function handleShowDirective(component, el, value, modifiers) {
    const _this = this;

    const initialUpdate =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    const hide = function hide() {
      _newArrowCheck(this, _this);

      el.style.display = "none";
      el.__x_is_shown = false;
    }.bind(this);

    const show = function show() {
      _newArrowCheck(this, _this);

      if (el.style.length === 1 && el.style.display === "none") {
        el.removeAttribute("style");
      } else {
        el.style.removeProperty("display");
      }

      el.__x_is_shown = true;
    }.bind(this);

    if (initialUpdate === true) {
      if (value) {
        show();
      } else {
        hide();
      }

      return;
    }

    const handle = function handle(resolve, reject) {
      const _this2 = this;

      _newArrowCheck(this, _this);

      if (value) {
        if (el.style.display === "none" || el.__x_transition) {
          transitionIn(
            el,
            function () {
              _newArrowCheck(this, _this2);

              show();
            }.bind(this),
            reject,
            component
          );
        }

        resolve(
          function () {
            _newArrowCheck(this, _this2);
          }.bind(this)
        );
      } else if (el.style.display !== "none") {
        transitionOut(
          el,
          function () {
            const _this3 = this;

            _newArrowCheck(this, _this2);

            resolve(
              function () {
                _newArrowCheck(this, _this3);

                hide();
              }.bind(this)
            );
          }.bind(this),
          reject,
          component
        );
      } else {
        resolve(
          function () {
            _newArrowCheck(this, _this2);
          }.bind(this)
        );
      }
    }.bind(this); // The working of x-show is a bit complex because we need to
    // wait for any child transitions to finish before hiding
    // some element. Also, this has to be done recursively.
    // If x-show.immediate, foregoe the waiting.

    if (modifiers.includes("immediate")) {
      handle(
        function (finish) {
          _newArrowCheck(this, _this);

          return finish();
        }.bind(this),
        function () {
          _newArrowCheck(this, _this);
        }.bind(this)
      );
      return;
    } // x-show is encountered during a DOM tree walk. If an element
    // we encounter is NOT a child of another x-show element we
    // can execute the previous x-show stack (if one exists).

    if (
      component.showDirectiveLastElement &&
      !component.showDirectiveLastElement.contains(el)
    ) {
      component.executeAndClearRemainingShowDirectiveStack();
    }

    component.showDirectiveStack.push(handle);
    component.showDirectiveLastElement = el;
  }

  function handleIfDirective(
    component,
    el,
    expressionResult,
    initialUpdate,
    extraVars
  ) {
    const _this = this;

    warnIfMalformedTemplate(el, "x-if");
    const elementHasAlreadyBeenAdded =
      el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;

    if (
      expressionResult &&
      (!elementHasAlreadyBeenAdded || el.__x_transition)
    ) {
      const clone = document.importNode(el.content, true);
      el.parentElement.insertBefore(clone, el.nextElementSibling);
      transitionIn(
        el.nextElementSibling,
        function () {
          _newArrowCheck(this, _this);
        }.bind(this),
        function () {
          _newArrowCheck(this, _this);
        }.bind(this),
        component,
        initialUpdate
      );
      component.initializeElements(el.nextElementSibling, extraVars);
      el.nextElementSibling.__x_inserted_me = true;
    } else if (!expressionResult && elementHasAlreadyBeenAdded) {
      transitionOut(
        el.nextElementSibling,
        function () {
          _newArrowCheck(this, _this);

          el.nextElementSibling.remove();
        }.bind(this),
        function () {
          _newArrowCheck(this, _this);
        }.bind(this),
        component,
        initialUpdate
      );
    }
  }

  const HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport("splice");
  const USES_TO_LENGTH$8 = arrayMethodUsesToLength("splice", {
    ACCESSORS: true,
    0: 0,
    1: 2,
  });

  const max$2 = Math.max;
  const min$5 = Math.min;
  const MAX_SAFE_INTEGER$1 = 0x1fffffffffffff;
  const MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export(
    {
      target: "Array",
      proto: true,
      forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$8,
    },
    {
      splice: function splice(start, deleteCount /* , ...items */) {
        const O = toObject(this);
        const len = toLength(O.length);
        const actualStart = toAbsoluteIndex(start, len);
        const argumentsLength = arguments.length;
        let insertCount, actualDeleteCount, A, k, from, to;
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min$5(
            max$2(toInteger(deleteCount), 0),
            len - actualStart
          );
        }
        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
          throw new TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
        }
        A = arraySpeciesCreate(O, actualDeleteCount);
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) createProperty(A, k, O[from]);
        }
        A.length = actualDeleteCount;
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--)
            delete O[k - 1];
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2];
        }
        O.length = len - actualDeleteCount + insertCount;
        return A;
      },
    }
  );

  function registerListener(component, el, event, modifiers, expression) {
    const _this = this;

    const extraVars =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    const options = {
      passive: modifiers.includes("passive"),
    };

    if (modifiers.includes("camel")) {
      event = camelCase(event);
    }

    let _handler2, listenerTarget;

    if (modifiers.includes("away")) {
      listenerTarget = document;

      _handler2 = function handler(e) {
        _newArrowCheck(this, _this);

        // Don't do anything if the click came from the element or within it.
        if (el.contains(e.target)) return; // Don't do anything if this element isn't currently visible.

        if (el.offsetWidth < 1 && el.offsetHeight < 1) return; // Now that we are sure the element is visible, AND the click
        // is from outside it, let's run the expression.

        runListenerHandler(component, expression, e, extraVars);

        if (modifiers.includes("once")) {
          document.removeEventListener(event, _handler2, options);
        }
      }.bind(this);
    } else {
      listenerTarget = modifiers.includes("window")
        ? window
        : modifiers.includes("document")
        ? document
        : el;

      _handler2 = function _handler(e) {
        const _this2 = this;

        _newArrowCheck(this, _this);

        // Remove this global event handler if the element that declared it
        // has been removed. It's now stale.
        if (listenerTarget === window || listenerTarget === document) {
          if (!document.body.contains(el)) {
            listenerTarget.removeEventListener(event, _handler2, options);
            return;
          }
        }

        if (isKeyEvent(event)) {
          if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
            return;
          }
        }

        if (modifiers.includes("prevent")) e.preventDefault();
        if (modifiers.includes("stop")) e.stopPropagation(); // If the .self modifier isn't present, or if it is present and
        // the target element matches the element we are registering the
        // event on, run the handler

        if (!modifiers.includes("self") || e.target === el) {
          const returnValue = runListenerHandler(
            component,
            expression,
            e,
            extraVars
          );
          returnValue.then(
            function (value) {
              _newArrowCheck(this, _this2);

              if (value === false) {
                e.preventDefault();
              } else if (modifiers.includes("once")) {
                listenerTarget.removeEventListener(event, _handler2, options);
              }
            }.bind(this)
          );
        }
      }.bind(this);
    }

    if (modifiers.includes("debounce")) {
      const nextModifier =
        modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      const wait = isNumeric(nextModifier.split("ms")[0])
        ? Number(nextModifier.split("ms")[0])
        : 250;
      _handler2 = debounce(_handler2, wait);
    }

    listenerTarget.addEventListener(event, _handler2, options);
  }

  function runListenerHandler(component, expression, e, extraVars) {
    const _this3 = this;

    return component.evaluateCommandExpression(
      e.target,
      expression,
      function () {
        _newArrowCheck(this, _this3);

        return _objectSpread2(
          _objectSpread2({}, extraVars()),
          {},
          {
            $event: e,
          }
        );
      }.bind(this)
    );
  }

  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }

  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    const _this4 = this;

    let keyModifiers = modifiers.filter(
      function (i) {
        _newArrowCheck(this, _this4);

        return !["window", "document", "prevent", "stop"].includes(i);
      }.bind(this)
    );

    if (keyModifiers.includes("debounce")) {
      const debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(
        debounceIndex,
        isNumeric(
          (keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]
        )
          ? 2
          : 1
      );
    } // If no modifier is specified, we'll call it a press.

    if (keyModifiers.length === 0) return false; // If one is passed, AND it matches the key pressed, we'll call it a press.

    if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
      return false; // The user is listening for key combinations.

    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter(
      function (modifier) {
        _newArrowCheck(this, _this4);

        return keyModifiers.includes(modifier);
      }.bind(this)
    );
    keyModifiers = keyModifiers.filter(
      function (i) {
        _newArrowCheck(this, _this4);

        return !selectedSystemKeyModifiers.includes(i);
      }.bind(this)
    );

    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(
        function (modifier) {
          _newArrowCheck(this, _this4);

          // Alias "cmd" and "super" to "meta"
          if (modifier === "cmd" || modifier === "super") modifier = "meta";
          return e["".concat(modifier, "Key")];
        }.bind(this)
      ); // If all the modifiers selected are pressed, ...

      if (
        activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length
      ) {
        // AND the remaining key is pressed as well. It's a press.
        if (keyModifiers[0] === keyToModifier(e.key)) return false;
      }
    } // We'll call it NOT a valid keypress.

    return true;
  }

  function keyToModifier(key) {
    switch (key) {
      case "/":
        return "slash";

      case " ":
      case "Spacebar":
        return "space";

      default:
        return key && kebabCase(key);
    }
  }

  function registerModelListener(
    component,
    el,
    modifiers,
    expression,
    extraVars
  ) {
    const _this = this;

    // If the element we are binding to is a select, a radio, or checkbox
    // we'll listen for the change event instead of the "input" event.
    const event =
      el.tagName.toLowerCase() === "select" ||
      ["checkbox", "radio"].includes(el.type) ||
      modifiers.includes("lazy")
        ? "change"
        : "input";
    const listenerExpression = ""
      .concat(expression, " = rightSideOfExpression($event, ")
      .concat(expression, ")");
    registerListener(
      component,
      el,
      event,
      modifiers,
      listenerExpression,
      function () {
        _newArrowCheck(this, _this);

        return _objectSpread2(
          _objectSpread2({}, extraVars()),
          {},
          {
            rightSideOfExpression: generateModelAssignmentFunction(
              el,
              modifiers,
              expression
            ),
          }
        );
      }.bind(this)
    );
  }

  function generateModelAssignmentFunction(el, modifiers, expression) {
    const _this2 = this;

    if (el.type === "radio") {
      // Radio buttons only work properly when they share a name attribute.
      // People might assume we take care of that for them, because
      // they already set a shared "x-model" attribute.
      if (!el.hasAttribute("name")) el.setAttribute("name", expression);
    }

    return function (event, currentValue) {
      const _this3 = this;

      _newArrowCheck(this, _this2);

      // Check for event.detail due to an issue where IE11 handles other events as a CustomEvent.
      if (event instanceof CustomEvent && event.detail) {
        return event.detail;
      } else if (el.type === "checkbox") {
        // If the data we are binding to is an array, toggle its value inside the array.
        if (Array.isArray(currentValue)) {
          const newValue = modifiers.includes("number")
            ? safeParseNumber(event.target.value)
            : event.target.value;
          return event.target.checked
            ? currentValue.concat([newValue])
            : currentValue.filter(
                function (el) {
                  _newArrowCheck(this, _this3);

                  return !checkedAttrLooseCompare(el, newValue);
                }.bind(this)
              );
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        return modifiers.includes("number")
          ? Array.from(event.target.selectedOptions).map(
              function (option) {
                _newArrowCheck(this, _this3);

                const rawValue = option.value || option.text;
                return safeParseNumber(rawValue);
              }.bind(this)
            )
          : Array.from(event.target.selectedOptions).map(
              function (option) {
                _newArrowCheck(this, _this3);

                return option.value || option.text;
              }.bind(this)
            );
      } else {
        const rawValue = event.target.value;
        return modifiers.includes("number")
          ? safeParseNumber(rawValue)
          : modifiers.includes("trim")
          ? rawValue.trim()
          : rawValue;
      }
    }.bind(this);
  }

  function safeParseNumber(rawValue) {
    const number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric(number) ? number : rawValue;
  }

  // `Reflect.set` method
  // https://tc39.es/ecma262/#sec-reflect.set
  function set$2(target, propertyKey, V /* , receiver */) {
    const receiver = arguments.length < 4 ? target : arguments[3];
    let ownDescriptor = objectGetOwnPropertyDescriptor.f(
      anObject(target),
      propertyKey
    );
    let existingDescriptor, prototype;
    if (!ownDescriptor) {
      if (isObject((prototype = objectGetPrototypeOf(target)))) {
        return set$2(prototype, propertyKey, V, receiver);
      }
      ownDescriptor = createPropertyDescriptor(0);
    }
    if (has(ownDescriptor, "value")) {
      if (ownDescriptor.writable === false || !isObject(receiver)) return false;
      if (
        (existingDescriptor = objectGetOwnPropertyDescriptor.f(
          receiver,
          propertyKey
        ))
      ) {
        if (
          existingDescriptor.get ||
          existingDescriptor.set ||
          existingDescriptor.writable === false
        )
          return false;
        existingDescriptor.value = V;
        objectDefineProperty.f(receiver, propertyKey, existingDescriptor);
      } else
        objectDefineProperty.f(
          receiver,
          propertyKey,
          createPropertyDescriptor(0, V)
        );
      return true;
    }
    return ownDescriptor.set === undefined
      ? false
      : (ownDescriptor.set.call(receiver, V), true);
  }

  // MS Edge 17-18 Reflect.set allows setting the property to object
  // with non-writable property on the prototype
  const MS_EDGE_BUG = fails(function () {
    const Constructor = function () {
      /* empty */
    };
    const object = objectDefineProperty.f(new Constructor(), "a", {
      configurable: true,
    });
    // eslint-disable-next-line no-undef
    return Reflect.set(Constructor.prototype, "a", 1, object) !== false;
  });

  _export(
    { target: "Reflect", stat: true, forced: MS_EDGE_BUG },
    {
      set: set$2,
    }
  );

  function wrap(data, mutationCallback) {
    /* IE11-ONLY:START */
    return wrapForIe11(data, mutationCallback);
  }
  function unwrap(membrane, observable) {
    const _this = this;

    const unwrappedData = membrane.unwrapProxy(observable);
    const copy = {};
    Object.keys(unwrappedData).forEach(
      function (key) {
        _newArrowCheck(this, _this);

        if (["$el", "$refs", "$nextTick", "$watch"].includes(key)) return;
        copy[key] = unwrappedData[key];
      }.bind(this)
    );
    return copy;
  }

  function wrapForIe11(data, mutationCallback) {
    var proxyHandler = {
      set: function set(target, key, value) {
        // Set the value converting it to a "Deep Proxy" when required
        // Note that if a project is not a valid object, it won't be converted to a proxy
        const setWasSuccessful = Reflect.set(
          target,
          key,
          deepProxy(value, proxyHandler)
        );
        mutationCallback(target, key);
        return setWasSuccessful;
      },
      get: function get(target, key) {
        // Provide a way to determine if this object is an Alpine proxy or not.
        if (key === "$isAlpineProxy") return true; // Just return the flippin' value. Gawsh.

        return target[key];
      },
    };
    return {
      data: deepProxy(data, proxyHandler),
      membrane: {
        unwrapProxy: function unwrapProxy(proxy) {
          return proxy;
        },
      },
    };
  }

  function deepProxy(target, proxyHandler) {
    // If target is null, return it.
    if (target === null) return target; // If target is not an object, return it.

    if (_typeof(target) !== "object") return target; // If target is a DOM node (like in the case of this.$el), return it.

    if (target instanceof Node) return target; // If target is already an Alpine proxy, return it.

    if (target.$isAlpineProxy) return target; // Otherwise proxy the properties recursively.
    // This enables reactivity on setting nested data.
    // Note that if a project is not a valid object, it won't be converted to a proxy

    for (const property in target) {
      target[property] = deepProxy(target[property], proxyHandler);
    }

    return new Proxy(target, proxyHandler);
  }

  const Component = /* #__PURE__ */ (function () {
    function Component(el) {
      const _this = this;

      const componentForClone =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : null;

      _classCallCheck(this, Component);

      this.$el = el;
      const dataAttr = this.$el.getAttribute("x-data");
      const dataExpression = dataAttr === "" ? "{}" : dataAttr;
      const initExpression = this.$el.getAttribute("x-init");
      const dataExtras = {
        $el: this.$el,
      };
      const canonicalComponentElementReference = componentForClone
        ? componentForClone.$el
        : this.$el;
      Object.entries(Alpine.magicProperties).forEach(
        function (_ref) {
          _newArrowCheck(this, _this);

          const _ref2 = _slicedToArray(_ref, 2);
          const name = _ref2[0];
          const callback = _ref2[1];

          Object.defineProperty(dataExtras, "$".concat(name), {
            get: function get() {
              return callback(canonicalComponentElementReference);
            },
          });
        }.bind(this)
      );
      this.unobservedData = componentForClone
        ? componentForClone.getUnobservedData()
        : saferEval(el, dataExpression, dataExtras);
      /* IE11-ONLY:START */
      // For IE11, add our magic properties to the original data for access.
      // The Proxy polyfill does not allow properties to be added after creation.

      this.unobservedData.$el = null;
      this.unobservedData.$refs = null;
      this.unobservedData.$nextTick = null;
      this.unobservedData.$watch = null; // The IE build uses a proxy polyfill which doesn't allow properties
      // to be defined after the proxy object is created so,
      // for IE only, we need to define our helpers earlier.

      Object.entries(Alpine.magicProperties).forEach(
        function (_ref3) {
          _newArrowCheck(this, _this);

          const _ref4 = _slicedToArray(_ref3, 2);
          const name = _ref4[0];
          const callback = _ref4[1];

          Object.defineProperty(this.unobservedData, "$".concat(name), {
            get: function get() {
              return callback(canonicalComponentElementReference, this.$el);
            },
          });
        }.bind(this)
      );
      /* IE11-ONLY:END */
      // Construct a Proxy-based observable. This will be used to handle reactivity.

      const _this$wrapDataInObser = this.wrapDataInObservable(
        this.unobservedData
      );
      const membrane = _this$wrapDataInObser.membrane;
      const data = _this$wrapDataInObser.data;

      this.$data = data;
      this.membrane = membrane; // After making user-supplied data methods reactive, we can now add
      // our magic properties to the original data for access.

      this.unobservedData.$el = this.$el;
      this.unobservedData.$refs = this.getRefsProxy();
      this.nextTickStack = [];

      this.unobservedData.$nextTick = function (callback) {
        _newArrowCheck(this, _this);

        this.nextTickStack.push(callback);
      }.bind(this);

      this.watchers = {};

      this.unobservedData.$watch = function (property, callback) {
        _newArrowCheck(this, _this);

        if (!this.watchers[property]) this.watchers[property] = [];
        this.watchers[property].push(callback);
      }.bind(this);

      this.showDirectiveStack = [];
      this.showDirectiveLastElement;
      componentForClone ||
        Alpine.onBeforeComponentInitializeds.forEach(
          function (callback) {
            _newArrowCheck(this, _this);

            return callback(this);
          }.bind(this)
        );
      let initReturnedCallback; // If x-init is present AND we aren't cloning (skip x-init on clone)

      if (initExpression && !componentForClone) {
        // We want to allow data manipulation, but not trigger DOM updates just yet.
        // We haven't even initialized the elements with their Alpine bindings. I mean c'mon.
        this.pauseReactivity = true;
        initReturnedCallback = this.evaluateReturnExpression(
          this.$el,
          initExpression
        );
        this.pauseReactivity = false;
      } // Register all our listeners and set all our attribute bindings.
      // If we're cloning a component, the third parameter ensures no duplicate
      // event listeners are registered (the mutation observer will take care of them)

      this.initializeElements(
        this.$el,
        function () {
          _newArrowCheck(this, _this);
        }.bind(this),
        componentForClone
      ); // Use mutation observer to detect new elements being added within this component at run-time.
      // Alpine's just so darn flexible amirite?

      this.listenForNewElementsToInitialize();

      if (typeof initReturnedCallback === "function") {
        // Run the callback returned from the "x-init" hook to allow the user to do stuff after
        // Alpine's got it's grubby little paws all over everything.
        initReturnedCallback.call(this.$data);
      }

      componentForClone ||
        setTimeout(
          function () {
            const _this2 = this;

            _newArrowCheck(this, _this);

            Alpine.onComponentInitializeds.forEach(
              function (callback) {
                _newArrowCheck(this, _this2);

                return callback(this);
              }.bind(this)
            );
          }.bind(this),
          0
        );
    }

    _createClass(Component, [
      {
        key: "getUnobservedData",
        value: function getUnobservedData() {
          return unwrap(this.membrane, this.$data);
        },
      },
      {
        key: "wrapDataInObservable",
        value: function wrapDataInObservable(data) {
          const _this3 = this;

          const self = this;
          const updateDom = debounce(function () {
            self.updateElements(self.$el);
          }, 0);
          return wrap(
            data,
            function (target, key) {
              const _this4 = this;

              _newArrowCheck(this, _this3);

              if (self.watchers[key]) {
                // If there's a watcher for this specific key, run it.
                self.watchers[key].forEach(
                  function (callback) {
                    _newArrowCheck(this, _this4);

                    return callback(target[key]);
                  }.bind(this)
                );
              } else if (Array.isArray(target)) {
                // Arrays are special cases, if any of the items change, we consider the array as mutated.
                Object.keys(self.watchers).forEach(
                  function (fullDotNotationKey) {
                    const _this5 = this;

                    _newArrowCheck(this, _this4);

                    const dotNotationParts = fullDotNotationKey.split("."); // Ignore length mutations since they would result in duplicate calls.
                    // For example, when calling push, we would get a mutation for the item's key
                    // and a second mutation for the length property.

                    if (key === "length") return;
                    dotNotationParts.reduce(
                      function (comparisonData, part) {
                        const _this6 = this;

                        _newArrowCheck(this, _this5);

                        if (Object.is(target, comparisonData[part])) {
                          self.watchers[fullDotNotationKey].forEach(
                            function (callback) {
                              _newArrowCheck(this, _this6);

                              return callback(target);
                            }.bind(this)
                          );
                        }

                        return comparisonData[part];
                      }.bind(this),
                      self.unobservedData
                    );
                  }.bind(this)
                );
              } else {
                // Let's walk through the watchers with "dot-notation" (foo.bar) and see
                // if this mutation fits any of them.
                Object.keys(self.watchers)
                  .filter(
                    function (i) {
                      _newArrowCheck(this, _this4);

                      return i.includes(".");
                    }.bind(this)
                  )
                  .forEach(
                    function (fullDotNotationKey) {
                      const _this7 = this;

                      _newArrowCheck(this, _this4);

                      const dotNotationParts = fullDotNotationKey.split("."); // If this dot-notation watcher's last "part" doesn't match the current
                      // key, then skip it early for performance reasons.

                      if (key !== dotNotationParts[dotNotationParts.length - 1])
                        return; // Now, walk through the dot-notation "parts" recursively to find
                      // a match, and call the watcher if one's found.

                      dotNotationParts.reduce(
                        function (comparisonData, part) {
                          const _this8 = this;

                          _newArrowCheck(this, _this7);

                          if (Object.is(target, comparisonData)) {
                            // Run the watchers.
                            self.watchers[fullDotNotationKey].forEach(
                              function (callback) {
                                _newArrowCheck(this, _this8);

                                return callback(target[key]);
                              }.bind(this)
                            );
                          }

                          return comparisonData[part];
                        }.bind(this),
                        self.unobservedData
                      );
                    }.bind(this)
                  );
              } // Don't react to data changes for cases like the `x-created` hook.

              if (self.pauseReactivity) return;
              updateDom();
            }.bind(this)
          );
        },
      },
      {
        key: "walkAndSkipNestedComponents",
        value: function walkAndSkipNestedComponents(el, callback) {
          const _this9 = this;

          const initializeComponentCallback =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : function () {
                  _newArrowCheck(this, _this9);
                }.bind(this);
          walk(
            el,
            function (el) {
              _newArrowCheck(this, _this9);

              // We've hit a component.
              if (el.hasAttribute("x-data")) {
                // If it's not the current one.
                if (!el.isSameNode(this.$el)) {
                  // Initialize it if it's not.
                  if (!el.__x) initializeComponentCallback(el); // Now we'll let that sub-component deal with itself.

                  return false;
                }
              }

              return callback(el);
            }.bind(this)
          );
        },
      },
      {
        key: "initializeElements",
        value: function initializeElements(rootEl) {
          const _this10 = this;

          const extraVars =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : function () {
                  _newArrowCheck(this, _this10);
                }.bind(this);
          const componentForClone =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : false;
          this.walkAndSkipNestedComponents(
            rootEl,
            function (el) {
              _newArrowCheck(this, _this10);

              // Don't touch spawns from for loop
              if (el.__x_for_key !== undefined) return false; // Don't touch spawns from if directives

              if (el.__x_inserted_me !== undefined) return false;
              this.initializeElement(el, extraVars, !componentForClone);
            }.bind(this),
            function (el) {
              _newArrowCheck(this, _this10);

              if (!componentForClone) el.__x = new Component(el);
            }.bind(this)
          );
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        },
      },
      {
        key: "initializeElement",
        value: function initializeElement(el, extraVars) {
          const shouldRegisterListeners =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : true;

          // To support class attribute merging, we have to know what the element's
          // original class attribute looked like for reference.
          if (el.hasAttribute("class") && getXAttrs(el, this).length > 0) {
            el.__x_original_classes = convertClassStringToArray(
              el.getAttribute("class")
            );
          }

          shouldRegisterListeners && this.registerListeners(el, extraVars);
          this.resolveBoundAttributes(el, true, extraVars);
        },
      },
      {
        key: "updateElements",
        value: function updateElements(rootEl) {
          const _this11 = this;

          const extraVars =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : function () {
                  _newArrowCheck(this, _this11);
                }.bind(this);
          this.walkAndSkipNestedComponents(
            rootEl,
            function (el) {
              _newArrowCheck(this, _this11);

              // Don't touch spawns from for loop (and check if the root is actually a for loop in a parent, don't skip it.)
              if (el.__x_for_key !== undefined && !el.isSameNode(this.$el))
                return false;
              this.updateElement(el, extraVars);
            }.bind(this),
            function (el) {
              _newArrowCheck(this, _this11);

              el.__x = new Component(el);
            }.bind(this)
          );
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        },
      },
      {
        key: "executeAndClearNextTickStack",
        value: function executeAndClearNextTickStack(el) {
          const _this12 = this;

          // Skip spawns from alpine directives
          if (el === this.$el && this.nextTickStack.length > 0) {
            // We run the tick stack after the next frame to allow any
            // running transitions to pass the initial show stage.
            requestAnimationFrame(
              function () {
                _newArrowCheck(this, _this12);

                while (this.nextTickStack.length > 0) {
                  this.nextTickStack.shift()();
                }
              }.bind(this)
            );
          }
        },
      },
      {
        key: "executeAndClearRemainingShowDirectiveStack",
        value: function executeAndClearRemainingShowDirectiveStack() {
          const _this13 = this;

          // The goal here is to start all the x-show transitions
          // and build a nested promise chain so that elements
          // only hide when the children are finished hiding.
          this.showDirectiveStack
            .reverse()
            .map(
              function (handler) {
                const _this14 = this;

                _newArrowCheck(this, _this13);

                return new Promise(
                  function (resolve, reject) {
                    _newArrowCheck(this, _this14);

                    handler(resolve, reject);
                  }.bind(this)
                );
              }.bind(this)
            )
            .reduce(
              function (promiseChain, promise) {
                const _this15 = this;

                _newArrowCheck(this, _this13);

                return promiseChain.then(
                  function () {
                    const _this16 = this;

                    _newArrowCheck(this, _this15);

                    return promise.then(
                      function (finishElement) {
                        _newArrowCheck(this, _this16);

                        finishElement();
                      }.bind(this)
                    );
                  }.bind(this)
                );
              }.bind(this),
              Promise.resolve(
                function () {
                  _newArrowCheck(this, _this13);
                }.bind(this)
              )
            )
            .catch(
              function (e) {
                _newArrowCheck(this, _this13);

                if (e !== TRANSITION_CANCELLED) throw e;
              }.bind(this)
            ); // We've processed the handler stack. let's clear it.

          this.showDirectiveStack = [];
          this.showDirectiveLastElement = undefined;
        },
      },
      {
        key: "updateElement",
        value: function updateElement(el, extraVars) {
          this.resolveBoundAttributes(el, false, extraVars);
        },
      },
      {
        key: "registerListeners",
        value: function registerListeners(el, extraVars) {
          const _this17 = this;

          getXAttrs(el, this).forEach(
            function (_ref5) {
              _newArrowCheck(this, _this17);

              const type = _ref5.type;
              const value = _ref5.value;
              const modifiers = _ref5.modifiers;
              const expression = _ref5.expression;

              switch (type) {
                case "on":
                  registerListener(
                    this,
                    el,
                    value,
                    modifiers,
                    expression,
                    extraVars
                  );
                  break;

                case "model":
                  registerModelListener(
                    this,
                    el,
                    modifiers,
                    expression,
                    extraVars
                  );
                  break;
              }
            }.bind(this)
          );
        },
      },
      {
        key: "resolveBoundAttributes",
        value: function resolveBoundAttributes(el) {
          const _this18 = this;

          const initialUpdate =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;
          const extraVars = arguments.length > 2 ? arguments[2] : undefined;
          const attrs = getXAttrs(el, this);
          attrs.forEach(
            function (_ref6) {
              const _this19 = this;

              _newArrowCheck(this, _this18);

              const type = _ref6.type;
              const value = _ref6.value;
              const modifiers = _ref6.modifiers;
              const expression = _ref6.expression;

              switch (type) {
                case "model":
                  handleAttributeBindingDirective(
                    this,
                    el,
                    "value",
                    expression,
                    extraVars,
                    type,
                    modifiers
                  );
                  break;

                case "bind":
                  // The :key binding on an x-for is special, ignore it.
                  if (
                    el.tagName.toLowerCase() === "template" &&
                    value === "key"
                  )
                    return;
                  handleAttributeBindingDirective(
                    this,
                    el,
                    value,
                    expression,
                    extraVars,
                    type,
                    modifiers
                  );
                  break;

                case "text":
                  var output = this.evaluateReturnExpression(
                    el,
                    expression,
                    extraVars
                  );
                  handleTextDirective(el, output, expression);
                  break;

                case "html":
                  handleHtmlDirective(this, el, expression, extraVars);
                  break;

                case "show":
                  var output = this.evaluateReturnExpression(
                    el,
                    expression,
                    extraVars
                  );
                  handleShowDirective(
                    this,
                    el,
                    output,
                    modifiers,
                    initialUpdate
                  );
                  break;

                case "if":
                  // If this element also has x-for on it, don't process x-if.
                  // We will let the "x-for" directive handle the "if"ing.
                  if (
                    attrs.some(
                      function (i) {
                        _newArrowCheck(this, _this19);

                        return i.type === "for";
                      }.bind(this)
                    )
                  )
                    return;
                  var output = this.evaluateReturnExpression(
                    el,
                    expression,
                    extraVars
                  );
                  handleIfDirective(this, el, output, initialUpdate, extraVars);
                  break;

                case "for":
                  handleForDirective(
                    this,
                    el,
                    expression,
                    initialUpdate,
                    extraVars
                  );
                  break;

                case "cloak":
                  el.removeAttribute("x-cloak");
                  break;
              }
            }.bind(this)
          );
        },
      },
      {
        key: "evaluateReturnExpression",
        value: function evaluateReturnExpression(el, expression) {
          const _this20 = this;

          const extraVars =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : function () {
                  _newArrowCheck(this, _this20);
                }.bind(this);
          return saferEval(
            el,
            expression,
            this.$data,
            _objectSpread2(
              _objectSpread2({}, extraVars()),
              {},
              {
                $dispatch: this.getDispatchFunction(el),
              }
            )
          );
        },
      },
      {
        key: "evaluateCommandExpression",
        value: function evaluateCommandExpression(el, expression) {
          const _this21 = this;

          const extraVars =
            arguments.length > 2 && arguments[2] !== undefined
              ? arguments[2]
              : function () {
                  _newArrowCheck(this, _this21);
                }.bind(this);
          return saferEvalNoReturn(
            el,
            expression,
            this.$data,
            _objectSpread2(
              _objectSpread2({}, extraVars()),
              {},
              {
                $dispatch: this.getDispatchFunction(el),
              }
            )
          );
        },
      },
      {
        key: "getDispatchFunction",
        value: function getDispatchFunction(el) {
          return function (event) {
            const detail =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            el.dispatchEvent(
              new CustomEvent(event, {
                detail,
                bubbles: true,
              })
            );
          };
        },
      },
      {
        key: "listenForNewElementsToInitialize",
        value: function listenForNewElementsToInitialize() {
          const _this22 = this;

          const targetNode = this.$el;
          const observerOptions = {
            childList: true,
            attributes: true,
            subtree: true,
          };
          const observer = new MutationObserver(
            function (mutations) {
              const _this23 = this;

              _newArrowCheck(this, _this22);

              for (var i = 0; i < mutations.length; i++) {
                // Filter out mutations triggered from child components.
                const closestParentComponent =
                  mutations[i].target.closest("[x-data]");
                if (
                  !(
                    closestParentComponent &&
                    closestParentComponent.isSameNode(this.$el)
                  )
                )
                  continue;

                if (
                  mutations[i].type === "attributes" &&
                  mutations[i].attributeName === "x-data"
                ) {
                  (function () {
                    const _this24 = this;

                    const xAttr =
                      mutations[i].target.getAttribute("x-data") || "{}";
                    const rawData = saferEval(_this23.$el, xAttr, {
                      $el: _this23.$el,
                    });
                    Object.keys(rawData).forEach(
                      function (key) {
                        _newArrowCheck(this, _this24);

                        if (_this23.$data[key] !== rawData[key]) {
                          _this23.$data[key] = rawData[key];
                        }
                      }.bind(this)
                    );
                  })();
                }

                if (mutations[i].addedNodes.length > 0) {
                  mutations[i].addedNodes.forEach(
                    function (node) {
                      _newArrowCheck(this, _this23);

                      if (node.nodeType !== 1 || node.__x_inserted_me) return;

                      if (node.matches("[x-data]") && !node.__x) {
                        node.__x = new Component(node);
                        return;
                      }

                      this.initializeElements(node);
                    }.bind(this)
                  );
                }
              }
            }.bind(this)
          );
          observer.observe(targetNode, observerOptions);
        },
      },
      {
        key: "getRefsProxy",
        value: function getRefsProxy() {
          const _this25 = this;

          const self = this;
          const refObj = {};
          /* IE11-ONLY:START */
          // Add any properties up-front that might be necessary for the Proxy polyfill.

          refObj.$isRefsProxy = false;
          refObj.$isAlpineProxy = false; // If we are in IE, since the polyfill needs all properties to be defined before building the proxy,
          // we just loop on the element, look for any x-ref and create a tmp property on a fake object.

          this.walkAndSkipNestedComponents(
            self.$el,
            function (el) {
              _newArrowCheck(this, _this25);

              if (el.hasAttribute("x-ref")) {
                refObj[el.getAttribute("x-ref")] = true;
              }
            }.bind(this)
          );
          /* IE11-ONLY:END */
          // One of the goals of this is to not hold elements in memory, but rather re-evaluate
          // the DOM when the system needs something from it. This way, the framework is flexible and
          // friendly to outside DOM changes from libraries like Vue/Livewire.
          // For this reason, I'm using an "on-demand" proxy to fake a "$refs" object.

          return new Proxy(refObj, {
            get: function get(object, property) {
              const _this26 = this;

              if (property === "$isAlpineProxy") return true;
              let ref; // We can't just query the DOM because it's hard to filter out refs in
              // nested components.

              self.walkAndSkipNestedComponents(
                self.$el,
                function (el) {
                  _newArrowCheck(this, _this26);

                  if (
                    el.hasAttribute("x-ref") &&
                    el.getAttribute("x-ref") === property
                  ) {
                    ref = el;
                  }
                }.bind(this)
              );
              return ref;
            },
          });
        },
      },
    ]);

    return Component;
  })();

  var Alpine = {
    version: "2.8.2",
    pauseMutationObserver: false,
    magicProperties: {},
    onComponentInitializeds: [],
    onBeforeComponentInitializeds: [],
    ignoreFocusedForValueBinding: false,
    start: (function () {
      const _start = _asyncToGenerator(
        /* #__PURE__ */ regeneratorRuntime.mark(function _callee() {
          const _this = this;

          return regeneratorRuntime.wrap(
            function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    if (isTesting()) {
                      _context.next = 3;
                      break;
                    }

                    _context.next = 3;
                    return domReady();

                  case 3:
                    this.discoverComponents(
                      function (el) {
                        _newArrowCheck(this, _this);

                        this.initializeComponent(el);
                      }.bind(this)
                    ); // It's easier and more performant to just support Turbolinks than listen
                    // to MutationObserver mutations at the document level.

                    document.addEventListener(
                      "turbolinks:load",
                      function () {
                        const _this2 = this;

                        _newArrowCheck(this, _this);

                        this.discoverUninitializedComponents(
                          function (el) {
                            _newArrowCheck(this, _this2);

                            this.initializeComponent(el);
                          }.bind(this)
                        );
                      }.bind(this)
                    );
                    this.listenForNewUninitializedComponentsAtRunTime();

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            },
            _callee,
            this
          );
        })
      );

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    })(),
    discoverComponents: function discoverComponents(callback) {
      const _this3 = this;

      const rootEls = document.querySelectorAll("[x-data]");
      rootEls.forEach(
        function (rootEl) {
          _newArrowCheck(this, _this3);

          callback(rootEl);
        }.bind(this)
      );
    },
    discoverUninitializedComponents: function discoverUninitializedComponents(
      callback
    ) {
      const _this4 = this;

      const el =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : null;
      const rootEls = (el || document).querySelectorAll("[x-data]");
      Array.from(rootEls)
        .filter(
          function (el) {
            _newArrowCheck(this, _this4);

            return el.__x === undefined;
          }.bind(this)
        )
        .forEach(
          function (rootEl) {
            _newArrowCheck(this, _this4);

            callback(rootEl);
          }.bind(this)
        );
    },
    listenForNewUninitializedComponentsAtRunTime:
      function listenForNewUninitializedComponentsAtRunTime() {
        const _this5 = this;

        const targetNode = document.querySelector("body");
        const observerOptions = {
          childList: true,
          attributes: true,
          subtree: true,
        };
        const observer = new MutationObserver(
          function (mutations) {
            const _this6 = this;

            _newArrowCheck(this, _this5);

            if (this.pauseMutationObserver) return;

            for (let i = 0; i < mutations.length; i++) {
              if (mutations[i].addedNodes.length > 0) {
                mutations[i].addedNodes.forEach(
                  function (node) {
                    const _this7 = this;

                    _newArrowCheck(this, _this6);

                    // Discard non-element nodes (like line-breaks)
                    if (node.nodeType !== 1) return; // Discard any changes happening within an existing component.
                    // They will take care of themselves.

                    if (
                      node.parentElement &&
                      node.parentElement.closest("[x-data]")
                    )
                      return;
                    this.discoverUninitializedComponents(
                      function (el) {
                        _newArrowCheck(this, _this7);

                        this.initializeComponent(el);
                      }.bind(this),
                      node.parentElement
                    );
                  }.bind(this)
                );
              }
            }
          }.bind(this)
        );
        observer.observe(targetNode, observerOptions);
      },
    initializeComponent: function initializeComponent(el) {
      const _this8 = this;

      if (!el.__x) {
        // Wrap in a try/catch so that we don't prevent other components
        // from initializing when one component contains an error.
        try {
          el.__x = new Component(el);
        } catch (error) {
          setTimeout(
            function () {
              _newArrowCheck(this, _this8);

              throw error;
            }.bind(this),
            0
          );
        }
      }
    },
    clone: function clone(component, newEl) {
      if (!newEl.__x) {
        newEl.__x = new Component(newEl, component);
      }
    },
    addMagicProperty: function addMagicProperty(name, callback) {
      this.magicProperties[name] = callback;
    },
    onComponentInitialized: function onComponentInitialized(callback) {
      this.onComponentInitializeds.push(callback);
    },
    onBeforeComponentInitialized: function onBeforeComponentInitialized(
      callback
    ) {
      this.onBeforeComponentInitializeds.push(callback);
    },
  };

  if (!isTesting()) {
    window.Alpine = Alpine;

    if (window.deferLoadingAlpine) {
      window.deferLoadingAlpine(function () {
        window.Alpine.start();
      });
    } else {
      window.Alpine.start();
    }
  }
});
