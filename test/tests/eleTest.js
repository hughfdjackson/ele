module('ele')

test('creation', function(){
    var log = ele()
    ok(log instanceof Object)
})

test('log', function(){
    var log         = ele()
      , toBeLogged  = { x: 34, y: 'comment' }
    
    log.log(toBeLogged)

    var retrievedLog = log.logs[0]
    equal(retrievedLog.val.x, 34)
    equal(retrievedLog.val.y, 'comment')
    ok(retrievedLog.timestamp, 'has timestamp')
})

test('wrap', function(){
    var log = ele()
      , rand= log.wrap(Math.random)
      , res = rand()

    ok(res, 'res isn\'t simply undefined')
    equal(res, log.logs[0].val)
})
