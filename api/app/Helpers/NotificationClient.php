<?php 

namespace App\Helpers;

use Berkayk\OneSignal\OneSignalClient;

class NotificationClient extends OneSignalClient {

    public function send_notification_extended($input) {

        $params = array(
            'app_id' => $this->appId,
            'headings' => array("en" => $input['title']),            
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

        if(isset($input['delivery'])){
            if($input['delivery'] == "last-active"){
                $params['delayed_option'] = $input['delivery'];
            }
        }

        $this->sendNotificationCustom($params);
    }
}

?>