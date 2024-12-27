export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        console.log('ERROR | ', error);
        return error.message;
    }
    return "An unknown error occurred";
}
