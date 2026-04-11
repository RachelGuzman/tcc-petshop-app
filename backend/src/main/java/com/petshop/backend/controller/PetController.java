package com.petshop.backend.controller;

import com.petshop.backend.model.Pet;
import com.petshop.backend.repository.PetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @PostMapping
    public Pet cadastrarPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @GetMapping
    public List<Pet> listarPets() {
        return petRepository.findAll();
    }
}
