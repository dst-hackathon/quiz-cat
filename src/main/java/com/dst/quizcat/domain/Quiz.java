package com.dst.quizcat.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "generate_date")
    private ZonedDateTime generateDate;

    @Column(name = "time_limit")
    private Long timeLimit;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "quiz_question",
               joinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private Set<Question> questions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "quiz_label",
               joinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "label_id", referencedColumnName = "id"))
    private Set<Label> labels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getGenerateDate() {
        return generateDate;
    }

    public Quiz generateDate(ZonedDateTime generateDate) {
        this.generateDate = generateDate;
        return this;
    }

    public void setGenerateDate(ZonedDateTime generateDate) {
        this.generateDate = generateDate;
    }

    public Long getTimeLimit() {
        return timeLimit;
    }

    public Quiz timeLimit(Long timeLimit) {
        this.timeLimit = timeLimit;
        return this;
    }

    public void setTimeLimit(Long timeLimit) {
        this.timeLimit = timeLimit;
    }

    public String getDescription() {
        return description;
    }

    public Quiz description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Quiz questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Quiz addQuestion(Question question) {
        this.questions.add(question);
        return this;
    }

    public Quiz removeQuestion(Question question) {
        this.questions.remove(question);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Label> getLabels() {
        return labels;
    }

    public Quiz labels(Set<Label> labels) {
        this.labels = labels;
        return this;
    }

    public Quiz addLabel(Label label) {
        this.labels.add(label);
        return this;
    }

    public Quiz removeLabel(Label label) {
        this.labels.remove(label);
        return this;
    }

    public void setLabels(Set<Label> labels) {
        this.labels = labels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Quiz quiz = (Quiz) o;
        if (quiz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quiz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + getId() +
            ", generateDate='" + getGenerateDate() + "'" +
            ", timeLimit=" + getTimeLimit() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
