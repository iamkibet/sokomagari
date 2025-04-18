<?php

namespace App\Observers;

use App\Models\Car;
use Illuminate\Support\Carbon;

class CarObserver
{
    /**
     * Handle the Car "created" event.
     */
    public function created(Car $car): void
    {
        //
    }

    /**
     * Handle the Car "updated" event.
     */
    public function updated(Car $car): void
    {
        // If the status changed to 'sold' and sold_at is null, set it to current time
        if (
            $car->status === 'sold' && $car->sold_at === null &&
            ($car->wasChanged('status') || $car->wasChanged('sold_at'))
        ) {

            // Update without triggering another observer call
            $car->timestamps = false;
            $car->sold_at = Carbon::now();
            $car->save();
            $car->timestamps = true;
        }

        // If the status changed from 'sold' to something else, clear the sold_at timestamp
        if ($car->status !== 'sold' && $car->sold_at !== null && $car->wasChanged('status')) {
            $car->timestamps = false;
            $car->sold_at = null;
            $car->save();
            $car->timestamps = true;
        }
    }

    /**
     * Handle the Car "deleted" event.
     */
    public function deleted(Car $car): void
    {
        //
    }

    /**
     * Handle the Car "restored" event.
     */
    public function restored(Car $car): void
    {
        //
    }

    /**
     * Handle the Car "force deleted" event.
     */
    public function forceDeleted(Car $car): void
    {
        //
    }
}
