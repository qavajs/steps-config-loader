import { defineParameterType } from "@cucumber/cucumber";
import memory from "@qavajs/memory";

defineParameterType({
  name: "memory",
  regexp: /'(.+)'/,
  transformer: (p: string) => memory.getValue(p),
});

/**
 * Used for returning key code by key name
 */
defineParameterType({
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  transformer(keyName: string) {
    const KEYS: any = {
      Enter: "Enter",
      "Ctrl+A": process.platform === "darwin" ? ["Meta", "a"] : ["\uE009", "a"],
      Tab: "Tab",
      ArrowRight: "ArrowRight",
      ArrowLeft: "ArrowLeft",
    };
    return KEYS[keyName];
  },
  name: "key",
  useForSnippets: false,
});

/**
 * Used for returning chai assertion condition
 */
defineParameterType({
  regexp:
    /exist|be enabled|be displayed|be clickable|be focused|be displayed in viewport/,
  transformer(condition: string) {
    const CONDITIONS: any = {
      exist: "waitForExist",
      "be enabled": "waitForEnabled",
      "be displayed": "waitForDisplayed",
      "be clickable": "waitForClickable",
      "be focused": "waitForElementFocused",
      "be displayed in viewport": "waitForElementDisplayedInViewport",
    };
    return CONDITIONS[condition];
  },
  name: "wait condition",
  useForSnippets: false,
});

/**
 * Used for returning chai assertion condition
 */
defineParameterType({
  regexp: /be displayed|be clickable|be focused|exist|be displayed in viewport/,
  transformer(condition: string) {
    const CONDITIONS: any = {
      "be displayed": "isDisplayed",
      "be clickable": "isClickable",
      exist: "isExisting",
      "be focused": "isFocused",
      "be displayed in viewport": "isDisplayedInViewport",
    };
    return CONDITIONS[condition];
  },
  name: "expect condition",
  useForSnippets: false,
});

/**
 * Used for returning chai assertion condition
 */
defineParameterType({
  regexp: /not |/,
  transformer(negation: string) {
    return !!negation;
  },
  name: "negation",
  useForSnippets: false,
});

/**
 * Used for returning ignoring case condition
 */
defineParameterType({
  regexp: /| ignoring case/,
  transformer(condition: string) {
    return !!condition;
  },
  name: "case sensitive",
  useForSnippets: false,
});

/**
 * Used to compare numbers
 */
defineParameterType({
  regexp: /equal|below|above/,
  transformer(condition: string) {
    const CONDITIONS: any = {
      equal: "equal",
      below: "isBelow",
      above: "isAbove",
    };
    return CONDITIONS[condition];
  },
  name: "number comparison",
  useForSnippets: false,
});
