export default new Vuex.Store({
	state: {
		tasksData: {},
		users: []
	},

	getters: {
		tasks: state => state.tasksData.data,
		users: state => state.users
	},

	mutations: {
		setTasksData: (state, data) => state.tasksData = data,
		setUsers: (state, data) => state.users = data,

		insertTask: (state, data) => state.tasksData.data.push(data),

		deleteTask(state, data){
			let index = state.tasksData.data.map(el => el.id)
											.indexOf(data.id);

            if (index != -1){
            	state.tasksData.data.splice(index, 1);
            }
		},

		updateTask(state, data){
			let task = state.tasksData.data.filter(el => el.id == data.id)[0];
            
            if (null != task){
            	task.id = data.id;	
            	task.title = data.title;	
            	task.body = data.body;	
            	task.start_date = data.start_date;	
            	task.finish_date = data.finish_date;	
            	task.user_id = data.user_id;	

            	task.user = data.user;
            }
		}
	},

	actions: {
		/**
		 * Load tasks data as paged data
		 *
		 * @param      {<type>}  context  The context
		 * @param      {string}  page     The page
		 */
		loadTasksByPage(context, page){
			axios.get('/tasks?page=' + page)
				.then(res => context.commit('setTasksData', res.data))
				.catch(err => alert(err.message));
		},

		/**
		 * Load Users list
		 *
		 * @param      {<type>}  context  The context
		 * @param      {string}  page     The page
		 */
		loadUsersList(context, page){
			axios.get('/users/data/allUsers')
			 	.then(res => context.commit('setUsers', res.data))
				.catch(err => alert(err.message));
		},

		/**
		 * Delete a task
		 *
		 * @param      {<type>}  context  The context
		 * @param      {<type>}  task     The task
		 */
		deleteTask(context, task){
			axios.delete('/tasks/' + task.id)
				.then(res => {
					if (res.data.state == true){
						context.commit('deleteTask', task);

						return;
					}

					alert('Delete task failed');
				})
				.catch(err => alert(err.message));
		},

		/**
		 * Register a task
		 */
		registerTask(context, task){
			return new Promise((resolve, reject) => {
				if (task.id == null)
				{
					axios.post('/tasks', task)
						.then(res => {
							if (res.data.state == true){
								context.commit('insertTask', res.data.newTask);
								
								resolve(res);

								return;
							}

							alert('Register task failed!');
						})
						.catch(err => {
							alert(err.message);

							reject(err);
						});
				}
				else
				{
					axios.put('/tasks/' + task.id, task)
						.then(res => {
							if (res.data.state == true){
								context.commit('updateTask', res.data.newTask);
								
								resolve(res);

								return;
							}

							alert('Register task failed!');
						})
						.catch(err => {
							alert(err.message);

							reject(err);
						});
				}
			});
		},

		/**
		 * Load task data
		 */
		loadTaskData(context, task){
			return new Promise((resolve, reject) => {
				axios.get('/tasks/' + task.id)
					.then(res => resolve(res))
					.catch(err => reject(err));
			});
		}
	}
});