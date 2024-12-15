const { Client } = require ("@elastic/elasticsearch");
const logger = require("../utils/logger");

const esClient = new Client({
    cloud:{
       id: "5961a1e8bcdd4f888eb34448ee015d9c:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ0ZTI3NGQxMzkzYjk0YjFlODcwZGE3MDM0OTQzMjNlZCQ4ZTg1NWJmOTU4ZDc0N2RmYWE3NGQ1YjU3ODQxY2I5ZQ=="
    },
    auth:{
        username: "elastic",
        password: "8XLgfa2r6L21nxCsS071peNj"
    }
})

// add product
const addProduct = async(product) => {
    try{
        const results = await esClient.index({
            index: "products",
            body: product
        })
        await esClient.indices.refresh({index:"products"});
        return results;
    }catch(e){
        logger.error(`elasticsearch'e bağlı add product çalışmıyor. - ${e}`)
    }
}

const deleteProduct = async (id) => {
    try{
        const results = await esClient.delete({
            index: "products",
            id
        })
        await esClient.indices.refresh({index:"products"});
        return results;
    }catch(e){
        logger.error(`elasticsearch'e bağlı add product çalışmıyor. - ${e}`)
    }  
}

const searchProducts = async(text) => {
    try{
        const results = await esClient.search({
            index: "products",
            body: {
               query: {
                  match: {
                    name: text
                }
            }
        }
        })
        return results.hits.hits.map((hit) => hit._source);
    }catch(e){
        logger.error(`elasticsearch'e bağlı add product çalışmıyor. - ${e}`)
    }  
}

module.exports = {
    addProduct,
    searchProducts,
    deleteProduct
}