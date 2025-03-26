itemTable = require("../models/bookData")

exports.addData =async(req,res)=>{
    // console.log("user  ",user )  
    try{
const bookName =req.body.bookName;
const description = req.body.description
const rupees = req.body.rupees;
// console.log(user )
const data = await itemTable.create({name : bookName , description : description , rupees : rupees, clientId : req.user.id})
if(data){
    res.status(201).json({msg : "data saved sucessfully"})
}
else {
    res.status(400).json({msg : "error occur"})
}}
catch{
    res.status(500).json({msg : "Error occur"})
}
}

exports.deleteData = async (req,res) =>{
    try{const id = req.body.itemId
        const data = await itemTable.destroy({where :{id : id ,clientId : req.user.id}})
        if(data)
        res.status(201).json({msg:'item deleted successfully'})
    else res.status(400).json({msg : "Error occur"}) 
}
        catch(err){
            res.status(500).json({msg : "Error occur"}) 
        }
    
}

exports.getData = async (req,res) =>{
    try{
const getData = await itemTable.findAll({where : {clientId : req.user.id}})
if(getData){
    res.status(201).json({msg:'item fetch successfully' ,data : getData})
}else{
    res.status(400).json({msg : "Error occur"}) 
}

}
catch(err){
    res.status(500).json({msg : "Error occur"}) 
}

}

exports.updateData = async (req, res) => {
    try {
      // Get the book ID from the URL parameters (assuming the URL is /item/:id)
      const bookId = req.params.id;
  
      // Get the updated book data from the request body
      const { bookName, description, rupees } = req.body;
  
      // Find the existing book record by ID
      const book = await itemTable.findByPk(bookId);  // findByPk is used to find by primary key (id)
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });  // If the book doesn't exist
      }
  
      // Update the book's data
      book.name = bookName || book.name;  // Only update fields if provided
      book.description = description || book.description;
      book.rupees = rupees || book.rupees;
  
      // Save the updated data to the database
      await book.save();
  
      // Send a success response
      res.status(200).json({ msg: "Book updated successfully", book });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error occurred while updating the book" });
    }
  };



