!(function (W, et) {
  'object' == typeof exports && typeof module < 'u'
    ? (module.exports = et())
    : 'function' == typeof define && define.amd
    ? define(et)
    : ((W = typeof globalThis < 'u' ? globalThis : W || self).introJs = et());
})(this, function () {
  'use strict';
  function W(t) {
    return (W =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          })(t);
  }
  function et(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function fn(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
    return i;
  }
  var t,
    ae =
      ((t = {}),
      function (e) {
        var n =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : 'introjs-stamp';
        return (t[n] = t[n] || 0), void 0 === e[n] && (e[n] = t[n]++), e[n];
      });
  function k(t, e, n) {
    if (t) for (var i = 0, o = t.length; i < o; i++) e(t[i], i);
    'function' == typeof n && n();
  }
  var q = new (function () {
      var t = 'introjs_event';
      (this._id = function (e, n, i, o) {
        return n + ae(i) + (o ? '_'.concat(ae(o)) : '');
      }),
        (this.on = function (e, n, i, o, r) {
          var s = this._id.apply(this, arguments),
            a = function (l) {
              return i.call(o || e, l || window.event);
            };
          'addEventListener' in e
            ? e.addEventListener(n, a, r)
            : 'attachEvent' in e && e.attachEvent('on'.concat(n), a),
            (e[t] = e[t] || {}),
            (e[t][s] = a);
        }),
        (this.off = function (e, n, i, o, r) {
          var s = this._id.apply(this, arguments),
            a = e[t] && e[t][s];
          a &&
            ('removeEventListener' in e
              ? e.removeEventListener(n, a, r)
              : 'detachEvent' in e && e.detachEvent('on'.concat(n), a),
            (e[t][s] = null));
        });
    })(),
    pn =
      typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
        ? window
        : typeof global < 'u'
        ? global
        : typeof self < 'u'
        ? self
        : {};
  function dn(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  var F,
    Ot,
    Pt = function (t) {
      return t && t.Math == Math && t;
    },
    p =
      Pt('object' == typeof globalThis && globalThis) ||
      Pt('object' == typeof window && window) ||
      Pt('object' == typeof self && self) ||
      Pt('object' == typeof pn && pn) ||
      (function () {
        return this;
      })() ||
      Function('return this')(),
    w = function (t) {
      try {
        return !!t();
      } catch {
        return !0;
      }
    },
    O = !w(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1]
      );
    }),
    pt = !w(function () {
      var t = function () {}.bind();
      return 'function' != typeof t || t.hasOwnProperty('prototype');
    }),
    Rt = Function.prototype.call,
    x = pt
      ? Rt.bind(Rt)
      : function () {
          return Rt.apply(Rt, arguments);
        },
    gn = {}.propertyIsEnumerable,
    mn = Object.getOwnPropertyDescriptor,
    vn = {
      f:
        mn && !gn.call({ 1: 2 }, 1)
          ? function (t) {
              var e = mn(this, t);
              return !!e && e.enumerable;
            }
          : gn,
    },
    se = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    },
    bn = Function.prototype,
    le = bn.call,
    no = pt && bn.bind.bind(le, le),
    d = pt
      ? function (t) {
          return t && no(t);
        }
      : function (t) {
          return (
            t &&
            function () {
              return le.apply(t, arguments);
            }
          );
        },
    io = d({}.toString),
    oo = d(''.slice),
    $ = function (t) {
      return oo(io(t), 8, -1);
    },
    ce = p.Object,
    ro = d(''.split),
    Mt = w(function () {
      return !ce('z').propertyIsEnumerable(0);
    })
      ? function (t) {
          return 'String' == $(t) ? ro(t, '') : ce(t);
        }
      : ce,
    ao = p.TypeError,
    H = function (t) {
      if (null == t) throw ao("Can't call method on " + t);
      return t;
    },
    nt = function (t) {
      return Mt(H(t));
    },
    A = function (t) {
      return 'function' == typeof t;
    },
    N = function (t) {
      return 'object' == typeof t ? null !== t : A(t);
    },
    dt = function (t, e) {
      return arguments.length < 2
        ? (function (t) {
            return A(t) ? t : void 0;
          })(p[t])
        : p[t] && p[t][e];
    },
    yn = d({}.isPrototypeOf),
    it = dt('navigator', 'userAgent') || '',
    wn = p.process,
    _n = p.Deno,
    Sn = (wn && wn.versions) || (_n && _n.version),
    xn = Sn && Sn.v8;
  xn && (Ot = (F = xn.split('.'))[0] > 0 && F[0] < 4 ? 1 : +(F[0] + F[1])),
    !Ot &&
      it &&
      (!(F = it.match(/Edge\/(\d+)/)) || F[1] >= 74) &&
      (F = it.match(/Chrome\/(\d+)/)) &&
      (Ot = +F[1]);
  var ot = Ot,
    ue =
      !!Object.getOwnPropertySymbols &&
      !w(function () {
        var t = Symbol();
        return (
          !String(t) ||
          !(Object(t) instanceof Symbol) ||
          (!Symbol.sham && ot && ot < 41)
        );
      }),
    he = ue && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    lo = p.Object,
    fe = he
      ? function (t) {
          return 'symbol' == typeof t;
        }
      : function (t) {
          var e = dt('Symbol');
          return A(e) && yn(e.prototype, lo(t));
        },
    co = p.String,
    jn = function (t) {
      try {
        return co(t);
      } catch {
        return 'Object';
      }
    },
    uo = p.TypeError,
    pe = function (t) {
      if (A(t)) return t;
      throw uo(jn(t) + ' is not a function');
    },
    qt = function (t, e) {
      var n = t[e];
      return null == n ? void 0 : pe(n);
    },
    ho = p.TypeError,
    fo = Object.defineProperty,
    de = function (t, e) {
      try {
        fo(p, t, { value: e, configurable: !0, writable: !0 });
      } catch {
        p[t] = e;
      }
      return e;
    },
    Cn = '__core-js_shared__',
    G = p[Cn] || de(Cn, {}),
    ge = dn(function (t) {
      (t.exports = function (e, n) {
        return G[e] || (G[e] = void 0 !== n ? n : {});
      })('versions', []).push({
        version: '3.21.1',
        mode: 'global',
        copyright: '\xa9 2014-2022 Denis Pushkarev (zloirock.ru)',
        license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
        source: 'https://github.com/zloirock/core-js',
      });
    }),
    po = p.Object,
    K = function (t) {
      return po(H(t));
    },
    go = d({}.hasOwnProperty),
    L =
      Object.hasOwn ||
      function (t, e) {
        return go(K(t), e);
      },
    mo = 0,
    vo = Math.random(),
    bo = d((1).toString),
    An = function (t) {
      return 'Symbol(' + (void 0 === t ? '' : t) + ')_' + bo(++mo + vo, 36);
    },
    gt = ge('wks'),
    Y = p.Symbol,
    kn = Y && Y.for,
    yo = he ? Y : (Y && Y.withoutSetter) || An,
    T = function (t) {
      if (!L(gt, t) || (!ue && 'string' != typeof gt[t])) {
        var e = 'Symbol.' + t;
        gt[t] = ue && L(Y, t) ? Y[t] : he && kn ? kn(e) : yo(e);
      }
      return gt[t];
    },
    wo = p.TypeError,
    _o = T('toPrimitive'),
    Bt = function (t) {
      var e = (function (t, e) {
        if (!N(t) || fe(t)) return t;
        var n,
          i = qt(t, _o);
        if (i) {
          if (
            (void 0 === e && (e = 'default'), (n = x(i, t, e)), !N(n) || fe(n))
          )
            return n;
          throw wo("Can't convert object to primitive value");
        }
        return (
          void 0 === e && (e = 'number'),
          (function (o, r) {
            var s, a;
            if (
              ('string' === r && A((s = o.toString)) && !N((a = x(s, o)))) ||
              (A((s = o.valueOf)) && !N((a = x(s, o)))) ||
              ('string' !== r && A((s = o.toString)) && !N((a = x(s, o))))
            )
              return a;
            throw ho("Can't convert object to primitive value");
          })(t, e)
        );
      })(t, 'string');
      return fe(e) ? e : e + '';
    },
    me = p.document,
    xo = N(me) && N(me.createElement),
    ve = function (t) {
      return xo ? me.createElement(t) : {};
    },
    En =
      !O &&
      !w(function () {
        return (
          7 !=
          Object.defineProperty(ve('div'), 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    Tn = Object.getOwnPropertyDescriptor,
    In = {
      f: O
        ? Tn
        : function (t, e) {
            if (((t = nt(t)), (e = Bt(e)), En))
              try {
                return Tn(t, e);
              } catch {}
            if (L(t, e)) return se(!x(vn.f, t, e), t[e]);
          },
    },
    Nn =
      O &&
      w(function () {
        return (
          42 !=
          Object.defineProperty(function () {}, 'prototype', {
            value: 42,
            writable: !1,
          }).prototype
        );
      }),
    jo = p.String,
    Co = p.TypeError,
    E = function (t) {
      if (N(t)) return t;
      throw Co(jo(t) + ' is not an object');
    },
    Ao = p.TypeError,
    be = Object.defineProperty,
    ko = Object.getOwnPropertyDescriptor,
    mt = {
      f: O
        ? Nn
          ? function (t, e, n) {
              if (
                (E(t),
                (e = Bt(e)),
                E(n),
                'function' == typeof t &&
                  'prototype' === e &&
                  'value' in n &&
                  'writable' in n &&
                  !n.writable)
              ) {
                var i = ko(t, e);
                i &&
                  i.writable &&
                  ((t[e] = n.value),
                  (n = {
                    configurable:
                      'configurable' in n ? n.configurable : i.configurable,
                    enumerable: 'enumerable' in n ? n.enumerable : i.enumerable,
                    writable: !1,
                  }));
              }
              return be(t, e, n);
            }
          : be
        : function (t, e, n) {
            if ((E(t), (e = Bt(e)), E(n), En))
              try {
                return be(t, e, n);
              } catch {}
            if ('get' in n || 'set' in n) throw Ao('Accessors not supported');
            return 'value' in n && (t[e] = n.value), t;
          },
    },
    rt = O
      ? function (t, e, n) {
          return mt.f(t, e, se(1, n));
        }
      : function (t, e, n) {
          return (t[e] = n), t;
        },
    No = d(Function.toString);
  A(G.inspectSource) ||
    (G.inspectSource = function (t) {
      return No(t);
    });
  var Ht,
    vt,
    Dt,
    ye = G.inspectSource,
    Ln = p.WeakMap,
    Lo = A(Ln) && /native code/.test(ye(Ln)),
    On = ge('keys'),
    Pn = function (t) {
      return On[t] || (On[t] = An(t));
    },
    we = {},
    Rn = 'Object already initialized',
    _e = p.TypeError;
  if (Lo || G.state) {
    var X = G.state || (G.state = new (0, p.WeakMap)()),
      Po = d(X.get),
      Mn = d(X.has),
      Ro = d(X.set);
    (Ht = function (t, e) {
      if (Mn(X, t)) throw new _e(Rn);
      return (e.facade = t), Ro(X, t, e), e;
    }),
      (vt = function (t) {
        return Po(X, t) || {};
      }),
      (Dt = function (t) {
        return Mn(X, t);
      });
  } else {
    var at = Pn('state');
    (we[at] = !0),
      (Ht = function (t, e) {
        if (L(t, at)) throw new _e(Rn);
        return (e.facade = t), rt(t, at, e), e;
      }),
      (vt = function (t) {
        return L(t, at) ? t[at] : {};
      }),
      (Dt = function (t) {
        return L(t, at);
      });
  }
  var Se = {
      set: Ht,
      get: vt,
      has: Dt,
      enforce: function (t) {
        return Dt(t) ? vt(t) : Ht(t, {});
      },
      getterFor: function (t) {
        return function (e) {
          var n;
          if (!N(e) || (n = vt(e)).type !== t)
            throw _e('Incompatible receiver, ' + t + ' required');
          return n;
        };
      },
    },
    qn = Function.prototype,
    Mo = O && Object.getOwnPropertyDescriptor,
    xe = L(qn, 'name'),
    je = {
      EXISTS: xe,
      PROPER: xe && 'something' === function () {}.name,
      CONFIGURABLE: xe && (!O || (O && Mo(qn, 'name').configurable)),
    },
    bt = dn(function (t) {
      var e = je.CONFIGURABLE,
        n = Se.get,
        i = Se.enforce,
        o = String(String).split('String');
      (t.exports = function (r, s, a, l) {
        var c,
          u = !!l && !!l.unsafe,
          h = !!l && !!l.enumerable,
          g = !!l && !!l.noTargetGet,
          f = l && void 0 !== l.name ? l.name : s;
        A(a) &&
          ('Symbol(' === String(f).slice(0, 7) &&
            (f = '[' + String(f).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
          (!L(a, 'name') || (e && a.name !== f)) && rt(a, 'name', f),
          (c = i(a)).source ||
            (c.source = o.join('string' == typeof f ? f : ''))),
          r !== p
            ? (u ? !g && r[s] && (h = !0) : delete r[s],
              h ? (r[s] = a) : rt(r, s, a))
            : h
            ? (r[s] = a)
            : de(s, a);
      })(Function.prototype, 'toString', function () {
        return (A(this) && n(this).source) || ye(this);
      });
    }),
    qo = Math.ceil,
    Bo = Math.floor,
    yt = function (t) {
      var e = +t;
      return e != e || 0 === e ? 0 : (e > 0 ? Bo : qo)(e);
    },
    Ho = Math.max,
    Do = Math.min,
    st = function (t, e) {
      var n = yt(t);
      return n < 0 ? Ho(n + e, 0) : Do(n, e);
    },
    Fo = Math.min,
    Ft = function (t) {
      return t > 0 ? Fo(yt(t), 9007199254740991) : 0;
    },
    J = function (t) {
      return Ft(t.length);
    },
    Bn = function (t) {
      return function (e, n, i) {
        var o,
          r = nt(e),
          s = J(r),
          a = st(i, s);
        if (t && n != n) {
          for (; s > a; ) if ((o = r[a++]) != o) return !0;
        } else
          for (; s > a; a++)
            if ((t || a in r) && r[a] === n) return t || a || 0;
        return !t && -1;
      };
    },
    Hn = { includes: Bn(!0), indexOf: Bn(!1) },
    $o = Hn.indexOf,
    Dn = d([].push),
    Fn = function (t, e) {
      var n,
        i = nt(t),
        o = 0,
        r = [];
      for (n in i) !L(we, n) && L(i, n) && Dn(r, n);
      for (; e.length > o; ) L(i, (n = e[o++])) && (~$o(r, n) || Dn(r, n));
      return r;
    },
    $t = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ],
    Go = $t.concat('length', 'prototype'),
    Vo = {
      f:
        Object.getOwnPropertyNames ||
        function (t) {
          return Fn(t, Go);
        },
    },
    $n = { f: Object.getOwnPropertySymbols },
    zo = d([].concat),
    Uo =
      dt('Reflect', 'ownKeys') ||
      function (t) {
        var e = Vo.f(E(t)),
          n = $n.f;
        return n ? zo(e, n(t)) : e;
      },
    Wo = function (t, e, n) {
      for (var i = Uo(e), o = mt.f, r = In.f, s = 0; s < i.length; s++) {
        var a = i[s];
        L(t, a) || (n && L(n, a)) || o(t, a, r(e, a));
      }
    },
    Ko = /#|\.prototype\./,
    wt = function (t, e) {
      var n = Xo[Yo(t)];
      return n == Qo || (n != Jo && (A(e) ? w(e) : !!e));
    },
    Yo = (wt.normalize = function (t) {
      return String(t).replace(Ko, '.').toLowerCase();
    }),
    Xo = (wt.data = {}),
    Jo = (wt.NATIVE = 'N'),
    Qo = (wt.POLYFILL = 'P'),
    Zo = wt,
    tr = In.f,
    P = function (t, e) {
      var n,
        i,
        o,
        r,
        s,
        a = t.target,
        l = t.global,
        c = t.stat;
      if ((n = l ? p : c ? p[a] || de(a, {}) : (p[a] || {}).prototype))
        for (i in e) {
          if (
            ((r = e[i]),
            (o = t.noTargetGet ? (s = tr(n, i)) && s.value : n[i]),
            !Zo(l ? i : a + (c ? '.' : '#') + i, t.forced) && void 0 !== o)
          ) {
            if (typeof r == typeof o) continue;
            Wo(r, o);
          }
          (t.sham || (o && o.sham)) && rt(r, 'sham', !0), bt(n, i, r, t);
        }
    },
    Gn = {};
  Gn[T('toStringTag')] = 'z';
  var Gt,
    Ce = '[object z]' === String(Gn),
    er = T('toStringTag'),
    nr = p.Object,
    ir =
      'Arguments' ==
      $(
        (function () {
          return arguments;
        })()
      ),
    Ae = Ce
      ? $
      : function (t) {
          var e, n, i;
          return void 0 === t
            ? 'Undefined'
            : null === t
            ? 'Null'
            : 'string' ==
              typeof (n = (function (o, r) {
                try {
                  return o[r];
                } catch {}
              })((e = nr(t)), er))
            ? n
            : ir
            ? $(e)
            : 'Object' == (i = $(e)) && A(e.callee)
            ? 'Arguments'
            : i;
        },
    or = p.String,
    j = function (t) {
      if ('Symbol' === Ae(t))
        throw TypeError('Cannot convert a Symbol value to a string');
      return or(t);
    },
    Vn = function () {
      var t = E(this),
        e = '';
      return (
        t.global && (e += 'g'),
        t.ignoreCase && (e += 'i'),
        t.multiline && (e += 'm'),
        t.dotAll && (e += 's'),
        t.unicode && (e += 'u'),
        t.sticky && (e += 'y'),
        e
      );
    },
    ke = p.RegExp,
    Ee = w(function () {
      var t = ke('a', 'y');
      return (t.lastIndex = 2), null != t.exec('abcd');
    }),
    rr =
      Ee ||
      w(function () {
        return !ke('a', 'y').sticky;
      }),
    zn = {
      BROKEN_CARET:
        Ee ||
        w(function () {
          var t = ke('^r', 'gy');
          return (t.lastIndex = 2), null != t.exec('str');
        }),
      MISSED_STICKY: rr,
      UNSUPPORTED_Y: Ee,
    },
    Vt =
      Object.keys ||
      function (t) {
        return Fn(t, $t);
      },
    ar =
      O && !Nn
        ? Object.defineProperties
        : function (t, e) {
            E(t);
            for (var n, i = nt(e), o = Vt(e), r = o.length, s = 0; r > s; )
              mt.f(t, (n = o[s++]), i[n]);
            return t;
          },
    sr = { f: ar },
    lr = dt('document', 'documentElement'),
    Un = Pn('IE_PROTO'),
    Te = function () {},
    Wn = function (t) {
      return '<script>' + t + '</script>';
    },
    Kn = function (t) {
      t.write(Wn('')), t.close();
      var e = t.parentWindow.Object;
      return (t = null), e;
    },
    zt = function () {
      try {
        Gt = new ActiveXObject('htmlfile');
      } catch {}
      var t, e;
      zt =
        typeof document < 'u'
          ? document.domain && Gt
            ? Kn(Gt)
            : (((e = ve('iframe')).style.display = 'none'),
              lr.appendChild(e),
              (e.src = 'javascript:'),
              (t = e.contentWindow.document).open(),
              t.write(Wn('document.F=Object')),
              t.close(),
              t.F)
          : Kn(Gt);
      for (var n = $t.length; n--; ) delete zt.prototype[$t[n]];
      return zt();
    };
  we[Un] = !0;
  var Yn,
    Ie,
    Xn =
      Object.create ||
      function (t, e) {
        var n;
        return (
          null !== t
            ? ((Te.prototype = E(t)),
              (n = new Te()),
              (Te.prototype = null),
              (n[Un] = t))
            : (n = zt()),
          void 0 === e ? n : sr.f(n, e)
        );
      },
    cr = p.RegExp,
    ur = w(function () {
      var t = cr('.', 's');
      return !(t.dotAll && t.exec('\n') && 's' === t.flags);
    }),
    hr = p.RegExp,
    fr = w(function () {
      var t = hr('(?<a>b)', 'g');
      return 'b' !== t.exec('b').groups.a || 'bc' !== 'b'.replace(t, '$<a>c');
    }),
    pr = Se.get,
    dr = ge('native-string-replace', String.prototype.replace),
    Ut = RegExp.prototype.exec,
    Ne = Ut,
    gr = d(''.charAt),
    mr = d(''.indexOf),
    vr = d(''.replace),
    Le = d(''.slice),
    Oe =
      ((Ie = /b*/g),
      x(Ut, (Yn = /a/), 'a'),
      x(Ut, Ie, 'a'),
      0 !== Yn.lastIndex || 0 !== Ie.lastIndex),
    Jn = zn.BROKEN_CARET,
    Pe = void 0 !== /()??/.exec('')[1];
  (Oe || Pe || Jn || ur || fr) &&
    (Ne = function (t) {
      var e,
        n,
        i,
        o,
        r,
        s,
        a,
        l = this,
        c = pr(l),
        u = j(t),
        h = c.raw;
      if (h)
        return (
          (h.lastIndex = l.lastIndex),
          (e = x(Ne, h, u)),
          (l.lastIndex = h.lastIndex),
          e
        );
      var g = c.groups,
        f = Jn && l.sticky,
        v = x(Vn, l),
        b = l.source,
        _ = 0,
        y = u;
      if (
        (f &&
          ((v = vr(v, 'y', '')),
          -1 === mr(v, 'g') && (v += 'g'),
          (y = Le(u, l.lastIndex)),
          l.lastIndex > 0 &&
            (!l.multiline ||
              (l.multiline && '\n' !== gr(u, l.lastIndex - 1))) &&
            ((b = '(?: ' + b + ')'), (y = ' ' + y), _++),
          (n = new RegExp('^(?:' + b + ')', v))),
        Pe && (n = new RegExp('^' + b + '$(?!\\s)', v)),
        Oe && (i = l.lastIndex),
        (o = x(Ut, f ? n : l, y)),
        f
          ? o
            ? ((o.input = Le(o.input, _)),
              (o[0] = Le(o[0], _)),
              (o.index = l.lastIndex),
              (l.lastIndex += o[0].length))
            : (l.lastIndex = 0)
          : Oe && o && (l.lastIndex = l.global ? o.index + o[0].length : i),
        Pe &&
          o &&
          o.length > 1 &&
          x(dr, o[0], n, function () {
            for (r = 1; r < arguments.length - 2; r++)
              void 0 === arguments[r] && (o[r] = void 0);
          }),
        o && g)
      )
        for (o.groups = s = Xn(null), r = 0; r < g.length; r++)
          s[(a = g[r])[0]] = o[a[1]];
      return o;
    });
  var _t = Ne;
  P({ target: 'RegExp', proto: !0, forced: /./.exec !== _t }, { exec: _t });
  var br = T('species'),
    Re = RegExp.prototype,
    Me = function (t, e, n, i) {
      var o = T(t),
        r = !w(function () {
          var c = {};
          return (
            (c[o] = function () {
              return 7;
            }),
            7 != ''[t](c)
          );
        }),
        s =
          r &&
          !w(function () {
            var c = !1,
              u = /a/;
            return (
              'split' === t &&
                (((u = {}).constructor = {}),
                (u.constructor[br] = function () {
                  return u;
                }),
                (u.flags = ''),
                (u[o] = /./[o])),
              (u.exec = function () {
                return (c = !0), null;
              }),
              u[o](''),
              !c
            );
          });
      if (!r || !s || n) {
        var a = d(/./[o]),
          l = e(o, ''[t], function (c, u, h, g, f) {
            var v = d(c),
              b = u.exec;
            return b === _t || b === Re.exec
              ? r && !f
                ? { done: !0, value: a(u, h, g) }
                : { done: !0, value: v(h, u, g) }
              : { done: !1 };
          });
        bt(String.prototype, t, l[0]), bt(Re, o, l[1]);
      }
      i && rt(Re[o], 'sham', !0);
    },
    yr = d(''.charAt),
    Qn = d(''.charCodeAt),
    wr = d(''.slice),
    Zn = function (t) {
      return function (e, n) {
        var i,
          o,
          r = j(H(e)),
          s = yt(n),
          a = r.length;
        return s < 0 || s >= a
          ? t
            ? ''
            : void 0
          : (i = Qn(r, s)) < 55296 ||
            i > 56319 ||
            s + 1 === a ||
            (o = Qn(r, s + 1)) < 56320 ||
            o > 57343
          ? t
            ? yr(r, s)
            : i
          : t
          ? wr(r, s, s + 2)
          : o - 56320 + ((i - 55296) << 10) + 65536;
      };
    },
    _r = (Zn(!1), Zn(!0)),
    qe = function (t, e, n) {
      return e + (n ? _r(t, e).length : 1);
    },
    Sr = p.TypeError,
    St = function (t, e) {
      var n = t.exec;
      if (A(n)) {
        var i = x(n, t, e);
        return null !== i && E(i), i;
      }
      if ('RegExp' === $(t)) return x(_t, t, e);
      throw Sr('RegExp#exec called on incompatible receiver');
    };
  Me('match', function (t, e, n) {
    return [
      function (i) {
        var o = H(this),
          r = null == i ? void 0 : qt(i, t);
        return r ? x(r, i, o) : new RegExp(i)[t](j(o));
      },
      function (i) {
        var o = E(this),
          r = j(i),
          s = n(e, o, r);
        if (s.done) return s.value;
        if (!o.global) return St(o, r);
        var a = o.unicode;
        o.lastIndex = 0;
        for (var l, c = [], u = 0; null !== (l = St(o, r)); ) {
          var h = j(l[0]);
          (c[u] = h),
            '' === h && (o.lastIndex = qe(r, Ft(o.lastIndex), a)),
            u++;
        }
        return 0 === u ? null : c;
      },
    ];
  });
  var xt =
      Array.isArray ||
      function (t) {
        return 'Array' == $(t);
      },
    jt = function (t, e, n) {
      var i = Bt(e);
      i in t ? mt.f(t, i, se(0, n)) : (t[i] = n);
    },
    ti = function () {},
    xr = [],
    ei = dt('Reflect', 'construct'),
    Be = /^\s*(?:class|function)\b/,
    jr = d(Be.exec),
    Cr = !Be.exec(ti),
    Ct = function (t) {
      if (!A(t)) return !1;
      try {
        return ei(ti, xr, t), !0;
      } catch {
        return !1;
      }
    },
    ni = function (t) {
      if (!A(t)) return !1;
      switch (Ae(t)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction':
          return !1;
      }
      try {
        return Cr || !!jr(Be, ye(t));
      } catch {
        return !0;
      }
    };
  ni.sham = !0;
  var He =
      !ei ||
      w(function () {
        var t;
        return (
          Ct(Ct.call) ||
          !Ct(Object) ||
          !Ct(function () {
            t = !0;
          }) ||
          t
        );
      })
        ? ni
        : Ct,
    Ar = T('species'),
    ii = p.Array,
    De = function (t, e) {
      return new (xt((n = t)) &&
        ((He((i = n.constructor)) && (i === ii || xt(i.prototype))) ||
          (N(i) && null === (i = i[Ar]))) &&
        (i = void 0),
      void 0 === i ? ii : i)(0 === e ? 0 : e);
      var n, i;
    },
    kr = T('species'),
    Wt = function (t) {
      return (
        ot >= 51 ||
        !w(function () {
          var e = [];
          return (
            ((e.constructor = {})[kr] = function () {
              return { foo: 1 };
            }),
            1 !== e[t](Boolean).foo
          );
        })
      );
    },
    oi = T('isConcatSpreadable'),
    ri = 9007199254740991,
    ai = 'Maximum allowed index exceeded',
    si = p.TypeError,
    Er =
      ot >= 51 ||
      !w(function () {
        var t = [];
        return (t[oi] = !1), t.concat()[0] !== t;
      }),
    Tr = Wt('concat'),
    Ir = function (t) {
      if (!N(t)) return !1;
      var e = t[oi];
      return void 0 !== e ? !!e : xt(t);
    };
  P(
    { target: 'Array', proto: !0, forced: !Er || !Tr },
    {
      concat: function (t) {
        var e,
          n,
          i,
          o,
          r,
          s = K(this),
          a = De(s, 0),
          l = 0;
        for (e = -1, i = arguments.length; e < i; e++)
          if (Ir((r = -1 === e ? s : arguments[e]))) {
            if (l + (o = J(r)) > ri) throw si(ai);
            for (n = 0; n < o; n++, l++) n in r && jt(a, l, r[n]);
          } else {
            if (l >= ri) throw si(ai);
            jt(a, l++, r);
          }
        return (a.length = l), a;
      },
    }
  ),
    Ce ||
      bt(
        Object.prototype,
        'toString',
        Ce
          ? {}.toString
          : function () {
              return '[object ' + Ae(this) + ']';
            },
        { unsafe: !0 }
      );
  var Lr = je.PROPER,
    li = 'toString',
    Fe = RegExp.prototype,
    ci = Fe.toString,
    Or = d(Vn);
  (w(function () {
    return '/a/b' != ci.call({ source: 'a', flags: 'b' });
  }) ||
    (Lr && ci.name != li)) &&
    bt(
      RegExp.prototype,
      li,
      function () {
        var t = E(this),
          e = j(t.source),
          n = t.flags;
        return (
          '/' +
          e +
          '/' +
          j(void 0 === n && yn(Fe, t) && !('flags' in Fe) ? Or(t) : n)
        );
      },
      { unsafe: !0 }
    );
  var ui = Function.prototype,
    hi = ui.apply,
    fi = ui.call,
    pi =
      ('object' == typeof Reflect && Reflect.apply) ||
      (pt
        ? fi.bind(hi)
        : function () {
            return fi.apply(hi, arguments);
          }),
    Mr = T('match'),
    di = function (t) {
      var e;
      return N(t) && (void 0 !== (e = t[Mr]) ? !!e : 'RegExp' == $(t));
    },
    qr = p.TypeError,
    Br = T('species'),
    Dr = p.Array,
    Fr = Math.max,
    Kt = function (t, e, n) {
      for (
        var i = J(t),
          o = st(e, i),
          r = st(void 0 === n ? i : n, i),
          s = Dr(Fr(r - o, 0)),
          a = 0;
        o < r;
        o++, a++
      )
        jt(s, a, t[o]);
      return (s.length = a), s;
    },
    lt = zn.UNSUPPORTED_Y,
    gi = 4294967295,
    $r = Math.min,
    mi = [].push,
    Gr = d(/./.exec),
    ct = d(mi),
    At = d(''.slice),
    Vr = !w(function () {
      var t = /(?:)/,
        e = t.exec;
      t.exec = function () {
        return e.apply(this, arguments);
      };
      var n = 'ab'.split(t);
      return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
    });
  function B(t, e) {
    if (t instanceof SVGElement) {
      var n = t.getAttribute('class') || '';
      n.match(e) || t.setAttribute('class', ''.concat(n, ' ').concat(e));
    } else
      void 0 !== t.classList
        ? k(e.split(' '), function (i) {
            t.classList.add(i);
          })
        : t.className.match(e) || (t.className += ' '.concat(e));
  }
  function $e(t, e) {
    var n = '';
    return (
      t.currentStyle
        ? (n = t.currentStyle[e])
        : document.defaultView &&
          document.defaultView.getComputedStyle &&
          (n = document.defaultView
            .getComputedStyle(t, null)
            .getPropertyValue(e)),
      n && n.toLowerCase ? n.toLowerCase() : n
    );
  }
  function vi(t) {
    var e = t.element;
    if (this._options.scrollToElement) {
      var n = (function (i) {
        var o = window.getComputedStyle(i),
          r = 'absolute' === o.position,
          s = /(auto|scroll)/;
        if ('fixed' === o.position) return document.body;
        for (var a = i; (a = a.parentElement); )
          if (
            ((o = window.getComputedStyle(a)),
            (!r || 'static' !== o.position) &&
              s.test(o.overflow + o.overflowY + o.overflowX))
          )
            return a;
        return document.body;
      })(e);
      n !== document.body && (n.scrollTop = e.offsetTop - n.offsetTop);
    }
  }
  function Ge() {
    if (void 0 !== window.innerWidth)
      return { width: window.innerWidth, height: window.innerHeight };
    var t = document.documentElement;
    return { width: t.clientWidth, height: t.clientHeight };
  }
  function bi(t, e, n) {
    var i,
      a,
      o = e.element;
    if (
      'off' !== t &&
      this._options.scrollToElement &&
      ((i =
        'tooltip' === t
          ? n.getBoundingClientRect()
          : o.getBoundingClientRect()),
      !(
        (a = o.getBoundingClientRect()).top >= 0 &&
        a.left >= 0 &&
        a.bottom + 80 <= window.innerHeight &&
        a.right <= window.innerWidth
      ))
    ) {
      var r = Ge().height;
      i.bottom - (i.bottom - i.top) < 0 || o.clientHeight > r
        ? window.scrollBy(
            0,
            i.top - (r / 2 - i.height / 2) - this._options.scrollPadding
          )
        : window.scrollBy(
            0,
            i.top - (r / 2 - i.height / 2) + this._options.scrollPadding
          );
    }
  }
  function kt(t) {
    t.setAttribute('role', 'button'), (t.tabIndex = 0);
  }
  Me(
    'split',
    function (t, e, n) {
      var i;
      return (
        (i =
          'c' == 'abbc'.split(/(b)*/)[1] ||
          4 != 'test'.split(/(?:)/, -1).length ||
          2 != 'ab'.split(/(?:ab)*/).length ||
          4 != '.'.split(/(.?)(.?)/).length ||
          '.'.split(/()()/).length > 1 ||
          ''.split(/.?/).length
            ? function (o, r) {
                var s = j(H(this)),
                  a = void 0 === r ? gi : r >>> 0;
                if (0 === a) return [];
                if (void 0 === o) return [s];
                if (!di(o)) return x(e, s, o, a);
                for (
                  var l,
                    c,
                    u,
                    h = [],
                    f = 0,
                    v = new RegExp(
                      o.source,
                      (o.ignoreCase ? 'i' : '') +
                        (o.multiline ? 'm' : '') +
                        (o.unicode ? 'u' : '') +
                        (o.sticky ? 'y' : '') +
                        'g'
                    );
                  (l = x(_t, v, s)) &&
                  !(
                    (c = v.lastIndex) > f &&
                    (ct(h, At(s, f, l.index)),
                    l.length > 1 && l.index < s.length && pi(mi, h, Kt(l, 1)),
                    (u = l[0].length),
                    (f = c),
                    h.length >= a)
                  );

                )
                  v.lastIndex === l.index && v.lastIndex++;
                return (
                  f === s.length
                    ? (!u && Gr(v, '')) || ct(h, '')
                    : ct(h, At(s, f)),
                  h.length > a ? Kt(h, 0, a) : h
                );
              }
            : '0'.split(void 0, 0).length
            ? function (o, r) {
                return void 0 === o && 0 === r ? [] : x(e, this, o, r);
              }
            : e),
        [
          function (o, r) {
            var s = H(this),
              a = null == o ? void 0 : qt(o, t);
            return a ? x(a, o, s, r) : x(i, j(s), o, r);
          },
          function (o, r) {
            var s = E(this),
              a = j(o),
              l = n(i, s, a, r, i !== e);
            if (l.done) return l.value;
            var c = (function (t, e) {
                var n,
                  i = E(t).constructor;
                return void 0 === i || null == (n = E(i)[Br])
                  ? e
                  : (function (o) {
                      if (He(o)) return o;
                      throw qr(jn(o) + ' is not a constructor');
                    })(n);
              })(s, RegExp),
              u = s.unicode,
              g = new c(
                lt ? '^(?:' + s.source + ')' : s,
                (s.ignoreCase ? 'i' : '') +
                  (s.multiline ? 'm' : '') +
                  (s.unicode ? 'u' : '') +
                  (lt ? 'g' : 'y')
              ),
              f = void 0 === r ? gi : r >>> 0;
            if (0 === f) return [];
            if (0 === a.length) return null === St(g, a) ? [a] : [];
            for (var v = 0, b = 0, _ = []; b < a.length; ) {
              g.lastIndex = lt ? 0 : b;
              var y,
                C = St(g, lt ? At(a, b) : a);
              if (
                null === C ||
                (y = $r(Ft(g.lastIndex + (lt ? b : 0)), a.length)) === v
              )
                b = qe(a, b, u);
              else {
                if ((ct(_, At(a, v, b)), _.length === f)) return _;
                for (var S = 1; S <= C.length - 1; S++)
                  if ((ct(_, C[S]), _.length === f)) return _;
                b = v = y;
              }
            }
            return ct(_, At(a, v)), _;
          },
        ]
      );
    },
    !Vr,
    lt
  );
  var ut = Object.assign,
    yi = Object.defineProperty,
    zr = d([].concat),
    wi =
      !ut ||
      w(function () {
        if (
          O &&
          1 !==
            ut(
              { b: 1 },
              ut(
                yi({}, 'a', {
                  enumerable: !0,
                  get: function () {
                    yi(this, 'b', { value: 3, enumerable: !1 });
                  },
                }),
                { b: 2 }
              )
            ).b
        )
          return !0;
        var t = {},
          e = {},
          n = Symbol(),
          i = 'abcdefghijklmnopqrst';
        return (
          (t[n] = 7),
          i.split('').forEach(function (o) {
            e[o] = o;
          }),
          7 != ut({}, t)[n] || Vt(ut({}, e)).join('') != i
        );
      })
        ? function (t, e) {
            for (
              var n = K(t), i = arguments.length, o = 1, r = $n.f, s = vn.f;
              i > o;

            )
              for (
                var a,
                  l = Mt(arguments[o++]),
                  c = r ? zr(Vt(l), r(l)) : Vt(l),
                  u = c.length,
                  h = 0;
                u > h;

              )
                (a = c[h++]), (O && !x(s, l, a)) || (n[a] = l[a]);
            return n;
          }
        : ut;
  function Yt(t) {
    var e = t.parentNode;
    return (
      !(!e || 'HTML' === e.nodeName) && ('fixed' === $e(t, 'position') || Yt(e))
    );
  }
  function ht(t, e) {
    var n = document.body,
      i = document.documentElement,
      o = window.pageYOffset || i.scrollTop || n.scrollTop,
      r = window.pageXOffset || i.scrollLeft || n.scrollLeft;
    e = e || n;
    var s = t.getBoundingClientRect(),
      a = e.getBoundingClientRect(),
      l = $e(e, 'position'),
      c = { width: s.width, height: s.height };
    return ('body' !== e.tagName.toLowerCase() && 'relative' === l) ||
      'sticky' === l
      ? Object.assign(c, { top: s.top - a.top, left: s.left - a.left })
      : Yt(t)
      ? Object.assign(c, { top: s.top, left: s.left })
      : Object.assign(c, { top: s.top + o, left: s.left + r });
  }
  P(
    { target: 'Object', stat: !0, forced: Object.assign !== wi },
    { assign: wi }
  );
  var Ur = Math.floor,
    Ve = d(''.charAt),
    Wr = d(''.replace),
    ze = d(''.slice),
    Kr = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
    Yr = /\$([$&'`]|\d{1,2})/g,
    Xr = function (t, e, n, i, o, r) {
      var s = n + t.length,
        a = i.length,
        l = Yr;
      return (
        void 0 !== o && ((o = K(o)), (l = Kr)),
        Wr(r, l, function (c, u) {
          var h;
          switch (Ve(u, 0)) {
            case '$':
              return '$';
            case '&':
              return t;
            case '`':
              return ze(e, 0, n);
            case "'":
              return ze(e, s);
            case '<':
              h = o[ze(u, 1, -1)];
              break;
            default:
              var g = +u;
              if (0 === g) return c;
              if (g > a) {
                var f = Ur(g / 10);
                return 0 === f
                  ? c
                  : f <= a
                  ? void 0 === i[f - 1]
                    ? Ve(u, 1)
                    : i[f - 1] + Ve(u, 1)
                  : c;
              }
              h = i[g - 1];
          }
          return void 0 === h ? '' : h;
        })
      );
    },
    Ue = T('replace'),
    Jr = Math.max,
    Qr = Math.min,
    Zr = d([].concat),
    We = d([].push),
    _i = d(''.indexOf),
    Si = d(''.slice),
    ta = '$0' === 'a'.replace(/./, '$0'),
    xi = !!/./[Ue] && '' === /./[Ue]('a', '$0');
  function Ke(t, e) {
    if (t instanceof SVGElement) {
      var n = t.getAttribute('class') || '';
      t.setAttribute('class', n.replace(e, '').replace(/^\s+|\s+$/g, ''));
    } else t.className = t.className.replace(e, '').replace(/^\s+|\s+$/g, '');
  }
  function V(t, e) {
    var n = '';
    if ((t.style.cssText && (n += t.style.cssText), 'string' == typeof e))
      n += e;
    else for (var i in e) n += ''.concat(i, ':').concat(e[i], ';');
    t.style.cssText = n;
  }
  function D(t) {
    if (t) {
      if (!this._introItems[this._currentStep]) return;
      var e = this._introItems[this._currentStep],
        n = ht(e.element, this._targetElement),
        i = this._options.helperElementPadding;
      Yt(e.element)
        ? B(t, 'introjs-fixedTooltip')
        : Ke(t, 'introjs-fixedTooltip'),
        'floating' === e.position && (i = 0),
        V(t, {
          width: ''.concat(n.width + i, 'px'),
          height: ''.concat(n.height + i, 'px'),
          top: ''.concat(n.top - i / 2, 'px'),
          left: ''.concat(n.left - i / 2, 'px'),
        });
    }
  }
  Me(
    'replace',
    function (t, e, n) {
      var i = xi ? '$' : '$0';
      return [
        function (o, r) {
          var s = H(this),
            a = null == o ? void 0 : qt(o, Ue);
          return a ? x(a, o, s, r) : x(e, j(s), o, r);
        },
        function (o, r) {
          var s = E(this),
            a = j(o);
          if ('string' == typeof r && -1 === _i(r, i) && -1 === _i(r, '$<')) {
            var l = n(e, s, a, r);
            if (l.done) return l.value;
          }
          var c = A(r);
          c || (r = j(r));
          var u = s.global;
          if (u) {
            var h = s.unicode;
            s.lastIndex = 0;
          }
          for (var g = []; ; ) {
            var f = St(s, a);
            if (null === f || (We(g, f), !u)) break;
            '' === j(f[0]) && (s.lastIndex = qe(a, Ft(s.lastIndex), h));
          }
          for (var v, b = '', _ = 0, y = 0; y < g.length; y++) {
            for (
              var C = j((f = g[y])[0]),
                S = Jr(Qr(yt(f.index), a.length), 0),
                R = [],
                I = 1;
              I < f.length;
              I++
            )
              We(R, void 0 === (v = f[I]) ? v : String(v));
            var M = f.groups;
            if (c) {
              var Nt = Zr([C], R, S, a);
              void 0 !== M && We(Nt, M);
              var Lt = j(pi(r, void 0, Nt));
            } else Lt = Xr(C, a, S, R, M, r);
            S >= _ && ((b += Si(a, _, S) + Lt), (_ = S + C.length));
          }
          return b + Si(a, _);
        },
      ];
    },
    !!w(function () {
      var t = /./;
      return (
        (t.exec = function () {
          var e = [];
          return (e.groups = { a: '7' }), e;
        }),
        '7' !== ''.replace(t, '$<a>')
      );
    }) ||
      !ta ||
      xi
  );
  var Ye = T('unscopables'),
    Xe = Array.prototype;
  null == Xe[Ye] && mt.f(Xe, Ye, { configurable: !0, value: Xn(null) });
  var ea = Hn.includes;
  P(
    { target: 'Array', proto: !0 },
    {
      includes: function (t) {
        return ea(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  ),
    (Xe[Ye].includes = !0);
  var na = d([].slice),
    ia = Wt('slice'),
    oa = T('species'),
    Je = p.Array,
    ra = Math.max;
  P(
    { target: 'Array', proto: !0, forced: !ia },
    {
      slice: function (t, e) {
        var n,
          i,
          o,
          r = nt(this),
          s = J(r),
          a = st(t, s),
          l = st(void 0 === e ? s : e, s);
        if (
          xt(r) &&
          (((He((n = r.constructor)) && (n === Je || xt(n.prototype))) ||
            (N(n) && null === (n = n[oa]))) &&
            (n = void 0),
          n === Je || void 0 === n)
        )
          return na(r, a, l);
        for (
          i = new (void 0 === n ? Je : n)(ra(l - a, 0)), o = 0;
          a < l;
          a++, o++
        )
          a in r && jt(i, o, r[a]);
        return (i.length = o), i;
      },
    }
  );
  var aa = p.TypeError,
    la = T('match'),
    ca = d(''.indexOf);
  P(
    {
      target: 'String',
      proto: !0,
      forced: !(function (t) {
        var e = /./;
        try {
          '/./'[t](e);
        } catch {
          try {
            return (e[la] = !1), '/./'[t](e);
          } catch {}
        }
        return !1;
      })('includes'),
    },
    {
      includes: function (t) {
        return !!~ca(
          j(H(this)),
          j(
            (function (t) {
              if (di(t))
                throw aa("The method doesn't accept regular expressions");
              return t;
            })(t)
          ),
          arguments.length > 1 ? arguments[1] : void 0
        );
      },
    }
  );
  var Qe = function (t, e) {
      var n = [][t];
      return (
        !!n &&
        w(function () {
          n.call(
            null,
            e ||
              function () {
                return 1;
              },
            1
          );
        })
      );
    },
    ua = d([].join),
    ha = Mt != Object,
    fa = Qe('join', ',');
  P(
    { target: 'Array', proto: !0, forced: ha || !fa },
    {
      join: function (t) {
        return ua(nt(this), void 0 === t ? ',' : t);
      },
    }
  );
  var pa = d(d.bind),
    Ci = d([].push),
    z = function (t) {
      var e = 1 == t,
        n = 2 == t,
        i = 3 == t,
        o = 4 == t,
        r = 6 == t,
        s = 7 == t,
        a = 5 == t || r;
      return function (l, c, u, h) {
        for (
          var g,
            f,
            v = K(l),
            b = Mt(v),
            _ = (function (I, M) {
              return (
                pe(I),
                void 0 === M
                  ? I
                  : pt
                  ? pa(I, M)
                  : function () {
                      return I.apply(M, arguments);
                    }
              );
            })(c, u),
            y = J(b),
            C = 0,
            S = h || De,
            R = e ? S(l, y) : n || s ? S(l, 0) : void 0;
          y > C;
          C++
        )
          if ((a || C in b) && ((f = _((g = b[C]), C, v)), t))
            if (e) R[C] = f;
            else if (f)
              switch (t) {
                case 3:
                  return !0;
                case 5:
                  return g;
                case 6:
                  return C;
                case 2:
                  Ci(R, g);
              }
            else
              switch (t) {
                case 4:
                  return !1;
                case 7:
                  Ci(R, g);
              }
        return r ? -1 : i || o ? o : R;
      };
    },
    Ai = {
      forEach: z(0),
      map: z(1),
      filter: z(2),
      some: z(3),
      every: z(4),
      find: z(5),
      findIndex: z(6),
      filterReject: z(7),
    },
    da = Ai.filter;
  function Xt(t, e, n, i, o) {
    return t.left + e + n.width > i.width
      ? ((o.style.left = ''.concat(i.width - n.width - t.left, 'px')), !1)
      : ((o.style.left = ''.concat(e, 'px')), !0);
  }
  function Jt(t, e, n, i) {
    return t.left + t.width - e - n.width < 0
      ? ((i.style.left = ''.concat(-t.left, 'px')), !1)
      : ((i.style.right = ''.concat(e, 'px')), !0);
  }
  P(
    { target: 'Array', proto: !0, forced: !Wt('filter') },
    {
      filter: function (t) {
        return da(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  var ga = Wt('splice'),
    ma = p.TypeError,
    va = Math.max,
    ba = Math.min;
  function Q(t, e) {
    t.includes(e) && t.splice(t.indexOf(e), 1);
  }
  function _a(t, e, n) {
    var i = this._options.positionPrecedence.slice(),
      o = Ge(),
      r = ht(e).height + 10,
      s = ht(e).width + 20,
      a = t.getBoundingClientRect(),
      l = 'floating';
    a.bottom + r > o.height && Q(i, 'bottom'),
      a.top - r < 0 && Q(i, 'top'),
      a.right + s > o.width && Q(i, 'right'),
      a.left - s < 0 && Q(i, 'left');
    var c,
      u,
      g,
      f,
      b,
      y,
      C,
      S,
      h = -1 !== (u = (c = n || '').indexOf('-')) ? c.substr(u) : '';
    return (
      n && (n = n.split('-')[0]),
      i.length && (l = i.includes(n) ? n : i[0]),
      ['top', 'bottom'].includes(l) &&
        (l +=
          ((g = a.left),
          (b = h),
          (y = (f = s) / 2),
          (S = ['-left-aligned', '-middle-aligned', '-right-aligned']),
          (C = Math.min(o.width, window.screen.width)) - g < f &&
            Q(S, '-left-aligned'),
          (g < y || C - g < y) && Q(S, '-middle-aligned'),
          g < f && Q(S, '-right-aligned'),
          S.length ? (S.includes(b) ? b : S[0]) : '-middle-aligned')),
      l
    );
  }
  function Qt(t, e, n, i) {
    var o,
      r,
      s,
      a,
      l,
      c = '';
    if (
      ((i = i || !1),
      (e.style.top = null),
      (e.style.right = null),
      (e.style.bottom = null),
      (e.style.left = null),
      (e.style.marginLeft = null),
      (e.style.marginTop = null),
      (n.style.display = 'inherit'),
      this._introItems[this._currentStep])
    )
      switch (
        ((c =
          'string' ==
          typeof (o = this._introItems[this._currentStep]).tooltipClass
            ? o.tooltipClass
            : this._options.tooltipClass),
        (e.className = ['introjs-tooltip', c].filter(Boolean).join(' ')),
        e.setAttribute('role', 'dialog'),
        'floating' !== (l = this._introItems[this._currentStep].position) &&
          this._options.autoPosition &&
          (l = _a.call(this, t, e, l)),
        (s = ht(t)),
        (r = ht(e)),
        (a = Ge()),
        B(e, 'introjs-'.concat(l)),
        l)
      ) {
        case 'top-right-aligned':
          n.className = 'introjs-arrow bottom-right';
          var u = 0;
          Jt(s, u, r, e), (e.style.bottom = ''.concat(s.height + 20, 'px'));
          break;
        case 'top-middle-aligned':
          n.className = 'introjs-arrow bottom-middle';
          var h = s.width / 2 - r.width / 2;
          i && (h += 5),
            Jt(s, h, r, e) && ((e.style.right = null), Xt(s, h, r, a, e)),
            (e.style.bottom = ''.concat(s.height + 20, 'px'));
          break;
        case 'top-left-aligned':
        case 'top':
          (n.className = 'introjs-arrow bottom'),
            Xt(s, i ? 0 : 15, r, a, e),
            (e.style.bottom = ''.concat(s.height + 20, 'px'));
          break;
        case 'right':
          (e.style.left = ''.concat(s.width + 20, 'px')),
            s.top + r.height > a.height
              ? ((n.className = 'introjs-arrow left-bottom'),
                (e.style.top = '-'.concat(r.height - s.height - 20, 'px')))
              : (n.className = 'introjs-arrow left');
          break;
        case 'left':
          i || !0 !== this._options.showStepNumbers || (e.style.top = '15px'),
            s.top + r.height > a.height
              ? ((e.style.top = '-'.concat(r.height - s.height - 20, 'px')),
                (n.className = 'introjs-arrow right-bottom'))
              : (n.className = 'introjs-arrow right'),
            (e.style.right = ''.concat(s.width + 20, 'px'));
          break;
        case 'floating':
          (n.style.display = 'none'),
            (e.style.left = '50%'),
            (e.style.top = '50%'),
            (e.style.marginLeft = '-'.concat(r.width / 2, 'px')),
            (e.style.marginTop = '-'.concat(r.height / 2, 'px'));
          break;
        case 'bottom-right-aligned':
          (n.className = 'introjs-arrow top-right'),
            Jt(s, (u = 0), r, e),
            (e.style.top = ''.concat(s.height + 20, 'px'));
          break;
        case 'bottom-middle-aligned':
          (n.className = 'introjs-arrow top-middle'),
            (h = s.width / 2 - r.width / 2),
            i && (h += 5),
            Jt(s, h, r, e) && ((e.style.right = null), Xt(s, h, r, a, e)),
            (e.style.top = ''.concat(s.height + 20, 'px'));
          break;
        default:
          (n.className = 'introjs-arrow top'),
            Xt(s, 0, r, a, e),
            (e.style.top = ''.concat(s.height + 20, 'px'));
      }
  }
  function ki() {
    k(document.querySelectorAll('.introjs-showElement'), function (t) {
      Ke(t, /introjs-[a-zA-Z]+/g);
    });
  }
  function m(t, e) {
    var n = document.createElement(t);
    e = e || {};
    var i = /^(?:role|data-|aria-)/;
    for (var o in e) {
      var r = e[o];
      'style' === o ? V(n, r) : o.match(i) ? n.setAttribute(o, r) : (n[o] = r);
    }
    return n;
  }
  function Ei(t, e, n) {
    if (n) {
      var i = e.style.opacity || '1';
      V(e, { opacity: '0' }),
        window.setTimeout(function () {
          V(e, { opacity: i });
        }, 10);
    }
    t.appendChild(e);
  }
  function Zt() {
    return (
      (parseInt(this._currentStep + 1, 10) / this._introItems.length) * 100
    );
  }
  function Sa() {
    var t = document.querySelector('.introjs-disableInteraction');
    null === t &&
      ((t = m('div', { className: 'introjs-disableInteraction' })),
      this._targetElement.appendChild(t)),
      D.call(this, t);
  }
  function Ti(t) {
    var e = this,
      n = m('div', { className: 'introjs-bullets' });
    !1 === this._options.showBullets && (n.style.display = 'none');
    var i = m('ul');
    i.setAttribute('role', 'tablist');
    var o = function () {
      e.goToStep(this.getAttribute('data-step-number'));
    };
    return (
      k(this._introItems, function (r, s) {
        var a = r.step,
          l = m('li'),
          c = m('a');
        l.setAttribute('role', 'presentation'),
          c.setAttribute('role', 'tab'),
          (c.onclick = o),
          s === t.step - 1 && (c.className = 'active'),
          kt(c),
          (c.innerHTML = '&nbsp;'),
          c.setAttribute('data-step-number', a),
          l.appendChild(c),
          i.appendChild(l);
      }),
      n.appendChild(i),
      n
    );
  }
  function xa(t, e) {
    if (this._options.showBullets) {
      var n = document.querySelector('.introjs-bullets');
      n && n.parentNode.replaceChild(Ti.call(this, e), n);
    }
  }
  function ja(t, e) {
    this._options.showBullets &&
      ((t.querySelector('.introjs-bullets li > a.active').className = ''),
      (t.querySelector(
        '.introjs-bullets li > a[data-step-number="'.concat(e.step, '"]')
      ).className = 'active'));
  }
  function Ca() {
    var t = m('div');
    (t.className = 'introjs-progress'),
      !1 === this._options.showProgress && (t.style.display = 'none');
    var e = m('div', { className: 'introjs-progressbar' });
    return (
      this._options.progressBarAdditionalClass &&
        (e.className += ' ' + this._options.progressBarAdditionalClass),
      e.setAttribute('role', 'progress'),
      e.setAttribute('aria-valuemin', 0),
      e.setAttribute('aria-valuemax', 100),
      e.setAttribute('aria-valuenow', Zt.call(this)),
      (e.style.cssText = 'width:'.concat(Zt.call(this), '%;')),
      t.appendChild(e),
      t
    );
  }
  function Ii(t) {
    (t.querySelector('.introjs-progress .introjs-progressbar').style.cssText =
      'width:'.concat(Zt.call(this), '%;')),
      t
        .querySelector('.introjs-progress .introjs-progressbar')
        .setAttribute('aria-valuenow', Zt.call(this));
  }
  function Ni(t) {
    var e = this;
    void 0 !== this._introChangeCallback &&
      this._introChangeCallback.call(this, t.element);
    var n,
      i,
      o,
      r = this,
      s = document.querySelector('.introjs-helperLayer'),
      a = document.querySelector('.introjs-tooltipReferenceLayer'),
      l = 'introjs-helperLayer';
    if (
      ('string' == typeof t.highlightClass &&
        (l += ' '.concat(t.highlightClass)),
      'string' == typeof this._options.highlightClass &&
        (l += ' '.concat(this._options.highlightClass)),
      null !== s && null !== a)
    ) {
      var c = a.querySelector('.introjs-helperNumberLayer'),
        u = a.querySelector('.introjs-tooltiptext'),
        h = a.querySelector('.introjs-tooltip-title'),
        g = a.querySelector('.introjs-arrow'),
        f = a.querySelector('.introjs-tooltip');
      (o = a.querySelector('.introjs-skipbutton')),
        (i = a.querySelector('.introjs-prevbutton')),
        (n = a.querySelector('.introjs-nextbutton')),
        (s.className = l),
        (f.style.opacity = 0),
        (f.style.display = 'none'),
        vi.call(r, t),
        D.call(r, s),
        D.call(r, a),
        ki(),
        r._lastShowElementTimer && window.clearTimeout(r._lastShowElementTimer),
        (r._lastShowElementTimer = window.setTimeout(function () {
          null !== c &&
            (c.innerHTML = ''
              .concat(t.step, ' ')
              .concat(e._options.stepNumbersOfLabel, ' ')
              .concat(e._introItems.length)),
            (u.innerHTML = t.intro),
            (h.innerHTML = t.title),
            (f.style.display = 'block'),
            Qt.call(r, t.element, f, g),
            ja.call(r, a, t),
            Ii.call(r, a),
            (f.style.opacity = 1),
            ((null != n && /introjs-donebutton/gi.test(n.className)) ||
              null != n) &&
              n.focus(),
            bi.call(r, t.scrollTo, t, u);
        }, 350));
    } else {
      var v = m('div', { className: l }),
        b = m('div', { className: 'introjs-tooltipReferenceLayer' }),
        _ = m('div', { className: 'introjs-arrow' }),
        y = m('div', { className: 'introjs-tooltip' }),
        C = m('div', { className: 'introjs-tooltiptext' }),
        S = m('div', { className: 'introjs-tooltip-header' }),
        R = m('h1', { className: 'introjs-tooltip-title' }),
        I = m('div');
      if (
        (V(v, {
          'box-shadow':
            '0 0 1px 2px rgba(33, 33, 33, 0.8), rgba(33, 33, 33, '.concat(
              r._options.overlayOpacity.toString(),
              ') 0 0 0 5000px'
            ),
        }),
        vi.call(r, t),
        D.call(r, v),
        D.call(r, b),
        Ei(this._targetElement, v, !0),
        Ei(this._targetElement, b),
        (C.innerHTML = t.intro),
        (R.innerHTML = t.title),
        (I.className = 'introjs-tooltipbuttons'),
        !1 === this._options.showButtons && (I.style.display = 'none'),
        S.appendChild(R),
        y.appendChild(S),
        y.appendChild(C),
        this._options.dontShowAgain)
      ) {
        var M = m('div', { className: 'introjs-dontShowAgain' }),
          Nt = m('input', {
            type: 'checkbox',
            id: 'introjs-dontShowAgain',
            name: 'introjs-dontShowAgain',
          });
        Nt.onchange = function (un) {
          e.setDontShowAgain(un.target.checked);
        };
        var Lt = m('label', { htmlFor: 'introjs-dontShowAgain' });
        (Lt.innerText = this._options.dontShowAgainLabel),
          M.appendChild(Nt),
          M.appendChild(Lt),
          y.appendChild(M);
      }
      y.appendChild(Ti.call(this, t)), y.appendChild(Ca.call(this));
      var ln = m('div');
      !0 === this._options.showStepNumbers &&
        ((ln.className = 'introjs-helperNumberLayer'),
        (ln.innerHTML = ''
          .concat(t.step, ' ')
          .concat(this._options.stepNumbersOfLabel, ' ')
          .concat(this._introItems.length)),
        y.appendChild(ln)),
        y.appendChild(_),
        b.appendChild(y),
        ((n = m('a')).onclick = function () {
          r._introItems.length - 1 !== r._currentStep
            ? Z.call(r)
            : /introjs-donebutton/gi.test(n.className) &&
              ('function' == typeof r._introCompleteCallback &&
                r._introCompleteCallback.call(r, r._currentStep, 'done'),
              tt.call(r, r._targetElement));
        }),
        kt(n),
        (n.innerHTML = this._options.nextLabel),
        ((i = m('a')).onclick = function () {
          0 !== r._currentStep && te.call(r);
        }),
        kt(i),
        (i.innerHTML = this._options.prevLabel),
        kt((o = m('a', { className: 'introjs-skipbutton' }))),
        (o.innerHTML = this._options.skipLabel),
        (o.onclick = function () {
          r._introItems.length - 1 === r._currentStep &&
            'function' == typeof r._introCompleteCallback &&
            r._introCompleteCallback.call(r, r._currentStep, 'skip'),
            'function' == typeof r._introSkipCallback &&
              r._introSkipCallback.call(r),
            tt.call(r, r._targetElement);
        }),
        S.appendChild(o),
        this._introItems.length > 1 && I.appendChild(i),
        I.appendChild(n),
        y.appendChild(I),
        Qt.call(r, t.element, y, _),
        bi.call(this, t.scrollTo, t, y);
    }
    var cn = r._targetElement.querySelector('.introjs-disableInteraction');
    cn && cn.parentNode.removeChild(cn),
      t.disableInteraction && Sa.call(r),
      0 === this._currentStep && this._introItems.length > 1
        ? (null != n &&
            ((n.className = ''.concat(
              this._options.buttonClass,
              ' introjs-nextbutton'
            )),
            (n.innerHTML = this._options.nextLabel)),
          !0 === this._options.hidePrev
            ? (null != i &&
                (i.className = ''.concat(
                  this._options.buttonClass,
                  ' introjs-prevbutton introjs-hidden'
                )),
              null != n && B(n, 'introjs-fullbutton'))
            : null != i &&
              (i.className = ''.concat(
                this._options.buttonClass,
                ' introjs-prevbutton introjs-disabled'
              )))
        : this._introItems.length - 1 === this._currentStep ||
          1 === this._introItems.length
        ? (null != i &&
            (i.className = ''.concat(
              this._options.buttonClass,
              ' introjs-prevbutton'
            )),
          !0 === this._options.hideNext
            ? (null != n &&
                (n.className = ''.concat(
                  this._options.buttonClass,
                  ' introjs-nextbutton introjs-hidden'
                )),
              null != i && B(i, 'introjs-fullbutton'))
            : null != n &&
              (!0 === this._options.nextToDone
                ? ((n.innerHTML = this._options.doneLabel),
                  B(
                    n,
                    ''.concat(
                      this._options.buttonClass,
                      ' introjs-nextbutton introjs-donebutton'
                    )
                  ))
                : (n.className = ''.concat(
                    this._options.buttonClass,
                    ' introjs-nextbutton introjs-disabled'
                  ))))
        : (null != i &&
            (i.className = ''.concat(
              this._options.buttonClass,
              ' introjs-prevbutton'
            )),
          null != n &&
            ((n.className = ''.concat(
              this._options.buttonClass,
              ' introjs-nextbutton'
            )),
            (n.innerHTML = this._options.nextLabel))),
      i?.setAttribute('role', 'button'),
      n?.setAttribute('role', 'button'),
      o?.setAttribute('role', 'button'),
      n?.focus(),
      (function (un) {
        var hn = un.element;
        B(hn, 'introjs-showElement');
        var re = $e(hn, 'position');
        'absolute' !== re &&
          'relative' !== re &&
          'sticky' !== re &&
          'fixed' !== re &&
          B(hn, 'introjs-relativePosition');
      })(t),
      void 0 !== this._introAfterChangeCallback &&
        this._introAfterChangeCallback.call(this, t.element);
  }
  function Aa(t) {
    (this._currentStep = t - 2), void 0 !== this._introItems && Z.call(this);
  }
  function ka(t) {
    (this._currentStepNumber = t), void 0 !== this._introItems && Z.call(this);
  }
  function Z() {
    var t = this;
    (this._direction = 'forward'),
      void 0 !== this._currentStepNumber &&
        k(this._introItems, function (i, o) {
          i.step === t._currentStepNumber &&
            ((t._currentStep = o - 1), (t._currentStepNumber = void 0));
        }),
      void 0 === this._currentStep
        ? (this._currentStep = 0)
        : ++this._currentStep;
    var e = this._introItems[this._currentStep],
      n = !0;
    return (
      void 0 !== this._introBeforeChangeCallback &&
        (n = this._introBeforeChangeCallback.call(this, e && e.element)),
      !1 === n
        ? (--this._currentStep, !1)
        : this._introItems.length <= this._currentStep
        ? ('function' == typeof this._introCompleteCallback &&
            this._introCompleteCallback.call(this, this._currentStep, 'end'),
          void tt.call(this, this._targetElement))
        : void Ni.call(this, e)
    );
  }
  function te() {
    if (((this._direction = 'backward'), 0 === this._currentStep)) return !1;
    --this._currentStep;
    var t = this._introItems[this._currentStep],
      e = !0;
    if (
      (void 0 !== this._introBeforeChangeCallback &&
        (e = this._introBeforeChangeCallback.call(this, t && t.element)),
      !1 === e)
    )
      return ++this._currentStep, !1;
    Ni.call(this, t);
  }
  function Ea() {
    return this._currentStep;
  }
  function Li(t) {
    var e = void 0 === t.code ? t.which : t.code;
    if (
      (null === e && (e = null === t.charCode ? t.keyCode : t.charCode),
      ('Escape' !== e && 27 !== e) || !0 !== this._options.exitOnEsc)
    ) {
      if ('ArrowLeft' === e || 37 === e) te.call(this);
      else if ('ArrowRight' === e || 39 === e) Z.call(this);
      else if ('Enter' === e || 'NumpadEnter' === e || 13 === e) {
        var n = t.target || t.srcElement;
        n && n.className.match('introjs-prevbutton')
          ? te.call(this)
          : n && n.className.match('introjs-skipbutton')
          ? (this._introItems.length - 1 === this._currentStep &&
              'function' == typeof this._introCompleteCallback &&
              this._introCompleteCallback.call(this, this._currentStep, 'skip'),
            tt.call(this, this._targetElement))
          : n && n.getAttribute('data-step-number')
          ? n.click()
          : Z.call(this),
          t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
      }
    } else tt.call(this, this._targetElement);
  }
  function Ze(t) {
    if (null === t || 'object' !== W(t) || void 0 !== t.nodeType) return t;
    var e = {};
    for (var n in t)
      e[n] =
        void 0 !== window.jQuery && t[n] instanceof window.jQuery
          ? t[n]
          : Ze(t[n]);
    return e;
  }
  function ft(t) {
    var e = document.querySelector('.introjs-hints');
    return e ? e.querySelectorAll(t) : [];
  }
  function tn(t) {
    var e = ft('.introjs-hint[data-step="'.concat(t, '"]'))[0];
    ee.call(this),
      e && B(e, 'introjs-hidehint'),
      void 0 !== this._hintCloseCallback &&
        this._hintCloseCallback.call(this, t);
  }
  function Ta() {
    var t = this;
    k(ft('.introjs-hint'), function (e) {
      tn.call(t, e.getAttribute('data-step'));
    });
  }
  function Ia() {
    var t = this,
      e = ft('.introjs-hint');
    e && e.length
      ? k(e, function (n) {
          Oi.call(t, n.getAttribute('data-step'));
        })
      : qi.call(this, this._targetElement);
  }
  function Oi(t) {
    var e = ft('.introjs-hint[data-step="'.concat(t, '"]'))[0];
    e && Ke(e, /introjs-hidehint/g);
  }
  function Na() {
    var t = this;
    k(ft('.introjs-hint'), function (e) {
      Pi.call(t, e.getAttribute('data-step'));
    }),
      q.off(document, 'click', ee, this, !1),
      q.off(window, 'resize', ne, this, !0),
      this._hintsAutoRefreshFunction &&
        q.off(window, 'scroll', this._hintsAutoRefreshFunction, this, !0);
  }
  function Pi(t) {
    var e = ft('.introjs-hint[data-step="'.concat(t, '"]'))[0];
    e && e.parentNode.removeChild(e);
  }
  function La() {
    var t = this,
      e = this,
      n = document.querySelector('.introjs-hints');
    null === n && (n = m('div', { className: 'introjs-hints' })),
      k(this._introItems, function (i, o) {
        if (
          !document.querySelector('.introjs-hint[data-step="'.concat(o, '"]'))
        ) {
          var r = m('a', { className: 'introjs-hint' });
          kt(r),
            (r.onclick =
              ((l = o),
              function (c) {
                var u = c || window.event;
                u.stopPropagation && u.stopPropagation(),
                  null !== u.cancelBubble && (u.cancelBubble = !0),
                  Mi.call(e, l);
              })),
            i.hintAnimation || B(r, 'introjs-hint-no-anim'),
            Yt(i.element) && B(r, 'introjs-fixedhint');
          var s = m('div', { className: 'introjs-hint-dot' }),
            a = m('div', { className: 'introjs-hint-pulse' });
          r.appendChild(s),
            r.appendChild(a),
            r.setAttribute('data-step', o),
            (i.targetElement = i.element),
            (i.element = r),
            Ri.call(t, i.hintPosition, r, i.targetElement),
            n.appendChild(r);
        }
        var l;
      }),
      document.body.appendChild(n),
      void 0 !== this._hintsAddedCallback &&
        this._hintsAddedCallback.call(this),
      this._options.hintAutoRefreshInterval >= 0 &&
        ((this._hintsAutoRefreshFunction = (function (i, o) {
          var r,
            s = this;
          return function () {
            for (var a = arguments.length, l = new Array(a), c = 0; c < a; c++)
              l[c] = arguments[c];
            clearTimeout(r),
              (r = setTimeout(function () {
                i.apply(s, l);
              }, o));
          };
        })(function () {
          return ne.call(t);
        }, this._options.hintAutoRefreshInterval)),
        q.on(window, 'scroll', this._hintsAutoRefreshFunction, this, !0));
  }
  function Ri(t, e, n) {
    var i = e.style,
      o = ht.call(this, n),
      r = 20,
      s = 20;
    switch (t) {
      default:
        (i.left = ''.concat(o.left, 'px')), (i.top = ''.concat(o.top, 'px'));
        break;
      case 'top-right':
        (i.left = ''.concat(o.left + o.width - r, 'px')),
          (i.top = ''.concat(o.top, 'px'));
        break;
      case 'bottom-left':
        (i.left = ''.concat(o.left, 'px')),
          (i.top = ''.concat(o.top + o.height - s, 'px'));
        break;
      case 'bottom-right':
        (i.left = ''.concat(o.left + o.width - r, 'px')),
          (i.top = ''.concat(o.top + o.height - s, 'px'));
        break;
      case 'middle-left':
        (i.left = ''.concat(o.left, 'px')),
          (i.top = ''.concat(o.top + (o.height - s) / 2, 'px'));
        break;
      case 'middle-right':
        (i.left = ''.concat(o.left + o.width - r, 'px')),
          (i.top = ''.concat(o.top + (o.height - s) / 2, 'px'));
        break;
      case 'middle-middle':
        (i.left = ''.concat(o.left + (o.width - r) / 2, 'px')),
          (i.top = ''.concat(o.top + (o.height - s) / 2, 'px'));
        break;
      case 'bottom-middle':
        (i.left = ''.concat(o.left + (o.width - r) / 2, 'px')),
          (i.top = ''.concat(o.top + o.height - s, 'px'));
        break;
      case 'top-middle':
        (i.left = ''.concat(o.left + (o.width - r) / 2, 'px')),
          (i.top = ''.concat(o.top, 'px'));
    }
  }
  function Mi(t) {
    var e = document.querySelector('.introjs-hint[data-step="'.concat(t, '"]')),
      n = this._introItems[t];
    void 0 !== this._hintClickCallback &&
      this._hintClickCallback.call(this, e, n, t);
    var i = ee.call(this);
    if (parseInt(i, 10) !== t) {
      var o = m('div', { className: 'introjs-tooltip' }),
        r = m('div'),
        s = m('div'),
        a = m('div');
      (o.onclick = function (u) {
        u.stopPropagation ? u.stopPropagation() : (u.cancelBubble = !0);
      }),
        (r.className = 'introjs-tooltiptext');
      var l = m('p');
      if (
        ((l.innerHTML = n.hint), r.appendChild(l), this._options.hintShowButton)
      ) {
        var c = m('a');
        (c.className = this._options.buttonClass),
          c.setAttribute('role', 'button'),
          (c.innerHTML = this._options.hintButtonLabel),
          (c.onclick = tn.bind(this, t)),
          r.appendChild(c);
      }
      (s.className = 'introjs-arrow'),
        o.appendChild(s),
        o.appendChild(r),
        (this._currentStep = e.getAttribute('data-step')),
        (a.className = 'introjs-tooltipReferenceLayer introjs-hintReference'),
        a.setAttribute('data-step', e.getAttribute('data-step')),
        D.call(this, a),
        a.appendChild(o),
        document.body.appendChild(a),
        Qt.call(this, e, o, s, !0);
    }
  }
  function ee() {
    var t = document.querySelector('.introjs-hintReference');
    if (t) {
      var e = t.getAttribute('data-step');
      return t.parentNode.removeChild(t), e;
    }
  }
  function qi(t) {
    var e = this;
    if (((this._introItems = []), this._options.hints))
      k(this._options.hints, function (i) {
        var o = Ze(i);
        'string' == typeof o.element &&
          (o.element = document.querySelector(o.element)),
          (o.hintPosition = o.hintPosition || e._options.hintPosition),
          (o.hintAnimation = o.hintAnimation || e._options.hintAnimation),
          null !== o.element && e._introItems.push(o);
      });
    else {
      var n = t.querySelectorAll('*[data-hint]');
      if (!n || !n.length) return !1;
      k(n, function (i) {
        var o = i.getAttribute('data-hint-animation');
        (o = o ? 'true' === o : e._options.hintAnimation),
          e._introItems.push({
            element: i,
            hint: i.getAttribute('data-hint'),
            hintPosition:
              i.getAttribute('data-hint-position') || e._options.hintPosition,
            hintAnimation: o,
            tooltipClass: i.getAttribute('data-tooltip-class'),
            position:
              i.getAttribute('data-position') || e._options.tooltipPosition,
          });
      });
    }
    La.call(this),
      q.on(document, 'click', ee, this, !1),
      q.on(window, 'resize', ne, this, !0);
  }
  function ne() {
    var t = this;
    k(this._introItems, function (e) {
      var n = e.targetElement;
      void 0 !== n && Ri.call(t, e.hintPosition, e.element, n);
    });
  }
  P(
    { target: 'Array', proto: !0, forced: !ga },
    {
      splice: function (t, e) {
        var n,
          i,
          o,
          r,
          s,
          a,
          l = K(this),
          c = J(l),
          u = st(t, c),
          h = arguments.length;
        if (
          (0 === h
            ? (n = i = 0)
            : 1 === h
            ? ((n = 0), (i = c - u))
            : ((n = h - 2), (i = ba(va(yt(e), 0), c - u))),
          c + n - i > 9007199254740991)
        )
          throw ma('Maximum allowed length exceeded');
        for (o = De(l, i), r = 0; r < i; r++)
          (s = u + r) in l && jt(o, r, l[s]);
        if (((o.length = i), n < i)) {
          for (r = u; r < c - i; r++)
            (a = r + n), (s = r + i) in l ? (l[a] = l[s]) : delete l[a];
          for (r = c; r > c - i + n; r--) delete l[r - 1];
        } else if (n > i)
          for (r = c - i; r > u; r--)
            (a = r + n - 1), (s = r + i - 1) in l ? (l[a] = l[s]) : delete l[a];
        for (r = 0; r < n; r++) l[r + u] = arguments[r + 2];
        return (l.length = c - i + n), o;
      },
    }
  );
  var Oa = Math.floor,
    en = function (t, e) {
      var n = t.length,
        i = Oa(n / 2);
      return n < 8 ? Pa(t, e) : Ra(t, en(Kt(t, 0, i), e), en(Kt(t, i), e), e);
    },
    Pa = function (t, e) {
      for (var n, i, o = t.length, r = 1; r < o; ) {
        for (i = r, n = t[r]; i && e(t[i - 1], n) > 0; ) t[i] = t[--i];
        i !== r++ && (t[i] = n);
      }
      return t;
    },
    Ra = function (t, e, n, i) {
      for (var o = e.length, r = n.length, s = 0, a = 0; s < o || a < r; )
        t[s + a] =
          s < o && a < r
            ? i(e[s], n[a]) <= 0
              ? e[s++]
              : n[a++]
            : s < o
            ? e[s++]
            : n[a++];
      return t;
    },
    Ma = en,
    Bi = it.match(/firefox\/(\d+)/i),
    Hi = !!Bi && +Bi[1],
    qa = /MSIE|Trident/.test(it),
    Di = it.match(/AppleWebKit\/(\d+)\./),
    Fi = !!Di && +Di[1],
    U = [],
    $i = d(U.sort),
    Ba = d(U.push),
    Ha = w(function () {
      U.sort(void 0);
    }),
    Da = w(function () {
      U.sort(null);
    }),
    Fa = Qe('sort'),
    Gi = !w(function () {
      if (ot) return ot < 70;
      if (!(Hi && Hi > 3)) {
        if (qa) return !0;
        if (Fi) return Fi < 603;
        var t,
          e,
          n,
          i,
          o = '';
        for (t = 65; t < 76; t++) {
          switch (((e = String.fromCharCode(t)), t)) {
            case 66:
            case 69:
            case 70:
            case 72:
              n = 3;
              break;
            case 68:
            case 71:
              n = 4;
              break;
            default:
              n = 2;
          }
          for (i = 0; i < 47; i++) U.push({ k: e + i, v: n });
        }
        for (
          U.sort(function (r, s) {
            return s.v - r.v;
          }),
            i = 0;
          i < U.length;
          i++
        )
          (e = U[i].k.charAt(0)), o.charAt(o.length - 1) !== e && (o += e);
        return 'DGBEFHACIJK' !== o;
      }
    });
  function Vi(t) {
    var e = this,
      n = t.querySelectorAll('*[data-intro]'),
      i = [];
    if (this._options.steps)
      k(this._options.steps, function (l) {
        var c = Ze(l);
        if (
          ((c.step = i.length + 1),
          (c.title = c.title || ''),
          'string' == typeof c.element &&
            (c.element = document.querySelector(c.element)),
          null == c.element)
        ) {
          var u = document.querySelector('.introjsFloatingElement');
          null === u &&
            ((u = m('div', { className: 'introjsFloatingElement' })),
            document.body.appendChild(u)),
            (c.element = u),
            (c.position = 'floating');
        }
        (c.position = c.position || e._options.tooltipPosition),
          (c.scrollTo = c.scrollTo || e._options.scrollTo),
          void 0 === c.disableInteraction &&
            (c.disableInteraction = e._options.disableInteraction),
          null !== c.element && i.push(c);
      });
    else {
      var o;
      if (n.length < 1) return [];
      k(n, function (l) {
        if (
          (!e._options.group ||
            l.getAttribute('data-intro-group') === e._options.group) &&
          'none' !== l.style.display
        ) {
          var c = parseInt(l.getAttribute('data-step'), 10);
          (o = l.hasAttribute('data-disable-interaction')
            ? !!l.getAttribute('data-disable-interaction')
            : e._options.disableInteraction),
            c > 0 &&
              (i[c - 1] = {
                element: l,
                title: l.getAttribute('data-title') || '',
                intro: l.getAttribute('data-intro'),
                step: parseInt(l.getAttribute('data-step'), 10),
                tooltipClass: l.getAttribute('data-tooltip-class'),
                highlightClass: l.getAttribute('data-highlight-class'),
                position:
                  l.getAttribute('data-position') || e._options.tooltipPosition,
                scrollTo:
                  l.getAttribute('data-scroll-to') || e._options.scrollTo,
                disableInteraction: o,
              });
        }
      });
      var r = 0;
      k(n, function (l) {
        if (
          (!e._options.group ||
            l.getAttribute('data-intro-group') === e._options.group) &&
          null === l.getAttribute('data-step')
        ) {
          for (; void 0 !== i[r]; ) r++;
          (o = l.hasAttribute('data-disable-interaction')
            ? !!l.getAttribute('data-disable-interaction')
            : e._options.disableInteraction),
            (i[r] = {
              element: l,
              title: l.getAttribute('data-title') || '',
              intro: l.getAttribute('data-intro'),
              step: r + 1,
              tooltipClass: l.getAttribute('data-tooltip-class'),
              highlightClass: l.getAttribute('data-highlight-class'),
              position:
                l.getAttribute('data-position') || e._options.tooltipPosition,
              scrollTo: l.getAttribute('data-scroll-to') || e._options.scrollTo,
              disableInteraction: o,
            });
        }
      });
    }
    for (var s = [], a = 0; a < i.length; a++) i[a] && s.push(i[a]);
    return (
      (i = s).sort(function (l, c) {
        return l.step - c.step;
      }),
      i
    );
  }
  function zi(t) {
    var e = document.querySelector('.introjs-tooltipReferenceLayer'),
      n = document.querySelector('.introjs-helperLayer'),
      i = document.querySelector('.introjs-disableInteraction');
    if (
      (D.call(this, n),
      D.call(this, e),
      D.call(this, i),
      t &&
        ((this._introItems = Vi.call(this, this._targetElement)),
        xa.call(this, e, this._introItems[this._currentStep]),
        Ii.call(this, e)),
      null != this._currentStep)
    ) {
      var o = document.querySelector('.introjs-arrow'),
        r = document.querySelector('.introjs-tooltip');
      r &&
        o &&
        Qt.call(this, this._introItems[this._currentStep].element, r, o);
    }
    return ne.call(this), this;
  }
  function Ui() {
    zi.call(this);
  }
  function Et(t, e) {
    if (t && t.parentElement) {
      var n = t.parentElement;
      e
        ? (V(t, { opacity: '0' }),
          window.setTimeout(function () {
            try {
              n.removeChild(t);
            } catch {}
          }, 500))
        : n.removeChild(t);
    }
  }
  function tt(t, e) {
    var n = !0;
    if (
      (void 0 !== this._introBeforeExitCallback &&
        (n = this._introBeforeExitCallback.call(this)),
      e || !1 !== n)
    ) {
      var i = t.querySelectorAll('.introjs-overlay');
      i &&
        i.length &&
        k(i, function (o) {
          return Et(o);
        }),
        Et(t.querySelector('.introjs-helperLayer'), !0),
        Et(t.querySelector('.introjs-tooltipReferenceLayer')),
        Et(t.querySelector('.introjs-disableInteraction')),
        Et(document.querySelector('.introjsFloatingElement')),
        ki(),
        q.off(window, 'keydown', Li, this, !0),
        q.off(window, 'resize', Ui, this, !0),
        void 0 !== this._introExitCallback &&
          this._introExitCallback.call(this),
        (this._currentStep = void 0);
    }
  }
  function $a(t) {
    var e = this,
      n = m('div', { className: 'introjs-overlay' });
    return (
      V(n, { top: 0, bottom: 0, left: 0, right: 0, position: 'fixed' }),
      t.appendChild(n),
      !0 === this._options.exitOnOverlayClick &&
        (V(n, { cursor: 'pointer' }),
        (n.onclick = function () {
          tt.call(e, t);
        })),
      !0
    );
  }
  function Ga(t) {
    if (this.isActive()) {
      void 0 !== this._introStartCallback &&
        this._introStartCallback.call(this, t);
      var e = Vi.call(this, t);
      return (
        0 === e.length ||
          ((this._introItems = e),
          $a.call(this, t) &&
            (Z.call(this),
            this._options.keyboardNavigation &&
              q.on(window, 'keydown', Li, this, !0),
            q.on(window, 'resize', Ui, this, !0))),
        !1
      );
    }
  }
  P(
    { target: 'Array', proto: !0, forced: Ha || !Da || !Fa || !Gi },
    {
      sort: function (t) {
        void 0 !== t && pe(t);
        var e = K(this);
        if (Gi) return void 0 === t ? $i(e) : $i(e, t);
        var n,
          i,
          o = [],
          r = J(e);
        for (i = 0; i < r; i++) i in e && Ba(o, e[i]);
        for (
          Ma(
            o,
            (function (s) {
              return function (a, l) {
                return void 0 === l
                  ? -1
                  : void 0 === a
                  ? 1
                  : void 0 !== s
                  ? +s(a, l) || 0
                  : j(a) > j(l)
                  ? 1
                  : -1;
              };
            })(t)
          ),
            n = o.length,
            i = 0;
          i < n;

        )
          e[i] = o[i++];
        for (; i < r; ) delete e[i++];
        return e;
      },
    }
  );
  var Wi = {
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
    },
    nn = ve('span').classList,
    Ki = nn && nn.constructor && nn.constructor.prototype,
    Va = Ki === Object.prototype ? void 0 : Ki,
    za = Ai.forEach,
    on = Qe('forEach')
      ? [].forEach
      : function (t) {
          return za(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
    Yi = function (t) {
      if (t && t.forEach !== on)
        try {
          rt(t, 'forEach', on);
        } catch {
          t.forEach = on;
        }
    };
  for (var rn in Wi) Wi[rn] && Yi(p[rn] && p[rn].prototype);
  Yi(Va);
  var Tt,
    an =
      '\t\n\v\f\r \xa0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff',
    Xi = d(''.replace),
    ie = '[' + an + ']',
    Ua = RegExp('^' + ie + ie + '*'),
    Wa = RegExp(ie + ie + '*$'),
    sn = function (t) {
      return function (e) {
        var n = j(H(e));
        return 1 & t && (n = Xi(n, Ua, '')), 2 & t && (n = Xi(n, Wa, '')), n;
      };
    },
    Ka = { start: sn(1), end: sn(2), trim: sn(3) },
    Ya = je.PROPER,
    Xa = Ka.trim;
  function Ji(t, e, n) {
    var i,
      o = (et((i = {}), t, e), et(i, 'path', '/'), i);
    if (n) {
      var r = new Date();
      r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3),
        (o.expires = r.toUTCString());
    }
    var s = [];
    for (var a in o) s.push(''.concat(a, '=').concat(o[a]));
    return (document.cookie = s.join('; ')), Qi(t);
  }
  function Qi(t) {
    return ((e = {}),
    document.cookie.split(';').forEach(function (n) {
      var i = (function to(t, e) {
          return (
            (function (n) {
              if (Array.isArray(n)) return n;
            })(t) ||
            (function (n, i) {
              var o =
                null == n
                  ? null
                  : (typeof Symbol < 'u' && n[Symbol.iterator]) ||
                    n['@@iterator'];
              if (null != o) {
                var r,
                  s,
                  a = [],
                  l = !0,
                  c = !1;
                try {
                  for (
                    o = o.call(n);
                    !(l = (r = o.next()).done) &&
                    (a.push(r.value), !i || a.length !== i);
                    l = !0
                  );
                } catch (u) {
                  (c = !0), (s = u);
                } finally {
                  try {
                    l || null == o.return || o.return();
                  } finally {
                    if (c) throw s;
                  }
                }
                return a;
              }
            })(t, e) ||
            (function (n, i) {
              if (n) {
                if ('string' == typeof n) return fn(n, i);
                var o = Object.prototype.toString.call(n).slice(8, -1);
                if (
                  ('Object' === o && n.constructor && (o = n.constructor.name),
                  'Map' === o || 'Set' === o)
                )
                  return Array.from(n);
                if (
                  'Arguments' === o ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                )
                  return fn(n, i);
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        })(n.split('='), 2),
        r = i[1];
      e[i[0].trim()] = r;
    }),
    e)[t];
    var e;
  }
  function Ja(t) {
    t
      ? Ji(
          this._options.dontShowAgainCookie,
          'true',
          this._options.dontShowAgainCookieDays
        )
      : Ji(this._options.dontShowAgainCookie, '', -1);
  }
  function Qa() {
    var t = Qi(this._options.dontShowAgainCookie);
    return t && 'true' === t;
  }
  function It(t) {
    (this._targetElement = t),
      (this._introItems = []),
      (this._options = {
        isActive: !0,
        nextLabel: 'Next',
        prevLabel: 'Back',
        skipLabel: '\xd7',
        doneLabel: 'Done',
        hidePrev: !1,
        hideNext: !1,
        nextToDone: !0,
        tooltipPosition: 'bottom',
        tooltipClass: '',
        group: '',
        highlightClass: '',
        exitOnEsc: !0,
        exitOnOverlayClick: !0,
        showStepNumbers: !1,
        stepNumbersOfLabel: 'of',
        keyboardNavigation: !0,
        showButtons: !0,
        showBullets: !0,
        showProgress: !1,
        scrollToElement: !0,
        scrollTo: 'element',
        scrollPadding: 30,
        overlayOpacity: 0.5,
        autoPosition: !0,
        positionPrecedence: ['bottom', 'top', 'right', 'left'],
        disableInteraction: !1,
        dontShowAgain: !1,
        dontShowAgainLabel: "Don't show this again",
        dontShowAgainCookie: 'introjs-dontShowAgain',
        dontShowAgainCookieDays: 365,
        helperElementPadding: 10,
        hintPosition: 'top-middle',
        hintButtonLabel: 'Got it',
        hintShowButton: !0,
        hintAutoRefreshInterval: 10,
        hintAnimation: !0,
        buttonClass: 'introjs-button',
        progressBarAdditionalClass: !1,
      });
  }
  P(
    {
      target: 'String',
      proto: !0,
      forced:
        ((Tt = 'trim'),
        w(function () {
          return (
            !!an[Tt]() ||
            '\u200b\x85\u180e' !== '\u200b\x85\u180e'[Tt]() ||
            (Ya && an[Tt].name !== Tt)
          );
        })),
    },
    {
      trim: function () {
        return Xa(this);
      },
    }
  );
  var oe = function t(e) {
    var n;
    if ('object' === W(e)) n = new It(e);
    else if ('string' == typeof e) {
      var i = document.querySelector(e);
      if (!i) throw new Error('There is no element with given selector.');
      n = new It(i);
    } else n = new It(document.body);
    return (t.instances[ae(n, 'introjs-instance')] = n), n;
  };
  return (
    (oe.version = '5.1.0'),
    (oe.instances = {}),
    (oe.fn = It.prototype =
      {
        isActive: function () {
          return (
            (!this._options.dontShowAgain || !Qa.call(this)) &&
            this._options.isActive
          );
        },
        clone: function () {
          return new It(this);
        },
        setOption: function (t, e) {
          return (this._options[t] = e), this;
        },
        setOptions: function (t) {
          return (
            (this._options = (function (e, n) {
              var i,
                o = {};
              for (i in e) o[i] = e[i];
              for (i in n) o[i] = n[i];
              return o;
            })(this._options, t)),
            this
          );
        },
        start: function () {
          return Ga.call(this, this._targetElement), this;
        },
        goToStep: function (t) {
          return Aa.call(this, t), this;
        },
        addStep: function (t) {
          return (
            this._options.steps || (this._options.steps = []),
            this._options.steps.push(t),
            this
          );
        },
        addSteps: function (t) {
          if (t.length) {
            for (var e = 0; e < t.length; e++) this.addStep(t[e]);
            return this;
          }
        },
        goToStepNumber: function (t) {
          return ka.call(this, t), this;
        },
        nextStep: function () {
          return Z.call(this), this;
        },
        previousStep: function () {
          return te.call(this), this;
        },
        currentStep: function () {
          return Ea.call(this);
        },
        exit: function (t) {
          return tt.call(this, this._targetElement, t), this;
        },
        refresh: function (t) {
          return zi.call(this, t), this;
        },
        setDontShowAgain: function (t) {
          return Ja.call(this, t), this;
        },
        onbeforechange: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onbeforechange was not a function'
            );
          return (this._introBeforeChangeCallback = t), this;
        },
        onchange: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onchange was not a function.'
            );
          return (this._introChangeCallback = t), this;
        },
        onafterchange: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onafterchange was not a function'
            );
          return (this._introAfterChangeCallback = t), this;
        },
        oncomplete: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for oncomplete was not a function.'
            );
          return (this._introCompleteCallback = t), this;
        },
        onhintsadded: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onhintsadded was not a function.'
            );
          return (this._hintsAddedCallback = t), this;
        },
        onhintclick: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onhintclick was not a function.'
            );
          return (this._hintClickCallback = t), this;
        },
        onhintclose: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onhintclose was not a function.'
            );
          return (this._hintCloseCallback = t), this;
        },
        onstart: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onstart was not a function.'
            );
          return (this._introStartCallback = t), this;
        },
        onexit: function (t) {
          if ('function' != typeof t)
            throw new Error('Provided callback for onexit was not a function.');
          return (this._introExitCallback = t), this;
        },
        onskip: function (t) {
          if ('function' != typeof t)
            throw new Error('Provided callback for onskip was not a function.');
          return (this._introSkipCallback = t), this;
        },
        onbeforeexit: function (t) {
          if ('function' != typeof t)
            throw new Error(
              'Provided callback for onbeforeexit was not a function.'
            );
          return (this._introBeforeExitCallback = t), this;
        },
        addHints: function () {
          return qi.call(this, this._targetElement), this;
        },
        hideHint: function (t) {
          return tn.call(this, t), this;
        },
        hideHints: function () {
          return Ta.call(this), this;
        },
        showHint: function (t) {
          return Oi.call(this, t), this;
        },
        showHints: function () {
          return Ia.call(this), this;
        },
        removeHints: function () {
          return Na.call(this), this;
        },
        removeHint: function (t) {
          return Pi().call(this, t), this;
        },
        showHintDialog: function (t) {
          return Mi.call(this, t), this;
        },
      }),
    oe
  );
});
