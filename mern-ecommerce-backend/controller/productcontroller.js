const Productmodel = require("../models/Productmodel");
// const Product = require("../models/Productmodel");

 exports.Allproduct = async(req, res)=>{
  try {
    const product = await Productmodel.find({}).sort({ createdAt: -1 });

    console.log(product);
    res.status(200).send({message:"All products get successfully" , product})
  } catch (error) {
    res.status(400).send({message:"error to get the products"})
 }

}
exports.addproduct = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const img = req.file.filename;
  if (!name || !category || !price || !quantity || !img) {
     return res.status(400).send("all fields are compulsory");
  }
  try {
    const newproduct = new Productmodel({
      name,
      category,
      price,
      quantity,
      img,
    });
    const saveproduct = await newproduct.save();
    res.status(200).send({ message:"successfully create product" , saveproduct});
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.Product = async (req, res) => {
  try {
    const products = await Productmodel.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.singleproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Productmodel.findOne({ _id: id });
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.editproduct = async(req,res)=>{
    try {
        const {id} =req.params;
        const {name,price,category,quantity,photo} =req.body;
        const file = req.file ?req.file.filename:photo;
        const product =await Productmodel.findByIdAndUpdate({_id:id},{
            name,category,price,quantity,photo:file
        },{new:true})
        
        res.status(200).send(product)
    } catch (error) {
    res.status(400).send({error,message:"this is from backend"}); 
    }
}

exports.deleteproduct =async(req,res)=>{
    const {id} =req.params;
    const product =await Productmodel.findByIdAndRemove({_id:id});
    if(product){
        res.status(200).send("product delte succesfully");
    }
    else{
        res.status(200).send("product not  deleted");
    }
}
