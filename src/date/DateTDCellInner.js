/**
 * 日期表格-单元格组件
 * create by lgp
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
//拼装key
function getIdFromDate(date) {
    return `rc-calendar-${date.year()}-${date.month()}-${date.date()}`;
}

export default class DateTCell extends Component {
	static defaultProps = {

	}
	render(){
		const props = this.props;
		const {
			current,
			prefixCls,
			datas
		} = props;
		const dateClass = `${prefixCls}-date`;
		
		let childrenStep ;
		let radiusSpan ;
		let date =  current.date();

		childrenStep = _.map(datas, (item,index)=>{
			let { type, text, cateType } = item;

			if (cateType) {
				radiusSpan  = (
					<span className={`date-number date-cate-type-${cateType}`}>{date}</span>
				);
				text = "";	
			} 
			return (
				<div key={index} className={`pps-paiban-item status-${type}`}>
                	{text}
            	</div>
			);
		});

		let chidrenEl = childrenStep.length > 0 ? (
				<div className="pps-paiban-group">
					{childrenStep}
                </div>       
            ) : null;
		
		!radiusSpan && (radiusSpan  = (<span className={`date-number`}>{date}</span>));
		
		
		return (
			<div  key={getIdFromDate(current)}
                className={dateClass}
                >
                { radiusSpan }
                { chidrenEl }
                
            </div>
			
		);
	}
}