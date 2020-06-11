<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubcriber {

    public function updateJwtData(JWTCreatedEvent $event)
    {
        //Recuperer l'utilisateur
        $user = $event->getUser();

        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);
    }
}