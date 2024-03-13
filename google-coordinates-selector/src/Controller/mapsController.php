<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class mapsController extends AbstractController
{
    /**
     * @Route("/", name="map_page")
     */
    public function mapView(): Response
    {
        return $this->render('maps.html.twig');
    }
}
