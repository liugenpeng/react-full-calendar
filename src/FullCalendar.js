import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import DateTable from './date/DateTable';
import { getNow } from './util/index';

export default class  FullCalendar extends Component {
    static defaultProps = {
        defaultType: 'date',
        fullscreen: true,
        prefixCls: 'rc-calendar',
        visible:true,
        type:'date'
    }
    static propTypes = {
        defaultType: PropTypes.string,
        type: PropTypes.string,
        defaultValue: PropTypes.object,
        prefixCls: PropTypes.string,
        fullscreen: PropTypes.bool,
        dateCellRender: PropTypes.func

    }
    constructor(props,context){
        super(props);
       
        let type;
        if ('type' in this.props) {
            type = this.props.type;
        } else {
            type = this.props.defaultType;
        }
        const value = props.value || props.defaultValue || getNow();
        
        this.state = {
            type,
            value
        };

    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    renderRoot(newProps) {
        const props = this.props;
        const prefixCls = props.prefixCls;

        const className = {
              [prefixCls]: 1,
              [`${prefixCls}-hidden`]: !props.visible,
              [props.className]: !!props.className,
              [newProps.className]: !!newProps.className
        };

        return (
            <div
                ref="root"
                className={`${classnames(className)}`}
                style={this.props.style}
                tabIndex="0"
                onKeyDown={this.onKeyDown}
            >
                {newProps.children}
            </div>
        );
    }
    render(){

        const props = this.props;
        const { 
            prefixCls, 
            fullscreen,
            onDayHover,
            dateCellContentRender,
            dateCellRender,
            handleDayClick,
            datas,
            triggerRule
        } = props;
        
        const className = [`${prefixCls}-full`];
        
        const { value, type } = this.state;

        const table = (
            <DateTable
                dateRender={dateCellRender}
                contentRender={dateCellContentRender}
                handleDayClick={handleDayClick}
                onDayHover={onDayHover}
                prefixCls={prefixCls}
                datas={datas}
                triggerRule={triggerRule}
                value={value}
            />
        ) ;

        const children = [
            (
                <div key="calendar-body" className={`${prefixCls}-calendar-body`}>
                    { table }
                </div>
            )
        ];


        fullscreen &&  className.push(`${prefixCls}-fullscreen`);

        return this.renderRoot({
            children,
            className: className.join(' '),
        });
    }
}


