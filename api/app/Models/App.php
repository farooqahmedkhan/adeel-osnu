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
        'one_signal_user_auth_key',
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

    public function getOneSignalClient(){
        $client = new OneSignalClient($this->one_signal_key, $this->one_signal_rest_api_key, $this->one_signal_user_auth_key);
        return $client;
    }
}
