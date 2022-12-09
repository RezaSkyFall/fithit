import mongoose, { model, Model, Schema } from "mongoose";
import { IEstate } from "../types/IEstate";

const estateSchema = new Schema<IEstate>({
    title: String,
    price: Number,
    address: String,
    rooms: Number,
    poolType: String,
    hasPool: Boolean,
    peopleCapacity: Number,
    hasParking: Boolean,
    images: {
        type: [String],
        required: false
    },
    code: Number,
    serviceType: String,
    areaSize: Number,
    buildingSize: Number,
    hasFireplace: Boolean,
    hasBarbecue: Boolean,
    hasFurniture: Boolean,
    hasGazebo: Boolean,
    instagramPostLink: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: false
    },
}, { timestamps: { createdAt: true, updatedAt: true } });

const EstateModel: Model<IEstate> = mongoose.models.EstateModel || model('EstateModel', estateSchema);

export default EstateModel;