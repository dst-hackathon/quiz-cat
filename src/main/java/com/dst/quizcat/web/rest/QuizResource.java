package com.dst.quizcat.web.rest;
import com.dst.quizcat.domain.Quiz;
import com.dst.quizcat.repository.QuizRepository;
import com.dst.quizcat.web.rest.errors.BadRequestAlertException;
import com.dst.quizcat.web.rest.util.HeaderUtil;
import com.dst.quizcat.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Quiz.
 */
@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz";

    private final QuizRepository quizRepository;

    public QuizResource(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    /**
     * POST  /quizzes : Create a new quiz.
     *
     * @param quiz the quiz to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quiz, or with status 400 (Bad Request) if the quiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to save Quiz : {}", quiz);
        if (quiz.getId() != null) {
            throw new BadRequestAlertException("A new quiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quiz result = quizRepository.save(quiz);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quizzes : Updates an existing quiz.
     *
     * @param quiz the quiz to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quiz,
     * or with status 400 (Bad Request) if the quiz is not valid,
     * or with status 500 (Internal Server Error) if the quiz couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quizzes")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to update Quiz : {}", quiz);
        if (quiz.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Quiz result = quizRepository.save(quiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quiz.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quizzes : get all the quizzes.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of quizzes in body
     */
    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Quizzes");
        Page<Quiz> page;
        if (eagerload) {
            page = quizRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = quizRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/quizzes?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /quizzes/:id : get the "id" quiz.
     *
     * @param id the id of the quiz to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quiz, or with status 404 (Not Found)
     */
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id) {
        log.debug("REST request to get Quiz : {}", id);
        Optional<Quiz> quiz = quizRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(quiz);
    }

    /**
     * DELETE  /quizzes/:id : delete the "id" quiz.
     *
     * @param id the id of the quiz to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.debug("REST request to delete Quiz : {}", id);
        quizRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
