import ProductModel from '../../models/Product.js'

export const getFilterProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})

        res.status(200).json({
            success: true,
            message: "Products fetch successfully",
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(402).json({
            success: false,
            message: `getFilterProducts Error :- ${error}`
        })
    }
}
