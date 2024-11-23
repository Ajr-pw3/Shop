import { Observable } from '@nativescript/core';
import { LocationService } from './shared/location-service';
import { MapService } from './shared/map-service';
import { RideRequestViewModel } from './components/ride-request';

let viewModel;
let map;
let markers = [];

export function onNavigatingTo(args) {
    const page = args.object;
    viewModel = new RideRequestViewModel();
    
    viewModel.userLat = 0;
    viewModel.userLng = 0;
    viewModel.statusMessage = "Locating you...";
    
    page.bindingContext = viewModel;
    
    initializeMap(page);
}

async function initializeMap(page) {
    try {
        const location = await LocationService.getCurrentLocation();
        
        viewModel.set("userLat", location.latitude);
        viewModel.set("userLng", location.longitude);
        viewModel.set("canRequestRide", true);
        viewModel.set("statusMessage", "Ready to request a ride");

        // Add user marker
        markers.push(MapService.createMarker(
            location.latitude,
            location.longitude,
            "You are here"
        ));

        // Add nearby drivers
        const nearbyDrivers = MapService.generateNearbyPoints(
            location.latitude,
            location.longitude
        );

        nearbyDrivers.forEach(driver => {
            markers.push(MapService.createMarker(
                driver.latitude,
                driver.longitude,
                driver.title,
                "car"
            ));
        });

    } catch (error) {
        console.error(error);
        viewModel.set("statusMessage", "Error getting location");
    }
}

export function onSearchTap() {
    viewModel.set("statusMessage", "Search functionality would open here");
}

export function onRequestRide() {
    viewModel.startRideRequest();
}