const Joi = require('joi');

module.exports.listingSchema =  Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("", null),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        eatables: Joi.string(),
        Castle: Joi.string(),
        Golf: Joi.string(),
        Pools: Joi.string(),
        Beach: Joi.string(),
        Parks: Joi.string(),
        Rooms: Joi.string(),
        Camp: Joi.string(),
        Boats: Joi.string(),
        Play: Joi.string(),
        Towers: Joi.string(),
        Mountain: Joi.string(),
});

module.exports.reviewSchema = Joi.object({
        ratings:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
});