package com.tcc.ecommerce.auth;

import com.tcc.ecommerce.jwt.JwtService;
import com.tcc.ecommerce.user.UserRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private final JwtService service;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserRequest request) {
        return service.generateToken(request);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        service.refreshToken(request, response);
    }
}
