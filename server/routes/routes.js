
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.about = function(req, res){
  res.render('index', { title: 'Something Else' })
};


exports.getPlats = function(req, res){
	res.header('Access-Control-Allow-Origin', '*');

  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  var data = {
	    "urlId": "clothes-shoes-and-jewelry",
	    "children": [{
	        "label": "Clothing",
	        "urlId": "womens-clothes",
	        "hasWideIcon": true,
	        "children": [{
	            "label": "Denim",
	            "urlId": "jeans"
	        }]
	    }, {
	        "label": "Clothing",
	        "urlId": "womens-clothes",
	        "hasWideIcon": true,
	        "children": [{
	            "label": "Denim",
	            "urlId": "jeans"
	        }]
	    }]
	};	
  res.send(data);
};
