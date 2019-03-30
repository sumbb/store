// The Two rules for changing the state is 
// 1. Only an event can change the state of the store. 
//    The event can be represented as an Action object 
// 2. The function that returns the new state needs to be a pure function.

function createStore() {
	// The Store should have four parts
	//1. The State
	//2. Get the state
	//3. Listen to the changes on the state
	//4. Update the state
	let state
	let listeners = []

	getState = () => state
	subscribe = (listener) => {
		listeners.push(listener)
		return () => {
			listeners.filter((l) => l !== listener)
		}
	}

	return {
		getState
	} 
}

const store = createStore()

store.subscribe(() => {
	console.log("The State has changes to ", store.getState())
})

const unsubscribe = store.subscribe(() => {
	console.log("The State of the store is changed")
})

unsubscribe()