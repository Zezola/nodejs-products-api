const productModel = require('../model/product');

exports.save = async (req, res) => {
    const data = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }catch(error) {
        res.status(400).json({message: error.message})
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await productModel.find();
        res.json(data);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productModel.findById(id);
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateById = async (req, res) => {
    try {
        const id = req.params.id; 
        const {_id, ...rest} = req.body;
        const {name, description, price} = rest;
        const updatedData = {name, description, price};
        const options = {new: true};
        
        const result = await productModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id; 
        const data = await productModel.findByIdAndDelete(id);
        res.send(data);
    }catch(error) {
        res.status(400).json({message: error.message})
    }
};