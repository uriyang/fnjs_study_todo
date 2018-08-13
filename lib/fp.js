export function curry(fn) {
  return function(a, b) {
    return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
  }
}

export function curryr(fn) {
  return function(a, b) {
    return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
  }
}

export var _get = curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

export function filter(list, predi) {
  var new_list = [];
  each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

export function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}

export function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');

export function each(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}

export var _map = curryr(_map),
  each = curryr(each),
  filter = curryr(filter);

export var _pairs = _map(function (val, key) { return [key, val]; });

export var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

export function reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  var fns = arguments;
  return function(arg) {
    return reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg);
  }
}

export function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

var _values = _map(_identity);

export function _identity(val) {
  return val;
}

export var _pluck = curryr(function(data, key) {
  return _map(data, _get(key));
});

export function _negate(func) {
  return function(val) {
    return !func(val);
  }
}

export var _reject = curryr(function(data, predi) {
  return filter(data, _negate(predi));
});

export var _compact = filter(_identity);

export var _find = curryr(function(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }
});

var _find_index = curryr(function(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}


function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

var _group_by = curryr(function(data, iter) {
  return reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val);
  }, {});
});


var _inc = function(count, key) {
  count[key] ? count[key]++ : count[key] = 1;
  return count;
};

var _count_by = curryr(function(data, iter) {
  return reduce(data, function(count, val) {
    return _inc(count, iter(val));
  }, {});
});

var _head = function(list) {
  return list[0];
};
