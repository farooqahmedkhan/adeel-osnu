<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $table_name = "templates";

    protected $fillable = array(
        'name',
        'json',
        'os'        
    );

    protected $visible = array(
        'id',
        'name',
        'platform_name'
    );

    protected $appends = array(
        'platform_name'
    );

    public function getPlatformNameAttribute(){
        return config('settings')['platforms'][$this->os];
    }
}
