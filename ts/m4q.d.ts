declare module M4Q {
    type PromiseConstructor = new (executor: (resolve: (value?: any) => void, reject?: (error?: any) => void) => any) => Promise<any>;

    //region src/ajax.js
    interface AjaxOptions<T> {
        url: string;
        method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | string;
        async?: boolean;
        data?: T;
        timeout?: number;
        withCredentials?: boolean;
        headers?: { [header: string]: string };
        returnValue?: 'xhr' | 'response';
        parseJson?: boolean;

        onLoad?(event: XMLHttpRequestEventMap['load'], xhr: XMLHttpRequest): void;

        onFail?(event: XMLHttpRequestEventMap['load'], xhr: XMLHttpRequest): void;

        onSuccess?(event: XMLHttpRequestEventMap['load'], xhr: XMLHttpRequest): void;

        onState?(event: XMLHttpRequestEventMap['readystatechange'], xhr: XMLHttpRequest): void;

        onError?(event: XMLHttpRequestEventMap['error'], xhr: XMLHttpRequest): void;

        onTimeout?(event: XMLHttpRequestEventMap['timeout'], xhr: XMLHttpRequest): void;

        onProgress?(event: XMLHttpRequestEventMap['progress'], xhr: XMLHttpRequest): void;

        onLoadstart?(event: XMLHttpRequestEventMap['loadstart'], xhr: XMLHttpRequest): void;

        onLoadend?(event: XMLHttpRequestEventMap['loadend'], xhr: XMLHttpRequest): void;

        onAbort?(event: XMLHttpRequestEventMap['abort'], xhr: XMLHttpRequest): void;
    }

    //endregion

    //region src/animation.js
    type EaseFunc = (number) => number;
    type DrawFunc = (time: number, pos: number) => void;
    type TransformProps =
        'translateX'
        | 'translateY'
        | 'translateZ'
        | 'rotate'
        | 'rotateX'
        | 'rotateY'
        | 'rotateZ'
        | 'scale'
        | 'scaleX'
        | 'scaleY'
        | 'scaleZ'
        | 'skew'
        | 'skewX'
        | 'skewY';
    type NumberProps = 'opacity' | 'zIndex';
    type FloatProps = 'opacity' | 'volume';
    type ScrollProps = 'scrollLeft' | 'scrollTop';
    type ReverseProps = 'opacity' | 'volume';
    type AnimatableProps = TransformProps | NumberProps | FloatProps | ScrollProps | ReverseProps;

    interface Easing {
        linear(): EaseFunc;

        easeInQuad(): EaseFunc;

        easeOutQuad(): EaseFunc;

        easeInOutQuad(): EaseFunc;

        easeInCubic(): EaseFunc;

        easeOutCubic(): EaseFunc;

        easeInOutCubic(): EaseFunc;

        easeInQuart(): EaseFunc;

        easeOutQuart(): EaseFunc;

        easeInOutQuart(): EaseFunc;

        easeInQuint(): EaseFunc;

        easeOutQuint(): EaseFunc;

        easeInOutQuint(): EaseFunc;

        easeInSine(): EaseFunc;

        easeOutSine(): EaseFunc;

        easeInOutSine(): EaseFunc;

        easeInExpo(): EaseFunc;

        easeOutExpo(): EaseFunc;

        easeInOutExpo(): EaseFunc;

        easeInCirc(): EaseFunc;

        easeOutCirc(): EaseFunc;

        easeInOutCirc(): EaseFunc;

        easeInElastic(amplitude?: number, period?: number): EaseFunc;

        easeOutElastic(amplitude?: number, period?: number): EaseFunc;

        easeInOutElastic(amplitude?: number, period?: number): EaseFunc;

        easeInBack(): EaseFunc;

        easeOutBack(): EaseFunc;

        easeInOutBack(): EaseFunc;

        easeInBounce(): EaseFunc;

        easeOutBounce(): EaseFunc;

        easeInOutBounce(): EaseFunc;
    }

    type AnimationDraw = {
        [prop in AnimatableProps]?: string | number;
    };

    //endregion

    //region src/data.js
    class Data {
        static uid: number;
        expando: string;

        cache<T>(owner: T): { [key: string]: any };

        set<T>(owner: T, key: string, value: any): { [key: string]: any };

        set<T>(owner: T, data: { [key: string]: any }): { [key: string]: any };

        get<T, D>(owner: T, key: string): D;

        get<T>(owner: T): { [key: string]: any };

        access<T>(owner: T, key: string, data: any): void;

        access<T>(owner: T, key?: string);

        access<T>(owner: T): { [key: string]: any };

        remove<T>(owner: T, key?: string): boolean;

        hasData<T>(owner: T): boolean;
    }

    //endregion

    //region src/each.js
    type Loopable<T> = { [key in string | number]: T };
    //endregion

    //region src/events.js
    interface EventObject {
        el: EventTarget;
        event: Event;
        handler: EventHandlerNonNull;
        selector: string;
        ns: string;
        id: number;
        options: AddEventListenerOptions | false;
    }

    interface EventHandlerSetter<E extends keyof WindowEventMap, T> {
        (handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;

        (selector: string, handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;
    }

    //endregion

    //region src/interval.js
    interface IntervalObject {
        id: number;
        fn: Function;
        interval: number;
        lastTime: Date;
    }

    //endregion

    //region src/manipulation.js
    type Manipulatable = string | Node | ArrayLike<Node>;

    //endregion

    //region src/position.js
    interface Position {
        top: number;
        left: number;
    }

    //endregion

    //region src/size.js
    interface Rect extends Position {
        right: number;
        bottom: number;
    }

    //endregion

    interface M4Q {
        //region src/core.js
        version: string;
        prototype: M4QObject<any>;
        fn: M4QObject<any>;

        //region extend(...any: any): any;
        extend<T1>(t1: T1): M4Q & T1;

        extend<T1, T2>(t1: T1, t2: T2): T1 & T2;

        extend<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;

        extend<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;

        extend<T1, T2, T3, T4, T5>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, ...t: any): T1 & T2 & T3 & T4 & T5 & any;

        //endregion
        //region assign(target: any, ...any: any): any;
        assign<T1, T2>(t1: T1, t2: T2): T1 & T2;

        assign<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;

        assign<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;

        assign<T1, T2, T3, T4, T5>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, ...t: any): T1 & T2 & T3 & T4 & T5 & any;

        //endregion
        //endregion

        //region src/ajax.js
        ajax<TResponse>(request: string | AjaxOptions<any>): Promise<TResponse>;

        ajax<TResponse, TBody>(request: string | AjaxOptions<TBody>): Promise<TResponse>;

        get<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        post<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        put<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        patch<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        delete<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        json<TResponse, TBody>(url: string, data?: TBody, options?: AjaxOptions<TBody>): Promise<TResponse>;

        //endregion

        //region src/animation.js
        easing: { default: Easing[keyof Easing]; } & Easing;

        animate(element: string | HTMLElement, draw: AnimationDraw | DrawFunc, duration: number, timing: keyof Easing, callback?: () => void): Promise<void>;

        animate(element: string | HTMLElement, draw: AnimationDraw | DrawFunc, duration: number, callback?: () => void): Promise<void>;

        animate(element: string | HTMLElement, draw: AnimationDraw | DrawFunc, callback?: () => void): Promise<void>;

        stop(id: number, done?: boolean); // no documentation

        chain(arr: any[], loop?: boolean); // no documentation
        //endregion

        //region src/attr.js
        /**
         * Get meta
         * @param name
         */
        meta(name?: string): M4QObject<HTMLMetaElement>;

        /**
         * Meta by attribute
         *
         * NOTE: The actual implementation is different with documentation
         * @param prop
         */
        metaBy(prop?: string): M4QObject<HTMLMetaElement>;

        /**
         * Get page <code>DOCTYPE</code> element
         */
        doctype(): M4QObject<DocumentType>;

        /**
         * Get page <code>html</code> element
         */
        html(): M4QObject<HTMLHtmlElement>;

        /**
         * Get document <code>head</code> element
         */
        head(): M4QObject<HTMLHeadElement>;

        /**
         * Get document object
         */
        document(): M4QObject<Document>;

        /**
         * Get window object
         */
        window(): M4QObject<Window>;

        /**
         * Get page <code>body</code> element
         */
        body(): M4QObject<HTMLBodyElement>;

        /**
         * Get or set charset
         * @param charset
         */
        charset(charset?: string): string | undefined;

        //endregion

        //region src/data.js
        hasData<T>(owner: T): boolean;

        data<T>(owner: T, key: string, data: any): void;

        data<T>(owner: T, key?: string);

        data<T>(owner: T): { [key: string]: any };

        removeData<T>(owner: T, key?: string): boolean;

        dataSet<T>(owner: T): Data;

        //endregion

        //region src/each.js
        each<T extends Loopable<E>, E>(target: T, callback: (this: E, key: keyof E, el: E, index: number) => void): T;

        //endregion

        //region src/effects.js
        fx: {
            off: boolean;
        }
        //endregion

        //region src/events.js
        events: Event[];
        eventHooks: { [hook: string]: EventHandlerNonNull };
        eventUID: number;

        setEventHandler(obj: EventObject): number;

        getEventHandler(index: number): EventHandlerNonNull | undefined;

        off();

        getEvents(): EventObject[];

        getEventHooks(): { [hook: string]: EventHandlerNonNull };

        addEventHook(event: Event, handler: EventHandlerNonNull, type: 'before' | 'after'): M4Q;

        removeEventHook(event: Event, type: 'before' | 'after'): M4Q;

        removeEventHooks(event: Event): M4Q;

        ready(handler: (event: Event) => any, options?: AddEventListenerOptions): void;

        load(handler: (event: Event) => any): M4QObject<Window>;

        unload(handler: (event: Event) => any): M4QObject<Window>;

        beforeunload(handler: (event: Event) => any): M4QObject<Window>;

        //endregion

        //region src/init.js

        init: {
            new<T extends Node | Window>(selector: string): M4QObject<T>;
            new<T extends Node | Window>(tag: string, attributes?: { [name: string]: any }): M4QObject<T>;
            new<T extends Node | Window>(element: T | ArrayLike<T>): M4QObject<T>;
        }

        <T extends Node | Window>(selector: string): M4QObject<T>;

        <T extends Node | Window>(tag: string, attributes?: { [name: string]: any }): M4QObject<T>;

        <T extends Node | Window>(element: T | ArrayLike<T>): M4QObject<T>;

        //endregion

        //region src/interval.js
        intervalId: number;
        intervalQueue: IntervalObject[];
        intervalTicking: boolean;
        intervalTickId: null | number;

        setInterval(handler: Function, n: number): number;

        clearInterval(id: number);

        setTimeout(handler: Function, n: number): number;

        clearTimeout(id: number);

        //endregion

        //region src/parser.js
        parseHTML(html: string, context?: { [name: string]: any }): Node[];

        //endregion

        //region src/populate.js

        Promise: PromiseConstructor;

        noConflict();

        global();

        //endregion

        //region src/proxy.js
        proxy(fn: Function, thisArg: any): Function;

        bind(fn: Function, thisArg: any): Function;

        //endregion

        //region src/script.js
        script(element?: Node | M4QObject<any>);

        //endregion

        //region src/utils.js
        uniqueId(prefix?: string): string;

        toArray<T>(arrayLike: ArrayLike<T>): T[];

        import<T>(subject: Loopable<T>): M4QObject<T>;

        merge<T extends ArrayLike<any>>(subject: T, target: ArrayLike<any>): T;

        type(subject: any): string;

        sleep(milliseconds: number);

        isSelector(subject: string): boolean;

        remove<T extends Node>(subject: T | ArrayLike<T>): M4QObject<T>;

        remove<T>(selector: string): M4QObject<T>;

        camelCase(subject: string): string;

        dashedName(subject: string): string;

        isPlainObject(subject: any): boolean;

        isEmptyObject(subject: any): boolean;

        isArrayLike(subject: any): boolean;

        acceptData(owner: Node): boolean;

        not(subject: any): boolean;

        parseUnit(subject: string, out?: [number?, string?]): [number, string];

        getUnit(subject: string, def?: string): string;

        unit(subject: string, out?: [number?, string?]): [number, string];

        isVisible(element: HTMLElement): boolean;

        isHidden(element: HTMLElement): boolean;

        matches(element: HTMLElement, selector: string): boolean;

        random(from: number, to: number): number;

        random<T>(sample: ArrayLike<T>): T;

        strip(subject: string, toStrip: string): string;

        normName(subject: string): string;

        hasProp(subject: any, prop: string);

        serializeToArray(form: HTMLFormElement): string[];

        serialize(form: HTMLFormElement): string;

        //endregion

        //region src/visibility.js
        hidden<T extends HTMLElement>(element: T, hidden: boolean, callback?: (this: T, element?: T, hidden?: boolean, callback?: Function) => any): M4Q;

        hidden<T extends HTMLElement>(element: T, callback?: (this: T, element?: T, callback?: Function) => any): M4Q;

        hide<T extends HTMLElement>(element: T, callback?: (this: T, element?: T, callback?: Function) => any): M4Q;

        show<T extends HTMLElement>(element: T, callback?: (this: T, element?: T, callback?: Function) => any): M4Q;

        visible<T extends HTMLElement>(element: T, mode: boolean, callback?: (this: T, element?: T, mode?: boolean, callback?: Function) => any): M4Q;

        visible<T extends HTMLElement>(element: T, callback?: (this: T, element?: T, callback?: Function) => any): M4Q;

        toggle<T extends HTMLElement>(element: T, callback?: (this: T, element?: T, callback?: Function) => any): M4Q;

        //endregion
    }

    interface M4QObject<T> extends ArrayLike<T> {
        //region src/core.js
        uid: string;
        push: Array<any>['push'];
        sort: Array<any>['sort'];
        splice: Array<any>['splice'];
        indexOf: Array<any>['indexOf'];
        reverse: Array<any>['reverse'];

        //region extend(...any: any): any;
        extend<T1>(t1: T1): M4QObject<T> & T1;

        extend<T1, T2>(t1: T1, t2: T2): T1 & T2;

        extend<T1, T2, T3>(t1: T1, t2: T2, t3: T3): T1 & T2 & T3;

        extend<T1, T2, T3, T4>(t1: T1, t2: T2, t3: T3, t4: T4): T1 & T2 & T3 & T4;

        extend<T1, T2, T3, T4, T5>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, ...t: any): T1 & T2 & T3 & T4 & T5 & any;

        //endregion
        //endregion

        //region src/animation.js
        animate(draw: AnimationDraw | DrawFunc, duration: number, timing: keyof Easing, callback?: () => void): Promise<void>;

        animate(draw: AnimationDraw | DrawFunc, duration: number, callback?: () => void): Promise<void>;

        animate(draw: AnimationDraw | DrawFunc, callback: () => void): Promise<void>;

        stop(done: boolean): void;

        chain(arr: any[], loop?: boolean); // no documentation
        //endregion

        //region src/attr.js
        /**
         * Get all attributes
         */
        attr(): { [name: string]: string };

        /**
         * Get attribute by name
         * @param name
         */
        attr(name: string): string;

        /**
         * Set attribute by name
         * @param name
         * @param val
         */
        attr(name: string, val: string): M4QObject<T>;

        /**
         * Set attributes
         * @param attrs
         */
        attr(attrs: { [name: string]: string }): M4QObject<T>;

        /**
         * Remove all attributes
         */
        removeAttr(): M4QObject<T>;

        /**
         * Remove attribute by name
         * @param name
         */
        removeAttr(name: string): M4QObject<T>;

        /**
         * Remove or set attribute by name.
         * @param name
         * @param val
         */
        toggleAttr(name: string, val: string): M4QObject<T>;

        /**
         * Get id of first element
         */
        id(): string | undefined;

        /**
         * Set the id of first element
         *
         * NOTE: Base on the code, it does return undefined
         * when no elements in list, please aware.
         * @param val
         */
        id(val: string): M4QObject<T> | undefined;

        //endregion

        //region src/classes.js
        /**
         * @see hasClass
         * @param klass
         */
        containsClass(klass: string): boolean;

        /**
         * Determine whether any of the matched elements are assigned the given class.
         * @param klass
         */
        hasClass(klass: string): boolean;

        /**
         * Clear all classes
         */
        clearClasses(): M4QObject<T>;

        /**
         * Get classes list
         * @param array
         */
        cls(array?: false): string | undefined;

        /**
         * Get classes list as array
         * @param array
         */
        cls(array: true): string[] | undefined;

        /**
         * Remove single class by name
         * @param name
         */
        removeClassBy(name: string): M4QObject<T>;

        /**
         * Adds the specified class(es) to each element in the set of matched elements.
         * @param classes
         */
        addClass(classes: string): M4QObject<T>;

        /**
         * Remove the specified class(es) from each element in the set of matched elements.
         * @param classes
         */
        removeClass(classes: string): M4QObject<T>;

        /**
         * Add or remove the specified class(es) from/for each element in the set of matched elements.
         * @param classes
         */
        toggleClass(classes: string): M4QObject<T>;

        //endregion

        //region src/contains.js
        /**
         * Return value is an integer indicating the position of the first element.
         * @param selector
         */
        index(selector: string | M4QObject<any>): number;

        /**
         * @see items
         */
        get(): T[];

        /**
         * Return element as HTMLElement by index. When index is negative,
         * function return element from end of array of elements
         * @param index
         */
        get(index: number): T;

        /**
         * Reduce the set of matched elements to the one at the specified index.
         * @param index
         */
        eq(index: number): M4QObject<T>;

        /**
         * Check the current matched set of elements against a selector, element,
         * or m4q object and return true if at least one of these elements matches
         * the given arguments. Also, for selectors: <code>:selected</code>,
         * <code>:checked</code> and <code>:hidden</code> return true, if first
         * element in set matches to it.
         * @param selector
         */
        is(selector: string | HTMLElement | M4QObject<any>): boolean;

        /**
         * Checks the current matched set of elements with the m4q object and return
         * true if matched set equivalent to checked object.
         * @param other
         */
        same(other: M4QObject<any>): boolean;

        /**
         * Reduce the set of matched elements to the first element in set.
         */
        last(): M4QObject<T>;

        /**
         * Reduce the set of matched elements to the last element in set.
         */
        first(): M4QObject<T>;

        /**
         * Reduce the set of matched elements to elements with odd index.
         */
        odd(): M4QObject<T>;

        /**
         * Reduce the set of matched elements to elements with even index.
         */
        even(): M4QObject<T>;

        /**
         * Reduce the set of matched elements to those that match the selector.
         * @param selector
         */
        filter(selector: string): M4QObject<T>;

        /**
         * Reduce the set of matched elements to those that match the predicate function.
         * @param predicate
         */
        filter(predicate: (el: T, index: number) => boolean): M4QObject<T>;

        /**
         * Get the descendants of each element in the current set of matched elements, filtered by a selector.
         * @param selector
         */
        find<E>(selector: string): M4QObject<E>;

        /**
         * Return true, if m4q object contains elements filtered by selector.
         * @param selector
         */
        contains(selector: string): boolean;

        /**
         * Get the children of each element in the set of matched elements, optionally filtered by a selector.
         * @param selector
         */
        children<E>(selector?: string): M4QObject<E>;

        /**
         * Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
         * @param selector
         */
        parent<E>(selector?: string): M4QObject<E>;

        /**
         * Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.
         * @param selector
         */
        parents<E>(selector?: string): M4QObject<E>;

        /**
         * Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
         * @param selector
         */
        siblings<E>(selector?: string): M4QObject<E>;

        /**
         * Get the immediately preceding sibling of each element in the set of matched elements. If a selector is
         * provided, it retrieves the previous sibling only if it matches that selector.
         */
        prev<E>(selector?: string): M4QObject<E>;

        /**
         * Get the immediately following sibling of each element in the set of matched elements. If a selector is
         * provided, it retrieves the next sibling only if it matches that selector.
         * @param selector
         */
        next<E>(selector?: string): M4QObject<E>;

        /**
         * Get the preceding sibling of each element in the set of matched elements. If a selector is provided, it
         * retrieves the sibling only if it matches that selector.
         * @param selector
         */
        prevAll<E>(selector?: string): M4QObject<E>;

        /**
         * Get the following sibling of each element in the set of matched elements. If a selector is provided, it
         * retrieves the sibling only if it matches that selector.
         * @param selector
         */
        nextAll<E>(selector?: string): M4QObject<E>;

        /**
         * For each element in the set, get the first element that matches the selector by testing the element itself
         * and traversing up through its ancestors in the DOM tree.
         * @param selector
         */
        closest<E>(selector: string): M4QObject<E>;

        /**
         * Reduce the set of matched elements to those having children match the selector.
         * @param selector
         */
        has(selector: string): M4QObject<T>;

        /**
         * Back to the root of query
         * @param toStart
         */
        back(toStart?: boolean): M4QObject<T>;

        //endregion

        //region src/css.js
        style(): CSSStyleDeclaration;

        style(name: string): string | { [name: string]: string };

        css(): CSSStyleDeclaration;

        css(name: string): string | { [name: string]: string };

        css(name: string, val: string): M4QObject<T>;

        css(style: { [name: string]: string }): M4QObject<T>;

        removeStyleProperty(name: string): M4QObject<T>;

        scrollTop(): number;

        scrollTop(val: number): M4QObject<T>;

        scrollLeft(): number;

        scrollLeft(val: number): M4QObject<T>;

        //endregion

        //region src/data.js
        data(key: string, data: any): M4QObject<T>;

        data<D>(key: string): D;

        data(): { [key: string]: any };

        removeData(key?: string): M4QObject<T>;

        origin(): { [key: string]: any };

        origin<D>(name: string, val?: undefined | null, def?: D): D;

        origin(name: string, val: NonNullable<any>): M4QObject<T>;

        //endregion

        //region src/each.js
        each(callback: (this: T, key: number, el: T, index: number) => void): M4QObject<T>;

        //endregion

        //region src/effects.js
        fadeIn(callback?: (this: M4QObject<T>) => void);

        fadeIn(duration: number, callback?: (this: M4QObject<T>) => void);

        fadeIn(duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        fadeOut(callback?: (this: M4QObject<T>) => void);

        fadeOut(duration: number, callback?: (this: M4QObject<T>) => void);

        fadeOut(duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        slideUp(callback?: (this: M4QObject<T>) => void);

        slideUp(duration: number, callback?: (this: M4QObject<T>) => void);

        slideUp(duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        slideDown(callback?: (this: M4QObject<T>) => void);

        slideDown(duration: number, callback?: (this: M4QObject<T>) => void);

        slideDown(duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        centerTo(x: number, y: number, callback?: (this: M4QObject<T>) => void);

        centerTo(x: number, y: number, duration: number, callback?: (this: M4QObject<T>) => void);

        centerTo(x: number, y: number, duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        colorTo(color: string, callback?: (this: M4QObject<T>) => void);

        colorTo(color: string, duration: number, callback?: (this: M4QObject<T>) => void);

        colorTo(color: string, duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        backgroundTo(color: string, callback?: (this: M4QObject<T>) => void);

        backgroundTo(color: string, duration: number, callback?: (this: M4QObject<T>) => void);

        backgroundTo(color: string, duration: number, easing: keyof Easing, callback?: (this: M4QObject<T>) => void);

        //endregion

        //region src/events.js
        on<E extends keyof WindowEventMap>(event: E, handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;

        on<E extends keyof WindowEventMap>(event: E, selector: string, handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;

        on<E extends Event>(event: string, handler: (event: E) => any, options?: AddEventListenerOptions): M4QObject<T>;

        on<E extends Event>(event: string, selector: string, handler: (event: T) => any, options?: AddEventListenerOptions): M4QObject<T>;

        one<E extends keyof WindowEventMap>(event: E, handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;

        one<E extends keyof WindowEventMap>(event: E, selector: string, handler: (event: WindowEventMap[E]) => any, options?: AddEventListenerOptions): M4QObject<T>;

        one<E extends Event>(event: string, handler: (event: E) => any, options?: AddEventListenerOptions): M4QObject<T>;

        one<E extends Event>(event: string, selector: string, handler: (event: E) => any, options?: AddEventListenerOptions): M4QObject<T>;

        off(event: string, options?: AddEventListenerOptions): M4QObject<T>;

        off(event: string, selector: string, options?: AddEventListenerOptions): M4QObject<T>;

        trigger(name: string, data?: any): M4QObject<T>;

        fire(name: string, data?: any): M4QObject<T>;

        blur: EventHandlerSetter<'blur', T>;
        focus: EventHandlerSetter<'focus', T>;
        resize: EventHandlerSetter<'resize', T>;
        scroll: EventHandlerSetter<'scroll', T>;
        click: EventHandlerSetter<'click', T>;
        dblclick: EventHandlerSetter<'dblclick', T>;
        mousedown: EventHandlerSetter<'mousedown', T>;
        mouseup: EventHandlerSetter<'mouseup', T>;
        mousemove: EventHandlerSetter<'mousemove', T>;
        mouseover: EventHandlerSetter<'mouseover', T>;
        mouseout: EventHandlerSetter<'mouseout', T>;
        mouseenter: EventHandlerSetter<'mouseenter', T>;
        mouseleave: EventHandlerSetter<'mouseleave', T>;
        change: EventHandlerSetter<'change', T>;
        select: EventHandlerSetter<'select', T>;
        submit: EventHandlerSetter<'submit', T>;
        keydown: EventHandlerSetter<'keydown', T>;
        keypress: EventHandlerSetter<'keypress', T>;
        keyup: EventHandlerSetter<'keyup', T>;
        contextmenu: EventHandlerSetter<'contextmenu', T>;
        touchstart: EventHandlerSetter<'touchstart', T>;
        touchend: EventHandlerSetter<'touchend', T>;
        touchmove: EventHandlerSetter<'touchmove', T>;
        touchcancel: EventHandlerSetter<'touchcancel', T>;

        hover(mouseIn: (event: MouseEvent) => any, mouseOut?: (event: MouseEvent) => any): M4QObject<T>;

        ready(handler: (event: Event) => any, options?: AddEventListenerOptions): void;

        unload(handler: (event: Event) => any): M4QObject<Window>;

        beforeunload(handler: (event: Event) => any): M4QObject<Window>;

        //endregion

        //region src/manipulation.js
        append(elements: Manipulatable): M4QObject<T>;

        appendTo(elements: Manipulatable): M4QObject<T>;

        prepend(elements: Manipulatable): M4QObject<T>;

        prependTo(elements: Manipulatable): M4QObject<T>;

        insertBefore(elements: Manipulatable): M4QObject<T>;

        insertAfter(elements: Manipulatable): M4QObject<T>;

        after(html: Manipulatable): M4QObject<T>;

        before(html: Manipulatable): M4QObject<T>;

        clone(deep?: boolean, data?: { [key: string]: any }): M4QObject<T>;

        clone(data: { [key: string]: any }): M4QObject<T>;

        import(deep?: boolean): M4QObject<T>;

        adopt(): M4QObject<T>;

        remove(selector?: string): M4QObject<T>;

        wrap(elements: Manipulatable): M4QObject<T>;

        wrapAll(elements: Manipulatable): M4QObject<T>;

        wrapInner(elements: Manipulatable): M4QObject<T>;

        //endregion

        //region src/position.js
        offset(): Position;

        offset(offset: Position): M4QObject<T>;

        position(margin?: boolean): Position | undefined;

        left(left: number): M4QObject<T>;

        left(): number;

        top(top: number): M4QObject<T>;

        top(): number;

        coord(): DOMRect | undefined;

        pos(): Position | undefined;

        //endregion

        //region src/prop.js
        prop(prop: string): any;

        prop(prop: string, value: any): M4QObject<T>;

        val(): string;

        val(value: any): M4QObject<T>;

        html(): string | undefined;

        html(value: any): M4QObject<T>;

        outerHtml(): string | undefined;

        text(): string | undefined;

        text(value: any): M4QObject<T>;

        innerText(): string | undefined;

        innerText(value: any): M4QObject<T>;

        empty(): M4QObject<T>;

        clear(): M4QObject<T>;

        //endregion

        //region src/script.js
        script(): M4QObject<T>;

        //endregion

        //region src/size.js
        height(): number;

        height(value: number): M4QObject<T>;

        width(): number;

        width(value: number): M4QObject<T>;

        outerHeight(): number;

        outerHeight(value: number): M4QObject<T>;

        outerWidth(): number;

        outerWidth(value: number): M4QObject<T>;

        padding(pseudo?: string): Rect;

        margin(pseudo?: string): Rect;

        border(pseudo?: string): Rect;

        //endregion

        //region src/utils.js
        items(): T[];

        //endregion

        //region src/visibility.js
        hide(): M4QObject<T>;

        show(): M4QObject<T>;

        hidden(hidden: boolean, callback?: (this: T, element?: T, hidden?: boolean, callback?: Function) => any): M4QObject<T>;

        hidden(callback?: (this: T, element?: T, callback?: Function) => any): M4QObject<T>;

        visible(mode: boolean, callback?: (this: T, element?: T, mode?: boolean, callback?: Function) => any): M4QObject<T>;

        visible(callback?: (this: T, element?: T, callback?: Function) => any): M4QObject<T>;

        toggle(callback?: (this: T, element?: T, callback?: Function) => any): M4QObject<T>;

        //endregion
    }
}

//region src/events.js
interface Event {
    isPropagationStopped: boolean;
    isPreventedDefault: boolean;

    stop(immediate?: boolean);
}

//endregion

//region src/populate.js
interface Window {
    m4q: M4Q.M4Q;
}

//endregion
