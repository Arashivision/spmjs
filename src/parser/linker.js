import $ from 'zeptojs';
import URL from 'url-parse';
import SPM from '../lib/spm';
import { detector } from '../utils/';
import { DATA_SPM_ID } from '../lib/config';

class Linker extends SPM {
  constructor(options) {
    super(options);
    this.handler = this.clickHandleFactory();
    this.bind();
  }

  bind() {
    $('body').on('click', 'a', this.handler);
  }

  unbind() {
    $('body').off('click', 'a', this.handler);
  }

  clickHandleFactory() {
    const that = this;
    return function(e) {
      // that.unbindClick()
      const spmId = $(this).attr(DATA_SPM_ID);
      // e.preventDefault();
      const parsedHref = that.parseHref(this, spmId);
      if (!parsedHref) {
        return;
      }
      that.updateLink(this, parsedHref);
    };
  }

  parseUrl(href, addr) {
    const marker = this.marker;
    const url = new URL(href, true);
    url.query = Object.assign({}, url.query, marker);
    return url.toString();
  }

  parseHref(ele, spmId) {
    const $ele = $(ele);
    const href = $ele[0].href;

    const isNotbelongsToInsta360 = () => {
      const _href = href.split('?')[0];
      return !detector(_href, 'activeSite');
    };

    const isNotDevLink = () => {
      return !detector(href, 'devLink');
    };

    const isJavasciprt = () => {
      return detector(href, 'javascript');
    };

    const isHashLink = () => {
      const _hash = $ele.attr('href');
      return detector(_hash, 'startWithHash');
    };

    if (
      isHashLink() ||
      isJavasciprt() ||
      (isNotbelongsToInsta360() && isNotDevLink())
    ) {
      return false;
    }

    return this.parseUrl(href);
  }

  updateLink(ele, href) {
    ele.href = href;
  }
}

export default Linker;
