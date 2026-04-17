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
        Optional<Usuario> usuario = authService.authenticate(request.getUsername(), request.getPassword());
        
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(new LoginResponse(true, u.getId(), u.getUsername(), u.getRole(), "Login bem-sucedido"));
        }
        
        return ResponseEntity.ok(new LoginResponse(false, null, null, null, "Usuário ou senha inválidos"));
    }

    @PostMapping("/registro")
    public ResponseEntity<LoginResponse> registro(@RequestBody RegistroRequest request) {
        try {
            usuario usuario = authService.registro(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(new LoginResponse(true, usuario.getId(), usuario.getUsername(), usuario.getRole(), "Cadastro realizado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new LoginResponse(false, null, null, null, e.getMessage()));
        }
    }
}