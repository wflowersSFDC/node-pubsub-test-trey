import PubSubApiClient from 'salesforce-pubsub-api-client';

async function run() {
    try {
        const client = new PubSubApiClient();
        await client.connect();

        // Subscribe to a single incoming account change events
        const eventEmitter = await client.subscribe(
            '/event/ReportEventStream',
            1
        );

        // Handle incoming events
        eventEmitter.on('data', (event) => {
            console.log(
                `Handling change event ${event.replayId}`
            );
            console.log(JSON.stringify(event, null, 2));
        });
    } catch (error) {
        console.error(error);
    }
}

run();