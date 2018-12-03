<?php 

namespace App\Helpers;

use Berkayk\OneSignal\OneSignalClient;

class NotificationClient extends OneSignalClient {

    public function send_notification_extended($input) {

        $params = array(
            'app_id' => $this->appId,
            'headings' => array("en" => $input['name']),            
            'contents' => array("en" => $input['message']),
            'included_segments' => array('All')
        );

        if(isset($input['big_picture'])){
            $params['big_picture'] = $input['big_picture'];            
        }

        if (isset($input['url'])) {
            $params['url'] = $input['url'];
        }

        if (isset($input['additional_fields'])) {
            $params['data'] = $input['additional_fields'];
        }             

        if(isset($input['delievery'])){
            if($input['delievery'] == "last-active"){
                $params['delayed_option'] = $input['delievery'];
            }
        }   
        
        \Log::debug('by-farooq', [$input, $params]);
        return $this->sendNotificationCustom($params);
    }
}

?>