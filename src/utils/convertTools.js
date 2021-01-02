export function convertTimeStampToDate(timestamp){
    return new Date(timestamp * 1000).toISOString().substr(0, 10);
}

export function convertTimeStampToDateWithSecond(timestamp){
    // timestamp + 25200 = 7hours = GMT+7
    let dateWithSecond = new Date((timestamp+25200) * 1000).toISOString().replace("T"," ("); 
    return(dateWithSecond.substr(0,20)+")");
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
export function convertDateToTimeStamp (date){
    return new Date(date).getTime() / 1000;
}

export function convertTypeFormat (type){
    return type.replace(" ","_");
}

//E.g: collection_id => Collection id
export function convertFormatHeaderTable (string){
    let template = string.charAt(0).toUpperCase() + string.slice(1);
    return template.replace("_"," ");
}
// Remove the params with empty value
export function removeEmptyValueParams (params){
    const temp =params;
    for (const key of Object.keys(temp)) {
        if (temp[key] === "") {
            delete temp[key];
        }
    }
    return temp;
}