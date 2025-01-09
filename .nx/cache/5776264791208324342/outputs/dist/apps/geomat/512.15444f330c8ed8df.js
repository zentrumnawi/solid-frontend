'use strict';
(self.webpackChunkgeomat = self.webpackChunkgeomat || []).push([
  [512],
  {
    1512: (_t, P, a) => {
      a.r(P), a.d(P, { CrystalsystemModule: () => ft });
      var b = a(3093);
      const f = [
        {
          name: 'cubic',
          displayName: 'kubisch',
          description:
            'F\xfcr die Seiten gilt: a = b = c <br> F\xfcr die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '&lt;100&gt;' },
            { name: 110, title: '&lt;110&gt;' },
            { name: 111, title: '&lt;111&gt;' },
          ],
        },
        {
          name: 'hexagonal',
          displayName: 'hexagonal',
          description:
            'F\xfcr die Seiten gilt: a = b &ne; c <br> F\xfcr die Winkel gilt: &alpha; = &beta; = 90&deg; und &gamma; = 60&deg;',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '[0001]' },
            { name: 110, title: '[0100]' },
            { name: 111, title: '[1200]' },
          ],
        },
        {
          name: 'monoclinic',
          displayName: 'monoklin',
          description:
            'F\xfcr die Seiten gilt: a &ne; b &ne; c <br> F\xfcr die Winkel gilt: &alpha; = &gamma; = 90&deg; und &beta; &ne; 90&deg;',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '[001]' },
          ],
        },
        {
          name: 'orthorhombic',
          displayName: 'orthorhombisch',
          description:
            'F\xfcr die Seiten gilt: a &ne; b &ne; c <br> F\xfcr die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '[100]' },
            { name: 110, title: '[010]' },
            { name: 111, title: '[001]' },
          ],
        },
        {
          name: 'trigonal',
          displayName: 'trigonal',
          description:
            'F\xfcr die Seiten gilt: a = b = c <br> F\xfcr die Winkel gilt: &alpha; = &beta; = &gamma; &ne; 90&deg; <br>(rhomboedrische Aufstellung)',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '[111] &lt;1-10&gt;' },
          ],
        },
        {
          name: 'tetragonal',
          displayName: 'tetragonal',
          description:
            'F\xfcr die Seiten gilt: a = b &ne; c <br> F\xfcr die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
          layers: [
            { name: 0, title: '&#123; . . . &#125;' },
            { name: 100, title: '[001]' },
            { name: 110, title: '&lt;100&gt;' },
            { name: 111, title: '&lt;110&gt;' },
          ],
        },
        {
          name: 'triclinic',
          displayName: 'triklin',
          description:
            'F\xfcr die Seiten gilt: a &ne; b &ne; c <br> F\xfcr die Winkel gilt: &alpha; &ne; &beta; &ne; &gamma; &ne; 90&deg;',
          layers: [],
        },
      ];
      var N = a(9216),
        e = a(8126),
        g = a(3223),
        M = a(9223),
        Z = a(191),
        O = a(9836),
        I = a(306),
        A = a(9142),
        d = a(7701),
        z = a(4359),
        _ = a(8790),
        R = a(8340),
        S = a(3916),
        y = a(7943),
        H = a(3192),
        v = a(686),
        E = a(9804),
        G = a(7594),
        D = a(5992),
        T = (a(6206), a(1045));
      const B = ['tooltip'],
        k = new e.OlP('mat-tooltip-scroll-strategy'),
        V = {
          provide: k,
          deps: [v.aV],
          useFactory: function U(n) {
            return () => n.scrollStrategies.reposition({ scrollThrottle: 20 });
          },
        },
        j = new e.OlP('mat-tooltip-default-options', {
          providedIn: 'root',
          factory: function X() {
            return { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500 };
          },
        }),
        L = 'tooltip-panel',
        Y = (0, S.i$)({ passive: !0 });
      let tt = (() => {
          class n {
            get position() {
              return this._position;
            }
            set position(t) {
              t !== this._position &&
                ((this._position = t),
                this._overlayRef &&
                  (this._updatePosition(this._overlayRef),
                  this._tooltipInstance?.show(0),
                  this._overlayRef.updatePosition()));
            }
            get positionAtOrigin() {
              return this._positionAtOrigin;
            }
            set positionAtOrigin(t) {
              (this._positionAtOrigin = (0, _.Ig)(t)),
                this._detach(),
                (this._overlayRef = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = (0, _.Ig)(t)),
                this._disabled
                  ? this.hide(0)
                  : this._setupPointerEnterEventsIfNeeded();
            }
            get showDelay() {
              return this._showDelay;
            }
            set showDelay(t) {
              this._showDelay = (0, _.su)(t);
            }
            get hideDelay() {
              return this._hideDelay;
            }
            set hideDelay(t) {
              (this._hideDelay = (0, _.su)(t)),
                this._tooltipInstance &&
                  (this._tooltipInstance._mouseLeaveHideDelay =
                    this._hideDelay);
            }
            get message() {
              return this._message;
            }
            set message(t) {
              this._ariaDescriber.removeDescription(
                this._elementRef.nativeElement,
                this._message,
                'tooltip'
              ),
                (this._message = null != t ? String(t).trim() : ''),
                !this._message && this._isTooltipVisible()
                  ? this.hide(0)
                  : (this._setupPointerEnterEventsIfNeeded(),
                    this._updateTooltipMessage(),
                    this._ngZone.runOutsideAngular(() => {
                      Promise.resolve().then(() => {
                        this._ariaDescriber.describe(
                          this._elementRef.nativeElement,
                          this.message,
                          'tooltip'
                        );
                      });
                    }));
            }
            get tooltipClass() {
              return this._tooltipClass;
            }
            set tooltipClass(t) {
              (this._tooltipClass = t),
                this._tooltipInstance &&
                  this._setTooltipClass(this._tooltipClass);
            }
            constructor(t, i, o, s, l, p, m, C, x, u, r, w) {
              (this._overlay = t),
                (this._elementRef = i),
                (this._scrollDispatcher = o),
                (this._viewContainerRef = s),
                (this._ngZone = l),
                (this._platform = p),
                (this._ariaDescriber = m),
                (this._focusMonitor = C),
                (this._dir = u),
                (this._defaultOptions = r),
                (this._position = 'below'),
                (this._positionAtOrigin = !1),
                (this._disabled = !1),
                (this._viewInitialized = !1),
                (this._pointerExitEventsInitialized = !1),
                (this._viewportMargin = 8),
                (this._cssClassPrefix = 'mat'),
                (this.touchGestures = 'auto'),
                (this._message = ''),
                (this._passiveListeners = []),
                (this._destroyed = new D.x()),
                (this._scrollStrategy = x),
                (this._document = w),
                r &&
                  ((this._showDelay = r.showDelay),
                  (this._hideDelay = r.hideDelay),
                  r.position && (this.position = r.position),
                  r.positionAtOrigin &&
                    (this.positionAtOrigin = r.positionAtOrigin),
                  r.touchGestures && (this.touchGestures = r.touchGestures)),
                u.change.pipe((0, d.R)(this._destroyed)).subscribe(() => {
                  this._overlayRef && this._updatePosition(this._overlayRef);
                });
            }
            ngAfterViewInit() {
              (this._viewInitialized = !0),
                this._setupPointerEnterEventsIfNeeded(),
                this._focusMonitor
                  .monitor(this._elementRef)
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe((t) => {
                    t
                      ? 'keyboard' === t && this._ngZone.run(() => this.show())
                      : this._ngZone.run(() => this.hide(0));
                  });
            }
            ngOnDestroy() {
              const t = this._elementRef.nativeElement;
              clearTimeout(this._touchstartTimeout),
                this._overlayRef &&
                  (this._overlayRef.dispose(), (this._tooltipInstance = null)),
                this._passiveListeners.forEach(([i, o]) => {
                  t.removeEventListener(i, o, Y);
                }),
                (this._passiveListeners.length = 0),
                this._destroyed.next(),
                this._destroyed.complete(),
                this._ariaDescriber.removeDescription(
                  t,
                  this.message,
                  'tooltip'
                ),
                this._focusMonitor.stopMonitoring(t);
            }
            show(t = this.showDelay, i) {
              if (this.disabled || !this.message || this._isTooltipVisible())
                return void this._tooltipInstance?._cancelPendingAnimations();
              const o = this._createOverlay(i);
              this._detach(),
                (this._portal =
                  this._portal ||
                  new G.C5(this._tooltipComponent, this._viewContainerRef));
              const s = (this._tooltipInstance = o.attach(
                this._portal
              ).instance);
              (s._triggerElement = this._elementRef.nativeElement),
                (s._mouseLeaveHideDelay = this._hideDelay),
                s
                  .afterHidden()
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe(() => this._detach()),
                this._setTooltipClass(this._tooltipClass),
                this._updateTooltipMessage(),
                s.show(t);
            }
            hide(t = this.hideDelay) {
              const i = this._tooltipInstance;
              i &&
                (i.isVisible()
                  ? i.hide(t)
                  : (i._cancelPendingAnimations(), this._detach()));
            }
            toggle(t) {
              this._isTooltipVisible() ? this.hide() : this.show(void 0, t);
            }
            _isTooltipVisible() {
              return (
                !!this._tooltipInstance && this._tooltipInstance.isVisible()
              );
            }
            _createOverlay(t) {
              if (this._overlayRef) {
                const s = this._overlayRef.getConfig().positionStrategy;
                if (
                  (!this.positionAtOrigin || !t) &&
                  s._origin instanceof e.SBq
                )
                  return this._overlayRef;
                this._detach();
              }
              const i = this._scrollDispatcher.getAncestorScrollContainers(
                  this._elementRef
                ),
                o = this._overlay
                  .position()
                  .flexibleConnectedTo(
                    (this.positionAtOrigin && t) || this._elementRef
                  )
                  .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
                  .withFlexibleDimensions(!1)
                  .withViewportMargin(this._viewportMargin)
                  .withScrollableContainers(i);
              return (
                o.positionChanges
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe((s) => {
                    this._updateCurrentPositionClass(s.connectionPair),
                      this._tooltipInstance &&
                        s.scrollableViewProperties.isOverlayClipped &&
                        this._tooltipInstance.isVisible() &&
                        this._ngZone.run(() => this.hide(0));
                  }),
                (this._overlayRef = this._overlay.create({
                  direction: this._dir,
                  positionStrategy: o,
                  panelClass: `${this._cssClassPrefix}-${L}`,
                  scrollStrategy: this._scrollStrategy(),
                })),
                this._updatePosition(this._overlayRef),
                this._overlayRef
                  .detachments()
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe(() => this._detach()),
                this._overlayRef
                  .outsidePointerEvents()
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe(() =>
                    this._tooltipInstance?._handleBodyInteraction()
                  ),
                this._overlayRef
                  .keydownEvents()
                  .pipe((0, d.R)(this._destroyed))
                  .subscribe((s) => {
                    this._isTooltipVisible() &&
                      s.keyCode === R.hY &&
                      !(0, R.Vb)(s) &&
                      (s.preventDefault(),
                      s.stopPropagation(),
                      this._ngZone.run(() => this.hide(0)));
                  }),
                this._defaultOptions?.disableTooltipInteractivity &&
                  this._overlayRef.addPanelClass(
                    `${this._cssClassPrefix}-tooltip-panel-non-interactive`
                  ),
                this._overlayRef
              );
            }
            _detach() {
              this._overlayRef &&
                this._overlayRef.hasAttached() &&
                this._overlayRef.detach(),
                (this._tooltipInstance = null);
            }
            _updatePosition(t) {
              const i = t.getConfig().positionStrategy,
                o = this._getOrigin(),
                s = this._getOverlayPosition();
              i.withPositions([
                this._addOffset({ ...o.main, ...s.main }),
                this._addOffset({ ...o.fallback, ...s.fallback }),
              ]);
            }
            _addOffset(t) {
              return t;
            }
            _getOrigin() {
              const t = !this._dir || 'ltr' == this._dir.value,
                i = this.position;
              let o;
              'above' == i || 'below' == i
                ? (o = {
                    originX: 'center',
                    originY: 'above' == i ? 'top' : 'bottom',
                  })
                : 'before' == i || ('left' == i && t) || ('right' == i && !t)
                ? (o = { originX: 'start', originY: 'center' })
                : ('after' == i ||
                    ('right' == i && t) ||
                    ('left' == i && !t)) &&
                  (o = { originX: 'end', originY: 'center' });
              const { x: s, y: l } = this._invertPosition(o.originX, o.originY);
              return { main: o, fallback: { originX: s, originY: l } };
            }
            _getOverlayPosition() {
              const t = !this._dir || 'ltr' == this._dir.value,
                i = this.position;
              let o;
              'above' == i
                ? (o = { overlayX: 'center', overlayY: 'bottom' })
                : 'below' == i
                ? (o = { overlayX: 'center', overlayY: 'top' })
                : 'before' == i || ('left' == i && t) || ('right' == i && !t)
                ? (o = { overlayX: 'end', overlayY: 'center' })
                : ('after' == i ||
                    ('right' == i && t) ||
                    ('left' == i && !t)) &&
                  (o = { overlayX: 'start', overlayY: 'center' });
              const { x: s, y: l } = this._invertPosition(
                o.overlayX,
                o.overlayY
              );
              return { main: o, fallback: { overlayX: s, overlayY: l } };
            }
            _updateTooltipMessage() {
              this._tooltipInstance &&
                ((this._tooltipInstance.message = this.message),
                this._tooltipInstance._markForCheck(),
                this._ngZone.onMicrotaskEmpty
                  .pipe((0, z.q)(1), (0, d.R)(this._destroyed))
                  .subscribe(() => {
                    this._tooltipInstance && this._overlayRef.updatePosition();
                  }));
            }
            _setTooltipClass(t) {
              this._tooltipInstance &&
                ((this._tooltipInstance.tooltipClass = t),
                this._tooltipInstance._markForCheck());
            }
            _invertPosition(t, i) {
              return (
                'above' === this.position || 'below' === this.position
                  ? 'top' === i
                    ? (i = 'bottom')
                    : 'bottom' === i && (i = 'top')
                  : 'end' === t
                  ? (t = 'start')
                  : 'start' === t && (t = 'end'),
                { x: t, y: i }
              );
            }
            _updateCurrentPositionClass(t) {
              const { overlayY: i, originX: o, originY: s } = t;
              let l;
              if (
                ((l =
                  'center' === i
                    ? this._dir && 'rtl' === this._dir.value
                      ? 'end' === o
                        ? 'left'
                        : 'right'
                      : 'start' === o
                      ? 'left'
                      : 'right'
                    : 'bottom' === i && 'top' === s
                    ? 'above'
                    : 'below'),
                l !== this._currentPosition)
              ) {
                const p = this._overlayRef;
                if (p) {
                  const m = `${this._cssClassPrefix}-${L}-`;
                  p.removePanelClass(m + this._currentPosition),
                    p.addPanelClass(m + l);
                }
                this._currentPosition = l;
              }
            }
            _setupPointerEnterEventsIfNeeded() {
              this._disabled ||
                !this.message ||
                !this._viewInitialized ||
                this._passiveListeners.length ||
                (this._platformSupportsMouseEvents()
                  ? this._passiveListeners.push([
                      'mouseenter',
                      (t) => {
                        let i;
                        this._setupPointerExitEventsIfNeeded(),
                          void 0 !== t.x && void 0 !== t.y && (i = t),
                          this.show(void 0, i);
                      },
                    ])
                  : 'off' !== this.touchGestures &&
                    (this._disableNativeGesturesIfNecessary(),
                    this._passiveListeners.push([
                      'touchstart',
                      (t) => {
                        const i = t.targetTouches?.[0],
                          o = i ? { x: i.clientX, y: i.clientY } : void 0;
                        this._setupPointerExitEventsIfNeeded(),
                          clearTimeout(this._touchstartTimeout),
                          (this._touchstartTimeout = setTimeout(
                            () => this.show(void 0, o),
                            500
                          ));
                      },
                    ])),
                this._addListeners(this._passiveListeners));
            }
            _setupPointerExitEventsIfNeeded() {
              if (this._pointerExitEventsInitialized) return;
              this._pointerExitEventsInitialized = !0;
              const t = [];
              if (this._platformSupportsMouseEvents())
                t.push(
                  [
                    'mouseleave',
                    (i) => {
                      const o = i.relatedTarget;
                      (!o || !this._overlayRef?.overlayElement.contains(o)) &&
                        this.hide();
                    },
                  ],
                  ['wheel', (i) => this._wheelListener(i)]
                );
              else if ('off' !== this.touchGestures) {
                this._disableNativeGesturesIfNecessary();
                const i = () => {
                  clearTimeout(this._touchstartTimeout),
                    this.hide(this._defaultOptions.touchendHideDelay);
                };
                t.push(['touchend', i], ['touchcancel', i]);
              }
              this._addListeners(t), this._passiveListeners.push(...t);
            }
            _addListeners(t) {
              t.forEach(([i, o]) => {
                this._elementRef.nativeElement.addEventListener(i, o, Y);
              });
            }
            _platformSupportsMouseEvents() {
              return !this._platform.IOS && !this._platform.ANDROID;
            }
            _wheelListener(t) {
              if (this._isTooltipVisible()) {
                const i = this._document.elementFromPoint(t.clientX, t.clientY),
                  o = this._elementRef.nativeElement;
                i !== o && !o.contains(i) && this.hide();
              }
            }
            _disableNativeGesturesIfNecessary() {
              const t = this.touchGestures;
              if ('off' !== t) {
                const i = this._elementRef.nativeElement,
                  o = i.style;
                ('on' === t ||
                  ('INPUT' !== i.nodeName && 'TEXTAREA' !== i.nodeName)) &&
                  (o.userSelect =
                    o.msUserSelect =
                    o.webkitUserSelect =
                    o.MozUserSelect =
                      'none'),
                  ('on' === t || !i.draggable) && (o.webkitUserDrag = 'none'),
                  (o.touchAction = 'none'),
                  (o.webkitTapHighlightColor = 'transparent');
              }
            }
            static #t = (this.ɵfac = function (i) {
              e.$Z();
            });
            static #e = (this.ɵdir = e.lG2({
              type: n,
              inputs: {
                position: ['matTooltipPosition', 'position'],
                positionAtOrigin: [
                  'matTooltipPositionAtOrigin',
                  'positionAtOrigin',
                ],
                disabled: ['matTooltipDisabled', 'disabled'],
                showDelay: ['matTooltipShowDelay', 'showDelay'],
                hideDelay: ['matTooltipHideDelay', 'hideDelay'],
                touchGestures: ['matTooltipTouchGestures', 'touchGestures'],
                message: ['matTooltip', 'message'],
                tooltipClass: ['matTooltipClass', 'tooltipClass'],
              },
            }));
          }
          return n;
        })(),
        et = (() => {
          class n extends tt {
            constructor(t, i, o, s, l, p, m, C, x, u, r, w) {
              super(t, i, o, s, l, p, m, C, x, u, r, w),
                (this._tooltipComponent = ot),
                (this._cssClassPrefix = 'mat-mdc'),
                (this._viewportMargin = 8);
            }
            _addOffset(t) {
              const o = !this._dir || 'ltr' == this._dir.value;
              return (
                'top' === t.originY
                  ? (t.offsetY = -8)
                  : 'bottom' === t.originY
                  ? (t.offsetY = 8)
                  : 'start' === t.originX
                  ? (t.offsetX = o ? -8 : 8)
                  : 'end' === t.originX && (t.offsetX = o ? 8 : -8),
                t
              );
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || n)(
                e.Y36(v.aV),
                e.Y36(e.SBq),
                e.Y36(E.mF),
                e.Y36(e.s_b),
                e.Y36(e.R0b),
                e.Y36(S.t4),
                e.Y36(y.$s),
                e.Y36(y.tE),
                e.Y36(k),
                e.Y36(H.Is, 8),
                e.Y36(j, 8),
                e.Y36(g.K0)
              );
            });
            static #e = (this.ɵdir = e.lG2({
              type: n,
              selectors: [['', 'matTooltip', '']],
              hostAttrs: [1, 'mat-mdc-tooltip-trigger'],
              hostVars: 2,
              hostBindings: function (i, o) {
                2 & i && e.ekj('mat-mdc-tooltip-disabled', o.disabled);
              },
              exportAs: ['matTooltip'],
              features: [e.qOj],
            }));
          }
          return n;
        })(),
        it = (() => {
          class n {
            constructor(t, i) {
              (this._changeDetectorRef = t),
                (this._closeOnInteraction = !1),
                (this._isVisible = !1),
                (this._onHide = new D.x()),
                (this._animationsDisabled = 'NoopAnimations' === i);
            }
            show(t) {
              null != this._hideTimeoutId && clearTimeout(this._hideTimeoutId),
                (this._showTimeoutId = setTimeout(() => {
                  this._toggleVisibility(!0), (this._showTimeoutId = void 0);
                }, t));
            }
            hide(t) {
              null != this._showTimeoutId && clearTimeout(this._showTimeoutId),
                (this._hideTimeoutId = setTimeout(() => {
                  this._toggleVisibility(!1), (this._hideTimeoutId = void 0);
                }, t));
            }
            afterHidden() {
              return this._onHide;
            }
            isVisible() {
              return this._isVisible;
            }
            ngOnDestroy() {
              this._cancelPendingAnimations(),
                this._onHide.complete(),
                (this._triggerElement = null);
            }
            _handleBodyInteraction() {
              this._closeOnInteraction && this.hide(0);
            }
            _markForCheck() {
              this._changeDetectorRef.markForCheck();
            }
            _handleMouseLeave({ relatedTarget: t }) {
              (!t || !this._triggerElement.contains(t)) &&
                (this.isVisible()
                  ? this.hide(this._mouseLeaveHideDelay)
                  : this._finalizeAnimation(!1));
            }
            _onShow() {}
            _handleAnimationEnd({ animationName: t }) {
              (t === this._showAnimation || t === this._hideAnimation) &&
                this._finalizeAnimation(t === this._showAnimation);
            }
            _cancelPendingAnimations() {
              null != this._showTimeoutId && clearTimeout(this._showTimeoutId),
                null != this._hideTimeoutId &&
                  clearTimeout(this._hideTimeoutId),
                (this._showTimeoutId = this._hideTimeoutId = void 0);
            }
            _finalizeAnimation(t) {
              t
                ? (this._closeOnInteraction = !0)
                : this.isVisible() || this._onHide.next();
            }
            _toggleVisibility(t) {
              const i = this._tooltip.nativeElement,
                o = this._showAnimation,
                s = this._hideAnimation;
              if (
                (i.classList.remove(t ? s : o),
                i.classList.add(t ? o : s),
                (this._isVisible = t),
                t &&
                  !this._animationsDisabled &&
                  'function' == typeof getComputedStyle)
              ) {
                const l = getComputedStyle(i);
                ('0s' === l.getPropertyValue('animation-duration') ||
                  'none' === l.getPropertyValue('animation-name')) &&
                  (this._animationsDisabled = !0);
              }
              t && this._onShow(),
                this._animationsDisabled &&
                  (i.classList.add('_mat-animation-noopable'),
                  this._finalizeAnimation(t));
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || n)(e.Y36(e.sBO), e.Y36(e.QbO, 8));
            });
            static #e = (this.ɵdir = e.lG2({ type: n }));
          }
          return n;
        })(),
        ot = (() => {
          class n extends it {
            constructor(t, i, o) {
              super(t, o),
                (this._elementRef = i),
                (this._isMultiline = !1),
                (this._showAnimation = 'mat-mdc-tooltip-show'),
                (this._hideAnimation = 'mat-mdc-tooltip-hide');
            }
            _onShow() {
              (this._isMultiline = this._isTooltipMultiline()),
                this._markForCheck();
            }
            _isTooltipMultiline() {
              const t = this._elementRef.nativeElement.getBoundingClientRect();
              return t.height > 24 && t.width >= 200;
            }
            static #t = (this.ɵfac = function (i) {
              return new (i || n)(e.Y36(e.sBO), e.Y36(e.SBq), e.Y36(e.QbO, 8));
            });
            static #e = (this.ɵcmp = e.Xpm({
              type: n,
              selectors: [['mat-tooltip-component']],
              viewQuery: function (i, o) {
                if ((1 & i && e.Gf(B, 7), 2 & i)) {
                  let s;
                  e.iGM((s = e.CRH())) && (o._tooltip = s.first);
                }
              },
              hostAttrs: ['aria-hidden', 'true'],
              hostVars: 2,
              hostBindings: function (i, o) {
                1 & i &&
                  e.NdJ('mouseleave', function (l) {
                    return o._handleMouseLeave(l);
                  }),
                  2 & i && e.Udp('zoom', o.isVisible() ? 1 : null);
              },
              features: [e.qOj],
              decls: 4,
              vars: 4,
              consts: [
                [
                  1,
                  'mdc-tooltip',
                  'mdc-tooltip--shown',
                  'mat-mdc-tooltip',
                  3,
                  'ngClass',
                  'animationend',
                ],
                ['tooltip', ''],
                [1, 'mdc-tooltip__surface', 'mdc-tooltip__surface-animation'],
              ],
              template: function (i, o) {
                1 & i &&
                  (e.TgZ(0, 'div', 0, 1),
                  e.NdJ('animationend', function (l) {
                    return o._handleAnimationEnd(l);
                  }),
                  e.TgZ(2, 'div', 2),
                  e._uU(3),
                  e.qZA()()),
                  2 & i &&
                    (e.ekj('mdc-tooltip--multiline', o._isMultiline),
                    e.Q6J('ngClass', o.tooltipClass),
                    e.xp6(3),
                    e.Oqu(o.message));
              },
              dependencies: [g.mk],
              styles: [
                '.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip--showing-transition .mdc-tooltip__surface-animation{transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-tooltip--hide-transition .mdc-tooltip__surface-animation{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-tooltip{position:fixed;display:none;z-index:9}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;display:flex;flex-direction:column;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(200px - (2 * 8px));margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(320px - (2 * 8px));align-self:stretch}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions,.mdc-tooltip__content,.mdc-tooltip__title{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip{--mdc-plain-tooltip-container-shape:4px;--mdc-plain-tooltip-supporting-text-line-height:16px}.mat-mdc-tooltip .mdc-tooltip__surface{background-color:var(--mdc-plain-tooltip-container-color)}.mat-mdc-tooltip .mdc-tooltip__surface{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__caret-surface-top,.mat-mdc-tooltip .mdc-tooltip__caret-surface-bottom{border-radius:var(--mdc-plain-tooltip-container-shape)}.mat-mdc-tooltip .mdc-tooltip__surface{color:var(--mdc-plain-tooltip-supporting-text-color)}.mat-mdc-tooltip .mdc-tooltip__surface{font-family:var(--mdc-plain-tooltip-supporting-text-font);line-height:var(--mdc-plain-tooltip-supporting-text-line-height);font-size:var(--mdc-plain-tooltip-supporting-text-size);font-weight:var(--mdc-plain-tooltip-supporting-text-weight);letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking)}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return n;
        })(),
        nt = (() => {
          class n {
            static #t = (this.ɵfac = function (i) {
              return new (i || n)();
            });
            static #e = (this.ɵmod = e.oAB({ type: n }));
            static #i = (this.ɵinj = e.cJS({
              providers: [V],
              imports: [y.rt, g.ez, v.U8, T.BQ, T.BQ, E.ZD],
            }));
          }
          return n;
        })();
      var F = a(2886);
      const st = ['iframe'];
      function at(n, h) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, 'button', 14),
            e.NdJ('click', function () {
              e.CHM(t);
              const o = e.oxw();
              return e.KtG(o.onToggleSolidClick());
            }),
            e.TgZ(1, 'mat-icon'),
            e._uU(2, 'check_box_outline_blank'),
            e.qZA()();
        }
      }
      function lt(n, h) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, 'button', 15),
            e.NdJ('click', function () {
              e.CHM(t);
              const o = e.oxw();
              return e.KtG(o.onTogglePointsClick());
            }),
            e.TgZ(1, 'mat-icon'),
            e._uU(2, 'apps'),
            e.qZA()();
        }
      }
      function rt(n, h) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, 'button', 16),
            e.NdJ('click', function () {
              e.CHM(t);
              const o = e.oxw();
              return e.KtG(o.onTogglePerspectiveClick());
            }),
            e.TgZ(1, 'mat-icon'),
            e._uU(2, 'control_camera'),
            e.qZA()();
        }
      }
      function ct(n, h) {
        if (
          (1 & n && (e.TgZ(0, 'mat-option', 18), e._UZ(1, 'span', 13), e.qZA()),
          2 & n)
        ) {
          const t = h.$implicit;
          e.Q6J('value', t.name), e.xp6(1), e.Q6J('data', t.title);
        }
      }
      function dt(n, h) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, 'mat-select', 17),
            e.NdJ('ngModelChange', function (o) {
              e.CHM(t);
              const s = e.oxw();
              return e.KtG(s.onLayerSelectChange(o));
            }),
            e.YNc(1, ct, 2, 2, 'mat-option', 9),
            e.qZA();
        }
        if (2 & n) {
          const t = e.oxw();
          e.Q6J('ngModel', t.Layer),
            e.xp6(1),
            e.Q6J('ngForOf', t.SelectedConfig.layers);
        }
      }
      function ht(n, h) {
        if ((1 & n && (e.TgZ(0, 'mat-option', 18), e._uU(1), e.qZA()), 2 & n)) {
          const t = h.$implicit;
          e.Q6J('value', t.name), e.xp6(1), e.Oqu(t.displayName);
        }
      }
      const pt = [
        {
          path: '',
          component: (() => {
            class n {
              constructor() {
                (this.iFrame = null),
                  (this.Configs = f),
                  (this.SelectedConfig = f[0]),
                  (this.Layer =
                    f[0].layers.length > 0 ? f[0].layers[0].name : 0),
                  (this.ShowInPreview = N.N.preview),
                  (this.Model = this.SelectedConfig.name);
              }
              get contentWindow() {
                return this.iFrame && this.iFrame.nativeElement.contentWindow
                  ? this.iFrame.nativeElement.contentWindow
                  : null;
              }
              onToggleSolidClick() {
                const t = this.contentWindow;
                t && t.toggleFaces && t.toggleFaces();
              }
              onTogglePointsClick() {
                const t = this.contentWindow;
                t && t.togglePoints && t.togglePoints();
              }
              onTogglePerspectiveClick() {
                const t = this.contentWindow;
                t && t.togglePerspective && t.togglePerspective();
              }
              onToggleAxisClick() {
                const t = this.contentWindow;
                t && t.toggleAxis && t.toggleAxis();
              }
              onLayerSelectChange(t) {
                const i = this.contentWindow;
                i &&
                  i.toggleHighlight &&
                  ((this.Layer = t), i.toggleHighlight(t));
              }
              onModelSelectChange(t) {
                const i = this.contentWindow;
                i &&
                  i.switchModel &&
                  i.toggleHighlight &&
                  ((this.SelectedConfig = this.Configs.find(
                    (o) => o.name === t
                  )),
                  (this.Model = this.SelectedConfig.name),
                  (this.Layer =
                    this.SelectedConfig.layers.length > 0
                      ? this.SelectedConfig.layers[0].name
                      : 0),
                  i.switchModel(t),
                  i.toggleHighlight(this.Layer));
              }
              static #t = (this.ɵfac = function (i) {
                return new (i || n)();
              });
              static #e = (this.ɵcmp = e.Xpm({
                type: n,
                selectors: [['geomat-crystalsystemdetail']],
                viewQuery: function (i, o) {
                  if ((1 & i && e.Gf(st, 5), 2 & i)) {
                    let s;
                    e.iGM((s = e.CRH())) && (o.iFrame = s.first);
                  }
                },
                decls: 22,
                vars: 8,
                consts: [
                  ['mat-icon-button', '', 'routerLink', '', 1, 'button-back'],
                  [1, 'title'],
                  [1, 'spacer'],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle solid',
                    3,
                    'click',
                    4,
                    'ngIf',
                  ],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle axis',
                    3,
                    'click',
                  ],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle points',
                    3,
                    'click',
                    4,
                    'ngIf',
                  ],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle perspective',
                    3,
                    'click',
                    4,
                    'ngIf',
                  ],
                  [
                    'matTooltip',
                    'Ebene',
                    'placeholder',
                    'Ebene',
                    3,
                    'ngModel',
                    'ngModelChange',
                    4,
                    'ngIf',
                  ],
                  [
                    'matTooltip',
                    'Modell',
                    'placeholder',
                    'Modell',
                    3,
                    'ngModel',
                    'ngModelChange',
                  ],
                  [3, 'value', 4, 'ngFor', 'ngForOf'],
                  ['src', '/assets/crystalsystem/iframe.html'],
                  ['iframe', ''],
                  [1, 'model-info'],
                  ['markdown', '', 3, 'data'],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle solid',
                    3,
                    'click',
                  ],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle points',
                    3,
                    'click',
                  ],
                  [
                    'mat-icon-button',
                    '',
                    'matTooltip',
                    'Toggle perspective',
                    3,
                    'click',
                  ],
                  [
                    'matTooltip',
                    'Ebene',
                    'placeholder',
                    'Ebene',
                    3,
                    'ngModel',
                    'ngModelChange',
                  ],
                  [3, 'value'],
                ],
                template: function (i, o) {
                  1 & i &&
                    (e.TgZ(0, 'mat-toolbar')(1, 'button', 0)(2, 'mat-icon'),
                    e._uU(3, 'arrow_back'),
                    e.qZA()(),
                    e.TgZ(4, 'span', 1),
                    e._uU(5, 'Kristallsysteme'),
                    e.qZA(),
                    e._UZ(6, 'div', 2),
                    e.YNc(7, at, 3, 0, 'button', 3),
                    e.TgZ(8, 'button', 4),
                    e.NdJ('click', function () {
                      return o.onToggleAxisClick();
                    }),
                    e.TgZ(9, 'mat-icon'),
                    e._uU(10, 'merge_type'),
                    e.qZA()(),
                    e.YNc(11, lt, 3, 0, 'button', 5),
                    e.YNc(12, rt, 3, 0, 'button', 6),
                    e.YNc(13, dt, 2, 2, 'mat-select', 7),
                    e.TgZ(14, 'mat-select', 8),
                    e.NdJ('ngModelChange', function (l) {
                      return o.onModelSelectChange(l);
                    }),
                    e.YNc(15, ht, 2, 2, 'mat-option', 9),
                    e.qZA()(),
                    e._UZ(16, 'iframe', 10, 11),
                    e.TgZ(18, 'div', 12)(19, 'h3'),
                    e._uU(20),
                    e.qZA(),
                    e._UZ(21, 'p', 13),
                    e.qZA()),
                    2 & i &&
                      (e.xp6(7),
                      e.Q6J('ngIf', o.ShowInPreview),
                      e.xp6(4),
                      e.Q6J('ngIf', o.ShowInPreview),
                      e.xp6(1),
                      e.Q6J('ngIf', o.ShowInPreview),
                      e.xp6(1),
                      e.Q6J('ngIf', o.SelectedConfig.layers.length > 0),
                      e.xp6(1),
                      e.Q6J('ngModel', o.Model),
                      e.xp6(1),
                      e.Q6J('ngForOf', o.Configs),
                      e.xp6(5),
                      e.Oqu(o.SelectedConfig.displayName),
                      e.xp6(1),
                      e.Q6J('data', o.SelectedConfig.description));
                },
                dependencies: [
                  g.sg,
                  g.O5,
                  M.JJ,
                  M.On,
                  Z.l,
                  O.RK,
                  I.Hw,
                  A.Ye,
                  et,
                  F.gD,
                  T.ey,
                  b.rH,
                ],
                styles: [
                  '.customTooltip[_ngcontent-%COMP%]{max-width:285px!important;min-width:274px!important;background-color:transparent!important;box-shadow:none!important;height:185px}.customTooltip[_ngcontent-%COMP%]   .introjs-tooltiptext[_ngcontent-%COMP%]{background-color:#fff;font-size:16px;font-weight:400;text-align:left;font-family:Roboto;padding:25px 21px 0 34px}.customTooltip[_ngcontent-%COMP%]   .introjs-bullets[_ngcontent-%COMP%]{background-color:#fff;padding:30px 0 0}.customTooltip[_ngcontent-%COMP%]   .introjs-bullets[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background-color:#d3d3d3;width:9px;height:9px}.customTooltip[_ngcontent-%COMP%]   .introjs-tooltipbuttons[_ngcontent-%COMP%]{background-color:#fff;border-bottom-left-radius:7px;border-bottom-right-radius:7px;border-top:none;padding:0;height:24px}.customTooltip[_ngcontent-%COMP%]   .introjs-skipbutton[_ngcontent-%COMP%]{color:#000;padding:0 3px 2px 0;font-weight:500;font-size:34px;margin:-11px -15px}.customTooltip[_ngcontent-%COMP%]   .introjs-nextbutton[_ngcontent-%COMP%]{box-sizing:border-box;background-color:#fff;cursor:pointer;bottom:49px;font-size:0px;border:solid black;border-width:0 3px 3px 0;padding:4px;margin:13%;transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.customTooltip[_ngcontent-%COMP%]   .introjs-nextbutton[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000}.customTooltip[_ngcontent-%COMP%]   .introjs-nextbutton[_ngcontent-%COMP%]:focus{background-color:transparent;color:#000;box-shadow:none;border:solid black;border-width:0 3px 3px 0}.customTooltip[_ngcontent-%COMP%]   .introjs-nextbutton[_ngcontent-%COMP%]:before{content:"";position:absolute;width:27px;height:27px}.customTooltip[_ngcontent-%COMP%]   .introjs-prevbutton[_ngcontent-%COMP%]{box-sizing:border-box;background-color:#fff;cursor:pointer;bottom:49px;font-size:0px;border:solid black;border-width:0 3px 3px 0;padding:4px;margin:13%;transform:rotate(135deg);-webkit-transform:rotate(135deg)}.customTooltip[_ngcontent-%COMP%]   .introjs-prevbutton[_ngcontent-%COMP%]:focus{background-color:transparent;color:#000;box-shadow:none;border:solid black;border-width:0 3px 3px 0}.customTooltip[_ngcontent-%COMP%]   .introjs-prevbutton[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000}.customTooltip[_ngcontent-%COMP%]   .introjs-prevbutton[_ngcontent-%COMP%]:before{content:"";position:absolute;width:27px;height:27px}[_nghost-%COMP%]{display:grid;grid-template-rows:min-content auto min-content;height:100%}mat-toolbar[_ngcontent-%COMP%]{height:56px;background-color:#fff;box-shadow:0 4px 2px -2px #0003}mat-toolbar[_ngcontent-%COMP%]   span.title[_ngcontent-%COMP%]{margin-left:10px}iframe[_ngcontent-%COMP%]{width:100%;height:100%;border:none;overflow:hidden}mat-select[_ngcontent-%COMP%]{max-width:5em}div.model-info[_ngcontent-%COMP%]{padding:.5em;border-top:1px solid #e0e0e0}',
                ],
              }));
            }
            return n;
          })(),
          data: { title: 'Kristallsysteme' },
        },
      ];
      let mt = (() => {
        class n {
          static #t = (this.ɵfac = function (i) {
            return new (i || n)();
          });
          static #e = (this.ɵmod = e.oAB({ type: n }));
          static #i = (this.ɵinj = e.cJS({
            imports: [b.Bz.forChild(pt), b.Bz],
          }));
        }
        return n;
      })();
      var gt = a(8610);
      let ft = (() => {
        class n {
          static #t = (this.ɵfac = function (i) {
            return new (i || n)();
          });
          static #e = (this.ɵmod = e.oAB({ type: n }));
          static #i = (this.ɵinj = e.cJS({
            imports: [gt.LS, O.ot, I.Ps, A.g0, nt, F.LD, mt],
          }));
        }
        return n;
      })();
    },
  },
]);
