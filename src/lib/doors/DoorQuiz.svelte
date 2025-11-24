<script>
  const question = "Was ist die Hauptstadt von Deutschland?";
  const correctAnswer = "berlin";
  const solutionUrl = "https://letmegooglethat.com/?q=Was+ist+die+Hauptstadt+von+Deutschland";

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

<div>
  <p>{question}</p>

  <input
    type="text"
    bind:value={userAnswer}
    on:keydown={handleKey}
    placeholder="Antwort eingeben"
  />

  {#if feedback}
    <p>{feedback}</p>
  {/if}

  <button on:click={openSolution}>
    Hilfe
  </button>
</div>
