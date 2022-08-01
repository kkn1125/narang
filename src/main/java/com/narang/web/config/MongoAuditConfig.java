package com.narang.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(considerNestedRepositories = true, basePackages = "com.narang.web.mongoTemplate")
@EnableMongoAuditing
public class MongoAuditConfig {
}
