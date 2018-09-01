<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

class NotificationController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function send(Request $request){
        $response = null;
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'message' => 'required',
            'os' => 'required',
            'sender' => 'required',
            'receiver' => 'required',
            'launch_url' => 'required'            
        ]);

        if(!$validator->fails()){
            $params = $request->all();            
            $apps = \App\Models\App::findMany($params['receiver']);            
            foreach($apps as $app){
                $client = $app->getOneSignalClient();
                $client->sendNotificationToAll($params['message'], $params['launch_url'], $params['additional_fields'], null, null);
            }
            $response = $this->makeJSONResponse(true, '', true, []);
        }else{
            $response = $this->makeJSONResponse(false, 'Invalid request', [], []);
        }
        return $response;
    }
}
