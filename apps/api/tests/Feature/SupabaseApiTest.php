<?php

namespace Tests\Feature;

use Firebase\JWT\JWT;
use Tests\TestCase;

class SupabaseApiTest extends TestCase
{
    public function test_health_endpoint_returns_ok(): void
    {
        $response = $this->getJson('/api/health');

        $response->assertOk()
            ->assertJson([
                'status' => 'ok',
                'service' => 'edu-platform-api',
            ]);
    }

    public function test_me_endpoint_requires_bearer_token(): void
    {
        $response = $this->getJson('/api/me');

        $response->assertUnauthorized();
    }

    public function test_me_endpoint_accepts_valid_supabase_jwt(): void
    {
        $secret = 'test-supabase-jwt-secret-with-at-least-32-chars';
        config()->set('supabase.jwt_secret', $secret);

        $token = JWT::encode([
            'sub' => '11111111-1111-1111-1111-111111111111',
            'email' => 'student@unibuc.ro',
            'role' => 'authenticated',
            'exp' => time() + 3600,
        ], $secret, 'HS256');

        $response = $this->withToken($token)->getJson('/api/me');

        $response->assertOk()
            ->assertJson([
                'user_id' => '11111111-1111-1111-1111-111111111111',
            ]);
    }
}

