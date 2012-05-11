void function(root){

    // util
    var factory = function(o){
        var f = function(){ if ( this.init ) this.init.apply(this, arguments) }
        f.prototype = o
        return function(){ 
            return new f
        }
    }

    var extend = function(t, f){ for ( var p in f ) t[p] = f[p]; return t }


    // library
    var ele = factory({
        init: function(){
            this.logs = []
        }
      , log : function(o){
            var log = { timestamp: +new Date, val: o }
            this.logs.push(log)
        }
      , wrap: function(fn){
            var _this = this

            return function(){ 
                _this.log([].slice.call(arguments))
                fn.apply(this, arguments)
            }  
        }
    })


    if ( typeof module != 'undefined' && typeof require != 'undefined' && module.exports ) 
        module.exports = ele
    else 
        root['ele'] = ele
}(this)
