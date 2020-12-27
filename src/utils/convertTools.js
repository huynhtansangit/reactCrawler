export function convertTimeStampToDate(timestamp){
    return new Date(timestamp * 1000).toISOString().substr(0, 10);
}
export function convertDateToTimeStamp (date){
    return new Date(date).getTime() / 1000;
}
export function convertTypeFormat (type)
{
    return type.replace(" ","_");
}
//E.g: collection_id => Collection id
export function convertFormatHeaderTable (string)
{
    let template = string.charAt(0).toUpperCase() + string.slice(1);
    return template.replace("_"," ");
}