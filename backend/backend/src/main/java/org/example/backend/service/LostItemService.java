package org.example.backend.service;

import org.example.backend.model.LostItem;
import org.example.backend.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LostItemService {
    @Autowired
    private LostItemRepository lostItemRepository;

    public List<LostItem> getAllLostItems() {
        return lostItemRepository.findAll();
    }

    public LostItem addLostItem(LostItem lostItem) {
        return lostItemRepository.save(lostItem);
    }
}
