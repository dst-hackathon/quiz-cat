package com.dst.quizcat.repository;

import com.dst.quizcat.domain.Quiz;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Quiz entity.
 */
@SuppressWarnings("unused")
public interface QuizRepository extends JpaRepository<Quiz,Long> {

    @Query("select distinct quiz from Quiz quiz left join fetch quiz.questions left join fetch quiz.labels")
    List<Quiz> findAllWithEagerRelationships();

    @Query("select quiz from Quiz quiz left join fetch quiz.questions left join fetch quiz.labels where quiz.id =:id")
    Quiz findOneWithEagerRelationships(@Param("id") Long id);

}
