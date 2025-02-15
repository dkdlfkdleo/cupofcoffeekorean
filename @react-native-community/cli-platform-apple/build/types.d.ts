import { supportedPlatforms } from './config/supportedPlatforms';
type ObjectValues<T> = T[keyof T];
export type ApplePlatform = ObjectValues<typeof supportedPlatforms>;
export interface Device {
    name: string;
    udid: string;
    state?: string;
    availability?: string;
    isAvailable?: boolean;
    version?: string;
    sdk?: string;
    availabilityError?: string;
    type?: 'simulator' | 'device' | 'catalyst';
    lastBootedAt?: string;
}
export interface IosInfo {
    name: string;
    schemes?: string[];
    configurations?: string[];
    targets?: string[];
}
export interface BuilderCommand {
    /**
     * Lowercase name of the platform.
     * Example: 'ios', 'visionos'
     */
    platformName: ApplePlatform;
}
export {};
//# sourceMappingURL=types.d.ts.map