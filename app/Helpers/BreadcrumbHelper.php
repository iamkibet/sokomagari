<?php

if (!function_exists('generateBreadcrumbs')) {
    function generateBreadcrumbs($routeName)
    {
        $routes = [
            'home' => [
                'name' => 'Home',
                'url' => route('home'),
            ],
            'vehicles.index' => [
                'name' => 'vehicles',
                'url' => route('vehicles.index'),
            ],
            'vehicles.show' => [
                'name' => 'Product Details',
                'url' => '',
            ],
        ];

        $breadcrumbs = [];
        $segments = explode('.', $routeName);

        while (!empty($segments)) {
            $current = implode('.', $segments);
            if (isset($routes[$current])) {
                $breadcrumbs[] = $routes[$current];
            }
            array_pop($segments);
        }

        return array_reverse($breadcrumbs);
    }
}
