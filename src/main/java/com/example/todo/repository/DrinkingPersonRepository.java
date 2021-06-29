package com.example.todo.repository;

import java.util.List;
import java.util.UUID;

import com.example.todo.model.PersItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkingPersonRepository extends JpaRepository<PersItem, Long> {
    PersItem findByItemId(Long itemId);
    List<PersItem> findByListId(UUID listId);
    @Query("select distinct listId from PersItem ")
    List<UUID> findDistinctListId();
}