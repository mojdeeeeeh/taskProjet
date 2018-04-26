<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
	/**
	 * Return all users
	 */
    public function allUsers()
    {
    	return \App\User::select('id', 'name', 'email')
    	                ->get();
    }
}
