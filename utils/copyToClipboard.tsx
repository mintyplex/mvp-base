// utils/clipboard.ts

// Define a type for the optional callback function
type CopyCallback = (text: string | null) => void;

// Update the function to accept the callback as an optional second parameter
export function copyToClipboard(text: string, callback?: CopyCallback): void {
    const textarea = document.createElement('textarea');
    textarea.innerText = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // If a callback is provided, call it with the copied text
    if (callback) {
        callback(text);
    }
}
