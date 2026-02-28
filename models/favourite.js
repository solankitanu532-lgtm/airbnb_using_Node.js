const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtils')
const favouriteDataPath = path.join(rootDir,'data', 'favourite.json')


module.exports = class Favourite{
  static addToFavourite(homeId,callback){
      Favourite.getFavourite((favourites) =>{
        if(favourites.includes(homeId)){
          callback("Home is already exist")
        }else{
         favourites.push(homeId)
         fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback) 
           }
    })
  }
   static getFavourite(callback){
    fs.readFile(favouriteDataPath, (err, data) => {
    if (err) {
      return callback([]);
    }else{
      return callback(JSON.parse(data));
    }
  });
}

   static deleteById(homesId,callback){
    Favourite.getFavourite(homes =>{
      homes = homes.filter(home => homesId !== home)
      fs.writeFile(favouriteDataPath, JSON.stringify(homes), callback)  
    })
  }
}