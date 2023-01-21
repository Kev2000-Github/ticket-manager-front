
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

