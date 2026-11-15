<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'edu-platform-api',
        'php_version' => PHP_VERSION,
        'laravel_version' => app()->version(),
    ]);
});

Route::middleware('supabase.auth')->group(function () {
    Route::get('/me', function (Request $request) {
        return response()->json([
            'user_id' => $request->attributes->get('supabase_user_id'),
            'claims' => $request->attributes->get('supabase_jwt'),
        ]);
    });
});

