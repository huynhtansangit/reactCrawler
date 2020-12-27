export function convertTimeStampToDate(timestamp){
    return new Date(timestamp * 1000).toISOString().substr(0, 10);
}

export function roundPercentNumber(value, decimals) {
    return Number((value*100).toFixed(decimals));
}

export function sortByKeyDesc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}