export const removeRandomWords = (array, count) => {
    if(array && array.length !== 0) {
        const indices = new Set();

        do {
            indices.add(Math.floor(Math.random() * array.length));
        } while (indices.size < count);

        return  {
            array: array.map((v, i) => indices.has(i) ? '' : v),
            removedWords: array.map((v, i) => {
                return indices.has(i) ? v : '';
            }).reduce((acc, curr, index) => {
                if (curr === '') {
                    return acc;
                } else {
                    acc[index] = curr;
                    return acc;
                }
            }, {})
        }

    } else {
        return array;
    }
}


export const trimObjValues = obj => {
    return Object.keys(obj).reduce((acc, curr) => {
        acc[curr] = obj[curr].trim();
        return acc;
    }, {});
}


export const compareObjects = (obj1, obj2) => {

    const lengthObj1 = Object.keys(obj1).length;
    const lengthObj2 = Object.keys(obj2).length;

    if (lengthObj1 !== lengthObj2) {
        return false;
    }

    const arrayBoolean = [];

    Object.keys(obj1).forEach(item => {
        if (obj1[item] === obj2[item]) {
            arrayBoolean.push(true);
        } else {
            arrayBoolean.push(false);
        }
    })

    const result = arrayBoolean.every(item => item);

    return result;
}


export const objectToStringWords = (obj, boolean) => {
    const arrayLength = boolean ? 24 : 12;

    const result = Object.entries(obj).reduce((acc, curr) => {

        const item = curr[1].trim();
    
        if (curr[0] >= arrayLength) {
            return acc;
        }
        acc.splice(+curr[0], 1, item);
        return acc;
        
    }, Array(arrayLength).fill(''));

    return result.join(' ');
}