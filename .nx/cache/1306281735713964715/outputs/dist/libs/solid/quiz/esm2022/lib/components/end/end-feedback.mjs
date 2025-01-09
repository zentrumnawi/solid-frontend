export const QuizFeedback = {
  e0: [
    'Das war zum Aufwärmen - die nächste Runde wird bestimmt besser!',
    'Kein Grund zur Frustration - einfach durchatmen und die nächste Runde starten.',
    'Noch ein Kaffee und eine neue Chance?',
  ],
  lt25: [
    '{{correctPercentage}}% richtig - da ist noch etwas Luft nach oben...',
    'Einfach noch eine Runde starten - da geht bestimmt noch was!',
    'Beim nächsten Mal sind bestimmt mehr Antworten richtig!',
  ],
  lt50: [
    '{{correctPercentage}}% - noch nicht die Hälfte, aber da war schon Schönes dabei.',
    'Vielleicht braucht es noch ein bisschen Übung?',
    'In der nächsten Runde werden es bestimmt noch mehr richtige Antworten!',
  ],
  lt75: [
    '{{correctPercentage}}% ist ein ganz gutes Ergebnis! Geht da noch mehr?',
    'Das klappt ja ganz gut, aber ein bisschen mehr wird es beim nächsten Mal bestimmt!',
    'Die Hälfte war mindestens richtig! Eine Runde geht bestimmt noch.',
  ],
  ge75: [
    '{{correctPercentage}}%! Das ist ein prima Ergebnis.',
    'Beim nächsten Mal werden bestimmt die 100% geknackt!',
    'Nicht schlecht - ein paar % fehlen noch zum Gipfel!',
  ],
  e100: [
    'Alle Fragen richtig!? Beeindruckend...',
    'Na, da kann man wohl nicht mehr viel beibringen.',
    'Na? Klappt es mit den 100% auch bei der nächsten Runde?',
  ],
  nan: [
    'Rock bottom, I hope for your sake you nuked that level!',
    'Wenn gar keine Frage beantwortet wurde, gibt es auch keine Gummipunkte!',
    'Ein verweigerter Selbsttest? Come on!',
  ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLWZlZWRiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9xdWl6L3NyYy9saWIvY29tcG9uZW50cy9lbmQvZW5kLWZlZWRiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixFQUFFLEVBQUU7UUFDRixpRUFBaUU7UUFDakUsZ0ZBQWdGO1FBQ2hGLHVDQUF1QztLQUN4QztJQUNELElBQUksRUFBRTtRQUNKLHNFQUFzRTtRQUN0RSw4REFBOEQ7UUFDOUQseURBQXlEO0tBQzFEO0lBQ0QsSUFBSSxFQUFFO1FBQ0osa0ZBQWtGO1FBQ2xGLGdEQUFnRDtRQUNoRCx3RUFBd0U7S0FDekU7SUFDRCxJQUFJLEVBQUU7UUFDSix3RUFBd0U7UUFDeEUsb0ZBQW9GO1FBQ3BGLG1FQUFtRTtLQUNwRTtJQUNELElBQUksRUFBRTtRQUNKLHFEQUFxRDtRQUNyRCxzREFBc0Q7UUFDdEQscURBQXFEO0tBQ3REO0lBQ0QsSUFBSSxFQUFFO1FBQ0osd0NBQXdDO1FBQ3hDLGtEQUFrRDtRQUNsRCx5REFBeUQ7S0FDMUQ7SUFDRCxHQUFHLEVBQUU7UUFDSCx5REFBeUQ7UUFDekQseUVBQXlFO1FBQ3pFLHVDQUF1QztLQUN4QztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUXVpekZlZWRiYWNrID0ge1xyXG4gIGUwOiBbXHJcbiAgICAnRGFzIHdhciB6dW0gQXVmd8Okcm1lbiAtIGRpZSBuw6RjaHN0ZSBSdW5kZSB3aXJkIGJlc3RpbW10IGJlc3NlciEnLFxyXG4gICAgJ0tlaW4gR3J1bmQgenVyIEZydXN0cmF0aW9uIC0gZWluZmFjaCBkdXJjaGF0bWVuIHVuZCBkaWUgbsOkY2hzdGUgUnVuZGUgc3RhcnRlbi4nLFxyXG4gICAgJ05vY2ggZWluIEthZmZlZSB1bmQgZWluZSBuZXVlIENoYW5jZT8nLFxyXG4gIF0sXHJcbiAgbHQyNTogW1xyXG4gICAgJ3t7Y29ycmVjdFBlcmNlbnRhZ2V9fSUgcmljaHRpZyAtIGRhIGlzdCBub2NoIGV0d2FzIEx1ZnQgbmFjaCBvYmVuLi4uJyxcclxuICAgICdFaW5mYWNoIG5vY2ggZWluZSBSdW5kZSBzdGFydGVuIC0gZGEgZ2VodCBiZXN0aW1tdCBub2NoIHdhcyEnLFxyXG4gICAgJ0JlaW0gbsOkY2hzdGVuIE1hbCBzaW5kIGJlc3RpbW10IG1laHIgQW50d29ydGVuIHJpY2h0aWchJyxcclxuICBdLFxyXG4gIGx0NTA6IFtcclxuICAgICd7e2NvcnJlY3RQZXJjZW50YWdlfX0lIC0gbm9jaCBuaWNodCBkaWUgSMOkbGZ0ZSwgYWJlciBkYSB3YXIgc2Nob24gU2Now7ZuZXMgZGFiZWkuJyxcclxuICAgICdWaWVsbGVpY2h0IGJyYXVjaHQgZXMgbm9jaCBlaW4gYmlzc2NoZW4gw5xidW5nPycsXHJcbiAgICAnSW4gZGVyIG7DpGNoc3RlbiBSdW5kZSB3ZXJkZW4gZXMgYmVzdGltbXQgbm9jaCBtZWhyIHJpY2h0aWdlIEFudHdvcnRlbiEnLFxyXG4gIF0sXHJcbiAgbHQ3NTogW1xyXG4gICAgJ3t7Y29ycmVjdFBlcmNlbnRhZ2V9fSUgaXN0IGVpbiBnYW56IGd1dGVzIEVyZ2VibmlzISBHZWh0IGRhIG5vY2ggbWVocj8nLFxyXG4gICAgJ0RhcyBrbGFwcHQgamEgZ2FueiBndXQsIGFiZXIgZWluIGJpc3NjaGVuIG1laHIgd2lyZCBlcyBiZWltIG7DpGNoc3RlbiBNYWwgYmVzdGltbXQhJyxcclxuICAgICdEaWUgSMOkbGZ0ZSB3YXIgbWluZGVzdGVucyByaWNodGlnISBFaW5lIFJ1bmRlIGdlaHQgYmVzdGltbXQgbm9jaC4nLFxyXG4gIF0sXHJcbiAgZ2U3NTogW1xyXG4gICAgJ3t7Y29ycmVjdFBlcmNlbnRhZ2V9fSUhIERhcyBpc3QgZWluIHByaW1hIEVyZ2VibmlzLicsXHJcbiAgICAnQmVpbSBuw6RjaHN0ZW4gTWFsIHdlcmRlbiBiZXN0aW1tdCBkaWUgMTAwJSBnZWtuYWNrdCEnLFxyXG4gICAgJ05pY2h0IHNjaGxlY2h0IC0gZWluIHBhYXIgJSBmZWhsZW4gbm9jaCB6dW0gR2lwZmVsIScsXHJcbiAgXSxcclxuICBlMTAwOiBbXHJcbiAgICAnQWxsZSBGcmFnZW4gcmljaHRpZyE/IEJlZWluZHJ1Y2tlbmQuLi4nLFxyXG4gICAgJ05hLCBkYSBrYW5uIG1hbiB3b2hsIG5pY2h0IG1laHIgdmllbCBiZWlicmluZ2VuLicsXHJcbiAgICAnTmE/IEtsYXBwdCBlcyBtaXQgZGVuIDEwMCUgYXVjaCBiZWkgZGVyIG7DpGNoc3RlbiBSdW5kZT8nLFxyXG4gIF0sXHJcbiAgbmFuOiBbXHJcbiAgICAnUm9jayBib3R0b20sIEkgaG9wZSBmb3IgeW91ciBzYWtlIHlvdSBudWtlZCB0aGF0IGxldmVsIScsXHJcbiAgICAnV2VubiBnYXIga2VpbmUgRnJhZ2UgYmVhbnR3b3J0ZXQgd3VyZGUsIGdpYnQgZXMgYXVjaCBrZWluZSBHdW1taXB1bmt0ZSEnLFxyXG4gICAgJ0VpbiB2ZXJ3ZWlnZXJ0ZXIgU2VsYnN0dGVzdD8gQ29tZSBvbiEnLFxyXG4gIF0sXHJcbn07XHJcbiJdfQ==
