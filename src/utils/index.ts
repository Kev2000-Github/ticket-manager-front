
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
    const month = date.getMonth() + 1
    const monthParsed = month < 10 ? `0${month}` : `${month}`
    const day = date.getDate()
    const dayParsed = day < 10 ? `0${day}` : `${day}`
    return [dayParsed, monthParsed, year].join("/")
}

export const getHour = (date: Date) => {
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return [hour, min, sec].join(":")
}