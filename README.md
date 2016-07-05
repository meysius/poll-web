# poll-web
This repository contains a complete RESTful AngularJS application along with a clean documentation which walks developers through all construction steps. If you wish to start with AngularJS, this repository is a great resource for you.

### [Rails-api Back-End Repository](https://github.com/mefeghhi/poll-api)

# AngularJS Cheat Sheet
## Definitions
* **Bower** is a package manager for front-end packages.
* **npm** is a package manager for back-end packages that comes with node.
* **Express** is a framework for nodejs.

## Setting Things Up
* Install ```node```.
* Install ```bower```.
* Install nodemon: ```$ npm install -g nodemon```

## Let Us Begin...
### 1. Working With Bower
Bower downloads packages and put them into a ```bower_components``` folder. We need to customize bower to put its packages in ```public/lib``` folder. To do this, open ```~/.bowerrc```, and put the following code in it:

```json
{
	"directory": "public/lib"
}
```

To install angular libraries you can use bower like the following:

```sh
$ bower install angular-ui-router
```

(For the exact name of the library you need to search the internet.)

Add a line like the following to your angular home (```app.html```) to link the library to your angular app:

```html
<script src='angular-ui-router.min.js'>
```

You now should add the name of that library to the dependency list of your main module:

```javascript
var app = angular.module('yourAppName', ['ui.router']);
```

### 2. Creating Your Angular App
Create a project directory, navigate to it and install ```express```, ```angular```, and ```bootstrap```:

```sh
$ npm install express
$ bower install angular
$ bower install bootstrap
```

Manually create a directory structure like the following:

```
my_project/
----node_modules/
----server.js
----public/
--------lib/
--------css/
--------img/
--------js/
--------directives/
------------directive1/
----------------directive1.html
----------------directive1.js
------------directive2/
----------------directive2.html
----------------directive2.js
--------views/
------------view1/
----------------view1.html
----------------view1.js
----------------sub_view1/
--------------------sub_view1.html
--------------------sub_view1.js
----------------sub_view2/
--------------------sub_view1.html
--------------------sub_view1.js
------------view2/
----------------view2.html
----------------view2.js
--------services/
--------filtes/
--------app.module.js
--------app.routes.js
--------app.html
```


Put the following code into ```server.js```:

```javascript
var express = require('express');
var app = express();
app.use(express.static('./public'));
app.get('*', function(req, res) {
	res.sendfile('public/app.html');
});
app.listen(5000);
```
Now you can run the express server to serve your angular application:

```sh
$ nodemon server.js
```

Put the following code into ```app.html```:

```html
<!DOCTYPE html>
<html ng-app='moduleName'>
<head>
	<title></title>
	<base href='/'>
	<meta http-equiv='X-UA-Compatible' content='IE=Edge'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<link rel='stylesheet' href='lib/bootstrap/dist/css/bootstrap.min.css'/>
</head>
<body>
	<div ui-view></div>
	
	<script src='lib/jquery/dist/jquery.min.js'></script>
	<script src='lib/bootstrap/dist/js/bootstrap.min.js'></script>
	<script src='lib/angular/angular.min.js'></script>
	
	<script src='app.module.js'></script>
	<script src='app.routes.js'></script>
</body>
</html>
```
Create your application module, by putting the following line in In ```app.module.js```:

```javascript
var app = angular.module('moduleName', []);
```

This line, instantiates an angular module with an empty list of dependencies. If you only pass a string to the ```angular.module```, Angular does not create a new module but looks for an already created module with the given name.

The variable ```app``` is your main angular application. You can call some high level functions on this variable, like ```config```, ```controller```, ```filter```, ```directive```, etc. These high level function take an anonymous function. That function can be defined to take any number of parameters.  The order of these parameters does not matter.  Let us say these parameters are injectable angular entities. Injectable entities include services, filters, providers, etc. Injectable entities are either made by angular or yourself. All angular built-in ones start with a ```$``` at the beginning like ```$locationProvider```, ```$routeProvider```, etc. 

Your angular app needs a piece of HTML to manage. ```ng-app``` directive in ```app.html``` specifies the main territory of your angular app. Let's call this territory the home of your angular app. Home is the main layout of your application. As the route changes in your application, the appropriate template will be rendered inside your home.

### 3. A List of Useful Injectable Entities

* ```$location``` is an angular service that can set and get the page url. You can use it to change the current route:

```javascript
$location.url('/contact/2');
```

* ```$timeout``` is an angular service that wraps around the javascript built-in timeout.

```javascript
var t = $timeout(function, 1000);
$timeout.cancel(t);
```

* ```$rootScope``` is an angular service that you can use to access the scope of your angular home. This scope is a kind of global scope, since it can be accessed anywhere in your angular app.

### 4. HTML Enhancements

* Put a variable in between curly braces to print its value: 

```javascript
{{var}}
```

* To repeat a div tag for each element of an array:

```html
<div ng-repeat='element in array'>
        ...
</div>
```

You can add pipe to this repeat procedure to filter or sort the elements:

```html
<div ng-repeat='element in array | filter: query | orderBy: fieldName : ascOrDscBoolean'>
...
```

* To show or hide an element on certain conditions add ```ng-show='js boolean expression'``` to an element.

* You can add a class to an element if certain conditions are true:

```html
<div ng-class="{'class0' : js expression, 'class1': js expression, ...}"></div>
```

* If

```html
<div ng-if="js expression"/>
```

* Switch Control

```html
<div ng-switch='targetVar'>
	<div ng-switch-when='value'></div>
	...
	<div ng-switch-default></div>
</div>
```

* Event handling:

```html
ng-click
ng-change
ng-blur // happens when user loses focus of the element
...
```

<!--ROUTING
ngRoute -- [OLD Routing]
In order to configure the routes of your angular application, you need to first install angular-route package separately, so navigate to the project folder: bower install angular-route
Add the js file for this package to the HTML: <script src=’angular-route.min.js’>
Now add ‘ngRoute’ to the dependency list when instantiating the main app.
You can now specify a route like the following:
app.config(function($routeProvider, $locationProvider) {
        $routeProvider.when(‘/contacts/:id’, {
                controller: ‘controllerName’,
                templateUrl: ‘pathToTheTemplate’
        });
        $locationProvider.html5Mode(true);
});
The html5Mode removes the #! from the start of routes.
Now you need to create a template and a controller. These two are tied together.
Template is an html piece of code. Each template has a $scope. Controller is a javascript code that initializes this scope (e.g. putting data and functions into it) before the template gets rendered.
Add a ng-view attribute to a div inside your angular home to specify where in the angular home you want your templates to be rendered.
HTML elements inside the template code, can be assigned a variable from the template’s scope. Adding ng-model=’var0’ to an html element assigns $scope.var0 to that element.-->

### 5. Routing Using UIRouter
```ui-router``` is a new way of angular routing which works with states instead of traditional plain routes like that of ```ngRoute```. 

Follow instructions [here](https://github.com/angular-ui/ui-router) to install ```ui-router``` using bower.

You can specify a state like the following:

```javascript
angular.module('moduleName')
	.config(function($locationProvider, $stateProvider,$urlRouterProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('main', {
				url: '/',
				controller: 'MainCtrl',
				templateUrl: 'views/main/main.html'
			});
	});
```

The ```html5Mode``` removes the ```#!``` from the start of routes.

With ```ui-router``` we construct a tree of states (e.g. a state can have children states). This tree represents the layout of views. Each state might be abstract (internal node) or concrete (leaf node). Internal nodes, can not be accessed directly by a route while leaf nodes are associated with urls. With ```"."``` in the name of states we can create children states. The most important difference of ```ui-router``` with ```ngRoute``` is the fact that ```ui-router``` supports multiple named and nested views.

Whenever you request for a new route, one single path from the root to one of the leaf nodes is traversed in the tree of states. Each state in this path can be associated with a template (view) and a controller. The template is the ```html``` code of the view and the controller is the ```javascript``` code that manages the behaviour of elements in the template. Before a template is rendered, its ```$scope``` is initiated with a bunch of variables and functions by the controller. The html of template is then rendered according to the data and eventHandlers provided in its ```$scope```.

```ui-view``` attribute is used to specify rendering points of children views inside a view.


### 6. Controllers

To create a controller, make a new js file write the following code:

```javascript
angular.module('moduleName').controller('ControllerName', 	function($scope, ...Necessary Entities...) {
        ...
});
```

Add a link to this file in your angular home.

### 7. Filters

You can create custom filters and pipe variables through them. To do that, create a js file and write the filter like the following:

```javascript
angular.module('moduleName').filter('filterName', function(...Necessary Entities...) {
	return function(input) {
		var output = change to input;
		return output;
	};
});
```
Add a link to this file in your angular home.

Use it like the following:

```html
{{ var0 | filterName }}
```

### 8. Directives

Directives are intelligent and reusable components. Below is an example of instantiating a directive somewhere inside a view:

**As an HTML Element**
```html
<directive-name param0='val0' param1='val1'></directive-name>
```

**As an HTML Attribute**
```html
<div param0='val0' param1='val1' directive-name></div>
```
A directive has a template and a controller very much like views. 

To create a directive, make a javascript and an HTML file. Make sure a link to the javascript file is added to your angular home. 

The javascript file looks like the following:

```javascript
angular.module('moduleName').directive('directive  Name', function (...Necessary Entities...) {
	return {
		restrict: 'EA',
		templateUrl: 'path/to/the/template',
		replace: true/false,
		scope: {
			param0: '=',
			param1: '@',
			...
		},
		link: function ($scope, element, attr) {
			...
		}
	};
});
```

The value of ```restrict``` specifies how is this directive allowed to be used. ```E``` stands for element and ```A``` stands for attribute.

The value of ```replace``` specifies whether we want the template for this directive to replace the html element this directive is instantiated with or just be inserted inside it.

The value of ```scope``` specifies which attributes of the html element this directive is instantiated with should be put inside the ```$scope``` of this directive and with which type of binding. ```'='``` indicates a two way binding and ```'@'``` indicates one way value binding and ```'&'``` is used for binding functions. 

In case of one way binding, your modifications to the variable is not seen outside the ```$scope``` of this directive.

The value of ```link``` is a function which acts as a controller for this directive.
 
### 9. RESTful Factories

Restful factories are angular services which talk to rest APIs.

To create a restful factory, first, install angular-resource package. Follow instructions [here](https://docs.angularjs.org/api/ngResource) to install this package using bower.

Second, create a javascript file for this factory and make sure it is added in your angular home.

The javascript code looks like the following:
```javascript
angular.module('moduleName').factory('Contact', function ($resource) {
	return $resource('/api/contact/:id', {id: '@id'}, {
		'update': {'method': 'PATCH'}
	});
});
```
Now we have a factory called ```Contact``` and since factories are one kind of angular entity, we can pass it to any controller so that we can talk with the rest api for resource ```Contact```:

Finding all:
```javascript
Contact.query();
// GET request for /api/contacts
```
Finding one:

```javascript
Contact.get({id: 12})
// GET request for /api/contacts/12
```
Creating a new contact:
```javascript
var c = new Contact({...params...});
```
Saving a new contact:

```javascript
c0.$save(function(response, headers) {},
	function(error) {});
// POST request for /api/contacts with params in c0
```
Read the complete list of things you can do with angular resource package [here](https://docs.angularjs.org/api/ngResource/service/$resource).

### 10. Working With Forms
```html
<form name='formName'></form>
```

Giving names to forms makes it possible to perform validation operations like the following:
```javascript
$scope.formName.$invalid
$scope.formName.$dirty
	// checks if any of the form's input elements have been changed
$scope.formName.$setDirty()
```

### 11. Events

You can broadcast an event with a key in a particular scope:
```javascript
$scope.$broadcast('key');
```
And also define handlers for them:
```javascript
$scope.on('key', function () {...});
```

### 12. Value Providers

A value provider is an angular entity that can be passed to controllers, directives, filters, etc. and provide them with a constant value. A good example of where you can use this, is providing different components of your angular application with the path to your api.

```javascript
angular.module('moduleName').value('NameOfValue', valueOfValue);
```

### 13. Authentication

In SPAs we have token-based-authentication. That means when client (e.g. the angular application) requests to log in, the server first checks the given password. If the password is valid, the server creates a signed token that includes the user’s username (and possibly some other information such as an expiry date, etc.) and returns this token to the client. Client saves this token and sends it back to the server in the header of future http requests. The server then validates the token it receives upon each request. If the token is manipulated by the user, the server will know because the new signature would not be valid.

To make your angular app able to save the server’s token, you need to install ```angular-storage``` package. Follow instructions [here](https://github.com/auth0/angular-storage) to install this package using bower.

After you installed the package, you can inject ```store``` to the controller or directive in which you want to store the server’s token and use it like the following:

```javascript
store.set('token_key', value);
```

Now, you need to write a code that intercepts every http request before sending it to server and put locally saved token in its header. To do that, follow instructions [here](https://github.com/auth0/angular-jwt) to install ```angular-jwt``` package using bower.

Now, inject ```$httpProvider```, ```jwtInterceptorProvider```, and ```store``` to the entity ```config``` (it is where we configured our routes, remember?) and add the following code there:

```javascript
jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token_key');
};
$httpProvider.interceptors.push('jwtInterceptor');
```
It would also be nice to put a method in ```$rootScope``` to check ```logged_in``` state of the app according to the existence and of ```token_key```. If a ```token_key``` can be found, it means that the user is already authenticated. Therefore to log the user out you only need to delete ```token_key``` from the local storage. 

Using the above state, you can protect routes and operations in your angular application.


