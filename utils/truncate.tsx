function truncate(input: string | null): string | null {
    if (input === null) {
        return null;
    }
    if (input.length <= 12) {
        return input;
    }
    return `${input.substring(0, 7)}...${input.substring(input.length - 3)}`;
}

export { truncate };
