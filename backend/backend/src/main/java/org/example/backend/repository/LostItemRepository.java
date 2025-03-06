package org.example.backend.repository;

import org.example.backend.model.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    List<LostItem> findByLocation(String location);
}
