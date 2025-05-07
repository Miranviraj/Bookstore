const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

router.put("/add-book-to-fav",authenticateToken,async(req,res)=>{

try {
    const{bookid,id}=req.headers;
    const userData= await User.findById(id);
    const isBookFav=userData.favourites.includes(bookid);
    if(isBookFav){

        return res.status(200).json({messege:"Book is already in Favourites"});

    }
    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
    return res.status(200).json({messege:"Book is added to Favourites"});
} catch (error) {

    res.status(500).json({ message: "Internal server error" });
    
}



});

router.delete("/delete-book-from-fav",authenticateToken,async(req,res)=>{

    try {
        const{bookid,id}=req.headers;
        const userData= await User.findById(id);
        const isBookFav=userData.favourites.includes(bookid);
        if(isBookFav){
    
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
    
        }
        
        return res.status(200).json({messege:"Book is deleted from Favourites"});
    } catch (error) {
    
        res.status(500).json({ message: "Internal server error" });
        
    }
    
    
    
    });

    //fetch favourites

    router.get("/get-fav", authenticateToken, async (req, res) => {
        try {
          const { id } = req.headers;
      
          if (!id) {
            return res.status(400).json({ message: "User ID missing in headers" });
          }
      
          const userData = await User.findById(id).populate("favourites");
      
          if (!userData) {
            return res.status(404).json({ message: "User not found" });
          }
      
          const favbooks = userData.favourites;
      
          return res.status(200).json({
            status: "Success",
            data: favbooks,
          });
      
        } catch (error) {
          console.error("Error fetching favourites:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      });


module.exports=router;