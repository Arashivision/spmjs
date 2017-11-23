const RULES = {
  activeSite: /insta360/g,
  devLink: /(\/\/localhost)|(\/\/127\.0\.0\.1)|(\/\/0\.0\.0\.0)|(\/\/192)/g,
  pathWithSlant: /.+\/$/g,
  javascript: /^javascript\:/g,
  startWithHash: /^#/g,
};

const detector = (url, rule) => {
  const _rule = RULES[rule];
  if (!_rule) {
    return false;
  }
  return _rule.test(url);
};

export { detector };
