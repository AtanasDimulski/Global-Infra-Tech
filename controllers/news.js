const News = require ('../models/News')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const {checkInput, isISO8601Date, isStringLong} = require('../middleware/customMiddlewares')

const createNews = async (ctx) => {
    console.log(ctx.request.body)
    if(ctx.is('application/json')){
      try {
         const { title, shortDescription, text } = ctx.request.body;
         let date
         if(isISO8601Date(ctx.request.body.date)){
            date = ctx.request.body.date
         }
         if(isStringLong(shortDescription)){
            const news = await News.create({
               title: title,
               shortDescription: shortDescription,
               text: text,
               date: date || new Date()
            });
            return (ctx.body = { news: news });
         } else {
            return (ctx.body = { message: `Short Description is more than 50 charachters`});
         }
      } catch {
         return (ctx.body = { message: error.message });
      }
   }else {
      return (ctx.body = {message: `Application doesn't support this content type`})
   }
}

const updateNews = async (ctx, next) => {
   const {title, shortDescription, text} = ctx.request.body
   const id = ctx.params.id
   let date
   if(isISO8601Date(ctx.request.body.date)){
      date = ctx.request.body.date
   }
   if(ctx.is('application/json')){
      try {
         if(isStringLong(shortDescription)){
            if(ObjectId.isValid(id)){
               const news = await News.updateOne(
                  {_id: (id)},
                  {
                     title: title,
                     shortDescription: shortDescription,
                     text: text,
                     date: date || new Date()
                  }
               )
               if(!news){
                  return next(ctx.body = {message: `No News with id: ${id}`})
               }
               return (ctx.body = { news: news });
            }
            else{
               return next(ctx.body = {message: `${id} is not a valid id`})
            }
         } else {
            return (ctx.body = { message: `Short Description is more than 50 charachters`});
         }
      } catch {
         return (ctx.body = { message: error.message });
      }
   }else {
      return (ctx.body = {message: `application doesn't support this content type`})
   }
}


const deleteNewsById = async (ctx, next) => {
   const id = ctx.params.id
   try {
      if(ObjectId.isValid(id)){
         const news = await News.findOneAndDelete({_id: id})

         if(!news){
            return next(ctx.body = {message: `No News with id: ${id}`})
         }
         return (ctx.body = {news: news})
      }
      else{
         return next(ctx.body = {message: `${id} is not a valid id`})
      }
   } catch {
      return (ctx.body = { message: error.message });
   }
}

const getAllNews = async (ctx) => {
    try {
        const news = await News.find({});
        return (ctx.body = { news: news })
     } catch (error) {
         return (ctx.body = { message: error.message })
     }
}

const getSortedNews = async (ctx) => {
   const {date, title} = ctx.query
   let order = checkInput(ctx.query.order)
   if(order === 1 || order === -1){
      try {
         if(date === 'true' && title === 'false'){
         const news = await News.find({}).sort({ date: order });
         return (ctx.body = { news: news })
         }
         else if(date === 'false' && title === 'true'){
            const news = await News.find({}).sort({ title: order });
            return (ctx.body = { news: news })
         }
         else if(date === 'true' && title === 'true'){
            const news = await News.find({}).sort({ date: order, title: order });
            return (ctx.body = { news: news })
         }
         else if(date === 'false' && title === 'false'){
            const news = await News.find({});
            return (ctx.body = { news: news })
         }
         else{
            return (ctx.body = {message: `incorect query parameters`})
         }
      } catch (error) {
         return (ctx.body = { message: error.message })
      }
   }
   else {
      return (ctx.body = {messaage: `incorect query parameter for sorting`})
   }
}

const getFilteredNews = async (ctx, next) => {
   const {gteDate,ltDate, title} = ctx.query
   const query = {};
   if(!gteDate && !ltDate && !title){
      try {
         const news = await News.find({});
         return (ctx.body = { news: news })
      } catch (error) {
          return (ctx.body = { message: error.message })
      }
   }

   if (title) {
      query.title = title;
   }
   if (gteDate) {
      if(isISO8601Date(gteDate)){
         query.date = { $gte: new Date(gteDate)};
      }
   }
   if(ltDate){
      if(isISO8601Date(ltDate)){
         query.date = { $lt: new Date(ltDate) };
      }
   }
   if(gteDate && ltDate){
      if(isISO8601Date(gteDate) && isISO8601Date(ltDate)){
         query.date = { $gte: new Date(gteDate), $lt: new Date(ltDate) };
      }
   }

   try {
      const news = await News.find(query);
      if(news.length == 0){
         return next(ctx.body = {message: `No news matching this query parameters have been found`})
      }
      return (ctx.body = { news: news })
   } catch (error) {
         return (ctx.body = { message: error.message })
   }
}

module.exports = {
    createNews,
    updateNews,
    deleteNewsById,
    getAllNews,
    getSortedNews,
    getFilteredNews   
}