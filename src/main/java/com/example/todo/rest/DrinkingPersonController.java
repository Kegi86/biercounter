package com.example.todo.rest;

import com.example.todo.dto.DrinkingPersonListsDTO;
import com.example.todo.dto.PersItemsDTO;
import com.example.todo.model.PersItem;
import com.example.todo.service.DrinkingPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class DrinkingPersonController {
    @Autowired
    private DrinkingPersonService drinkingPersonService;

    @GetMapping("/item/{itemId}")
    public PersItem getItem(@PathVariable Long itemId) {
        return drinkingPersonService.getItem(itemId);
    }

    // Get todo list, based on listId
    @GetMapping("/list/{listId}")
    public List<PersItem> getItem(@PathVariable UUID listId) {
        return drinkingPersonService.getAllDrinkingPersonForListId(listId);
    }

    // Get all todo listIds
    @GetMapping("/listids")
    public DrinkingPersonListsDTO getListIDs() {
        return drinkingPersonService.getDrinkingPersonListIDs();
    }

    // Get all todo lists
    @GetMapping("/list")
    public List<PersItemsDTO> getAllTodoItems() {
        return drinkingPersonService.getDrinkingPersonLists();
    }


    // New todo item
    @PostMapping(value = "/new")
    public ResponseEntity<PersItem> newTodoItem(@RequestBody PersItem item) {
        return ResponseEntity.ok(drinkingPersonService.saveDrinkingPerson(item));
    }

    // Edit todo item
    @PutMapping("/edit")
    public ResponseEntity<PersItem> editTodoItem(@RequestBody PersItem item) {
        return ResponseEntity.ok(drinkingPersonService.editDrinkingPerson(item));
    }

    // Delete todo item
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteTodoItem(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.deleteDrinkingPerson(id));
    }

    // Change done state
    @PutMapping("/state/{id}")
    public ResponseEntity<PersItem> changeDoneState(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.changeDoneStateForDrinkingPerson(id));
    }


    @PutMapping("/increment/{id}")
    public ResponseEntity<PersItem> doIncrement(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doIncrementForPersItem(id));
    }

    @PutMapping("/decrement/{id}")
    public ResponseEntity<PersItem> doDecrement(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doDecrementForPersItem(id));
    }

    @PutMapping("/payed/{id}")
    public ResponseEntity<PersItem> doPayed(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doPayedForPersItem(id));
    }

    @PutMapping("/payone/{id}")
    public ResponseEntity<PersItem> doPayOne(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doPayOneForPersItem(id));
    }


}

