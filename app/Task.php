<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
    	'title', 'body', 'start_date', 'finish_date', 'user_id'
    ];

    /**
     * Change start_date format
     *
     * @param      <type>  $date   The date
     *
     * @return     <type>  The start date attirbute.
     */
    public function getStartDateAttribute($date)
    {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
                            ->format('Y-m-d');
    }

    /**
     * Change finish_date format
     *
     * @param      <type>  $date   The date
     *
     * @return     <type>  The start date attirbute.
     */
    public function getFinishDateAttribute($date)
    {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
                            ->format('Y-m-d');
    }


    /**
     * Get Assigned user data
     */
    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }
}
