@extends('layouts.app')

@section('content')
<div class="container">
	<div v-show="isLoading">
		<h3>LOADING...</h3>
	</div>

	<div class="row container" v-show="isListMode">
		<div class="btn-group" role="group" aria-label="Basic example">
			<button type="button"  class="btn btn-primary" @click.prevent="newRecord">+NEW</button>
		</div>	
	</div>

	<div v-show="isListMode">
		@include('tasks.list')
	</div>
	
	<div v-if="isRegisterMode">
		@include('tasks.register')
	</div>
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('js/pages/tasks/index.js') }}" defer></script>
@endsection