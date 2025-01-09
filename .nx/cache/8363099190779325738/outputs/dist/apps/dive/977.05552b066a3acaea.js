'use strict';
(self.webpackChunkdive = self.webpackChunkdive || []).push([
  [977],
  {
    977: (Yo, Nt, h) => {
      h.r(Nt),
        h.d(Nt, {
          SolidQuizModule: () => Go,
          ngxsFeatureModule: () => Ze,
          routerChildModule: () => ze,
          routes: () => Be,
        });
      var Ge = h(3093),
        x = h(7657),
        ot = h(1145);
      let bt = (() => {
          class o {
            static #t = (this.type = '[Quiz] questions load');
            constructor(e, i, n) {
              (this.questionCount = e), (this.tags = i), (this.difficulty = n);
            }
          }
          return o;
        })(),
        at = (() => {
          class o {
            static #t = (this.type = '[Quiz] session start');
            constructor(e) {
              this.questionCount = e;
            }
          }
          return o;
        })(),
        U = (() => {
          class o {
            static #t = (this.type = '[Quiz] session end');
          }
          return o;
        })(),
        vt = (() => {
          class o {
            static #t = (this.type = '[Quiz] question answered');
            constructor(e) {
              this.correct = e;
            }
          }
          return o;
        })(),
        Gt = (() => {
          class o {
            static #t = (this.type = '[Quiz] metadata load');
          }
          return o;
        })(),
        Ht = (() => {
          class o {
            static #t = (this.type = '[Quiz] expert mode set');
          }
          return o;
        })();
      var Yt = (function (o) {
          return (
            (o.SingleChoice = 'SC'),
            (o.MultipleChoice = 'MC'),
            (o.TrueFalse = 'TF'),
            (o.Ranking = 'RG'),
            (o.Range = 'RN'),
            o
          );
        })(Yt || {}),
        N = h(3250),
        wt = h(8260),
        st = h(8527),
        xt = h(5990),
        t = h(8126),
        A = function (o, a, e, i) {
          var r,
            n = arguments.length,
            s =
              n < 3
                ? a
                : null === i
                ? (i = Object.getOwnPropertyDescriptor(a, e))
                : i;
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            s = Reflect.decorate(o, a, e, i);
          else
            for (var c = o.length - 1; c >= 0; c--)
              (r = o[c]) &&
                (s = (n < 3 ? r(s) : n > 3 ? r(a, e, s) : r(a, e)) || s);
          return n > 3 && s && Object.defineProperty(a, e, s), s;
        },
        f = function (o, a) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(o, a);
        };
      let y = class ft {
        static getSession(a) {
          return a.session;
        }
        static getMeta(a) {
          return a.metadata;
        }
        static getExpertMode(a) {
          return a.expertMode;
        }
        constructor(a, e) {
          (this._config = a), (this._http = e);
        }
        setMeta(a) {
          return this._http.get(`${this._config.apiUrl}/quizmeta`).pipe(
            (0, st.b)((e) => {
              a.patchState({ metadata: e });
            })
          );
        }
        setExpertMode(a) {
          const e = a.getState();
          a.setState({ ...e, expertMode: !e.expertMode });
        }
        set(a, { questionCount: e, tags: i, difficulty: n }) {
          let s;
          return (
            null == i && (i = []),
            (s =
              0 == i.length && 0 == n.length
                ? new N.LE().set('count', e)
                : 0 == i.length
                ? new N.LE().set('count', e).set('difficulty', n.toString())
                : 0 == n.length
                ? new N.LE().set('count', e).set('tags', JSON.stringify(i))
                : new N.LE()
                    .set('count', e)
                    .set('tags', JSON.stringify(i))
                    .set('difficulty', n.toString())),
            this._http
              .get(`${this._config.apiUrl}/quizsession`, { params: s })
              .pipe(
                (0, xt.U)((r) =>
                  r.map((d) => ({
                    ...d,
                    images: d.img.map((u) => new wt.fI(u)),
                  }))
                ),
                (0, st.b)((r) => {
                  a.patchState({ questions: r });
                })
              )
          );
        }
        startNewSession({ patchState: a, getState: e }, { questionCount: i }) {
          const n = [],
            s = e().questions;
          i = i > s.length ? s.length : i;
          for (let r = 0; r < i; ) {
            const c = Math.floor(Math.random() * s.length);
            if (n.find((d) => d.id === s[c].id)) continue;
            const l = { ...s[c] };
            l.answers = [];
            for (let d = 0; d < s[c].answers.length; ) {
              const u = Math.floor(Math.random() * s[c].answers.length);
              l.answers.find((b) => b.id === s[c].answers[u].id) ||
                (l.answers.push(s[c].answers[u]), d++);
            }
            n.push({ answered: 0, ...l }), r++;
          }
          a({ session: { progress: 0, currentQuestion: 0, questions: n } });
        }
        endSession({ patchState: a }) {
          a({ session: null });
        }
        questionAnswered({ patchState: a, getState: e }, { correct: i }) {
          const n = { ...e().session },
            s = { ...n.questions[n.currentQuestion], answered: i };
          a({
            session: {
              currentQuestion: n.currentQuestion + 1,
              progress: (100 / n.questions.length) * (n.currentQuestion + 1),
              questions: n.questions.map((r) => (r.id === s.id ? s : r)),
            },
          });
        }
        static #t = (this.ɵfac = function (e) {
          return new (e || ft)(t.LFG(wt.Bw), t.LFG(N.eN));
        });
        static #e = (this.ɵprov = t.Yz7({ token: ft, factory: ft.ɵfac }));
      };
      A(
        [
          (0, x.aU)(Gt),
          f('design:type', Function),
          f('design:paramtypes', [Object]),
          f('design:returntype', void 0),
        ],
        y.prototype,
        'setMeta',
        null
      ),
        A(
          [
            (0, x.aU)(Ht),
            f('design:type', Function),
            f('design:paramtypes', [Object]),
            f('design:returntype', void 0),
          ],
          y.prototype,
          'setExpertMode',
          null
        ),
        A(
          [
            (0, x.aU)(bt),
            f('design:type', Function),
            f('design:paramtypes', [Object, bt]),
            f('design:returntype', void 0),
          ],
          y.prototype,
          'set',
          null
        ),
        A(
          [
            (0, x.aU)(at),
            f('design:type', Function),
            f('design:paramtypes', [Object, at]),
            f('design:returntype', void 0),
          ],
          y.prototype,
          'startNewSession',
          null
        ),
        A(
          [
            (0, x.aU)(U),
            f('design:type', Function),
            f('design:paramtypes', [Object]),
            f('design:returntype', void 0),
          ],
          y.prototype,
          'endSession',
          null
        ),
        A(
          [
            (0, x.aU)(vt),
            f('design:type', Function),
            f('design:paramtypes', [Object, vt]),
            f('design:returntype', void 0),
          ],
          y.prototype,
          'questionAnswered',
          null
        ),
        A(
          [
            (0, x.Qf)(),
            f('design:type', Function),
            f('design:paramtypes', [Object]),
            f('design:returntype', Object),
          ],
          y,
          'getSession',
          null
        ),
        A(
          [
            (0, x.Qf)(),
            f('design:type', Function),
            f('design:paramtypes', [Object]),
            f('design:returntype', Object),
          ],
          y,
          'getMeta',
          null
        ),
        A(
          [
            (0, x.Qf)(),
            f('design:type', Function),
            f('design:paramtypes', [Object]),
            f('design:returntype', Boolean),
          ],
          y,
          'getExpertMode',
          null
        ),
        (y = A(
          [
            (0, x.ZM)({
              name: 'quiz',
              defaults: {
                metadata: null,
                questions: [],
                session: null,
                expertMode: !1,
              },
            }),
            f('design:paramtypes', [Object, N.eN]),
          ],
          y
        ));
      var m = h(3223),
        He = h(4724),
        _ = h(5992),
        Ye = h(9916),
        Je = h(1023),
        M = h(9223),
        T = h(9836),
        P = h(8641),
        Jt = h(5945),
        F = h(306),
        rt = h(5663),
        p = h(8790),
        g = h(1045),
        I = h(7943),
        D = h(3506),
        q = h(4359),
        k = h(7701),
        Q = h(1553),
        V = h(3318),
        v = h(8340),
        j = h(3192),
        ct = h(5737);
      function Ue(o, a) {
        1 & o && (t.TgZ(0, 'span', 7), t.Hsn(1, 1), t.qZA());
      }
      function Ve(o, a) {
        1 & o && (t.TgZ(0, 'span', 8), t.Hsn(1, 2), t.qZA());
      }
      const Ut = [
          '*',
          [['mat-chip-avatar'], ['', 'matChipAvatar', '']],
          [
            ['mat-chip-trailing-icon'],
            ['', 'matChipRemove', ''],
            ['', 'matChipTrailingIcon', ''],
          ],
        ],
        Vt = [
          '*',
          'mat-chip-avatar, [matChipAvatar]',
          'mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]',
        ];
      function je(o, a) {
        1 & o &&
          (t.TgZ(0, 'span', 8),
          t.Hsn(1, 1),
          t.TgZ(2, 'span', 9),
          t.O4$(),
          t.TgZ(3, 'svg', 10),
          t._UZ(4, 'path', 11),
          t.qZA()()());
      }
      function Ke(o, a) {
        1 & o && (t.TgZ(0, 'span', 12), t.Hsn(1, 2), t.qZA());
      }
      const yt = ['*'],
        lt = new t.OlP('mat-chips-default-options'),
        Ct = new t.OlP('MatChipAvatar'),
        kt = new t.OlP('MatChipTrailingIcon'),
        Mt = new t.OlP('MatChipRemove'),
        dt = new t.OlP('MatChip');
      class si {}
      const ri = (0, g.sb)(si, -1);
      let G = (() => {
          class o extends ri {
            get disabled() {
              return this._disabled || this._parentChip.disabled;
            }
            set disabled(e) {
              this._disabled = (0, p.Ig)(e);
            }
            _getDisabledAttribute() {
              return this.disabled && !this._allowFocusWhenDisabled ? '' : null;
            }
            _getTabindex() {
              return (this.disabled && !this._allowFocusWhenDisabled) ||
                !this.isInteractive
                ? null
                : this.tabIndex.toString();
            }
            constructor(e, i) {
              super(),
                (this._elementRef = e),
                (this._parentChip = i),
                (this.isInteractive = !0),
                (this._isPrimary = !0),
                (this._disabled = !1),
                (this._allowFocusWhenDisabled = !1),
                'BUTTON' === e.nativeElement.nodeName &&
                  e.nativeElement.setAttribute('type', 'button');
            }
            focus() {
              this._elementRef.nativeElement.focus();
            }
            _handleClick(e) {
              !this.disabled &&
                this.isInteractive &&
                this._isPrimary &&
                (e.preventDefault(),
                this._parentChip._handlePrimaryActionInteraction());
            }
            _handleKeydown(e) {
              (e.keyCode === v.K5 || e.keyCode === v.L_) &&
                !this.disabled &&
                this.isInteractive &&
                this._isPrimary &&
                !this._parentChip._isEditing &&
                (e.preventDefault(),
                this._parentChip._handlePrimaryActionInteraction());
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || o)(t.Y36(t.SBq), t.Y36(dt));
            });
            static #e = (this.ɵdir = t.lG2({
              type: o,
              selectors: [['', 'matChipAction', '']],
              hostAttrs: [
                1,
                'mdc-evolution-chip__action',
                'mat-mdc-chip-action',
              ],
              hostVars: 9,
              hostBindings: function (i, n) {
                1 & i &&
                  t.NdJ('click', function (r) {
                    return n._handleClick(r);
                  })('keydown', function (r) {
                    return n._handleKeydown(r);
                  }),
                  2 & i &&
                    (t.uIk('tabindex', n._getTabindex())(
                      'disabled',
                      n._getDisabledAttribute()
                    )('aria-disabled', n.disabled),
                    t.ekj('mdc-evolution-chip__action--primary', n._isPrimary)(
                      'mdc-evolution-chip__action--presentational',
                      !n.isInteractive
                    )('mdc-evolution-chip__action--trailing', !n._isPrimary));
              },
              inputs: {
                disabled: 'disabled',
                tabIndex: 'tabIndex',
                isInteractive: 'isInteractive',
                _allowFocusWhenDisabled: '_allowFocusWhenDisabled',
              },
              features: [t.qOj],
            }));
          }
          return o;
        })(),
        hi = 0;
      const pi = (0, g.sb)(
        (0, g.pj)(
          (0, g.Kr)(
            (0, g.Id)(
              class {
                constructor(o) {
                  this._elementRef = o;
                }
              }
            )
          ),
          'primary'
        ),
        -1
      );
      let B = (() => {
          class o extends pi {
            _hasFocus() {
              return this._hasFocusInternal;
            }
            get value() {
              return void 0 !== this._value
                ? this._value
                : this._textElement.textContent.trim();
            }
            set value(e) {
              this._value = e;
            }
            get removable() {
              return this._removable;
            }
            set removable(e) {
              this._removable = (0, p.Ig)(e);
            }
            get highlighted() {
              return this._highlighted;
            }
            set highlighted(e) {
              this._highlighted = (0, p.Ig)(e);
            }
            get ripple() {
              return this._rippleLoader?.getRipple(
                this._elementRef.nativeElement
              );
            }
            set ripple(e) {
              this._rippleLoader?.attachRipple(
                this._elementRef.nativeElement,
                e
              );
            }
            constructor(e, i, n, s, r, c, l, d) {
              super(i),
                (this._changeDetectorRef = e),
                (this._ngZone = n),
                (this._focusMonitor = s),
                (this._globalRippleOptions = l),
                (this._onFocus = new _.x()),
                (this._onBlur = new _.x()),
                (this.role = null),
                (this._hasFocusInternal = !1),
                (this.id = 'mat-mdc-chip-' + hi++),
                (this.ariaLabel = null),
                (this.ariaDescription = null),
                (this._ariaDescriptionId = `${this.id}-aria-description`),
                (this._removable = !0),
                (this._highlighted = !1),
                (this.removed = new t.vpe()),
                (this.destroyed = new t.vpe()),
                (this.basicChipAttrName = 'mat-basic-chip'),
                (this._rippleLoader = (0, t.f3M)(g.Fq)),
                (this._document = r),
                (this._animationsDisabled = 'NoopAnimations' === c),
                null != d &&
                  (this.tabIndex = parseInt(d) ?? this.defaultTabIndex),
                this._monitorFocus(),
                this._rippleLoader?.configureRipple(
                  this._elementRef.nativeElement,
                  {
                    className: 'mat-mdc-chip-ripple',
                    disabled: this._isRippleDisabled(),
                  }
                );
            }
            ngOnInit() {
              const e = this._elementRef.nativeElement;
              this._isBasicChip =
                e.hasAttribute(this.basicChipAttrName) ||
                e.tagName.toLowerCase() === this.basicChipAttrName;
            }
            ngAfterViewInit() {
              (this._textElement = this._elementRef.nativeElement.querySelector(
                '.mat-mdc-chip-action-label'
              )),
                this._pendingFocus && ((this._pendingFocus = !1), this.focus());
            }
            ngAfterContentInit() {
              this._actionChanges = (0, D.T)(
                this._allLeadingIcons.changes,
                this._allTrailingIcons.changes,
                this._allRemoveIcons.changes
              ).subscribe(() => this._changeDetectorRef.markForCheck());
            }
            ngDoCheck() {
              this._rippleLoader.setDisabled(
                this._elementRef.nativeElement,
                this._isRippleDisabled()
              );
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef),
                this._actionChanges?.unsubscribe(),
                this.destroyed.emit({ chip: this }),
                this.destroyed.complete();
            }
            remove() {
              this.removable && this.removed.emit({ chip: this });
            }
            _isRippleDisabled() {
              return (
                this.disabled ||
                this.disableRipple ||
                this._animationsDisabled ||
                this._isBasicChip ||
                !!this._globalRippleOptions?.disabled
              );
            }
            _hasTrailingIcon() {
              return !(!this.trailingIcon && !this.removeIcon);
            }
            _handleKeydown(e) {
              (e.keyCode === v.ZH || e.keyCode === v.yY) &&
                (e.preventDefault(), this.remove());
            }
            focus() {
              this.disabled ||
                (this.primaryAction
                  ? this.primaryAction.focus()
                  : (this._pendingFocus = !0));
            }
            _getSourceAction(e) {
              return this._getActions().find((i) => {
                const n = i._elementRef.nativeElement;
                return n === e || n.contains(e);
              });
            }
            _getActions() {
              const e = [];
              return (
                this.primaryAction && e.push(this.primaryAction),
                this.removeIcon && e.push(this.removeIcon),
                this.trailingIcon && e.push(this.trailingIcon),
                e
              );
            }
            _handlePrimaryActionInteraction() {}
            _monitorFocus() {
              this._focusMonitor
                .monitor(this._elementRef, !0)
                .subscribe((e) => {
                  const i = null !== e;
                  i !== this._hasFocusInternal &&
                    ((this._hasFocusInternal = i),
                    i
                      ? this._onFocus.next({ chip: this })
                      : this._ngZone.onStable
                          .pipe((0, q.q)(1))
                          .subscribe(() =>
                            this._ngZone.run(() =>
                              this._onBlur.next({ chip: this })
                            )
                          ));
                });
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || o)(
                t.Y36(t.sBO),
                t.Y36(t.SBq),
                t.Y36(t.R0b),
                t.Y36(I.tE),
                t.Y36(m.K0),
                t.Y36(t.QbO, 8),
                t.Y36(g.Y2, 8),
                t.$8M('tabindex')
              );
            });
            static #e = (this.ɵcmp = t.Xpm({
              type: o,
              selectors: [
                ['mat-basic-chip'],
                ['', 'mat-basic-chip', ''],
                ['mat-chip'],
                ['', 'mat-chip', ''],
              ],
              contentQueries: function (i, n, s) {
                if (
                  (1 & i &&
                    (t.Suo(s, Ct, 5),
                    t.Suo(s, kt, 5),
                    t.Suo(s, Mt, 5),
                    t.Suo(s, Ct, 5),
                    t.Suo(s, kt, 5),
                    t.Suo(s, Mt, 5)),
                  2 & i)
                ) {
                  let r;
                  t.iGM((r = t.CRH())) && (n.leadingIcon = r.first),
                    t.iGM((r = t.CRH())) && (n.trailingIcon = r.first),
                    t.iGM((r = t.CRH())) && (n.removeIcon = r.first),
                    t.iGM((r = t.CRH())) && (n._allLeadingIcons = r),
                    t.iGM((r = t.CRH())) && (n._allTrailingIcons = r),
                    t.iGM((r = t.CRH())) && (n._allRemoveIcons = r);
                }
              },
              viewQuery: function (i, n) {
                if ((1 & i && t.Gf(G, 5), 2 & i)) {
                  let s;
                  t.iGM((s = t.CRH())) && (n.primaryAction = s.first);
                }
              },
              hostAttrs: [1, 'mat-mdc-chip'],
              hostVars: 30,
              hostBindings: function (i, n) {
                1 & i &&
                  t.NdJ('keydown', function (r) {
                    return n._handleKeydown(r);
                  }),
                  2 & i &&
                    (t.Ikx('id', n.id),
                    t.uIk('role', n.role)(
                      'tabindex',
                      n.role ? n.tabIndex : null
                    )('aria-label', n.ariaLabel),
                    t.ekj('mdc-evolution-chip', !n._isBasicChip)(
                      'mdc-evolution-chip--disabled',
                      n.disabled
                    )(
                      'mdc-evolution-chip--with-trailing-action',
                      n._hasTrailingIcon()
                    )(
                      'mdc-evolution-chip--with-primary-graphic',
                      n.leadingIcon
                    )('mdc-evolution-chip--with-primary-icon', n.leadingIcon)(
                      'mdc-evolution-chip--with-avatar',
                      n.leadingIcon
                    )('mat-mdc-chip-with-avatar', n.leadingIcon)(
                      'mat-mdc-chip-highlighted',
                      n.highlighted
                    )('mat-mdc-chip-disabled', n.disabled)(
                      'mat-mdc-basic-chip',
                      n._isBasicChip
                    )('mat-mdc-standard-chip', !n._isBasicChip)(
                      'mat-mdc-chip-with-trailing-icon',
                      n._hasTrailingIcon()
                    )('_mat-animation-noopable', n._animationsDisabled));
              },
              inputs: {
                color: 'color',
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                tabIndex: 'tabIndex',
                role: 'role',
                id: 'id',
                ariaLabel: ['aria-label', 'ariaLabel'],
                ariaDescription: ['aria-description', 'ariaDescription'],
                value: 'value',
                removable: 'removable',
                highlighted: 'highlighted',
              },
              outputs: { removed: 'removed', destroyed: 'destroyed' },
              exportAs: ['matChip'],
              features: [t._Bn([{ provide: dt, useExisting: o }]), t.qOj],
              ngContentSelectors: Vt,
              decls: 8,
              vars: 3,
              consts: [
                [1, 'mat-mdc-chip-focus-overlay'],
                [
                  1,
                  'mdc-evolution-chip__cell',
                  'mdc-evolution-chip__cell--primary',
                ],
                ['matChipAction', '', 3, 'isInteractive'],
                [
                  'class',
                  'mdc-evolution-chip__graphic mat-mdc-chip-graphic',
                  4,
                  'ngIf',
                ],
                [
                  1,
                  'mdc-evolution-chip__text-label',
                  'mat-mdc-chip-action-label',
                ],
                [
                  1,
                  'mat-mdc-chip-primary-focus-indicator',
                  'mat-mdc-focus-indicator',
                ],
                [
                  'class',
                  'mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing',
                  4,
                  'ngIf',
                ],
                [1, 'mdc-evolution-chip__graphic', 'mat-mdc-chip-graphic'],
                [
                  1,
                  'mdc-evolution-chip__cell',
                  'mdc-evolution-chip__cell--trailing',
                ],
              ],
              template: function (i, n) {
                1 & i &&
                  (t.F$t(Ut),
                  t._UZ(0, 'span', 0),
                  t.TgZ(1, 'span', 1)(2, 'span', 2),
                  t.YNc(3, Ue, 2, 0, 'span', 3),
                  t.TgZ(4, 'span', 4),
                  t.Hsn(5),
                  t._UZ(6, 'span', 5),
                  t.qZA()()(),
                  t.YNc(7, Ve, 2, 0, 'span', 6)),
                  2 & i &&
                    (t.xp6(2),
                    t.Q6J('isInteractive', !1),
                    t.xp6(1),
                    t.Q6J('ngIf', n.leadingIcon),
                    t.xp6(4),
                    t.Q6J('ngIf', n._hasTrailingIcon()));
              },
              dependencies: [m.O5, G],
              styles: [
                '.mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:"";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip{border-radius:var(--mdc-chip-container-shape-radius);height:var(--mdc-chip-container-height);--mdc-chip-container-shape-family:rounded;--mdc-chip-container-shape-radius:16px 16px 16px 16px;--mdc-chip-with-avatar-avatar-shape-family:rounded;--mdc-chip-with-avatar-avatar-shape-radius:14px 14px 14px 14px;--mdc-chip-with-avatar-avatar-size:28px;--mdc-chip-with-icon-icon-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size);width:var(--mdc-chip-with-avatar-avatar-size);font-size:var(--mdc-chip-with-avatar-avatar-size)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color)}.mat-mdc-standard-chip .mdc-evolution-chip__text-label{font-family:var(--mdc-chip-label-text-font);line-height:var(--mdc-chip-label-text-line-height);font-size:var(--mdc-chip-label-text-size);font-weight:var(--mdc-chip-label-text-weight);letter-spacing:var(--mdc-chip-label-text-tracking)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size);width:var(--mdc-chip-with-icon-icon-size);font-size:var(--mdc-chip-with-icon-icon-size)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary.mdc-ripple-upgraded--background-focused .mdc-evolution-chip__ripple::before,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__ripple::before{transition-duration:75ms;opacity:var(--mdc-chip-focus-state-layer-opacity)}.mat-mdc-chip-focus-overlay{background:var(--mdc-chip-focus-state-layer-color);opacity:var(--mdc-chip-focus-state-layer-opacity)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{flex-basis:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:""}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return o;
        })(),
        Wt = (() => {
          class o extends B {
            constructor() {
              super(...arguments),
                (this._defaultOptions = (0, t.f3M)(lt, { optional: !0 })),
                (this.chipListSelectable = !0),
                (this._chipListMultiple = !1),
                (this._chipListHideSingleSelectionIndicator =
                  this._defaultOptions?.hideSingleSelectionIndicator ?? !1),
                (this._selectable = !0),
                (this._selected = !1),
                (this.basicChipAttrName = 'mat-basic-chip-option'),
                (this.selectionChange = new t.vpe());
            }
            get selectable() {
              return this._selectable && this.chipListSelectable;
            }
            set selectable(e) {
              (this._selectable = (0, p.Ig)(e)),
                this._changeDetectorRef.markForCheck();
            }
            get selected() {
              return this._selected;
            }
            set selected(e) {
              this._setSelectedState((0, p.Ig)(e), !1, !0);
            }
            get ariaSelected() {
              return this.selectable ? this.selected.toString() : null;
            }
            ngOnInit() {
              super.ngOnInit(), (this.role = 'presentation');
            }
            select() {
              this._setSelectedState(!0, !1, !0);
            }
            deselect() {
              this._setSelectedState(!1, !1, !0);
            }
            selectViaInteraction() {
              this._setSelectedState(!0, !0, !0);
            }
            toggleSelected(e = !1) {
              return (
                this._setSelectedState(!this.selected, e, !0), this.selected
              );
            }
            _handlePrimaryActionInteraction() {
              this.disabled ||
                (this.focus(), this.selectable && this.toggleSelected(!0));
            }
            _hasLeadingGraphic() {
              return (
                !!this.leadingIcon ||
                !this._chipListHideSingleSelectionIndicator ||
                this._chipListMultiple
              );
            }
            _setSelectedState(e, i, n) {
              e !== this.selected &&
                ((this._selected = e),
                n &&
                  this.selectionChange.emit({
                    source: this,
                    isUserInput: i,
                    selected: this.selected,
                  }),
                this._changeDetectorRef.markForCheck());
            }
            static #t = (this.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = t.n5z(o)))(n || o);
              };
            })());
            static #e = (this.ɵcmp = t.Xpm({
              type: o,
              selectors: [
                ['mat-basic-chip-option'],
                ['', 'mat-basic-chip-option', ''],
                ['mat-chip-option'],
                ['', 'mat-chip-option', ''],
              ],
              hostAttrs: [1, 'mat-mdc-chip', 'mat-mdc-chip-option'],
              hostVars: 37,
              hostBindings: function (i, n) {
                2 & i &&
                  (t.Ikx('id', n.id),
                  t.uIk('tabindex', null)('aria-label', null)(
                    'aria-description',
                    null
                  )('role', n.role),
                  t.ekj('mdc-evolution-chip', !n._isBasicChip)(
                    'mdc-evolution-chip--filter',
                    !n._isBasicChip
                  )('mdc-evolution-chip--selectable', !n._isBasicChip)(
                    'mat-mdc-chip-selected',
                    n.selected
                  )('mat-mdc-chip-multiple', n._chipListMultiple)(
                    'mat-mdc-chip-disabled',
                    n.disabled
                  )('mat-mdc-chip-with-avatar', n.leadingIcon)(
                    'mdc-evolution-chip--disabled',
                    n.disabled
                  )('mdc-evolution-chip--selected', n.selected)(
                    'mdc-evolution-chip--selecting',
                    !n._animationsDisabled
                  )(
                    'mdc-evolution-chip--with-trailing-action',
                    n._hasTrailingIcon()
                  )('mdc-evolution-chip--with-primary-icon', n.leadingIcon)(
                    'mdc-evolution-chip--with-primary-graphic',
                    n._hasLeadingGraphic()
                  )('mdc-evolution-chip--with-avatar', n.leadingIcon)(
                    'mat-mdc-chip-highlighted',
                    n.highlighted
                  )('mat-mdc-chip-with-trailing-icon', n._hasTrailingIcon()));
              },
              inputs: {
                color: 'color',
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                tabIndex: 'tabIndex',
                selectable: 'selectable',
                selected: 'selected',
              },
              outputs: { selectionChange: 'selectionChange' },
              features: [
                t._Bn([
                  { provide: B, useExisting: o },
                  { provide: dt, useExisting: o },
                ]),
                t.qOj,
              ],
              ngContentSelectors: Vt,
              decls: 10,
              vars: 9,
              consts: [
                [1, 'mat-mdc-chip-focus-overlay'],
                [
                  1,
                  'mdc-evolution-chip__cell',
                  'mdc-evolution-chip__cell--primary',
                ],
                [
                  'matChipAction',
                  '',
                  'role',
                  'option',
                  3,
                  'tabIndex',
                  '_allowFocusWhenDisabled',
                ],
                [
                  'class',
                  'mdc-evolution-chip__graphic mat-mdc-chip-graphic',
                  4,
                  'ngIf',
                ],
                [
                  1,
                  'mdc-evolution-chip__text-label',
                  'mat-mdc-chip-action-label',
                ],
                [
                  1,
                  'mat-mdc-chip-primary-focus-indicator',
                  'mat-mdc-focus-indicator',
                ],
                [
                  'class',
                  'mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing',
                  4,
                  'ngIf',
                ],
                [1, 'cdk-visually-hidden', 3, 'id'],
                [1, 'mdc-evolution-chip__graphic', 'mat-mdc-chip-graphic'],
                [1, 'mdc-evolution-chip__checkmark'],
                [
                  'viewBox',
                  '-2 -3 30 30',
                  'focusable',
                  'false',
                  'aria-hidden',
                  'true',
                  1,
                  'mdc-evolution-chip__checkmark-svg',
                ],
                [
                  'fill',
                  'none',
                  'stroke',
                  'currentColor',
                  'd',
                  'M1.73,12.91 8.1,19.28 22.79,4.59',
                  1,
                  'mdc-evolution-chip__checkmark-path',
                ],
                [
                  1,
                  'mdc-evolution-chip__cell',
                  'mdc-evolution-chip__cell--trailing',
                ],
              ],
              template: function (i, n) {
                1 & i &&
                  (t.F$t(Ut),
                  t._UZ(0, 'span', 0),
                  t.TgZ(1, 'span', 1)(2, 'button', 2),
                  t.YNc(3, je, 5, 0, 'span', 3),
                  t.TgZ(4, 'span', 4),
                  t.Hsn(5),
                  t._UZ(6, 'span', 5),
                  t.qZA()()(),
                  t.YNc(7, Ke, 2, 0, 'span', 6),
                  t.TgZ(8, 'span', 7),
                  t._uU(9),
                  t.qZA()),
                  2 & i &&
                    (t.xp6(2),
                    t.Q6J('tabIndex', n.tabIndex)(
                      '_allowFocusWhenDisabled',
                      !0
                    ),
                    t.uIk('aria-selected', n.ariaSelected)(
                      'aria-label',
                      n.ariaLabel
                    )('aria-describedby', n._ariaDescriptionId),
                    t.xp6(1),
                    t.Q6J('ngIf', n._hasLeadingGraphic()),
                    t.xp6(4),
                    t.Q6J('ngIf', n._hasTrailingIcon()),
                    t.xp6(1),
                    t.Q6J('id', n._ariaDescriptionId),
                    t.xp6(1),
                    t.Oqu(n.ariaDescription));
              },
              dependencies: [m.O5, G],
              styles: [
                '.mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:"";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip{border-radius:var(--mdc-chip-container-shape-radius);height:var(--mdc-chip-container-height);--mdc-chip-container-shape-family:rounded;--mdc-chip-container-shape-radius:16px 16px 16px 16px;--mdc-chip-with-avatar-avatar-shape-family:rounded;--mdc-chip-with-avatar-avatar-shape-radius:14px 14px 14px 14px;--mdc-chip-with-avatar-avatar-size:28px;--mdc-chip-with-icon-icon-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size);width:var(--mdc-chip-with-avatar-avatar-size);font-size:var(--mdc-chip-with-avatar-avatar-size)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color)}.mat-mdc-standard-chip .mdc-evolution-chip__text-label{font-family:var(--mdc-chip-label-text-font);line-height:var(--mdc-chip-label-text-line-height);font-size:var(--mdc-chip-label-text-size);font-weight:var(--mdc-chip-label-text-weight);letter-spacing:var(--mdc-chip-label-text-tracking)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size);width:var(--mdc-chip-with-icon-icon-size);font-size:var(--mdc-chip-with-icon-icon-size)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary.mdc-ripple-upgraded--background-focused .mdc-evolution-chip__ripple::before,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__ripple::before{transition-duration:75ms;opacity:var(--mdc-chip-focus-state-layer-opacity)}.mat-mdc-chip-focus-overlay{background:var(--mdc-chip-focus-state-layer-color);opacity:var(--mdc-chip-focus-state-layer-opacity)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{flex-basis:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:""}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return o;
        })();
      class ui {
        constructor(a) {}
      }
      const mi = (0, g.sb)(ui);
      let Tt = (() => {
        class o extends mi {
          get chipFocusChanges() {
            return this._getChipStream((e) => e._onFocus);
          }
          get chipDestroyedChanges() {
            return this._getChipStream((e) => e.destroyed);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            (this._disabled = (0, p.Ig)(e)), this._syncChipsState();
          }
          get empty() {
            return !this._chips || 0 === this._chips.length;
          }
          get role() {
            return this._explicitRole
              ? this._explicitRole
              : this.empty
              ? null
              : this._defaultRole;
          }
          set role(e) {
            this._explicitRole = e;
          }
          get focused() {
            return this._hasFocusedChip();
          }
          constructor(e, i, n) {
            super(e),
              (this._elementRef = e),
              (this._changeDetectorRef = i),
              (this._dir = n),
              (this._lastDestroyedFocusedChipIndex = null),
              (this._destroyed = new _.x()),
              (this._defaultRole = 'presentation'),
              (this._disabled = !1),
              (this._explicitRole = null),
              (this._chipActions = new t.n_E());
          }
          ngAfterViewInit() {
            this._setUpFocusManagement(),
              this._trackChipSetChanges(),
              this._trackDestroyedFocusedChip();
          }
          ngOnDestroy() {
            this._keyManager?.destroy(),
              this._chipActions.destroy(),
              this._destroyed.next(),
              this._destroyed.complete();
          }
          _hasFocusedChip() {
            return this._chips && this._chips.some((e) => e._hasFocus());
          }
          _syncChipsState() {
            this._chips &&
              this._chips.forEach((e) => {
                (e.disabled = this._disabled),
                  e._changeDetectorRef.markForCheck();
              });
          }
          focus() {}
          _handleKeydown(e) {
            this._originatesFromChip(e) && this._keyManager.onKeydown(e);
          }
          _isValidIndex(e) {
            return e >= 0 && e < this._chips.length;
          }
          _allowFocusEscape() {
            if (-1 !== this.tabIndex) {
              const e = this.tabIndex;
              (this.tabIndex = -1), setTimeout(() => (this.tabIndex = e));
            }
          }
          _getChipStream(e) {
            return this._chips.changes.pipe(
              (0, Q.O)(null),
              (0, V.w)(() => (0, D.T)(...this._chips.map(e)))
            );
          }
          _originatesFromChip(e) {
            let i = e.target;
            for (; i && i !== this._elementRef.nativeElement; ) {
              if (i.classList.contains('mat-mdc-chip')) return !0;
              i = i.parentElement;
            }
            return !1;
          }
          _setUpFocusManagement() {
            this._chips.changes.pipe((0, Q.O)(this._chips)).subscribe((e) => {
              const i = [];
              e.forEach((n) => n._getActions().forEach((s) => i.push(s))),
                this._chipActions.reset(i),
                this._chipActions.notifyOnChanges();
            }),
              (this._keyManager = new I.Em(this._chipActions)
                .withVerticalOrientation()
                .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr')
                .withHomeAndEnd()
                .skipPredicate((e) => this._skipPredicate(e))),
              this.chipFocusChanges
                .pipe((0, k.R)(this._destroyed))
                .subscribe(({ chip: e }) => {
                  const i = e._getSourceAction(document.activeElement);
                  i && this._keyManager.updateActiveItem(i);
                }),
              this._dir?.change
                .pipe((0, k.R)(this._destroyed))
                .subscribe((e) =>
                  this._keyManager.withHorizontalOrientation(e)
                );
          }
          _skipPredicate(e) {
            return !e.isInteractive || e.disabled;
          }
          _trackChipSetChanges() {
            this._chips.changes
              .pipe((0, Q.O)(null), (0, k.R)(this._destroyed))
              .subscribe(() => {
                this.disabled &&
                  Promise.resolve().then(() => this._syncChipsState()),
                  this._redirectDestroyedChipFocus();
              });
          }
          _trackDestroyedFocusedChip() {
            this.chipDestroyedChanges
              .pipe((0, k.R)(this._destroyed))
              .subscribe((e) => {
                const n = this._chips.toArray().indexOf(e.chip);
                this._isValidIndex(n) &&
                  e.chip._hasFocus() &&
                  (this._lastDestroyedFocusedChipIndex = n);
              });
          }
          _redirectDestroyedChipFocus() {
            if (null != this._lastDestroyedFocusedChipIndex) {
              if (this._chips.length) {
                const e = Math.min(
                    this._lastDestroyedFocusedChipIndex,
                    this._chips.length - 1
                  ),
                  i = this._chips.toArray()[e];
                i.disabled
                  ? 1 === this._chips.length
                    ? this.focus()
                    : this._keyManager.setPreviousItemActive()
                  : i.focus();
              } else this.focus();
              this._lastDestroyedFocusedChipIndex = null;
            }
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(t.Y36(t.SBq), t.Y36(t.sBO), t.Y36(j.Is, 8));
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['mat-chip-set']],
            contentQueries: function (i, n, s) {
              if ((1 & i && t.Suo(s, B, 5), 2 & i)) {
                let r;
                t.iGM((r = t.CRH())) && (n._chips = r);
              }
            },
            hostAttrs: [1, 'mat-mdc-chip-set', 'mdc-evolution-chip-set'],
            hostVars: 1,
            hostBindings: function (i, n) {
              1 & i &&
                t.NdJ('keydown', function (r) {
                  return n._handleKeydown(r);
                }),
                2 & i && t.uIk('role', n.role);
            },
            inputs: { disabled: 'disabled', role: 'role' },
            features: [t.qOj],
            ngContentSelectors: yt,
            decls: 2,
            vars: 0,
            consts: [
              ['role', 'presentation', 1, 'mdc-evolution-chip-set__chips'],
            ],
            template: function (i, n) {
              1 & i && (t.F$t(), t.TgZ(0, 'div', 0), t.Hsn(1), t.qZA());
            },
            styles: [
              '.mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic{flex-grow:0}.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary{flex-basis:100%;justify-content:start}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}',
            ],
            encapsulation: 2,
            changeDetection: 0,
          }));
        }
        return o;
      })();
      class gi {
        constructor(a, e) {
          (this.source = a), (this.value = e);
        }
      }
      const _i = {
        provide: M.JU,
        useExisting: (0, t.Gpc)(() => Pt),
        multi: !0,
      };
      let Pt = (() => {
          class o extends Tt {
            constructor() {
              super(...arguments),
                (this._onTouched = () => {}),
                (this._onChange = () => {}),
                (this._defaultRole = 'listbox'),
                (this._defaultOptions = (0, t.f3M)(lt, { optional: !0 })),
                (this._multiple = !1),
                (this.ariaOrientation = 'horizontal'),
                (this._selectable = !0),
                (this.compareWith = (e, i) => e === i),
                (this._required = !1),
                (this._hideSingleSelectionIndicator =
                  this._defaultOptions?.hideSingleSelectionIndicator ?? !1),
                (this.change = new t.vpe()),
                (this._chips = void 0);
            }
            get multiple() {
              return this._multiple;
            }
            set multiple(e) {
              (this._multiple = (0, p.Ig)(e)), this._syncListboxProperties();
            }
            get selected() {
              const e = this._chips.toArray().filter((i) => i.selected);
              return this.multiple ? e : e[0];
            }
            get selectable() {
              return this._selectable;
            }
            set selectable(e) {
              (this._selectable = (0, p.Ig)(e)), this._syncListboxProperties();
            }
            get required() {
              return this._required;
            }
            set required(e) {
              this._required = (0, p.Ig)(e);
            }
            get hideSingleSelectionIndicator() {
              return this._hideSingleSelectionIndicator;
            }
            set hideSingleSelectionIndicator(e) {
              (this._hideSingleSelectionIndicator = (0, p.Ig)(e)),
                this._syncListboxProperties();
            }
            get chipSelectionChanges() {
              return this._getChipStream((e) => e.selectionChange);
            }
            get chipBlurChanges() {
              return this._getChipStream((e) => e._onBlur);
            }
            get value() {
              return this._value;
            }
            set value(e) {
              this.writeValue(e), (this._value = e);
            }
            ngAfterContentInit() {
              void 0 !== this._pendingInitialValue &&
                Promise.resolve().then(() => {
                  this._setSelectionByValue(this._pendingInitialValue, !1),
                    (this._pendingInitialValue = void 0);
                }),
                this._chips.changes
                  .pipe((0, Q.O)(null), (0, k.R)(this._destroyed))
                  .subscribe(() => {
                    this._syncListboxProperties();
                  }),
                this.chipBlurChanges
                  .pipe((0, k.R)(this._destroyed))
                  .subscribe(() => this._blur()),
                this.chipSelectionChanges
                  .pipe((0, k.R)(this._destroyed))
                  .subscribe((e) => {
                    this.multiple ||
                      this._chips.forEach((i) => {
                        i !== e.source && i._setSelectedState(!1, !1, !1);
                      }),
                      e.isUserInput && this._propagateChanges();
                  });
            }
            focus() {
              if (this.disabled) return;
              const e = this._getFirstSelectedChip();
              e && !e.disabled
                ? e.focus()
                : this._chips.length > 0
                ? this._keyManager.setFirstItemActive()
                : this._elementRef.nativeElement.focus();
            }
            writeValue(e) {
              this._chips
                ? this._setSelectionByValue(e, !1)
                : null != e && (this._pendingInitialValue = e);
            }
            registerOnChange(e) {
              this._onChange = e;
            }
            registerOnTouched(e) {
              this._onTouched = e;
            }
            setDisabledState(e) {
              this.disabled = e;
            }
            _setSelectionByValue(e, i = !0) {
              this._clearSelection(),
                Array.isArray(e)
                  ? e.forEach((n) => this._selectValue(n, i))
                  : this._selectValue(e, i);
            }
            _blur() {
              this.disabled ||
                setTimeout(() => {
                  this.focused || this._markAsTouched();
                });
            }
            _keydown(e) {
              e.keyCode === v.Mf && super._allowFocusEscape();
            }
            _markAsTouched() {
              this._onTouched(), this._changeDetectorRef.markForCheck();
            }
            _propagateChanges() {
              let e = null;
              (e = Array.isArray(this.selected)
                ? this.selected.map((i) => i.value)
                : this.selected
                ? this.selected.value
                : void 0),
                (this._value = e),
                this.change.emit(new gi(this, e)),
                this._onChange(e),
                this._changeDetectorRef.markForCheck();
            }
            _clearSelection(e) {
              this._chips.forEach((i) => {
                i !== e && i.deselect();
              });
            }
            _selectValue(e, i) {
              const n = this._chips.find(
                (s) => null != s.value && this.compareWith(s.value, e)
              );
              return n && (i ? n.selectViaInteraction() : n.select()), n;
            }
            _syncListboxProperties() {
              this._chips &&
                Promise.resolve().then(() => {
                  this._chips.forEach((e) => {
                    (e._chipListMultiple = this.multiple),
                      (e.chipListSelectable = this._selectable),
                      (e._chipListHideSingleSelectionIndicator =
                        this.hideSingleSelectionIndicator),
                      e._changeDetectorRef.markForCheck();
                  });
                });
            }
            _getFirstSelectedChip() {
              return Array.isArray(this.selected)
                ? this.selected.length
                  ? this.selected[0]
                  : void 0
                : this.selected;
            }
            _skipPredicate(e) {
              return !e.isInteractive;
            }
            static #t = (this.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = t.n5z(o)))(n || o);
              };
            })());
            static #e = (this.ɵcmp = t.Xpm({
              type: o,
              selectors: [['mat-chip-listbox']],
              contentQueries: function (i, n, s) {
                if ((1 & i && t.Suo(s, Wt, 5), 2 & i)) {
                  let r;
                  t.iGM((r = t.CRH())) && (n._chips = r);
                }
              },
              hostAttrs: [
                'ngSkipHydration',
                '',
                1,
                'mdc-evolution-chip-set',
                'mat-mdc-chip-listbox',
              ],
              hostVars: 11,
              hostBindings: function (i, n) {
                1 & i &&
                  t.NdJ('focus', function () {
                    return n.focus();
                  })('blur', function () {
                    return n._blur();
                  })('keydown', function (r) {
                    return n._keydown(r);
                  }),
                  2 & i &&
                    (t.Ikx('tabIndex', n.empty ? -1 : n.tabIndex),
                    t.uIk('role', n.role)(
                      'aria-describedby',
                      n._ariaDescribedby || null
                    )('aria-required', n.role ? n.required : null)(
                      'aria-disabled',
                      n.disabled.toString()
                    )('aria-multiselectable', n.multiple)(
                      'aria-orientation',
                      n.ariaOrientation
                    ),
                    t.ekj('mat-mdc-chip-list-disabled', n.disabled)(
                      'mat-mdc-chip-list-required',
                      n.required
                    ));
              },
              inputs: {
                tabIndex: 'tabIndex',
                multiple: 'multiple',
                ariaOrientation: ['aria-orientation', 'ariaOrientation'],
                selectable: 'selectable',
                compareWith: 'compareWith',
                required: 'required',
                hideSingleSelectionIndicator: 'hideSingleSelectionIndicator',
                value: 'value',
              },
              outputs: { change: 'change' },
              features: [t._Bn([_i]), t.qOj],
              ngContentSelectors: yt,
              decls: 2,
              vars: 0,
              consts: [
                ['role', 'presentation', 1, 'mdc-evolution-chip-set__chips'],
              ],
              template: function (i, n) {
                1 & i && (t.F$t(), t.TgZ(0, 'div', 0), t.Hsn(1), t.qZA());
              },
              styles: [
                '.mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic{flex-grow:0}.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary{flex-basis:100%;justify-content:start}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return o;
        })(),
        yi = (() => {
          class o {
            static #t = (this.ɵfac = function (i) {
              return new (i || o)();
            });
            static #e = (this.ɵmod = t.oAB({ type: o }));
            static #i = (this.ɵinj = t.cJS({
              providers: [
                g.rD,
                { provide: lt, useValue: { separatorKeyCodes: [v.K5] } },
              ],
              imports: [g.BQ, m.ez, g.si, g.BQ],
            }));
          }
          return o;
        })();
      var Xt = h(9760);
      const Ci = ['button'],
        ki = ['*'],
        te = new t.OlP('MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS'),
        ee = new t.OlP('MatButtonToggleGroup'),
        Mi = { provide: M.JU, useExisting: (0, t.Gpc)(() => oe), multi: !0 };
      let ie = 0;
      class ne {
        constructor(a, e) {
          (this.source = a), (this.value = e);
        }
      }
      let oe = (() => {
        class o {
          get name() {
            return this._name;
          }
          set name(e) {
            (this._name = e), this._markButtonsForCheck();
          }
          get vertical() {
            return this._vertical;
          }
          set vertical(e) {
            this._vertical = (0, p.Ig)(e);
          }
          get value() {
            const e = this._selectionModel ? this._selectionModel.selected : [];
            return this.multiple
              ? e.map((i) => i.value)
              : e[0]
              ? e[0].value
              : void 0;
          }
          set value(e) {
            this._setSelectionByValue(e), this.valueChange.emit(this.value);
          }
          get selected() {
            const e = this._selectionModel ? this._selectionModel.selected : [];
            return this.multiple ? e : e[0] || null;
          }
          get multiple() {
            return this._multiple;
          }
          set multiple(e) {
            (this._multiple = (0, p.Ig)(e)), this._markButtonsForCheck();
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            (this._disabled = (0, p.Ig)(e)), this._markButtonsForCheck();
          }
          constructor(e, i) {
            (this._changeDetector = e),
              (this._vertical = !1),
              (this._multiple = !1),
              (this._disabled = !1),
              (this._controlValueAccessorChangeFn = () => {}),
              (this._onTouched = () => {}),
              (this._name = 'mat-button-toggle-group-' + ie++),
              (this.valueChange = new t.vpe()),
              (this.change = new t.vpe()),
              (this.appearance = i && i.appearance ? i.appearance : 'standard');
          }
          ngOnInit() {
            this._selectionModel = new Xt.Ov(this.multiple, void 0, !1);
          }
          ngAfterContentInit() {
            this._selectionModel.select(
              ...this._buttonToggles.filter((e) => e.checked)
            );
          }
          writeValue(e) {
            (this.value = e), this._changeDetector.markForCheck();
          }
          registerOnChange(e) {
            this._controlValueAccessorChangeFn = e;
          }
          registerOnTouched(e) {
            this._onTouched = e;
          }
          setDisabledState(e) {
            this.disabled = e;
          }
          _emitChangeEvent(e) {
            const i = new ne(e, this.value);
            (this._rawValue = i.value),
              this._controlValueAccessorChangeFn(i.value),
              this.change.emit(i);
          }
          _syncButtonToggle(e, i, n = !1, s = !1) {
            !this.multiple &&
              this.selected &&
              !e.checked &&
              (this.selected.checked = !1),
              this._selectionModel
                ? i
                  ? this._selectionModel.select(e)
                  : this._selectionModel.deselect(e)
                : (s = !0),
              s
                ? Promise.resolve().then(() => this._updateModelValue(e, n))
                : this._updateModelValue(e, n);
          }
          _isSelected(e) {
            return this._selectionModel && this._selectionModel.isSelected(e);
          }
          _isPrechecked(e) {
            return (
              !(typeof this._rawValue > 'u') &&
              (this.multiple && Array.isArray(this._rawValue)
                ? this._rawValue.some((i) => null != e.value && i === e.value)
                : e.value === this._rawValue)
            );
          }
          _setSelectionByValue(e) {
            (this._rawValue = e),
              this._buttonToggles &&
                (this.multiple && e
                  ? (Array.isArray(e),
                    this._clearSelection(),
                    e.forEach((i) => this._selectValue(i)))
                  : (this._clearSelection(), this._selectValue(e)));
          }
          _clearSelection() {
            this._selectionModel.clear(),
              this._buttonToggles.forEach((e) => (e.checked = !1));
          }
          _selectValue(e) {
            const i = this._buttonToggles.find(
              (n) => null != n.value && n.value === e
            );
            i && ((i.checked = !0), this._selectionModel.select(i));
          }
          _updateModelValue(e, i) {
            i && this._emitChangeEvent(e), this.valueChange.emit(this.value);
          }
          _markButtonsForCheck() {
            this._buttonToggles?.forEach((e) => e._markForCheck());
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(t.Y36(t.sBO), t.Y36(te, 8));
          });
          static #e = (this.ɵdir = t.lG2({
            type: o,
            selectors: [['mat-button-toggle-group']],
            contentQueries: function (i, n, s) {
              if ((1 & i && t.Suo(s, ae, 5), 2 & i)) {
                let r;
                t.iGM((r = t.CRH())) && (n._buttonToggles = r);
              }
            },
            hostAttrs: ['role', 'group', 1, 'mat-button-toggle-group'],
            hostVars: 5,
            hostBindings: function (i, n) {
              2 & i &&
                (t.uIk('aria-disabled', n.disabled),
                t.ekj('mat-button-toggle-vertical', n.vertical)(
                  'mat-button-toggle-group-appearance-standard',
                  'standard' === n.appearance
                ));
            },
            inputs: {
              appearance: 'appearance',
              name: 'name',
              vertical: 'vertical',
              value: 'value',
              multiple: 'multiple',
              disabled: 'disabled',
            },
            outputs: { valueChange: 'valueChange', change: 'change' },
            exportAs: ['matButtonToggleGroup'],
            features: [t._Bn([Mi, { provide: ee, useExisting: o }])],
          }));
        }
        return o;
      })();
      const Ti = (0, g.Kr)(class {});
      let ae = (() => {
          class o extends Ti {
            get buttonId() {
              return `${this.id}-button`;
            }
            get appearance() {
              return this.buttonToggleGroup
                ? this.buttonToggleGroup.appearance
                : this._appearance;
            }
            set appearance(e) {
              this._appearance = e;
            }
            get checked() {
              return this.buttonToggleGroup
                ? this.buttonToggleGroup._isSelected(this)
                : this._checked;
            }
            set checked(e) {
              const i = (0, p.Ig)(e);
              i !== this._checked &&
                ((this._checked = i),
                this.buttonToggleGroup &&
                  this.buttonToggleGroup._syncButtonToggle(this, this._checked),
                this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return (
                this._disabled ||
                (this.buttonToggleGroup && this.buttonToggleGroup.disabled)
              );
            }
            set disabled(e) {
              this._disabled = (0, p.Ig)(e);
            }
            constructor(e, i, n, s, r, c) {
              super(),
                (this._changeDetectorRef = i),
                (this._elementRef = n),
                (this._focusMonitor = s),
                (this._checked = !1),
                (this.ariaLabelledby = null),
                (this._disabled = !1),
                (this.change = new t.vpe());
              const l = Number(r);
              (this.tabIndex = l || 0 === l ? l : null),
                (this.buttonToggleGroup = e),
                (this.appearance =
                  c && c.appearance ? c.appearance : 'standard');
            }
            ngOnInit() {
              const e = this.buttonToggleGroup;
              (this.id = this.id || 'mat-button-toggle-' + ie++),
                e &&
                  (e._isPrechecked(this)
                    ? (this.checked = !0)
                    : e._isSelected(this) !== this._checked &&
                      e._syncButtonToggle(this, this._checked));
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              const e = this.buttonToggleGroup;
              this._focusMonitor.stopMonitoring(this._elementRef),
                e &&
                  e._isSelected(this) &&
                  e._syncButtonToggle(this, !1, !1, !0);
            }
            focus(e) {
              this._buttonElement.nativeElement.focus(e);
            }
            _onButtonClick() {
              const e = !!this._isSingleSelector() || !this._checked;
              e !== this._checked &&
                ((this._checked = e),
                this.buttonToggleGroup &&
                  (this.buttonToggleGroup._syncButtonToggle(
                    this,
                    this._checked,
                    !0
                  ),
                  this.buttonToggleGroup._onTouched())),
                this.change.emit(new ne(this, this.value));
            }
            _markForCheck() {
              this._changeDetectorRef.markForCheck();
            }
            _getButtonName() {
              return this._isSingleSelector()
                ? this.buttonToggleGroup.name
                : this.name || null;
            }
            _isSingleSelector() {
              return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || o)(
                t.Y36(ee, 8),
                t.Y36(t.sBO),
                t.Y36(t.SBq),
                t.Y36(I.tE),
                t.$8M('tabindex'),
                t.Y36(te, 8)
              );
            });
            static #e = (this.ɵcmp = t.Xpm({
              type: o,
              selectors: [['mat-button-toggle']],
              viewQuery: function (i, n) {
                if ((1 & i && t.Gf(Ci, 5), 2 & i)) {
                  let s;
                  t.iGM((s = t.CRH())) && (n._buttonElement = s.first);
                }
              },
              hostAttrs: ['role', 'presentation', 1, 'mat-button-toggle'],
              hostVars: 12,
              hostBindings: function (i, n) {
                1 & i &&
                  t.NdJ('focus', function () {
                    return n.focus();
                  }),
                  2 & i &&
                    (t.uIk('aria-label', null)('aria-labelledby', null)(
                      'id',
                      n.id
                    )('name', null),
                    t.ekj('mat-button-toggle-standalone', !n.buttonToggleGroup)(
                      'mat-button-toggle-checked',
                      n.checked
                    )('mat-button-toggle-disabled', n.disabled)(
                      'mat-button-toggle-appearance-standard',
                      'standard' === n.appearance
                    ));
              },
              inputs: {
                disableRipple: 'disableRipple',
                ariaLabel: ['aria-label', 'ariaLabel'],
                ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
                id: 'id',
                name: 'name',
                value: 'value',
                tabIndex: 'tabIndex',
                appearance: 'appearance',
                checked: 'checked',
                disabled: 'disabled',
              },
              outputs: { change: 'change' },
              exportAs: ['matButtonToggle'],
              features: [t.qOj],
              ngContentSelectors: ki,
              decls: 6,
              vars: 9,
              consts: [
                [
                  'type',
                  'button',
                  1,
                  'mat-button-toggle-button',
                  'mat-focus-indicator',
                  3,
                  'id',
                  'disabled',
                  'click',
                ],
                ['button', ''],
                [1, 'mat-button-toggle-label-content'],
                [1, 'mat-button-toggle-focus-overlay'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-button-toggle-ripple',
                  3,
                  'matRippleTrigger',
                  'matRippleDisabled',
                ],
              ],
              template: function (i, n) {
                if (
                  (1 & i &&
                    (t.F$t(),
                    t.TgZ(0, 'button', 0, 1),
                    t.NdJ('click', function () {
                      return n._onButtonClick();
                    }),
                    t.TgZ(2, 'span', 2),
                    t.Hsn(3),
                    t.qZA()(),
                    t._UZ(4, 'span', 3)(5, 'span', 4)),
                  2 & i)
                ) {
                  const s = t.MAs(1);
                  t.Q6J('id', n.buttonId)('disabled', n.disabled || null),
                    t.uIk('tabindex', n.disabled ? -1 : n.tabIndex)(
                      'aria-pressed',
                      n.checked
                    )('name', n._getButtonName())('aria-label', n.ariaLabel)(
                      'aria-labelledby',
                      n.ariaLabelledby
                    ),
                    t.xp6(5),
                    t.Q6J('matRippleTrigger', s)(
                      'matRippleDisabled',
                      n.disableRipple || n.disabled
                    );
                }
              },
              dependencies: [g.wG],
              styles: [
                '.mat-button-toggle-standalone,.mat-button-toggle-group{--mat-legacy-button-toggle-height:36px;--mat-legacy-button-toggle-shape:2px;--mat-legacy-button-toggle-focus-state-layer-opacity:1;position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{--mat-standard-button-toggle-shape:4px;--mat-standard-button-toggle-hover-state-layer-opacity:0.04;--mat-standard-button-toggle-focus-state-layer-opacity:0.12;border-radius:var(--mat-standard-button-toggle-shape);border:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-text-font)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard{--mat-standard-button-toggle-shape:4px;--mat-standard-button-toggle-hover-state-layer-opacity:0.04;--mat-standard-button-toggle-focus-state-layer-opacity:0.12;color:var(--mat-standard-button-toggle-text-color);background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-text-font)}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color)}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color);background-color:var(--mat-standard-button-toggle-selected-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color)}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity)}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity)}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return o;
        })(),
        Pi = (() => {
          class o {
            static #t = (this.ɵfac = function (i) {
              return new (i || o)();
            });
            static #e = (this.ɵmod = t.oAB({ type: o }));
            static #i = (this.ɵinj = t.cJS({ imports: [g.BQ, g.si, g.BQ] }));
          }
          return o;
        })();
      var se = h(3344),
        It = function (o, a, e, i) {
          var r,
            n = arguments.length,
            s =
              n < 3
                ? a
                : null === i
                ? (i = Object.getOwnPropertyDescriptor(a, e))
                : i;
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.decorate
          )
            s = Reflect.decorate(o, a, e, i);
          else
            for (var c = o.length - 1; c >= 0; c--)
              (r = o[c]) &&
                (s = (n < 3 ? r(s) : n > 3 ? r(a, e, s) : r(a, e)) || s);
          return n > 3 && s && Object.defineProperty(a, e, s), s;
        },
        K = function (o, a) {
          if (
            'object' == typeof Reflect &&
            'function' == typeof Reflect.metadata
          )
            return Reflect.metadata(o, a);
        };
      function Ii(o, a) {
        1 & o &&
          (t.TgZ(0, 'div', 12)(1, 'p'),
          t._uU(
            2,
            ' Ooops - es gibt keine Fragen mit diesen Eigenschaften. Versuche eine andere Kombination. '
          ),
          t.qZA()());
      }
      function Oi(o, a) {
        if (
          (1 & o && (t.TgZ(0, 'mat-button-toggle', 26), t._uU(1), t.qZA()),
          2 & o)
        ) {
          const e = a.$implicit;
          t.Q6J('value', e), t.xp6(1), t.Oqu(e);
        }
      }
      function Si(o, a) {
        if (
          (1 & o && (t.TgZ(0, 'mat-chip', 31, 32), t._uU(2), t.qZA()), 2 & o)
        ) {
          const e = a.$implicit,
            i = t.oxw(4);
          t.Q6J('value', e)(
            'ngClass',
            i.tags.length > 6 ? 'mat-chip-small' : 'mat-chip-large'
          ),
            t.xp6(2),
            t.hij(' ', e, ' ');
        }
      }
      function Ai(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div', 14)(1, 'div', 27)(2, 'div', 16),
            t._uU(3, 'Tags'),
            t.qZA(),
            t.TgZ(4, 'button', 21),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(3);
              return t.KtG(n.onDeselectAllTagClick());
            }),
            t.TgZ(5, 'mat-icon'),
            t._uU(6, 'restart_alt'),
            t.qZA()()(),
            t.TgZ(7, 'div', 28)(8, 'mat-chip-listbox', 29),
            t.NdJ('change', function (n) {
              t.CHM(e);
              const s = t.oxw(3);
              return t.KtG(s.onTagSelectionChange(n));
            })('ngModelChange', function (n) {
              t.CHM(e);
              const s = t.oxw(3);
              return t.KtG((s.chosenTags = n));
            }),
            t.YNc(9, Si, 3, 3, 'mat-chip', 30),
            t.qZA()()();
        }
        if (2 & o) {
          const e = t.oxw(3);
          t.xp6(4),
            t.Q6J('disabled', 0 === e.chosenTags.length),
            t.xp6(4),
            t.Q6J('ngModel', e.chosenTags),
            t.xp6(1),
            t.Q6J('ngForOf', e.tags);
        }
      }
      function Di(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div', 13)(1, 'div', 14)(2, 'div', 15)(3, 'div', 16),
            t._uU(4, 'Fragenanzahl'),
            t.qZA()(),
            t.TgZ(5, 'div', 17)(6, 'mat-slider', 18),
            t.NdJ('input', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onSliderChange(n));
            })('ngModelChange', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG((s.questionCount = n));
            }),
            t.qZA(),
            t.TgZ(7, 'div', 19),
            t._uU(8),
            t.qZA()()(),
            t.TgZ(9, 'div', 14)(10, 'div', 20)(11, 'div', 16),
            t._uU(12, 'Schwierigkeitsgrad'),
            t.qZA(),
            t.TgZ(13, 'button', 21),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(2);
              return t.KtG(n.onDeselectAllDifficultyClick());
            }),
            t.TgZ(14, 'mat-icon'),
            t._uU(15, 'restart_alt'),
            t.qZA()()(),
            t.TgZ(16, 'div', 22)(17, 'mat-button-toggle-group', 23),
            t.NdJ('change', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onButtonToggleChange(n));
            })('ngModelChange', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG((s.chosenDifficulty = n));
            }),
            t.YNc(18, Oi, 2, 2, 'mat-button-toggle', 24),
            t.qZA()()(),
            t.YNc(19, Ai, 10, 3, 'div', 25),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(6),
            t.Q6J('ngModel', e.questionCount),
            t.xp6(2),
            t.hij(' ', e.questionCount, ' '),
            t.xp6(5),
            t.Q6J('disabled', 0 === e.chosenDifficulty.length),
            t.xp6(4),
            t.Q6J('ngModel', e.chosenDifficulty),
            t.xp6(1),
            t.Q6J('ngForOf', e.difficulties),
            t.xp6(1),
            t.Q6J('ngIf', 0 !== e.tags.length);
        }
      }
      function Ri(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-actions')(1, 'div', 7)(2, 'button', 8),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onStartClick());
            }),
            t._uU(3, ' Quiz starten '),
            t.qZA(),
            t.YNc(4, Ii, 3, 0, 'div', 9),
            t.TgZ(5, 'mat-slide-toggle', 10),
            t.NdJ('change', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.expertModeToggle());
            }),
            t._uU(6, ' Expertenmodus aktivieren '),
            t.qZA()(),
            t.YNc(7, Di, 20, 6, 'div', 11),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(2),
            t.Q6J('disabled', !e.isValid),
            t.xp6(2),
            t.Q6J('ngIf', !e.isValid),
            t.xp6(1),
            t.Q6J('checked', e.expertModeStatus),
            t.xp6(2),
            t.Q6J('ngIf', e.expertModeStatus);
        }
      }
      function Ei(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-card-content'), t._UZ(1, 'mat-spinner', 33), t.qZA());
      }
      class z {
        constructor(a) {
          (this._store = a),
            (this.$destroyed = new _.x()),
            (this.questionCount = 10),
            (this.chosenTags = []),
            (this.chosenDifficulty = []),
            (this.isValid = !0),
            (this.tags = []),
            (this.difficulties = []),
            (this.expertModeStatus = !1);
        }
        onStartClick() {
          this._store
            .dispatch(
              new bt(this.questionCount, this.chosenTags, this.chosenDifficulty)
            )
            .subscribe((e) => {
              e.quiz.questions.length > 0
                ? (this._store.dispatch(new at(this.questionCount)),
                  (this.isValid = !0))
                : (this.isValid = !1);
            });
        }
        ngOnInit() {
          this._store.select(y.getExpertMode).subscribe((a) => {
            this.expertModeStatus = a;
          }),
            this.metaData$?.subscribe((a) => {
              if (a) {
                const e = [...a.tags],
                  i = [...a.difficulties];
                (this.tags = e.sort()), (this.difficulties = i.sort());
              }
            });
        }
        ngOnDestroy() {
          this.$destroyed.next(!0);
        }
        navigateTo(a) {
          return (0, He.Z)(function* () {
            return new Ye.Fg([a]);
          })();
        }
        expertModeToggle() {
          this._store.dispatch(new Ht());
        }
        onBackBtnClick() {
          this.navigateTo('/');
        }
        onSliderChange(a) {}
        onButtonToggleChange(a) {
          (this.chosenDifficulty = a.value), (this.isValid = !0);
        }
        onTagSelectionChange(a) {
          (this.chosenTags = a.value), (this.isValid = !0);
        }
        onDeselectAllTagClick() {
          this.chosenTags = [];
        }
        onDeselectAllDifficultyClick() {
          this.chosenDifficulty = [];
        }
        static #t = (this.ɵfac = function (e) {
          return new (e || z)(t.Y36(x.yh));
        });
        static #e = (this.ɵcmp = t.Xpm({
          type: z,
          selectors: [['solid-quiz-start']],
          decls: 25,
          vars: 4,
          consts: [
            [1, 'toolbar-container'],
            [1, 'toolbar'],
            ['mat-icon-button', '', 1, 'button-back', 3, 'click'],
            [1, 'title'],
            [1, 'content-container'],
            [4, 'ngIf', 'ngIfElse'],
            ['quizLoading', ''],
            [1, 'button-container'],
            [
              'mat-raised-button',
              '',
              'color',
              'primary',
              1,
              'startBtn',
              3,
              'disabled',
              'click',
            ],
            ['class', 'formInvalid', 4, 'ngIf'],
            [1, 'expBtn', 3, 'checked', 'change'],
            ['class', 'config', 4, 'ngIf'],
            [1, 'formInvalid'],
            [1, 'config'],
            [1, 'row'],
            ['id', 'questionCount', 1, 'controlHeader'],
            [1, 'mat-subheader'],
            ['id', 'questionCount', 1, 'controlElement'],
            [
              'min',
              '1',
              'max',
              '30',
              'step',
              '1',
              3,
              'ngModel',
              'input',
              'ngModelChange',
            ],
            [1, 'displayValueBox'],
            ['id', 'difficulty', 1, 'controlHeader'],
            [
              'mat-icon-button',
              '',
              1,
              'deselectAllBtn',
              3,
              'disabled',
              'click',
            ],
            ['id', 'difficulty', 1, 'controlElement'],
            [
              'multiple',
              '',
              1,
              'difficulties',
              3,
              'ngModel',
              'change',
              'ngModelChange',
            ],
            [3, 'value', 4, 'ngFor', 'ngForOf'],
            ['class', 'row', 4, 'ngIf'],
            [3, 'value'],
            ['id', 'tag', 1, 'controlHeader'],
            ['id', 'tag', 1, 'controlElement'],
            [
              'selectable',
              'true',
              'multiple',
              'true',
              3,
              'ngModel',
              'change',
              'ngModelChange',
            ],
            [3, 'value', 'ngClass', 4, 'ngFor', 'ngForOf'],
            [3, 'value', 'ngClass'],
            ['c', 'matChip'],
            ['color', 'primary'],
          ],
          template: function (e, i) {
            if (
              (1 & e &&
                (t.TgZ(0, 'div', 0)(1, 'div', 1)(2, 'button', 2),
                t.NdJ('click', function () {
                  return i.onBackBtnClick();
                }),
                t.TgZ(3, 'mat-icon'),
                t._uU(4, 'arrow_back'),
                t.qZA()(),
                t.TgZ(5, 'div', 3)(6, 'h2'),
                t._uU(7, 'Selbsttest'),
                t.qZA()()()(),
                t.TgZ(8, 'mat-card')(9, 'mat-card-content', 4)(10, 'p'),
                t._uU(
                  11,
                  ' Mit diesen Fragen kann der pers\xf6nliche Wissensstand in verschiedenen Teilbereichen \xfcberpr\xfcft werden. Die Fragen werden zuf\xe4llig aus unserem Fragenpool ausgew\xe4hlt. '
                ),
                t.qZA(),
                t.TgZ(12, 'p'),
                t._uU(
                  13,
                  ' Das Feedback gibt genauere Hinweise dar\xfcber, warum die gegebenen Antworten falsch (oder richtig) waren und zeigt weitere Hintergrundinformationen auf. '
                ),
                t.qZA(),
                t.TgZ(14, 'p'),
                t._uU(
                  15,
                  ' Das Quiz kann direkt mit einer Auswahl von 10 Fragen gestartet werden. '
                ),
                t.qZA(),
                t.TgZ(16, 'p'),
                t._uU(17, ' Im '),
                t.TgZ(18, 'em'),
                t._uU(19, 'Expertenmodus'),
                t.qZA(),
                t._uU(
                  20,
                  ' k\xf6nnen Fragenanzahl, Schwierigkeitsgrad und Themengebiet genauer eingestellt werden. '
                ),
                t.qZA()(),
                t.YNc(21, Ri, 8, 4, 'mat-card-actions', 5),
                t.ALo(22, 'async'),
                t.qZA(),
                t.YNc(23, Ei, 2, 0, 'ng-template', null, 6, t.W1O)),
              2 & e)
            ) {
              const n = t.MAs(24);
              t.xp6(21),
                t.Q6J('ngIf', t.lcZ(22, 2, i.metaData$))('ngIfElse', n);
            }
          },
          dependencies: [
            m.mk,
            m.sg,
            m.O5,
            M.JJ,
            M.On,
            T.lW,
            T.RK,
            P.a8,
            P.hq,
            P.dn,
            Jt.Ou,
            F.Hw,
            rt.pH,
            B,
            Pt,
            oe,
            ae,
            se.Rr,
            m.Ov,
          ],
          styles: [
            '[_nghost-%COMP%]{display:block}mat-card[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}}@media (max-width: 440px){mat-card[_ngcontent-%COMP%]{top:62px}}mat-form-field[_ngcontent-%COMP%]{width:20em;margin-left:.75em}mat-card-title[_ngcontent-%COMP%]{font-size:20px;padding-left:20px}mat-card-content[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}mat-list[_ngcontent-%COMP%]{margin-left:2px}mat-form-field[_ngcontent-%COMP%]{width:85%;padding-left:3%}mat-card-actions[_ngcontent-%COMP%]{padding:0;margin-left:0;margin-right:0}.content-container[_ngcontent-%COMP%]{text-align:left;font-size:15px}.mat-standard-chip[_ngcontent-%COMP%]   .mat-chip-remove[_ngcontent-%COMP%]{color:#fff}.formInvalid[_ngcontent-%COMP%]{box-sizing:border-box;font-size:11px;color:red;font-style:italic;text-align:center;padding:0 8%}hr[_ngcontent-%COMP%]{margin:15px}.row[_ngcontent-%COMP%]{margin-bottom:10px}.displayValueBox[_ngcontent-%COMP%]{border:solid 2px;padding:6px;height:35px;width:40px;transform:translateY(-3px);font-weight:500;margin-left:4%;text-align:center;border-radius:8px}.mat-slider[_ngcontent-%COMP%]{width:100%;margin:-10px}.mat-subheader[_ngcontent-%COMP%]{font-size:15px;padding:16px 0}.controlHeader[_ngcontent-%COMP%]{float:left;width:100%;display:flex;align-items:center}.controlElement[_ngcontent-%COMP%]{display:flex;float:left;width:100%;margin-bottom:10px}.content-container[_ngcontent-%COMP%]{padding:10px 10px 0}.button-container[_ngcontent-%COMP%]   .startBtn[_ngcontent-%COMP%]{margin:10px 10px 20px!important;border-radius:7px}.button-container[_ngcontent-%COMP%]   .expBtn[_ngcontent-%COMP%]{margin:10px 10px 20px;padding:0}.deselectAllBtn[_ngcontent-%COMP%]{color:#ff4500}.row[_ngcontent-%COMP%]:after{content:"";display:table;clear:both}#difficulty[_ngcontent-%COMP%]   .mat-button-toggle-group[_ngcontent-%COMP%]{width:100%;border:none;margin-top:10px;justify-content:space-between}#difficulty[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{width:20%;border-radius:7px;height:39px;font-weight:500}@media (max-width: 440px){#difficulty[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{margin-right:10px}}@media (min-width: 441px){#difficulty[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]{margin-right:20px}}#difficulty[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%]:last-child{margin-right:0}#difficulty[_ngcontent-%COMP%]     .mat-button-toggle-label-content{line-height:35px}#tag[_ngcontent-%COMP%]     .mat-chip-list-wrapper{width:100%;margin:0;justify-content:space-between}#tag[_ngcontent-%COMP%]   .mat-chip-list[_ngcontent-%COMP%]{width:100%}#tag[_ngcontent-%COMP%]   .mat-chip[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:10px 0;display:block;padding:5px 10px;text-align:center}@media (max-width: 440px){#tag[_ngcontent-%COMP%]   .mat-chip-small[_ngcontent-%COMP%]{width:28%}#tag[_ngcontent-%COMP%]   .mat-chip-large[_ngcontent-%COMP%]{width:48%}}@media (min-width: 441px){#tag[_ngcontent-%COMP%]   .mat-chip[_ngcontent-%COMP%]{width:23%}}#tag[_ngcontent-%COMP%]   .mat-standard-chip[_ngcontent-%COMP%]:focus:after{opacity:0}.mat-subheader[_ngcontent-%COMP%]{font-weight:500}.button-container[_ngcontent-%COMP%]{text-align:center;position:relative}.button-container[_ngcontent-%COMP%]   .startBtn[_ngcontent-%COMP%]{font-size:15px;width:35%}.button-container[_ngcontent-%COMP%]   .expBtn[_ngcontent-%COMP%]{display:block;font-weight:500}.config[_ngcontent-%COMP%]{position:relative;padding:0 10px}  .mat-select-value-text{display:none}@media (max-width: 999px){.toolbar-container[_ngcontent-%COMP%]{width:100%}}@media (min-width: 1000px){.toolbar-container[_ngcontent-%COMP%]{width:calc(100% - 300px)}}.toolbar-container[_ngcontent-%COMP%]{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar[_ngcontent-%COMP%]{width:100%;position:relative;min-height:52px}.toolbar[_ngcontent-%COMP%]   .button-back[_ngcontent-%COMP%]{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:21px;transform:translateY(12px);margin-bottom:-2px}',
          ],
        }));
      }
      It(
        [(0, x.Ph)(y.getMeta), K('design:type', Object)],
        z.prototype,
        'metaData$',
        void 0
      ),
        It(
          [(0, x.Ph)(y.getExpertMode), K('design:type', Boolean)],
          z.prototype,
          'expertMode',
          void 0
        ),
        It(
          [
            (0, Je.T)(),
            K('design:type', Function),
            K('design:paramtypes', [String]),
            K('design:returntype', Promise),
          ],
          z.prototype,
          'navigateTo',
          null
        );
      var W = h(4978),
        Z = h(191),
        Fi = h(1900),
        re = h(2036);
      const Qi = ['input'],
        qi = ['*'];
      let ce = 0;
      class le {
        constructor(a, e) {
          (this.source = a), (this.value = e);
        }
      }
      const Bi = {
          provide: M.JU,
          useExisting: (0, t.Gpc)(() => he),
          multi: !0,
        },
        de = new t.OlP('MatRadioGroup'),
        zi = new t.OlP('mat-radio-default-options', {
          providedIn: 'root',
          factory: function Zi() {
            return { color: 'accent' };
          },
        });
      let Li = (() => {
        class o {
          get name() {
            return this._name;
          }
          set name(e) {
            (this._name = e), this._updateRadioButtonNames();
          }
          get labelPosition() {
            return this._labelPosition;
          }
          set labelPosition(e) {
            (this._labelPosition = 'before' === e ? 'before' : 'after'),
              this._markRadiosForCheck();
          }
          get value() {
            return this._value;
          }
          set value(e) {
            this._value !== e &&
              ((this._value = e),
              this._updateSelectedRadioFromValue(),
              this._checkSelectedRadioButton());
          }
          _checkSelectedRadioButton() {
            this._selected &&
              !this._selected.checked &&
              (this._selected.checked = !0);
          }
          get selected() {
            return this._selected;
          }
          set selected(e) {
            (this._selected = e),
              (this.value = e ? e.value : null),
              this._checkSelectedRadioButton();
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            (this._disabled = (0, p.Ig)(e)), this._markRadiosForCheck();
          }
          get required() {
            return this._required;
          }
          set required(e) {
            (this._required = (0, p.Ig)(e)), this._markRadiosForCheck();
          }
          constructor(e) {
            (this._changeDetector = e),
              (this._value = null),
              (this._name = 'mat-radio-group-' + ce++),
              (this._selected = null),
              (this._isInitialized = !1),
              (this._labelPosition = 'after'),
              (this._disabled = !1),
              (this._required = !1),
              (this._controlValueAccessorChangeFn = () => {}),
              (this.onTouched = () => {}),
              (this.change = new t.vpe());
          }
          ngAfterContentInit() {
            (this._isInitialized = !0),
              (this._buttonChanges = this._radios.changes.subscribe(() => {
                this.selected &&
                  !this._radios.find((e) => e === this.selected) &&
                  (this._selected = null);
              }));
          }
          ngOnDestroy() {
            this._buttonChanges?.unsubscribe();
          }
          _touch() {
            this.onTouched && this.onTouched();
          }
          _updateRadioButtonNames() {
            this._radios &&
              this._radios.forEach((e) => {
                (e.name = this.name), e._markForCheck();
              });
          }
          _updateSelectedRadioFromValue() {
            this._radios &&
              (null === this._selected ||
                this._selected.value !== this._value) &&
              ((this._selected = null),
              this._radios.forEach((i) => {
                (i.checked = this.value === i.value),
                  i.checked && (this._selected = i);
              }));
          }
          _emitChangeEvent() {
            this._isInitialized &&
              this.change.emit(new le(this._selected, this._value));
          }
          _markRadiosForCheck() {
            this._radios && this._radios.forEach((e) => e._markForCheck());
          }
          writeValue(e) {
            (this.value = e), this._changeDetector.markForCheck();
          }
          registerOnChange(e) {
            this._controlValueAccessorChangeFn = e;
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            (this.disabled = e), this._changeDetector.markForCheck();
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(t.Y36(t.sBO));
          });
          static #e = (this.ɵdir = t.lG2({
            type: o,
            inputs: {
              color: 'color',
              name: 'name',
              labelPosition: 'labelPosition',
              value: 'value',
              selected: 'selected',
              disabled: 'disabled',
              required: 'required',
            },
            outputs: { change: 'change' },
          }));
        }
        return o;
      })();
      class Ni {
        constructor(a) {
          this._elementRef = a;
        }
      }
      const Gi = (0, g.Kr)((0, g.sb)(Ni));
      let Hi = (() => {
          class o extends Gi {
            get checked() {
              return this._checked;
            }
            set checked(e) {
              const i = (0, p.Ig)(e);
              this._checked !== i &&
                ((this._checked = i),
                i && this.radioGroup && this.radioGroup.value !== this.value
                  ? (this.radioGroup.selected = this)
                  : !i &&
                    this.radioGroup &&
                    this.radioGroup.value === this.value &&
                    (this.radioGroup.selected = null),
                i && this._radioDispatcher.notify(this.id, this.name),
                this._changeDetector.markForCheck());
            }
            get value() {
              return this._value;
            }
            set value(e) {
              this._value !== e &&
                ((this._value = e),
                null !== this.radioGroup &&
                  (this.checked || (this.checked = this.radioGroup.value === e),
                  this.checked && (this.radioGroup.selected = this)));
            }
            get labelPosition() {
              return (
                this._labelPosition ||
                (this.radioGroup && this.radioGroup.labelPosition) ||
                'after'
              );
            }
            set labelPosition(e) {
              this._labelPosition = e;
            }
            get disabled() {
              return (
                this._disabled ||
                (null !== this.radioGroup && this.radioGroup.disabled)
              );
            }
            set disabled(e) {
              this._setDisabled((0, p.Ig)(e));
            }
            get required() {
              return (
                this._required || (this.radioGroup && this.radioGroup.required)
              );
            }
            set required(e) {
              this._required = (0, p.Ig)(e);
            }
            get color() {
              return (
                this._color ||
                (this.radioGroup && this.radioGroup.color) ||
                (this._providerOverride && this._providerOverride.color) ||
                'accent'
              );
            }
            set color(e) {
              this._color = e;
            }
            get inputId() {
              return `${this.id || this._uniqueId}-input`;
            }
            constructor(e, i, n, s, r, c, l, d) {
              super(i),
                (this._changeDetector = n),
                (this._focusMonitor = s),
                (this._radioDispatcher = r),
                (this._providerOverride = l),
                (this._uniqueId = 'mat-radio-' + ++ce),
                (this.id = this._uniqueId),
                (this.change = new t.vpe()),
                (this._checked = !1),
                (this._value = null),
                (this._removeUniqueSelectionListener = () => {}),
                (this.radioGroup = e),
                (this._noopAnimations = 'NoopAnimations' === c),
                d && (this.tabIndex = (0, p.su)(d, 0));
            }
            focus(e, i) {
              i
                ? this._focusMonitor.focusVia(this._inputElement, i, e)
                : this._inputElement.nativeElement.focus(e);
            }
            _markForCheck() {
              this._changeDetector.markForCheck();
            }
            ngOnInit() {
              this.radioGroup &&
                ((this.checked = this.radioGroup.value === this._value),
                this.checked && (this.radioGroup.selected = this),
                (this.name = this.radioGroup.name)),
                (this._removeUniqueSelectionListener =
                  this._radioDispatcher.listen((e, i) => {
                    e !== this.id && i === this.name && (this.checked = !1);
                  }));
            }
            ngDoCheck() {
              this._updateTabIndex();
            }
            ngAfterViewInit() {
              this._updateTabIndex(),
                this._focusMonitor
                  .monitor(this._elementRef, !0)
                  .subscribe((e) => {
                    !e && this.radioGroup && this.radioGroup._touch();
                  });
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef),
                this._removeUniqueSelectionListener();
            }
            _emitChangeEvent() {
              this.change.emit(new le(this, this._value));
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _onInputClick(e) {
              e.stopPropagation();
            }
            _onInputInteraction(e) {
              if ((e.stopPropagation(), !this.checked && !this.disabled)) {
                const i =
                  this.radioGroup && this.value !== this.radioGroup.value;
                (this.checked = !0),
                  this._emitChangeEvent(),
                  this.radioGroup &&
                    (this.radioGroup._controlValueAccessorChangeFn(this.value),
                    i && this.radioGroup._emitChangeEvent());
              }
            }
            _onTouchTargetClick(e) {
              this._onInputInteraction(e),
                this.disabled || this._inputElement.nativeElement.focus();
            }
            _setDisabled(e) {
              this._disabled !== e &&
                ((this._disabled = e), this._changeDetector.markForCheck());
            }
            _updateTabIndex() {
              const e = this.radioGroup;
              let i;
              if (
                ((i =
                  e && e.selected && !this.disabled
                    ? e.selected === this
                      ? this.tabIndex
                      : -1
                    : this.tabIndex),
                i !== this._previousTabIndex)
              ) {
                const n = this._inputElement?.nativeElement;
                n &&
                  (n.setAttribute('tabindex', i + ''),
                  (this._previousTabIndex = i));
              }
            }
            static #t = (this.ɵfac = function (i) {
              t.$Z();
            });
            static #e = (this.ɵdir = t.lG2({
              type: o,
              viewQuery: function (i, n) {
                if ((1 & i && t.Gf(Qi, 5), 2 & i)) {
                  let s;
                  t.iGM((s = t.CRH())) && (n._inputElement = s.first);
                }
              },
              inputs: {
                id: 'id',
                name: 'name',
                ariaLabel: ['aria-label', 'ariaLabel'],
                ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
                ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
                checked: 'checked',
                value: 'value',
                labelPosition: 'labelPosition',
                disabled: 'disabled',
                required: 'required',
                color: 'color',
              },
              outputs: { change: 'change' },
              features: [t.qOj],
            }));
          }
          return o;
        })(),
        he = (() => {
          class o extends Li {
            static #t = (this.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = t.n5z(o)))(n || o);
              };
            })());
            static #e = (this.ɵdir = t.lG2({
              type: o,
              selectors: [['mat-radio-group']],
              contentQueries: function (i, n, s) {
                if ((1 & i && t.Suo(s, pe, 5), 2 & i)) {
                  let r;
                  t.iGM((r = t.CRH())) && (n._radios = r);
                }
              },
              hostAttrs: ['role', 'radiogroup', 1, 'mat-mdc-radio-group'],
              exportAs: ['matRadioGroup'],
              features: [t._Bn([Bi, { provide: de, useExisting: o }]), t.qOj],
            }));
          }
          return o;
        })(),
        pe = (() => {
          class o extends Hi {
            constructor(e, i, n, s, r, c, l, d) {
              super(e, i, n, s, r, c, l, d);
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || o)(
                t.Y36(de, 8),
                t.Y36(t.SBq),
                t.Y36(t.sBO),
                t.Y36(I.tE),
                t.Y36(Xt.A8),
                t.Y36(t.QbO, 8),
                t.Y36(zi, 8),
                t.$8M('tabindex')
              );
            });
            static #e = (this.ɵcmp = t.Xpm({
              type: o,
              selectors: [['mat-radio-button']],
              hostAttrs: [1, 'mat-mdc-radio-button'],
              hostVars: 15,
              hostBindings: function (i, n) {
                1 & i &&
                  t.NdJ('focus', function () {
                    return n._inputElement.nativeElement.focus();
                  }),
                  2 & i &&
                    (t.uIk('id', n.id)('tabindex', null)('aria-label', null)(
                      'aria-labelledby',
                      null
                    )('aria-describedby', null),
                    t.ekj('mat-primary', 'primary' === n.color)(
                      'mat-accent',
                      'accent' === n.color
                    )('mat-warn', 'warn' === n.color)(
                      'mat-mdc-radio-checked',
                      n.checked
                    )('_mat-animation-noopable', n._noopAnimations));
              },
              inputs: { disableRipple: 'disableRipple', tabIndex: 'tabIndex' },
              exportAs: ['matRadioButton'],
              features: [t.qOj],
              ngContentSelectors: qi,
              decls: 13,
              vars: 17,
              consts: [
                [1, 'mdc-form-field'],
                ['formField', ''],
                [1, 'mdc-radio'],
                [1, 'mat-mdc-radio-touch-target', 3, 'click'],
                [
                  'type',
                  'radio',
                  1,
                  'mdc-radio__native-control',
                  3,
                  'id',
                  'checked',
                  'disabled',
                  'required',
                  'change',
                ],
                ['input', ''],
                [1, 'mdc-radio__background'],
                [1, 'mdc-radio__outer-circle'],
                [1, 'mdc-radio__inner-circle'],
                [
                  'mat-ripple',
                  '',
                  1,
                  'mat-radio-ripple',
                  'mat-mdc-focus-indicator',
                  3,
                  'matRippleTrigger',
                  'matRippleDisabled',
                  'matRippleCentered',
                ],
                [1, 'mat-ripple-element', 'mat-radio-persistent-ripple'],
                [1, 'mdc-label', 3, 'for'],
              ],
              template: function (i, n) {
                if (
                  (1 & i &&
                    (t.F$t(),
                    t.TgZ(0, 'div', 0, 1)(2, 'div', 2)(3, 'div', 3),
                    t.NdJ('click', function (r) {
                      return n._onTouchTargetClick(r);
                    }),
                    t.qZA(),
                    t.TgZ(4, 'input', 4, 5),
                    t.NdJ('change', function (r) {
                      return n._onInputInteraction(r);
                    }),
                    t.qZA(),
                    t.TgZ(6, 'div', 6),
                    t._UZ(7, 'div', 7)(8, 'div', 8),
                    t.qZA(),
                    t.TgZ(9, 'div', 9),
                    t._UZ(10, 'div', 10),
                    t.qZA()(),
                    t.TgZ(11, 'label', 11),
                    t.Hsn(12),
                    t.qZA()()),
                  2 & i)
                ) {
                  const s = t.MAs(1);
                  t.ekj(
                    'mdc-form-field--align-end',
                    'before' == n.labelPosition
                  ),
                    t.xp6(2),
                    t.ekj('mdc-radio--disabled', n.disabled),
                    t.xp6(2),
                    t.Q6J('id', n.inputId)('checked', n.checked)(
                      'disabled',
                      n.disabled
                    )('required', n.required),
                    t.uIk('name', n.name)('value', n.value)(
                      'aria-label',
                      n.ariaLabel
                    )('aria-labelledby', n.ariaLabelledby)(
                      'aria-describedby',
                      n.ariaDescribedby
                    ),
                    t.xp6(5),
                    t.Q6J('matRippleTrigger', s)(
                      'matRippleDisabled',
                      n._isRippleDisabled()
                    )('matRippleCentered', !0),
                    t.xp6(2),
                    t.Q6J('for', n.inputId);
                }
              },
              dependencies: [g.wG],
              styles: [
                '.mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio[hidden]{display:none}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button{--mdc-radio-disabled-selected-icon-opacity:0.38;--mdc-radio-disabled-unselected-icon-opacity:0.38;--mdc-radio-state-layer-size:40px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{padding:calc((var(--mdc-radio-state-layer-size) - 20px) / 2)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-selected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:var(--mdc-radio-disabled-selected-icon-opacity)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:var(--mdc-radio-disabled-unselected-icon-opacity)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-focus-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-selected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-hover-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-icon-color)}.mat-mdc-radio-button .mdc-radio:not(:disabled):active .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-pressed-icon-color)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{top:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size) - 20px) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control{top:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);right:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);left:calc((var(--mdc-radio-state-layer-size) - var(--mdc-radio-state-layer-size)) / 2);width:var(--mdc-radio-state-layer-size);height:var(--mdc-radio-state-layer-size)}.mat-mdc-radio-button .mdc-radio .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color)}.mat-mdc-radio-button .mdc-radio:hover .mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element{background-color:var(--mat-radio-checked-ripple-color)}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color)}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button .mdc-radio .mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unselected-focus-icon-color, black)}.mat-mdc-radio-button.cdk-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-radio-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}[dir=rtl] .mat-mdc-radio-touch-target{left:0;right:50%;transform:translate(50%, -50%)}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return o;
        })(),
        Yi = (() => {
          class o {
            static #t = (this.ɵfac = function (i) {
              return new (i || o)();
            });
            static #e = (this.ɵmod = t.oAB({ type: o }));
            static #i = (this.ɵinj = t.cJS({
              imports: [g.BQ, m.ez, g.si, g.BQ],
            }));
          }
          return o;
        })();
      function Ji(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon', 9), t._uU(1, 'check_circle'), t.qZA());
      }
      function Ui(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon', 10), t._uU(1, 'highlight_off'), t.qZA());
      }
      function Vi(o, a) {
        if ((1 & o && t._UZ(0, 'span', 11), 2 & o)) {
          const e = t.oxw().$implicit;
          t.Q6J('data', e.correct ? e.feedback_correct : e.feedback_incorrect);
        }
      }
      function ji(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'mat-radio-button', 4),
            t._UZ(1, 'span', 5),
            t.YNc(2, Ji, 2, 0, 'mat-icon', 6),
            t.YNc(3, Ui, 2, 0, 'mat-icon', 7),
            t.YNc(4, Vi, 1, 1, 'span', 8),
            t.qZA()),
          2 & o)
        ) {
          const e = a.$implicit,
            i = t.oxw();
          t.ekj('correct', i.isAnswerCorrect(e))(
            'incorrect',
            i.isAnswerIncorrect(e)
          ),
            t.Q6J('value', e.id),
            t.xp6(1),
            t.Q6J('data', e.text),
            t.xp6(1),
            t.Q6J('ngIf', i.showAnswers && e.correct),
            t.xp6(1),
            t.Q6J('ngIf', i.showAnswers && !e.correct),
            t.xp6(1),
            t.Q6J('ngIf', i.showAnswers && i.selectedAnswer === e.id);
        }
      }
      function Ki(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 12),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onShowAnswersClick());
            }),
            t._uU(1, ' L\xf6sungen anzeigen\n'),
            t.qZA();
        }
      }
      function Wi(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 13),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onNextQuestionClick());
            }),
            t._uU(1),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(1),
            t.hij(
              ' ',
              1 === e.correct ? 'Richtig,' : ' Falsch,',
              ' n\xe4chste Frage\n'
            );
        }
      }
      let $i = (() => {
        class o {
          constructor() {
            (this.nextQuestionClicked = new t.vpe()),
              (this.showAnswers = !1),
              (this.correct = 0);
          }
          ngOnChanges(e) {
            e.question.previousValue !== e.question.currentValue &&
              ((this.selectedAnswer = void 0),
              (this.showAnswers = !1),
              (this.correct = 0));
          }
          onRadioChange(e) {
            this.selectedAnswer = e.value;
          }
          trackByFn(e, i) {
            return i.id;
          }
          isAnswerCorrect(e) {
            return !!this.showAnswers && e.correct;
          }
          isAnswerIncorrect(e) {
            return !!this.showAnswers && !e.correct;
          }
          onShowAnswersClick() {
            (this.showAnswers = !0),
              (this.correct = null == this.selectedAnswer ? 0 : -1),
              this.question.answers.forEach((e) => {
                e.id == this.selectedAnswer && e.correct && (this.correct = 1);
              });
          }
          onNextQuestionClick() {
            null == this.selectedAnswer && (this.correct = 0),
              this.nextQuestionClicked.emit(this.correct);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-single-choice-question']],
            inputs: { question: 'question' },
            outputs: { nextQuestionClicked: 'nextQuestionClicked' },
            features: [t.TTD],
            decls: 4,
            vars: 5,
            consts: [
              [
                'aria-label',
                'W\xe4hle ein Antwort aus',
                'color',
                'primary',
                1,
                'container',
                3,
                'disabled',
                'change',
              ],
              [
                3,
                'correct',
                'incorrect',
                'value',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'showAnswerBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'nextQuestionBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [3, 'value'],
              ['markdown', '', 1, 'answer', 3, 'data'],
              ['class', 'correctIcon', 4, 'ngIf'],
              ['class', 'incorrectIcon', 4, 'ngIf'],
              ['markdown', '', 'class', 'feedback', 3, 'data', 4, 'ngIf'],
              [1, 'correctIcon'],
              [1, 'incorrectIcon'],
              ['markdown', '', 1, 'feedback', 3, 'data'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'showAnswerBtn',
                3,
                'click',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'nextQuestionBtn',
                3,
                'click',
              ],
            ],
            template: function (i, n) {
              1 & i &&
                (t.TgZ(0, 'mat-radio-group', 0),
                t.NdJ('change', function (r) {
                  return n.onRadioChange(r);
                }),
                t.YNc(1, ji, 5, 9, 'mat-radio-button', 1),
                t.qZA(),
                t.YNc(2, Ki, 2, 0, 'button', 2),
                t.YNc(3, Wi, 2, 1, 'button', 3)),
                2 & i &&
                  (t.Q6J('disabled', n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngForOf', n.question.answers)(
                    'ngForTrackBy',
                    n.trackByFn
                  ),
                  t.xp6(1),
                  t.Q6J('ngIf', !n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers));
            },
            dependencies: [m.sg, m.O5, Z.l, T.lW, he, pe, F.Hw],
            styles: [
              '[_nghost-%COMP%]{margin-left:-3px}mat-radio-group[_ngcontent-%COMP%]{margin-top:7px;display:flex;flex-direction:column}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]:not(:first-child){margin-top:20px}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]     label.mat-radio-label{vertical-align:top}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]     label.mat-radio-label .mat-radio-container{margin-bottom:auto}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]     label.mat-radio-label.correct{font-weight:700}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]     .mat-radio-label-content{display:grid;grid-template-rows:auto;grid-template-columns:auto 20px;white-space:normal}mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%]     .mat-radio-inner-circle{z-index:0}.answer[_ngcontent-%COMP%]{grid-row-start:1;grid-column-start:1}.answer[_ngcontent-%COMP%]     p{margin-bottom:0}.correctIcon[_ngcontent-%COMP%], .incorrectIcon[_ngcontent-%COMP%]{grid-row-start:1;grid-column-start:1;transform:translate(-30px) translateY(-2px);opacity:1;z-index:9999}span.feedback[_ngcontent-%COMP%]{grid-column-start:1;font-weight:400;margin-top:5px;margin-bottom:-12px}.showAnswerBtn[_ngcontent-%COMP%], .nextQuestionBtn[_ngcontent-%COMP%]{margin-top:23px}  .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle{display:none}',
            ],
          }));
        }
        return o;
      })();
      var ue = h(3549);
      function Xi(o, a) {
        if ((1 & o && t._UZ(0, 'span', 6), 2 & o)) {
          const e = t.oxw().$implicit;
          t.Q6J('data', e.correct ? e.feedback_correct : e.feedback_incorrect);
        }
      }
      function tn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-checkbox', 3),
            t.NdJ('change', function (n) {
              const r = t.CHM(e).$implicit,
                c = t.oxw();
              return t.KtG(c.onSelectChange(n, r));
            }),
            t._UZ(1, 'span', 4),
            t.YNc(2, Xi, 1, 1, 'span', 5),
            t.qZA();
        }
        if (2 & o) {
          const e = a.$implicit,
            i = t.oxw();
          t.ekj(
            'correctSelected',
            i.isAnswerCorrect(e) && i.selectedAnswers.includes(e.id)
          )(
            'incorrectSelected',
            i.isAnswerIncorrect(e) && i.selectedAnswers.includes(e.id)
          )(
            'correctUnselected',
            i.isAnswerCorrect(e) && !i.selectedAnswers.includes(e.id)
          )(
            'incorrectUnselected',
            i.isAnswerIncorrect(e) && !i.selectedAnswers.includes(e.id)
          ),
            t.Q6J('checked', i.isAnswerCorrect(e))('disabled', i.showAnswers)(
              'indeterminate',
              i.isAnswerIncorrect(e)
            ),
            t.xp6(1),
            t.Q6J('data', e.text),
            t.xp6(1),
            t.Q6J('ngIf', i.showAnswers && i.selectedAnswers.includes(e.id));
        }
      }
      function en(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 7),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onShowAnswersClick());
            }),
            t._uU(1, ' L\xf6sungen anzeigen\n'),
            t.qZA();
        }
      }
      function nn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 8),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onNextQuestionClick());
            }),
            t._uU(1),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(1),
            t.hij(
              ' ',
              1 === e.correct ? 'Richtig,' : ' Falsch,',
              ' n\xe4chste Frage\n'
            );
        }
      }
      let on = (() => {
        class o {
          constructor() {
            (this.nextQuestionClicked = new t.vpe()),
              (this.selectedAnswers = []),
              (this.showAnswers = !1),
              (this.correct = 0);
          }
          ngOnChanges(e) {
            e.question.previousValue !== e.question.currentValue &&
              ((this.showAnswers = !1),
              (this.selectedAnswers = []),
              (this.correct = 0));
          }
          onSelectChange(e, i) {
            e.checked
              ? this.selectedAnswers.push(i.id)
              : (this.selectedAnswers = this.selectedAnswers.filter(
                  (n) => n !== i.id
                ));
          }
          isAnswerCorrect(e) {
            return !!this.showAnswers && e.correct;
          }
          isAnswerIncorrect(e) {
            return !!this.showAnswers && !e.correct;
          }
          trackByFn(e, i) {
            return i.id;
          }
          onShowAnswersClick() {
            (this.showAnswers = !0), (this.correct = 1);
            let e = 0;
            this.question.answers.forEach((i) => {
              i.correct &&
                (e++,
                this.selectedAnswers.includes(i.id) || (this.correct = -1));
            }),
              this.selectedAnswers.length !== e && (this.correct = -1);
          }
          onNextQuestionClick() {
            0 == this.selectedAnswers.length && (this.correct = 0),
              this.nextQuestionClicked.emit(this.correct);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-multiple-choice-question']],
            inputs: { question: 'question' },
            outputs: { nextQuestionClicked: 'nextQuestionClicked' },
            features: [t.TTD],
            decls: 3,
            vars: 4,
            consts: [
              [
                'color',
                'primary',
                3,
                'checked',
                'correctSelected',
                'incorrectSelected',
                'correctUnselected',
                'incorrectUnselected',
                'disabled',
                'indeterminate',
                'change',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'showAnswerBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'nextQuestionBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                3,
                'checked',
                'disabled',
                'indeterminate',
                'change',
              ],
              ['markdown', '', 1, 'answer', 3, 'data'],
              ['class', 'feedback', 'markdown', '', 3, 'data', 4, 'ngIf'],
              ['markdown', '', 1, 'feedback', 3, 'data'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'showAnswerBtn',
                3,
                'click',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'nextQuestionBtn',
                3,
                'click',
              ],
            ],
            template: function (i, n) {
              1 & i &&
                (t.YNc(0, tn, 3, 13, 'mat-checkbox', 0),
                t.YNc(1, en, 2, 0, 'button', 1),
                t.YNc(2, nn, 2, 1, 'button', 2)),
                2 & i &&
                  (t.Q6J('ngForOf', n.question.answers)(
                    'ngForTrackBy',
                    n.trackByFn
                  ),
                  t.xp6(1),
                  t.Q6J('ngIf', !n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers));
            },
            dependencies: [m.sg, m.O5, Z.l, T.lW, ue.oG],
            styles: [
              '@charset "UTF-8";mat-checkbox[_ngcontent-%COMP%]{width:100%;margin-bottom:14px}mat-checkbox[_ngcontent-%COMP%]     .correctunselected span.mat-checkbox-label, mat-checkbox[_ngcontent-%COMP%]     .correctselected span.mat-checkbox-label{font-weight:700}mat-checkbox[_ngcontent-%COMP%]     span.mat-checkbox-label{display:flex;flex-direction:column;width:calc(100% - 24px);white-space:normal;line-height:28px}mat-checkbox[_ngcontent-%COMP%]     label.mat-checkbox-layout{vertical-align:top;width:100%}mat-checkbox[_ngcontent-%COMP%]     span.mat-checkbox-inner-container{margin-top:4px;margin-bottom:auto;margin-right:10px}mat-checkbox[_ngcontent-%COMP%]     .mat-checkbox-frame{border-radius:20px;height:20px;width:20px}mat-checkbox[_ngcontent-%COMP%]     .mat-checkbox-background{border-radius:20px;height:20px;width:20px}mat-checkbox[_ngcontent-%COMP%]     .mat-checkbox-mixedmark{height:16px;width:16px;background-color:#fff;border-radius:20px;position:relative}mat-checkbox[_ngcontent-%COMP%]     .mat-checkbox-mixedmark:after{position:absolute;top:3px;left:0;right:0;content:"\\d7";font-size:16px;font-weight:700;line-height:10px;text-align:center}.answer[_ngcontent-%COMP%]     p{margin-bottom:0}span.feedback[_ngcontent-%COMP%]{font-weight:400;margin-top:6px;margin-bottom:-12px}.showAnswerBtn[_ngcontent-%COMP%], .nextQuestionBtn[_ngcontent-%COMP%]{margin-top:10px}',
            ],
          }));
        }
        return o;
      })();
      function an(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon', 10), t._uU(1, ' check '), t.qZA());
      }
      function sn(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 11), t._uU(1, ' highlight_off '), t.qZA());
      }
      function rn(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 6),
            t.YNc(1, an, 2, 0, 'mat-icon', 7),
            t.YNc(2, sn, 2, 0, 'mat-icon', 8),
            t._UZ(3, 'span', 9),
            t.qZA()),
          2 & o)
        ) {
          const e = t.oxw();
          t.xp6(1),
            t.Q6J(
              'ngIf',
              e.question.answers[0].correct === e.selectedAnswer &&
                e.showAnswers
            ),
            t.xp6(1),
            t.Q6J(
              'ngIf',
              e.question.answers[0].correct !== e.selectedAnswer &&
                e.showAnswers
            ),
            t.xp6(1),
            t.Q6J(
              'data',
              e.selectedAnswer === e.question.answers[0].correct
                ? e.question.answers[0].feedback_correct
                : e.question.answers[0].feedback_incorrect
            );
        }
      }
      function cn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 12),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onShowAnswersClick());
            }),
            t._uU(1, ' L\xf6sungen anzeigen '),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.Q6J('disabled', void 0 === e.selectedAnswer);
        }
      }
      function ln(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 13),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onNextQuestionClick());
            }),
            t._uU(1),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(1),
            t.hij(
              ' ',
              1 === e.correct ? 'Richtig,' : ' Falsch,',
              ' n\xe4chste Frage '
            );
        }
      }
      let dn = (() => {
        class o {
          constructor() {
            (this.nextQuestionClicked = new t.vpe()),
              (this.showAnswers = !1),
              (this.correct = -1);
          }
          ngOnChanges(e) {
            e.question.previousValue !== e.question.currentValue &&
              ((this.showAnswers = !1), (this.correct = -1));
          }
          onTrueClick() {
            this.selectedAnswer = !0;
          }
          onFalseClick() {
            this.selectedAnswer = !1;
          }
          onShowAnswersClick() {
            (this.showAnswers = !0),
              (this.correct =
                this.selectedAnswer == this.question.answers[0].correct
                  ? 1
                  : -1);
          }
          onNextQuestionClick() {
            this.nextQuestionClicked.emit(this.correct);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-true-false-question']],
            inputs: { question: 'question' },
            outputs: { nextQuestionClicked: 'nextQuestionClicked' },
            features: [t.TTD],
            decls: 9,
            vars: 21,
            consts: [
              [1, 'button-container'],
              ['mat-stroked-button', '', 1, 'trueBtn', 3, 'disabled', 'click'],
              ['mat-stroked-button', '', 1, 'falseBtn', 3, 'disabled', 'click'],
              ['class', 'feedback', 4, 'ngIf'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'showAnswerBtn',
                3,
                'disabled',
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'nextQuestionBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [1, 'feedback'],
              ['class', 'correctIcon', 4, 'ngIf'],
              ['class', 'incorrectIcon', 4, 'ngIf'],
              ['markdown', '', 1, 'feedback-text', 3, 'data'],
              [1, 'correctIcon'],
              [1, 'incorrectIcon'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'showAnswerBtn',
                3,
                'disabled',
                'click',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'nextQuestionBtn',
                3,
                'click',
              ],
            ],
            template: function (i, n) {
              1 & i &&
                (t.TgZ(0, 'div', 0)(1, 'button', 1),
                t.NdJ('click', function () {
                  return n.onTrueClick();
                }),
                t._uU(2, ' Wahr '),
                t.qZA(),
                t.TgZ(3, 'button', 2),
                t.NdJ('click', function () {
                  return n.onFalseClick();
                }),
                t._uU(4, ' Falsch '),
                t.qZA()(),
                t.YNc(5, rn, 4, 3, 'div', 3),
                t.TgZ(6, 'div'),
                t.YNc(7, cn, 2, 1, 'button', 4),
                t.YNc(8, ln, 2, 1, 'button', 5),
                t.qZA()),
                2 & i &&
                  (t.xp6(1),
                  t.ekj(
                    'correctUnselected',
                    n.showAnswers && n.question.answers[0].correct
                  )(
                    'incorrectUnselected',
                    n.showAnswers && !n.question.answers[0].correct
                  )(
                    'correctSelected',
                    n.showAnswers &&
                      n.question.answers[0].correct &&
                      n.selectedAnswer
                  )(
                    'incorrectSelected',
                    n.showAnswers &&
                      !n.question.answers[0].correct &&
                      n.selectedAnswer
                  ),
                  t.Q6J('disabled', n.showAnswers),
                  t.xp6(2),
                  t.ekj(
                    'correctUnselected',
                    n.showAnswers && !n.question.answers[0].correct
                  )(
                    'incorrectUnselected',
                    n.showAnswers && n.question.answers[0].correct
                  )(
                    'correctSelected',
                    n.showAnswers &&
                      !n.question.answers[0].correct &&
                      !n.selectedAnswer
                  )(
                    'incorrectSelected',
                    n.showAnswers &&
                      n.question.answers[0].correct &&
                      !n.selectedAnswer
                  ),
                  t.Q6J('disabled', n.showAnswers),
                  t.xp6(2),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(2),
                  t.Q6J('ngIf', !n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers));
            },
            dependencies: [m.O5, Z.l, T.lW, F.Hw],
            styles: [
              '[_nghost-%COMP%]{margin-left:-8px}.button-container[_ngcontent-%COMP%]{display:block;margin:0 5px 16px}.button-container[_ngcontent-%COMP%]   .trueBtn[_ngcontent-%COMP%]{border-radius:5px;min-height:44px;width:100%;font-size:15px;margin-bottom:15px;font-weight:500;border:solid 2px lightgray}.button-container[_ngcontent-%COMP%]   .trueBtn.correctUnselected[_ngcontent-%COMP%]{border:solid 3px}.button-container[_ngcontent-%COMP%]   .trueBtn.incorrectUnselected[_ngcontent-%COMP%]{border:solid 2px}.button-container[_ngcontent-%COMP%]   .falseBtn[_ngcontent-%COMP%]{border-radius:5px;min-height:44px;width:100%;font-size:15px;font-weight:500;border:solid 2px lightgray}.button-container[_ngcontent-%COMP%]   .falseBtn.correctUnselected[_ngcontent-%COMP%]{border:solid 3px}.button-container[_ngcontent-%COMP%]   .falseBtn.incorrectUnselected[_ngcontent-%COMP%]{border:solid 2px}.feedback[_ngcontent-%COMP%]{display:grid;grid-template-columns:0fr 10fr;column-gap:9px;align-items:center}.correctIcon[_ngcontent-%COMP%], .incorrectIcon[_ngcontent-%COMP%]{justify-self:end;font-weight:700}span.feedback-text[_ngcontent-%COMP%]{margin-top:10px;font-weight:500;text-align:justify}.mat-typography[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{align-self:center;margin:0}.showAnswerBtn[_ngcontent-%COMP%], .nextQuestionBtn[_ngcontent-%COMP%]{margin-top:10px}',
            ],
          }));
        }
        return o;
      })();
      var $ = h(9804),
        R = h(3916),
        H = h(8341),
        hn = h(4898),
        pn = h(1297),
        mn = h(3733);
      function Ot(o, a, e) {
        for (let i in a)
          if (a.hasOwnProperty(i)) {
            const n = a[i];
            n
              ? o.setProperty(i, n, e?.has(i) ? 'important' : '')
              : o.removeProperty(i);
          }
        return o;
      }
      function Y(o, a) {
        const e = a ? '' : 'none';
        Ot(o.style, {
          'touch-action': a ? '' : 'none',
          '-webkit-user-drag': a ? '' : 'none',
          '-webkit-tap-highlight-color': a ? '' : 'transparent',
          'user-select': e,
          '-ms-user-select': e,
          '-webkit-user-select': e,
          '-moz-user-select': e,
        });
      }
      function me(o, a, e) {
        Ot(
          o.style,
          {
            position: a ? '' : 'fixed',
            top: a ? '' : '0',
            opacity: a ? '' : '0',
            left: a ? '' : '-999em',
          },
          e
        );
      }
      function pt(o, a) {
        return a && 'none' != a ? o + ' ' + a : o;
      }
      function ge(o) {
        const a = o.toLowerCase().indexOf('ms') > -1 ? 1 : 1e3;
        return parseFloat(o) * a;
      }
      function St(o, a) {
        return o
          .getPropertyValue(a)
          .split(',')
          .map((i) => i.trim());
      }
      function At(o) {
        const a = o.getBoundingClientRect();
        return {
          top: a.top,
          right: a.right,
          bottom: a.bottom,
          left: a.left,
          width: a.width,
          height: a.height,
          x: a.x,
          y: a.y,
        };
      }
      function Dt(o, a, e) {
        const { top: i, bottom: n, left: s, right: r } = o;
        return e >= i && e <= n && a >= s && a <= r;
      }
      function X(o, a, e) {
        (o.top += a),
          (o.bottom = o.top + o.height),
          (o.left += e),
          (o.right = o.left + o.width);
      }
      function _e(o, a, e, i) {
        const { top: n, right: s, bottom: r, left: c, width: l, height: d } = o,
          u = l * a,
          b = d * a;
        return i > n - b && i < r + b && e > c - u && e < s + u;
      }
      class fe {
        constructor(a) {
          (this._document = a), (this.positions = new Map());
        }
        clear() {
          this.positions.clear();
        }
        cache(a) {
          this.clear(),
            this.positions.set(this._document, {
              scrollPosition: this.getViewportScrollPosition(),
            }),
            a.forEach((e) => {
              this.positions.set(e, {
                scrollPosition: { top: e.scrollTop, left: e.scrollLeft },
                clientRect: At(e),
              });
            });
        }
        handleScroll(a) {
          const e = (0, R.sA)(a),
            i = this.positions.get(e);
          if (!i) return null;
          const n = i.scrollPosition;
          let s, r;
          if (e === this._document) {
            const d = this.getViewportScrollPosition();
            (s = d.top), (r = d.left);
          } else (s = e.scrollTop), (r = e.scrollLeft);
          const c = n.top - s,
            l = n.left - r;
          return (
            this.positions.forEach((d, u) => {
              d.clientRect && e !== u && e.contains(u) && X(d.clientRect, c, l);
            }),
            (n.top = s),
            (n.left = r),
            { top: c, left: l }
          );
        }
        getViewportScrollPosition() {
          return { top: window.scrollY, left: window.scrollX };
        }
      }
      function be(o) {
        const a = o.cloneNode(!0),
          e = a.querySelectorAll('[id]'),
          i = o.nodeName.toLowerCase();
        a.removeAttribute('id');
        for (let n = 0; n < e.length; n++) e[n].removeAttribute('id');
        return (
          'canvas' === i
            ? xe(o, a)
            : ('input' === i || 'select' === i || 'textarea' === i) && we(o, a),
          ve('canvas', o, a, xe),
          ve('input, textarea, select', o, a, we),
          a
        );
      }
      function ve(o, a, e, i) {
        const n = a.querySelectorAll(o);
        if (n.length) {
          const s = e.querySelectorAll(o);
          for (let r = 0; r < n.length; r++) i(n[r], s[r]);
        }
      }
      let _n = 0;
      function we(o, a) {
        'file' !== a.type && (a.value = o.value),
          'radio' === a.type &&
            a.name &&
            (a.name = `mat-clone-${a.name}-${_n++}`);
      }
      function xe(o, a) {
        const e = a.getContext('2d');
        if (e)
          try {
            e.drawImage(o, 0, 0);
          } catch {}
      }
      const ye = (0, R.i$)({ passive: !0 }),
        ut = (0, R.i$)({ passive: !1 }),
        Rt = new Set(['position']);
      class bn {
        get disabled() {
          return (
            this._disabled ||
            !(!this._dropContainer || !this._dropContainer.disabled)
          );
        }
        set disabled(a) {
          const e = (0, p.Ig)(a);
          e !== this._disabled &&
            ((this._disabled = e),
            this._toggleNativeDragInteractions(),
            this._handles.forEach((i) => Y(i, e)));
        }
        constructor(a, e, i, n, s, r) {
          (this._config = e),
            (this._document = i),
            (this._ngZone = n),
            (this._viewportRuler = s),
            (this._dragDropRegistry = r),
            (this._passiveTransform = { x: 0, y: 0 }),
            (this._activeTransform = { x: 0, y: 0 }),
            (this._hasStartedDragging = !1),
            (this._moveEvents = new _.x()),
            (this._pointerMoveSubscription = H.w0.EMPTY),
            (this._pointerUpSubscription = H.w0.EMPTY),
            (this._scrollSubscription = H.w0.EMPTY),
            (this._resizeSubscription = H.w0.EMPTY),
            (this._boundaryElement = null),
            (this._nativeInteractionsEnabled = !0),
            (this._handles = []),
            (this._disabledHandles = new Set()),
            (this._direction = 'ltr'),
            (this.dragStartDelay = 0),
            (this._disabled = !1),
            (this.beforeStarted = new _.x()),
            (this.started = new _.x()),
            (this.released = new _.x()),
            (this.ended = new _.x()),
            (this.entered = new _.x()),
            (this.exited = new _.x()),
            (this.dropped = new _.x()),
            (this.moved = this._moveEvents),
            (this._pointerDown = (c) => {
              if ((this.beforeStarted.next(), this._handles.length)) {
                const l = this._getTargetHandle(c);
                l &&
                  !this._disabledHandles.has(l) &&
                  !this.disabled &&
                  this._initializeDragSequence(l, c);
              } else
                this.disabled ||
                  this._initializeDragSequence(this._rootElement, c);
            }),
            (this._pointerMove = (c) => {
              const l = this._getPointerPositionOnPage(c);
              if (!this._hasStartedDragging) {
                if (
                  Math.abs(l.x - this._pickupPositionOnPage.x) +
                    Math.abs(l.y - this._pickupPositionOnPage.y) >=
                  this._config.dragStartThreshold
                ) {
                  const w =
                      Date.now() >=
                      this._dragStartTime + this._getDragStartDelay(c),
                    E = this._dropContainer;
                  if (!w) return void this._endDragSequence(c);
                  (!E || (!E.isDragging() && !E.isReceiving())) &&
                    (c.preventDefault(),
                    (this._hasStartedDragging = !0),
                    this._ngZone.run(() => this._startDragSequence(c)));
                }
                return;
              }
              c.preventDefault();
              const d = this._getConstrainedPointerPosition(l);
              if (
                ((this._hasMoved = !0),
                (this._lastKnownPointerPosition = l),
                this._updatePointerDirectionDelta(d),
                this._dropContainer)
              )
                this._updateActiveDropContainer(d, l);
              else {
                const u = this.constrainPosition
                    ? this._initialClientRect
                    : this._pickupPositionOnPage,
                  b = this._activeTransform;
                (b.x = d.x - u.x + this._passiveTransform.x),
                  (b.y = d.y - u.y + this._passiveTransform.y),
                  this._applyRootElementTransform(b.x, b.y);
              }
              this._moveEvents.observers.length &&
                this._ngZone.run(() => {
                  this._moveEvents.next({
                    source: this,
                    pointerPosition: d,
                    event: c,
                    distance: this._getDragDistance(d),
                    delta: this._pointerDirectionDelta,
                  });
                });
            }),
            (this._pointerUp = (c) => {
              this._endDragSequence(c);
            }),
            (this._nativeDragStart = (c) => {
              if (this._handles.length) {
                const l = this._getTargetHandle(c);
                l &&
                  !this._disabledHandles.has(l) &&
                  !this.disabled &&
                  c.preventDefault();
              } else this.disabled || c.preventDefault();
            }),
            this.withRootElement(a).withParent(e.parentDragRef || null),
            (this._parentPositions = new fe(i)),
            r.registerDragItem(this);
        }
        getPlaceholderElement() {
          return this._placeholder;
        }
        getRootElement() {
          return this._rootElement;
        }
        getVisibleElement() {
          return this.isDragging()
            ? this.getPlaceholderElement()
            : this.getRootElement();
        }
        withHandles(a) {
          (this._handles = a.map((i) => (0, p.fI)(i))),
            this._handles.forEach((i) => Y(i, this.disabled)),
            this._toggleNativeDragInteractions();
          const e = new Set();
          return (
            this._disabledHandles.forEach((i) => {
              this._handles.indexOf(i) > -1 && e.add(i);
            }),
            (this._disabledHandles = e),
            this
          );
        }
        withPreviewTemplate(a) {
          return (this._previewTemplate = a), this;
        }
        withPlaceholderTemplate(a) {
          return (this._placeholderTemplate = a), this;
        }
        withRootElement(a) {
          const e = (0, p.fI)(a);
          return (
            e !== this._rootElement &&
              (this._rootElement &&
                this._removeRootElementListeners(this._rootElement),
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener('mousedown', this._pointerDown, ut),
                  e.addEventListener('touchstart', this._pointerDown, ye),
                  e.addEventListener('dragstart', this._nativeDragStart, ut);
              }),
              (this._initialTransform = void 0),
              (this._rootElement = e)),
            typeof SVGElement < 'u' &&
              this._rootElement instanceof SVGElement &&
              (this._ownerSVGElement = this._rootElement.ownerSVGElement),
            this
          );
        }
        withBoundaryElement(a) {
          return (
            (this._boundaryElement = a ? (0, p.fI)(a) : null),
            this._resizeSubscription.unsubscribe(),
            a &&
              (this._resizeSubscription = this._viewportRuler
                .change(10)
                .subscribe(() => this._containInsideBoundaryOnResize())),
            this
          );
        }
        withParent(a) {
          return (this._parentDragRef = a), this;
        }
        dispose() {
          this._removeRootElementListeners(this._rootElement),
            this.isDragging() && this._rootElement?.remove(),
            this._anchor?.remove(),
            this._destroyPreview(),
            this._destroyPlaceholder(),
            this._dragDropRegistry.removeDragItem(this),
            this._removeSubscriptions(),
            this.beforeStarted.complete(),
            this.started.complete(),
            this.released.complete(),
            this.ended.complete(),
            this.entered.complete(),
            this.exited.complete(),
            this.dropped.complete(),
            this._moveEvents.complete(),
            (this._handles = []),
            this._disabledHandles.clear(),
            (this._dropContainer = void 0),
            this._resizeSubscription.unsubscribe(),
            this._parentPositions.clear(),
            (this._boundaryElement =
              this._rootElement =
              this._ownerSVGElement =
              this._placeholderTemplate =
              this._previewTemplate =
              this._anchor =
              this._parentDragRef =
                null);
        }
        isDragging() {
          return (
            this._hasStartedDragging && this._dragDropRegistry.isDragging(this)
          );
        }
        reset() {
          (this._rootElement.style.transform = this._initialTransform || ''),
            (this._activeTransform = { x: 0, y: 0 }),
            (this._passiveTransform = { x: 0, y: 0 });
        }
        disableHandle(a) {
          !this._disabledHandles.has(a) &&
            this._handles.indexOf(a) > -1 &&
            (this._disabledHandles.add(a), Y(a, !0));
        }
        enableHandle(a) {
          this._disabledHandles.has(a) &&
            (this._disabledHandles.delete(a), Y(a, this.disabled));
        }
        withDirection(a) {
          return (this._direction = a), this;
        }
        _withDropContainer(a) {
          this._dropContainer = a;
        }
        getFreeDragPosition() {
          const a = this.isDragging()
            ? this._activeTransform
            : this._passiveTransform;
          return { x: a.x, y: a.y };
        }
        setFreeDragPosition(a) {
          return (
            (this._activeTransform = { x: 0, y: 0 }),
            (this._passiveTransform.x = a.x),
            (this._passiveTransform.y = a.y),
            this._dropContainer || this._applyRootElementTransform(a.x, a.y),
            this
          );
        }
        withPreviewContainer(a) {
          return (this._previewContainer = a), this;
        }
        _sortFromLastPointerPosition() {
          const a = this._lastKnownPointerPosition;
          a &&
            this._dropContainer &&
            this._updateActiveDropContainer(
              this._getConstrainedPointerPosition(a),
              a
            );
        }
        _removeSubscriptions() {
          this._pointerMoveSubscription.unsubscribe(),
            this._pointerUpSubscription.unsubscribe(),
            this._scrollSubscription.unsubscribe();
        }
        _destroyPreview() {
          this._preview?.remove(),
            this._previewRef?.destroy(),
            (this._preview = this._previewRef = null);
        }
        _destroyPlaceholder() {
          this._placeholder?.remove(),
            this._placeholderRef?.destroy(),
            (this._placeholder = this._placeholderRef = null);
        }
        _endDragSequence(a) {
          if (
            this._dragDropRegistry.isDragging(this) &&
            (this._removeSubscriptions(),
            this._dragDropRegistry.stopDragging(this),
            this._toggleNativeDragInteractions(),
            this._handles &&
              (this._rootElement.style.webkitTapHighlightColor =
                this._rootElementTapHighlight),
            this._hasStartedDragging)
          )
            if (
              (this.released.next({ source: this, event: a }),
              this._dropContainer)
            )
              this._dropContainer._stopScrolling(),
                this._animatePreviewToPlaceholder().then(() => {
                  this._cleanupDragArtifacts(a),
                    this._cleanupCachedDimensions(),
                    this._dragDropRegistry.stopDragging(this);
                });
            else {
              this._passiveTransform.x = this._activeTransform.x;
              const e = this._getPointerPositionOnPage(a);
              (this._passiveTransform.y = this._activeTransform.y),
                this._ngZone.run(() => {
                  this.ended.next({
                    source: this,
                    distance: this._getDragDistance(e),
                    dropPoint: e,
                    event: a,
                  });
                }),
                this._cleanupCachedDimensions(),
                this._dragDropRegistry.stopDragging(this);
            }
        }
        _startDragSequence(a) {
          tt(a) && (this._lastTouchEventTime = Date.now()),
            this._toggleNativeDragInteractions();
          const e = this._dropContainer;
          if (e) {
            const i = this._rootElement,
              n = i.parentNode,
              s = (this._placeholder = this._createPlaceholderElement()),
              r = (this._anchor =
                this._anchor || this._document.createComment('')),
              c = this._getShadowRoot();
            n.insertBefore(r, i),
              (this._initialTransform = i.style.transform || ''),
              (this._preview = this._createPreviewElement()),
              me(i, !1, Rt),
              this._document.body.appendChild(n.replaceChild(s, i)),
              this._getPreviewInsertionPoint(n, c).appendChild(this._preview),
              this.started.next({ source: this, event: a }),
              e.start(),
              (this._initialContainer = e),
              (this._initialIndex = e.getItemIndex(this));
          } else
            this.started.next({ source: this, event: a }),
              (this._initialContainer = this._initialIndex = void 0);
          this._parentPositions.cache(e ? e.getScrollableParents() : []);
        }
        _initializeDragSequence(a, e) {
          this._parentDragRef && e.stopPropagation();
          const i = this.isDragging(),
            n = tt(e),
            s = !n && 0 !== e.button,
            r = this._rootElement,
            c = (0, R.sA)(e),
            l =
              !n &&
              this._lastTouchEventTime &&
              this._lastTouchEventTime + 800 > Date.now(),
            d = n ? (0, I.yG)(e) : (0, I.X6)(e);
          if (
            (c && c.draggable && 'mousedown' === e.type && e.preventDefault(),
            i || s || l || d)
          )
            return;
          if (this._handles.length) {
            const C = r.style;
            (this._rootElementTapHighlight = C.webkitTapHighlightColor || ''),
              (C.webkitTapHighlightColor = 'transparent');
          }
          (this._hasStartedDragging = this._hasMoved = !1),
            this._removeSubscriptions(),
            (this._initialClientRect =
              this._rootElement.getBoundingClientRect()),
            (this._pointerMoveSubscription =
              this._dragDropRegistry.pointerMove.subscribe(this._pointerMove)),
            (this._pointerUpSubscription =
              this._dragDropRegistry.pointerUp.subscribe(this._pointerUp)),
            (this._scrollSubscription = this._dragDropRegistry
              .scrolled(this._getShadowRoot())
              .subscribe((C) => this._updateOnScroll(C))),
            this._boundaryElement &&
              (this._boundaryRect = At(this._boundaryElement));
          const u = this._previewTemplate;
          this._pickupPositionInElement =
            u && u.template && !u.matchSize
              ? { x: 0, y: 0 }
              : this._getPointerPositionInElement(
                  this._initialClientRect,
                  a,
                  e
                );
          const b =
            (this._pickupPositionOnPage =
            this._lastKnownPointerPosition =
              this._getPointerPositionOnPage(e));
          (this._pointerDirectionDelta = { x: 0, y: 0 }),
            (this._pointerPositionAtLastDirectionChange = { x: b.x, y: b.y }),
            (this._dragStartTime = Date.now()),
            this._dragDropRegistry.startDragging(this, e);
        }
        _cleanupDragArtifacts(a) {
          me(this._rootElement, !0, Rt),
            this._anchor.parentNode.replaceChild(
              this._rootElement,
              this._anchor
            ),
            this._destroyPreview(),
            this._destroyPlaceholder(),
            (this._initialClientRect =
              this._boundaryRect =
              this._previewRect =
              this._initialTransform =
                void 0),
            this._ngZone.run(() => {
              const e = this._dropContainer,
                i = e.getItemIndex(this),
                n = this._getPointerPositionOnPage(a),
                s = this._getDragDistance(n),
                r = e._isOverContainer(n.x, n.y);
              this.ended.next({
                source: this,
                distance: s,
                dropPoint: n,
                event: a,
              }),
                this.dropped.next({
                  item: this,
                  currentIndex: i,
                  previousIndex: this._initialIndex,
                  container: e,
                  previousContainer: this._initialContainer,
                  isPointerOverContainer: r,
                  distance: s,
                  dropPoint: n,
                  event: a,
                }),
                e.drop(
                  this,
                  i,
                  this._initialIndex,
                  this._initialContainer,
                  r,
                  s,
                  n,
                  a
                ),
                (this._dropContainer = this._initialContainer);
            });
        }
        _updateActiveDropContainer({ x: a, y: e }, { x: i, y: n }) {
          let s = this._initialContainer._getSiblingContainerFromPosition(
            this,
            a,
            e
          );
          !s &&
            this._dropContainer !== this._initialContainer &&
            this._initialContainer._isOverContainer(a, e) &&
            (s = this._initialContainer),
            s &&
              s !== this._dropContainer &&
              this._ngZone.run(() => {
                this.exited.next({
                  item: this,
                  container: this._dropContainer,
                }),
                  this._dropContainer.exit(this),
                  (this._dropContainer = s),
                  this._dropContainer.enter(
                    this,
                    a,
                    e,
                    s === this._initialContainer && s.sortingDisabled
                      ? this._initialIndex
                      : void 0
                  ),
                  this.entered.next({
                    item: this,
                    container: s,
                    currentIndex: s.getItemIndex(this),
                  });
              }),
            this.isDragging() &&
              (this._dropContainer._startScrollingIfNecessary(i, n),
              this._dropContainer._sortItem(
                this,
                a,
                e,
                this._pointerDirectionDelta
              ),
              this.constrainPosition
                ? this._applyPreviewTransform(a, e)
                : this._applyPreviewTransform(
                    a - this._pickupPositionInElement.x,
                    e - this._pickupPositionInElement.y
                  ));
        }
        _createPreviewElement() {
          const a = this._previewTemplate,
            e = this.previewClass,
            i = a ? a.template : null;
          let n;
          if (i && a) {
            const s = a.matchSize ? this._initialClientRect : null,
              r = a.viewContainer.createEmbeddedView(i, a.context);
            r.detectChanges(),
              (n = ke(r, this._document)),
              (this._previewRef = r),
              a.matchSize
                ? Me(n, s)
                : (n.style.transform = mt(
                    this._pickupPositionOnPage.x,
                    this._pickupPositionOnPage.y
                  ));
          } else
            (n = be(this._rootElement)),
              Me(n, this._initialClientRect),
              this._initialTransform &&
                (n.style.transform = this._initialTransform);
          return (
            Ot(
              n.style,
              {
                'pointer-events': 'none',
                margin: '0',
                position: 'fixed',
                top: '0',
                left: '0',
                'z-index': `${this._config.zIndex || 1e3}`,
              },
              Rt
            ),
            Y(n, !1),
            n.classList.add('cdk-drag-preview'),
            n.setAttribute('dir', this._direction),
            e &&
              (Array.isArray(e)
                ? e.forEach((s) => n.classList.add(s))
                : n.classList.add(e)),
            n
          );
        }
        _animatePreviewToPlaceholder() {
          if (!this._hasMoved) return Promise.resolve();
          const a = this._placeholder.getBoundingClientRect();
          this._preview.classList.add('cdk-drag-animating'),
            this._applyPreviewTransform(a.left, a.top);
          const e = (function gn(o) {
            const a = getComputedStyle(o),
              e = St(a, 'transition-property'),
              i = e.find((c) => 'transform' === c || 'all' === c);
            if (!i) return 0;
            const n = e.indexOf(i),
              s = St(a, 'transition-duration'),
              r = St(a, 'transition-delay');
            return ge(s[n]) + ge(r[n]);
          })(this._preview);
          return 0 === e
            ? Promise.resolve()
            : this._ngZone.runOutsideAngular(
                () =>
                  new Promise((i) => {
                    const n = (r) => {
                        (!r ||
                          ((0, R.sA)(r) === this._preview &&
                            'transform' === r.propertyName)) &&
                          (this._preview?.removeEventListener(
                            'transitionend',
                            n
                          ),
                          i(),
                          clearTimeout(s));
                      },
                      s = setTimeout(n, 1.5 * e);
                    this._preview.addEventListener('transitionend', n);
                  })
              );
        }
        _createPlaceholderElement() {
          const a = this._placeholderTemplate,
            e = a ? a.template : null;
          let i;
          return (
            e
              ? ((this._placeholderRef = a.viewContainer.createEmbeddedView(
                  e,
                  a.context
                )),
                this._placeholderRef.detectChanges(),
                (i = ke(this._placeholderRef, this._document)))
              : (i = be(this._rootElement)),
            (i.style.pointerEvents = 'none'),
            i.classList.add('cdk-drag-placeholder'),
            i
          );
        }
        _getPointerPositionInElement(a, e, i) {
          const n = e === this._rootElement ? null : e,
            s = n ? n.getBoundingClientRect() : a,
            r = tt(i) ? i.targetTouches[0] : i,
            c = this._getViewportScrollPosition();
          return {
            x: s.left - a.left + (r.pageX - s.left - c.left),
            y: s.top - a.top + (r.pageY - s.top - c.top),
          };
        }
        _getPointerPositionOnPage(a) {
          const e = this._getViewportScrollPosition(),
            i = tt(a)
              ? a.touches[0] || a.changedTouches[0] || { pageX: 0, pageY: 0 }
              : a,
            n = i.pageX - e.left,
            s = i.pageY - e.top;
          if (this._ownerSVGElement) {
            const r = this._ownerSVGElement.getScreenCTM();
            if (r) {
              const c = this._ownerSVGElement.createSVGPoint();
              return (c.x = n), (c.y = s), c.matrixTransform(r.inverse());
            }
          }
          return { x: n, y: s };
        }
        _getConstrainedPointerPosition(a) {
          const e = this._dropContainer ? this._dropContainer.lockAxis : null;
          let { x: i, y: n } = this.constrainPosition
            ? this.constrainPosition(
                a,
                this,
                this._initialClientRect,
                this._pickupPositionInElement
              )
            : a;
          if (
            ('x' === this.lockAxis || 'x' === e
              ? (n =
                  this._pickupPositionOnPage.y -
                  (this.constrainPosition
                    ? this._pickupPositionInElement.y
                    : 0))
              : ('y' === this.lockAxis || 'y' === e) &&
                (i =
                  this._pickupPositionOnPage.x -
                  (this.constrainPosition
                    ? this._pickupPositionInElement.x
                    : 0)),
            this._boundaryRect)
          ) {
            const { x: s, y: r } = this.constrainPosition
                ? { x: 0, y: 0 }
                : this._pickupPositionInElement,
              c = this._boundaryRect,
              { width: l, height: d } = this._getPreviewRect(),
              u = c.top + r,
              b = c.bottom - (d - r);
            (i = Ce(i, c.left + s, c.right - (l - s))), (n = Ce(n, u, b));
          }
          return { x: i, y: n };
        }
        _updatePointerDirectionDelta(a) {
          const { x: e, y: i } = a,
            n = this._pointerDirectionDelta,
            s = this._pointerPositionAtLastDirectionChange,
            r = Math.abs(e - s.x),
            c = Math.abs(i - s.y);
          return (
            r > this._config.pointerDirectionChangeThreshold &&
              ((n.x = e > s.x ? 1 : -1), (s.x = e)),
            c > this._config.pointerDirectionChangeThreshold &&
              ((n.y = i > s.y ? 1 : -1), (s.y = i)),
            n
          );
        }
        _toggleNativeDragInteractions() {
          if (!this._rootElement || !this._handles) return;
          const a = this._handles.length > 0 || !this.isDragging();
          a !== this._nativeInteractionsEnabled &&
            ((this._nativeInteractionsEnabled = a), Y(this._rootElement, a));
        }
        _removeRootElementListeners(a) {
          a.removeEventListener('mousedown', this._pointerDown, ut),
            a.removeEventListener('touchstart', this._pointerDown, ye),
            a.removeEventListener('dragstart', this._nativeDragStart, ut);
        }
        _applyRootElementTransform(a, e) {
          const i = mt(a, e),
            n = this._rootElement.style;
          null == this._initialTransform &&
            (this._initialTransform =
              n.transform && 'none' != n.transform ? n.transform : ''),
            (n.transform = pt(i, this._initialTransform));
        }
        _applyPreviewTransform(a, e) {
          const i = this._previewTemplate?.template
              ? void 0
              : this._initialTransform,
            n = mt(a, e);
          this._preview.style.transform = pt(n, i);
        }
        _getDragDistance(a) {
          const e = this._pickupPositionOnPage;
          return e ? { x: a.x - e.x, y: a.y - e.y } : { x: 0, y: 0 };
        }
        _cleanupCachedDimensions() {
          (this._boundaryRect = this._previewRect = void 0),
            this._parentPositions.clear();
        }
        _containInsideBoundaryOnResize() {
          let { x: a, y: e } = this._passiveTransform;
          if (
            (0 === a && 0 === e) ||
            this.isDragging() ||
            !this._boundaryElement
          )
            return;
          const i = this._rootElement.getBoundingClientRect(),
            n = this._boundaryElement.getBoundingClientRect();
          if (
            (0 === n.width && 0 === n.height) ||
            (0 === i.width && 0 === i.height)
          )
            return;
          const s = n.left - i.left,
            r = i.right - n.right,
            c = n.top - i.top,
            l = i.bottom - n.bottom;
          n.width > i.width ? (s > 0 && (a += s), r > 0 && (a -= r)) : (a = 0),
            n.height > i.height
              ? (c > 0 && (e += c), l > 0 && (e -= l))
              : (e = 0),
            (a !== this._passiveTransform.x ||
              e !== this._passiveTransform.y) &&
              this.setFreeDragPosition({ y: e, x: a });
        }
        _getDragStartDelay(a) {
          const e = this.dragStartDelay;
          return 'number' == typeof e ? e : tt(a) ? e.touch : e ? e.mouse : 0;
        }
        _updateOnScroll(a) {
          const e = this._parentPositions.handleScroll(a);
          if (e) {
            const i = (0, R.sA)(a);
            this._boundaryRect &&
              i !== this._boundaryElement &&
              i.contains(this._boundaryElement) &&
              X(this._boundaryRect, e.top, e.left),
              (this._pickupPositionOnPage.x += e.left),
              (this._pickupPositionOnPage.y += e.top),
              this._dropContainer ||
                ((this._activeTransform.x -= e.left),
                (this._activeTransform.y -= e.top),
                this._applyRootElementTransform(
                  this._activeTransform.x,
                  this._activeTransform.y
                ));
          }
        }
        _getViewportScrollPosition() {
          return (
            this._parentPositions.positions.get(this._document)
              ?.scrollPosition ||
            this._parentPositions.getViewportScrollPosition()
          );
        }
        _getShadowRoot() {
          return (
            void 0 === this._cachedShadowRoot &&
              (this._cachedShadowRoot = (0, R.kV)(this._rootElement)),
            this._cachedShadowRoot
          );
        }
        _getPreviewInsertionPoint(a, e) {
          const i = this._previewContainer || 'global';
          if ('parent' === i) return a;
          if ('global' === i) {
            const n = this._document;
            return (
              e ||
              n.fullscreenElement ||
              n.webkitFullscreenElement ||
              n.mozFullScreenElement ||
              n.msFullscreenElement ||
              n.body
            );
          }
          return (0, p.fI)(i);
        }
        _getPreviewRect() {
          return (
            (!this._previewRect ||
              (!this._previewRect.width && !this._previewRect.height)) &&
              (this._previewRect = this._preview
                ? this._preview.getBoundingClientRect()
                : this._initialClientRect),
            this._previewRect
          );
        }
        _getTargetHandle(a) {
          return this._handles.find(
            (e) => a.target && (a.target === e || e.contains(a.target))
          );
        }
      }
      function mt(o, a) {
        return `translate3d(${Math.round(o)}px, ${Math.round(a)}px, 0)`;
      }
      function Ce(o, a, e) {
        return Math.max(a, Math.min(e, o));
      }
      function tt(o) {
        return 't' === o.type[0];
      }
      function ke(o, a) {
        const e = o.rootNodes;
        if (1 === e.length && e[0].nodeType === a.ELEMENT_NODE) return e[0];
        const i = a.createElement('div');
        return e.forEach((n) => i.appendChild(n)), i;
      }
      function Me(o, a) {
        (o.style.width = `${a.width}px`),
          (o.style.height = `${a.height}px`),
          (o.style.transform = mt(a.left, a.top));
      }
      function Te(o, a, e) {
        const i = et(a, o.length - 1),
          n = et(e, o.length - 1);
        if (i === n) return;
        const s = o[i],
          r = n < i ? -1 : 1;
        for (let c = i; c !== n; c += r) o[c] = o[c + r];
        o[n] = s;
      }
      function et(o, a) {
        return Math.max(0, Math.min(a, o));
      }
      class vn {
        constructor(a, e) {
          (this._element = a),
            (this._dragDropRegistry = e),
            (this._itemPositions = []),
            (this.orientation = 'vertical'),
            (this._previousSwap = { drag: null, delta: 0, overlaps: !1 });
        }
        start(a) {
          this.withItems(a);
        }
        sort(a, e, i, n) {
          const s = this._itemPositions,
            r = this._getItemIndexFromPointerPosition(a, e, i, n);
          if (-1 === r && s.length > 0) return null;
          const c = 'horizontal' === this.orientation,
            l = s.findIndex((S) => S.drag === a),
            d = s[r],
            b = d.clientRect,
            C = l > r ? 1 : -1,
            w = this._getItemOffsetPx(s[l].clientRect, b, C),
            E = this._getSiblingOffsetPx(l, s, C),
            J = s.slice();
          return (
            Te(s, l, r),
            s.forEach((S, Ho) => {
              if (J[Ho] === S) return;
              const Le = S.drag === a,
                Lt = Le ? w : E,
                Ne = Le ? a.getPlaceholderElement() : S.drag.getRootElement();
              (S.offset += Lt),
                c
                  ? ((Ne.style.transform = pt(
                      `translate3d(${Math.round(S.offset)}px, 0, 0)`,
                      S.initialTransform
                    )),
                    X(S.clientRect, 0, Lt))
                  : ((Ne.style.transform = pt(
                      `translate3d(0, ${Math.round(S.offset)}px, 0)`,
                      S.initialTransform
                    )),
                    X(S.clientRect, Lt, 0));
            }),
            (this._previousSwap.overlaps = Dt(b, e, i)),
            (this._previousSwap.drag = d.drag),
            (this._previousSwap.delta = c ? n.x : n.y),
            { previousIndex: l, currentIndex: r }
          );
        }
        enter(a, e, i, n) {
          const s =
              null == n || n < 0
                ? this._getItemIndexFromPointerPosition(a, e, i)
                : n,
            r = this._activeDraggables,
            c = r.indexOf(a),
            l = a.getPlaceholderElement();
          let d = r[s];
          if (
            (d === a && (d = r[s + 1]),
            !d &&
              (null == s || -1 === s || s < r.length - 1) &&
              this._shouldEnterAsFirstChild(e, i) &&
              (d = r[0]),
            c > -1 && r.splice(c, 1),
            d && !this._dragDropRegistry.isDragging(d))
          ) {
            const u = d.getRootElement();
            u.parentElement.insertBefore(l, u), r.splice(s, 0, a);
          } else (0, p.fI)(this._element).appendChild(l), r.push(a);
          (l.style.transform = ''), this._cacheItemPositions();
        }
        withItems(a) {
          (this._activeDraggables = a.slice()), this._cacheItemPositions();
        }
        withSortPredicate(a) {
          this._sortPredicate = a;
        }
        reset() {
          this._activeDraggables.forEach((a) => {
            const e = a.getRootElement();
            if (e) {
              const i = this._itemPositions.find(
                (n) => n.drag === a
              )?.initialTransform;
              e.style.transform = i || '';
            }
          }),
            (this._itemPositions = []),
            (this._activeDraggables = []),
            (this._previousSwap.drag = null),
            (this._previousSwap.delta = 0),
            (this._previousSwap.overlaps = !1);
        }
        getActiveItemsSnapshot() {
          return this._activeDraggables;
        }
        getItemIndex(a) {
          return (
            'horizontal' === this.orientation && 'rtl' === this.direction
              ? this._itemPositions.slice().reverse()
              : this._itemPositions
          ).findIndex((i) => i.drag === a);
        }
        updateOnScroll(a, e) {
          this._itemPositions.forEach(({ clientRect: i }) => {
            X(i, a, e);
          }),
            this._itemPositions.forEach(({ drag: i }) => {
              this._dragDropRegistry.isDragging(i) &&
                i._sortFromLastPointerPosition();
            });
        }
        _cacheItemPositions() {
          const a = 'horizontal' === this.orientation;
          this._itemPositions = this._activeDraggables
            .map((e) => {
              const i = e.getVisibleElement();
              return {
                drag: e,
                offset: 0,
                initialTransform: i.style.transform || '',
                clientRect: At(i),
              };
            })
            .sort((e, i) =>
              a
                ? e.clientRect.left - i.clientRect.left
                : e.clientRect.top - i.clientRect.top
            );
        }
        _getItemOffsetPx(a, e, i) {
          const n = 'horizontal' === this.orientation;
          let s = n ? e.left - a.left : e.top - a.top;
          return (
            -1 === i && (s += n ? e.width - a.width : e.height - a.height), s
          );
        }
        _getSiblingOffsetPx(a, e, i) {
          const n = 'horizontal' === this.orientation,
            s = e[a].clientRect,
            r = e[a + -1 * i];
          let c = s[n ? 'width' : 'height'] * i;
          if (r) {
            const l = n ? 'left' : 'top',
              d = n ? 'right' : 'bottom';
            -1 === i
              ? (c -= r.clientRect[l] - s[d])
              : (c += s[l] - r.clientRect[d]);
          }
          return c;
        }
        _shouldEnterAsFirstChild(a, e) {
          if (!this._activeDraggables.length) return !1;
          const i = this._itemPositions,
            n = 'horizontal' === this.orientation;
          if (i[0].drag !== this._activeDraggables[0]) {
            const r = i[i.length - 1].clientRect;
            return n ? a >= r.right : e >= r.bottom;
          }
          {
            const r = i[0].clientRect;
            return n ? a <= r.left : e <= r.top;
          }
        }
        _getItemIndexFromPointerPosition(a, e, i, n) {
          const s = 'horizontal' === this.orientation,
            r = this._itemPositions.findIndex(
              ({ drag: c, clientRect: l }) =>
                c !== a &&
                (!n ||
                  c !== this._previousSwap.drag ||
                  !this._previousSwap.overlaps ||
                  (s ? n.x : n.y) !== this._previousSwap.delta) &&
                (s
                  ? e >= Math.floor(l.left) && e < Math.floor(l.right)
                  : i >= Math.floor(l.top) && i < Math.floor(l.bottom))
            );
          return -1 !== r && this._sortPredicate(r, a) ? r : -1;
        }
      }
      class wn {
        constructor(a, e, i, n, s) {
          (this._dragDropRegistry = e),
            (this._ngZone = n),
            (this._viewportRuler = s),
            (this.disabled = !1),
            (this.sortingDisabled = !1),
            (this.autoScrollDisabled = !1),
            (this.autoScrollStep = 2),
            (this.enterPredicate = () => !0),
            (this.sortPredicate = () => !0),
            (this.beforeStarted = new _.x()),
            (this.entered = new _.x()),
            (this.exited = new _.x()),
            (this.dropped = new _.x()),
            (this.sorted = new _.x()),
            (this.receivingStarted = new _.x()),
            (this.receivingStopped = new _.x()),
            (this._isDragging = !1),
            (this._draggables = []),
            (this._siblings = []),
            (this._activeSiblings = new Set()),
            (this._viewportScrollSubscription = H.w0.EMPTY),
            (this._verticalScrollDirection = 0),
            (this._horizontalScrollDirection = 0),
            (this._stopScrollTimers = new _.x()),
            (this._cachedShadowRoot = null),
            (this._startScrollInterval = () => {
              this._stopScrolling(),
                (function un(o = 0, a = hn.z) {
                  return o < 0 && (o = 0), (0, pn.H)(o, o, a);
                })(0, mn.Z)
                  .pipe((0, k.R)(this._stopScrollTimers))
                  .subscribe(() => {
                    const r = this._scrollNode,
                      c = this.autoScrollStep;
                    1 === this._verticalScrollDirection
                      ? r.scrollBy(0, -c)
                      : 2 === this._verticalScrollDirection && r.scrollBy(0, c),
                      1 === this._horizontalScrollDirection
                        ? r.scrollBy(-c, 0)
                        : 2 === this._horizontalScrollDirection &&
                          r.scrollBy(c, 0);
                  });
            }),
            (this.element = (0, p.fI)(a)),
            (this._document = i),
            this.withScrollableParents([this.element]),
            e.registerDropContainer(this),
            (this._parentPositions = new fe(i)),
            (this._sortStrategy = new vn(this.element, e)),
            this._sortStrategy.withSortPredicate((r, c) =>
              this.sortPredicate(r, c, this)
            );
        }
        dispose() {
          this._stopScrolling(),
            this._stopScrollTimers.complete(),
            this._viewportScrollSubscription.unsubscribe(),
            this.beforeStarted.complete(),
            this.entered.complete(),
            this.exited.complete(),
            this.dropped.complete(),
            this.sorted.complete(),
            this.receivingStarted.complete(),
            this.receivingStopped.complete(),
            this._activeSiblings.clear(),
            (this._scrollNode = null),
            this._parentPositions.clear(),
            this._dragDropRegistry.removeDropContainer(this);
        }
        isDragging() {
          return this._isDragging;
        }
        start() {
          this._draggingStarted(), this._notifyReceivingSiblings();
        }
        enter(a, e, i, n) {
          this._draggingStarted(),
            null == n &&
              this.sortingDisabled &&
              (n = this._draggables.indexOf(a)),
            this._sortStrategy.enter(a, e, i, n),
            this._cacheParentPositions(),
            this._notifyReceivingSiblings(),
            this.entered.next({
              item: a,
              container: this,
              currentIndex: this.getItemIndex(a),
            });
        }
        exit(a) {
          this._reset(), this.exited.next({ item: a, container: this });
        }
        drop(a, e, i, n, s, r, c, l = {}) {
          this._reset(),
            this.dropped.next({
              item: a,
              currentIndex: e,
              previousIndex: i,
              container: this,
              previousContainer: n,
              isPointerOverContainer: s,
              distance: r,
              dropPoint: c,
              event: l,
            });
        }
        withItems(a) {
          const e = this._draggables;
          return (
            (this._draggables = a),
            a.forEach((i) => i._withDropContainer(this)),
            this.isDragging() &&
              (e.filter((n) => n.isDragging()).every((n) => -1 === a.indexOf(n))
                ? this._reset()
                : this._sortStrategy.withItems(this._draggables)),
            this
          );
        }
        withDirection(a) {
          return (this._sortStrategy.direction = a), this;
        }
        connectedTo(a) {
          return (this._siblings = a.slice()), this;
        }
        withOrientation(a) {
          return (this._sortStrategy.orientation = a), this;
        }
        withScrollableParents(a) {
          const e = (0, p.fI)(this.element);
          return (
            (this._scrollableElements =
              -1 === a.indexOf(e) ? [e, ...a] : a.slice()),
            this
          );
        }
        getScrollableParents() {
          return this._scrollableElements;
        }
        getItemIndex(a) {
          return this._isDragging
            ? this._sortStrategy.getItemIndex(a)
            : this._draggables.indexOf(a);
        }
        isReceiving() {
          return this._activeSiblings.size > 0;
        }
        _sortItem(a, e, i, n) {
          if (
            this.sortingDisabled ||
            !this._clientRect ||
            !_e(this._clientRect, 0.05, e, i)
          )
            return;
          const s = this._sortStrategy.sort(a, e, i, n);
          s &&
            this.sorted.next({
              previousIndex: s.previousIndex,
              currentIndex: s.currentIndex,
              container: this,
              item: a,
            });
        }
        _startScrollingIfNecessary(a, e) {
          if (this.autoScrollDisabled) return;
          let i,
            n = 0,
            s = 0;
          if (
            (this._parentPositions.positions.forEach((r, c) => {
              c === this._document ||
                !r.clientRect ||
                i ||
                (_e(r.clientRect, 0.05, a, e) &&
                  (([n, s] = (function xn(o, a, e, i) {
                    const n = Oe(a, i),
                      s = Se(a, e);
                    let r = 0,
                      c = 0;
                    if (n) {
                      const l = o.scrollTop;
                      1 === n
                        ? l > 0 && (r = 1)
                        : o.scrollHeight - l > o.clientHeight && (r = 2);
                    }
                    if (s) {
                      const l = o.scrollLeft;
                      1 === s
                        ? l > 0 && (c = 1)
                        : o.scrollWidth - l > o.clientWidth && (c = 2);
                    }
                    return [r, c];
                  })(c, r.clientRect, a, e)),
                  (n || s) && (i = c)));
            }),
            !n && !s)
          ) {
            const { width: r, height: c } =
                this._viewportRuler.getViewportSize(),
              l = { width: r, height: c, top: 0, right: r, bottom: c, left: 0 };
            (n = Oe(l, e)), (s = Se(l, a)), (i = window);
          }
          i &&
            (n !== this._verticalScrollDirection ||
              s !== this._horizontalScrollDirection ||
              i !== this._scrollNode) &&
            ((this._verticalScrollDirection = n),
            (this._horizontalScrollDirection = s),
            (this._scrollNode = i),
            (n || s) && i
              ? this._ngZone.runOutsideAngular(this._startScrollInterval)
              : this._stopScrolling());
        }
        _stopScrolling() {
          this._stopScrollTimers.next();
        }
        _draggingStarted() {
          const a = (0, p.fI)(this.element).style;
          this.beforeStarted.next(),
            (this._isDragging = !0),
            (this._initialScrollSnap =
              a.msScrollSnapType || a.scrollSnapType || ''),
            (a.scrollSnapType = a.msScrollSnapType = 'none'),
            this._sortStrategy.start(this._draggables),
            this._cacheParentPositions(),
            this._viewportScrollSubscription.unsubscribe(),
            this._listenToScrollEvents();
        }
        _cacheParentPositions() {
          const a = (0, p.fI)(this.element);
          this._parentPositions.cache(this._scrollableElements),
            (this._clientRect =
              this._parentPositions.positions.get(a).clientRect);
        }
        _reset() {
          this._isDragging = !1;
          const a = (0, p.fI)(this.element).style;
          (a.scrollSnapType = a.msScrollSnapType = this._initialScrollSnap),
            this._siblings.forEach((e) => e._stopReceiving(this)),
            this._sortStrategy.reset(),
            this._stopScrolling(),
            this._viewportScrollSubscription.unsubscribe(),
            this._parentPositions.clear();
        }
        _isOverContainer(a, e) {
          return null != this._clientRect && Dt(this._clientRect, a, e);
        }
        _getSiblingContainerFromPosition(a, e, i) {
          return this._siblings.find((n) => n._canReceive(a, e, i));
        }
        _canReceive(a, e, i) {
          if (
            !this._clientRect ||
            !Dt(this._clientRect, e, i) ||
            !this.enterPredicate(a, this)
          )
            return !1;
          const n = this._getShadowRoot().elementFromPoint(e, i);
          if (!n) return !1;
          const s = (0, p.fI)(this.element);
          return n === s || s.contains(n);
        }
        _startReceiving(a, e) {
          const i = this._activeSiblings;
          !i.has(a) &&
            e.every(
              (n) =>
                this.enterPredicate(n, this) || this._draggables.indexOf(n) > -1
            ) &&
            (i.add(a),
            this._cacheParentPositions(),
            this._listenToScrollEvents(),
            this.receivingStarted.next({
              initiator: a,
              receiver: this,
              items: e,
            }));
        }
        _stopReceiving(a) {
          this._activeSiblings.delete(a),
            this._viewportScrollSubscription.unsubscribe(),
            this.receivingStopped.next({ initiator: a, receiver: this });
        }
        _listenToScrollEvents() {
          this._viewportScrollSubscription = this._dragDropRegistry
            .scrolled(this._getShadowRoot())
            .subscribe((a) => {
              if (this.isDragging()) {
                const e = this._parentPositions.handleScroll(a);
                e && this._sortStrategy.updateOnScroll(e.top, e.left);
              } else this.isReceiving() && this._cacheParentPositions();
            });
        }
        _getShadowRoot() {
          if (!this._cachedShadowRoot) {
            const a = (0, R.kV)((0, p.fI)(this.element));
            this._cachedShadowRoot = a || this._document;
          }
          return this._cachedShadowRoot;
        }
        _notifyReceivingSiblings() {
          const a = this._sortStrategy
            .getActiveItemsSnapshot()
            .filter((e) => e.isDragging());
          this._siblings.forEach((e) => e._startReceiving(this, a));
        }
      }
      function Oe(o, a) {
        const { top: e, bottom: i, height: n } = o,
          s = 0.05 * n;
        return a >= e - s && a <= e + s ? 1 : a >= i - s && a <= i + s ? 2 : 0;
      }
      function Se(o, a) {
        const { left: e, right: i, width: n } = o,
          s = 0.05 * n;
        return a >= e - s && a <= e + s ? 1 : a >= i - s && a <= i + s ? 2 : 0;
      }
      const gt = (0, R.i$)({ passive: !1, capture: !0 });
      let yn = (() => {
        class o {
          constructor(e, i) {
            (this._ngZone = e),
              (this._dropInstances = new Set()),
              (this._dragInstances = new Set()),
              (this._activeDragInstances = []),
              (this._globalListeners = new Map()),
              (this._draggingPredicate = (n) => n.isDragging()),
              (this.pointerMove = new _.x()),
              (this.pointerUp = new _.x()),
              (this.scroll = new _.x()),
              (this._preventDefaultWhileDragging = (n) => {
                this._activeDragInstances.length > 0 && n.preventDefault();
              }),
              (this._persistentTouchmoveListener = (n) => {
                this._activeDragInstances.length > 0 &&
                  (this._activeDragInstances.some(this._draggingPredicate) &&
                    n.preventDefault(),
                  this.pointerMove.next(n));
              }),
              (this._document = i);
          }
          registerDropContainer(e) {
            this._dropInstances.has(e) || this._dropInstances.add(e);
          }
          registerDragItem(e) {
            this._dragInstances.add(e),
              1 === this._dragInstances.size &&
                this._ngZone.runOutsideAngular(() => {
                  this._document.addEventListener(
                    'touchmove',
                    this._persistentTouchmoveListener,
                    gt
                  );
                });
          }
          removeDropContainer(e) {
            this._dropInstances.delete(e);
          }
          removeDragItem(e) {
            this._dragInstances.delete(e),
              this.stopDragging(e),
              0 === this._dragInstances.size &&
                this._document.removeEventListener(
                  'touchmove',
                  this._persistentTouchmoveListener,
                  gt
                );
          }
          startDragging(e, i) {
            if (
              !(this._activeDragInstances.indexOf(e) > -1) &&
              (this._activeDragInstances.push(e),
              1 === this._activeDragInstances.length)
            ) {
              const n = i.type.startsWith('touch');
              this._globalListeners
                .set(n ? 'touchend' : 'mouseup', {
                  handler: (s) => this.pointerUp.next(s),
                  options: !0,
                })
                .set('scroll', {
                  handler: (s) => this.scroll.next(s),
                  options: !0,
                })
                .set('selectstart', {
                  handler: this._preventDefaultWhileDragging,
                  options: gt,
                }),
                n ||
                  this._globalListeners.set('mousemove', {
                    handler: (s) => this.pointerMove.next(s),
                    options: gt,
                  }),
                this._ngZone.runOutsideAngular(() => {
                  this._globalListeners.forEach((s, r) => {
                    this._document.addEventListener(r, s.handler, s.options);
                  });
                });
            }
          }
          stopDragging(e) {
            const i = this._activeDragInstances.indexOf(e);
            i > -1 &&
              (this._activeDragInstances.splice(i, 1),
              0 === this._activeDragInstances.length &&
                this._clearGlobalListeners());
          }
          isDragging(e) {
            return this._activeDragInstances.indexOf(e) > -1;
          }
          scrolled(e) {
            const i = [this.scroll];
            return (
              e &&
                e !== this._document &&
                i.push(
                  new ot.y((n) =>
                    this._ngZone.runOutsideAngular(() => {
                      const r = (c) => {
                        this._activeDragInstances.length && n.next(c);
                      };
                      return (
                        e.addEventListener('scroll', r, !0),
                        () => {
                          e.removeEventListener('scroll', r, !0);
                        }
                      );
                    })
                  )
                ),
              (0, D.T)(...i)
            );
          }
          ngOnDestroy() {
            this._dragInstances.forEach((e) => this.removeDragItem(e)),
              this._dropInstances.forEach((e) => this.removeDropContainer(e)),
              this._clearGlobalListeners(),
              this.pointerMove.complete(),
              this.pointerUp.complete();
          }
          _clearGlobalListeners() {
            this._globalListeners.forEach((e, i) => {
              this._document.removeEventListener(i, e.handler, e.options);
            }),
              this._globalListeners.clear();
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(t.LFG(t.R0b), t.LFG(m.K0));
          });
          static #e = (this.ɵprov = t.Yz7({
            token: o,
            factory: o.ɵfac,
            providedIn: 'root',
          }));
        }
        return o;
      })();
      const Cn = { dragStartThreshold: 5, pointerDirectionChangeThreshold: 5 };
      let Et = (() => {
        class o {
          constructor(e, i, n, s) {
            (this._document = e),
              (this._ngZone = i),
              (this._viewportRuler = n),
              (this._dragDropRegistry = s);
          }
          createDrag(e, i = Cn) {
            return new bn(
              e,
              i,
              this._document,
              this._ngZone,
              this._viewportRuler,
              this._dragDropRegistry
            );
          }
          createDropList(e) {
            return new wn(
              e,
              this._dragDropRegistry,
              this._document,
              this._ngZone,
              this._viewportRuler
            );
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(
              t.LFG(m.K0),
              t.LFG(t.R0b),
              t.LFG($.rL),
              t.LFG(yn)
            );
          });
          static #e = (this.ɵprov = t.Yz7({
            token: o,
            factory: o.ɵfac,
            providedIn: 'root',
          }));
        }
        return o;
      })();
      const Ft = new t.OlP('CDK_DRAG_PARENT'),
        Qt = new t.OlP('CdkDragHandle'),
        Ae = new t.OlP('CdkDragPlaceholder'),
        De = new t.OlP('CdkDragPreview'),
        Re = new t.OlP('CDK_DRAG_CONFIG'),
        Ee = new t.OlP('CdkDropList');
      let Fe = (() => {
        class o {
          static #t = (this._dragInstances = []);
          get disabled() {
            return (
              this._disabled ||
              (this.dropContainer && this.dropContainer.disabled)
            );
          }
          set disabled(e) {
            (this._disabled = (0, p.Ig)(e)),
              (this._dragRef.disabled = this._disabled);
          }
          constructor(e, i, n, s, r, c, l, d, u, b, C) {
            (this.element = e),
              (this.dropContainer = i),
              (this._ngZone = s),
              (this._viewContainerRef = r),
              (this._dir = l),
              (this._changeDetectorRef = u),
              (this._selfHandle = b),
              (this._parentDrag = C),
              (this._destroyed = new _.x()),
              (this.started = new t.vpe()),
              (this.released = new t.vpe()),
              (this.ended = new t.vpe()),
              (this.entered = new t.vpe()),
              (this.exited = new t.vpe()),
              (this.dropped = new t.vpe()),
              (this.moved = new ot.y((w) => {
                const E = this._dragRef.moved
                  .pipe(
                    (0, xt.U)((J) => ({
                      source: this,
                      pointerPosition: J.pointerPosition,
                      event: J.event,
                      delta: J.delta,
                      distance: J.distance,
                    }))
                  )
                  .subscribe(w);
                return () => {
                  E.unsubscribe();
                };
              })),
              (this._dragRef = d.createDrag(e, {
                dragStartThreshold:
                  c && null != c.dragStartThreshold ? c.dragStartThreshold : 5,
                pointerDirectionChangeThreshold:
                  c && null != c.pointerDirectionChangeThreshold
                    ? c.pointerDirectionChangeThreshold
                    : 5,
                zIndex: c?.zIndex,
              })),
              (this._dragRef.data = this),
              o._dragInstances.push(this),
              c && this._assignDefaults(c),
              i &&
                (this._dragRef._withDropContainer(i._dropListRef),
                i.addItem(this)),
              this._syncInputs(this._dragRef),
              this._handleEvents(this._dragRef);
          }
          getPlaceholderElement() {
            return this._dragRef.getPlaceholderElement();
          }
          getRootElement() {
            return this._dragRef.getRootElement();
          }
          reset() {
            this._dragRef.reset();
          }
          getFreeDragPosition() {
            return this._dragRef.getFreeDragPosition();
          }
          setFreeDragPosition(e) {
            this._dragRef.setFreeDragPosition(e);
          }
          ngAfterViewInit() {
            this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable
                .pipe((0, q.q)(1), (0, k.R)(this._destroyed))
                .subscribe(() => {
                  this._updateRootElement(),
                    this._setupHandlesListener(),
                    this.freeDragPosition &&
                      this._dragRef.setFreeDragPosition(this.freeDragPosition);
                });
            });
          }
          ngOnChanges(e) {
            const i = e.rootElementSelector,
              n = e.freeDragPosition;
            i && !i.firstChange && this._updateRootElement(),
              n &&
                !n.firstChange &&
                this.freeDragPosition &&
                this._dragRef.setFreeDragPosition(this.freeDragPosition);
          }
          ngOnDestroy() {
            this.dropContainer && this.dropContainer.removeItem(this);
            const e = o._dragInstances.indexOf(this);
            e > -1 && o._dragInstances.splice(e, 1),
              this._ngZone.runOutsideAngular(() => {
                this._destroyed.next(),
                  this._destroyed.complete(),
                  this._dragRef.dispose();
              });
          }
          _updateRootElement() {
            const e = this.element.nativeElement;
            let i = e;
            this.rootElementSelector &&
              (i =
                void 0 !== e.closest
                  ? e.closest(this.rootElementSelector)
                  : e.parentElement?.closest(this.rootElementSelector)),
              this._dragRef.withRootElement(i || e);
          }
          _getBoundaryElement() {
            const e = this.boundaryElement;
            return e
              ? 'string' == typeof e
                ? this.element.nativeElement.closest(e)
                : (0, p.fI)(e)
              : null;
          }
          _syncInputs(e) {
            e.beforeStarted.subscribe(() => {
              if (!e.isDragging()) {
                const i = this._dir,
                  n = this.dragStartDelay,
                  s = this._placeholderTemplate
                    ? {
                        template: this._placeholderTemplate.templateRef,
                        context: this._placeholderTemplate.data,
                        viewContainer: this._viewContainerRef,
                      }
                    : null,
                  r = this._previewTemplate
                    ? {
                        template: this._previewTemplate.templateRef,
                        context: this._previewTemplate.data,
                        matchSize: this._previewTemplate.matchSize,
                        viewContainer: this._viewContainerRef,
                      }
                    : null;
                (e.disabled = this.disabled),
                  (e.lockAxis = this.lockAxis),
                  (e.dragStartDelay =
                    'object' == typeof n && n ? n : (0, p.su)(n)),
                  (e.constrainPosition = this.constrainPosition),
                  (e.previewClass = this.previewClass),
                  e
                    .withBoundaryElement(this._getBoundaryElement())
                    .withPlaceholderTemplate(s)
                    .withPreviewTemplate(r)
                    .withPreviewContainer(this.previewContainer || 'global'),
                  i && e.withDirection(i.value);
              }
            }),
              e.beforeStarted.pipe((0, q.q)(1)).subscribe(() => {
                if (this._parentDrag)
                  return void e.withParent(this._parentDrag._dragRef);
                let i = this.element.nativeElement.parentElement;
                for (; i; ) {
                  if (i.classList.contains('cdk-drag')) {
                    e.withParent(
                      o._dragInstances.find(
                        (n) => n.element.nativeElement === i
                      )?._dragRef || null
                    );
                    break;
                  }
                  i = i.parentElement;
                }
              });
          }
          _handleEvents(e) {
            e.started.subscribe((i) => {
              this.started.emit({ source: this, event: i.event }),
                this._changeDetectorRef.markForCheck();
            }),
              e.released.subscribe((i) => {
                this.released.emit({ source: this, event: i.event });
              }),
              e.ended.subscribe((i) => {
                this.ended.emit({
                  source: this,
                  distance: i.distance,
                  dropPoint: i.dropPoint,
                  event: i.event,
                }),
                  this._changeDetectorRef.markForCheck();
              }),
              e.entered.subscribe((i) => {
                this.entered.emit({
                  container: i.container.data,
                  item: this,
                  currentIndex: i.currentIndex,
                });
              }),
              e.exited.subscribe((i) => {
                this.exited.emit({ container: i.container.data, item: this });
              }),
              e.dropped.subscribe((i) => {
                this.dropped.emit({
                  previousIndex: i.previousIndex,
                  currentIndex: i.currentIndex,
                  previousContainer: i.previousContainer.data,
                  container: i.container.data,
                  isPointerOverContainer: i.isPointerOverContainer,
                  item: this,
                  distance: i.distance,
                  dropPoint: i.dropPoint,
                  event: i.event,
                });
              });
          }
          _assignDefaults(e) {
            const {
              lockAxis: i,
              dragStartDelay: n,
              constrainPosition: s,
              previewClass: r,
              boundaryElement: c,
              draggingDisabled: l,
              rootElementSelector: d,
              previewContainer: u,
            } = e;
            (this.disabled = l ?? !1),
              (this.dragStartDelay = n || 0),
              i && (this.lockAxis = i),
              s && (this.constrainPosition = s),
              r && (this.previewClass = r),
              c && (this.boundaryElement = c),
              d && (this.rootElementSelector = d),
              u && (this.previewContainer = u);
          }
          _setupHandlesListener() {
            this._handles.changes
              .pipe(
                (0, Q.O)(this._handles),
                (0, st.b)((e) => {
                  const i = e
                    .filter((n) => n._parentDrag === this)
                    .map((n) => n.element);
                  this._selfHandle &&
                    this.rootElementSelector &&
                    i.push(this.element),
                    this._dragRef.withHandles(i);
                }),
                (0, V.w)((e) =>
                  (0, D.T)(...e.map((i) => i._stateChanges.pipe((0, Q.O)(i))))
                ),
                (0, k.R)(this._destroyed)
              )
              .subscribe((e) => {
                const i = this._dragRef,
                  n = e.element.nativeElement;
                e.disabled ? i.disableHandle(n) : i.enableHandle(n);
              });
          }
          static #e = (this.ɵfac = function (i) {
            return new (i || o)(
              t.Y36(t.SBq),
              t.Y36(Ee, 12),
              t.Y36(m.K0),
              t.Y36(t.R0b),
              t.Y36(t.s_b),
              t.Y36(Re, 8),
              t.Y36(j.Is, 8),
              t.Y36(Et),
              t.Y36(t.sBO),
              t.Y36(Qt, 10),
              t.Y36(Ft, 12)
            );
          });
          static #i = (this.ɵdir = t.lG2({
            type: o,
            selectors: [['', 'cdkDrag', '']],
            contentQueries: function (i, n, s) {
              if (
                (1 & i && (t.Suo(s, De, 5), t.Suo(s, Ae, 5), t.Suo(s, Qt, 5)),
                2 & i)
              ) {
                let r;
                t.iGM((r = t.CRH())) && (n._previewTemplate = r.first),
                  t.iGM((r = t.CRH())) && (n._placeholderTemplate = r.first),
                  t.iGM((r = t.CRH())) && (n._handles = r);
              }
            },
            hostAttrs: [1, 'cdk-drag'],
            hostVars: 4,
            hostBindings: function (i, n) {
              2 & i &&
                t.ekj('cdk-drag-disabled', n.disabled)(
                  'cdk-drag-dragging',
                  n._dragRef.isDragging()
                );
            },
            inputs: {
              data: ['cdkDragData', 'data'],
              lockAxis: ['cdkDragLockAxis', 'lockAxis'],
              rootElementSelector: [
                'cdkDragRootElement',
                'rootElementSelector',
              ],
              boundaryElement: ['cdkDragBoundary', 'boundaryElement'],
              dragStartDelay: ['cdkDragStartDelay', 'dragStartDelay'],
              freeDragPosition: ['cdkDragFreeDragPosition', 'freeDragPosition'],
              disabled: ['cdkDragDisabled', 'disabled'],
              constrainPosition: [
                'cdkDragConstrainPosition',
                'constrainPosition',
              ],
              previewClass: ['cdkDragPreviewClass', 'previewClass'],
              previewContainer: ['cdkDragPreviewContainer', 'previewContainer'],
            },
            outputs: {
              started: 'cdkDragStarted',
              released: 'cdkDragReleased',
              ended: 'cdkDragEnded',
              entered: 'cdkDragEntered',
              exited: 'cdkDragExited',
              dropped: 'cdkDragDropped',
              moved: 'cdkDragMoved',
            },
            exportAs: ['cdkDrag'],
            standalone: !0,
            features: [t._Bn([{ provide: Ft, useExisting: o }]), t.TTD],
          }));
        }
        return o;
      })();
      const qt = new t.OlP('CdkDropListGroup');
      let On = 0,
        Qe = (() => {
          class o {
            static #t = (this._dropLists = []);
            get disabled() {
              return this._disabled || (!!this._group && this._group.disabled);
            }
            set disabled(e) {
              this._dropListRef.disabled = this._disabled = (0, p.Ig)(e);
            }
            constructor(e, i, n, s, r, c, l) {
              (this.element = e),
                (this._changeDetectorRef = n),
                (this._scrollDispatcher = s),
                (this._dir = r),
                (this._group = c),
                (this._destroyed = new _.x()),
                (this.connectedTo = []),
                (this.id = 'cdk-drop-list-' + On++),
                (this.enterPredicate = () => !0),
                (this.sortPredicate = () => !0),
                (this.dropped = new t.vpe()),
                (this.entered = new t.vpe()),
                (this.exited = new t.vpe()),
                (this.sorted = new t.vpe()),
                (this._unsortedItems = new Set()),
                (this._dropListRef = i.createDropList(e)),
                (this._dropListRef.data = this),
                l && this._assignDefaults(l),
                (this._dropListRef.enterPredicate = (d, u) =>
                  this.enterPredicate(d.data, u.data)),
                (this._dropListRef.sortPredicate = (d, u, b) =>
                  this.sortPredicate(d, u.data, b.data)),
                this._setupInputSyncSubscription(this._dropListRef),
                this._handleEvents(this._dropListRef),
                o._dropLists.push(this),
                c && c._items.add(this);
            }
            addItem(e) {
              this._unsortedItems.add(e),
                this._dropListRef.isDragging() && this._syncItemsWithRef();
            }
            removeItem(e) {
              this._unsortedItems.delete(e),
                this._dropListRef.isDragging() && this._syncItemsWithRef();
            }
            getSortedItems() {
              return Array.from(this._unsortedItems).sort((e, i) =>
                e._dragRef
                  .getVisibleElement()
                  .compareDocumentPosition(i._dragRef.getVisibleElement()) &
                Node.DOCUMENT_POSITION_FOLLOWING
                  ? -1
                  : 1
              );
            }
            ngOnDestroy() {
              const e = o._dropLists.indexOf(this);
              e > -1 && o._dropLists.splice(e, 1),
                this._group && this._group._items.delete(this),
                this._unsortedItems.clear(),
                this._dropListRef.dispose(),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            _setupInputSyncSubscription(e) {
              this._dir &&
                this._dir.change
                  .pipe((0, Q.O)(this._dir.value), (0, k.R)(this._destroyed))
                  .subscribe((i) => e.withDirection(i)),
                e.beforeStarted.subscribe(() => {
                  const i = (0, p.Eq)(this.connectedTo).map((n) =>
                    'string' == typeof n
                      ? o._dropLists.find((r) => r.id === n)
                      : n
                  );
                  if (
                    (this._group &&
                      this._group._items.forEach((n) => {
                        -1 === i.indexOf(n) && i.push(n);
                      }),
                    !this._scrollableParentsResolved)
                  ) {
                    const n = this._scrollDispatcher
                      .getAncestorScrollContainers(this.element)
                      .map((s) => s.getElementRef().nativeElement);
                    this._dropListRef.withScrollableParents(n),
                      (this._scrollableParentsResolved = !0);
                  }
                  (e.disabled = this.disabled),
                    (e.lockAxis = this.lockAxis),
                    (e.sortingDisabled = (0, p.Ig)(this.sortingDisabled)),
                    (e.autoScrollDisabled = (0, p.Ig)(this.autoScrollDisabled)),
                    (e.autoScrollStep = (0, p.su)(this.autoScrollStep, 2)),
                    e
                      .connectedTo(
                        i
                          .filter((n) => n && n !== this)
                          .map((n) => n._dropListRef)
                      )
                      .withOrientation(this.orientation);
                });
            }
            _handleEvents(e) {
              e.beforeStarted.subscribe(() => {
                this._syncItemsWithRef(),
                  this._changeDetectorRef.markForCheck();
              }),
                e.entered.subscribe((i) => {
                  this.entered.emit({
                    container: this,
                    item: i.item.data,
                    currentIndex: i.currentIndex,
                  });
                }),
                e.exited.subscribe((i) => {
                  this.exited.emit({ container: this, item: i.item.data }),
                    this._changeDetectorRef.markForCheck();
                }),
                e.sorted.subscribe((i) => {
                  this.sorted.emit({
                    previousIndex: i.previousIndex,
                    currentIndex: i.currentIndex,
                    container: this,
                    item: i.item.data,
                  });
                }),
                e.dropped.subscribe((i) => {
                  this.dropped.emit({
                    previousIndex: i.previousIndex,
                    currentIndex: i.currentIndex,
                    previousContainer: i.previousContainer.data,
                    container: i.container.data,
                    item: i.item.data,
                    isPointerOverContainer: i.isPointerOverContainer,
                    distance: i.distance,
                    dropPoint: i.dropPoint,
                    event: i.event,
                  }),
                    this._changeDetectorRef.markForCheck();
                }),
                (0, D.T)(e.receivingStarted, e.receivingStopped).subscribe(() =>
                  this._changeDetectorRef.markForCheck()
                );
            }
            _assignDefaults(e) {
              const {
                lockAxis: i,
                draggingDisabled: n,
                sortingDisabled: s,
                listAutoScrollDisabled: r,
                listOrientation: c,
              } = e;
              (this.disabled = n ?? !1),
                (this.sortingDisabled = s ?? !1),
                (this.autoScrollDisabled = r ?? !1),
                (this.orientation = c || 'vertical'),
                i && (this.lockAxis = i);
            }
            _syncItemsWithRef() {
              this._dropListRef.withItems(
                this.getSortedItems().map((e) => e._dragRef)
              );
            }
            static #e = (this.ɵfac = function (i) {
              return new (i || o)(
                t.Y36(t.SBq),
                t.Y36(Et),
                t.Y36(t.sBO),
                t.Y36($.mF),
                t.Y36(j.Is, 8),
                t.Y36(qt, 12),
                t.Y36(Re, 8)
              );
            });
            static #i = (this.ɵdir = t.lG2({
              type: o,
              selectors: [['', 'cdkDropList', ''], ['cdk-drop-list']],
              hostAttrs: [1, 'cdk-drop-list'],
              hostVars: 7,
              hostBindings: function (i, n) {
                2 & i &&
                  (t.uIk('id', n.id),
                  t.ekj('cdk-drop-list-disabled', n.disabled)(
                    'cdk-drop-list-dragging',
                    n._dropListRef.isDragging()
                  )('cdk-drop-list-receiving', n._dropListRef.isReceiving()));
              },
              inputs: {
                connectedTo: ['cdkDropListConnectedTo', 'connectedTo'],
                data: ['cdkDropListData', 'data'],
                orientation: ['cdkDropListOrientation', 'orientation'],
                id: 'id',
                lockAxis: ['cdkDropListLockAxis', 'lockAxis'],
                disabled: ['cdkDropListDisabled', 'disabled'],
                sortingDisabled: [
                  'cdkDropListSortingDisabled',
                  'sortingDisabled',
                ],
                enterPredicate: ['cdkDropListEnterPredicate', 'enterPredicate'],
                sortPredicate: ['cdkDropListSortPredicate', 'sortPredicate'],
                autoScrollDisabled: [
                  'cdkDropListAutoScrollDisabled',
                  'autoScrollDisabled',
                ],
                autoScrollStep: ['cdkDropListAutoScrollStep', 'autoScrollStep'],
              },
              outputs: {
                dropped: 'cdkDropListDropped',
                entered: 'cdkDropListEntered',
                exited: 'cdkDropListExited',
                sorted: 'cdkDropListSorted',
              },
              exportAs: ['cdkDropList'],
              standalone: !0,
              features: [
                t._Bn([
                  { provide: qt, useValue: void 0 },
                  { provide: Ee, useExisting: o },
                ]),
              ],
            }));
          }
          return o;
        })(),
        Sn = (() => {
          class o {
            static #t = (this.ɵfac = function (i) {
              return new (i || o)();
            });
            static #e = (this.ɵmod = t.oAB({ type: o }));
            static #i = (this.ɵinj = t.cJS({
              providers: [Et],
              imports: [$.ZD],
            }));
          }
          return o;
        })();
      function An(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon'), t._uU(1, 'check'), t.qZA());
      }
      function Dn(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon'), t._uU(1, 'highlight_off'), t.qZA());
      }
      function Rn(o, a) {
        1 & o && t._UZ(0, 'mat-icon', 11);
      }
      function En(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 8),
            t.YNc(1, An, 2, 0, 'mat-icon', 9),
            t.YNc(2, Dn, 2, 0, 'mat-icon', 9),
            t.YNc(3, Rn, 1, 0, 'mat-icon', 10),
            t.qZA()),
          2 & o)
        ) {
          const e = t.oxw(),
            i = e.$implicit,
            n = e.index,
            s = t.oxw();
          t.xp6(1),
            t.Q6J(
              'ngIf',
              (!s.subsequence.includes(i.correct_position) &&
                i.correct_position === n + 1) ||
                1 === s.correct
            ),
            t.xp6(1),
            t.Q6J(
              'ngIf',
              !s.subsequence.includes(i.correct_position) &&
                i.correct_position !== n + 1
            ),
            t.xp6(1),
            t.Q6J(
              'ngIf',
              s.hasSubsequence &&
                s.subsequence.includes(i.correct_position) &&
                -1 === s.correct
            );
        }
      }
      function Fn(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 5),
            t._UZ(1, 'p', 6),
            t.YNc(2, En, 4, 3, 'div', 7),
            t.qZA()),
          2 & o)
        ) {
          const e = a.$implicit,
            i = t.oxw();
          t.ekj('correctPosition', i.isCorrectPosition(e))(
            'incorrectPosition',
            i.isInCorrectPosition(e)
          )(
            'subsequence',
            i.hasSubsequence &&
              i.subsequence.includes(e.correct_position) &&
              -1 === i.correct
          ),
            t.xp6(1),
            t.Q6J('data', e.text),
            t.xp6(1),
            t.Q6J('ngIf', i.showAnswers);
        }
      }
      function Qn(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 16), t._uU(1, ' check_circle '), t.qZA());
      }
      function qn(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 17), t._uU(1, ' highlight_off '), t.qZA());
      }
      function Bn(o, a) {
        if ((1 & o && t._UZ(0, 'span', 18), 2 & o)) {
          const e = t.oxw(2);
          t.Q6J(
            'data',
            1 === e.correct
              ? e.question.answers[e.index].feedback_correct
              : e.hasSubsequence
              ? e.question.answers[e.index].feedback_subsequences
              : e.question.answers[e.index].feedback_incorrect
          );
        }
      }
      function zn(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 12),
            t.YNc(1, Qn, 2, 0, 'mat-icon', 13),
            t.YNc(2, qn, 2, 0, 'mat-icon', 14),
            t.YNc(3, Bn, 1, 1, 'span', 15),
            t.qZA()),
          2 & o)
        ) {
          const e = t.oxw();
          t.xp6(1),
            t.Q6J('ngIf', 1 === e.correct),
            t.xp6(1),
            t.Q6J('ngIf', -1 === e.correct || 0 === e.correct),
            t.xp6(1),
            t.Q6J('ngIf', e.showAnswers);
        }
      }
      function Zn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 19),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onShowAnswersClick());
            }),
            t._uU(1, ' L\xf6sungen anzeigen\n'),
            t.qZA();
        }
      }
      function Ln(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 20),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onNextQuestionClick());
            }),
            t._uU(1),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(1),
            t.hij(
              ' ',
              1 === e.correct ? 'Richtig,' : ' Falsch,',
              ' n\xe4chste Frage\n'
            );
        }
      }
      let Nn = (() => {
        class o {
          constructor() {
            (this.nextQuestionClicked = new t.vpe()),
              (this.correct = 0),
              (this.answersList = []),
              (this.hasSubsequence = !1),
              (this.subsequence = []);
          }
          ngOnInit() {
            for (let e = 0; e < this.question.answers.length; ++e)
              this.answersList.push({
                text: this.question.answers[e].text,
                correct_position: this.question.answers[e].ranking_position,
              });
          }
          ngOnChanges(e) {
            e.question.previousValue !== e.question.currentValue &&
              ((this.showAnswers = !1), (this.correct = 0));
          }
          drop(e) {
            (this.correct = -1),
              Te(this.answersList, e.previousIndex, e.currentIndex);
          }
          onShowAnswersClick() {
            (this.showAnswers = !0),
              (this.index = this.question.answers.findIndex(
                (s) => 1 == s.ranking_position
              )),
              (this.hasSubsequence =
                this.question.answers[this.index].subsequences);
            let e = 2,
              i = 0,
              n = [];
            this.answersList.forEach((s, r, c) => {
              c[r].correct_position == c[r + 1]?.correct_position - 1 &&
              c[r].correct_position != r + 1
                ? n.push(c[r].correct_position)
                : (c[r].correct_position == r + 1 && i++,
                  n.push(c[r].correct_position),
                  n.length > e && ((this.subsequence = n), (e = n.length)),
                  (n = []));
            }),
              0 != this.correct &&
                (this.correct = i == this.answersList.length ? 1 : -1),
              (this.hasSubsequence = !(e < 3));
          }
          isCorrectPosition(e) {
            return (
              !!this.showAnswers &&
              this.answersList.indexOf(e) + 1 == e.correct_position
            );
          }
          isInCorrectPosition(e) {
            return (
              !!this.showAnswers &&
              this.answersList.indexOf(e) + 1 != e.correct_position
            );
          }
          onNextQuestionClick() {
            this.nextQuestionClicked.emit(this.correct);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-ranking-question']],
            inputs: { question: 'question' },
            outputs: { nextQuestionClicked: 'nextQuestionClicked' },
            features: [t.TTD],
            decls: 5,
            vars: 5,
            consts: [
              [
                'cdkDropList',
                '',
                1,
                'ranking-list',
                3,
                'cdkDropListDisabled',
                'cdkDropListDropped',
              ],
              [
                'class',
                'ranking-box',
                'cdkDrag',
                '',
                3,
                'correctPosition',
                'incorrectPosition',
                'subsequence',
                4,
                'ngFor',
                'ngForOf',
              ],
              ['class', 'feedback-container', 4, 'ngIf'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'showAnswerBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'nextQuestionBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              ['cdkDrag', '', 1, 'ranking-box'],
              ['markdown', '', 1, 'answerText', 3, 'data'],
              ['class', 'feedback-icon', 4, 'ngIf'],
              [1, 'feedback-icon'],
              [4, 'ngIf'],
              ['svgIcon', 'semicorrect', 4, 'ngIf'],
              ['svgIcon', 'semicorrect'],
              [1, 'feedback-container'],
              ['class', 'correctIcon', 4, 'ngIf'],
              ['class', 'incorrectIcon', 4, 'ngIf'],
              ['class', 'feedback', 'markdown', '', 3, 'data', 4, 'ngIf'],
              [1, 'correctIcon'],
              [1, 'incorrectIcon'],
              ['markdown', '', 1, 'feedback', 3, 'data'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'showAnswerBtn',
                3,
                'click',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'nextQuestionBtn',
                3,
                'click',
              ],
            ],
            template: function (i, n) {
              1 & i &&
                (t.TgZ(0, 'div', 0),
                t.NdJ('cdkDropListDropped', function (r) {
                  return n.drop(r);
                }),
                t.YNc(1, Fn, 3, 8, 'div', 1),
                t.qZA(),
                t.YNc(2, zn, 4, 3, 'div', 2),
                t.YNc(3, Zn, 2, 0, 'button', 3),
                t.YNc(4, Ln, 2, 1, 'button', 4)),
                2 & i &&
                  (t.Q6J('cdkDropListDisabled', n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngForOf', n.answersList),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', !n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers));
            },
            dependencies: [m.sg, m.O5, Z.l, T.lW, F.Hw, Qe, Fe],
            styles: [
              '.ranking-list[_ngcontent-%COMP%]{width:100%;max-width:100%;border:solid 1px #ccc;min-height:60px;display:block;background:white;border-radius:4px;overflow:hidden;margin-bottom:15px}.ranking-box[_ngcontent-%COMP%]{padding:20px 10px;border-bottom:solid 1px #ccc;color:#000000de;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;cursor:move;background:white;font-size:14px;max-height:61px}.ranking-box[_ngcontent-%COMP%]     p{margin-bottom:0!important}.feedback-container[_ngcontent-%COMP%]{grid-column-start:1;grid-column-end:4;grid-row-start:3;display:flex;justify-self:stretch;margin:0 4px}.feedback-container[_ngcontent-%COMP%]   .correctIcon[_ngcontent-%COMP%], .feedback-container[_ngcontent-%COMP%]   .incorrectIcon[_ngcontent-%COMP%]{margin:4px;font-weight:400}.feedback-container[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%]{margin:6px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.ranking-box[_ngcontent-%COMP%]:last-child{border:none}.ranking-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .ranking-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}span.feedback[_ngcontent-%COMP%]{font-weight:400}.showAnswerBtn[_ngcontent-%COMP%], .nextQuestionBtn[_ngcontent-%COMP%]{margin-top:15px}.feedback-icon[_ngcontent-%COMP%]{display:contents}',
            ],
          }));
        }
        return o;
      })();
      function Gn(o, a) {
        if (
          (1 & o && (t.TgZ(0, 'div', 14)(1, 'p'), t._uU(2), t.qZA()()), 2 & o)
        ) {
          const e = t.oxw();
          t.ekj('correct', 1 === e.correct)(
            'incorrect',
            -1 === e.correct || 0 === e.correct
          ),
            t.xp6(2),
            t.Oqu(e.question.answers[0].range_value);
        }
      }
      function Hn(o, a) {
        1 & o && t._UZ(0, 'div', 15);
      }
      function Yn(o, a) {
        if (
          (1 & o && (t.TgZ(0, 'div', 16)(1, 'p'), t._uU(2), t.qZA()()), 2 & o)
        ) {
          const e = t.oxw();
          t.ekj('correct', e.showAnswers && 1 === e.correct)(
            'incorrect',
            (e.showAnswers && -1 === e.correct) || 0 === e.correct
          ),
            t.xp6(2),
            t.Oqu(e.sliderPosition);
        }
      }
      function Jn(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 21), t._uU(1, ' check_circle '), t.qZA());
      }
      function Un(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 22), t._uU(1, ' highlight_off '), t.qZA());
      }
      function Vn(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 17),
            t.YNc(1, Jn, 2, 0, 'mat-icon', 18),
            t.YNc(2, Un, 2, 0, 'mat-icon', 19),
            t._UZ(3, 'span', 20),
            t.qZA()),
          2 & o)
        ) {
          const e = t.oxw();
          t.xp6(1),
            t.Q6J('ngIf', 1 === e.correct),
            t.xp6(1),
            t.Q6J('ngIf', -1 === e.correct || 0 === e.correct),
            t.xp6(1),
            t.Q6J(
              'data',
              1 === e.correct
                ? e.question.answers[0].feedback_correct
                : e.question.answers[0].feedback_incorrect
            );
        }
      }
      function jn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 23),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onShowAnswersClick());
            }),
            t._uU(1, ' L\xf6sungen anzeigen '),
            t.qZA();
        }
      }
      function Kn(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 24),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onNextQuestionClick());
            }),
            t._uU(1),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(1),
            t.hij(
              ' ',
              1 === e.correct ? 'Richtig,' : ' Falsch,',
              ' n\xe4chste Frage '
            );
        }
      }
      let Wn = (() => {
        class o {
          constructor() {
            (this.nextQuestionClicked = new t.vpe()),
              (this.correct = -2),
              (this.sliderPosition = this.question?.answers[0].range_min);
          }
          onShowAnswersClick() {
            this.showAnswers = !0;
            const e = this.question.answers[0].tolerance,
              i = this.question.answers[0].range_value,
              n = this.question.answers[0].range_max,
              s = this.question.answers[0].range_min;
            -2 != this.correct
              ? Math.abs(this.sliderPosition - i) <= e && (this.correct = 1)
              : (this.correct = 0),
              setTimeout(() => {
                const r = document.getElementById('correctThumb'),
                  c = document.getElementById('selectedThumb'),
                  l = document.getElementById('toleranceBar'),
                  d = document.getElementById('slider');
                if (d && r && l && c) {
                  const u = (d.offsetWidth - 14) / (n - s),
                    b = (i - s) * u,
                    C = 2 * e * u,
                    w = (this.sliderPosition - s) * u;
                  (r.style.left = b - 10 + 'px'),
                    1 === this.correct && this.sliderPosition - i != 0
                      ? ((l.style.width = C + 'px'),
                        (l.style.left = b - C / 2 + 'px'))
                      : (l.style.visibility = 'hidden'),
                    0 === this.correct || this.sliderPosition - i == 0
                      ? (c.style.visibility = 'hidden')
                      : (c.style.left = w - 10 + 'px');
                }
              }, 5);
          }
          onSliderChange(e) {
            this.correct = -1;
          }
          onNextQuestionClick() {
            this.nextQuestionClicked.emit(this.correct);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-range-question']],
            inputs: { question: 'question' },
            outputs: { nextQuestionClicked: 'nextQuestionClicked' },
            decls: 18,
            vars: 21,
            consts: [
              [1, 'visualFeedbackContainer'],
              ['id', 'correctThumb', 3, 'correct', 'incorrect', 4, 'ngIf'],
              ['id', 'toleranceBar', 4, 'ngIf'],
              [1, 'range-container'],
              [1, 'minTick'],
              [1, 'minLabel'],
              [
                'id',
                'slider',
                'thumbLabel',
                '',
                3,
                'disabled',
                'min',
                'max',
                'step',
                'ngModel',
                'ngModelChange',
              ],
              ['matSliderThumb', '', 3, 'valueChange'],
              [1, 'maxLabel'],
              [1, 'maxTick'],
              ['id', 'selectedThumb', 3, 'correct', 'incorrect', 4, 'ngIf'],
              ['class', 'feedback-container', 4, 'ngIf'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'showAnswerBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                'class',
                'nextQuestionBtn',
                3,
                'click',
                4,
                'ngIf',
              ],
              ['id', 'correctThumb'],
              ['id', 'toleranceBar'],
              ['id', 'selectedThumb'],
              [1, 'feedback-container'],
              ['class', 'correctIcon', 4, 'ngIf'],
              ['class', 'incorrectIcon', 4, 'ngIf'],
              ['markdown', '', 1, 'feedback', 3, 'data'],
              [1, 'correctIcon'],
              [1, 'incorrectIcon'],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'showAnswerBtn',
                3,
                'click',
              ],
              [
                'color',
                'primary',
                'mat-raised-button',
                '',
                1,
                'nextQuestionBtn',
                3,
                'click',
              ],
            ],
            template: function (i, n) {
              1 & i &&
                (t.TgZ(0, 'div', 0),
                t.YNc(1, Gn, 3, 5, 'div', 1),
                t.YNc(2, Hn, 1, 0, 'div', 2),
                t.qZA(),
                t.TgZ(3, 'div', 3),
                t._UZ(4, 'span', 4),
                t.TgZ(5, 'p', 5),
                t._uU(6),
                t.qZA(),
                t.TgZ(7, 'mat-slider', 6),
                t.NdJ('ngModelChange', function (r) {
                  return (n.sliderPosition = r);
                }),
                t.TgZ(8, 'input', 7),
                t.NdJ('valueChange', function (r) {
                  return n.onSliderChange(r);
                }),
                t.qZA()(),
                t.TgZ(9, 'p', 8),
                t._uU(10),
                t.qZA(),
                t._UZ(11, 'span', 9),
                t.qZA(),
                t.TgZ(12, 'div', 0),
                t.YNc(13, Yn, 3, 5, 'div', 10),
                t.qZA(),
                t.YNc(14, Vn, 4, 3, 'div', 11),
                t.TgZ(15, 'div'),
                t.YNc(16, jn, 2, 0, 'button', 12),
                t.YNc(17, Kn, 2, 1, 'button', 13),
                t.qZA()),
                2 & i &&
                  (t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(2),
                  t.ekj('correct', n.showAnswers && 1 === n.correct)(
                    'incorrect',
                    (n.showAnswers && -1 === n.correct) || 0 === n.correct
                  ),
                  t.xp6(2),
                  t.Oqu(n.question.answers[0].range_min),
                  t.xp6(1),
                  t.ekj('correctRange', n.showAnswers && 1 === n.correct)(
                    'incorrectRange',
                    (n.showAnswers && -1 === n.correct) || 0 === n.correct
                  ),
                  t.Q6J('disabled', n.showAnswers)(
                    'min',
                    n.question.answers[0].range_min
                  )('max', n.question.answers[0].range_max)(
                    'step',
                    n.question.answers[0].range_step
                  )('ngModel', n.sliderPosition),
                  t.xp6(3),
                  t.Oqu(n.question.answers[0].range_max),
                  t.xp6(3),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers),
                  t.xp6(2),
                  t.Q6J('ngIf', !n.showAnswers),
                  t.xp6(1),
                  t.Q6J('ngIf', n.showAnswers));
            },
            dependencies: [m.O5, M.JJ, M.On, Z.l, T.lW, F.Hw, rt.pH, rt.$5],
            styles: [
              '.range-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 9fr 1fr;grid-template-rows:auto;place-items:center;margin:0 4px}.minTick[_ngcontent-%COMP%]{content:"";grid-row-start:2;justify-self:start;transform:translate(2px) translateY(-37px);grid-column-start:1;height:18px;width:7px}.minLabel[_ngcontent-%COMP%]{grid-column-start:1;justify-self:start;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(2px)}.maxLabel[_ngcontent-%COMP%]{grid-column-start:3;justify-self:end;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(-4px)}.maxTick[_ngcontent-%COMP%]{content:"";border-right:0px;grid-row-start:2;transform:translate(-7px) translateY(-37px);justify-self:end;grid-column-start:3;height:18px;width:7px;background-color:#d3d3d3}.feedback-container[_ngcontent-%COMP%]{display:flex;margin:0 4px}.feedback-container[_ngcontent-%COMP%]   .correctIcon[_ngcontent-%COMP%], .feedback-container[_ngcontent-%COMP%]   .incorrectIcon[_ngcontent-%COMP%]{margin:4px;font-weight:400;overflow:visible}.feedback-container[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%]{margin:6px}  .range-container .mat-slider{min-width:100%;grid-column-start:1;grid-column-end:4;grid-row-start:1}  .range-container .mat-slider-wrapper{top:24px}  .range-container .mat-slider-horizontal .mat-slider-track-wrapper{height:6px}  .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-background{height:100%;background-color:#d3d3d3}  .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-fill{height:100%}  .range-container .mat-slider.mat-accent .mat-slider-thumb{background-color:#fff;height:26px;width:26px;bottom:-15px;border:solid 3px lightgray;transform:scale(.75)}  .range-container .mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(.75)}  .range-container .mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb{border-color:#d3d3d3!important}  .range-container .mat-slider-horizontal .mat-slider-thumb-label{top:-45px}.visualFeedbackContainer[_ngcontent-%COMP%]{height:4px;margin:10px 4px 0}.visualFeedbackContainer[_ngcontent-%COMP%]   #correctThumb[_ngcontent-%COMP%]{position:relative;width:28px;height:28px;top:-15px;border-radius:50% 50% 0;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:100}.visualFeedbackContainer[_ngcontent-%COMP%]   #correctThumb[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#fff}.visualFeedbackContainer[_ngcontent-%COMP%]   #toleranceBar[_ngcontent-%COMP%]{position:relative;width:5px;height:15px;top:-37px}.visualFeedbackContainer[_ngcontent-%COMP%]   #selectedThumb[_ngcontent-%COMP%]{position:relative;width:28px;height:28px;top:-45px;border-radius:0 50% 50%;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:200}.visualFeedbackContainer[_ngcontent-%COMP%]   #selectedThumb[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#000}.visualFeedbackContainer[_ngcontent-%COMP%]   #valueLabel[_ngcontent-%COMP%]{position:relative;font-size:12px;font-weight:500;top:-32px}.showAnswerBtn[_ngcontent-%COMP%], .nextQuestionBtn[_ngcontent-%COMP%]{margin-top:10px}',
            ],
          }));
        }
        return o;
      })();
      const to = ['backPopup'],
        eo = ['skipPopup'];
      function io(o, a) {
        if ((1 & o && (t.TgZ(0, 'p', 21), t._uU(1), t.qZA()), 2 & o)) {
          const e = t.oxw(2);
          t.xp6(1),
            t.AsE(
              ' Tags: ',
              e.question.tags.join(' '),
              ' | Schwierigkeit: ',
              e.question.difficulty,
              ' '
            );
        }
      }
      function no(o, a) {
        if ((1 & o && t._uU(0), 2 & o)) {
          const e = t.oxw(2);
          t.hij('Schwierigkeit: ', e.question.difficulty, '');
        }
      }
      function oo(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 26),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(3);
              return t.KtG(
                n.swipe(
                  n.ImageIndex,
                  n.question.images.length,
                  n.SWIPE_ACTION.RIGHT
                )
              );
            }),
            t.TgZ(1, 'mat-icon', 27),
            t._uU(2, 'navigate_before'),
            t.qZA()();
        }
      }
      function ao(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'button', 28),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(3);
              return t.KtG(
                n.swipe(
                  n.ImageIndex,
                  n.question.images.length,
                  n.SWIPE_ACTION.LEFT
                )
              );
            }),
            t.TgZ(1, 'mat-icon', 29),
            t._uU(2, 'navigate_next'),
            t.qZA()();
        }
      }
      function so(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div', 22),
            t.YNc(1, oo, 3, 0, 'button', 23),
            t.TgZ(2, 'solid-core-media', 24),
            t.NdJ('swiperight', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(
                s.swipe(s.ImageIndex, s.question.images.length, n.type)
              );
            })('swipeleft', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(
                s.swipe(s.ImageIndex, s.question.images.length, n.type)
              );
            }),
            t.qZA(),
            t.YNc(3, ao, 3, 0, 'button', 25),
            t.qZA();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1),
            t.Q6J('ngIf', e.question.images.length > 1),
            t.xp6(1),
            t.Q6J('mediaObject', e.question.images[e.ImageIndex])(
              'hasDialog',
              !0
            )('hasAudio', !1)('hasAttributions', !0),
            t.xp6(1),
            t.Q6J('ngIf', e.question.images.length > 1);
        }
      }
      function ro(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-content', 30)(
            1,
            'solid-quiz-single-choice-question',
            31
          ),
            t.NdJ('nextQuestionClicked', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onNextQuestionClicked(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1), t.Q6J('question', e.question);
        }
      }
      function co(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-content', 32)(
            1,
            'solid-quiz-multiple-choice-question',
            31
          ),
            t.NdJ('nextQuestionClicked', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onNextQuestionClicked(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1), t.Q6J('question', e.question);
        }
      }
      function lo(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-content', 33)(
            1,
            'solid-quiz-true-false-question',
            31
          ),
            t.NdJ('nextQuestionClicked', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onNextQuestionClicked(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1), t.Q6J('question', e.question);
        }
      }
      function ho(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-content', 34)(
            1,
            'solid-quiz-ranking-question',
            31
          ),
            t.NdJ('nextQuestionClicked', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onNextQuestionClicked(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1), t.Q6J('question', e.question);
        }
      }
      function po(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card-content', 35)(1, 'solid-quiz-range-question', 31),
            t.NdJ('nextQuestionClicked', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.onNextQuestionClicked(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw(2);
          t.xp6(1), t.Q6J('question', e.question);
        }
      }
      function uo(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div', 36)(1, 'p', 37),
            t._uU(2, 'Quiz abbrechen'),
            t.qZA(),
            t.TgZ(3, 'button', 38)(4, 'mat-icon'),
            t._uU(5, 'close'),
            t.qZA()()(),
            t.TgZ(6, 'mat-dialog-content')(7, 'p'),
            t._uU(8, 'M\xf6chtest Du dieses Quiz abbrechen ?'),
            t.qZA()(),
            t.TgZ(9, 'mat-dialog-actions')(10, 'button', 39),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(2);
              return t.KtG(n.onBackToStart());
            }),
            t._uU(11, ' Ja '),
            t.qZA(),
            t.TgZ(12, 'button', 40),
            t._uU(13, ' Nein '),
            t.qZA()();
        }
        2 & o && (t.xp6(10), t.Q6J('mat-dialog-close', !0));
      }
      function mo(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div', 36)(1, 'p', 37),
            t._uU(2, 'Quiz beenden'),
            t.qZA(),
            t.TgZ(3, 'button', 38)(4, 'mat-icon'),
            t._uU(5, 'close'),
            t.qZA()()(),
            t.TgZ(6, 'mat-dialog-content')(7, 'p'),
            t._uU(
              8,
              'M\xf6chtest Du dieses Quiz beenden und zur Auswertung springen?'
            ),
            t.qZA()(),
            t.TgZ(9, 'mat-dialog-actions')(10, 'button', 39),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw(2);
              return t.KtG(n.onSkipToEnd());
            }),
            t._uU(11, ' Ja '),
            t.qZA(),
            t.TgZ(12, 'button', 40),
            t._uU(13, ' Nein '),
            t.qZA()();
        }
        2 & o && (t.xp6(10), t.Q6J('mat-dialog-close', !0));
      }
      function go(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.ynx(0),
            t.TgZ(1, 'div', 1, 2)(3, 'div', 3)(4, 'button', 4),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onBackBtnClick());
            }),
            t.TgZ(5, 'mat-icon'),
            t._uU(6, 'arrow_back'),
            t.qZA()(),
            t.TgZ(7, 'button', 5),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onChartBtnClick());
            }),
            t.TgZ(8, 'mat-icon'),
            t._uU(9, 'bar_chart'),
            t.qZA()(),
            t.TgZ(10, 'div', 6)(11, 'div', 7)(12, 'h2'),
            t._uU(13),
            t.qZA(),
            t.YNc(14, io, 2, 2, 'p', 8),
            t.YNc(15, no, 1, 1, 'ng-template', null, 9, t.W1O),
            t.qZA()()(),
            t._UZ(17, 'mat-progress-bar', 10),
            t.qZA(),
            t.TgZ(18, 'mat-card')(19, 'mat-card-header')(20, 'mat-card-title'),
            t._UZ(21, 'p', 11),
            t.qZA()(),
            t.TgZ(22, 'mat-card-content'),
            t.YNc(23, so, 4, 6, 'div', 12),
            t.ynx(24, 13),
            t.YNc(25, ro, 2, 1, 'mat-card-content', 14),
            t.YNc(26, co, 2, 1, 'mat-card-content', 15),
            t.YNc(27, lo, 2, 1, 'mat-card-content', 16),
            t.YNc(28, ho, 2, 1, 'mat-card-content', 17),
            t.YNc(29, po, 2, 1, 'mat-card-content', 18),
            t.BQk(),
            t.qZA()(),
            t.YNc(30, uo, 14, 1, 'ng-template', null, 19, t.W1O),
            t.YNc(32, mo, 14, 1, 'ng-template', null, 20, t.W1O),
            t.BQk();
        }
        if (2 & o) {
          const e = a.ngIf,
            i = t.MAs(16),
            n = t.oxw();
          t.xp6(13),
            t.AsE(
              ' Fragen ',
              e.currentQuestion + 1,
              ' von ',
              e.questions.length,
              ' '
            ),
            t.xp6(1),
            t.Q6J('ngIf', 0 !== n.question.tags.length)('ngIfElse', i),
            t.xp6(3),
            t.Q6J('value', e.progress + 100 / e.questions.length),
            t.xp6(4),
            t.Q6J('data', n.question.text),
            t.xp6(2),
            t.Q6J('ngIf', n.question.images.length > 0),
            t.xp6(1),
            t.Q6J('ngSwitch', n.question.type),
            t.xp6(1),
            t.Q6J('ngSwitchCase', n.QuestionTypes.SingleChoice),
            t.xp6(1),
            t.Q6J('ngSwitchCase', n.QuestionTypes.MultipleChoice),
            t.xp6(1),
            t.Q6J('ngSwitchCase', n.QuestionTypes.TrueFalse),
            t.xp6(1),
            t.Q6J('ngSwitchCase', n.QuestionTypes.Ranking),
            t.xp6(1),
            t.Q6J('ngSwitchCase', n.QuestionTypes.Range);
        }
      }
      class it {
        constructor(a, e) {
          (this._store = a),
            (this.dialog = e),
            (this.stopQuiz = new t.vpe()),
            (this.QuestionTypes = Yt),
            (this.ImageIndex = 0),
            (this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' });
        }
        onNextQuestionClicked(a) {
          this.question && this._store.dispatch(new vt(a)),
            (this.ImageIndex = 0);
        }
        swipe(a, e, i = this.SWIPE_ACTION.RIGHT) {
          a > e ||
            a < 0 ||
            (i === this.SWIPE_ACTION.LEFT &&
              (this.ImageIndex = a === e - 1 ? 0 : a + 1),
            i === this.SWIPE_ACTION.RIGHT &&
              (this.ImageIndex = 0 === a ? e - 1 : a - 1));
        }
        onChartBtnClick() {
          this.dialog.open(this.skipPopup, {
            panelClass: 'custom-dialog-container',
          });
        }
        onSkipToEnd() {
          this.stopQuiz.emit(!0);
        }
        onBackBtnClick() {
          this.dialog.open(this.backPopup, {
            panelClass: 'custom-dialog-container',
          });
        }
        onBackToStart() {
          this._store.dispatch(new U());
        }
        static #t = (this.ɵfac = function (e) {
          return new (e || it)(t.Y36(x.yh), t.Y36(W.uw));
        });
        static #e = (this.ɵcmp = t.Xpm({
          type: it,
          selectors: [['solid-quiz-question']],
          viewQuery: function (e, i) {
            if ((1 & e && (t.Gf(to, 5, t.Rgc), t.Gf(eo, 5, t.Rgc)), 2 & e)) {
              let n;
              t.iGM((n = t.CRH())) && (i.backPopup = n.first),
                t.iGM((n = t.CRH())) && (i.skipPopup = n.first);
            }
          },
          inputs: { question: 'question' },
          outputs: { stopQuiz: 'stopQuiz' },
          decls: 2,
          vars: 3,
          consts: [
            [4, 'ngIf'],
            [1, 'toolbar-container'],
            ['toolbar', ''],
            [1, 'toolbar'],
            ['mat-icon-button', '', 1, 'button-back', 3, 'click'],
            ['mat-icon-button', '', 1, 'button-close', 3, 'click'],
            [1, 'step-actions'],
            [1, 'title'],
            ['class', 'question-info', 4, 'ngIf', 'ngIfElse'],
            ['withoutTags', ''],
            ['mode', 'determinate', 3, 'value'],
            ['markdown', '', 3, 'data'],
            ['class', 'image-container', 4, 'ngIf'],
            [3, 'ngSwitch'],
            ['class', 'single-choice', 4, 'ngSwitchCase'],
            ['class', 'multiple-choice', 4, 'ngSwitchCase'],
            ['class', 'true-false', 4, 'ngSwitchCase'],
            ['class', 'ranking', 4, 'ngSwitchCase'],
            ['class', 'range', 4, 'ngSwitchCase'],
            ['backPopup', ''],
            ['skipPopup', ''],
            [1, 'question-info'],
            [1, 'image-container'],
            [
              'mat-mini-fab',
              '',
              'class',
              'button-before',
              'color',
              'accent',
              3,
              'click',
              4,
              'ngIf',
            ],
            [
              3,
              'mediaObject',
              'hasDialog',
              'hasAudio',
              'hasAttributions',
              'swiperight',
              'swipeleft',
            ],
            [
              'class',
              'button-next',
              'color',
              'accent',
              'mat-mini-fab',
              '',
              3,
              'click',
              4,
              'ngIf',
            ],
            [
              'mat-mini-fab',
              '',
              'color',
              'accent',
              1,
              'button-before',
              3,
              'click',
            ],
            ['aria-label', 'Vorheriger Schritt'],
            [
              'color',
              'accent',
              'mat-mini-fab',
              '',
              1,
              'button-next',
              3,
              'click',
            ],
            ['aria-label', 'N\xe4chster Schritt'],
            [1, 'single-choice'],
            [3, 'question', 'nextQuestionClicked'],
            [1, 'multiple-choice'],
            [1, 'true-false'],
            [1, 'ranking'],
            [1, 'range'],
            [1, 'closeDialog'],
            [1, 'closeDialogTitle'],
            ['mat-icon-button', '', 'mat-dialog-close', '', 1, 'popUpCloseBtn'],
            ['mat-button', '', 1, 'backBtn', 3, 'mat-dialog-close', 'click'],
            [
              'mat-button',
              '',
              'mat-dialog-close',
              '',
              'cdkFocusInitial',
              '',
              1,
              'cancelBtn',
            ],
          ],
          template: function (e, i) {
            1 & e &&
              (t.YNc(0, go, 34, 13, 'ng-container', 0), t.ALo(1, 'async')),
              2 & e && t.Q6J('ngIf', t.lcZ(1, 1, i.question && i.QuizSession));
          },
          dependencies: [
            m.O5,
            m.RF,
            m.n9,
            Z.l,
            Fi.R,
            T.lW,
            T.RK,
            T.nh,
            P.a8,
            P.dn,
            P.dk,
            P.n5,
            re.pW,
            F.Hw,
            W.ZT,
            W.xY,
            W.H8,
            $i,
            on,
            dn,
            Nn,
            Wn,
            m.Ov,
          ],
          styles: [
            'mat-card[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;max-width:60em;top:71px}mat-card[_ngcontent-%COMP%]   .mat-card-header[_ngcontent-%COMP%]   .mat-card-title[_ngcontent-%COMP%]{font-size:16px;font-weight:500;margin:5px 0 20px -14px}@media (max-width: 1141px){mat-card[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}}solid-core-media[_ngcontent-%COMP%]{width:100%}solid-core-media[_ngcontent-%COMP%]     solid-core-image-detail solid-core-image-toolbar div.dziToolbar{margin-right:.3em}.image-container[_ngcontent-%COMP%]{height:40vh;display:flex;overflow-x:auto;overflow-y:hidden;margin-left:.5rem;margin-right:.5rem;margin-bottom:1.5rem;position:relative}.image-container[_ngcontent-%COMP%]   .button-before[_ngcontent-%COMP%]{position:absolute;left:1em;top:50%;z-index:999}.image-container[_ngcontent-%COMP%]   .button-next[_ngcontent-%COMP%]{position:absolute;right:1rem;top:50%;z-index:999}mat-card-content.single-choice[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-left:.5rem}mat-card-content.multiple-choice[_ngcontent-%COMP%]{display:flex;flex-direction:column}mat-card-content.true-false[_ngcontent-%COMP%]{display:flex;flex-direction:column}mat-card-content.ranking[_ngcontent-%COMP%]{display:flex;flex-direction:column}@media (max-width: 999px){.toolbar-container[_ngcontent-%COMP%]{width:100%}}@media (min-width: 1000px){.toolbar-container[_ngcontent-%COMP%]{width:calc(100% - 300px)}}.toolbar-container[_ngcontent-%COMP%]{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar[_ngcontent-%COMP%]{width:100%;position:relative;min-height:52px}.toolbar[_ngcontent-%COMP%]   .button-back[_ngcontent-%COMP%]{position:absolute;left:16px;top:50%;transform:translateY(-45%)}.toolbar[_ngcontent-%COMP%]   .button-close[_ngcontent-%COMP%]{position:absolute;right:16px;top:50%;transform:translateY(-45%)}.toolbar[_ngcontent-%COMP%]   .step-actions[_ngcontent-%COMP%]{max-width:530px;display:grid;grid-template-areas:"previous header next";grid-template-columns:40px auto 40px;margin-left:auto;margin-right:auto;align-items:center}@media (min-width: 451px) and (max-width: 530px){.toolbar[_ngcontent-%COMP%]   .step-actions[_ngcontent-%COMP%]{max-width:350px}}@media (min-width: 531px) and (max-width: 645px){.toolbar[_ngcontent-%COMP%]   .step-actions[_ngcontent-%COMP%]{max-width:400px}}@media (min-width: 646px) and (max-width: 700px){.toolbar[_ngcontent-%COMP%]   .step-actions[_ngcontent-%COMP%]{max-width:500px}}.toolbar[_ngcontent-%COMP%]   .button-left[_ngcontent-%COMP%]{grid-area:previous}.toolbar[_ngcontent-%COMP%]   .button-right[_ngcontent-%COMP%]{grid-area:next}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:-2px;font-size:19px}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p.question-info[_ngcontent-%COMP%]{margin-bottom:0}@media (max-width: 450px){mat-card[_ngcontent-%COMP%]{top:66px}}mat-progress-bar[_ngcontent-%COMP%]     .mat-progress-bar-buffer{background-color:#fff}.title[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center;grid-area:header}.title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:-2px}.title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-bottom:0}  .custom-dialog-container .mat-dialog-container{width:330px;min-height:165px;padding:5px;overflow:unset}  .custom-dialog-container .closeDialog{display:flex;justify-content:space-between}  .custom-dialog-container .closeDialogTitle{font-size:14;font-weight:500;margin-left:15px}  .custom-dialog-container .popUpCloseBtn{float:right;margin-top:2px}  .custom-dialog-container .mat-dialog-content{padding:0 1em;margin:5px}  .custom-dialog-container .mat-dialog-content p{margin-top:15px;font-size:15px}  .custom-dialog-container .mat-dialog-actions{justify-content:space-between;padding:0 8px;min-height:42px;margin-bottom:2px}',
          ],
        }));
      }
      !(function (o, a, e, i) {
        var r,
          n = arguments.length,
          s =
            n < 3
              ? a
              : null === i
              ? (i = Object.getOwnPropertyDescriptor(a, e))
              : i;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          s = Reflect.decorate(o, a, e, i);
        else
          for (var c = o.length - 1; c >= 0; c--)
            (r = o[c]) &&
              (s = (n < 3 ? r(s) : n > 3 ? r(a, e, s) : r(a, e)) || s);
        n > 3 && s && Object.defineProperty(a, e, s);
      })(
        [
          (0, x.Ph)(y.getSession),
          (function (o, a) {
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.metadata
            )
              return Reflect.metadata('design:type', a);
          })(0, ot.y),
        ],
        it.prototype,
        'QuizSession',
        void 0
      );
      const L_e0 = [
          'Das war zum Aufw\xe4rmen - die n\xe4chste Runde wird bestimmt besser!',
          'Kein Grund zur Frustration - einfach durchatmen und die n\xe4chste Runde starten.',
          'Noch ein Kaffee und eine neue Chance?',
        ],
        L_lt25 = [
          '{{correctPercentage}}% richtig - da ist noch etwas Luft nach oben...',
          'Einfach noch eine Runde starten - da geht bestimmt noch was!',
          'Beim n\xe4chsten Mal sind bestimmt mehr Antworten richtig!',
        ],
        L_lt50 = [
          '{{correctPercentage}}% - noch nicht die H\xe4lfte, aber da war schon Sch\xf6nes dabei.',
          'Vielleicht braucht es noch ein bisschen \xdcbung?',
          'In der n\xe4chsten Runde werden es bestimmt noch mehr richtige Antworten!',
        ],
        L_lt75 = [
          '{{correctPercentage}}% ist ein ganz gutes Ergebnis! Geht da noch mehr?',
          'Das klappt ja ganz gut, aber ein bisschen mehr wird es beim n\xe4chsten Mal bestimmt!',
          'Die H\xe4lfte war mindestens richtig! Eine Runde geht bestimmt noch.',
        ],
        L_ge75 = [
          '{{correctPercentage}}%! Das ist ein prima Ergebnis.',
          'Beim n\xe4chsten Mal werden bestimmt die 100% geknackt!',
          'Nicht schlecht - ein paar % fehlen noch zum Gipfel!',
        ],
        L_e100 = [
          'Alle Fragen richtig!? Beeindruckend...',
          'Na, da kann man wohl nicht mehr viel beibringen.',
          'Na? Klappt es mit den 100% auch bei der n\xe4chsten Runde?',
        ],
        L_nan = [
          'Rock bottom, I hope for your sake you nuked that level!',
          'Wenn gar keine Frage beantwortet wurde, gibt es auch keine Gummipunkte!',
          'Ein verweigerter Selbsttest? Come on!',
        ];
      var Bt = h(3270);
      function _o(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 21), t._uU(1, ' check_circle '), t.qZA());
      }
      function fo(o, a) {
        1 & o && (t.TgZ(0, 'mat-icon', 22), t._uU(1, ' cancel '), t.qZA());
      }
      function bo(o, a) {
        1 & o &&
          (t.TgZ(0, 'mat-icon', 23), t._uU(1, ' remove_circle '), t.qZA());
      }
      function vo(o, a) {
        if (
          (1 & o &&
            (t.TgZ(0, 'div', 14),
            t.YNc(1, _o, 2, 0, 'mat-icon', 15),
            t.YNc(2, fo, 2, 0, 'mat-icon', 16),
            t.YNc(3, bo, 2, 0, 'mat-icon', 17),
            t.TgZ(4, 'div', 18)(5, 'span', 19),
            t._uU(6),
            t.qZA(),
            t._UZ(7, 'span', 20),
            t.qZA()()),
          2 & o)
        ) {
          const e = a.$implicit,
            i = a.index;
          t.xp6(1),
            t.Q6J('ngIf', 1 === e.answered),
            t.xp6(1),
            t.Q6J('ngIf', -1 === e.answered),
            t.xp6(1),
            t.Q6J('ngIf', 0 === e.answered),
            t.xp6(3),
            t.hij('Frage ', i + 1, ': '),
            t.xp6(1),
            t.Q6J('data', e.text)('inline', !0);
        }
      }
      function wo(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'mat-card')(1, 'mat-card-content', 5)(2, 'p', 6),
            t._uU(3),
            t.qZA(),
            t._UZ(4, 'p', 7),
            t.qZA(),
            t.TgZ(5, 'mat-card-actions')(6, 'div', 8)(7, 'button', 9),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onStartClick());
            }),
            t._uU(8, ' Neues Quiz starten '),
            t.qZA(),
            t.TgZ(9, 'button', 10),
            t.NdJ('click', function () {
              t.CHM(e);
              const n = t.oxw();
              return t.KtG(n.onRestartClick());
            }),
            t._uU(10, ' Quiz wiederholen '),
            t.qZA()()(),
            t.TgZ(
              11,
              'mat-expansion-panel',
              11
            )(12, 'mat-expansion-panel-header'),
            t._uU(13, 'Details'),
            t.qZA(),
            t.YNc(14, vo, 8, 6, 'div', 12),
            t.qZA(),
            t.TgZ(15, 'mat-card-footer')(16, 'p', 13),
            t._uU(
              17,
              ' Als richtig wurde eine Frage nur dann gez\xe4hlt, wenn alle richtigen Antworten und keine falschen ausgew\xe4hlt wurden. '
            ),
            t.qZA()()();
        }
        if (2 & o) {
          const e = t.oxw();
          t.xp6(3),
            t.AsE(
              ' ',
              e.correctQuestions,
              ' von ',
              e.answeredQuestions,
              ' Fragen wurden richtig beantwortet. '
            ),
            t.xp6(1),
            t.Q6J('data', e.FeedbackText),
            t.xp6(10),
            t.Q6J('ngForOf', e.QuizSession.questions);
        }
      }
      let xo = (() => {
        class o {
          constructor(e) {
            (this._store = e),
              (this.$destroyed = new _.x()),
              (this.questionCount = new M.p4(10, [M.kI.min(1)])),
              (this.QuizSession = null),
              (this.FeedbackText = ''),
              (this.correctQuestions = 0),
              (this.correctPercentage = 0),
              (this.answeredQuestions = 0),
              (this.stopQuiz = new t.vpe()),
              this._store
                .select((i) => i.quiz.session)
                .pipe((0, k.R)(this.$destroyed))
                .subscribe((i) => {
                  if (i) {
                    (this.QuizSession = i),
                      this.questionCount.setValue(i.questions.length),
                      (this.correctQuestions = i.questions
                        .map((s) => s.answered)
                        .reduce((s, r) => (1 === r ? s + 1 : s), 0)),
                      (this.answeredQuestions = i.questions
                        .map((s) => s.answered)
                        .reduce((s, r) => (0 !== r ? s + 1 : s), 0)),
                      (this.correctPercentage =
                        this.correctQuestions / this.answeredQuestions);
                    let n = [];
                    (n =
                      0 === this.correctPercentage
                        ? L_e0
                        : this.correctPercentage < 0.25
                        ? L_lt25
                        : this.correctPercentage < 0.5
                        ? L_lt50
                        : this.correctPercentage < 0.75
                        ? L_lt75
                        : 1 === this.correctPercentage
                        ? L_e100
                        : isNaN(this.correctPercentage)
                        ? L_nan
                        : L_ge75),
                      (this.FeedbackText =
                        n[Math.floor(Math.random() * n.length)]),
                      (this.FeedbackText = this.FeedbackText.replace(
                        '{{correctPercentage}}',
                        Math.round(100 * this.correctPercentage).toString(10)
                      ));
                  }
                });
          }
          onRestartClick() {
            this._store.dispatch(new at(this.questionCount.value)),
              this.stopQuiz.emit(!1);
          }
          onStartClick() {
            this._store.dispatch(new U()), this.stopQuiz.emit(!1);
          }
          ngOnDestroy() {
            this.$destroyed.next(!0);
          }
          onBackBtnClick() {
            this._store.dispatch(new U()), this.stopQuiz.emit(!1);
          }
          static #t = (this.ɵfac = function (i) {
            return new (i || o)(t.Y36(x.yh));
          });
          static #e = (this.ɵcmp = t.Xpm({
            type: o,
            selectors: [['solid-quiz-end']],
            outputs: { stopQuiz: 'stopQuiz' },
            decls: 9,
            vars: 1,
            consts: [
              [1, 'toolbar-container'],
              [1, 'toolbar'],
              ['mat-icon-button', '', 1, 'button-back', 3, 'click'],
              [1, 'title'],
              [4, 'ngIf'],
              [1, 'quizEval'],
              [1, 'resultText'],
              ['markdown', '', 3, 'data'],
              [1, 'button-container'],
              [
                'mat-raised-button',
                '',
                'color',
                'primary',
                1,
                'startBtn',
                3,
                'click',
              ],
              [
                'mat-raised-button',
                '',
                'color',
                'primary',
                1,
                'restartBtn',
                3,
                'click',
              ],
              ['MatAccordionDisplayMode', 'flat'],
              ['class', 'answerDetails', 4, 'ngFor', 'ngForOf'],
              [1, 'footnote'],
              [1, 'answerDetails'],
              ['class', 'correctIcon', 4, 'ngIf'],
              ['class', 'incorrectIcon', 4, 'ngIf'],
              ['class', 'unansweredIcon', 4, 'ngIf'],
              [1, 'questionText'],
              [1, 'questionHeader'],
              ['markdown', '', 3, 'data', 'inline'],
              [1, 'correctIcon'],
              [1, 'incorrectIcon'],
              [1, 'unansweredIcon'],
            ],
            template: function (i, n) {
              1 & i &&
                (t.TgZ(0, 'div', 0)(1, 'div', 1)(2, 'button', 2),
                t.NdJ('click', function () {
                  return n.onBackBtnClick();
                }),
                t.TgZ(3, 'mat-icon'),
                t._uU(4, 'arrow_back'),
                t.qZA()(),
                t.TgZ(5, 'div', 3)(6, 'h2'),
                t._uU(7, 'Selbsttest - Auswertung'),
                t.qZA()()()(),
                t.YNc(8, wo, 18, 4, 'mat-card', 4)),
                2 & i && (t.xp6(8), t.Q6J('ngIf', n.QuizSession));
            },
            dependencies: [
              m.sg,
              m.O5,
              Z.l,
              T.lW,
              T.RK,
              P.a8,
              P.hq,
              P.dn,
              P.rt,
              F.Hw,
              Bt.ib,
              Bt.yz,
            ],
            styles: [
              '[_nghost-%COMP%]{display:block}mat-card[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}}mat-card-content[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}mat-form-field[_ngcontent-%COMP%]{margin-left:.75em}@media (max-width: 999px){mat-card[_ngcontent-%COMP%]{top:62px}.toolbar-container[_ngcontent-%COMP%]{width:100%}}@media (min-width: 1000px){.toolbar-container[_ngcontent-%COMP%]{width:calc(100% - 300px)}}.toolbar-container[_ngcontent-%COMP%]{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar[_ngcontent-%COMP%]{width:100%;position:relative;min-height:52px}.toolbar[_ngcontent-%COMP%]   .button-back[_ngcontent-%COMP%]{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:21px;transform:translateY(12px);margin-bottom:-2px}@media (min-width: 441px){mat-expansion-panel[_ngcontent-%COMP%]{width:95%;margin:auto}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly}.button-container[_ngcontent-%COMP%]   .startBtn[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   .restartBtn[_ngcontent-%COMP%]{margin:7px 0!important;font-size:15px;width:45%}}@media (max-width: 440px){mat-expansion-panel[_ngcontent-%COMP%]{width:93%;margin:auto}.button-container[_ngcontent-%COMP%]{display:block;text-align:center}.button-container[_ngcontent-%COMP%]   .startBtn[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   .restartBtn[_ngcontent-%COMP%]{width:90%}}.button-container[_ngcontent-%COMP%]   .startBtn[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   .restartBtn[_ngcontent-%COMP%]{margin:7px 0!important;font-size:15px}.mat-expansion-panel-header[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.quizEval[_ngcontent-%COMP%]{margin:1em}.answerDetails[_ngcontent-%COMP%]{margin:0 .5em 1.5em 0;display:-webkit-box}.correctIcon[_ngcontent-%COMP%], .incorrectIcon[_ngcontent-%COMP%], .unansweredIcon[_ngcontent-%COMP%]{transform:translateY(-3px) translate(-5px);opacity:1}.questionText[_ngcontent-%COMP%]{margin-left:.5em}.questionHeader[_ngcontent-%COMP%]{font-weight:500;margin-bottom:.5em}.resultText[_ngcontent-%COMP%]{font-weight:500;font-size:15px}.footnote[_ngcontent-%COMP%]{font-size:smaller;font-style:oblique;margin:2em;text-align:center}',
            ],
          }));
        }
        return o;
      })();
      function ko(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'div')(1, 'solid-quiz-question', 3),
            t.NdJ('stopQuiz', function (n) {
              t.CHM(e);
              const s = t.oxw(2);
              return t.KtG(s.setStopQuiz(n));
            }),
            t.qZA()();
        }
        if (2 & o) {
          const e = t.oxw().ngIf;
          t.xp6(1), t.Q6J('question', e.questions[e.currentQuestion]);
        }
      }
      function Mo(o, a) {
        if (
          (1 & o && (t.ynx(0), t.YNc(1, ko, 2, 1, 'div', 0), t.BQk()), 2 & o)
        ) {
          const e = a.ngIf,
            i = t.oxw(),
            n = t.MAs(5);
          t.xp6(1),
            t.Q6J('ngIf', 100 !== e.progress && !i.stopQuiz)('ngIfElse', n);
        }
      }
      function To(o, a) {
        1 & o && t._UZ(0, 'solid-quiz-start');
      }
      function Po(o, a) {
        if (1 & o) {
          const e = t.EpF();
          t.TgZ(0, 'solid-quiz-end', 4),
            t.NdJ('stopQuiz', function (n) {
              t.CHM(e);
              const s = t.oxw();
              return t.KtG(s.setStopQuiz(n));
            }),
            t.qZA();
        }
      }
      class nt {
        constructor(a) {
          (this.store = a), (this.stopQuiz = !1), a.dispatch(new Gt());
        }
        ngOnDestroy() {
          this.store.dispatch(new U());
        }
        setStopQuiz(a) {
          this.stopQuiz = a;
        }
        static #t = (this.ɵfac = function (e) {
          return new (e || nt)(t.Y36(x.yh));
        });
        static #e = (this.ɵcmp = t.Xpm({
          type: nt,
          selectors: [['solid-quiz-main']],
          decls: 6,
          vars: 4,
          consts: [
            [4, 'ngIf', 'ngIfElse'],
            ['quizStart', ''],
            ['quizEnd', ''],
            [3, 'question', 'stopQuiz'],
            [3, 'stopQuiz'],
          ],
          template: function (e, i) {
            if (
              (1 & e &&
                (t.YNc(0, Mo, 2, 2, 'ng-container', 0),
                t.ALo(1, 'async'),
                t.YNc(2, To, 1, 0, 'ng-template', null, 1, t.W1O),
                t.YNc(4, Po, 1, 0, 'ng-template', null, 2, t.W1O)),
              2 & e)
            ) {
              const n = t.MAs(3);
              t.Q6J('ngIf', t.lcZ(1, 2, i.QuizSession))('ngIfElse', n);
            }
          },
          dependencies: [m.O5, z, it, xo, m.Ov],
          styles: ['[_nghost-%COMP%]{display:block}'],
        }));
      }
      !(function (o, a, e, i) {
        var r,
          n = arguments.length,
          s =
            n < 3
              ? a
              : null === i
              ? (i = Object.getOwnPropertyDescriptor(a, e))
              : i;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          s = Reflect.decorate(o, a, e, i);
        else
          for (var c = o.length - 1; c >= 0; c--)
            (r = o[c]) &&
              (s = (n < 3 ? r(s) : n > 3 ? r(a, e, s) : r(a, e)) || s);
        n > 3 && s && Object.defineProperty(a, e, s);
      })(
        [
          (0, x.Ph)(y.getSession),
          (function (o, a) {
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.metadata
            )
              return Reflect.metadata('design:type', a);
          })(0, ot.y),
        ],
        nt.prototype,
        'QuizSession',
        void 0
      );
      var Io = h(7295),
        _t = h(686);
      h(6206), h(4406), h(287), h(3276), h(7594), h(9735), h(7721);
      const qo = {
        provide: new t.OlP('mat-autocomplete-scroll-strategy'),
        deps: [_t.aV],
        useFactory: function Qo(o) {
          return () => o.scrollStrategies.reposition();
        },
      };
      let Zo = (() => {
        class o {
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵmod = t.oAB({ type: o }));
          static #i = (this.ɵinj = t.cJS({
            providers: [qo],
            imports: [_t.U8, g.Ng, g.BQ, m.ez, $.ZD, g.Ng, g.BQ],
          }));
        }
        return o;
      })();
      var Lo = h(5206),
        No = h(2886);
      const Be = [{ path: '', component: nt, data: { title: 'Selbsttest' } }],
        ze = Ge.Bz.forChild(Be),
        Ze = x.$l.forFeature([y]);
      let Go = (() => {
        class o {
          static #t = (this.ɵfac = function (i) {
            return new (i || o)();
          });
          static #e = (this.ɵmod = t.oAB({ type: o }));
          static #i = (this.ɵinj = t.cJS({
            imports: [
              wt.LS,
              ze,
              Ze,
              T.ot,
              P.QW,
              ue.p9,
              ct.lN,
              Io.c,
              re.Cv,
              Yi,
              Jt.Cq,
              F.Ps,
              Bt.To,
              rt.KP,
              yi,
              Zo,
              Lo.ie,
              No.LD,
              W.Is,
              Sn,
              Pi,
              se.rP,
            ],
          }));
        }
        return o;
      })();
    },
  },
]);
