<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VerifySupabaseJwt
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Missing bearer token.'], 401);
        }

        $jwtSecret = (string) config('supabase.jwt_secret');

        if ($jwtSecret === '') {
            return response()->json(['message' => 'Supabase JWT secret is not configured.'], 500);
        }

        try {
            $decoded = JWT::decode($token, new Key($jwtSecret, 'HS256'));
        } catch (Throwable $e) {
            return response()->json(['message' => 'Invalid or expired token.'], 401);
        }

        if (empty($decoded->sub)) {
            return response()->json(['message' => 'Token missing subject claim.'], 401);
        }

        $request->attributes->set('supabase_user_id', $decoded->sub);
        $request->attributes->set('supabase_jwt', $decoded);

        return $next($request);
    }
}
