export const isEmail = (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

export const isName = (value) =>
    /^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/.test(value) &&
    value.length >= 2 &&
    value.length <= 747;

export const isPhoneNumber = (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);

export const isTownName = (value) => value.length >= 2 && value.length <= 85;

export const isStreetName = (value) => value.length >= 2 && value.length <= 150;

export const isZIP = (value) => /^[A-Z0-9]+$/i.test(value) && value.length >= 4 && value.length <= 10;

export const areValidNotes = (value) => value.length <= 200;

export const isValidVIN = (value) => /^[A-HJ-NPR-Z0-9]{16,17}$/.test(value);

export const isLongerThan = (value, length, inclusive = true) =>
    inclusive
        ? value.length >= length
        : value.length > length
