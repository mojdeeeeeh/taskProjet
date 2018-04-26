<table class="table table-striped table-hover">
	<thead>
		<tr>
			<th>Title</th>
			<th>Start</th>
			<th>Finish</th>
			<th>User name</th>
			<th></th>
		</tr>
	</thead>

	<tbody>
		<tr v-for="task in tasks">
			<td>@{{ task.title }}</td>
			<td>@{{ task.start_date }}</td>
			<td>@{{ task.finish_date }}</td>
			<td>@{{ '[' + task.user.name + '] ' + task.user.email }}</td>
			<td>
				<a href="#" @click.prevent="deleteTask(task)">Delete</a>
				<a href="#" @click.prevent="editTask(task)">Update</a>
			</td>
		</tr>
	</tbody>
</table>
