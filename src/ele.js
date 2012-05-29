void function(root){

    // util
    var factory = function(o){
            var f = function(){ if ( this.init ) this.init.apply(this, arguments) }
            f.prototype = o
            return function(){ 
                return new f
            }
        }
      , extend = function(t, f){ for ( var p in f ) t[p] = f[p]; return t }
      , slice  = Array.prototype.slice


    // library
    var ele = factory({

        // creates an instance-specific logs array
        init: function(){
            this.logs = []
        }

        // A clone hook that lets you clone items 
        // if you need to
      , clone: function(o){ 
            return typeof o == 'object' ? JSON.parse(JSON.stringify(o)) 
            :/* otherwise */              o    
        }

        // stores a JS value in the logs
      , log : function(o){
            var log = { timestamp: +new Date, val: this.clone(o) }
            this.logs.push(log)
        }

        // returns a function that can be called as normal
        // but will also log the return value
      , wrap: function(fn, meta){
            var _this = this
            
            meta = this.clone(meta)

            return function(){ 
                var res = fn.apply(this, arguments)
                _this.log({ result: res , args: slice.apply(arguments) , meta: meta })
                return res
            }  
        }
    })


    if ( typeof module != 'undefined' && typeof require != 'undefined' && module.exports ) 
        module.exports = ele
    else 
        root['ele'] = ele
}(this)
