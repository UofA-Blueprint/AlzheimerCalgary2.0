function randomString(length: number, chars: string) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let rString = () => randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default rString;