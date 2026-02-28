const Favourite = require('../models/favourite')
const Home = require('../models/home')

exports.getIndex = (req,res,next)=>{
    Home.fetchAll((registeredHomes) => res.render('store/index',{registeredHomes: registeredHomes,  pageTitle: 'airbnb Home',currentPage: 'Index'}))
}

exports.getHomes = (req,res,next)=>{
   Home.fetchAll((registeredHomes) => res.render('store/home-list',{registeredHomes: registeredHomes, pageTitle: 'Home List',currentPage: 'Home'}))
}

exports.getBookings = (req,res,next)=>{
   res.render('store/booking',{pageTitle: 'My Bookings'
      ,currentPage: 'Bookings'})
}


exports.getFavouriteList = (req,res,next)=>{
   Favourite.getFavourite(favourites =>{
      Home.fetchAll((registeredHomes) =>{
         const favouriteHome = favourites.map(homeId => registeredHomes.find(home => home.id === homeId))
         console.log(favouriteHome)
         res.render('store/favourite-list',{favouriteHome: favouriteHome,  pageTitle: 'My Favourite List'
      ,currentPage: 'Favourite List'})
   })
   })
    
}

exports.postAddTOFavourite = (req,res,next)=>{
   console.log(req.body)
   Favourite.addToFavourite(req.body.id, err =>{
      if(err){
         console.log(err)
      }
      res.redirect('/favourites')
   })
   
}

exports.postDeleteFromFavourite = (req,res,next)=>{
  const homesId = req.params.homesId
   Favourite.deleteById(homesId, err =>{
      if(err){
         console.log(err)
      }
      res.redirect('/favourites')
   })
}

exports.getHomesDetails = (req,res,next)=>{
   const homesId = req.params.homesId
   Home.findById(homesId, home =>{
      if(!home){
         res.redirect("/homes")
      }else
         {
        res.render('store/home-detail',{home: home, pageTitle:"Home detail",currentPage: 'Home'})}
   })
}