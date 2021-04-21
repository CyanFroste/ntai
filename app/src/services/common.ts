export const trunicate = (text: string, len: number) =>
    text.length > len ? text.slice(0, len).trimEnd() + '...' : text

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const shortenNumber = (num: number) => {
    const numLen = num.toString().length
    if (numLen > 3 && numLen < 7) return (num / 1000).toFixed(2) + 'k'
    if (numLen > 6 && numLen < 10) return (num / 1000000).toFixed(2) + 'm'
    return num
}
