<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{        
    protected $table_name = 'templates';

    protected $fillable = array(
        'name',
        'json',
        'os',
        'parent_id'
    );

    protected $visible = array(
        'id',
        'name',
        'json',
        'os',
        'parent_id'
    );
}
