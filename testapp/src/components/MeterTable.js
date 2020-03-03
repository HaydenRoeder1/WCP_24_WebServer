import React, { Component } from 'react'
import MeterMapForm from './MeterMapForm'

class MeterTable extends Component{
    constructor(props){
        super(props);
    }
	  state = {
        meters: [],
        cur_meter: 1,
        cur_meter_data: []
    }

    getData = async () => {
        const api_call = await fetch(this.props.server+"getMeterList").catch()
        const ret_data1 = await api_call.json();
        var meter_number = 1;
        var data = {meter_id: meter_number}
        const api_call2 = await fetch(this.props.server+"getMeterData", {
          method: 'post', 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const ret_data2 = await api_call2.json();
        this.setState({
            meters: ret_data1,
            cur_meter: 1,
            cur_meter_data: ret_data2
        })
        this.props.setParentState(ret_data1)
    }
    addMeter = async () => {
        var data = {ip_address: "SIM 192.168.0." + this.state.meters.length + 1}
        const api_call = await fetch('http://127.0.0.1:3001/addSimMeter', {
            method: 'post', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch();
        const api_call2 = await fetch(this.props.server+"getMeterList").catch()
        const ret_data = await api_call2.json();
        this.setState({
            meters: ret_data,
            cur_meter: this.state.cur_meter,
            cur_meter_data: this.state.cur_meter_data
        })
        this.props.setParentState({
          meters: ret_data
        })
    }

    deleteMeters = async () => {
        const api_call = await fetch(this.props.server+"deleteAllMeters").catch()
        const data = await api_call.json();
        const api_call2 = await fetch(this.props.server+"getMeterList").catch()
        const ret_data = await api_call2.json();
        this.setState({
            meters: ret_data,
            cur_meter: this.state.cur_meter,
            cur_meter_data: this.state.cur_meter_data
        })
        this.props.setParentState({
          meters: ret_data
        })
    }

    toggleMeter = async (e) => {
      var meter_id = parseInt(e.target.name.substring(e.target.name.indexOf(' '))) + 1;
      var data = {meter: meter_id}
      const api_call = await fetch(this.props.server+"toggleSimMeter", {
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const api_call2 = await fetch(this.props.server+"getMeterList").catch()
      const ret_data = await api_call2.json();
      this.setState({
          meters: ret_data,
          cur_meter: this.state.cur_meter,
          cur_meter_data: this.state.cur_meter_data
      })
      this.props.setParentState({
        meters: ret_data
      })
    }

    getMeterData = async (e) => {
      var meter_number = parseInt(e.target.name.substring(e.target.name.indexOf(' '))) + 1;
      var data = {meter_id: meter_number}
      const api_call = await fetch(this.props.server+"getMeterData", {
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const ret_data = await api_call.json();
      this.setState({
        meters: this.state.meters,
        cur_meter: meter_number,
        cur_meter_data: ret_data
      })
      this.props.setParentState({
        meters: this.state.meters
      })
      console.log(ret_data);
    }
    
    componentDidMount(){
      this.getData();
    }
    render(){
        return (
            <div className = {"meterTable"}>
                <button className = {"controlButton"} onClick = {this.addMeter}>Add Simulated Meter</button>
                <button className = {"controlButton"} onClick = {this.getData}>Update Data</button>
                <button className = {"controlButton"} onClick = {this.deleteMeters}>Delete Meters</button>
                <div style = {{minHeight: "2vh"}}/>
                <table>
                  <thead>
                    <tr>
                      <th>Meter ID</th>
                      <th>Meter IP</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.meters.map((e, i) => {
                      return(<tr key = {i.toString()}>
                                <td><button name = {"meterSelectButton " + i.toString()} onClick = {this.getMeterData}>{e.id}</button></td>
                                <td>{e.meterIP}</td>
                                <td><button name = {"toggleButton " + i.toString()}onClick = {this.toggleMeter}>{e.active}</button></td>
                              </tr>
                            )
                      })
                    }
                  </tbody>
                </table>

                <div style = {{minHeight: "5vh"}}/>
                <MeterMapForm server = {this.props.server} />
                <div style = {{minHeight: "5vh"}}/>
    
                
                <h1 className = "subHeader">Meter {this.state.cur_meter}</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Time Stamp</th>
                      <th>Real Power Min</th>
                      <th>Real Power Max</th>
                      <th>Real Power Avg</th>
                      <th>Reactive Power Min</th>
                      <th>Reactive Power Max</th>
                      <th>Reactive Power Avg</th>
                      <th>Voltage Min</th>
                      <th>Voltage Max</th>
                      <th>Voltage Avg</th>
                      <th>Current Min</th>
                      <th>Current Max</th>
                      <th>Current Avg</th>
                      <th>Energy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cur_meter_data.map((e, i) => {
                      return(<tr key = {i.toString()}>
                                <td>{e.timestamp}</td>
                                <td>{e.realPowerMin}</td>
                                <td>{e.realPowerMax}</td>
                                <td>{e.realPowerAvg}</td>
                                <td>{e.reactivePowerMin}</td>
                                <td>{e.reactivePowerMax}</td>
                                <td>{e.reactivePowerAvg}</td>
                                <td>{e.voltageMin}</td>
                                <td>{e.voltageMax}</td>
                                <td>{e.voltageAvg}</td>
                                <td>{e.currentMin}</td>
                                <td>{e.currentMax}</td>
                                <td>{e.currentAvg}</td>
                                <td>{e.energy}</td>
                              </tr>
                            )
                      })
                    }
                  </tbody>
                </table>
            </div>
            
        );
    }
}

export default MeterTable;