<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $RESPONSE = array(
        "status" => false,
        "message" => "",
        "data" => array(),
        "errors" => array()
    );

    protected function makeJSONResponse($status = false, $message = "", $data = [], $errors = []){
        $this->RESPONSE['status'] = $status;
        $this->RESPONSE['message'] = $message;
        $this->RESPONSE['data'] = $data;
        $this->RESPONSE['errors'] = $errors;
        return response()->json($this->RESPONSE);
    }
}
