package com.dst.quizcat.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dst.quizcat.domain.enumeration.AnswerSize;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "summary", nullable = false)
    private String summary;

    @Lob
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "objective", nullable = false)
    private String objective;

    @NotNull
    @Column(name = "key_answer", nullable = false)
    private String keyAnswer;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "answer_size", nullable = false)
    private AnswerSize answerSize;

    @Column(name = "answer_description")
    private String answerDescription;

    @Column(name = "expected_time")
    private Long expectedTime;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attachment> attachments = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_label",
               joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "label_id", referencedColumnName = "id"))
    private Set<Label> labels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public Question summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public Question description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjective() {
        return objective;
    }

    public Question objective(String objective) {
        this.objective = objective;
        return this;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getKeyAnswer() {
        return keyAnswer;
    }

    public Question keyAnswer(String keyAnswer) {
        this.keyAnswer = keyAnswer;
        return this;
    }

    public void setKeyAnswer(String keyAnswer) {
        this.keyAnswer = keyAnswer;
    }

    public AnswerSize getAnswerSize() {
        return answerSize;
    }

    public Question answerSize(AnswerSize answerSize) {
        this.answerSize = answerSize;
        return this;
    }

    public void setAnswerSize(AnswerSize answerSize) {
        this.answerSize = answerSize;
    }

    public String getAnswerDescription() {
        return answerDescription;
    }

    public Question answerDescription(String answerDescription) {
        this.answerDescription = answerDescription;
        return this;
    }

    public void setAnswerDescription(String answerDescription) {
        this.answerDescription = answerDescription;
    }

    public Long getExpectedTime() {
        return expectedTime;
    }

    public Question expectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
        return this;
    }

    public void setExpectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public Question attachments(Set<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public Question addAttachment(Attachment attachment) {
        this.attachments.add(attachment);
        attachment.setQuestion(this);
        return this;
    }

    public Question removeAttachment(Attachment attachment) {
        this.attachments.remove(attachment);
        attachment.setQuestion(null);
        return this;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    public Set<Label> getLabels() {
        return labels;
    }

    public Question labels(Set<Label> labels) {
        this.labels = labels;
        return this;
    }

    public Question addLabel(Label label) {
        this.labels.add(label);
        return this;
    }

    public Question removeLabel(Label label) {
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
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            ", objective='" + getObjective() + "'" +
            ", keyAnswer='" + getKeyAnswer() + "'" +
            ", answerSize='" + getAnswerSize() + "'" +
            ", answerDescription='" + getAnswerDescription() + "'" +
            ", expectedTime=" + getExpectedTime() +
            "}";
    }
}
