package com.dst.quizcat.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.dst.quizcat.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.dst.quizcat.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Quiz.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Quiz.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Quiz.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Question.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Question.class.getName() + ".attachments", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Question.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Attachment.class.getName(), jcacheConfiguration);
            cm.createCache(com.dst.quizcat.domain.Label.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
