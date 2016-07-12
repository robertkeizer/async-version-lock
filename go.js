var fs = require( "fs" );
var async = require( "async" );
var path = require( "path" );
var find	= require( "find" );

const PROJECT_PATH="/Users/robertkeizer/src/body-parser";

async.waterfall( [ function( cb ){
	
	find.file( "package.json",path.join( PROJECT_PATH, "node_modules" ), function( files ){
		return cb( null, files );
	} );
}, function( files, cb ){
	async.filter( files, function( file, cb ){
		const _import = require( file );

		var _found = false;
		[ "dependencies", "devDependencies" ].forEach( function( particularDep ){
			if( _import[particularDep] && _import[particularDep].async ){
				// Check if it locked

				if( _import[particularDep].async === "*" ){
					_found = true;
				}
			}
		} );
		return cb( null, _found );
	}, cb );
}, function( files, cb ){
	console.log( files );
} ], function( err ){
	console.log( err );
} );
