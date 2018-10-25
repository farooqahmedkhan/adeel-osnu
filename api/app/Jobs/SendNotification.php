<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $_data = [];
    // protected $_title = "";
    // protected $_message = "";
    // protected $_receiver = "";
    // protected $_big_picture = "";
    // protected $_delivery = "";
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($receiver, $params)
    {        
        // $this->_title = $params['name'];
        // $this->_message = $params['message'];
        // $this->_data = $params['additional_fields'];
        // $this->_big_picture = $params['big_picture'];
        $this->_receiver = $receiver;
        $this->_data = $params; 
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $app = \App\Models\App::find($this->_receiver);
        if(!empty($app)){
            $client = $app->getOneSignalClient();
            // $response = $client->send_notification_extended($this->_title, $this->_message, null, $this->_data, null, null);                    
            $response = $client->send_notification_extended($this->_data);                    
        }        
    }
}
