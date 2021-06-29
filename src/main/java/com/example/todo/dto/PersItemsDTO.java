package com.example.todo.dto;

import com.example.todo.model.PersItem;

import java.util.List;
import java.util.UUID;

public class PersItemsDTO {

    private int count;
    private UUID listId;
    private List<PersItem> persItemList;

    public PersItemsDTO(){}

    public PersItemsDTO(int count, UUID listId, List<PersItem> persItemList){
        this.count = count;
        this.listId = listId;
        this.persItemList = persItemList;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public UUID getListId() {
        return listId;
    }

    public void setListId(UUID listId) {
        this.listId = listId;
    }

    public List<PersItem> getTodoItemList() {
        return persItemList;
    }

    public void setTodoItemList(List<PersItem> persItemList) {
        this.persItemList = persItemList;
    }
}

