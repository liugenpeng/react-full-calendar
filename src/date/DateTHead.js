import React, { Component } from 'react';
import DateConstants from './DateConstants';

import moment from 'moment';

export default class DateTHead extends Component {
    render() {
        const props = this.props;
        const value = props.value ;
        const localeData = value.localeData();
        const prefixCls = props.prefixCls;
        const veryShortWeekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        const firstDayOfWeek = localeData.firstDayOfWeek();
        let showWeekNumberEl;

        const weekDaysEls = veryShortWeekdays.map((day, xindex) => {
          return (
              <th
                key={xindex}
                role="columnheader"
                title={day}
                className={`${prefixCls}-column-header`}
              >
                  <span className={`${prefixCls}-column-header-inner`}>
                      {day}
                  </span>
              </th>);
        });
        return (
            <thead>
                <tr role="row">
                    {weekDaysEls}
                </tr>
            </thead>
        );
    }
}
