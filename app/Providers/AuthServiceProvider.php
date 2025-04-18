<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Add the Car model to policy mapping
        \App\Models\Car::class => \App\Policies\CarPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->configurePolicies();

        //
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        //
    }

    /**
     * Configure the permissions that are being used to authorize actions.
     *
     * @return void
     */
    protected function configurePermissions()
    {
        //
    }

    /**
     * Configure the policies for the application.
     *
     * @return void
     */
    protected function configurePolicies()
    {
        //
    }
}
