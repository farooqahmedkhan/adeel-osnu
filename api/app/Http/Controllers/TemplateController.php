<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

class TemplateController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = \App\Models\Template::filterByRequest($request->only(['os']));
        $templates = $q->get();
        return $this->makeJSONResponse(true, '', $templates, []);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->makeJSONResponse(true, 'This endpoint is not implemented', [], []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = null;
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'name' => 'required',
            'message' => 'required',
            'os' => 'required'            
        ]);

        if(!$validator->fails()){
            $params = $request->all();
            $tempObject = array(
                "title" => $params['title'],
                "name" => $params['name'],
                "os" => $params['os'],
                "json" => json_encode(array(
                    "name" => $params['name'],
                    "message" => $params['message'],
                    // "launch_url" => $params['launch_url'],
                    "additional_fields" => $params['additional_fields'],
                    'big_picture' => $params['big_picture']
                )),
                "parent_id" => null
            );
            $template = \App\Models\Template::create($tempObject);
            $response = $this->makeJSONResponse(true, '', $template, []);
        }else{
            $response = $this->makeJSONResponse(false, 'Invalid request', [], []);
        }
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $validator = Validator::make(array('id' => $id), [
            'id' => 'exists:templates'
        ]);
        if(!$validator->fails()){
            $template = \App\Models\Template::find($id);       
            $data = array(
                'id' => $template->id,
                'title' => $template->title,
                'name' => $template->name,
                'json' => $template->json,
                'os' => $template->os
            );     
            return $this->makeJSONResponse(true, '', $data, []);
        }else{
            return $this->makeJSONResponse(false, 'Invalid request', [], []);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return $this->makeJSONResponse(true, 'This endpoint is not implemented', [], []);
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
        $response = null;
        
        $params = $request->all();
        $params['id'] = $id;

        $validator = Validator::make($params, [
            'id' => 'required|exists:templates',
            'title' => 'required',
            'name' => 'required',
            'message' => 'required',
            'os' => 'required'
        ]);
                
        if(!$validator->fails()){
            $params = $request->all();
            $tempObject = array(
                "title" => $params['title'],
                "name" => $params['name'],
                "os" => $params['os'],
                "json" => json_encode(array(
                    "name" => $params['name'],
                    "message" => $params['message'],
                    // "launch_url" => $params['launch_url'],
                    "additional_fields" => $params['additional_fields'],
                    'big_picture' => $params['big_picture']
                )),
                "parent_id" => null
            );
            $template = \App\Models\Template::find($id);
            $status = $template->update($tempObject);
            $data = array(
                'id' => $template->id,
                'title' => $template->title,
                'name' => $template->name,
                'json' => $template->json,
                'os' => $template->os
            );     
            $response = $this->makeJSONResponse(true, $status, $data, []);
        }else{
            $response = $this->makeJSONResponse(false, 'Invalid request', [], []);
        }
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $validator = Validator::make(array('id' => $id), [
            'id' => 'exists:templates'
        ]);
        if(!$validator->fails()){
            $result = \App\Models\Template::destroy($id);            
            return $this->makeJSONResponse(true, 'Template deleted successfully', [$result], []);
        }else{
            return $this->makeJSONResponse(false, 'Invalid request', [], []);
        }
    }
}
