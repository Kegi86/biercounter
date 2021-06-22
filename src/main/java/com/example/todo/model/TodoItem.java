package com.example.todo.model;

import java.util.Date;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class TodoItem {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long itemId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID listId;

    @NotEmpty(message="* Enter Task Name")
    private String taskName;

    public TodoItem() {}

    public TodoItem(UUID listId, String taskName, Date createdAt) {
        this.listId = listId;
        this.taskName = taskName;
        this.createdAt = createdAt;
        this.bierDrank = bierDrank;
        this.bierPaid = bierPaid;
    }

    private Boolean isDone = false; // Default value

    private Date createdAt = new Date();

    private Integer bierDrank = 0;
    private Integer bierPaid = 4;

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public UUID getListId() {
        return listId;
    }

    public void setListId(UUID listId) {
        this.listId = listId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    //setBierDrank erhöht getrunkene Biere um 1

    public Integer getBierDrank () {return bierDrank;}
    public void doBierDrunkIncrement() {
        this.bierDrank++;
    }
    public void doBierDrunkDecrement() {
        this.bierDrank--;
    }

    //setBierPaid fügt den gezahlten Biere die getrunknen Biere hinzu und resetet getrunkene Biere auf 0

    public Integer getBierPaid () {return bierPaid;}

    public void setBierPaid (Integer bierPaid) {bierPaid = bierPaid + bierDrank; bierDrank = 0;}
}