package com.leitorpdf.controller;

import com.leitorpdf.dto.LoginRequest;
import com.leitorpdf.dto.LoginResponse;
import com.leitorpdf.dto.RegistroRequest;
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
        Optional<Usuario> usuario = authService.authenticate(request.getEmail(), request.getPassword());
        
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(new LoginResponse(true, u.getId(), u.getNome(), u.getRole(), "Login bem-sucedido"));
        }
        
        return ResponseEntity.ok(new LoginResponse(false, null, null, null, "Email ou senha invalidos"));
    }

    @PostMapping("/registro")
    public ResponseEntity<LoginResponse> registro(@RequestBody RegistroRequest request) {
        try {
            Usuario usuario = authService.registro(request.getEmail(), request.getNome(), request.getPassword());
            return ResponseEntity.ok(new LoginResponse(true, usuario.getId(), usuario.getNome(), usuario.getRole(), "Cadastro realizado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new LoginResponse(false, null, null, null, e.getMessage()));
        }
    }
}