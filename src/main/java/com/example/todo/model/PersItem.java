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
    public Boolean beerCounter = false; //Default value

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) { this.itemId = itemId; }

    public UUID getListId() { return listId; }

    public void setListId(UUID listId) { this.listId = listId; }

    public String getTaskName() { return taskName; }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }

    public Date getCreatedAt() { return createdAt; }

    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Integer getBierDrank () {return bierDrank;} //important rückgabewert

    //Increment, getrunkene Biere um 1 erhöhen
    public void doBierDrunkIncrement() {
        this.bierDrank++;
    }

    //Dencrement, getrunkene Biere um 1 veringern
    public void doBierDrunkDecrement() {
        if (this.bierDrank > 0) {this.bierDrank--;}
    }

    //setBierPaid fügt den gezahlten Biere die getrunknen Biere hinzu und resetet getrunkene Biere auf 0

    public Integer getBierPaid () {return bierPaid;} //important rückgabewert

    public void doBierPayed() {
        this.bierPaid = this.bierPaid + this.bierDrank;
        this.bierDrank = 0;
    }

    //Eingabe durch User wieviele Biere bezahlt werden
    public boolean doManyBierPayed(Integer manyBierPay) {
        if (manyBierPay <= this.bierDrank){
            this.bierDrank = this.bierDrank - manyBierPay;
            this.bierPaid = this.bierPaid + manyBierPay;
            this.beerCounter = true;
            return true;
        } else {
            this.beerCounter = false;
            return false;}
    }

    public void doOneBierPay() {
        if (this.bierDrank > 0) {
            this.bierPaid = this.bierPaid + 1;
            this.bierDrank = this.bierDrank - 1;
        }
    }
}