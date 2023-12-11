package com.ecom.service.impl;

import com.ecom.domain.LineItem;
import com.ecom.repository.LineItemRepository;
import com.ecom.service.LineItemService;
import com.ecom.service.dto.LineItemDTO;
import com.ecom.service.mapper.LineItemMapper;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LineItem}.
 */
@Service
@Transactional
public class LineItemServiceImpl implements LineItemService {

    private final Logger log = LoggerFactory.getLogger(LineItemServiceImpl.class);

    private final LineItemRepository lineItemRepository;

    private final LineItemMapper lineItemMapper;

    public LineItemServiceImpl(LineItemRepository lineItemRepository, LineItemMapper lineItemMapper) {
        this.lineItemRepository = lineItemRepository;
        this.lineItemMapper = lineItemMapper;
    }

    @Override
    public LineItemDTO save(LineItemDTO lineItemDTO) {
        log.debug("Request to save LineItem : {}", lineItemDTO);
        LineItem lineItem = lineItemMapper.toEntity(lineItemDTO);
        lineItem = lineItemRepository.save(lineItem);
        return lineItemMapper.toDto(lineItem);
    }

    @Override
    public LineItemDTO update(LineItemDTO lineItemDTO) {
        log.debug("Request to save LineItem : {}", lineItemDTO);
        LineItem lineItem = lineItemMapper.toEntity(lineItemDTO);
        lineItem = lineItemRepository.save(lineItem);
        return lineItemMapper.toDto(lineItem);
    }

    @Override
    public Optional<LineItemDTO> partialUpdate(LineItemDTO lineItemDTO) {
        log.debug("Request to partially update LineItem : {}", lineItemDTO);

        return lineItemRepository
            .findById(lineItemDTO.getId())
            .map(existingLineItem -> {
                lineItemMapper.partialUpdate(existingLineItem, lineItemDTO);

                return existingLineItem;
            })
            .map(lineItemRepository::save)
            .map(lineItemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LineItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LineItems");
        return lineItemRepository.findAll(pageable).map(lineItemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LineItemDTO> findOne(Long id) {
        log.debug("Request to get LineItem : {}", id);
        return lineItemRepository.findById(id).map(lineItemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LineItem : {}", id);
        lineItemRepository.deleteById(id);
    }

    @Override
    public List<LineItemDTO> findAllByOrderId(Long id) {
        return lineItemMapper.toDto(lineItemRepository.findAllByOrderId(id));
    }

    @Override
    public List<LineItemDTO> findLineItemsByOrderId(Long id) {
        return lineItemRepository.findLineItemsByOrderId(id);
    }
}
