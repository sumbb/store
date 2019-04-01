// The Two rules for changing the state is 
// 1. Only an event can change the state of the store. 
//    The event can be represented as an Action object 
// 2. The function that returns the new state needs to be a pure function.

// Library code 
function createStore(reducer) {
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
	dispatch = (action) => {
		state = reducer(state, action)
		listeners.forEach((listener) => listener())
	}
	return {
		getState,
		subscribe,
		dispatch
	} 
}

// Application code 
function todo (state = [], action) {
	if(action.type === "ADD_TODO") {
		return state.concat([action.todo])
	}

	return state
}


const store = createStore(todo)

store.subscribe(() => {
	console.log("The new state is : ", store.getState())
})

store.dispatch({
	type: "ADD_TODO",
	todo: {
		id: 0,
		name: "Learn Redux",
		complete: false
	}
})

// const unsubscribe = store.subscribe(() => {
// 	console.log("The State of the store is changed")
// })

// unsubscribe()