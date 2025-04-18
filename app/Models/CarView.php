<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarView extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'car_id',
        'user_id',
        'ip_address',
        'user_agent',
        'viewed_at'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    /**
     * Get the car that was viewed.
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * Get the user who viewed the car.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
