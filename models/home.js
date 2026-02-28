const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtils')
const homeDataPath = path.join(rootDir,'data', 'homes.json')
const Favourite = require('./favourite')


module.exports = class Home{
  constructor(houseName, price, location, rating, photoUrl){
    this.houseName = houseName
    this.price = price
    this.location = location
    this.rating = rating
    this.photoUrl = photoUrl
  }

  save(){
    Home.fetchAll((registeredHomes) =>{
    if(this.id){
     registeredHomes = registeredHomes.map((home)=> {
      if(home.id === this.id){  
        return this }
       else{
        return home
       }  }
     )
    } else{
      this.id = Math.random().toString()
        registeredHomes.push(this)
      }
    
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) =>{
      console.log("file writing concluded", error)
    })  
    })
  }

  static fetchAll(callback){
    fs.readFile(homeDataPath,(err,data)=>{
      callback(!err ? JSON.parse(data) : [])
    })
  }

  static findById(homesId,callback){
    this.fetchAll(homes =>{
      const homeFound = homes.find(home => home.id === homesId)
      callback(homeFound)
    })
  }

   static deleteById(homesId,callback){
    this.fetchAll(homes =>{
      homes = homes.filter(home => home.id !== homesId)
      fs.writeFile(homeDataPath, JSON.stringify(homes), err=>{
         Favourite.deleteById(homesId, callback)})  
    })
  }
}