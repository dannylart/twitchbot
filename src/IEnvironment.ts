
export interface IEnvironment {
    server: string;
    port: string;
    username: string;
    oauth: string;
    channel: string;
    messageQueueDelay?: number;
}
