<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $table_name = 'apps';

    protected $fillable = array(
        'name',
        'one_signal_key',
        'os'                  
    );

    protected $visible = array(
        'id',
        'name',
        'os'       
    );
}
