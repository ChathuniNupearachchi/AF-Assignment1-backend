const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(

    {
        ResourceType:{
            type: String,
            required: true
        },

        ID:{
            type:String,
            required:true
        },
         

        

    },
    {
        timestamps: true,
      }
);

const ResourceModel = mongoose.model("Resource", resourceSchema);

module.exports = ResourceModel;
