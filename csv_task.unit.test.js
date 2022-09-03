const { test, expect } = require("@jest/globals");
const { calcuatePopular, calcuateAverage, convertToString, formatFileContent } = require("./csv-task");



test("test the convert result to string function", () => {

    let input = { shoes: 'Air ', forks: 'Pfitzcraft' }

    let result = convertToString(input);
    console.log(result)

    expect(result).toEqual("shoes,Air \nforks,Pfitzcraft\n")
})


test("test the formant orders function", () => {

    let input = [
        'ID1,Minneapolis,shoes,2,Air ',
        'ID2,Chicago,shoes,1,Air',
        'ID3,Central Department Store,shoes,5,BonPied ',
        'ID4,Quail Hollow,forks,3,Pfitzcraft'
      ]

    let result = formatFileContent(input);

    expect(result).toHaveLength(4)
})

test("test the calculate average function", () => {

    let input = [
        {
            id: 'ID1',
            area: 'Minneapolis',
            name: 'shoes',
            quantity: 2,
            brand: 'Air '
        },
        {
            id: 'ID2',
            area: 'Chicago',
            name: 'shoes',
            quantity: 1,
            brand: 'Air'
        },
        {
            id: 'ID3',
            area: 'Central Department Store',
            name: 'shoes',
            quantity: 5,
            brand: 'BonPied '
        },
        {
            id: 'ID4',
            area: 'Quail Hollow',
            name: 'forks',
            quantity: 3,
            brand: 'Pfitzcraft'
        }
    ]

    let result = calcuateAverage(input);

    expect(result).toHaveProperty("shoes")
    expect(result).toHaveProperty("forks")
})

test("test the calculate popular function", () => {

    let input = [
        {
            id: 'ID1',
            area: 'Minneapolis',
            name: 'shoes',
            quantity: 2,
            brand: 'Air '
        },
        {
            id: 'ID2',
            area: 'Chicago',
            name: 'shoes',
            quantity: 1,
            brand: 'Air'
        },
        {
            id: 'ID3',
            area: 'Central Department Store',
            name: 'shoes',
            quantity: 5,
            brand: 'BonPied '
        },
        {
            id: 'ID4',
            area: 'Quail Hollow',
            name: 'forks',
            quantity: 3,
            brand: 'Pfitzcraft'
        }
    ]

    let result = calcuatePopular(input);

    expect(result).toHaveProperty("shoes")
    expect(result).toHaveProperty("forks")
})