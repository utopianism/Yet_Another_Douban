// @flow

import moment from 'moment';


function localeMoment() {
  moment.locale('zh', {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    relativeTime: {
      past: '%s前',
      s: '几秒',
      m: '1分',
      mm: '%d分',
      h: '1时',
      hh: '%d 时',
      d: '1天',
      dd: '%d天',
      M: '1个月',
      MM: '%d个月',
      y: '1年',
      yy: '%d年',
    },
  });
}

export { localeMoment };
