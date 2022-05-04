export const isEmail = (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const isLongerThan = (value, length, inclusive = true) => 
    inclusive 
    ? value.length >= length
    : value.length > length