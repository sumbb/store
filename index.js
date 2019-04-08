// The Two rules for changing the state is 
// 1. Only an event can change the state of the store. 
//    The event can be represented as an Action object 
// 2. The function that returns the new state needs to be a pure function.

// Library code 
// function createStore(reducer) {
// 	// The Store should have four parts
// 	//1. The State
// 	//2. Get the state
// 	//3. Listen to the changes on the state
// 	//4. Update the state
// 	let state
// 	let listeners = []

// 	getState = () => state
// 	subscribe = (listener) => {
// 		listeners.push(listener)
// 		return () => {
// 			listeners.filter((l) => l !== listener)
// 		}
// 	}
// 	dispatch = (action) => {
// 		state = reducer(state, action)
// 		listeners.forEach((listener) => listener())
// 	}
// 	return {
// 		getState,
// 		subscribe,
// 		dispatch
// 	} 
// }

// Application code 

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const RECEIVE_DATA = 'RECEIVE_DATA'

function addTodoAction(todo) {
	return {
		type : ADD_TODO,
		todo
	}
}

function removeTodoAction(id) {
	return {
		type : REMOVE_TODO,
		id
	}
}

function toggleTodoAction(id) {
	return {
		type : TOGGLE_TODO,
		id
	}
}

function addGoalAction(goal) {
	return {
		type : ADD_GOAL,
		goal
	}
}

function removeGoalAction(id) {
	return {
		type : REMOVE_GOAL,
		id
	}
}

function receiveDataAction(todos, goals) {
	return {
		type : RECEIVE_DATA,
		todos,
		goals
	}
}

function todos (state = [], action) {
	switch (action.type ) {
		case ADD_TODO :
			return state.concat([action.todo])
		case REMOVE_TODO :
			return state.filter((todo) => todo.id !== action.id)
		case TOGGLE_TODO :
			return state.map((todo) => todo.id !== action.id ? todo :
			Object.assign({}, todo, { complete: !todo.complete }))
		case RECEIVE_DATA:
			return state.concat([...action.todos])	
		default :
			return state	
	}
}

function goals(state = [], action) {
	switch (action.type ) {
		case ADD_GOAL :
			return state.concat([action.goal])
		case REMOVE_GOAL :
			return state.filter((goal) => goal.id !== action.id)
		case RECEIVE_DATA:
			return state.concat([...action.goals])	
		default :
			return state	
	}
}

function loading(state = true, action) {
	switch(action.type) {
		case RECEIVE_DATA: 
			return false
		default:
			return state
	}
}

// function app(state = {}, action) {
// 	return {
// 		todos : todos(state.todos, action),
// 		goals : goals(state.goals, action)
// 	}
// }
const logger = (store) => (next) => (action) => {
	console.group(action.type)
		console.log('Dispatched', action)
		const newState = next(action)
		console.log('New state is :', store.getState())
	console.groupEnd()
	return newState
}

const checker = (store) => (next) => (action) => {
	if (action.type === ADD_TODO && action.todo.name.toLowerCase().includes('bitcoin')) {
		return alert("No, That is a bad idea")
	} else if(action.type === ADD_GOAL && action.goal.name.toLowerCase().includes('bitcoin')) {
		return alert("No, That is a bad idea")
	} else {
		return next(action)
	}
}

const store = Redux.createStore(Redux.combineReducers({
	todos,
	goals,
	loading
}), Redux.applyMiddleware(checker, logger))

store.subscribe(() => {
	console.log("The new state is : ", store.getState())
})

// Dispatch Code 
// store.dispatch(addTodoAction({
// 	id: 0,
// 	name: 'Walk the dog',
// 	complete: false,
//   }))
  
//   store.dispatch(addTodoAction({
// 	id: 1,
// 	name: 'Wash the car',
// 	complete: false,
//   }))
  
//   store.dispatch(addTodoAction({
// 	id: 2,
// 	name: 'Go to the gym',
// 	complete: true,
//   }))
  
//   store.dispatch(removeTodoAction(1))
  
//   store.dispatch(toggleTodoAction(0))
  
//   store.dispatch(addGoalAction({
// 	id: 0,
// 	name: 'Learn Redux'
//   }))
  
//   store.dispatch(addGoalAction({
// 	id: 1,
// 	name: 'Lose 20 pounds'
//   }))
  
//   store.dispatch(removeGoalAction(0))
// const unsubscribe = store.subscribe(() => {
// 	console.log("The State of the store is changed")
// })

// unsubscribe()