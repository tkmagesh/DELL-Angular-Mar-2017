var ops = (function(){
	function addSync(x,y){
		console.log('		[Service] processing ', x , ' and ', y);
		var result = x + y;
		console.log('		[Service] returning result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Consumer] result = ', result);
	}

	function addAsync(x,y, onResult){
		console.log('		[Service] processing ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('		[Service] returning result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log('[Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Consumer] result = ', result);
		});
	}

	var addAsyncEvent = (function(){
		var _subscribers = [];
		function subscribe(subscriptionFn){
			_subscribers.push(subscriptionFn);
		}
		function add(x,y){
			console.log('		[Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('		[Service] returning result');
				_subscribers.forEach(function(subscriptionFn){
					if (typeof subscriptionFn === 'function')
						subscriptionFn(result);
				})
			}, 4000);
		}
		return {
			subscribe : subscribe,
			add : add
		};

	})();

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			console.log('		[Service] processing ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('		[Service] returning result');
				resolveFn(result);
			}, 4000);
		});
		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvent : addAsyncEvent,
		addAsyncPromise : addAsyncPromise
	}
})();