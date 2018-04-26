import Store from '../../stores/task-store'

const FORM_LIST_MODE = 0;
const FORM_REGISTER_MODE = 1;

new Vue({
	el: '#app',

	store: Store,

	data:{
		formMode: 0,

		taskData: {
			id: null,
			title: null,
			body: null,
			start_date: null,
			finish_date: null,
			user_id: null,
		},

		loadingState: false,
	},

	created(){
		this.changeToListMode();
		this.loadTasks();
		this.loadUsers();
	},

	mounted(){
		this.turnOffLoading();
	},

	computed: {
		isListMode: state => state.formMode == FORM_LIST_MODE,
		isRegisterMode: state => state.formMode == FORM_REGISTER_MODE,

		tasks: state => state.$store.getters.tasks,
		users: state => state.$store.getters.users,

		isLoading: state => state.loadingState
	},

	methods:{
		/**
		 * Change form mode to List mode
		 */
		changeToListMode(){
			this.formMode = FORM_LIST_MODE;
		},

		/**
		 * Change form mode to Registration mode
		 */
		changeToRegisterMode(){
			this.formMode = FORM_REGISTER_MODE;
		},

		/**
		 * Show loading icon
		 */
		turnOnLoading(){
			this.loadingState = true;
		},

		/**
		 * Hide loading icon
		 */
		turnOffLoading(){
			this.loadingState = false;
		},

		/**
		 * Load tasks
		 */
		loadTasks(){
			this.$store.dispatch('loadTasksByPage', 1);
		},

		/**
		 * Load users
		 */
		loadUsers(){
			this.$store.dispatch('loadUsersList');
		},

		/**
		 * Reset task data
		 *
		 * @param      {<type>}  state   The state
		 */
		resetTaskData(state){
			this.taskData.id = null;
			this.taskData.title = null;
			this.taskData.body = null;
			this.taskData.start_date = null;
			this.taskData.finish_date = null;
			this.taskData.user_id = null;
		},

		/**
		 * New record dialog
		 */
		newRecord(){
			this.resetTaskData();
			this.changeToRegisterMode();
		},

		/**
		 * Cancel registration
		 */
		cancelRegistration(){
			this.resetTaskData();
			this.changeToListMode();
		},

		/**
		 * Delete a task
		 *
		 * @param      {<type>}  task    The task
		 */
		deleteTask(task){
			let result = confirm('Are you sure to delete [' + task.title + ']');

			if (! result){
				return;
			}

			this.$store.dispatch('deleteTask', task);
		},


		/**
		 * Register new task
		 */
		registerTask(){
			this.turnOnLoading();

			this.$store.dispatch('registerTask', this.taskData)
				.then(res => {
					this.turnOffLoading();
					this.changeToListMode();
				})
				.catch(err => {
					this.turnOffLoading();
					alert(err.message);
				})
		},

		/**
		 * Edit a task
		 *
		 * @param      {<type>}  task    The task
		 */
		editTask(task){
			this.$store.dispatch('loadTaskData', task)
				.then(res => {
					this.taskData = res.data;

					this.changeToRegisterMode();
				})
				.catch(err => alert(err.message));
		}
	}
})