<?php 

namespace App\Helpers;

use Berkayk\OneSignal\OneSignalClient;

class NotificationClient extends OneSignalClient {

    public function send_notification_extended($title, $message, $url = null, $data = null, $buttons = null, $schedule = null) {                

        $params = array(
            'app_id' => $this->appId,
            'headings' => array("en" => $title),            
            'contents' => array("en" => $message),
            'included_segments' => array('All')
        );

        if(isset($data['big_picture'])){
            $params['big_picture'] = $data['big_picture'];
            unset($data['big_picture']);            
        }

        if (isset($url)) {
            $params['url'] = $url;
        }

        if (isset($data)) {
            $params['data'] = $data;
        }

        if (isset($buttons)) {
            $params['buttons'] = $buttons;
        }

        if(isset($schedule)){
            $params['send_after'] = $schedule;
        }


        $this->sendNotificationCustom($params);
    }
}

?>