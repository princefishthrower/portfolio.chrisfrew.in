declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare interface NodeRequire {
    context(
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp
    ): {
        keys(): string[];
        <T>(id: string): T;
        resolve(id: string): string;
        id: string;
    };
}