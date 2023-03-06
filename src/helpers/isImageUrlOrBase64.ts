export const isImageUrlOrBase64 = (img?: string): boolean => {
    if (img) {
        return /^data:image\/([a-zA-Z]*);base64,/.test(img) || /\.(png|jpg|jpeg|gif|svg)$/.test(img);
    } else {
        return false;
    }
};
