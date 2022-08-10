package com.narang.web.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Whether {
    private Integer score;
    private Integer count;
    private List<String> words;
}
