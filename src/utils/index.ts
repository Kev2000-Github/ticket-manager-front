import axios from "axios";

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

const DEFAULT_HEADERS = {}

export const sendRequest = {
    GET: async (url: string) => {
        try{
            const resp = await axios.get(url, {headers: DEFAULT_HEADERS})
            return resp?.data
        }
        catch(err){
            console.error(err)
        }
    },
    POST: async (url: string, data: object) => {
        try{
            const resp = await axios.post(url, data, {headers: DEFAULT_HEADERS})
            return resp?.data
        }
        catch(err){
            console.error(err)
        }
    }
}