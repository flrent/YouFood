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






/* routes */
app.get('/', function(req, res){
	logNow("Application mobile initialisée.");
 	res.render('./public/index.html');
});

app.post("/CreateRestaurantInfos", function(req, res){
	var infos = req.body.infos;
	db.createCollection('restaurants_infos',  function(err, collection) {
		collection.insert(infos, {safe:true}, function(err, doc){
			if(!err){
				console.log(doc1);
				res.send(doc1);
			}
			else{
				console.log(err);
				res.send("Failed to create a restaurant infos");
			}	
		});
	});	
});

app.get("/GetRestaurantInfos", function(req, res){
	var infos = db.collection("restaurants_infos", function(err, collection){
		collection.find({}).toArray(function(err, docs){
			console.log(docs);
			res.send(docs);
		});
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
					res.send(docs.dishes);
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
				res.send("Failed to create a dish.")
			}	
		}); 
	});	
});

app.post('/AddDishToMenu', function(req, res){
	var idMenu = req.body["idMenu"];
	var idDish = req.body["idDish"];
	var menu = db.collection('menus', function(err, menuCollection){
		menuCollection.update({_id:new ObjectId(idMenu)}, {$addToSet:{"dishes":new ObjectId(idDish)}}, function(err, menuDoc){
			console.log(menuDoc);
			res.send(menuDoc);
		});
	});
});

app.post('/RemoveDishFromMenu', function(req, res){
	var idMenu = req.body["idMenu"];
	var idDish = req.body["idDish"];
	var menu = db.collection("menus", function(err, menuCollection){
		menuCollection.update({_id:new ObjectId(idMenu)}, {$pull:{"dishes":{_id:new ObjectId(idDish)}}}, function(err, doc){
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

app.get('PurgeDishes', function(req, res){
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
		})
	});
});

app.listen(3000);