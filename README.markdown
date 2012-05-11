## Ele (the elephant that never forgets)

Ele is a super-simple logging library.  It lets you:

* store any js value directly for later inspection/storage
* wrap any function so that its occurances get logged automatically
* See the timestamp associated with any occurance of logging

## API 

Creating a logger instance is as easy as calling the library function:

```javascript
    var log = ele()
```

### Logging 

Logs are created with the .log method, which stores the log and generates the timestamp:

```javascript
    log.log({ comment: "Ele's pretty neat", user: "hughfdjackson(i'm not biased)"})
```

### Retrieving logs

All logs are stored in the .logs array, making access nice and easy: 

```javascript
    var firstLog = log.logs[0]
```

Logs are kept in the format:

```javascript
    firstLog.timestamp // the timestamp for the log's creation
    firstLog.val       // whatever value was logged

```

### Wrapping functions for logging purposes

With impure functions (like Math.random, for instance), it'd be nice to conveniently wrap it with a logger, letting us log each and every output from it.  Used properly, this might let us (for instance) play back a game session where random chance is involved.  This can be achieved with the .wrap method:

```javascript
    var random      = log.wrap(Math.random)
      , randomNum   = random()
```

The log's .val property will be the return value of `random`
