package com.example.todo.model;

import java.util.Date;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class PersItem {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long itemId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID listId;

    @NotEmpty(message="* Enter Task Name")
    private String taskName;

    public PersItem() {}

    public PersItem(UUID listId, String taskName, Date createdAt) {
        this.listId = listId;
        this.taskName = taskName;
        this.createdAt = createdAt;
        this.bierDrank = bierDrank;
        this.bierPaid = bierPaid;
    }

    private Boolean isDone = false; // Default value

    private Date createdAt = new Date();

    private Integer bierDrank = 0;
    private Integer bierPaid = 0;

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
        if (this.bierDrank > 0) {this.bierDrank--;}
    }

    //setBierPaid fügt den gezahlten Biere die getrunknen Biere hinzu und resetet getrunkene Biere auf 0

    public Integer getBierPaid () {return bierPaid;}
    public void doBierPayed() {
        this.bierPaid = this.bierPaid + this.bierDrank;
        this.bierDrank = 0;
    }

    public boolean doManyBierPayed(Integer manyBierPay) {
        if (manyBierPay <= this.bierDrank){
            this.bierDrank = this.bierDrank - manyBierPay;
            this.bierPaid = this.bierPaid + manyBierPay;
            return true;
        } else {
            return false;}
    }


    public void setBierPaid (Integer bierPaid) {bierPaid = bierPaid + bierDrank; bierDrank = 0;}

    public Integer getOneBierPaid () {return bierPaid;}
    public void doOneBierPay() {
        if (this.bierDrank > 0) {
            this.bierPaid = this.bierPaid + 1;
            this.bierDrank = this.bierDrank - 1;
        }
    }

    public void setOneBierPaid (Integer bierPaid) {bierPaid = bierPaid + 1; bierDrank = bierDrank -1;}
}