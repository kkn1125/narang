package com.narang.web.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("mongoAuditingConfig")
public class MongoAuditingConfig implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("narang");    }
}
