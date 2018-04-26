<div class="row container">
	
	<form class="form-horizontal col-md-12">
		<legend class="text-center">
			<h3>Register new Task</h3>
		</legend>

		<div class="form-group row">
			<label for="name" class="col-md-4 col-form-label text-md-right">Title</label>

			<div class="col-md-6">
				<input id="name" type="text" class="form-control" name="name" v-model="taskData.title" required autofocus>
			</div>
		</div>

		<div class="form-group row">
			<label for="body" class="col-md-4 col-form-label text-md-right">Body</label>

			<div class="col-md-6">
				<textarea id="body" type="text" class="form-control" name="body" v-model="taskData.body" required></textarea>
			</div>
		</div>

		<div class="form-group row">
			<label for="start_date" class="col-md-4 col-form-label text-md-right">Start date</label>

			<div class="col-md-6">
				<input id="start_date" type="date" class="form-control" name="start_date" v-model="taskData.start_date" required>
			</div>
		</div>

		<div class="form-group row">
			<label for="finish_date" class="col-md-4 col-form-label text-md-right">Finish date</label>

			<div class="col-md-6">
				<input id="finish_date" type="date" class="form-control" name="finish_date" v-model="taskData.finish_date" required>
			</div>
		</div>

		<div class="form-group row">
			<label for="user_id" class="col-md-4 col-form-label text-md-right">User</label>

			<div class="col-md-6">
				<select name="user_id" id="user_id" required v-model="taskData.user_id">
					<option v-for="user in users" :value="user.id">@{{ '[' + user.name + ']' + user.email }}</option>
				</select>
			</div>
		</div>

		<div class="form-group row">
			<label for="user_id" class="col-md-4 col-form-label text-md-right"></label>

			<div class="col-md-6">
				<button class="btn btn-success" @click.prevent="registerTask">Register</button>
				<button class="btn btn-danger" @click.prevent="cancelRegistration">Cancel</button>
			</div>
		</div>

	
	</form>

</div>