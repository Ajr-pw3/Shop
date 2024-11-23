export class MapService {
    static createMarker(latitude, longitude, title, icon = null) {
        return {
            position: { lat: latitude, lng: longitude },
            title: title,
            icon: icon
        };
    }

    static generateNearbyPoints(latitude, longitude, count = 3, radius = 0.01) {
        return Array.from({ length: count }, (_, i) => ({
            latitude: latitude + (Math.random() - 0.5) * radius,
            longitude: longitude + (Math.random() - 0.5) * radius,
            title: `Driver ${i + 1}`
        }));
    }
}