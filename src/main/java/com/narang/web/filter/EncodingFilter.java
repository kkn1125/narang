package com.narang.web.filter;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
public class EncodingFilter implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        FilterRegistration filterRegistration = servletContext.addFilter("CharacterEncodingFilter", CharacterEncodingFilter.class);
        filterRegistration.setInitParameter("encoding", "utf-8");
        filterRegistration.setInitParameter("forceEncoding", "true");
        filterRegistration.addMappingForUrlPatterns(null, true, "/*");
    }

}
