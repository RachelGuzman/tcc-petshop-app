package com.petshop.backend.model;

import jakarta.persistence.*;

@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String data;
    private String horario;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Pet pet;

    @ManyToOne
    private Servico servico;

    // getters e setters
    public Long getId() { return id; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public Servico getServico() { return servico; }
    public void setServico(Servico servico) { this.servico = servico; }
}