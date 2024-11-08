/// <reference types="node" />
export declare const enum LaunchErrorCodes {
    ERR_LAUNCHER_PATH_NOT_SET = "ERR_LAUNCHER_PATH_NOT_SET",
    ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY = "ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY",
    ERR_LAUNCHER_UNSUPPORTED_PLATFORM = "ERR_LAUNCHER_UNSUPPORTED_PLATFORM",
    ERR_LAUNCHER_NOT_INSTALLED = "ERR_LAUNCHER_NOT_INSTALLED"
}
export declare function defaults<T>(val: T | undefined, def: T): T;
export declare function delay(time: number): Promise<unknown>;
export declare class LauncherError extends Error {
    message: string;
    code?: string | undefined;
    constructor(message?: string, code?: string | undefined);
}
export declare class EdgePathNotSetError extends LauncherError {
    message: string;
    code: LaunchErrorCodes;
}
export declare class InvalidUserDataDirectoryError extends LauncherError {
    message: string;
    code: LaunchErrorCodes;
}
export declare class UnsupportedPlatformError extends LauncherError {
    message: string;
    code: LaunchErrorCodes;
}
export declare class EdgeNotInstalledError extends LauncherError {
    message: string;
    code: LaunchErrorCodes;
}
export declare function getPlatform(): "wsl" | NodeJS.Platform;
export declare function makeTmpDir(): string;
export declare function toWinDirFormat(dir?: string): string;
export declare function getLocalAppDataPath(path: string): string;
//# sourceMappingURL=utils.d.ts.map