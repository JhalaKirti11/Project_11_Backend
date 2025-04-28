import { Product } from "../modal/Product_schema.js"
import { Category } from '../modal/Category_schema.js'

export const addProduct = async (req, res, next) => {
    try {
        console.log("product creation...");
        console.log(req.body)
        if (req.file) {
            const imagePath = req.file.path
            req.body.image = imagePath;
        }

        const { category } = req.body;
        console.log("req.body : " + req.body.category)
        const categoryData = await Category.find({ name: category });
        console.log("category data : " + categoryData);
        if (!categoryData) {
            console.log("no category!");
            return res.status(401).json({ error: 'no category found.' });
        } else {
            req.body.category = categoryData[0].id;

            const product = await Product.create(req.body);

            if (product) {
                console.log("product created.");
                return res.status(201).json({ msg: `${req.body.name} created successfully`, product });
            } else {
                console.log("product creation failed...");
                return res.status(401).json({ error: `${req.body.name} creation failed` })
            }
        }
    } catch (error) {
        console.log("Something went wrong.", error);
        return res.status(501).json({ error: `Internal Server Error!` })
    }
}

export const viewProducts = async (req, res, next) => {
    try {
        console.log("view all products...");
        const products = await Product.find({ status: true })
            .populate("category", "name");

        console.log("is error ?")
        if (products) {
            console.log('products found...')
            return res.status(201).json({ msg: `products`, products });
        } else {
            console.log("can not fetch products");
            return res.status(401).json({ error: `Product list can not fetch!` })
        }
    } catch (error) {
        console.log("Something went wrong.", error);
        return res.status(501).json({ error: `Internal Server Error!`, error })
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("updating... : " + id)
        console.log(req.body)
        if (req.file) {
            const imagePath = req.file.path
            req.body.image = imagePath;
        }
        const { category } = req.body;

        const categoryData = await Category.find({ name: category });
        console.log("category data : " + categoryData);
        if (!categoryData) {
            console.log("no category!");
            return res.status(401).json({ error: 'no category found.' });
        } else {
            req.body.category = categoryData[0].id;
            console.log(req.body)
            const product = await Product.findByIdAndUpdate({ _id: id }, req.body);
            console.log(product);
            if (product) {
                console.log("product updated.")
                return res.status(201).json({ msg: `Updated`, product });
            } else {
                console.log("can not update product");
                return res.status(401).json({ error: `Product can not updated!` })
            }
        }
    } catch (error) {
        console.log("Something went wrong.", error);
        return res.status(501).json({ error: `Internal Server Error!`, error })
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { state } = req.body;
        console.log("product deleting")
        console.log("id : " + id + " state " + state);
        const product = await Product.findByIdAndUpdate({ _id: id }, { status: state });
        console.log('status : ', product.status);
        if (product) {
            console.log("product deleted");
            return res.status(201).json({ msg: `Product `, product });
        } else {
            console.log("can not fetch the user data")
            return res.status(401).json({ error: `can not delete the product` });
        }
    } catch (error) {
        console.log("some error occured : ", error);
        return res.status(500).json({ error: `Internal Server Error!` })
    }
}

//---------------------------- View Product -----------------------------------

export const viewProduct = async (req, res, next) => {
    console.log("entered")
    const { id } = req.params;
    console.log("id : " + id);
    try {
        const product = await Product.findById({ _id: id })
            .populate("category", "name");;
        if (product) {
            console.log("got product : " + product);
            return res.status(201).json({ msg: `Product : `, product });
        } else {
            console.log("can not fetch the product data")
            return res.status(401).json({ error: `can not fetch the product data` });
        }

    } catch (error) {
        console.log("some error occured : ", error);
        return res.status(500).json({ error: `Internal Server Error!` })
    }
}