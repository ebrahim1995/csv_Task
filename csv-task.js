var readline = require('readline');
const fs = require('fs/promises');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

});

rl.question("Enter File Name Input: ", function (fileName) {

    evaluate(fileName);
    rl.close();
});

/**
 * 
 * 1. 0_input_file_name - In the first column, list the product Name. The second column should contain the average quantity of the product purchased per order.
 */

/**
 * 
 * 1_input_file_name - In the first column, list the product Name. The second column should be the most popular Brand for that product. 
 * Most popular is defined as the brand with the most total orders for the item, not the quantity purchased. 
 * If two or more brands have the same popularity for a product, include any one.
 */
async function evaluate(fileName) {

    let fileContent = await fs.readFile(fileName);

    let fileContentString = fileContent.toString();

    let fileContentArray = fileContentString.split("\n")

    let formattedOrderArray = module.exports.formatFileContent(fileContentArray)

    let averageQuantityMap = module.exports.calcuateAverage(formattedOrderArray)

    let popularBrandsMap = module.exports.calcuatePopular(formattedOrderArray)

    let averageQuantityString = module.exports.convertToString(averageQuantityMap)

    let popularBrandString = module.exports.convertToString(popularBrandsMap)

    await fs.writeFile(`0_${fileName}`, averageQuantityString)
    await fs.writeFile(`1_${fileName}`, popularBrandString)

}

module.exports.formatFileContent = function (fileContentArray) {

    let formattedOrderArray = [];

    for (let index = 0; index < fileContentArray.length; index++) {

        const element = fileContentArray[index];

        let splitedElement = element.split(",");

        let formatedOrderObject = {

            id: splitedElement[0],
            area: splitedElement[1],
            name: splitedElement[2],
            quantity: parseInt(splitedElement[3]),
            brand: splitedElement[4]
        }

        formattedOrderArray.push(formatedOrderObject)
    }

    return formattedOrderArray
}


module.exports.calcuateAverage = function (formattedOrderArray) {

    let numOfOrders = formattedOrderArray.length;

    let productQuantityMap = {};
    let averageMap = {};

    for (let index = 0; index < formattedOrderArray.length; index++) {

        const element = formattedOrderArray[index];

        if (productQuantityMap[element.name]) {

            productQuantityMap[element.name] += element.quantity;
            continue;

        }

        productQuantityMap[element.name] = element.quantity;

    }

    Object.keys(productQuantityMap).forEach(key => {

        averageMap[key] = productQuantityMap[key] / numOfOrders
    })

    return averageMap;

}


module.exports.calcuatePopular = function (formattedOrderArray) {

    let brandOrderMap = {};
    let productBrandMap = {};
    let popularBrandsMap = {};

    for (let index = 0; index < formattedOrderArray.length; index++) {

        const element = formattedOrderArray[index];

        productBrandMap[element.brand] = element.name;

    }


    for (let index = 0; index < formattedOrderArray.length; index++) {

        const element = formattedOrderArray[index];

        if (brandOrderMap[element.brand]) {

            brandOrderMap[element.brand] += 1
            continue
        }

        brandOrderMap[element.brand] = 1

    }

    Object.keys(brandOrderMap).forEach(key => {

        let brandProduct = productBrandMap[key];

        if (popularBrandsMap[brandProduct]) {

            let currentPopularBrand = popularBrandsMap[brandProduct]

            if (brandOrderMap[key] > currentPopularBrand) {

                popularBrandsMap[brandOrderMap] = key
            }
        }

        else if (!popularBrandsMap[brandProduct]) {

            popularBrandsMap[brandProduct] = key
        }
    })


    return popularBrandsMap;
}

module.exports.convertToString = function (object) {

    let string = ""

    Object.keys(object).forEach(key => {

        let item = `${key},${object[key]}\n`

        string += (item)
    })

    return string;
}
