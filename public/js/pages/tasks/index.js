/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/pages/tasks/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stores_task_store__ = __webpack_require__("./resources/assets/js/stores/task-store.js");


var FORM_LIST_MODE = 0;
var FORM_REGISTER_MODE = 1;

new Vue({
	el: '#app',

	store: __WEBPACK_IMPORTED_MODULE_0__stores_task_store__["a" /* default */],

	data: {
		formMode: 0,

		taskData: {
			id: null,
			title: null,
			body: null,
			start_date: null,
			finish_date: null,
			user_id: null
		},

		loadingState: false
	},

	created: function created() {
		this.changeToListMode();
		this.loadTasks();
		this.loadUsers();
	},
	mounted: function mounted() {
		this.turnOffLoading();
	},


	computed: {
		isListMode: function isListMode(state) {
			return state.formMode == FORM_LIST_MODE;
		},
		isRegisterMode: function isRegisterMode(state) {
			return state.formMode == FORM_REGISTER_MODE;
		},

		tasks: function tasks(state) {
			return state.$store.getters.tasks;
		},
		users: function users(state) {
			return state.$store.getters.users;
		},

		isLoading: function isLoading(state) {
			return state.loadingState;
		}
	},

	methods: {
		/**
   * Change form mode to List mode
   */
		changeToListMode: function changeToListMode() {
			this.formMode = FORM_LIST_MODE;
		},


		/**
   * Change form mode to Registration mode
   */
		changeToRegisterMode: function changeToRegisterMode() {
			this.formMode = FORM_REGISTER_MODE;
		},


		/**
   * Show loading icon
   */
		turnOnLoading: function turnOnLoading() {
			this.loadingState = true;
		},


		/**
   * Hide loading icon
   */
		turnOffLoading: function turnOffLoading() {
			this.loadingState = false;
		},


		/**
   * Load tasks
   */
		loadTasks: function loadTasks() {
			this.$store.dispatch('loadTasksByPage', 1);
		},


		/**
   * Load users
   */
		loadUsers: function loadUsers() {
			this.$store.dispatch('loadUsersList');
		},


		/**
   * Reset task data
   *
   * @param      {<type>}  state   The state
   */
		resetTaskData: function resetTaskData(state) {
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
		newRecord: function newRecord() {
			this.resetTaskData();
			this.changeToRegisterMode();
		},


		/**
   * Cancel registration
   */
		cancelRegistration: function cancelRegistration() {
			this.resetTaskData();
			this.changeToListMode();
		},


		/**
   * Delete a task
   *
   * @param      {<type>}  task    The task
   */
		deleteTask: function deleteTask(task) {
			var result = confirm('Are you sure to delete [' + task.title + ']');

			if (!result) {
				return;
			}

			this.$store.dispatch('deleteTask', task);
		},


		/**
   * Register new task
   */
		registerTask: function registerTask() {
			var _this = this;

			this.turnOnLoading();

			this.$store.dispatch('registerTask', this.taskData).then(function (res) {
				_this.turnOffLoading();
				_this.changeToListMode();
			}).catch(function (err) {
				_this.turnOffLoading();
				alert(err.message);
			});
		},


		/**
   * Edit a task
   *
   * @param      {<type>}  task    The task
   */
		editTask: function editTask(task) {
			var _this2 = this;

			this.$store.dispatch('loadTaskData', task).then(function (res) {
				_this2.taskData = res.data;

				_this2.changeToRegisterMode();
			}).catch(function (err) {
				return alert(err.message);
			});
		}
	}
});

/***/ }),

/***/ "./resources/assets/js/stores/task-store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (new Vuex.Store({
	state: {
		tasksData: {},
		users: []
	},

	getters: {
		tasks: function tasks(state) {
			return state.tasksData.data;
		},
		users: function users(state) {
			return state.users;
		}
	},

	mutations: {
		setTasksData: function setTasksData(state, data) {
			return state.tasksData = data;
		},
		setUsers: function setUsers(state, data) {
			return state.users = data;
		},

		insertTask: function insertTask(state, data) {
			return state.tasksData.data.push(data);
		},

		deleteTask: function deleteTask(state, data) {
			var index = state.tasksData.data.map(function (el) {
				return el.id;
			}).indexOf(data.id);

			if (index != -1) {
				state.tasksData.data.splice(index, 1);
			}
		},
		updateTask: function updateTask(state, data) {
			var task = state.tasksData.data.filter(function (el) {
				return el.id == data.id;
			})[0];

			if (null != task) {
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
		loadTasksByPage: function loadTasksByPage(context, page) {
			axios.get('/tasks?page=' + page).then(function (res) {
				return context.commit('setTasksData', res.data);
			}).catch(function (err) {
				return alert(err.message);
			});
		},


		/**
   * Load Users list
   *
   * @param      {<type>}  context  The context
   * @param      {string}  page     The page
   */
		loadUsersList: function loadUsersList(context, page) {
			axios.get('/users/data/allUsers').then(function (res) {
				return context.commit('setUsers', res.data);
			}).catch(function (err) {
				return alert(err.message);
			});
		},


		/**
   * Delete a task
   *
   * @param      {<type>}  context  The context
   * @param      {<type>}  task     The task
   */
		deleteTask: function deleteTask(context, task) {
			axios.delete('/tasks/' + task.id).then(function (res) {
				if (res.data.state == true) {
					context.commit('deleteTask', task);

					return;
				}

				alert('Delete task failed');
			}).catch(function (err) {
				return alert(err.message);
			});
		},


		/**
   * Register a task
   */
		registerTask: function registerTask(context, task) {
			return new Promise(function (resolve, reject) {
				if (task.id == null) {
					axios.post('/tasks', task).then(function (res) {
						if (res.data.state == true) {
							context.commit('insertTask', res.data.newTask);

							resolve(res);

							return;
						}

						alert('Register task failed!');
					}).catch(function (err) {
						alert(err.message);

						reject(err);
					});
				} else {
					axios.put('/tasks/' + task.id, task).then(function (res) {
						if (res.data.state == true) {
							context.commit('updateTask', res.data.newTask);

							resolve(res);

							return;
						}

						alert('Register task failed!');
					}).catch(function (err) {
						alert(err.message);

						reject(err);
					});
				}
			});
		},


		/**
   * Load task data
   */
		loadTaskData: function loadTaskData(context, task) {
			return new Promise(function (resolve, reject) {
				axios.get('/tasks/' + task.id).then(function (res) {
					return resolve(res);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}
}));

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/pages/tasks/index.js");


/***/ })

/******/ });