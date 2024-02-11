'use server'
const pako = require('pako');
const longString = 'Ceci est une longue chaîne de caractères...'; // Votre longue chaîne de caractères


const obj = {
    n:'Roger',
    v:'Jenny',
    i:'v57987799/8fhgjhgvgjkjl.avif',
    m:"Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love"
}

let decoder = new TextDecoder('utf-8')
let encoder = new TextEncoder('utf-8')

const compressedDataUintArray = pako.deflate(JSON.stringify(obj));
const compressedData = decoder.decode(compressedDataUintArray);

const decompressedDataUintArray = pako.inflate(compressedDataUintArray);
const decompressedData = decoder.decode(decompressedDataUintArray);

// console.log('Données compressées:', compressedData);
// console.log('Données décompressées:', decompressedData);
function stringToUint(str){
    let bin = atob(str)
    let compressedArray = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
        compressedArray[i] = bin.charCodeAt(i);
    }

    return compressedArray
}
console.log(compressedDataUintArray);
console.log(stringToUint(compressedData));

export { compressedData, decompressedData }
