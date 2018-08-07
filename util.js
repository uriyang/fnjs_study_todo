/*
* 기본 함수들
*/

const FP = {};

FP.isArray = xs => xs instanceof Array;

FP.curry = fn =>
    function f(...args) {
        return fn.length <= args.length
            ? fn(...args)
            : (...rest) => f(...args, ...rest);
    };

FP.curryr = fn =>
    function f(...args) {
        return fn.length <= args.length
            ? fn(...args)
            : (...rest) => f(...rest, ...args);
    };

FP.pipe = (...fns) => (arg) => {
    const result = fns.reduce(
        (acc, fn) => (acc._stopPipe ? acc : fn(acc)),
        arg
    );
    return result._stopPipe ? result.value : result;
};
FP.go = (arg, ...fns) => FP.pipe(...fns)(arg);

FP.isFunction = v => typeof v === 'function';

FP.map = FP.curryr((xs, predi) => [...xs].map(predi));
FP.each = FP.curryr((xs, predi) => [...xs].forEach(predi));
FP.find = FP.curryr((xs, predi) => {
    for (const x of xs) {
        if (predi(x)) return x;
    }
    return null;
});
FP.reduce = FP.curryr((xs, predi, init) => [...xs].reduce(predi, init));
FP.ifElse = (predi, func, alter) => (...params) => {
    const fn = flag =>
        flag
            ? FP.isFunction(func)
                ? func(...params)
                : func
            : FP.isFunction(alter)
                ? alter(...params)
                : alter;

    const flag = FP.isFunction(predi) ? predi(...params) : predi;
    if (flag && flag instanceof Promise) {
        return flag.then(fn);
    }
    return fn(flag);
};
FP.elseIf = (predi, alter, func) => FP.ifElse(predi, func, alter);
FP.val = FP.curryr((obj, key) => obj[key]);

/*
* Element 관련 함수
*/

const El = function getEl(selector, parent = document) {
    return parent.querySelectorAll(selector);
};

El.create = (tagName, option) => {
    const el = document.createElement(tagName);

    Object.entries(option).forEach(([key, val]) => {
        if (key === 'class') {
            el.classList = FP.isArray(val) ? val.join(' ') : val;
        } else {
            el[key] = val;
        }
    });

    return el;
};

El.delete = (el) => {
    el.parentNode.removeChild(el);

    return true;
};

El.update = (el, option) => {
    Object.entries(option).forEach(([key, val]) => {
        if (key === 'class') {
            el.classList = FP.isArray(val) ? val.join(' ') : val;
        } else {
            el[key] = val;
        }
    });

    return el;
};

El.addClass = (el, val) => {
    el.classList.add(val);
    return el;
};

El.removeClass = (el, val) => {
    el.classList.remove(val);
    return el;
};

El.hasClass = (el, val) => el.classList.contains(val);

El.getClasses = (el, val) => [...el.classList];

El.appendChild = FP.curry((parent, child) => {
    parent.appendChild(child);
    return child;
});

El.attachEvent = FP.curryr((el, name, listener) => {
    el.addEventListener(name, listener);
    return el;
});
