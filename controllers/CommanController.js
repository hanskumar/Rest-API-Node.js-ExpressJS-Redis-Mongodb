const apiResponse   = require("../helpers/ApiResponse");
const CategoryModel = require("../models/CategoryModel");

var uniqid          = require('uniqid');



exports.categoryList = async (req, res,next) => {
    try { 

        const category = await CategoryModel.find({status : 'active'}); 

        if (category){

            try{

                //==========Product count in category ===============
               /* let group_by = await LeaveModel.aggregate([
                    { $match: { emp_code: req.body.emp_code ,leave_applied_date: { $gte:  previous_date} }},
                    { $group: { _id: "$status", count: { $sum: 1 } } },
                    { $project: {_id: 0,status:"$_id",count: 1,  }  }
                ]);

                let output = {leaves,leavecounts:group_by};*/

                /* leaves.count = group_by;;
                console.log(leaves); */
                return apiResponse.successResponseWithData(res,"Category Data.",category);
            } catch(err){
                console.log(err);
                return apiResponse.ErrorResponse(res, "Something went Wrong,Please Try Again000.! ",err);
            } 

        } else {
            return apiResponse.unauthorizedResponse(res, "No Data Found.");
        }
            
    } catch (err) {
        console.log(err);
        //if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, "Something went Wrong,Please Try Againiiop.! ",err);
    }
}


