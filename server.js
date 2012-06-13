var logNow = function(texte) { console.log(new Date()+" - "+ texte);};
logNow("---------------------------------------------------------------");
logNow("YouFood v1. Authors: @flrent, @MakanWG");
logNow("---------------------------------------------------------------");
logNow("Initialisation du serveur "+__dirname+" réussie.");

/* modules */
var url = require('url'),
	express = require('express'),
	mongo = require('mongodb');
/* --------- */

/* init */
var app = express.createServer(),
	Server = mongo.Server,
  	Db = mongo.Db,
  	ObjectId = mongo.ObjectID,
  	DBref = mongo.DBRef;

app.use(require('express').bodyParser());

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

/* bdd */
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('projectDB', server);

db.open(function(err, db) {
  if(!err) {
    logNow("Connexion à la base de données Mongo réussie.");
  }
  else {
    logNow("Erreur de connexion. Mongod est il lancé ? "+err);  	
  }
});
/* ---------- */

var resto = new Object();



/* routes */
app.get('/', function(req, res){
	logNow("Application mobile initialisée.");
 	res.render('./public/index.html');
});

app.get("/GetAllApp", function(req, res){
	var restoTexts;
	var menu = new Array();
	var entrees;
	var plats;
	var desserts;
	var boissons;
	db.collection("restaurant_infos", function(err, restoCollection){
		restoCollection.find({}).toArray(function(err, restoDoc){
			restoTexts = restoDoc[0];
			db.collection("menus", function(err, menusCollection){
				menusCollection.findOne({active:"1"}, {fields:{"dishes":1}}, function(err, menuDoc){
					console.log(menuDoc);
					db.collection("dishes", function(err, dishesCollection){
						dishesCollection.find({_id:{$in: menuDoc.dishes}}).toArray(function(err, dishesDoc){
							var menuDishes = dishesDoc;
							console.log(menuDishes);
							entrees = menuDishes.filter( function(item){return (item.type==0);} );
							plats = menuDishes.filter( function(item){return (item.type==1);} );
							desserts = menuDishes.filter( function(item){return (item.type==2);} );
							boissons = menuDishes.filter( function(item){return (item.type==3);} );
							menu.push(entrees);
							menu.push(plats);
							menu.push(desserts);
							menu.push(boissons);
							resto.infos = restoTexts;
							resto.menu = menu;
							console.log(resto);
							res.send(resto);
						});
					});
				});
			});
		});
	});
});

app.post("/CreateRestaurantInfos", function(req, res){
	var infos = req.body.infos;
	db.createCollection('restaurant_infos',  function(err, collection) {
		collection.insert(infos, {safe:true}, function(err, doc){
			if(!err){
				console.log(doc);
				res.send(doc);
			}
			else{
				console.log(err);
				res.send("Failed to create a restaurant infos");
			}	
		});
	});	
});

app.post("/UpdateRestaurantInfos", function(req, res){
	var infos = req.body.infos;
	var id = infos.id;
	db.collection("restaurant_infos", function(err, collection){
		collection.findAndModify({_id:new ObjectId(id)}, {new:true, safe:true}, {$set:{name:infos.name, desc:infos.desc, img:infos.img}}, function(err, doc){
			if(!err){
				res.send(infos);
			}
			else{
				console.log(err);
				res.send("Failed to update the restaurant infos");
			}
		});
	});
});

app.get("/GetRestaurantInfos", function(req, res){
	var infos = db.collection("restaurant_infos", function(err, collection){
		collection.find({}).toArray(function(err, docs){
			console.log(docs);
			res.send(docs[0]);
		})
	});
});

app.get('/GetMenus', function(req, res){
	var menus = db.collection('menus', function(err, menuCollection){
		menuCollection.find({}).toArray(function(err, docs){
			console.log(docs);
			res.send(docs);
		});
	});	
});

app.get('/GetMenusWithDishes', function(req, res){
	var menuArbo = new Array();
	db.collection("menus", function(err, menuCollection){
		menuCollection.find().toArray(function(err, menuDocs){
			var count = 1;
			menuDocs.forEach(function(menuItem){
				var singleMenu = new Object();
				singleMenu._id = menuItem._id;
				singleMenu.name = menuItem.name;
				db.collection("dishes", function(err, dishesCollection){
					dishesCollection.find({_id:{$in: menuItem.dishes}}).toArray(function(err, dishesDoc){
						console.log(count);
						if(dishesDoc != null){
							singleMenu.dishes = dishesDoc;
						}
						else{
							singleMenu.dishes = new Array();
						}
						console.log(singleMenu);
						menuArbo.push(singleMenu);
						
						if (count == menuDocs.length) {
							console.log(menuArbo);
							res.send(menuArbo);
						}
						count++;
					});
				});
			});
			
		});
	});	
});

app.get('/GetMenu/:id', function(req, res){
	var id = req.params.id;
	var menu = db.collection('menus', function(err, menuCollection){
		menuCollection.findOne({_id:new ObjectId(id)}, function(err, doc){
			console.log(doc);
			res.send(doc);
		});
	});
});

app.get('/RemoveMenu/:id', function(req, res){
	var id = req.params.id;
	var menu = db.collection('menus', function(err, menuCollection){
		menuCollection.findAndRemove({_id:new ObjectId(id)}, {safe:true}, function(err, doc){
			if(!err){
				res.send("Menu successfully removed");
			}
			else{
				console.log(err);
				res.send(err);
			}	
		})
	});
});

app.post('/CreateMenu', function(req, res){
	db.createCollection('menus',  function(err, collection) {
		var doc1 = req.body.menu;
		collection.insert(doc1, {safe:true}, function(err, doc){
			if(!err){
				console.log(doc1);
				res.send(doc1);
			}
			else{
				console.log(err);
				res.send("Failed to create a menu");
			}	
		});
	});		
});

app.post('/UpdateMenu', function(req, res){
	var menu = req.body.menu;
	var id = menu._id;
	logNow("We are updating menu "+id+" : "+menu);
	db.collection("menus", function(err, collection){
		collection.findAndModify({_id:new ObjectId(id)}, {safe:true}, {$set:{name:menu.name, active:menu.active}}, function(err, doc){
			if(!err){
				res.send(menu);
			}
			else{
				console.log(err);
				res.send("Failed to update the menu");
			}
		});
	});
});

app.post('/SetMenuActive', function(req, res){
	var idMenu = req.body["idMenu"];
	var menus = db.collection("menus", function(err, collection){
		collection.update({}, {$set:{active:0}},  {safe:true, multi:true}, function(err, menuDocs){
			collection.findAndModify({_id:new ObjectId(idMenu)}, {safe:true}, {$set:{active:1}}, function(err, menuDoc){
				if(!err){
					res.send("activated");
				}
				else{
					console.log(err);
					res.send("Failed to activate the menu");
				}
			});
		});
	});
});

app.get('/GetDishes', function(req, res){
	var dishes = db.collection('dishes', function(err, dishCollection){
		dishCollection.find().toArray(function(err, docs){
			console.log(docs);
			res.send(docs);
		});
	});	
});

app.get('/GetDish/:id', function(req, res){
	var id = req.params.id;
	var dish = db.collection('dishes', function(err, dishCollection){
		dishCollection.findOne({_id:new ObjectId(id)}, function(err, doc){
			console.log(doc);
			res.send(doc);
		});
	});
});

app.get('/GetMenuDishes/:id', function(req, res){
	var id = req.params.id;
	var menu = db.collection('menus', function(err, menuCollection){
		menuCollection.findOne({_id:new ObjectId(id)}, {fields:{"dishes":1}}, function(err, doc){
			db.collection("dishes", function(err, dishesCollection){
				dishesCollection.find({_id:{$in: doc.dishes}}).toArray(function(err, docs){
					console.log(docs);
					res.send(docs);
				});
			});
		});
	});
});

app.get('/RemoveDish/:id', function(req, res){
	var id = req.params.id;
	var dish = db.collection('dishes', function(err, menuCollection){
		menuCollection.findAndRemove({_id:new ObjectId(id)}, function(err, doc){
			res.send("removed");
		});
	});
});

app.post('/CreateDish', function(req, res){
	console.log(req.body.dish);
	db.createCollection('dishes', function(err, collection) {
		var doc1 = req.body.dish;
		collection.insert(doc1, {safe:true}, function(err, doc){
			if(!err){
				res.send(doc1);
			}
			else{
				console.log(err);
				res.send("Failed to create a dish.");
			}	
		}); 
	});	
});

app.post('/UpdateDish', function(req, res){
	var dish = req.body.dish;
	var id = dish._id;
	logNow("Modification du dish "+id);
	logNow("Reception de "+dish);
	db.collection("dishes", function(err, collection){
		collection.findAndModify({_id:new ObjectId(id)}, {new:true, safe:true}, {$set:{name:dish.name, price:dish.price, desc:dish.desc, img:dish.img, type:dish.type}}, function(err, doc){
			if(!err){
				res.send(doc);
			}
			else{
				console.log(err);
				res.send("unable to update a dish");
			}
		});
	});
});

app.post('/AddDishToMenu', function(req, res){
	var idMenu = req.body["idMenu"];
	var idDish = req.body["idDish"];
	logNow("Ajout du plat "+idDish+" dans le menu "+idMenu);
	var menu = db.collection('menus', function(err, menuCollection){
		menuCollection.update({_id:new ObjectId(idMenu)}, {$addToSet:{"dishes":new ObjectId(idDish)}}, {safe:true}, function(err, menuDoc){
			if(!err){
				res.send("Successfully added.");
			}
			else{
				console.log(err);
				res.send("Failed to add a dish in the menu.");	
			}
		});
	});
});

app.post('/RemoveDishFromMenu', function(req, res){
	var idMenu = req.body["idMenu"];
	var idDish = req.body["idDish"];
	var menu = db.collection("menus", function(err, menuCollection){
		menuCollection.update({_id:new ObjectId(idMenu)}, {$pull:{"dishes":new ObjectId(idDish)}}, function(err, doc){
			console.log(doc);
			res.send(doc);
		});
	});
});

app.get('/PurgeMenus', function(req, res){
	var menu = db.collection("menus", function(err, menuCollection){
		menuCollection.remove(function(err, doc){
			res.send("removed");
		})
	});
});

app.get('/PurgeDishes', function(req, res){
	var dishes = db.collection("dishes", function(err, dishesCollection){
		dishesCollection.remove(function(err, doc){
			res.send("removed");
		});
	});
});

app.get('/GetOrders', function(req, res){
	var orders = db.collection("orders", function(err, ordersCollection){
		ordersCollection.find().toArray(function(err, doc){
			res.send(doc);
		});
	});
});

app.post('/CreateOrder', function(req, res){
	db.createCollection('orders', function(err, collection) {
		var doc1 = req.body["orderObject"];
		collection.insert(doc1);
		res.send(doc1);
	});
});

app.post('/SetOrderWaiting', function(req, res){
	var idOrder = req.body["idOrder"];
	var orders = db.collection("orders", function(err, collection){
		collection.update({_id:new ObjectId(idOrder)}, {$set:{"status":0}}, function(err, orderDoc){
			res.send(orderDoc);
		}); 
	});
});

app.post('/SetOrderInProgress', function(req, res){
	var idOrder = req.body["idOrder"];
	var orders = db.collection("orders", function(err, collection){
		collection.update({_id:new ObjectId(idOrder)}, {$set:{"status":1}}, function(err, orderDoc){
			res.send(orderDoc);
		});
	});
});

app.post('/SetOrderReady', function(req, res){
	var idOrder = req.body["idOrder"];
	var orders = db.collection("orders", function(err, collection){
		collection.update({_id:new ObjectId(idOrder)}, {$set:{"status":2}}, function(err, orderDoc){
			res.send(orderDoc);
		});
	});
});

app.post('/SetOrderDelivered', function(req, res){
	var idOrder = req.body["idOrder"];
	var orders = db.collection("orders", function(err, collection){
		collection.update({_id:new ObjectId(idOrder)}, {$set:{"status":3}}, function(err, orderDoc){
			res.send(orderDoc);
		});
	});
});

app.get('/GetWaiters', function(req, res){
	var waiters = db.collection("waiters", function(err, collection){
		collection.find({}).toArray(function(err, doc){
			res.send(doc);
		});
	});
});

app.get('/RemoveWaiter:idWaiter', function(req, res){
	var id = req.params.idWaiter;
	var waiters = db.collection("waiters", function(err, collection){
		collection.findAndRemove({_id:new ObjectId(id)}, {safe:true}, function(err, doc){
			if(!err){
				res.send("removed");
			}
			else{
				console.log(err);
				res.send("Failed to remove a waiter");
			}
		});
	});
});

app.post('/CreateWaiter', function(req, res){
	var waiter = req.body.waiter;
	db.createCollection("waiters", function(err, collection){
		collection.insert(waiter, {safe:true}, function(err, doc){
			if(!err){
				res.send(waiter);
			}
			else{
				console.log(err);
				res.send("Failed to create a new waiter");
			}
		});
	});
});

app.post('/UpdateWaiter', function(req, res){
	var waiter = req.body.waiter;
	var id = waiter.id;
	var waiters = db.collection("waiters", function(err, collection){
		collection.findAndModify({_id:new ObjectId(id)}, {safe:true}, {$set:{name:waiter.name, av:waiter.availability}}, function(err, doc){
			if(!err){
				res.send(waiter);
			}
			else{
				console.log(err);
				res.send("Failed to update a waiter's informations.");
			}
		});
	});	
});

app.post('/SetMultipliers', function(req, res){
	var multipliers = req.body.multipliers;
	var id = multipliers.id;
	db.createCollection("multipliers", function(err, collection){
		collection.findAndModify({_id:new ObjectId()}, {safe:true}, {$set:{tax:multipliers.tax}}, function(err, doc){
			if(!err){
				res.send(multipliers);
			}
			else{
				console.log(err);
				res.send("Could not update the tax informations.");
			}
		});
	});
});

app.listen(3000);