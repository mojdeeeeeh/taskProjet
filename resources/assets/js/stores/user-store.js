// export default new Vuex.Store({
// 	state: {
// 		pageData: {},
// 		allUsers: []
// 	},

// 	getters: {
// 		users: state => state.users_data 
// 	},

// 	mutations: {
// 		setPageData: (state, data) => state.pageData = data,
// 		setAllUsers: (state, data) => state.allUsers = data
// 	},

// 	actions: {
// 		loadUsers(context, page){
// 			axios.get('/users')
// 				.then(res => context.commit('setPageData', res.data))
// 		},

// 		loadAllUsers(context){
// 			axios.get('/users/data/allUsers')
// 				.then(res => context.commit('setPageData', res.data))
// 		}
// 	}
// });