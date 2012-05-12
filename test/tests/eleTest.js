module('ele')

test('creation', function(){
    var log = ele()
    ok(log instanceof Object)
})

test('log object', function(){
    var log         = ele()
      , toBeLogged  = { x: 34, y: 'comment', f: function(){} }
    
    log.log(toBeLogged)

    // mutate the object in the meantime
    toBeLogged.x = null
    toBeLogged.y = null
    toBeLogged.f = null

    var retrievedLog = log.logs[0]
    equal(retrievedLog.val.x, 34)
    equal(retrievedLog.val.y, 'comment')
    ok(typeof retrievedLog.val.f == 'undefined')
    ok(retrievedLog.timestamp, 'has timestamp')
})

test('log string', function(){
    var log = ele()

    log.log('foo')
    equal(log.logs[0].val, 'foo')
})

test('log number', function(){
    var log = ele()

    log.log(5)
    equal(log.logs[0].val, 5)
})

test('log delegates to clone', function(){
    var log = ele()
    log.clone = sinon.spy()
    
    log.log('foo')
    ok(log.clone.calledWith('foo'))
})

test('wrap', function(){
    var log = ele()
      , rand= log.wrap(Math.random)
      , res = rand()

    ok(res, 'res isn\'t simply undefined')
    equal(res, log.logs[0].val)
})
