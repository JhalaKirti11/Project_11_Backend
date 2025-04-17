import {Category} from "../modal/Category_schema.js";

export const addCategory = async (req, res, next) =>{
    try{
        const {name} = req.body;
        console.log("category : " + name);
        // const cat = await Category.findOne();
        const cat = await Category.findOne({
            $and: [
              { name: name },
              { isDelete: false }
            ]
          });

        const category = await Category.create(req.body);
        if(category){
            console.log('category added successfully');
            return res.status(201).json({msg:`${name} added successfully`, category})
        }else{
            console.log('Category can not be added!');
            return res.status(401).json({error:`${name} creation failed`});
        }
    }catch(error){
        console.log("Something went wrong.", error);
        return res.status(501).json({error:`Internal Server Error!`, error})
    }
}

export const getCategories = async (req, res, next)=>{
    try{
        console.log("fetching categories...");
        const category = await Category.find({isDelete:false});
        if(category){
            console.log('category list fetched.');
            return res.status(201).json({msg:`Category fetched successfully`, category})
        }else{
            console.log('Categories can not be fetch!');
            return res.status(401).json({error:`categories list can not be failed`});
        }
    }catch(error){
        console.log("Something went wrong.", error);
        return res.status(501).json({error:`Internal Server Error!`, error})
    }
}


export const updateCategory = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {name2} = req.body;
        console.log("updating category : "+id);

        const category = await Category.findByIdAndUpdate({_id:id}, {name:name2})
        if(category){
            console.log(category);
            return res.status(201).json({msg:`Updated`, category});
        }else{
            console.log("can not update category");
            return res.status(401).json({error:`category can not updated!`})
        }
    }catch(error){
        console.log("Something went wrong.", error);
        return res.status(501).json({error:`Internal Server Error!`, error})
    }
}

export const deleteCategory =  async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {state} = req.body;
        console.log("deleting category : "+id);
        const category =await Category.findByIdAndUpdate({_id:id}, {isDelete:state});
        if(category){
            console.log("category deleted.")
            return res.status(201).json({mag:`${category.name} is deleted`, category});
        }else{
            console.log("can not delete category");
            return res.status(401).json({error:`category can not deleted!`})
        }
    }catch(error){
        console.log("Something went wrong.", error);
        return res.status(501).json({error:`Internal Server Error!`, error})
    }
}