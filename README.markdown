## Ele (the elephant that never forgets)

Ele is a super-simple logging library.  It lets you:

* store clones of non-function JS values (taking a 'JSON clone'\* of all object values)
* wrap any function to create a new function whose returns and arguments are auto-logged
* See the timestamp associated with any occurance of logging


\* *'JSON clone' refers to using JSON.stringify, then JSON.parse on a value, returning a JS value that won't be mutated later.*

## API 

Creating a logger instance is as easy as calling the library function:

```javascript
    var log = ele()
```

### Logging 

Logs are created with the .log method, which stores the log and generates the timestamp:

```javascript
    log.log({ comment: "Ele's pretty neat", user: "hughfdjackson(i'm not biased)" })
```

### Retrieving logs

All logs are stored in the .logs array, making access nice and easy: 

```javascript
    var firstLog = log.logs[0]
```

Logs are kept in the format:

```javascript
    firstLog.timestamp // the timestamp for the log's creation
    firstLog.val       // clone of the value logged
```

### Custom Cloning

If you need to change what cloning method is used, just replace .clone with your own custom function.  The method takes one argument (the value to be cloned), and returns a clone.

For Example

```javascript
    // replace with an identity function for no-clone
    log.clone = function(o){ return o }

    // a shallow clone function
    log.clone = function(o){
        var clone = {}
        for ( var prop in o ) clone[prop] = o[prop]
        return clone
    }
```

### Wrapping functions for logging purposes

With impure functions (like Math.random, for instance), it'd be nice to conveniently wrap it with a logger, letting us log each and every output from it.  Used properly, this might let us (for instance) play back a game session where random chance is involved.  This can be achieved with the .wrap method:

```javascript
    var log         = ele()
      , random      = log.wrap(Math.random, 'random')
      , randomNum   = random()

    var firstLog    = log.logs[0]

    firstLog.val.args   // an array of arguments that random was called with
    firstLog.val.name   // 'random', the second argument passed to log.wrap
    firstLog.val.result // the value returned from the wrapped function
```


# Tests

Feel free to [run the test suite](http://hughfdjackson.github.com/ele/test/)
