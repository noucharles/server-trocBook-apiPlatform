<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Annonce;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class AnnonceDateSubscriber implements EventSubscriberInterface {



    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW =>['setDateForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDateForInvoice(ViewEvent $event) {
        $annonce = $event->getControllerResult();

        $method = $event->getRequest()->getMethod();

        if($annonce instanceof Annonce && $method === "POST") {
            if(empty($annonce->getCreated()))
            {
                $annonce->setCreated(new \DateTime());
            }
        }
    }
}