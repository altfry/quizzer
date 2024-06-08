const sb = supabase.createClient(
  "https://hsvhnobizolxbhcckorc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzdmhub2Jpem9seGJoY2Nrb3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MjgwNzEsImV4cCI6MjAzMzAwNDA3MX0.lZpKrnaUfjfw4rJekjhGcZqE2W19hI7DNWlCrdUWdaA"
);

PetiteVue.createApp({
  questions: [
    {
      text: "",
      options: ["", "", "", ""],
      correct: 0,
    },
  ],
  addQuestion() {
    this.questions.push({
      text: "",
      options: ["", "", "", ""],
      correct: 0,
    });
  },
  deleteQuestion(i) {
    this.questions.splice(i, 1);
  },
  async createQuiz() {
    for (const quest of this.questions) {
      if (quest.text === "") {
        alert("Chybí obsah otázky");
        return;
      }

      for (const opt of quest.options) {
        if (opt === "") {
          alert("Chybí obsah odpovědi");
          return;
        }
      }
    }

    const res = await sb
      .from("quizes")
      .insert({
        data: this.questions,
      })
      .select();

    location.href = `quiz.html?id=${res.data[0].id}`;
  },
}).mount();
