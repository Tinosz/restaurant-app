<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
{
    $login = $request->input('login');
    $password = $request->input('password');

    // Check if the user exists by email or username
    $user = User::where('email', $login)->orWhere('username', $login)->first();

    if (!$user || !Hash::check($password, $user->password)) {
        return response([
            'message' => 'The provided email or username or password is incorrect.',
        ], 422);
    }

    // Log in the user
    Auth::login($user);

    // Generate and return the authentication token
    $token = $user->createToken('main')->plainTextToken;
    return response(compact('user', 'token'));
}


    public function adminlogin(AdminLoginRequest $request)
    {
        $login = $request->input('username');
        $password = $request->input('password');

        $admin = Admin::where('username', $login)->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            return response([
                'message' => 'The provided username or password is incorrect.',
            ], 422);
        }

        Auth::guard('admin')->login($admin);

        $token = $admin->createToken('main')->plainTextToken;
        return response(compact('admin', 'token'));
    }

    public function getAdminUserData(Request $request)
    {
        $adminData = Admin::where('id', $request->user()->id)->first();
        
        if ($adminData) {
            return response()->json($adminData);
        } else {
            return response()->json(['message' => 'Admin data not found'], 404);
        }
    }



    
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user  */
        $user = User::create([
            'username' => $data['username'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'gender' => $data['gender'],
            'date_of_birth' => $data['date_of_birth'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
