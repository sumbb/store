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
	switch (action.type ) {
		case "ADD_TODO" :
			return state.concat([action.todo])
		case "REMOVE_TODO" :
			return state.filter((todo) => todo.id !== action.id)
		case "TOGGLE_TODO" :
			return state.map((todo) => todo.id !== action.id ? todo :
			Object.assign({}, todo, { complete: !todo.complete }))
		default :
			return state	
	}
}

function goals(state = [], action) {
	switch (action.type ) {
		case "ADD_GOAL" :
			return state.concat([action.goal])
		case "REMOVE_GOAL" :
			return state.filter((goal) => goal.id !== action.id)
		default :
			return state	
	}
}

function app(state = {}, action) {
	return {
		todos : todo(state.todos, action),
		goals : goals(state.goals, action)
	}
}

const store = createStore(app)

store.subscribe(() => {
	console.log("The new state is : ", store.getState())
})

// Dispatch Code 
store.dispatch({
	type: 'ADD_TODO',
	todo: {
	  id: 0,
	  name: 'Walk the dog',
	  complete: false,
	}
  })
  
  store.dispatch({
	type: 'ADD_TODO',
	todo: {
	  id: 1,
	  name: 'Wash the car',
	  complete: false,
	}
  })
  
  store.dispatch({
	type: 'ADD_TODO',
	todo: {
	  id: 2,
	  name: 'Go to the gym',
	  complete: true,
	}
  })
  
  store.dispatch({
	type: 'REMOVE_TODO',
	id: 1
  })
  
  store.dispatch({
	type: 'TOGGLE_TODO',
	id: 0
  })
  
  store.dispatch({
	type: 'ADD_GOAL',
	goal: {
	  id: 0,
	  name: 'Learn Redux'
	}
  })
  
  store.dispatch({
	type: 'ADD_GOAL',
	goal: {
	  id: 1,
	  name: 'Lose 20 pounds'
	}
  })
  
  store.dispatch({
	type: 'REMOVE_GOAL',
	id: 0
  })

// const unsubscribe = store.subscribe(() => {
// 	console.log("The State of the store is changed")
// })

// unsubscribe()