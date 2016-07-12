var fs = require( "fs" );
var async = require( "async" );
var find	= require( "find" );

const PROJECT_PATH="/Users/robertkeizer/src/body-parser/";

async.waterfall( [ function( cb ){
	
	find.file( "package.json", PROJECT_PATH, function( files ){
		return cb( null, files );
	} );
}, function( files, cb ){
	async.filter( files, function( file, cb ){

		try{
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
		}catch(err){
			setTimeout( function( ){
				return cb( null, false );
			}, 10 );
		}
	}, cb );
}, function( files, cb ){
	console.log( files );
} ], function( err ){
	console.log( err );
} );
