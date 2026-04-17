package com.leitorpdf.service;

import com.leitorpdf.model.Usuario;
import com.leitorpdf.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Usuario> authenticate(String email, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        
        if (usuario.isPresent() && passwordEncoder.matches(password, usuario.get().getPassword())) {
            return usuario;
        }
        
        return Optional.empty();
    }

    public Usuario registro(String email, String nome, String password) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email ja cadastrado");
        }
        
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setNome(nome);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRole("USER");
        
        return usuarioRepository.save(usuario);
    }
}