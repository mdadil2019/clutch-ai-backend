export function isValidURL(url: string): boolean{
    try{
        const parsedURL = new URL(url);
        return parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
    } catch (error) {
        return false;
    }
}