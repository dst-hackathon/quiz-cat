package com.dst.quizcat.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Attachment.
 */
@Entity
@Table(name = "attachment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attachment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_path")
    private String imagePath;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "attachment_path")
    private String attachmentPath;

    @Lob
    @Column(name = "attachment")
    private byte[] attachment;

    @Column(name = "attachment_content_type")
    private String attachmentContentType;

    @NotNull
    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToOne
    @JsonIgnoreProperties("attachments")
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Attachment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Attachment imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public byte[] getImage() {
        return image;
    }

    public Attachment image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Attachment imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getAttachmentPath() {
        return attachmentPath;
    }

    public Attachment attachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
        return this;
    }

    public void setAttachmentPath(String attachmentPath) {
        this.attachmentPath = attachmentPath;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public Attachment attachment(byte[] attachment) {
        this.attachment = attachment;
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public Attachment attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getContentType() {
        return contentType;
    }

    public Attachment contentType(String contentType) {
        this.contentType = contentType;
        return this;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getComment() {
        return comment;
    }

    public Attachment comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Question getQuestion() {
        return question;
    }

    public Attachment question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
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
        Attachment attachment = (Attachment) o;
        if (attachment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attachment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attachment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", attachmentPath='" + getAttachmentPath() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", attachmentContentType='" + getAttachmentContentType() + "'" +
            ", contentType='" + getContentType() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
