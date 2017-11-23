import $ from 'zeptojs';
import URL from 'url-parse';
import SPM from '../lib/spm';
import { detector } from '../utils/';
import { CAMPAIGN, PAGE_MARK, API_HOST } from '../lib/config';

class History extends SPM {
  constructor(options) {
    super(options);
    this.spa && this.bind();
    this.report();
  }

  bind() {
    const that = this;
    const { history, addEventListener } = window;
    this._pushState = history.pushState;
    this._replaceState = history.replaceState;

    // proxy.pushState    
    history.pushState = function (state, title, link) {
      that.onHistoryChange(arguments);
      return that._pushState.apply(history, arguments);
    };

    // proxy.replaceState
    history.replaceState = function (state, title, link) {
      that.onHistoryChange(arguments);
      return that._replaceState.apply(history, arguments);
    };

    // listener.popstate
    addEventListener('popstate', this.onHistoryChange.bind(this));
  }

  unbind() {
    const { history, removeEventListener } = window;
    history.pushState = this._pushState;
    history.replaceState = this._replaceState;
    removeEventListener('popstate', this.onHistoryChange);
  }

  report() {
    const { href: url } = window.location;
    const { marker, lang } = this;
    const params = Object.assign(
      {
        site: {
          lang,
          url,
        },
      },
      marker
    );
    console.log(params);

    // $.ajax({
    //   url: API_HOST,
    //   type: 'post',
    //   contentType: 'application/json',
    //   data: JSON.stringify(params),
    //   success: function (res) {
    //     if (this.debug == true) {
    //       console.log('response data: ', res)
    //     }
    //   }
    // })
  }

  onHistoryChange(state) {
    setTimeout(() => {
      this.report();
    });
  }
}

export default History;
