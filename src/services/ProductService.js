const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt")

const createProduct = async(newProduct) => {
    return new Promise(async (resolve,reject) => {
        const {name,image,type,price,countInStock,rating,description} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve ({
                    status:"OK",
                    message:"The product is already"
                })
            }
            // const hash=bcrypt.hashSync(password,10);
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })
            if(createProduct){
                resolve({
                    status: 'OK',
                    message: 'succes',
                    data: createProduct
                })
            }
         
        }catch(e){
            reject(e)
        }
    })
}
const updateProduct = async(id,data) => {
    return new Promise(async (resolve,reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('checkProduct',checkProduct);
            if(checkProduct === null){
                resolve ({
                    status:"OK",
                    message:"The Product is not defined"
                })
            }
            const productUpdate = await Product.findByIdAndUpdate(id,data,{ new: true})
            
            resolve({
                    status: 'OK',
                    message: 'succes',
                    data: productUpdate
        })
            
        }catch(e){
            reject(e)
        }
    })
}

const deleteProduct = async(id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            
            if(checkProduct === null){
                resolve ({
                    status:"OK",
                    message:"The Product is not defined"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                    status: 'OK',
                    message: 'delete Product succes',
        })
            
        }catch(e){
            reject(e)
        }
    })
}
const getDetailsProduct = async(id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
            
            if(product === null){
                resolve ({
                    status:"OK",
                    message:"The Product is not defined"
                })
            }
            resolve({
                    status: 'OK',
                    message: 'Succes',
                    data: product
        })
            
        }catch(e){
            reject(e)
        }
    })
}
const getAllProduct = (limit,page,sort,filter) => {
    console.log('sort',sort)
    return new Promise(async (resolve,reject) => {
        try{
            const totalProduct = await Product.countDocuments()
            console.log('filter',filter)
            if(filter){
                const labelFilter=filter[0];
                const allProductFilter = await Product.find( { [labelFilter]: {'$regex' : filter[1]}})
                .limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'select all Product succes',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]]=sort[0] 
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'select all Product succes',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
            else{
            const allProduct = await Product.find().limit(limit).skip(page * limit).sort(sort)
            resolve({
                    status: 'OK',
                    message: 'select all Product succes',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct / limit)
        })
    }
            
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailsProduct,
    getAllProduct

}