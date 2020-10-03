export interface MediaState {
    camera: boolean;
    microphone: boolean;
    screen: boolean;
}

export type MediaSource = keyof MediaState;
export type MediaAction = "pause" | "resume" | "close";
export type MediaType = "audio" | "video";
export type TransportType = "webrtc" | "plain";
export type TransportJob = "sending" | "receiving";
