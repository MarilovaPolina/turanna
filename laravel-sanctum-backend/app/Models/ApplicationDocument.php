<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationDocument extends Model
{
    use HasFactory;
    protected $fillable = ['application_id', 'file_path', 'original_name'];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

}
