export function register(config) {
    if ('serviceWorker' in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        navigator.serviceWorker.register(swUrl).then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // Notifica o usuário ou recarrega automaticamente:
                                console.log('Nova versão disponível. Recarregando...');
                                window.location.reload();
                            }
                        }
                    };
                }
            };
        });
    }
}
