package com.petshop.backend.controller;

import com.petshop.backend.model.Agendamento;
import com.petshop.backend.repository.AgendamentoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    private final AgendamentoRepository repository;

    public AgendamentoController(AgendamentoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Agendamento cadastrar(@RequestBody Agendamento agendamento) {
        return repository.save(agendamento);
    }

    @GetMapping
    public List<Agendamento> listar() {
        return repository.findAll();
    }
}