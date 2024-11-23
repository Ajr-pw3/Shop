import { Observable } from '@nativescript/core';

export class RideRequestViewModel extends Observable {
    constructor() {
        super();
        this.canRequestRide = false;
        this.statusMessage = '';
    }

    startRideRequest() {
        this.set('canRequestRide', false);
        this.set('statusMessage', 'Finding your driver...');
        
        setTimeout(() => {
            this.set('statusMessage', 'Driver found! Arriving in 3 minutes');
            this.startDriverUpdates();
        }, 2000);
    }

    startDriverUpdates() {
        let timeLeft = 180;
        const interval = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft <= 0) {
                clearInterval(interval);
                this.set('statusMessage', 'Your driver has arrived!');
                this.set('canRequestRide', true);
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                this.set('statusMessage', 
                    `Driver arriving in ${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);
    }
}