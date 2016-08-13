import React, { PropTypes, Component } from 'react';
import DateConstants from './DateConstants';
import DateTDCellInner from './DateTDCellInner';
import { getTitleString, getTodayTime, inCurrentMonthYear } from '../util/index';
import _ from 'lodash';


function noop() {

}


export default class DateTBody extends Component {
    constructor(props){
        super(props);

        this.props = props;
        
    }
    render(){
        const props = this.props;

        const {
            contentRender, //内容渲染函数
            prefixCls, // 样式前缀
            value, //当前年月
            datas, //数据
            dateRender //日期渲染函数，可自定义
        } = props;
        
       
        
        let iIndex;
        let jIndex;
        let current;
       
        const cellClass = `${prefixCls}-cell`;
        const inRangeClass = `${prefixCls}-in-range-cell`;
        const outRangeClass = `${prefixCls}-date-outer`;
        
        //获取dateTable数据
        const dateTable = this.getTableData(value, current);
        const _dates = this._formateDatas(datas);
        const tableHtml = [];
        
        let passed = 0;
        //渲染表格内容
        for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
          
            const dateCells = [];
           
            for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
                let next = null;
                let last = null;
                let cls = cellClass;
                
                current = dateTable[passed];
                //防止越界
                if (jIndex < DateConstants.DATE_COL_COUNT ) {
                    next = dateTable[passed + 1];
                }
                
                if (jIndex > 0) {
                    last = dateTable[passed - 1];
                }

                //是否在当前月份内
                const isInCurrentMonth = inCurrentMonthYear(current, value);
                //添加相应的样式
                isInCurrentMonth ? cls += ` ${inRangeClass}` : cls += ` ${outRangeClass}`;
                //渲染内容
                const dateHtml =  dateRender ? dateRender(current, value) : this._normalRender(current, _dates, prefixCls);

                dateCells.push(
                    <td
                        key={passed}
                        onClick={ this.handleDayClick.bind(this, current, isInCurrentMonth)}
                        onMouseEnter = { this.handleCellMouseEnter.bind(this, current, isInCurrentMonth)}
                        role = "gridcell"
                        title={ getTitleString(current) } 
                        className={cls}
                    >
                        { dateHtml }
                    </td>
                );
                passed++;
            }

            tableHtml.push(
                <tr
                  key={'row'+iIndex}
                  role="row"
                >
                    { dateCells }
                </tr>
            );
        }

        return (
            <tbody className={`${prefixCls}-tbody`}>
                {tableHtml}
            </tbody>
        );
    }
    //处理数据，返回符合要求的数据格式
    _formateDatas(datas) {
        const { paiban } = datas;
        const { cates } = datas;
        let _dates = []
       
         _.each(paiban, function(item){
            let { text, type, dates } = item
            
            _.each(dates, function(ditem){
                _dates.push({
                    text:text,
                    value:ditem,
                    type:type
                });
            })
        });

        _.each(cates, function(item){
            let { text, cateType, dates } = item
            
            _.each(dates, function(ditem){
                _dates.push({
                    text:text,
                    value:ditem,
                    cateType:cateType
                });
            })
        });
        return _dates;
    }
    /**
      * 返回表格所需要的表格日期
      **/
    getTableData(value, current){
        let passed = 0;
        let iIndex;
        let jIndex;
       
        const dateTable = [];
        const month1 = value.clone();
        month1.date(1);
        const day = month1.day();
        
        const lastMonthDiffDay = (day + 6 - value.localeData().firstDayOfWeek()) % 7;
      
        const lastMonth1 = month1.clone();

        lastMonth1.add(0 - lastMonthDiffDay, 'days');
        
        
        
        for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
            for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
                current = lastMonth1;
                if (passed) {
                    current = current.clone();
                    current.add(passed, 'days');
                }
                dateTable.push(current);
                passed++;
            }
        }

        return dateTable;
    }
    /**
     * 单元格单击事件
     */
    handleDayClick(current, isInCurrentMonth) {
        const formatStr = current.format("YYYY-MM-DD");
        const { handleDayClick, triggerRule } = this.props;
        if (!triggerRule && !isInCurrentMonth) {
            return ;
        }
        handleDayClick  && handleDayClick(current, formatStr, isInCurrentMonth);

    }
    //鼠标悬浮事件
    handleCellMouseEnter(current, isInCurrentMonth) {
        const formatStr = current.format("YYYY-MM-DD");
        const { onDayHover, triggerRule } = this.props;
        if (!triggerRule && !isInCurrentMonth) {
            return ;
        }
        onDayHover  && onDayHover(current, formatStr, isInCurrentMonth);
    }
    _normalRender(current, _dates, prefixCls){

        const formatDateStr = current.format("YYYY-MM-DD");
        
        let groupData = _.filter(_dates, function(item){
              return item.value == formatDateStr;
        });

        return (
            <DateTDCellInner prefixCls={prefixCls} current={current} datas={groupData} /> 
        );
    }

   
}

DateTBody.defaultProps = {
    onDayHover:noop
}
