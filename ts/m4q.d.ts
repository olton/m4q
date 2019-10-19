type M4QObject = object;
type func = () => void;
type func_a = (...args: any[]) => void;
type Element = HTMLElement;
type Iterable = any;

declare function setImmediate(fn: func): number;
declare function clearImmediate(id: number): void;

declare class Promise {
    constructor(resolver: func_a);

    then(resolve: func_a, reject: func_a);
    done(resolve: func_a);
    catch(reject: func_a);

    static all(promises: any[]): any;
    static race(promises: any[]): any;
    static resolve(val: any): any;
    static reject(val: any): any;
}

declare class m4q {
    constructor(selector: any, context: any);

    static version: string;

    extend(...args: any[]): any;
    parseHTML(data: any, context: any): any;

    // init.js
    init(selector: any, context: any): any;

    // animation.js
    animate(el: Element, draw: any, dur: number, timing: string, cb: func): any;
    stop(el: Element, done: boolean): any;

    // ajax.js
    ajax(params: object): Promise;
    get(url: string, data: any, options: object): Promise;
    post(url: string, data: any, options: object): Promise;
    put(url: string, data: any, options: object): Promise;
    patch(url: string, data: any, options: object): Promise;
    delete(url: string, data: any, options: object): Promise;
    json(url: string, data: any, options: object): Promise;

    // attr.js
    meta(name: string): any;
    metaBy(name: string): any;
    doctype(): any;
    html(): any;
    charset(): any;

    // each.js
    each(context: any, callback: func_a): any;

    // effects.js
    fadeIn(el: Element, dur: number, easing: string, cb: func): any;
    fadeOut(el: Element, dur: number, easing: string, cb: func): any;
    slideDown(el: Element, dur: number, easing: string, cb: func): any;
    slideUp(el: Element, dur: number, easing: string, cb: func): any;

    // events.js
    static events: any[];
    static eventHooks: object;
    static eventUID: number;

    setEventHandler(obj: object): any;
    getEventHandler(index: number): any;
    getEvents(): any;
    getEventHooks(): any;
    addEventHook(event: string, handler: func_a, type: string): any;
    removeEventHook(event: string, type: string): any;
    removeEventHooks(event: string): any;
    off(): any;
    ready(fn: func): any;
    load(fn: func): any;
    unload(fn: func): any;

    // interval.js
    setInterval(fn: func, timeout: number): number;
    clearInterval(id: number): void;
    setTimeout(fn: func, timeout: number): number;
    clearTimeout(id: number): void;

    // populate.js
    global(): any;
    noConflict(): any;

    // proxy
    proxy(fn: func, context: any): func;
    bind(fn: func, context: any): func;

    // visibility.js
    hidden(el: Element, val: string, cb: func): any;
    hide(el: Element, cb: func): any;
    show(el: Element, cb: func): any;
    visible(el: Element, mode: string, cb: func): any;
    toggle(el: Element, cb: func): any;

    // utils.js
    uniqueId(): string;
    toArray(p: any): any[];
    import(p: any): any;
    merge(p1: object, p2: object): object;
    type(obj: any): string;
    sleep(milliseconds: number): void;
    isSelector(s: any): boolean;
    remove(selector: any): boolean;
    camelCase(val: string): string;
    isPlainObject(val: any): boolean;
    isEmptyObject(val: any): boolean;
    isArrayLike(val: any): boolean;
    not(val: any): boolean;
    parseUnit(val: any): any[];
    unit(val: any): any[];
    isVisible(el: any): boolean;
    isHidden(el: any): boolean;
}


declare namespace m4q {
    namespace fx {
        const off: boolean;
    }

    namespace easing {
        const def: string;
        function linear(t: number): number;
        function easeInSine(t: number): number;
        function easeOutSine(t: number): number;
        function easeInOutSine(t: number): number;
        function easeInQuad(t: number): number;
        function easeOutQuad(t: number): number;
        function easeInOutQuad(t: number): number;
        function easeInCubic(t: number): number;
        function easeOutCubic(t: number): number;
        function easeInOutCubic(t: number): number;
        function easeInQuart(t: number): number;
        function easeOutQuart(t: number): number;
        function easeInOutQuart(t: number): number;
        function easeInQuint(t: number): number;
        function easeOutQuint(t: number): number;
        function easeInOutQuint(t: number): number;
        function easeInExpo(t: number): number;
        function easeOutExpo(t: number): number;
        function easeInOutExpo(t: number): number;
        function easeInCirc(t: number): number;
        function easeOutCirc(t: number): number;
        function easeInOutCirc(t: number): number;
        function easeInBack(t: number, m: number): number;
        function easeOutBack(t: number, m: number): number;
        function easeInOutBack(t: number, m: number): number;
        function easeInElastic(t: number, m: number): number;
        function easeOutElastic(t: number, m: number): number;
        function easeInOutElastic(t: number, m: number): number;
        function easeInBounce(t: number): number;
        function easeOutBounce(t: number): number;
        function easeInOutBounce(t: number): number;
    }

    namespace fn {
        const version: string;
        let length: number;
        const uid: string;

        function push(): any;
        function sort(): any;
        function splice(): any;
        function indexOf(): any;

        // animation.js
        function animate(draw: any, dur: number, timing: string, cb: func): any;
        function stop(done: boolean): any;

        // ajax.js
        function load(url: string, data: any, options: object): Promise;

        // attr.js
        function attr(name: string, val: any): any;
        function removeAttr(name: string): any;
        function toggleAttr(name: string, val: any): any;
        function id(val: string): any;

        // classes.js
        function addClass(name: string): any;
        function removeClass(name: string): any;
        function toggleClass(name: string): any;
        function containsClass(name: string): any;
        function hasClass(name: string): any;
        function clearClasses(): any;
        function cls(return_array: boolean): any;

        // contains.js
        function index(selector: any): any;
        function get(index: number): any;
        function eq(index: number): any;
        function is(selector: any): any;
        function same(obj: any): any;
        function last(): any;
        function first(): any;
        function odd(): any;
        function even(): any;
        function filter(fn: func_a): any;
        function find(selector: any): any;
        function contains(selector: any): any;
        function children(selector: any): any;
        function parent(selector: any): any;
        function parents(selector: any): any;
        function siblings(selector: any): any;
        function prev(selector: any): any;
        function prevAll(selector: any): any;
        function next(selector: any): any;
        function nextAll(selector: any): any;
        function closest(selector: any): any;
        function has(selector: any): any;
        function back(to_start: boolean): any;

        // css.js
        function style(name: any, pseudo: string): any;
        function removeStyleProperty(name: string): any;
        function css(key: string, val: any): any;
        function scrollTop(val: number): any;
        function scrollLeft(val: number): any;

        // each.js
        function each(callback: func_a): any;

        // effects.js
        function fadeIn(dur: number, easing: string, cb: func): any;
        function fadeOut(dur: number, easing: string, cb: func): any;
        function slideDown(dur: number, easing: string, cb: func): any;
        function slideUp(dur: number, easing: string, cb: func): any;

        // events.js
        function on(eventsList: string, sel: any, handler: func_a, options: object): any;
        function one(eventsList: string, sel: any, handler: func_a, options: object): any;
        function off(eventsList: string, sel: any, options: object): any;
        function trigger(name: string): any;
        function fire(name: string, data: any): any;
        function blur(selector: string, fn: func_a, options: object): any;
        function focus(selector: string, fn: func_a, options: object): any;
        function resize(selector: string, fn: func_a, options: object): any;
        function click(selector: string, fn: func_a, options: object): any;
        function dblclick(selector: string, fn: func_a, options: object): any;
        function mousedown(selector: string, fn: func_a, options: object): any;
        function mouseup(selector: string, fn: func_a, options: object): any;
        function mousemove(selector: string, fn: func_a, options: object): any;
        function mouseover(selector: string, fn: func_a, options: object): any;
        function mouseout(selector: string, fn: func_a, options: object): any;
        function mouseenter(selector: string, fn: func_a, options: object): any;
        function mouseleave(selector: string, fn: func_a, options: object): any;
        function change(selector: string, fn: func_a, options: object): any;
        function select(selector: string, fn: func_a, options: object): any;
        function submit(selector: string, fn: func_a, options: object): any;
        function keydown(selector: string, fn: func_a, options: object): any;
        function keyup(selector: string, fn: func_a, options: object): any;
        function keypress(selector: string, fn: func_a, options: object): any;
        function contextmenu(selector: string, fn: func_a, options: object): any;
        function touchstart(selector: string, fn: func_a, options: object): any;
        function touchend(selector: string, fn: func_a, options: object): any;
        function touchmove(selector: string, fn: func_a, options: object): any;
        function touchcancel(selector: string, fn: func_a, options: object): any;
        function hover(enter: func, out: func): any;
        function unload(fn: func_a): any;
        function beforeunload(fn: func_a): any;

        // manipulation.js
        function append(elements: any): any;
        function appendTo(elements: any): any;
        function prepend(elements: any): any;
        function prependTo(elements: any): any;
        function insertBefore(elements: any): any;
        function insertAfter(elements: any): any;
        function after(html: any): any;
        function before(html: any): any;
        function clone(deep: boolean): any;
        // function import(deep: boolean): any;
        function adopt(): any;
        function remove(selector: string): any;

        // position.js
        function offset(val: any): any;
        function position(margin: boolean): any;
        function left(val: any, margin: boolean): any;
        function top(val: any, margin: boolean): any;
        function coord(): any;
        function pos(): any;

        // prop.js
        function prop(prop: string, val: any): any;
        function val(val: any): any;
        function html(val: any): any;
        function outerHTML(val: any): any;
        function text(val: any): any;
        function innerText(val: any): any;
        function empty(): any;

        // size.js
        function height(val: any): any;
        function width(val: any): any;
        function outerWidth(val: any): any;
        function outerHeight(val: any): any;
        function padding(pseudo: string): object;
        function margin(pseudo: string): object;
        function border(pseudo: string): object;

        // visibility.js
        function hidden(val: boolean, cb: func): any;
        function hide(cb: func): any;
        function show(cb: func): any;
        function visible(mode: string, cb: func): any;
        function toggle(cb: func): any;

        // utils.js
        function items(): any[];
    }
}