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

    protected $_message = "";
    protected $_receiver = "";
    protected $_data = [];
    protected $_big_picture = "";
    // protected $_delivery = "";
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($receiver, $message, $data, $big_picture = "")
    {
        $this->_message = $message;
        $this->_receiver = $receiver;
        $this->_data = $data;
        $this->_big_picture = $big_picture;        
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
            $response = $client->sendNotificationToAll($this->_message, null, $this->_data, null, null);
            // $response = $client->sendNotificationCustom([
            //     'app_id' => $app->one_signal_key,
            //     'api_key' => $app->one_signal_rest_api_key,
            //     'data' => $this->_data,
            //     'content' => array(
            //         'en' => $this->_message
            //     ),
            //     'big_picture' => $this->_big_picture
            // ]);            
        }        
    }
}
