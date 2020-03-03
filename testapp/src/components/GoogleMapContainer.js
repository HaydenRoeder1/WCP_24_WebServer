import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class GoogleMapContainer extends Component{
    static defaultProps = {
        center: {
            lat: 42.0894288,
            lng: -75.9694885
        },
        zoom: 15
    };
    state = {
        data: {
            positions: [
                {
                    lat: 42.0894288,
                    lng: -75.9694885,
                    weight: 1,
                },
            ],
            options:{
                opacity: 1,
                radius: 10
            }
        }
    }

    updateMapData = async () => {
        var data_points = new Array();
        const api_call = await fetch(this.props.server+"getMeterMap").catch()
        const ret_data1 = await api_call.json();
        console.log(ret_data1);
        for(var i = 0; i < ret_data1.length; i++){
            var meter_number = ret_data1[i].meterID;
            var data = {meter_id: meter_number}
            const api_call = await fetch(this.props.server+"getMeterData", {
                method: 'post', 
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const ret_data2 = await api_call.json();

            var dataPoint = {
                lat: ret_data1[i].latitude,
                lng: ret_data1[i].longitude,
                weight: ret_data2[ret_data2.length - 1].energy
            }
            data_points.push(dataPoint)
        }
        this.setState({
            data: {
                positions: data_points,
                options:{
                    opacity: 1,
                    radius: 10
                }
            }
        })
        
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div className = {"mapContainer"} style={{ height: '50vh', width: '50%', display: "inline-block"}}>
                <button onClick = {this.updateMapData}>Update Map</button>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBTmeBUbYGglvwZVc86coQOqdyffSeMYWQ" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    heatmapLibrary={true}
                    heatmap={this.state.data}>
                </GoogleMapReact>
            </div>
        );
    }
}
export default GoogleMapContainer;