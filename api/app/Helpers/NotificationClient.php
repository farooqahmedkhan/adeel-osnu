<?php 

namespace App\Helpers;

use Berkayk\OneSignal\OneSignalClient;

class NotificationClient extends OneSignalClient {

    public function send_notification_extended($title, $message, $url = null, $data = null, $buttons = null, $schedule = null) {
        
        $headings = array( "en" => $title);
        $contents = array("en" => $message);

        $params = array(
            'app_id' => $this->appId,
            'headings' => $headings,
            'contents' => $contents,
            'included_segments' => array('All')
        );

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