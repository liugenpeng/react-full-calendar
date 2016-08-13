import React, { Component } from 'react';
import FullCalendar  from '../../src/FullCalendar';
import moment from 'moment';


export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			now: new moment(),
			datas:{
	          	paiban:[
	          	  	{
	          	  		type:"1",
	          	  		text:'早班',
	          	  		dates:['2016-08-01', '2016-08-02', '2016-08-05','2016-08-06']

	          	  	},
	          	  	{
	          	  		type:"2",
	          	  		text:'晚班',
	          	  		dates:['2016-08-03', '2016-08-04']
	          	  	}
	          	],
	          	cates:[
	          		{
	          			cateType:'1',
	          			text:'节假日',
	          			dates:['2016-08-06', '2016-08-08']
	          		},
	          		{
	          			cateType:'2',
	          			text:'休息日',
	          			dates:['2016-08-11', '2016-08-12']
	          		},
	          		{
	          			cateType:'3',
	          			text:'公休日',
	          			dates:['2016-08-22', '2016-08-18']
	          		}
	          	]
	        }
		}
	}
	handleDayClick(...args){
		
		this.setState({
			datas:{
				paiban:[
	          	  	{
	          	  		type:"1",
	          	  		text:'早班',
	          	  		dates:['2016-08-01', '2016-08-02', '2016-08-05','2016-08-06','2016-08-10']

	          	  	},
	          	  	{
	          	  		type:"2",
	          	  		text:'晚班',
	          	  		dates:['2016-08-03', '2016-08-04', '2016-08-31']
	          	  	}
	          	],
	          	cates:[
	          		{
	          			cateType:'1',
	          			text:'节假日',
	          			dates:['2016-08-06', '2016-08-08', '2016-08-12', '2016-08-16']
	          		},
	          		{
	          			cateType:'2',
	          			text:'休息日',
	          			dates:['2016-08-11', '2016-08-12']
	          		},
	          		{
	          			cateType:'3',
	          			text:'公休日',
	          			dates:['2016-08-22', '2016-08-18']
	          		}
	          	]
			}
		});
	}
	onSelect(e) {
		var value = e.target.value;
		this.setState({
			now:new moment(value)
		});
	}
	render() {
		const {
			now,
			datas
		} = this.state;
		
	    return (
		    <div style={{ zIndex: 1000, position: 'relative' }}>
		   		<select onChange={this.onSelect.bind(this)} value={now.format('YYYY-MM')}>
		   			<option value="2016-08">2016-08</option>
		   			<option value="2016-09">2016-09</option>
		   			<option value="2016-10">2016-10</option>
		   		</select>
			    <FullCalendar
			        style={{ margin: 30 }}
			        handleDayClick={this.handleDayClick.bind(this)}
			        triggerRule={false}
			        value= {now}
			        datas= {datas}
			        fullscreen={true}
			        defaultValue={now}
			        type={'date'}
			    />
		    </div>
	    );
	}
}
