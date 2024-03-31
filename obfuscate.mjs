/**
 * Obfuscate a page (with the puncations and
 * spaces kept in place).
 *
 * The code has been optimized – it took only
 * 344ms to obfuscate the ES2025 spec:
 * https://tc39.es/ecma262, and 558µs to
 * obfuscate https://pan93.com (in Safari 17.4.1).
 *
 * @author pan93412
 * @license Apache-2.0
 * @version 1.0.0
 */

//@ts-check

const deobfuscateLock =
  globalThis.location && location.href.endsWith("#deobfuscate");
const punctuation = new Set([
  ",",
  ".",
  "?",
  "!",
  ":",
  ";",
  "—",
  "–",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  "<",
  ">",
  "“",
  "”",
  "‘",
  "’",
  "…",
  "•",
  "·",
  "—",
  "–",
  "―",
  "-",
]);

/**
 * Obfuscate a string.
 *
 * @param {string} s
 * @returns {string}
 */
export function obfuscate(s) {
  if (deobfuscateLock) {
    return s;
  }

  // If s has space, we obfuscate each string snippet.
  if (s.includes(" ")) {
    return s.split(" ").map(obfuscate).join(" ");
  }

  // The puncations such as comma, period, question mark,
  // exclamation mark, etc. should be kept in place.

  const charsOfString = [...s];

  // Start a shuffle of the string.
  for (let i = 0; i < charsOfString.length; i++) {
    // If the character is a punctuation, skip it (keep it in place)
    if (punctuation.has(charsOfString[i])) {
      continue;
    }

    // Find a random index to swap with.
    let j = -1;
    do j = Math.floor(Math.random() * charsOfString.length);
    while (punctuation.has(charsOfString[j]));

    [charsOfString[i], charsOfString[j]] = [charsOfString[j], charsOfString[i]];
  }

  return charsOfString.join("");
}

/**
 * Obfuscate the full page.
 *
 * @returns {void}
 */
export default function obfuscateFullPage() {
  if (deobfuscateLock) {
    return;
  }

  // Find all the text node.
  const obfuscatableNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  while (obfuscatableNodes.nextNode()) {
    const node = /** @type {Text} */ (obfuscatableNodes.currentNode);
    if (!node.data) {
      continue;
    }

    node.data = obfuscate(node.data);
  }
}

export function benchmarkObfuscateFullPage() {
  console.time("obfuscateFullPage");
  obfuscateFullPage();
  console.timeEnd("obfuscateFullPage");
}
