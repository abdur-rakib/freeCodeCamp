const stringify = require('remark-stringify');
const { root } = require('mdast-builder');
const unified = require('unified');
const { code, inlineCode } = require('mdast-util-to-markdown/lib/handle');
const remarkParse = require('remark-parse');
const remarkStringify = require('remark-stringify');

const notranslateStart = '<notranslate>';
const notranslateEnd = '</notranslate>';

const wrapInlineCode = (...args) =>
  notranslateStart + inlineCode(...args) + notranslateEnd;

const wrapCode = (...args) => `${notranslateStart}
${code(...args)}
${notranslateEnd}`;

const annotateCode = md =>
  unified()
    .use(remarkParse)
    .use(remarkStringify, {
      fences: true,
      emphasis: '*',
      handlers: { inlineCode: wrapInlineCode, code: wrapCode }
    })
    .processSync(md).contents;

const stringifyMd = nodes =>
  unified()
    .use(stringify, { fences: true, emphasis: '*' })
    .stringify(root(nodes));

module.exports.stringifyMd = stringifyMd;
module.exports.annotateCode = annotateCode;
module.exports.notranslateStart = notranslateStart;
module.exports.notranslateEnd = notranslateEnd;
