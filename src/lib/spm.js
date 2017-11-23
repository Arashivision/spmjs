import URL from 'url-parse';
import md5 from 'crypto-js/md5';
import queryString from 'query-string';
import { API_HOST, CAMPAIGN, PAGE_MARK } from './config';

class SPM {
  constructor(options) {
    const { id, spa, lang, debug } = options;
    const { location } = window;
    const { href } = location;

    this.id = id || 0;
    this.lang = lang || '';
    this.spa = spa || false;
    this.debug = debug || false;
  }

  get inscp() {
    if (this.spa && this._inscp) {
      return this._inscp;
    }
    const href = window.location.href;
    const url = new URL(href, true);
    const inscp = url.query[CAMPAIGN] || '';
    inscp && (this._inscp = inscp);
    return inscp;
  }

  get inspm() {
    const href = window.location.href;
    const url = new URL(href, true);
    const { pathname, host } = url;
    const _pathname = (() =>
      (pathname.endsWith('/') && pathname.slice(0, -1)) || pathname)();
    const _id = this.id || 0;
    const _host = this.getUniqueId(host);
    const _path = this.getUniqueId(_pathname);
    return encodeURIComponent(`${_host}.${_path}.0.${_id}`);
  }

  get marker() {
    const { spa, inscp, inspm } = this;
    const params = {};
    inscp && (params[CAMPAIGN] = inscp);
    inspm && (params[PAGE_MARK] = inspm);
    return params;
  }

  getUniqueId(str) {
    return md5(str)
      .toString()
      .slice(0, 6);
  }
}

export default SPM;
