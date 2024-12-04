import React, { useState, useEffect } from 'react';

const OfflineDetector = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOffline) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    backgroundColor: 'red',
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px',
                    zIndex: 1000,
                }}
            >
                Você está offline. Verifique sua conexão com a internet.
            </div>
        );
    }

    return null;
};

export default OfflineDetector;
