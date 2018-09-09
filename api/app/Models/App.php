<?php

namespace App\Models;

use Berkayk\OneSignal\OneSignalClient;
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $table_name = 'apps';

    protected $fillable = array(
        'name',
        'one_signal_key',
        'one_signal_rest_api_key',   
        'os'                  
    );

    protected $visible = array(
        'id',        
        'name',        
        'platform_name',
        'enabled'
    );

    protected $appends = array(
        'platform_name'
    );

    public function getPlatformNameAttribute(){
        return config('settings')['platforms'][$this->os];
    }

    public function getOneSignalClient(){
        $client = new OneSignalClient($this->one_signal_key, $this->one_signal_rest_api_key, $this->one_signal_user_auth_key);
        return $client;
    }

    public static function scopeFilterByRequest($query, $params = []){
        foreach($params as $key => $value){             
            if(in_array($value, [0,1])){
                $query = $query->where($key, $params[$key]);
            }            
        }        
        return $query;
    }
}
