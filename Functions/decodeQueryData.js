export default function decodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (d !== 'slug') {
            ret.push(decodeURIComponent(d) + '=' + decodeURIComponent(data[d]));
        }
    return ret.join('&');
}