package com.dst.quizcat.repository;

import com.dst.quizcat.domain.Question;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */
@SuppressWarnings("unused")
public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query("select distinct question from Question question left join fetch question.labels")
    List<Question> findAllWithEagerRelationships();

    @Query("select question from Question question left join fetch question.labels where question.id =:id")
    Question findOneWithEagerRelationships(@Param("id") Long id);

}
