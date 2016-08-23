package org.com.chimerdbv31.chimerpub.services;

import javax.annotation.Resource;
import org.com.chimerdbv31.chimerpub.mapper.ChimerPubMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service(value = "ChimerPubService")
public class ChimerPubService {	
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(ChimerPubService.class);

    @Resource(name = "ChimerPubMapper")
    private ChimerPubMapper chimerPubMapper;
}
