package com.leitorpdf.controller;

import com.leitorpdf.dto.LoginRequest;
import com.leitorpdf.dto.LoginResponse;
import com.leitorpdf.model.Usuario;
import com.leitorpdf.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = authService.authenticate(request.getUsername(), request.getPassword());
        
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(new LoginResponse(true, u.getUsername(), u.getRole(), "Login bem-sucedido"));
        }
        
        return ResponseEntity.ok(new LoginResponse(false, null, null, "Usuário ou senha inválidos"));
    }
}