import React, { Component } from "react";
import { compose } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"


const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

    return (
        <GoogleMap defaultZoom={props.zoomLevel} defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].long }}>
            {props.markers.map(marker => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={marker.id}
                        onClick={onClick}
                        position={{ lat: marker.lat, lng: marker.long }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div>
                                    {marker.street_name}, {marker.address}
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
                )
            })}
        </GoogleMap>
    )
})

export default class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [],
            selectedMarker: false
        }
    }

    handleClick = (marker, event) => {
        this.setState({ selectedMarker: marker })
    }
    render() {
        const { tableData } = this.props.tableComponentObj;
        const zoomLevel = (tableData && tableData.length >= 10) ? 1 : 3;
        return (
            <div>
                {tableData && tableData.length ?
                    <MapWithAMarker
                        selectedMarker={this.state.selectedMarker}
                        markers={tableData}
                        onClick={this.handleClick}
                        zoomLevel={zoomLevel}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    : null
                }
            </div>
        )
    }
}
