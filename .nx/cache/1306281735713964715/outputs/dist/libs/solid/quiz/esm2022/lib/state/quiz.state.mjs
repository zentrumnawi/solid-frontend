var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Action, Selector, State } from '@ngxs/store';
import {
  LoadQuizQuestions,
  StartQuizSession,
  EndQuizSession,
  QuizQuestionAnswered,
  LoadQuizMetadata,
  ToggleExpertMode,
} from './quiz.actions';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SOLID_CORE_CONFIG, MediaModel } from '@zentrumnawi/solid-core';
import { map, tap } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
export let QuizState = class QuizState {
  _config;
  _http;
  static getSession(state) {
    return state.session;
  }
  static getMeta(state) {
    return state.metadata;
  }
  static getExpertMode(state) {
    return state.expertMode;
  }
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  setMeta(ctx) {
    return this._http.get(`${this._config.apiUrl}/quizmeta`).pipe(
      tap((res) => {
        ctx.patchState({
          metadata: res,
        });
      })
    );
  }
  setExpertMode(ctx) {
    const state = ctx.getState();
    ctx.setState({ ...state, expertMode: !state.expertMode });
    return;
  }
  set(ctx, { questionCount, tags, difficulty }) {
    let params;
    if (tags == null) tags = [];
    if (tags.length == 0 && difficulty.length == 0) {
      params = new HttpParams().set('count', questionCount);
    } else if (tags.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('difficulty', difficulty.toString());
    } else if (difficulty.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags));
    } else {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags))
        .set('difficulty', difficulty.toString());
    }
    return this._http
      .get(`${this._config.apiUrl}/quizsession`, {
        params: params,
      })
      .pipe(
        map((response) => {
          const mapit = (input) => {
            return input.map((question) => {
              return {
                ...question,
                images: question.img.map((p) => new MediaModel(p)),
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.patchState({
            questions: res,
          });
        })
      );
  }
  startNewSession({ patchState, getState }, { questionCount }) {
    const sessionQuestions = [];
    const questions = getState().questions;
    questionCount =
      questionCount > questions.length ? questions.length : questionCount;
    for (let i = 0; i < questionCount; ) {
      const rnd = Math.floor(Math.random() * questions.length);
      if (sessionQuestions.find((q) => q.id === questions[rnd].id)) {
        continue;
      }
      const rndQuestions = { ...questions[rnd] };
      rndQuestions.answers = [];
      for (let j = 0; j < questions[rnd].answers.length; ) {
        const random = Math.floor(
          Math.random() * questions[rnd].answers.length
        );
        if (
          rndQuestions.answers.find(
            (a) => a.id === questions[rnd].answers[random].id
          )
        )
          continue;
        rndQuestions.answers.push(questions[rnd].answers[random]);
        j++;
      }
      sessionQuestions.push({ answered: 0, ...rndQuestions });
      i++;
    }
    patchState({
      session: {
        progress: 0,
        currentQuestion: 0,
        questions: sessionQuestions,
      },
    });
  }
  endSession({ patchState }) {
    patchState({
      session: null,
    });
  }
  questionAnswered({ patchState, getState }, { correct }) {
    const session = { ...getState().session };
    const answeredQuestion = {
      ...session.questions[session.currentQuestion],
      answered: correct,
    };
    patchState({
      session: {
        currentQuestion: session.currentQuestion + 1,
        progress:
          (100.0 / session.questions.length) * (session.currentQuestion + 1),
        questions: session.questions.map((q) =>
          q.id === answeredQuestion.id ? answeredQuestion : q
        ),
      },
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: QuizState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: QuizState,
  });
};
__decorate(
  [
    Action(LoadQuizMetadata),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'setMeta',
  null
);
__decorate(
  [
    Action(ToggleExpertMode),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'setExpertMode',
  null
);
__decorate(
  [
    Action(LoadQuizQuestions),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, LoadQuizQuestions]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'set',
  null
);
__decorate(
  [
    Action(StartQuizSession),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, StartQuizSession]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'startNewSession',
  null
);
__decorate(
  [
    Action(EndQuizSession),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'endSession',
  null
);
__decorate(
  [
    Action(QuizQuestionAnswered),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, QuizQuestionAnswered]),
    __metadata('design:returntype', void 0),
  ],
  QuizState.prototype,
  'questionAnswered',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Object),
  ],
  QuizState,
  'getSession',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Object),
  ],
  QuizState,
  'getMeta',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Boolean),
  ],
  QuizState,
  'getExpertMode',
  null
);
QuizState = __decorate(
  [
    State({
      name: 'quiz',
      defaults: {
        metadata: null,
        questions: [],
        session: null,
        expertMode: false,
      },
    }),
    __metadata('design:paramtypes', [Object, HttpClient]),
  ],
  QuizState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: QuizState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.HttpClient },
    ];
  },
  propDecorators: {
    setMeta: [],
    setExpertMode: [],
    set: [],
    startNewSession: [],
    endSession: [],
    questionAnswered: [],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpei5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcXVpei9zcmMvbGliL3N0YXRlL3F1aXouc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQVNwRSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixnQkFBZ0IsR0FDakIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsVUFBVSxHQUNYLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBbUJuQyxXQUFNLFNBQVMsR0FBZixNQUFNLFNBQVM7SUFpQmlCO0lBQzNCO0lBaEJILEFBQVAsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFxQjtRQUNyQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDdkIsQ0FBQztJQUdNLEFBQVAsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFxQjtRQUNsQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDeEIsQ0FBQztJQUdNLEFBQVAsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFxQjtRQUN4QyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQ3FDLE9BQXdCLEVBQ25ELEtBQWlCO1FBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDbkQsVUFBSyxHQUFMLEtB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aEIsU0FBUyxDQStKckI7MkZBL0pZLFNBQVM7a0JBRHJCLFVBQVU7OzBCQWtCTixNQUFNOzJCQUFDLGlCQUFpQjtxRUFLcEIsT0FBTyxNQVdQLGFBQWEsTUFPYixHQUFHLE1Ba0RILGVBQWUsTUEwQ2YsVUFBVSxNQU9WLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgU2VsZWN0b3IsIFN0YXRlLCBTdGF0ZUNvbnRleHQgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgUXVpekFuc3dlcixcclxuICBRdWl6TWV0YWRhdGEsXHJcbiAgUXVpelF1ZXN0aW9uLFxyXG4gIFF1aXpRdWVzdGlvbkFwaSxcclxuICBRdWl6UXVlc3Rpb25JblNlc3Npb24sXHJcbiAgUXVpelNlc3Npb24sXHJcbn0gZnJvbSAnLi9xdWl6Lm1vZGVsJztcclxuaW1wb3J0IHtcclxuICBMb2FkUXVpelF1ZXN0aW9ucyxcclxuICBTdGFydFF1aXpTZXNzaW9uLFxyXG4gIEVuZFF1aXpTZXNzaW9uLFxyXG4gIFF1aXpRdWVzdGlvbkFuc3dlcmVkLFxyXG4gIExvYWRRdWl6TWV0YWRhdGEsXHJcbiAgVG9nZ2xlRXhwZXJ0TW9kZSxcclxufSBmcm9tICcuL3F1aXouYWN0aW9ucyc7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1xyXG4gIFNPTElEX0NPUkVfQ09ORklHLFxyXG4gIFNvbGlkQ29yZUNvbmZpZyxcclxuICBNZWRpYU1vZGVsLFxyXG59IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFF1aXpTdGF0ZU1vZGVsIHtcclxuICBtZXRhZGF0YTogUXVpek1ldGFkYXRhIHwgbnVsbDtcclxuICBxdWVzdGlvbnM6IFF1aXpRdWVzdGlvbltdO1xyXG4gIHNlc3Npb246IFF1aXpTZXNzaW9uIHwgbnVsbDtcclxuICBleHBlcnRNb2RlOiBib29sZWFuIHwgZmFsc2U7XHJcbn1cclxuXHJcbkBTdGF0ZTxRdWl6U3RhdGVNb2RlbD4oe1xyXG4gIG5hbWU6ICdxdWl6JyxcclxuICBkZWZhdWx0czoge1xyXG4gICAgbWV0YWRhdGE6IG51bGwsXHJcbiAgICBxdWVzdGlvbnM6IFtdLFxyXG4gICAgc2Vzc2lvbjogbnVsbCxcclxuICAgIGV4cGVydE1vZGU6IGZhbHNlLFxyXG4gIH0sXHJcbn0pXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFF1aXpTdGF0ZSB7XHJcbiAgQFNlbGVjdG9yKClcclxuICBzdGF0aWMgZ2V0U2Vzc2lvbihzdGF0ZTogUXVpelN0YXRlTW9kZWwpOiBRdWl6U2Vzc2lvbiB8IG51bGwge1xyXG4gICAgcmV0dXJuIHN0YXRlLnNlc3Npb247XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBnZXRNZXRhKHN0YXRlOiBRdWl6U3RhdGVNb2RlbCk6IFF1aXpNZXRhZGF0YSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHN0YXRlLm1ldGFkYXRhO1xyXG4gIH1cclxuXHJcbiAgQFNlbGVjdG9yKClcclxuICBzdGF0aWMgZ2V0RXhwZXJ0TW9kZShzdGF0ZTogUXVpelN0YXRlTW9kZWwpOiBib29sZWFuIHwgZmFsc2Uge1xyXG4gICAgcmV0dXJuIHN0YXRlLmV4cGVydE1vZGU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogU29saWRDb3JlQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudFxyXG4gICkge31cclxuXHJcbiAgQEFjdGlvbihMb2FkUXVpek1ldGFkYXRhKVxyXG4gIHB1YmxpYyBzZXRNZXRhKGN0eDogU3RhdGVDb250ZXh0PFF1aXpTdGF0ZU1vZGVsPikge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0PFF1aXpNZXRhZGF0YT4oYCR7dGhpcy5fY29uZmlnLmFwaVVybH0vcXVpem1ldGFgKS5waXBlKFxyXG4gICAgICB0YXAoKHJlcykgPT4ge1xyXG4gICAgICAgIGN0eC5wYXRjaFN0YXRlKHtcclxuICAgICAgICAgIG1ldGFkYXRhOiByZXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQEFjdGlvbihUb2dnbGVFeHBlcnRNb2RlKVxyXG4gIHB1YmxpYyBzZXRFeHBlcnRNb2RlKGN0eDogU3RhdGVDb250ZXh0PFF1aXpTdGF0ZU1vZGVsPikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSBjdHguZ2V0U3RhdGUoKTtcclxuICAgIGN0eC5zZXRTdGF0ZSh7IC4uLnN0YXRlLCBleHBlcnRNb2RlOiAhc3RhdGUuZXhwZXJ0TW9kZSB9KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIEBBY3Rpb24oTG9hZFF1aXpRdWVzdGlvbnMpXHJcbiAgcHVibGljIHNldChcclxuICAgIGN0eDogU3RhdGVDb250ZXh0PFF1aXpTdGF0ZU1vZGVsPixcclxuICAgIHsgcXVlc3Rpb25Db3VudCwgdGFncywgZGlmZmljdWx0eSB9OiBMb2FkUXVpelF1ZXN0aW9uc1xyXG4gICkge1xyXG4gICAgbGV0IHBhcmFtcztcclxuXHJcbiAgICBpZiAodGFncyA9PSBudWxsKSB0YWdzID0gW107XHJcblxyXG4gICAgaWYgKHRhZ3MubGVuZ3RoID09IDAgJiYgZGlmZmljdWx0eS5sZW5ndGggPT0gMCkge1xyXG4gICAgICBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnY291bnQnLCBxdWVzdGlvbkNvdW50KTtcclxuICAgIH0gZWxzZSBpZiAodGFncy5sZW5ndGggPT0gMCkge1xyXG4gICAgICBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpXHJcbiAgICAgICAgLnNldCgnY291bnQnLCBxdWVzdGlvbkNvdW50KVxyXG4gICAgICAgIC5zZXQoJ2RpZmZpY3VsdHknLCBkaWZmaWN1bHR5LnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIGlmIChkaWZmaWN1bHR5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcclxuICAgICAgICAuc2V0KCdjb3VudCcsIHF1ZXN0aW9uQ291bnQpXHJcbiAgICAgICAgLnNldCgndGFncycsIEpTT04uc3RyaW5naWZ5KHRhZ3MpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcclxuICAgICAgICAuc2V0KCdjb3VudCcsIHF1ZXN0aW9uQ291bnQpXHJcbiAgICAgICAgLnNldCgndGFncycsIEpTT04uc3RyaW5naWZ5KHRhZ3MpKVxyXG4gICAgICAgIC5zZXQoJ2RpZmZpY3VsdHknLCBkaWZmaWN1bHR5LnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9odHRwXHJcbiAgICAgIC5nZXQ8UXVpelF1ZXN0aW9uW10+KGAke3RoaXMuX2NvbmZpZy5hcGlVcmx9L3F1aXpzZXNzaW9uYCwge1xyXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtYXBpdCA9IChpbnB1dDogUXVpelF1ZXN0aW9uQXBpW10pOiBRdWl6UXVlc3Rpb25bXSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5tYXAoKHF1ZXN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnF1ZXN0aW9uLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBxdWVzdGlvbi5pbWcubWFwKChwKSA9PiBuZXcgTWVkaWFNb2RlbChwKSksXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuIG1hcGl0KHJlc3BvbnNlKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlcykgPT4ge1xyXG4gICAgICAgICAgY3R4LnBhdGNoU3RhdGUoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbnM6IHJlcyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKFN0YXJ0UXVpelNlc3Npb24pXHJcbiAgcHVibGljIHN0YXJ0TmV3U2Vzc2lvbihcclxuICAgIHsgcGF0Y2hTdGF0ZSwgZ2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PFF1aXpTdGF0ZU1vZGVsPixcclxuICAgIHsgcXVlc3Rpb25Db3VudCB9OiBTdGFydFF1aXpTZXNzaW9uXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzZXNzaW9uUXVlc3Rpb25zOiBRdWl6UXVlc3Rpb25JblNlc3Npb25bXSA9IFtdO1xyXG4gICAgY29uc3QgcXVlc3Rpb25zID0gZ2V0U3RhdGUoKS5xdWVzdGlvbnM7XHJcblxyXG4gICAgcXVlc3Rpb25Db3VudCA9XHJcbiAgICAgIHF1ZXN0aW9uQ291bnQgPiBxdWVzdGlvbnMubGVuZ3RoID8gcXVlc3Rpb25zLmxlbmd0aCA6IHF1ZXN0aW9uQ291bnQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9uQ291bnQ7ICkge1xyXG4gICAgICBjb25zdCBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBxdWVzdGlvbnMubGVuZ3RoKTtcclxuICAgICAgaWYgKHNlc3Npb25RdWVzdGlvbnMuZmluZCgocSkgPT4gcS5pZCA9PT0gcXVlc3Rpb25zW3JuZF0uaWQpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgcm5kUXVlc3Rpb25zID0geyAuLi5xdWVzdGlvbnNbcm5kXSB9O1xyXG4gICAgICBybmRRdWVzdGlvbnMuYW5zd2VycyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHF1ZXN0aW9uc1tybmRdLmFuc3dlcnMubGVuZ3RoOyApIHtcclxuICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHF1ZXN0aW9uc1tybmRdLmFuc3dlcnMubGVuZ3RoXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBybmRRdWVzdGlvbnMuYW5zd2Vycy5maW5kKFxyXG4gICAgICAgICAgICAoYSkgPT4gYS5pZCA9PT0gcXVlc3Rpb25zW3JuZF0uYW5zd2Vyc1tyYW5kb21dLmlkXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgcm5kUXVlc3Rpb25zLmFuc3dlcnMucHVzaChxdWVzdGlvbnNbcm5kXS5hbnN3ZXJzW3JhbmRvbV0pO1xyXG4gICAgICAgIGorKztcclxuICAgICAgfVxyXG4gICAgICBzZXNzaW9uUXVlc3Rpb25zLnB1c2goeyBhbnN3ZXJlZDogMCwgLi4ucm5kUXVlc3Rpb25zIH0pO1xyXG4gICAgICBpKys7XHJcbiAgICB9XHJcbiAgICBwYXRjaFN0YXRlKHtcclxuICAgICAgc2Vzc2lvbjoge1xyXG4gICAgICAgIHByb2dyZXNzOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWVzdGlvbjogMCxcclxuICAgICAgICBxdWVzdGlvbnM6IHNlc3Npb25RdWVzdGlvbnMsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBBY3Rpb24oRW5kUXVpelNlc3Npb24pXHJcbiAgcHVibGljIGVuZFNlc3Npb24oeyBwYXRjaFN0YXRlIH06IFN0YXRlQ29udGV4dDxRdWl6U3RhdGVNb2RlbD4pIHtcclxuICAgIHBhdGNoU3RhdGUoe1xyXG4gICAgICBzZXNzaW9uOiBudWxsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKFF1aXpRdWVzdGlvbkFuc3dlcmVkKVxyXG4gIHB1YmxpYyBxdWVzdGlvbkFuc3dlcmVkKFxyXG4gICAgeyBwYXRjaFN0YXRlLCBnZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8UXVpelN0YXRlTW9kZWw+LFxyXG4gICAgeyBjb3JyZWN0IH06IFF1aXpRdWVzdGlvbkFuc3dlcmVkXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0geyAuLi4oZ2V0U3RhdGUoKS5zZXNzaW9uIGFzIFF1aXpTZXNzaW9uKSB9O1xyXG4gICAgY29uc3QgYW5zd2VyZWRRdWVzdGlvbiA9IHtcclxuICAgICAgLi4uc2Vzc2lvbi5xdWVzdGlvbnNbc2Vzc2lvbi5jdXJyZW50UXVlc3Rpb25dLFxyXG4gICAgICBhbnN3ZXJlZDogY29ycmVjdCBhcyAwIHwgLTEgfCAxLFxyXG4gICAgfTtcclxuICAgIHBhdGNoU3RhdGUoe1xyXG4gICAgICBzZXNzaW9uOiB7XHJcbiAgICAgICAgY3VycmVudFF1ZXN0aW9uOiBzZXNzaW9uLmN1cnJlbnRRdWVzdGlvbiArIDEsXHJcbiAgICAgICAgcHJvZ3Jlc3M6XHJcbiAgICAgICAgICAoMTAwLjAgLyBzZXNzaW9uLnF1ZXN0aW9ucy5sZW5ndGgpICogKHNlc3Npb24uY3VycmVudFF1ZXN0aW9uICsgMSksXHJcbiAgICAgICAgcXVlc3Rpb25zOiBzZXNzaW9uLnF1ZXN0aW9ucy5tYXAoKHEpID0+XHJcbiAgICAgICAgICBxLmlkID09PSBhbnN3ZXJlZFF1ZXN0aW9uLmlkID8gYW5zd2VyZWRRdWVzdGlvbiA6IHFcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
