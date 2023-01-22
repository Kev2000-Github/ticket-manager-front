
export const getBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        return reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const getDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return [day,month,year].join("/")
}

export const getHour = (date: Date) => {
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return [hour, min, sec].join(":")
}