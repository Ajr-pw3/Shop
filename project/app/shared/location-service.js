import { Geolocation, requestPermissions } from '@nativescript/geolocation';

export class LocationService {
    static async getCurrentLocation() {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            throw new Error('Location permission denied');
        }

        return await Geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            maximumAge: 5000,
            timeout: 10000
        });
    }
}