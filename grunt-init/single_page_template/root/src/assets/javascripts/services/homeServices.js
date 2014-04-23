{%= name %}Services.factory('Home', ['$resource', function($resource){
  return $resource(window.apiRemoteUrl.concat('home/:id'), {}, {
    'get':    {method:'GET'               },
    'create': {method:'POST'              },
    'update': {method:'PUT'               },
    'query':  {method:'GET', isArray:true },
    'remove': {method:'DELETE'            },
    'delete': {method:'DELETE'            }
  });
}]);

