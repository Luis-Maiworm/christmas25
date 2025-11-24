<script>
  const question = "Was ist die Hauptstadt von Deutschland?";
  const correctAnswer = "berlin";
  const solutionUrl = "https://letmegooglethat.com/?q=" + question;

  let userAnswer = "";
  let feedback = "";

  function checkAnswer() {
    const normalized = userAnswer.trim().toLowerCase();
    if (normalized === correctAnswer) {
      feedback = "Richtig";
    } else {
      feedback = "Falsch";
    }
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  }

  function openSolution() {
    window.open(solutionUrl, "_blank", "noopener,noreferrer");
  }
</script>

<style>
  /* Input styling tuned to match dialog visuals: subtle translucent background,
     soft border, rounded corners and clear focus state. */
  .quiz-input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.02);
    color: inherit;
    font-size: 1rem;
    outline: none;
    transition: border-color .12s ease, box-shadow .12s ease;
  }
  .quiz-input:focus {
    border-color: rgba(255,255,255,0.6);
    box-shadow: 0 0 0 6px rgba(169,3,41,0.06);
  }

  .help-btn {
    margin-top: 0.5rem;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    background: #ffffff12;
    color: inherit;
    border: 1px solid rgba(255,255,255,0.14);
    cursor: pointer;
  }

  .feedback {
    margin-top: 0.5rem;
    font-weight: 600;
  }
  .feedback.correct { color: #9be89b; }
  .feedback.incorrect { color: #ffb3b3; }
</style>

<div>
  <p>{question}</p>

  <input
    class="quiz-input"
    type="text"
    bind:value={userAnswer}
    on:keydown={handleKey}
    placeholder="Antwort eingeben"
    aria-label="Antwort eingeben"
  />

  {#if feedback}
    <p class="feedback" class:correct={feedback === 'Richtig'} class:incorrect={feedback === 'Falsch'}>{feedback}</p>
  {/if}

  <button class="help-btn" on:click={openSolution} aria-label="Hilfe öffnen">
    Hilfe
  </button>
</div>
