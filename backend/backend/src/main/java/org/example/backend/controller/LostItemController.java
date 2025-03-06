package org.example.backend.controller;

import org.example.backend.model.LostItem;
import org.example.backend.service.LostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lost")
public class LostItemController {
    @Autowired
    private LostItemService lostItemService;

    @GetMapping
    public List<LostItem> getAllLostItems() {
        return lostItemService.getAllLostItems();
    }

    @PostMapping
    public LostItem addLostItem(@RequestBody LostItem lostItem) {
        return lostItemService.addLostItem(lostItem);
    }
}
