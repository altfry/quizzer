const sb = supabase.createClient(
  "https://hsvhnobizolxbhcckorc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzdmhub2Jpem9seGJoY2Nrb3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MjgwNzEsImV4cCI6MjAzMzAwNDA3MX0.lZpKrnaUfjfw4rJekjhGcZqE2W19hI7DNWlCrdUWdaA"
);

PetiteVue.createApp({
  async onMount() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id === null) {
      location.href = "error.html";
      return;
    }

    const res = await sb
      .from("quizes")
      .select("data")
      .eq("id", params.get("id"));

    if (res.data === null || res.data.length < 1) {
      location.href = "error.html";
      return;
    }

    this.questions = [];
    for (const quest of res.data[0].data) {
      this.questions.push({
        ...quest,
        selected: 0,
      });
    }
  },
  selectOption(i, j) {
    if (this.isFinished) return;
    this.questions[i].selected = j;
  },
  restart() {
    for (const quest of this.questions) {
      quest.selected = 0;
    }

    this.isFinished = false;
  },
  get correctCount() {
    if (this.questions === null) {
      return 0;
    }

    let count = 0;
    for (const quest of this.questions) {
      if (quest.selected === quest.correct) {
        count++;
      }
    }

    return count;
  },
  questions: null,
  isFinished: false,
}).mount();
