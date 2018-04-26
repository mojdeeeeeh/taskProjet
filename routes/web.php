<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource('/tasks', 'TaskController');

Route::get('/users/data/allUsers', 'UserController@allUsers')
	 ->name('users.data.allUsers');