/* eslint-disable @typescript-eslint/no-explicit-any */
// Process $overline$

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}$-])/g;

function subscript(state: any, silent: any) {
  let found, token;
  const max = state.posMax,
    start = state.pos;

  if (state.src.charCodeAt(start) !== 0x24 /* $ */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x24 /* $ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  const content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push('over_open', 'span', 1);
  token.attrPush(['class', 'md-overline']);
  token.markup = '$';

  token = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token = state.push('over_close', 'span', -1);
  token.markup = '$';

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}

export function overlinePlugin(md: any) {
  md.inline.ruler.after('emphasis', 'over', subscript);
}
