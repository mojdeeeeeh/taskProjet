<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Get Selected Task Fields
     */
    public function getTaskModels()
    {
        return [
            'user' => function ($query) {
                $query->select('id', 'name', 'email');
            }
        ];
    }

    /**
     * Get Selected Task Fields
     */
    public function getTaskFields()
    {
        return [
            'id', 'title', 'start_date', 'finish_date', 'user_id'
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax())
        {
            $models = $this->getTaskModels();
            $fields = $this->getTaskFields();

            return \App\Task::select($fields)
                            ->with($models)
                            ->paginate($this->C_PAGE_SIZE);
        }

        return view('tasks.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task = \App\Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'start_date' => $request->start_date,
            'finish_date' => $request->finish_date,
            'user_id' => $request->user_id,
        ]);

        // Purge task data
        $models = $this->getTaskModels();
        $fields = $this->getTaskFields();

        $task = \App\Task::with($models)
                         ->select($fields)
                         ->find($task->id);

        return [
            'state' => ! is_null($task),
            'newTask' => $task
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        $fields = $this->getTaskFields();
        $fields[] = 'body';

        return $task->only($fields);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $task->title = $request->title;
        $task->body = $request->body;
        $task->start_date = $request->start_date;
        $task->finish_date = $request->finish_date;
        $task->user_id = $request->user_id;

        $task->save();

        // Purge task data
        $models = $this->getTaskModels();
        $fields = $this->getTaskFields();

        $task = \App\Task::with($models)
                         ->select($fields)
                         ->find($task->id);

        return [
            'state' => ! is_null($task),
            'newTask' => $task
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return [
            'state' => true
        ];
    }
}
